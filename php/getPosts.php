<?php

require_once('SqlConnector.php');
require_once('dbUtils.php');

class GetPostObj {
    // Sql connector
    public $sqlConnector;

    // Parameters from the url
    public $allow_image;
    public $allow_text;
    public $allow_repost;
    public $sort;
    public $nb;

    public $search;

    public $by_user;
    public $by_user_ID; 

    public $liked_by; 
    public $liked_by_ID;

    public $post_id;
    public $offset; 


    public function __construct() {
        // Create a connection to the database
        $this->sqlConnector = new SqlConnector();

        if ($this->sqlConnector->is_working == false) {
            die("Connection failed: " . $this->sqlConnector->conn->connect_error);
        }

        // Get the parameters from the url
        $this->parse_arguments();
    }

    public function parse_arguments(){
        // Get the parameters from the url
        isset($_GET['allow_image']) ? $this->allow_image = $_GET['allow_image'] : $this->allow_image = 1;
        isset($_GET['allow_text']) ? $this->allow_text = $_GET['allow_text'] : $this->allow_text = 1;
        isset($_GET['sort']) ? $this->sort = $_GET['sort'] : $this->sort = 'time';
        isset($_GET['nb']) ? $this->nb = $_GET['nb'] : $this->nb = 10;
        isset($_GET['post_id']) ? $this->post_id = $_GET['post_id'] : $this->post_id = -1;
        isset($_GET['offset']) ? $this->offset = $_GET['offset'] : $this->offset = 0;
        isset($_GET['search']) ? $this->search = $_GET['search'] : $this->search = null;

        // By default, disallow repost
        $this->allow_repost = 0; 

        if (isset($_GET['by_user']) == false) {
            $this->by_user = null;
        }
        else {
            $this->by_user = $_GET['by_user'];
            $this->by_user_ID = getUserID($this->by_user);
            if ($this->by_user_ID == -1) {
                $this->by_user = null;
            }
            // If the user is specified, allow repost by the user
            if ($this->by_user != null && isset($_GET['allow_repost'])) {
                $this->allow_repost = $_GET['allow_repost'];
            }
            else {
                $this->allow_repost = 0;
            }
        }

        if (isset($_GET['liked_by']) == false) {
            $this->liked_by = null;
        }
        else {
            $this->liked_by = $_GET['liked_by'];
            $this->liked_by_ID = getUserID($this->liked_by);
            if ( $this->liked_by_ID == -1) {
                $this->liked_by = null;
            }
        }
    }

    public function getPosts(){
        // Get the SQL request
        $sql_request = $this->generateSQLPostRequest();
        // Get the posts
        $results = $this->sqlConnector->ask_database($sql_request);

        $tmp_nb = $this->nb;
        $i = 0;
        
        if ( $results != null) {
            // for every row display the result
            while($row = $results->fetch_assoc()) {
                // Display the posts while the nb is not 0
                if ($tmp_nb == 0) {
                    break;
                }
                // Get the user info
                $response[$i] = array( 
                    "post" => array(
                        "post_id" => $row["post_id"],
                        "author_id" => $row["author_id"],
                        "content" => $row["content"],
                        "image_path" => $row["image_path"],
                        "time" => $row["time"],
                        "likes" => $row["likes"],
                        "repost" => $row["repost"],
                        "edited" => $row["edited"],
                    ),
                    "user" => array(
                        "user_id" => $row["user_id"],
                        "ref" => urldecode($row["ref"]),
                        "name" => urldecode($row["name"]), 
                        "profile_picture_path" => $row["profile_picture_path"]
                    )
                );
                $tmp_nb--;
                $i++;
            }
            // Send the response
            header("Content-Type: application/json");
            echo json_encode($response);
        }
        else {
            header("Content-Type: application/json");
            $empty = json_decode ("{}");
            echo json_encode($empty);
        }
    }

    // Set up SQL request to get the posts
    public function generateSQLPostRequest(){

        // Select the posts and user info
        $req = 'SELECT post_data.*, siteuser.* FROM'; 

        // Group post from the user + reposts from the user
        if ( $this->allow_repost == 1){
            $req = $req." (
                SELECT userpost.*, 'original' AS post_type
                FROM userpost
                WHERE userpost.author_id = ".$this->by_user_ID."
                UNION ALL
                SELECT userpost.*, 'repost' AS post_type
                FROM userpost
                JOIN post_reposts ON userpost.post_id = post_reposts.post_id
                WHERE post_reposts.user_id = ".$this->by_user_ID."
            ) ";
        }
        else {
            $req = $req." userpost ";
        }

        // Rename the table
        $req = $req." AS post_data ";

        // Join the user info
        $req = $req."JOIN siteuser ON post_data.author_id = siteuser.user_id "; 


        if( $this->liked_by != null) {
            $req = $req.'JOIN post_likes ON post_likes.post_id = post_data.post_id ';
        }

        $nb_where_clause = 0;
        // If there is a where clause to add
        if ($this->allow_image == 0 || $this->allow_text == 0 || ($this->by_user && $this->allow_repost == 0)  || $this->liked_by || $this->post_id != -1 || $this->search != null){
            $req = $req.' WHERE ';
            // If we want to allow only text posts
            if ( $this->allow_image == 0 ) {
                $req = $req.'image_path IS NULL OR image_path = "" ';
                $nb_where_clause++;
            }
            // If we want to allow only image posts
            if ( $this->allow_text == 0) {
                if ($nb_where_clause > 0) {
                    $req = $req.'AND ';
                }
                $req = $req.'image_path != "" AND image_path IS NOT NULL';
                $nb_where_clause++;
            }
            // If we want to filter by user
            if ($this->by_user && $this->allow_repost == 0) {
                if ($nb_where_clause > 0) {
                    $req = $req.'AND ';
                }
                $req = $req.'author_id = '.$this->by_user_ID;
                $nb_where_clause++;
            }
            // If we want to filter by posts liked by a user
            if ($this->liked_by) {
                if ($nb_where_clause > 0) {
                    $req = $req.'AND ';
                }
                $req = $req.'post_likes.user_id = '.$this->liked_by_ID;
                $nb_where_clause++;
            }
            // If we want to filter by post id
            if ($this->post_id != -1) {
                if ($nb_where_clause > 0) {
                    $req = $req.'AND ';
                }
                $req = $req.'post_data.post_id = '.$this->post_id;
                $nb_where_clause++;
            }

            // If we want to filter by search
            if ($this->search != null){
                if ($nb_where_clause > 0) {
                    $req = $req.'AND ';
                }
                $escaped_search_string = str_replace(['%', '#', '_', '\\'], ['\%', '\#', '\_', '\\\\'], $this->search);
                $req = $req.'(post_data.content LIKE "%'.$escaped_search_string.'%" OR siteuser.name LIKE "%'.$escaped_search_string.'%")';
                $nb_where_clause++;
            }
        }
        $req = $req.' GROUP BY post_data.post_id ORDER BY '.$this->sort.' DESC LIMIT '.$this->nb.' OFFSET '.$this->offset;
        return $req;
    }
}


$postObj = new GetPostObj();
$postObj->getPosts();
?>
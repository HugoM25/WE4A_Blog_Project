<?php

require_once('SqlConnector.php');
require_once('dbUtils.php');
require_once('manageHashtag.php');

class ManagePostObj {
    public $sqlConnector;

    public function __construct() {
        // Create a connection to the database
        $this->sqlConnector = new SqlConnector();

        if ($this->sqlConnector->is_working == false) {
            die("Connection failed: " . $this->sqlConnector->conn->connect_error);
        }

        // Get the action to do
        $action = null;
        if (isset($_POST['action']) == true) {
            $action = $_POST['action'];
        }

        // Do the action
        switch ($action) {
            case 'add_post':
                $this->add_post();
                break;
            case 'delete_post':
                $this->delete_post();
                break;
            case 'edit_post':
                $this->edit_post();
                break;
            default:
                $response = array(
                    'success' => false,
                    'error' => 'Action not found',
                );
                echo json_encode($response);
                break;
        }

        
    }
    public function edit_post(){
        $post_id = null;
        $post_text = null;
        $post_image = null;
        // Get post argument 
        isset($_POST['post_id']) ? $post_id = $_POST['post_id'] : $post_id = null;
        isset($_POST['post_text']) ? $post_text = $_POST['post_text'] : $post_text = null;
        //isset($_POST['post_image']) ? $post_image = $_POST['post_image'] : $post_image = null;

        // Get connected user id
        session_start();
        $connected_user_id = $_SESSION['user_id'];

        if ($_SESSION['user_id'] == null) {
            $response = array(
                'success' => false,
                'error' => 'User not found',
            );
            echo json_encode($response);
            return;
        }

        // Verify that the post is from the connected user
        $sql = "SELECT * FROM userpost WHERE post_id = '".$post_id."' AND author_id = '".$connected_user_id."'";
        $results = $this->sqlConnector->ask_database($sql);

        if ($results == null) {
            $response = array(
                'success' => false,
                'error' => 'Post not found',
            );
            echo json_encode($response);
            return;
        }

        // Update the post in the database
        if (isset($_FILES['post_image'])){
            $post_image = $_FILES['post_image'];
            $image_path = $this->save_image($post_image, $_SESSION['user_id']);

            $sql = "UPDATE userpost SET edited = true, content = '".$post_text."', image_path = '".$image_path."' WHERE post_id = '".$post_id."' AND author_id = '".$connected_user_id."'";
        }
        else {
            
            $sql = "UPDATE userpost SET edited = true, content = '".$post_text."', image_path ='' WHERE post_id = '".$post_id."' AND author_id = '".$connected_user_id."'";
        }

        // Remove every hashtag from the post in the database
        deleteEveryHastagFromPost($sqlConnector, $post_id);

        // Add every hashtag from the post in the database
        $hashtagsInPost = searchHashtagsInContent($post_text);
        if ($hashtagsInPost != null){
            foreach ($hashtagsInPost as $hashtag) {
                addHashtag($this->sqlConnector, $hashtag, $post_id);
            }    
        }

        $results = $this->sqlConnector->ask_database($sql);

        $response = array(
            'success' => true,
        );

        echo json_encode($response);
    }

    public function delete_post(){
        $post_id = null;
        // Get post argument 
        if (isset($_POST['post_id']) == true) {
            $post_id = $_POST['post_id'];
        }


        // Get connected user id
        session_start();
        $connected_user_id = $_SESSION['user_id'];

        if ($_SESSION['user_id'] == null) {
            $response = array(
                'success' => false,
                'error' => 'User not found',
            );
            echo json_encode($response);
            return;
        }

        // Verify that the post is from the connected user
        $sql = "SELECT * FROM userpost WHERE post_id = '".$post_id."' AND author_id = '".$connected_user_id."'";
        $results = $this->sqlConnector->ask_database($sql);

        if ($results->num_rows == 0) {
            $response = array(
                'success' => false,
                'error' => 'Post not found',
            );
            echo json_encode($response);
            return;
        }
        else {
            // Get the post image path
            $image_path = $results->fetch_assoc()['image_path'];

            if ($image_path != null || $image_path != ''){
                unlink('../'.$image_path);
            }
        }

        // Remove every hashtag from the post in the database
        deleteEveryHastagFromPost($this->sqlConnector, $post_id);

        // Delete the likes of the post in the database
        $sql = "DELETE FROM post_likes WHERE post_id = '".$post_id."'";
        $results = $this->sqlConnector->ask_database($sql);

        // Delete the reposts of the post in the database
        $sql = "DELETE FROM post_reposts WHERE post_id = '".$post_id."'";
        $results = $this->sqlConnector->ask_database($sql);
        
        // Delete the post in the database
        $sql = "DELETE FROM userpost WHERE post_id = '".$post_id."' AND author_id = '".$connected_user_id."'";
        $results = $this->sqlConnector->ask_database($sql);

        $response = array(
            'success' => true,
        );

        echo json_encode($response);
    }


    public function add_post(){
        session_start();

        $post_text = null;
        $post_image = null;
        // Get post argument 
        if (isset($_POST['post_text']) == true) {
            $post_text = $_POST['post_text'];
        }

        $image_path = null;
        if (isset($_FILES['post_image']) == true) {
            $post_image = $_FILES['post_image'];
            $image_path = $this->save_image($post_image, $_SESSION['user_id']);
        }
        // Get connected username from session 
        $connected_username = $_SESSION['username'];

        $connected_user_id = getUserID($connected_username);

        if ($connected_user_id == -1) {
            $response = array(
                'success' => false,
                'error' => 'User not found',
            );
            echo json_encode($response);
            return;
        }

        // Insert the post in the database
        $sql = "INSERT INTO userpost (author_id, content, image_path, likes, repost, time) VALUES ('".$connected_user_id."', '".$post_text."', '".$image_path."', '0', '0'," . time() .")";
        $results = $this->sqlConnector->ask_database($sql);

        // Get id of the post
        $sql = "SELECT post_id FROM userpost WHERE author_id = '".$connected_user_id."' AND content = '".$post_text."' AND image_path = '".$image_path."'";
        $results = $this->sqlConnector->ask_database($sql);
        $post_id = $results->fetch_assoc()['post_id'];

        // Add every hashtag from the post in the database
        $hashtagsInPost = searchHashtagsInContent($post_text);
        if ($hashtagsInPost != null){
            foreach ($hashtagsInPost as $hashtag) {
                addHashtag($this->sqlConnector, $hashtag, $post_id);
            }    
        }

        $response = array(
            'success' => true,
        );
        echo json_encode($response);
    }

    public function save_image($image_to_save, $user_id){
        if ($image_to_save != NULL){
            // Generate a new name 
            // TIME + USER_ID + RANDOM STRING +  EXTENSION
            $image_name = time().$user_id.rand(1000, 9999).'.'.pathinfo($image_to_save['name'], PATHINFO_EXTENSION);
            $image_path = 'images/userImages/'.$image_name;
            move_uploaded_file($image_to_save['tmp_name'], '../images/userImages/'.$image_name);
            return $image_path;
        }
        else {
            return null;
        }
    }
}


$managePost = new ManagePostObj();
?>
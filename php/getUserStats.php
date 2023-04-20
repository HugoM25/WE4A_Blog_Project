<?php

require_once 'SqlConnector.php';
require_once 'dbUtils.php';

class GetUserStatsObj {
    public $sqlConnector;

    public function __construct() {
        // Create sql connector
        $this->sqlConnector = new SqlConnector();
        
        if ($this->sqlConnector->is_working == false) {
            die("Connection failed: " . $this->sqlConnector->conn->connect_error);
        }
        // Take GET parameter 
        if (isset($_GET['username'])) {
            $user_id = getUserId($_GET['username']);

            if ($user_id == -1) {
                $response = array( 
                    "success" => false,
                    "error" => "User not found"
                );
                header("Content-Type: application/json");
                echo json_encode($response);
            }

            $this->getInfosOnProfile($user_id);
        }
        else {
            $response = array( 
                "success" => false,
                "error" => "No username given"
            );
            header("Content-Type: application/json");
            echo json_encode($response);
        }
    }
    public function getInfosOnProfile($user_id){
        
        // Count the number of posts
        $sql = "SELECT COUNT(*) AS nb_posts FROM userpost WHERE author_id = '".$user_id."'";
        $result = $this->sqlConnector->ask_database($sql);

        if ($result != null){
            $row = $result->fetch_assoc();
            $nb_posts = $row["nb_posts"];
        }
        else {
            $nb_posts = 0;
        }

        // Count the number of likes done by user
        $sql = "SELECT COUNT(*) AS nb_likes FROM post_likes WHERE user_id = '".$user_id."'";
        $result = $this->sqlConnector->ask_database($sql);

        if ($result != null){
            $row = $result->fetch_assoc();
            $nb_likes = $row["nb_likes"];
        }
        else {
            $nb_likes = 0;
        }

        // Count the number of followers
        $sql = "SELECT COUNT(*) AS nb_followers FROM follow WHERE followed_id = '".$user_id."'";
        $result = $this->sqlConnector->ask_database($sql);

        if ($result != null){
            $row = $result->fetch_assoc();
            $nb_followers = $row["nb_followers"];
        }
        else {
            $nb_followers = 0;
        }

        // Count the number of following
        $sql = "SELECT COUNT(*) AS nb_following FROM follow WHERE follower_id = '".$user_id."'";
        $result = $this->sqlConnector->ask_database($sql);

        if ($result != null){
            $row = $result->fetch_assoc();
            $nb_following = $row["nb_following"];
        }
        else {
            $nb_following = 0;
        }
        
        // Return everything
        $response = array( 
            "success" => true,
            "nb_posts" => $nb_posts,
            "nb_likes" => $nb_likes,
            "nb_followers" => $nb_followers,
            "nb_following" => $nb_following
        );
        header("Content-Type: application/json");
        echo json_encode($response);
    }
}

// Create new object
$getUserStatsObj = new GetUserStatsObj();
?>
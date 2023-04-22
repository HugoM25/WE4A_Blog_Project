<?php
require_once('SqlConnector.php');

class ManageLikesObj {

    public $sqlConnector;

    public function __construct(){
        $this->sqlConnector = new SqlConnector();

        if ($this->sqlConnector->is_working == false) {
            die("Connection failed: " . $this->sqlConnector->conn->connect_error);
        }

        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        
        isset($_POST['post_id']) ? $post_id = $_POST['post_id'] : $post_id = null;
        isset($_SESSION['user_id']) ? $user_id = $_SESSION['user_id'] : $user_id = null;

        if ($this->checkLike($post_id, $user_id)) {
            $this->unlikePost($post_id, $user_id);
        }
        else {
            $this->likePost($post_id, $user_id);
        }
    }

    public function checkLike($post_id, $user_id){
        /*
        Method to check if the user has already liked the post
        @param post_id: The id of the post
        @param user_id: The id of the user
        @return: True if the user has already liked the post, false otherwise
        */

        $sql = "SELECT * FROM post_likes WHERE user_id = '".$user_id."' AND post_id = '".$post_id."'";
        $result = $this->sqlConnector->ask_database($sql);

        if ($result != null) {
            return true;
        }
        else {
            return false; 
        }
    }

    public function likePost($post_id, $user_id) {
        $sql = "INSERT INTO post_likes (user_id, post_id) VALUES ('".$user_id."', '".$post_id."')";
        $result = $this->sqlConnector->ask_database($sql);

        // Increase the number of reposts
        $sql = "UPDATE userpost SET likes = likes + 1 WHERE post_id = '".$post_id."'";
        $result = $this->sqlConnector->ask_database($sql);

        echo json_encode(array("success" => true));
    }

    public function unlikePost($post_id, $user_id) {
        $sql = "DELETE FROM post_likes WHERE user_id = '".$user_id."' AND post_id = '".$post_id."'";
        $result = $this->sqlConnector->ask_database($sql);


        // Decrease the number of reposts
        $sql = "UPDATE userpost SET likes = likes - 1 WHERE post_id = '".$post_id."'";
        $result = $this->sqlConnector->ask_database($sql);

        echo json_encode(array("success" => true));
    }
}

$manageLikesObj = new ManageLikesObj();

?>
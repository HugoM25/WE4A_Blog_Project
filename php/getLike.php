<?php
require_once('SqlConnector.php');

class GetLikeObj {

    public $sqlConnector;

    public function __construct(){
        $this->sqlConnector = new SqlConnector();

        if ($this->sqlConnector->is_working == false) {
            die("Connection failed: " . $this->sqlConnector->conn->connect_error);
        }

        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        
        isset($_GET['post_id']) ? $post_id = $_GET['post_id'] : $post_id = null;
        isset($_SESSION['user_id']) ? $user_id = $_SESSION['user_id'] : $user_id = null;

        if (isset($_GET['post_id']) && isset($_SESSION['user_id'])) {
            $this->checkLike($post_id, $user_id);
        }
        else {
            echo json_encode(array("success" => false, "error" => "Missing parameters"));
        }
    }

    public function checkLike($post_id, $user_id){
        /* 
        * Check if the user has Liked the post
        * @param int $post_id
        * @param int $user_id
        */

        $sql = "SELECT * FROM post_likes WHERE user_id = '".$user_id."' AND post_id = '".$post_id."'";
        $result = $this->sqlConnector->ask_database($sql);

        if ($result != null) {
            echo json_encode(array("success" => true, "has_liked" => true));
        }
        else {
            echo json_encode(array("success" => true, "has_liked" => false));
        }
    }
}

$getLikeObj = new GetLikeObj();
?>
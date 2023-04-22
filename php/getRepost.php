<?php
require_once('SqlConnector.php');

class GetRepostObj {

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
            $this->checkRepost($post_id, $user_id);
        }
        else {
            echo json_encode(array("success" => false, "error" => "Missing parameters"));
        }
    }

    public function checkRepost($post_id, $user_id){
        /* 
        * Check if the user has reposted the post
        * @param int $post_id
        * @param int $user_id
        */

        $sql = "SELECT * FROM post_reposts WHERE post_id = ".$post_id." AND user_id = ".$user_id;
        $result = $this->sqlConnector->ask_database($sql);

        if ($result != null) {
            echo json_encode(array("success" => true, "has_reposted" => true));
        }
        else {
            echo json_encode(array("success" => true, "has_reposted" => false));
        }
    }
}

$getRepostObj = new GetRepostObj();
?>
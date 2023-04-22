<?php
require_once('SqlConnector.php');

class ManageRepostsObj {

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

        if ($this->checkRepost($post_id, $user_id)) {
            $this->unrepostPost($post_id, $user_id);
        }
        else {
            $this->repostPost($post_id, $user_id);
        }
    }

    public function checkRepost($post_id, $user_id){
        $sql = "SELECT * FROM post_reposts WHERE post_id = ".$post_id." AND user_id = ".$user_id;
        $result = $this->sqlConnector->ask_database($sql);

        if ($result != null) {
            return true;
        }
        else {
            return false; 
        }
    }

    public function repostPost($post_id, $user_id) {
        $sql = "INSERT INTO post_reposts (post_id, user_id) VALUES ($post_id, ".$user_id.")";
        $result = $this->sqlConnector->ask_database($sql);

        // Increase the number of reposts
        $sql = "UPDATE userpost SET repost = repost + 1 WHERE post_id = $post_id";
        $result = $this->sqlConnector->ask_database($sql);

        echo json_encode(array("success" => true));
    }

    public function unrepostPost($post_id, $user_id) {
        $sql = "DELETE FROM post_reposts WHERE post_id = $post_id AND user_id = ".$user_id;
        $result = $this->sqlConnector->ask_database($sql);


        // Decrease the number of reposts
        $sql = "UPDATE userpost SET repost = repost - 1 WHERE post_id = $post_id";
        $result = $this->sqlConnector->ask_database($sql);

        echo json_encode(array("success" => true));
    }
}

$manageRepostsObj = new ManageRepostsObj();

?>
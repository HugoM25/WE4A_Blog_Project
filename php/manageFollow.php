<?php
require_once('SqlConnector.php');
require_once('dbUtils.php');

class ManageFollowObj {
    public $sqlConnector; 

    public function __construct() {
        $this->sqlConnector = new SqlConnector();

        if ($this->sqlConnector->is_working == false) {
            die("Connection failed: " . $this->sqlConnector->conn->connect_error);
        }

        // Get the action to do
        isset($_POST['action']) ? $action = $_POST['action'] : $action = null;

        // Get the target user name
        isset($_POST['target']) ? $target = $_POST['target'] : $target = null;

        if ($action == 'follow') {
            $this->follow($target);
        }
        else if ($action == 'unfollow') {
            $this->unfollow($target);
        }
        else {
            $response = array(
                'success' => false,
                'error' => 'Action not found',
            );
            echo json_encode($response);
        }

        $response = array(
            'success' => true,
        );
        echo json_encode($response);

    }

    public function follow($target_id) {
        // Get connected user id
        session_start();
        $user_follower_id = $_SESSION['user_id'];

        $sql = "INSERT INTO follow (followed_id, follower_id) VALUES ($target_id, $user_follower_id)";
        $result = $this->sqlConnector->ask_database($sql);
    }

    public function unfollow($target_id) {
        // Get connected user id
        session_start();
        $user_follower_id = $_SESSION['user_id'];

        $sql = "DELETE FROM follow WHERE followed_id = $target_id AND follower_id = $user_follower_id";
        $result = $this->sqlConnector->ask_database($sql);
    }
}

$manageFollowObj = new ManageFollowObj();
?>
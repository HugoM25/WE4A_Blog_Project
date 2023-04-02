<?php

require_once('SqlConnector.php');
require_once('dbUtils.php');

class AddPostObj {
    public $sqlConnector;

    public function __construct() {
        // Create a connection to the database
        $this->sqlConnector = new SqlConnector();

        if ($this->sqlConnector->is_working == false) {
            die("Connection failed: " . $this->sqlConnector->conn->connect_error);
        }
        $post_text = null;
        $post_image = null;
        // Get post argument 
        if (isset($_POST['post_text']) == true) {
            $post_text = $_POST['post_text'];
        }

        if (isset($_POST['post_image']) == true) {
            $post_image = $_POST['post_image'];
        }
        // Get connected username from session 
        session_start();
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
        $sql = "INSERT INTO userpost (author_id, content, image_path, likes, repost, time) VALUES ('".$connected_user_id."', '".$post_text."', '".$post_image."', '0', '0'," . time() . ")";
        $results = $this->sqlConnector->ask_database($sql);

        $response = array(
            'success' => true,
        );
        echo json_encode($response);
    }
}


$addPost = new AddPostObj();
?>
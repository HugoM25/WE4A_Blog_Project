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
            default:
                $response = array(
                    'success' => false,
                    'error' => 'Action not found',
                );
                echo json_encode($response);
                break;
        }

        
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

        // Delete the post in the database
        $sql = "DELETE FROM userpost WHERE post_id = '".$post_id."' AND author_id = '".$connected_user_id."'";
        $results = $this->sqlConnector->ask_database($sql);

        $response = array(
            'success' => true,
        );

        echo json_encode($response);
    }


    public function add_post(){
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
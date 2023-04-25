<?php

require_once 'SqlConnector.php';
require_once 'dbUtils.php';

class GetUserInfosObj {
    public $sqlConnector;

    public function __construct() {
        // Create sql connector
        $this->sqlConnector = new SqlConnector();
        
        if ($this->sqlConnector->is_working == false) {
            die("Connection failed: " . $this->sqlConnector->conn->connect_error);
        }
        // Take POST parameter 
        if (isset($_POST['username'])) {
            $username = urldecode($_POST['username']);
            $user_id = getUserId($username);

            if ($user_id == -1) {
                $response = array( 
                    "success" => false,
                    "error" => "User not found"
                );
                header("Content-Type: application/json");
                echo json_encode($response);
            }
            else {
                $this->getInfosOnProfile($user_id);
            }

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
        
        // Get infos on user
        $sql = "SELECT * FROM siteuser WHERE user_id = '".$user_id."'";
        $result = $this->sqlConnector->ask_database($sql);

        if ($result != null){
            $row = $result->fetch_assoc();
        }
        
        // Return everything
        $response = array( 
            "success" => true,
            "name" => urldecode($row["name"]),
            "ref" => urldecode($row["ref"]),
            "profile_picture_path" => $row["profile_picture_path"],
            "user_id" => $row["user_id"],
        );
        header("Content-Type: application/json");
        echo json_encode($response);
    }
}

// Create new object
$getUserInfosObj = new GetUserInfosObj();
?>
<?php

include_once 'SqlConnector.php';

class GetInfoConnectedUserObj {
    public $sqlConnector;

    public $defaultMessageRes = array( 
        "success" => false,
        "user_id" => -1,
        "ref" => '@unknown',
        "name" => 'Unknown',
        "profile_picture_path" => 'images/default_pic.jpg',
    );

    public function __construct() {
        // Create sql connector
        $this->sqlConnector = new SqlConnector();
        
        if ($this->sqlConnector->is_working == false) {
            die("Connection failed: " . $this->sqlConnector->conn->connect_error);
        }

        // Get the user id from the session
        session_start();
        if (isset($_SESSION['user_id'])) {
            $this->getDataOnUser($_SESSION['user_id']);
        }
        else {
            header("Content-Type: application/json");
            echo json_encode($this->defaultMessageRes);
            exit();
        }
    }

    public function getDataOnUser($curr_user_id){

        $sql = "SELECT name, ref, profile_picture_path, user_id FROM siteuser WHERE user_id = '".$_SESSION['user_id']."'";
        $result = $this->sqlConnector->ask_database($sql);
    
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $response = array( 
                "user_id" => $row["user_id"],
                "ref" => $row["ref"],
                "name" => $row["name"],
                "profile_picture_path" => $row["profile_picture_path"],
                "success" => true
            );
            header("Content-Type: application/json");
            echo json_encode($response);
        }
        else {
            header("Content-Type: application/json");
            echo json_encode($this->defaultMessageRes);
        }
    }
}

$GetInfoConnectedUserObj = new GetInfoConnectedUserObj();

?>
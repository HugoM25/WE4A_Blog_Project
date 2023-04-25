<?php 
require_once('SqlConnector.php');

class GetFollowObj {

    public $sqlConnector;

    public $limit; 

    public function __construct(){
        $this->sqlConnector = new SqlConnector();
        if ($this->sqlConnector->is_working == false) {
            die("Connection failed: " . $this->sqlConnector->conn->connect_error);
        }

        isset($_GET['follower_id']) ? $follower_id = $_GET['follower_id'] : $follower_id = null;
        isset($_GET['followed_id']) ? $followed_id = $_GET['followed_id'] : $followed_id = null;
        isset($_GET['limit']) ? $this->limit = $_GET['limit'] : $this->limit = 10;
        if ($followed_id == null && $follower_id == null) {
            die("No parameters given");
        }


        if ($followed_id != null && $follower_id != null) {
            $this->checkFollow($follower_id, $followed_id);
        }
        else if ($followed_id != null && $follower_id == null ) {
            $this->getFollowers($followed_id);
        }
        else if ($follower_id != null && $followed_id == null) {
            $this->getFollowed($follower_id);
        }
    }

    public function checkFollow($follower_id, $followed_id) {
        $sql = "SELECT * FROM follow WHERE follower_id = $follower_id AND followed_id = $followed_id";

        $result = $this->sqlConnector->ask_database($sql);
        
        if ($result != null) {
            echo json_encode(array("success" => true, "follow" => true));
        }
        else {
            echo json_encode(array("success" => true, "follow" => false));
        }
    }

    public function getFollowers($followed_id) {
        $sql = "SELECT * FROM follow INNER JOIN siteuser ON follow.follower_id = siteuser.user_id WHERE followed_id = $followed_id";
        $results = $this->sqlConnector->ask_database($sql);
        $response = array();
        $i = 0;

        if ($results == null) {
            echo json_encode($response);
            return;  
        }
        while($row = $results->fetch_assoc()) {

            // Limit the number of results
            if ($i >= $this->limit) {
                break;
            }

            // Put the data in the response array
            $response[$i] = array(
                "user_id" => $row["user_id"],
                "ref" => urldecode($row["ref"]),
                "name" => urldecode($row["name"]),
                "profile_picture_path" => $row["profile_picture_path"],
            );

            $i++;
        }

        echo json_encode($response);
    }

    public function getFollowed($follower_id) {
        $sql = "SELECT * FROM follow INNER JOIN siteuser ON follow.followed_id = siteuser.user_id WHERE follower_id = $follower_id";
        $results = $this->sqlConnector->ask_database($sql);
        $response = array();
        $i = 0;

        // If there are no results
        if ($results == null) {
            echo json_encode($response);
            return;  
        }

        while($row = $results->fetch_assoc()) {
            
            // Limit the number of results
            if ($i >= $this->limit) {
                break;
            }

            // Put the data in the response array
            $response[$i] = array(
                "user_id" => $row["user_id"],
                "ref" => urldecode($row["ref"]),
                "name" => urldecode($row["name"]),
                "profile_picture_path" => $row["profile_picture_path"],
            );
            $i++;


        }

        echo json_encode($response);
    }
}

$GetFollowObj = new GetFollowObj();
?>
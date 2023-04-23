<?php

require_once('SqlConnector.php');

class GetTrendsObj {
    public $sqlConnector;

    public function __construct(){
        //  Create a connection to the database
        $this->sqlConnector = new SqlConnector();

        if ($this->sqlConnector->is_working == false) {
            die("Connection failed: " . $this->sqlConnector->conn->connect_error);
        }

        // Get the parameters 
        isset($_POST['limit']) ? $limit = $_POST['limit'] : $limit = 10;

        // Get the trends
        $trends = $this->get_trends($limit);

        // Send the response
        $response = array(
            'success' => true,
            'trends' => $trends,
        );
        echo json_encode($response);

    }

    public function get_trends($limit) {
        // Sql for counting the number of post for each hashtag and returns the most used hashtags
        $sql = "SELECT hashtag, COUNT(hashtag) AS count FROM trends GROUP BY hashtag ORDER BY count DESC LIMIT $limit";
        $result = $this->sqlConnector->ask_database($sql);

        $trends = array();

        // If there is no result
        if ($result == null) {
            return $trends;
        }

        // Get the trends
        $i = 0;
        while ($row = $result->fetch_assoc()) {
            $trends[$i] = $row;
            $i++;
        }

        return $trends;
    }
}

$GetTrendsObj = new GetTrendsObj();

?>
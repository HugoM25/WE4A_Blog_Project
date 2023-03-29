<?php

class SqlConnector {
    // Database credentials
    private $servername = "localhost";
    private $username = "root";
    private $password = "root";
    private $dbname = "we4a_blog_db";

    public $conn;
    public $is_working = false;

    // Create a connection to the database
    function __construct() {
        // Create connection
        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        // Check connection
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
        else {
            $this->is_working = true;
        }
    }

    // Execute a SQL query and return the result
    function ask_database($sql) {
        $result = $this->conn->query($sql);
        if ($result->num_rows > 0) {
            return $result;
        }
        else {
            return null;
        }
    }

    // Close the connection to the database
    function __destruct() {
        $this->conn->close();
    }
}

?>
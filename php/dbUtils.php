<?php

function getUserID($curr_username){
    $user_current_id = -1;

    // connect to the database
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "we4a_blog_db";
    $conn = new mysqli($servername, $username, $password, $dbname);

    // check the database for the user's id
    $sql = "SELECT user_id FROM siteuser WHERE name = '".$curr_username."' ORDER BY name DESC LIMIT 1";

    $result = $conn->query($sql);

    if ($result->num_rows > 0 ) { 
        $row = $result->fetch_assoc();
        $user_current_id = $row["user_id"];
    }

    $conn->close();
    return $user_current_id; 
}

?>
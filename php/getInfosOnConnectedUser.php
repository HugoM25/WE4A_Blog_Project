<?php

require_once('connectedpanel.php');

// Get the user id from the session
session_start();
if (isset($_SESSION['user_id'])) {
    getDataOnUser($_SESSION['user_id']);
}
else {
    echo "No user logged in";
}

function getDataOnUser($curr_user_id){
    // Get data on the user 
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "we4a_blog_db";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    $sql = "SELECT name, ref, profile_picture_path, user_id FROM siteuser WHERE user_id = '".$_SESSION['user_id']."'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $response = array( 
            "user_id" => $row["user_id"],
            "ref" => $row["ref"],
            "name" => $row["name"],
            "profile_picture_path" => $row["profile_picture_path"]
        );
        header("Content-Type: application/json");
        echo json_encode($response);
    }
    else {
        echo "0 results";
    }

    $conn->close();
}
?>
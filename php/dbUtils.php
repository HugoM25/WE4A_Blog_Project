<?php

require_once('SqlConnector.php');

function getUserID($curr_username){
    $user_current_id = -1;

    $sqlConnector = new SqlConnector();

    // check the database for the user's id
    $sql = "SELECT user_id FROM siteuser WHERE name = '".$curr_username."' ORDER BY name DESC LIMIT 1";

    $result = $sqlConnector->ask_database($sql);
    if ($result != null) { 
        $row = $result->fetch_assoc();
        $user_current_id = $row["user_id"];
    }
    return $user_current_id; 
}

?>
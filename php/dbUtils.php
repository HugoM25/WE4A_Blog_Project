<?php

require_once('SqlConnector.php');

function getUserID($curr_username){
    /*
    * This function will return the user's id from the database
    * If the user is not in the database, it will return -1
    */
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


function cleanName($name){
    /*
    * This function will clean the name of the user to make it appropriate for the database/url
    * It will remove all accents and special characters
    * May not be the best but it does the job
    */
    $new_name = str_replace('é', 'e', $name);
    $new_name = str_replace('è', 'e', $new_name);
    $new_name = str_replace('ê', 'e', $new_name);
    $new_name = str_replace('ë', 'e', $new_name);
    $new_name = str_replace('à', 'a', $new_name);
    $new_name = str_replace('â', 'a', $new_name);
    $new_name = str_replace('ä', 'a', $new_name);
    $new_name = str_replace('ù', 'u', $new_name);
    $new_name = str_replace('û', 'u', $new_name);
    $new_name = str_replace('ü', 'u', $new_name);
    $new_name = str_replace('î', 'i', $new_name);
    $new_name = str_replace('ï', 'i', $new_name);
    $new_name = str_replace('ô', 'o', $new_name);
    $new_name = str_replace('ö', 'o', $new_name);
    $new_name = str_replace('ç', 'c', $new_name);
    $new_name = str_replace(' ', '_', $new_name);
    $new_name = str_replace("'", '', $new_name);
    $new_name = str_replace('"', '', $new_name);
    $new_name = str_replace('(', '', $new_name);
    $new_name = str_replace(')', '', $new_name);
    $new_name = str_replace('?', '', $new_name);
    $new_name = str_replace('!', '', $new_name);
    $new_name = str_replace('.', '', $new_name);
    $new_name = str_replace(',', '', $new_name);
    $new_name = str_replace(';', '', $new_name);
    $new_name = str_replace(':', '', $new_name);
    $new_name = str_replace('/', '', $new_name);
    $new_name = str_replace('\\', '', $new_name);
    $new_name = str_replace('|', '', $new_name);
    $new_name = str_replace('=', '', $new_name);
    $new_name = str_replace('+', '', $new_name);
    $new_name = str_replace('*', '', $new_name);
    $new_name = str_replace('&', '', $new_name);
    $new_name = str_replace('^', '', $new_name);
    $new_name = str_replace('%', '', $new_name);
    $new_name = str_replace('$', '', $new_name);
    $new_name = str_replace('£', '', $new_name);
    $new_name = str_replace('¤', '', $new_name);
    $new_name = str_replace('`', '', $new_name);
    $new_name = str_replace('~', '', $new_name);
    $new_name = str_replace('#', '', $new_name);
    $new_name = str_replace('@', '', $new_name);
    $new_name = str_replace('§', '', $new_name);
    $new_name = str_replace('°', '', $new_name);
    $new_name = str_replace('²', '', $new_name);
    $new_name = str_replace('³', '', $new_name);
    $new_name = str_replace('µ', '', $new_name);
    $new_name = str_replace('€', '', $new_name);
    $new_name = str_replace('¨', '', $new_name);
    $new_name = str_replace('æ', 'ae', $new_name);

    return $new_name;
}

?>
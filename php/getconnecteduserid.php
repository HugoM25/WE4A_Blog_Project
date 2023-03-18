<?php 
require_once('connectedpanel.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "we4a_blog_db";

//Vérifie si les cookies sont présents
if ( isset( $_COOKIE["name"] ) && isset( $_COOKIE["password"] ) ) {
    $test_name = $_COOKIE["name"];
    $test_password = $_COOKIE["password"];
}

$loginSuccessful = false;


// Check if the user is logged in with correct credentials
if ( isset($test_name) && isset($test_password) ){
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }

    // Create the query to get users that matches the username
    $sql = "SELECT name, user_id, password_hash, profile_picture_path, ref FROM siteuser WHERE name = '".$test_name."' ORDER BY name DESC LIMIT 1";
    $result = $conn->query($sql);

    // Check the password 
    if ($result->num_rows > 0 ) { 
        $row = $result->fetch_assoc();
        if (password_verify($test_password, $row["password_hash"])){
             // If the password is correct, the user is logged in
            $loginSuccessful = true;
            $response = array( 
                "user_id" => $row["user_id"]
            );
            header("Content-Type: application/json");
            echo json_encode($response);
            exit();
        }
    } 
    else {
        echo "Username or password incorrect";
    }
    $conn->close();
}
else {
    echo "No cookies";
}

?>

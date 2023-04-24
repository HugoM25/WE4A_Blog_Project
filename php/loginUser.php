
<?php

require_once('dbUtils.php');
require_once('SqlConnector.php');


// retrieve the user's credentials from the request body
$test_username = $_POST['username'];
$test_password = $_POST['password'];


// Start DB connection
$sqlConnector = new SqlConnector();

// validate the user's credentials and create a session for them
if (validateCredentials($test_username, $test_password, $sqlConnector)) {
    session_start();
    $_SESSION['username'] = $test_username;
    $_SESSION['loggedin'] = true;
    $_SESSION['user_id'] = getUserID($test_username);
    
    echo $_SESSION['user_id'];
    echo json_encode(['success' => true]);
}
else {
    echo json_encode(['success' => false, 'error' => 'Invalid credentials']);
}

function validateCredentials($test_username, $test_password, $sqlConnector) {
    // assume the credentials are invalid
    $is_valid = false; 
    // check the database for the user's credentials
    $sql = "SELECT name, user_id, password_hash, profile_picture_path, ref FROM siteuser WHERE name = '".$test_username."' ORDER BY name DESC LIMIT 1";
    $result = $sqlConnector->ask_database($sql);

    // Check the password 
    if ($result->num_rows > 0 ) { 
        $row = $result->fetch_assoc();
        if (password_verify($test_password, $row["password_hash"])){
            $is_valid = true; 
        }
    } 
    // close the connection
    $conn->close();
    return $is_valid;
}

function createNewCredentials($test_username, $test_password, $sqlConnector) {

    // check the database for the user's credentials
    $sql = "INSERT INTO siteuser (name, password_hash, ref) VALUES ('".$test_username."', '".password_hash($test_password, PASSWORD_DEFAULT)."', '@".$username."')";
    $result = $sqlConnector->ask_database($sql);

    // close the connection
    $conn->close();
}
?>
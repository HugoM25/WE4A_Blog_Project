
<?php

require_once('dbUtils.php');

// retrieve the user's credentials from the request body
$test_username = $_POST['username'];
$test_password = $_POST['password'];

// validate the user's credentials and create a session for them
if (validateCredentials($test_username, $test_password)) {
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

function validateCredentials($test_username, $test_password) {
    // assume the credentials are invalid
    $is_valid = false; 
    // connect to the database
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "we4a_blog_db";
    $conn = new mysqli($servername, $username, $password, $dbname);

    // check the database for the user's credentials
    $sql = "SELECT name, user_id, password_hash, profile_picture_path, ref FROM siteuser WHERE name = '".$test_username."' ORDER BY name DESC LIMIT 1";
    $result = $conn->query($sql);

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

function createNewCredentials($test_username, $test_password) {
    // connect to the database
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "we4a_blog_db";
    $conn = new mysqli($servername, $username, $password, $dbname);

    // check the database for the user's credentials
    $sql = "INSERT INTO siteuser (name, password_hash, ref) VALUES ('".$test_username."', '".password_hash($test_password, PASSWORD_DEFAULT)."', '@".$username."')";
    $result = $conn->query($sql);

    // close the connection
    $conn->close();
}
?>
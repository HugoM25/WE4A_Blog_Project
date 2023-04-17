<?php 
require_once('SqlConnector.php');
// get user id 
session_start();
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
}
else {
    $response = array( 
        "success" => false
    );
    header("Content-Type: application/json");
    echo json_encode($response);
    exit();
}

// get post id
$post_id = $_POST['post_id'];

// connect to the database
$sqlConnector = new SqlConnector();

if ($sqlConnector->is_working == false) {
    die("Connection failed: " . $sqlConnector->conn->connect_error);
}

// Sql query to check if the user has already liked the post
$sql = "SELECT * FROM post_likes WHERE user_id = '".$user_id."' AND post_id = '".$post_id."'";

$result = $sqlConnector->ask_database($sql);

// check if the user has already liked the post
if ($result != null && $result->num_rows > 0) {
    //Already liked so we delete the like
    $sql2 = "DELETE FROM post_likes WHERE user_id = '".$user_id."' AND post_id = '".$post_id."'";
    $result2 = $sqlConnector->ask_database($sql2);

    // Decrease the number of likes of the post
    $sql3 = "UPDATE userpost SET likes = likes - 1 WHERE post_id = '".$post_id."'";
    $result3 = $sqlConnector->ask_database($sql3);
} 
else {
    //Not already liked so we add the like
    $sql2 = "INSERT INTO post_likes (user_id, post_id) VALUES ('".$user_id."', '".$post_id."')";
    $result2 = $sqlConnector->ask_database($sql2);

    // Increase the number of likes of the post
    $sql3 = "UPDATE userpost SET likes = likes + 1 WHERE post_id = '".$post_id."'";
    $result3 = $sqlConnector->ask_database($sql3);
}

$response = array( 
    "success" => true
);
header("Content-Type: application/json");
echo json_encode($response);
?>

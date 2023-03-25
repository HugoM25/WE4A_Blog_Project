<?php 
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

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "we4a_blog_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Sql query to check if the user has already liked the post
$sql = "SELECT * FROM post_likes WHERE user_id = '".$user_id."' AND post_id = '".$post_id."'";

$result = $conn->query($sql);

// check if the user has already liked the post
if ($result->num_rows > 0) {
    //Already liked
    $sql2 = "DELETE FROM post_likes WHERE user_id = '".$user_id."' AND post_id = '".$post_id."'";
    $result2 = $conn->query($sql2);
} 
else {
    //Not already liked
    $sql2 = "INSERT INTO post_likes (user_id, post_id) VALUES ('".$user_id."', '".$post_id."')";
    $result2 = $conn->query($sql2);
}

$response = array( 
    "success" => true
);
header("Content-Type: application/json");
echo json_encode($response);

// close the connection
$conn->close();
?>

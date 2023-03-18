<?php 
// get user id 
session_start();
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
}
else {
    echo "No user logged in";
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
    $sql = "DELETE FROM post_likes WHERE user_id = '".$user_id."' AND post_id = '".$post_id."'";
} 
else {
    //Not already liked
    $sql = "INSERT INTO post_likes (user_id, post_id) VALUES ('".$user_id."', '".$post_id."')";
}

$result = $conn->query($sql);

// close the connection
$conn->close();


?>

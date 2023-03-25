<?php 

// Get the parameters from the url
isset($_GET['post_id']) ? $post_id = $_GET['post_id'] : $post_id = -1;

 // get the user id from the session (if the user is logged in)
session_start();
if (isset($_SESSION['user_id']) == false) {
    // User is not logged in so return false
    $response = array( 
        "has_liked" => false
    );
    echo json_encode($response);
    exit();
}

$user_id = $_SESSION['user_id'];

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "we4a_blog_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

$sql = "SELECT * FROM post_likes WHERE user_id = '".$user_id."' AND post_id = '".$post_id."'";

$result = $conn->query($sql);

$has_liked = false;
if ($result->num_rows > 0) {
    $has_liked = true;
} 
else {
    $has_liked = false;
}
// close the connection
$conn->close();

$response = array( 
    "has_liked" => $has_liked
);
echo json_encode($response);

?>
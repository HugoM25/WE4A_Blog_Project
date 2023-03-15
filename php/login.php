
<?php 
require_once('postmaker.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "we4a_blog_db";

$test_username = $_POST["username"];
$test_password = $_POST["password"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Create the query to get users that matches the password and username
$sql = "SELECT name, password_hash FROM siteuser WHERE name = '".$test_username."' ORDER BY name DESC LIMIT 1";
$result = $conn->query($sql);

//If there are results from the query
if ($result->num_rows > 0 && password_verify($test_password, $result->fetch_assoc()["password_hash"])) { 
    echo "success";
} 
else {
    echo "Username or password incorrect";
}
$conn->close();
?>

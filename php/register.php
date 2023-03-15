
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

// Create a query to check if the username is not already taken
$sql = "SELECT name, password_hash FROM siteuser WHERE name = '".$test_username."'";

$result = $conn->query($sql);

//If there are results from the query
if ($result->num_rows > 0) {
    //Username already taken
    echo "Username already taken";
}
else {
    // Create the query to add the user to the database
    $sql2 = "INSERT INTO `siteuser` (`name`, `password_hash`) VALUES ('".$test_username."', '".password_hash($test_password, PASSWORD_DEFAULT)."')";
    $result2 = $conn->query($sql2);
    echo "success";
}
$conn->close();
?>

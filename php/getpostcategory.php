
<?php 
require_once('postmaker.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "we4a_blog_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// get the nb parameter
$nb= $_GET['nb'];

// get the allow_image parameter 0: no image, 1: image
$allow_image = $_GET['allow_image'];

// get the allow text parameter 0: no text, 1: text
$allow_text = $_GET['allow_text'];


// Create the query to get the most liked posts
$sql = "SELECT post_id, content,likes,repost, author_id, time, image_path FROM userpost"."ORDER BY likes DESC LIMIT 5";


$result = $conn->query($sql);


$tmp_nb = $nb;

//If there are results from the query
if ($result->num_rows > 0) {
  // for every row display the result
  while($row = $result->fetch_assoc()) {
    // Display the posts while the nb is not 0
    if ($tmp_nb == 0) {
      break;
    }

    //Get infos on the user who posted the post
    $sql2 = 'SELECT user_id, ref, name FROM siteuser WHERE user_id = '.$row["author_id"];
    $user_info_result = $conn->query($sql2);
    if ($user_info_result->num_rows > 0) {
      $user_info_result = $user_info_result->fetch_assoc();
      echo create_post($user_info_result, $row);
    $tmp_nb--;
    } else {
      echo "0 results";
    }
    
  }
} 
else {
  echo "0 results";
}
$conn->close();
?>

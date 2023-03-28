
<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "we4a_blog_db";

$test_username = $_POST["username"];
$test_password = $_POST["password"];

if (checkUsernameExist($test_username)){
  $response = array( 
    "success" => false,
    "error" => "Username already taken"
  );
  header("Content-Type: application/json");
  echo json_encode($response);
  exit();
}

addUserToDb($test_username, $test_password);
startUserSession($test_username);

$response = array( 
  "success" => true
);
header("Content-Type: application/json");
echo json_encode($response);


function startUserSession($curr_username){
  session_start();
  $_SESSION['username'] = $curr_username;
  $_SESSION['loggedin'] = true;
  $_SESSION['user_id'] = getUserID($curr_username);
}

function checkUsernameExist($test_username) {
  $servername = "localhost";
  $username = "root";
  $password = "root";
  $dbname = "we4a_blog_db";
  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Create a query to check if the username is not already taken
  $sql = "SELECT name, password_hash FROM siteuser WHERE name = '".$test_username."'";
  $result = $conn->query($sql);


  $exist = false;

  //If there are results from the query
  if ($result->num_rows > 0) {
    //Username already taken
    $exist = true;
  }
  $conn->close();
  return $exist;
}

function addUserToDb($new_username, $new_password){
  $servername = "localhost";
  $username = "root";
  $password = "root";
  $dbname = "we4a_blog_db";
  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Create the query to add the user to the database
  $sql2 = "INSERT INTO `siteuser` (`name`, `password_hash`, `ref`) VALUES ('".$new_username."', '".password_hash($new_password, PASSWORD_DEFAULT)."', '@".$new_username."')";
  $result2 = $conn->query($sql2);

  $conn->close();
}

function getUserID($curr_username){
  $user_current_id = -1;

  // connect to the database
  $servername = "localhost";
  $username = "root";
  $password = "root";
  $dbname = "we4a_blog_db";
  $conn = new mysqli($servername, $username, $password, $dbname);

  // check the database for the user's id
  $sql = "SELECT user_id FROM siteuser WHERE name = '".$curr_username."' ORDER BY name DESC LIMIT 1";

  $result = $conn->query($sql);

  if ($result->num_rows > 0 ) { 
      $row = $result->fetch_assoc();
      $user_current_id = $row["user_id"];
  }

  $conn->close();
  return $user_current_id; 
}

?>

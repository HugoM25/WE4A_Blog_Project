
<?php 

require_once('dbUtils.php');
require_once('sqlConnector.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$sqlConnector = new SqlConnector();

$test_username = $_POST["username"];
$test_username = cleanName($test_username);

if ($test_username == ""){
  $response = array( 
    "success" => false,
    "error" => "Username cannot be empty"
  );
  header("Content-Type: application/json");
  echo json_encode($response);
  exit();
}

$test_password = $_POST["password"];


if (checkUsernameExist($test_username, $sqlConnector)){
  $response = array( 
    "success" => false,
    "error" => "Username already taken"
  );
  header("Content-Type: application/json");
  echo json_encode($response);
  exit();
}

addUserToDb($test_username, $test_password, $sqlConnector);
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

function checkUsernameExist($test_username, $sqlConnector) {
  $sql = "SELECT name, password_hash FROM siteuser WHERE name = '".urlencode($test_username)."'";
  $result = $sqlConnector->ask_database($sql);

  $exist = false;

  //If there are results from the query
  if ($result!= null) {
    //Username already taken
    $exist = true;
  }
  return $exist;
}

function addUserToDb($new_username, $new_password, $sqlConnector){
  // Create the query to add the user to the database
  $sql2 = "INSERT INTO `siteuser` (`name`, `password_hash`, `ref`) VALUES ('".urlencode($new_username)."', '".password_hash($new_password, PASSWORD_DEFAULT)."', '@".urlencode($new_username)."')";
  $result2 = $sqlConnector->ask_database($sql2);
}



?>

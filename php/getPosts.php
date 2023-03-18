
<?php 
require_once('postmaker.php');

// Function that generates the SQL query to get the posts
function generateSQLPostRequest($allow_image, $allow_text, $sort, $nb){
    $req = 'SELECT * FROM userpost'; 
    // Add a where clause if the allow_image or allow_text parameter is 0
    if ($allow_image == 0 || $allow_text == 0){
        $req = $req.' WHERE ';
        if ($allow_image == 0) {
            $req = $req.'image_path IS NULL ';
        }
        if ($allow_text == 0) {
            if ($allow_image == 0) {
                $req = $req.'AND ';
            }
            $req = $req.'image_path != "" ';
        }
    }
    $req = $req.' ORDER BY '.$sort.' DESC LIMIT '.$nb;
    return $req;
}

// Get the parameters from the url
isset($_GET['allow_image']) ? $allow_image = $_GET['allow_image'] : $allow_image = 1;
isset($_GET['allow_text']) ? $allow_text = $_GET['allow_text'] : $allow_text = 1;
isset($_GET['sort']) ? $sort = $_GET['sort'] : $sort = 'time';
isset($_GET['nb']) ? $nb = $_GET['nb'] : $nb = 10;


$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "we4a_blog_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

$sql = generateSQLPostRequest($allow_image, $allow_text, $sort, $nb);

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
        }
        else {
            echo "0 results";
        }
    }
} 
else {
    echo "0 results";
}
$conn->close();

?>


<?php 
require_once('postmaker.php');
require_once('dbUtils.php');

function generateSQLPostRequest($allow_image, $allow_text, $sort, $nb, $by_user){
    $req= 'SELECT * FROM userpost'; 
    $nb_where_clause = 0;
    // If there is a where clause to add
    if ($allow_image == 0 || $allow_text == 0 || $by_user){
        $req = $req.' WHERE ';
        // If we want to allow only image posts
        if ( $allow_image == 0 ) {
            $req = $req.'image_path IS NULL ';
            $nb_where_clause++;
        }
        // If we want to allow only text posts
        if ( $allow_text == 0) {
            if ($nb_where_clause > 0) {
                $req = $req.'AND ';
            }
            $req = $req.'image_path != "" ';
            $nb_where_clause++;
        }
        // If we want to filter by user
        if ($by_user) {
            if ($nb_where_clause > 0) {
                $req = $req.'AND ';
            }
            $req = $req.'author_id = '.getUserID($by_user);
            $nb_where_clause++;
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

if (isset($_GET['by_user']) == false) {
    $by_user = null;
}
else {
    $by_user = $_GET['by_user'];
    if (getUserID($by_user) == -1) {
        $by_user = null;
    }
}

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "we4a_blog_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

$sql = generateSQLPostRequest($allow_image, $allow_text, $sort, $nb, $by_user);
$result = $conn->query($sql);
$tmp_nb = $nb;
$i = 0;
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
            // Returns json with the post and the user infos
            $response[$i] = array( 
                "post" => array(
                    "post_id" => $row["post_id"],
                    "author_id" => $row["author_id"],
                    "content" => $row["content"],
                    "image_path" => $row["image_path"],
                    "time" => $row["time"],
                    "likes" => $row["likes"],
                    "repost" => $row["repost"]
                ),
                "user" => array(
                    "user_id" => $user_info_result["user_id"],
                    "ref" => $user_info_result["ref"],
                    "name" => $user_info_result["name"]
                )
            );
        $tmp_nb--;
        $i++;
        }
        else {
            echo "0 results";
        }
    }
    header("Content-Type: application/json");
    echo json_encode($response);
} 
else {
    echo "0 results";
}
$conn->close();

?>

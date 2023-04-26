<?php
    require_once 'SqlConnector.php';

    class ChangePdpObj {
        public $sqlConnector;

        public function __construct() {
            // Create sql connector
            $this->sqlConnector = new SqlConnector();
            
            if ($this->sqlConnector->is_working == false) {
                die("Connection failed: " . $this->sqlConnector->conn->connect_error);
            }

            // Get the user id from the session
            session_start();
            if (isset($_SESSION['user_id'])) {
                $this->changePdp($_SESSION['user_id']);
            }
            else {
                $response = array( 
                    "success" => false,
                    "error" => "No user connected"
                );
                header("Content-Type: application/json");
                echo json_encode($response);
            }
        }

        public function changePdp($curr_user_id){


            $target_dir = "images/userPdp/";

            $image_path = null;
            if (isset($_FILES['pdp_image']) == true) {
                // Save the new  profile picture
                $post_image = $_FILES['pdp_image'];
                $image_path = $this->save_image($post_image, $_SESSION['user_id'], $target_dir);

                // Delete the old profile picture
                $sql = "SELECT profile_picture_path FROM siteuser WHERE user_id = '".$curr_user_id."'";
                $result = $this->sqlConnector->ask_database($sql);

                if ($result != null){
                    $row = $result->fetch_assoc();
                    $old_image_path = $row['profile_picture_path'];
                    if ($old_image_path != null && $old_image_path != "" && $old_image_path != 'images/default_pic.jpg'){
                        unlink('../'.$old_image_path);
                    }
                }
            }




            // Update the database
            $sql = "UPDATE siteuser SET profile_picture_path = '".$image_path."' WHERE user_id = '".$curr_user_id."'";
            $result = $this->sqlConnector->ask_database($sql);
            
            $response = array(
                "success" => true,
                "image_path" => $image_path
            );

            header("Content-Type: application/json");
            echo json_encode($response);

        }
        
        public function save_image($image_to_save, $user_id, $folder_path){
            if ($image_to_save != NULL){
                // Generate a new name 
                // TIME + USER_ID + RANDOM STRING +  EXTENSION
                $image_name = time().$user_id.rand(1000, 9999).'.'.pathinfo($image_to_save['name'], PATHINFO_EXTENSION);
                $image_path = $folder_path.$image_name;
                move_uploaded_file($image_to_save['tmp_name'], '../'.$folder_path.$image_name);
                return $image_path;
            }
            else {
                return null;
            }
        }

    }

    $changePdpObj = new ChangePdpObj();
?>
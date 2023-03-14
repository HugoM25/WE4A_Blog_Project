<?php 

function calculate_time($time_post, $new_time) {
    //Calculate the time difference between the post and the current time
    $time_diff = $new_time - $time_post;

    //If the time difference is less than 1 minute
    if ($time_diff < 60) {
        return "Just now";
    }
    //If the time difference is less than 1 hour
    else if ($time_diff < 3600) {
        return floor($time_diff/60)."min";
    }
    //If the time difference is less than 1 day
    else if ($time_diff < 86400) {
        return floor($time_diff/3600)."h";
    }
    //If the time difference is less than 1 week
    else if ($time_diff < 604800) {
        return floor($time_diff/86400)."d";
    }
    //If the time difference is less than 1 month
    else if ($time_diff < 2592000) {
        return floor($time_diff/604800)."w";
    }
    //If the time difference is less than 1 year
    else if ($time_diff < 31536000) {
        return floor($time_diff/2592000)."mo";
    }
    //If the time difference is more than 1 year
    else {
        return floor($time_diff/31536000)."y";
    }
}

function format_nb($number) {
    if ($number < 1000) {
        return $number;
    }
    else if ($number < 1000000) {
        return floor($number/1000)."K";
    }
    else if ($number < 1000000000) {
        return floor($number/1000000)."M";
    }
    else {
        return floor($number/1000000000)."B";
    }
}

function create_post($user_infos, $post_infos) {
    return '<div class="post" post-id="'.$post_infos["post_id"].'">
        <div class="profile">
            <img src="images/default_pic.jpg" alt="Profile Picture">
        </div>
        <div class="header">
            <a class="user-name" href="https://twitter.com/home">'.$user_infos["name"].'</a>
            <p class="user-id">'.$user_infos["ref"].'</p>
            <p class="post-date">'.calculate_time($post_infos["time"], time()).'</p>
        </div>
        <div class="content">
            <p>'.utf8_decode($post_infos["content"]).'</p>'
            .($post_infos["image_path"] != "" ? '<img src="'.$post_infos["image_path"].'" alt="Post Image">' : '').'
        </div>
        <div class="footer">
            <button class="action red" id="like">
                <img src="images/icons/heart_icon.svg" class="icon-like"></img>
                <p>'.format_nb($post_infos["likes"]).'</p>
            </button>
            <button class="action green" id="repost">
                <img src="images/icons/echo_icon.svg" class="icon-echo"></img>
                <p>'.format_nb($post_infos["repost"]).'</p>
            </button>
            <button class="action blue" id="share">
                <img src="images/icons/share_icon.svg" class="icon-like"></img>
                <p> SHARE </p>
            </button>
            <div class="flair">
                <p>Sport</p>
            </div>
        </div>
    </div>';
}

?>
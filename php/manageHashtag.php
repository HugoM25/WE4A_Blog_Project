<?php

/**
 * This file is part contains various functions to manage the hashtags from the other files.
 */

function searchHashtagsInContent($content) {
    /*
    * This functions searches for hashtags in a string.
    * @param {string} $content - The string to search in.
    * @return {array} $matches[1] - The hashtags found.
    */
    $hashtag = null;
    $hashtag = preg_match_all("/(#\w+)/u", $content, $matches);
    return $matches[1];
}

function addHashtag($sqlConnector, $hashtag, $post_id) {
    /*
    * This functions adds a hashtag to the database.
    * @param {SqlConnector} $sqlConnector - The sqlConnector object.
    * @param {string} $hashtag - The hashtag to add.
    * @param {int} $post_id - The id of the post.
    */
    $sql = "INSERT INTO trends (hashtag, post_id) VALUES ('$hashtag', $post_id)";
    $results = $sqlConnector->ask_database($sql);
}

function removeHashtag($sqlConnector, $hashtag, $post_id){
    /*
    * This functions removes a hashtag from the database.
    * @param {SqlConnector} $sqlConnector - The sqlConnector object.
    * @param {string} $hashtag - The hashtag to remove.
    * @param {int} $post_id - The id of the post.
    */
    $sql = "DELETE FROM trends WHERE hashtag = '$hashtag' AND post_id = $post_id";
    $results = $sqlConnector->ask_database($sql);
}

function deleteEveryHastagFromPost($sqlConnector, $post_id){
    /*
    * This functions deletes every hashtag from a post.
    * @param {int} $post_id - The id of the post.
    */
    $sql = "DELETE FROM trends WHERE post_id = $post_id";
    $results = $sqlConnector->ask_database($sql);
}

?>
import { retrievePost } from "./postLoader.js";
import { generatePost } from "./templatePost.js";

// Get the username from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');

if (username != null) {
    console.log("Looking for : " + username);

    var reqObj = {nb : 10, allow_image : 1, allow_text : 1, sort : 'likes', by_user : username};

    // Get post from the database
    retrievePost(reqObj).then(function(response) {
        // Fill the feed with the new posts
        response = JSON.parse(response);
        console.log(response);
        for (var i = 0; i < response.length; i++) {
            // When the promise is resolved, we can add the post to the feed
            document.getElementById("feed").innerHTML += generatePost(response[i]['post'], response[i]['user'], false, false);

        }
    });
}
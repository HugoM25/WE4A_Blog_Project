import { retrievePost } from "../utils/postLoader.js";
import { generatePost } from "../templates/templatePost.js";
import { checkUserLoggedIn, initializeConnexionPanel } from "../utils/userConnexion.js";
import { SetButtonsFunctionality, checkLikePost } from "../utils/interactionHandler.js";

// Get the username from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');

if (username != null) {

    let isSelfProfile = false;
    await checkUserLoggedIn().then(function(response) {
        response = JSON.parse(response);
        if (response['name'] == username) {
            isSelfProfile = true;
        }
    });

    console.log("is self profile ? " + isSelfProfile);
    console.log("Looking for : " + username);

    var reqObj = {nb : 10, allow_image : 1, allow_text : 1, sort : 'likes', by_user : username};

    // Get post from the database
    retrievePost(reqObj).then(async function(response) {
        // Fill the feed with the new posts
        response = JSON.parse(response);
        console.log(response);
        for (var i = 0; i < response.length; i++) {
            // Wait for the promise to be resolved of checkLikePost
            var isLiked = await checkLikePost(response[i]['post']['post_id']);
            isLiked = JSON.parse(isLiked);
            // Wait for the promise to be resolved of checkRepostPost
            var isReposted = false;
            // When the promise is resolved, we can add the post to the feed
            document.getElementById("feed").innerHTML += generatePost(response[i]['post'], response[i]['user'],  isLiked['has_liked'], isReposted);

        }
        SetButtonsFunctionality();
    });

    // Initialize the connexion panel
    initializeConnexionPanel(); 
}



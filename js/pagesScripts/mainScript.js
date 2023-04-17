import { SetButtonsFunctionality, SetSudoFunctionality } from "../utils/interactionHandler.js";
import { retrievePost } from "../utils/postLoader.js";
import { generatePost } from "../templates/templatePost.js";
import { initializeConnexionPanel, checkUserLoggedIn } from "../utils/userConnexion.js";
import { generatePostMaker, setupPostMaker } from "../templates/templatePostMaker.js";

import { generateConnexionPanel, activeConnexionPanel } from "../templates/templateConnexionPanel.js";
import { generateNavMenu, activeNavMenu } from "../templates/templateNavMenu.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Mode of the page 
// 0 : Feed page
// 1 : Search page
// 2 : Write page
const mode = urlParams.get('mode');

// Get the connected user infos 
checkUserLoggedIn().then(function(response) {
    // Parse the response to a JSON object
    response = JSON.parse(response);
    console.log(response);

    // If the user is logged in 
    if (response['user_id'] != -1 && mode == 2) {
        setPostMaker(response);
    }
    
    // Initialize the connection panel
    document.getElementById("connexion-panel").innerHTML = generateConnexionPanel(response);
    activeConnexionPanel(response);

    //Initialize the nav menu 
    document.getElementById("nav-menu").innerHTML = generateNavMenu(response);
    activeNavMenu(response);

});


// Handle buttons posts requests -------------------------------------------------------
// Get all the feed options buttons
var buttonsOptionsSearch = document.getElementsByClassName("feed-option-button");

// Add event listener to all the buttons
for (var i = 0; i < buttonsOptionsSearch.length; i++) {
    buttonsOptionsSearch[i].addEventListener("click", function() {
        // Get the index of the clicked button
        var indexButtonActive = Array.prototype.indexOf.call(buttonsOptionsSearch, this);
        // Set the clicked button as active
        setNewButtonActive(indexButtonActive);
    });
}


// Set the post maker as functional
function setPostMaker(userInfos, postEditInfos = null){
    var postMakerArea = document.getElementById("post-maker-area");
    postMakerArea.innerHTML = generatePostMaker(userInfos, postEditInfos);

    if (postEditInfos == null) {
        setupPostMaker();
    } 
    else {
        setupPostMaker(postEditInfos['post_id']);
    }
}


function setNewButtonActive(indexButtonActive) {
    // Remove active class from all buttons
    for (var i = 0; i < buttonsOptionsSearch.length; i++) {
        buttonsOptionsSearch[i].classList.remove("active");
    }
    // Add active class to the clicked button
    buttonsOptionsSearch[indexButtonActive].classList.add("active");

    // Fill the post feed with the new posts
    var reqObj = {nb : 10, allow_image : 1, allow_text : 1, sort : 'likes', by_user : 'null'};
    if (indexButtonActive == 0) {
        reqObj.nb = 10;
        reqObj.allow_image = 1;
        reqObj.allow_text = 1;
        reqObj.sort = 'time';
    }else if (indexButtonActive == 1){
        reqObj.nb = 10;
        reqObj.allow_image = 1;
        reqObj.allow_text = 1;
        reqObj.sort = 'likes';
    } else if (indexButtonActive == 2) {
        reqObj.nb = 10;
        reqObj.allow_image = 1;
        reqObj.allow_text = 0;
        
    } else if (indexButtonActive == 3) {
        reqObj.nb = 10;
        reqObj.allow_image = 0;
        reqObj.allow_text = 1;
        
    }

    retrievePost(reqObj)
    .then(async function(response) {
        // Fill the feed with the new posts
        response = JSON.parse(response);
        console.log(response);
        // Clear the feed
        document.getElementById("feed").innerHTML = "";
        // Store all the posts in the feed
        var posts = [];

        for (var i = 0; i < response.length; i++) {
            await generatePost(response[i]['post'], response[i]['user'], true).then(function(response) {
                posts.push(response);
            });
        }
        document.getElementById("feed").innerHTML = posts.join("");
        SetButtonsFunctionality();
        SetSudoFunctionality();
    })
    .catch(function(error) {
        console.error(error);
    });
}


// Regenerate the post maker 
async function regeneratePostMaker(postID) {

    var postInfos = await retrievePost({nb : 1, allow_image : 1, allow_text : 1, sort : 'likes', by_user : 'null', post_id : postID});
    postInfos = JSON.parse(postInfos)[0]['post'];
    
    var userInfos = await checkUserLoggedIn();
    userInfos = JSON.parse(userInfos);

    if (userInfos['user_id'] != -1 ) {
        setPostMaker(userInfos,postInfos);
    }
}



export {regeneratePostMaker}
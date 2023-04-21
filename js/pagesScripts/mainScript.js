import { SetButtonsFunctionality, SetSudoFunctionality } from "../utils/interactionHandler.js";
import { retrievePost } from "../utils/postLoader.js";
import { generatePost } from "../templates/templatePost.js";
import { initializeConnexionPanel, checkUserLoggedIn } from "../utils/userConnexion.js";
import { generatePostMaker, setupPostMaker } from "../templates/templatePostMaker.js";

import { generateConnexionPanel, activeConnexionPanel } from "../templates/templateConnexionPanel.js";
import { generateNavMenu, activeNavMenu } from "../templates/templateNavMenu.js";
import { generateSearch, activeSearch } from "../templates/templateSearch.js";

// Get the URL parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Mode of the page 
// 0 : Feed page
// 1 : Search page
// 2 : Write page
const mode = urlParams.get('mode');
const search = urlParams.get('search');

var currentSearch = search ? search : '';


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

    // Initialize the search bar
    document.getElementById("search-area").innerHTML = generateSearch();
    activeSearch(currentSearch);
});



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


// Regenerate the post maker 
async function regeneratePostMaker(postID) {

    var postInfos = await retrievePost({nb : 1, allow_image : 1, allow_text : 1, sort : 'likes', by_user : 'null', post_id : postID});
    postInfos = JSON.parse(postInfos)[0]['post'];
    
    var userInfos = await checkUserLoggedIn();
    userInfos = JSON.parse(userInfos);

    if (userInfos['user_id'] != -1 ) {
        setPostMaker(userInfos,postInfos);
        window.scrollTo(0, 0);
    }
}


function displayPosts(reqObj){
    
    // Get the current search 
    reqObj.search = currentSearch;

    retrievePost(reqObj)
    .then(async function(response) {
        // Fill the feed with the new posts
        response = JSON.parse(response);
        // Find the feed area
        var feedArea = document.getElementById("feed");
        // Clear the feed area
        feedArea.innerHTML = "";
        // Get the posts
        var posts = [];
        for (var i = 0; i < response.length; i++) {
            await generatePost(response[i]['post'], response[i]['user'], true).then(function(response) {
                posts.push(response);
            });
        }
        feedArea.innerHTML = posts.join("");
        SetButtonsFunctionality();
        SetSudoFunctionality();

    })
    .catch(function(error) {
        console.error(error);
    });
}

function changeCurrentSearch(newSearch){
    currentSearch = newSearch;
}

export {regeneratePostMaker, displayPosts, changeCurrentSearch}
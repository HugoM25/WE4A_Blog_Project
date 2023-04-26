import { SetButtonsFunctionality, SetSudoFunctionality } from "../utils/interactionHandler.js";
import { retrievePost } from "../services/servicePost.js";
import { checkUserLoggedIn } from "../services/serviceUserConnexion.js";
import { generatePostMaker, activePostMaker } from "../templates/templatePostMaker.js";

import { generateConnexionPanel, activeConnexionPanel } from "../templates/templateConnexionPanel.js";
import { generateNavMenu, activeNavMenu } from "../templates/templateNavMenu.js";
import { generateSearch, activeSearch } from "../templates/templateSearch.js";
import { generateTrendsPanel, activeTrendsPanel } from "../templates/templateTrendsPanel.js";
import { generateNavPage } from "../templates/templateNavPage.js";
import { generatePost } from "../templates/templatePost.js";

    
// Get the URL parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Mode of the page 
// 0 : Feed page
// 1 : Search page
// 2 : Write page
const mode = urlParams.get('mode');
const search = urlParams.get('search');
const postID = urlParams.get('postID');
const offset = urlParams.get('offset');
const editID = urlParams.get('editID');

var currentSearch = search ? search : '';
var currentOffset = offset ? offset : 0;


// Get the connected user infos 
checkUserLoggedIn().then(function(response) {
    // Parse the response to a JSON object
    response = JSON.parse(response);

    // If the user is logged in 
    if (response['user_id'] != -1 && mode == 2) {
        document.getElementById("post-maker-area").innerHTML = generatePostMaker(response);
        activePostMaker();

        if (editID != null) {
            regeneratePostMaker(editID);
        }
    }
    
    // Initialize the connection panel
    document.getElementById("connexion-panel").innerHTML = generateConnexionPanel(response);
    activeConnexionPanel(response);

    //Initialize the nav menu 
    document.getElementById("nav-menu").innerHTML = generateNavMenu(response);
    activeNavMenu(response);

    // Initialize the trends panel
    generateTrendsPanel().then(function(response) {
        document.getElementById("trends-side").innerHTML = response;
        activeTrendsPanel();
    });

    // Initialize the search bar
    document.getElementById("search-area").innerHTML = generateSearch();
    activeSearch(currentSearch);

    if (postID != null) {
        displayPosts({nb : 1, allow_image : 1, allow_text : 1, post_id : postID});
    }
    else {
        displayPosts({ nb: 10, allow_image: 1, allow_text: 1, sort: 'time', offset : currentOffset});
    }
});



async function regeneratePostMaker(postID) {
    /*
    *   Regenerate/Reset the post maker with (or without) the post infos
     *  @param {int} postID - The ID of the post to edit
    */

    // Get the post infos
    var postInfos = null;
    if (postID != null) {
        postInfos = await retrievePost({nb : 1, allow_image : 1, allow_text : 1, sort : 'likes', by_user : 'null', post_id : postID});
        postInfos = JSON.parse(postInfos)[0]['post'];
    }

    // Get the user infos
    var userInfos = await checkUserLoggedIn();
    userInfos = JSON.parse(userInfos);

    // If the user is still well connected and is the owner of the post
    if (userInfos['user_id'] != -1  && (postInfos != null && userInfos['user_id'] == postInfos['author_id'])) {

        var postMakerArea = document.getElementById("post-maker-area");
        postMakerArea.innerHTML = generatePostMaker(userInfos, postInfos);

        // Set the post maker functionality (and fill the fields if needed)
        if (postInfos == null) {
            activePostMaker(null);
        } 
        else {
            activePostMaker(postInfos['post_id']);
        }

        // Scroll to the top of the page to see the post maker
        window.scrollTo(0, 0);
    }
}


function displayPosts(reqObj){
    /*
    *  Display the posts in the feed area
    *  @param {object} reqObj - The request object
    */
    
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

        // Add navPage at bottom of feed
        feedArea.innerHTML += generateNavPage(currentOffset, response.length, reqObj.nb);


        SetButtonsFunctionality();
        SetSudoFunctionality();


    })
    .catch(function(error) {
        console.error(error);
    });
}

function changeCurrentSearch(newSearch){
    /*
    * Change the current search from the search bar
    * @param {string} newSearch - The new search
    */
    currentSearch = newSearch;
}

export {regeneratePostMaker, displayPosts, changeCurrentSearch}
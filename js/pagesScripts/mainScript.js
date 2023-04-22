import { SetButtonsFunctionality, SetSudoFunctionality } from "../utils/interactionHandler.js";
import { retrievePost } from "../utils/servicePost.js";
import { generatePost } from "../templates/templatePost.js";
import { checkUserLoggedIn } from "../utils/userConnexion.js";
import { generatePostMaker, activePostMaker } from "../templates/templatePostMaker.js";

import { generateConnexionPanel, activeConnexionPanel } from "../templates/templateConnexionPanel.js";
import { generateNavMenu, activeNavMenu } from "../templates/templateNavMenu.js";
import { generateSearch, activeSearch } from "../templates/templateSearch.js";

// Make sure the script works only on index.html
if (window.location.pathname.includes("index.html")) {
        
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

    var currentSearch = search ? search : '';


    // Get the connected user infos 
    checkUserLoggedIn().then(function(response) {
        // Parse the response to a JSON object
        response = JSON.parse(response);

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

        if (postID != null) {
            console.log(postID);
            displayPosts({nb : 1, allow_image : 1, allow_text : 1, post_id : postID});
        }
        else {
            displayPosts({ nb: 10, allow_image: 1, allow_text: 1, sort: 'time' });
        }
    });
}


async function regeneratePostMaker(postID) {
    /*
    *   Regenerate/Reset the post maker with (or without) the post infos
     *  @param {int} postID - The ID of the post to edit
    */

    // Get the post infos
    var postInfos = await retrievePost({nb : 1, allow_image : 1, allow_text : 1, sort : 'likes', by_user : 'null', post_id : postID});
    postInfos = JSON.parse(postInfos)[0]['post'];

    // Get the user infos
    var userInfos = await checkUserLoggedIn();
    userInfos = JSON.parse(userInfos);

    // If the user is still well connected
    if (userInfos['user_id'] != -1 ) {
        
        var postMakerArea = document.getElementById("post-maker-area");
        postMakerArea.innerHTML = generatePostMaker(userInfos, postEditInfos);

        // Set the post maker functionality (and fill the fields if needed)
        if (postEditInfos == null) {
            activePostMaker();
        } 
        else {
            activePostMaker(postEditInfos['post_id']);
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
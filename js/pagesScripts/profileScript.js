import {retrievePost } from "../services/servicePost.js";
import { checkUserLoggedIn} from "../services/serviceUserConnexion.js";
import { SetButtonsFunctionality, SetSudoFunctionality} from "../utils/interactionHandler.js";

// Import les templates
import { generateConnexionPanel, activeConnexionPanel } from "../templates/templateConnexionPanel.js";
import { generateNavMenu, activeNavMenu } from "../templates/templateNavMenu.js";
import { generateProfileHeader, activeProfileHeader } from "../templates/templateProfileHeader.js";
import { generatePost } from "../templates/templatePost.js";
import { generateTrendsPanel, activeTrendsPanel } from "../templates/templateTrendsPanel.js";

// Import les services
import { getFollowers, getFollowed } from "../services/serviceFollow.js";
import { GetInfosOnUser } from "../services/serviceInfos.js";
import { activeFollowCard, generateFollowCard } from "../templates/templateFollowCard.js";

// Get the username from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');

// Get all the feed options buttons
var buttonsOptionsSearch = document.getElementsByClassName("button-selection-underlined");

if (username != null) {

    await checkUserLoggedIn().then(function(infoConnectedUser) {

        let isSelfProfile = false;

        infoConnectedUser = JSON.parse(infoConnectedUser);
        if (infoConnectedUser['name'] == username) {
            isSelfProfile = true;
        }

        // Initialize the connection panel
        document.getElementById("connexion-panel").innerHTML = generateConnexionPanel(infoConnectedUser);
        activeConnexionPanel(infoConnectedUser);

        //Initialize the nav menu 
        document.getElementById("nav-menu").innerHTML = generateNavMenu(infoConnectedUser);
        activeNavMenu(infoConnectedUser);

        // Initialize the trends panel
        generateTrendsPanel().then(function(response) {
            document.getElementById("trends-side").innerHTML = response;
            activeTrendsPanel();
        });

        
        //Initialize the profile header
        // Get infos on profile
        GetInfosOnUser(username).then(function(infosUser) {
            
            infosUser = JSON.parse(infosUser);

            if (infosUser['success'] == false) {
                window.location.href = "404.html";
            }
            else {
                // Generate the profile header
                generateProfileHeader(infosUser, isSelfProfile, infoConnectedUser).then(function(response) {
                    document.getElementById("profile-header").innerHTML = response;
                    activeProfileHeader(infosUser, isSelfProfile, infoConnectedUser);
                });

                // Make the feed options buttons functional
                setButtonFeedFunctionalities(infoConnectedUser, infosUser);
            }

            // By default display posts of the user
            displayPosts({nb : 10, allow_image : 1, allow_text : 1, sort : 'time', by_user : username});
        });
    });
}
else {
    window.location.href = "index.html";
}


function displayPosts(reqObj){ 
    /* 
    *   Display the posts in the feed area
    *   @param {object} reqObj - The request object
    * */

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

function displayFollowers(connectedUserInfos, userPageInfos ){
    /*
    *   Display the followers in the feed area
    *   @param {object} connectedUserInfos - The infos on the connected user
    *   @param {object} userPageInfos - The infos on the user page
    * */

    getFollowers(userPageInfos['user_id'])
    .then(async function(response) {
        // Fill the feed with the new posts
        response = JSON.parse(response);
        // Find the feed area
        var feedArea = document.getElementById("feed");
        // Clear the feed area
        feedArea.innerHTML = "";
        // Get the posts
        var followersCards = [];
        for (var i = 0; i < response.length; i++) {
            await generateFollowCard(response[i], connectedUserInfos).then(function(cardHtml) {
                followersCards.push(cardHtml);
            });
        }
        feedArea.innerHTML = followersCards.join("");
        for (var i = 0; i < response.length; i++){
            activeFollowCard(response[i], connectedUserInfos);
        }    
        
    })
    .catch(function(error) {
        console.error(error);
    });
}

function displayFollowed(connectedUserInfos, userPageInfos){
    /*
    *   Display the followed users in the feed area
    *   @param {object} connectedUserInfos - The infos on the connected user
    *   @param {object} userPageInfos - The infos on the user page
    *  */

    getFollowed(userPageInfos['user_id'])
    .then(async function(response) {
        // Fill the feed with the new posts
        response = JSON.parse(response);
        // Find the feed area
        var feedArea = document.getElementById("feed");
        // Clear the feed area
        feedArea.innerHTML = "";
        // Get the posts
        var followedCards = [];
        for (var i = 0; i < response.length; i++) {
            await generateFollowCard(response[i], connectedUserInfos).then(function(response) {
                followedCards.push(response);
            });
        }
        feedArea.innerHTML = followedCards.join("");
        for (var i = 0; i < response.length; i++){
            activeFollowCard(response[i], connectedUserInfos);
        }    
    })
    .catch(function(error) {
        console.error(error);
    });  
}


function changeActiveButton(indexButtonActive){
    /*
    *   Change the active button
    *  @param {int} indexButtonActive - The index of the button to set active
    */

    // Remove active class from all buttons
    for (var i = 0; i < buttonsOptionsSearch.length; i++) {
        buttonsOptionsSearch[i].classList.remove("active");
    }
    // Add active class to the clicked button
    buttonsOptionsSearch[indexButtonActive].classList.add("active");
}

function setButtonFeedFunctionalities(infoConnectedUser, infosUser) {
    /*
    *   Set the buttons functionalities
    *   @param {object} infoConnectedUser - The infos on the connected user
    *   @param {object} infosUser - The infos on the user page
    */
    
    // Button 0 : Posts filtered by time
    buttonsOptionsSearch[0].addEventListener("click", function() {
        changeActiveButton(0);
        var reqObj = {nb : 10, allow_image : '1', allow_text : '1', sort : 'time', by_user : username};
        displayPosts(reqObj);
    });

    // Button 1 : Posts liked by the owner of the page
    buttonsOptionsSearch[1].addEventListener("click", function() {
        changeActiveButton(1);
        // Set up the request object
        var reqObj = {nb : 10, allow_image : '1', allow_text : '1', sort : 'time', by_user : null, liked_by : username};
        displayPosts(reqObj);
    }); 

    // Button 2 : Show the users followed by the owner of the page
    buttonsOptionsSearch[2].addEventListener("click", function() {
        changeActiveButton(2);
        displayFollowed(infoConnectedUser, infosUser);
    });

    // Button 3 : Show the followers of the owner of the page
    buttonsOptionsSearch[3].addEventListener("click", function() {
        changeActiveButton(3);
        displayFollowers(infoConnectedUser, infosUser);
    }); 
}


import {retrievePost } from "../utils/postLoader.js";
import { generatePost } from "../templates/templatePost.js";
import { checkUserLoggedIn} from "../utils/userConnexion.js";
import { SetButtonsFunctionality, SetSudoFunctionality} from "../utils/interactionHandler.js";
import { generateConnexionPanel, activeConnexionPanel } from "../templates/templateConnexionPanel.js";
import { generateNavMenu, activeNavMenu } from "../templates/templateNavMenu.js";
import { generateProfileHeader, activeProfileHeader } from "../templates/templateProfileHeader.js";
import { GetInfosOnUser } from "../utils/infos.js";
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
        // Make the feed options buttons functional
        setButtonFeedFunctionalities();

        // Initialize the connection panel
        document.getElementById("connexion-panel").innerHTML = generateConnexionPanel(infoConnectedUser);
        activeConnexionPanel(infoConnectedUser);

        //Initialize the nav menu 
        document.getElementById("nav-menu").innerHTML = generateNavMenu(infoConnectedUser);
        activeNavMenu(infoConnectedUser);

        
        //Initialize the profile header
        // Get infos on profile
        GetInfosOnUser(username).then(function(infosUser) {
            
            infosUser = JSON.parse(infosUser);

            if (infosUser['success'] == false) {
                window.location.href = "404.html";
            }
            else {
                generateProfileHeader(infosUser, isSelfProfile, infoConnectedUser).then(function(response) {
                    document.getElementById("profile-header").innerHTML = response;
                    activeProfileHeader(infosUser, isSelfProfile, infoConnectedUser);
                });
            }
        });

        
    });
}
else {
    window.location.href = "index.html";
}


function changeActiveButton(indexButtonActive){
    // Remove active class from all buttons
    for (var i = 0; i < buttonsOptionsSearch.length; i++) {
        buttonsOptionsSearch[i].classList.remove("active");
    }
    // Add active class to the clicked button
    buttonsOptionsSearch[indexButtonActive].classList.add("active");
}

function setButtonFeedFunctionalities() {
    // Add event listener to all the buttons
    
    // Button 0 : Posts filtered by time
    buttonsOptionsSearch[0].addEventListener("click", function() {
        changeActiveButton(0);
        // Set up the request object
        var reqObj = {nb : 10, allow_image : 1, allow_text : 1, sort : 'time', by_user : username, liked_by : null};
        // Retrieve the posts
        retrievePost(reqObj)
        .then(async function(response) {
            // Fill the feed with the new posts
            response = JSON.parse(response);
            console.log(response);
            document.getElementById("feed").innerHTML = "";
            for (var i = 0; i < response.length; i++) {
                await generatePost(response[i]['post'], response[i]['user'], true).then(function(response) {
                    document.getElementById("feed").innerHTML += response;
                });
            }
            SetButtonsFunctionality();
            SetSudoFunctionality();
        })
        .catch(function(error) {
            console.error(error);
        });
    });

    // Button 1 : Posts liked by the owner of the page

    buttonsOptionsSearch[1].addEventListener("click", function() {
        // Set up the request object
        var reqObj = {nb : 10, allow_image : 1, allow_text : 1, sort : 'time', by_user : null, liked_by : username};
        console.log(reqObj);
        // Retrieve the posts
        retrievePost(reqObj)
        .then(async function(response) {
            changeActiveButton(1);
            // Fill the feed with the new posts
            response = JSON.parse(response);
            console.log(response);
            document.getElementById("feed").innerHTML = "";
            for (var i = 0; i < response.length; i++) {
                await generatePost(response[i]['post'], response[i]['user'], true).then(function(response) {
                    document.getElementById("feed").innerHTML += response;
                });
            }
            SetButtonsFunctionality();
            SetSudoFunctionality();
        })
        .catch(function(error) {
            console.error(error);
        });
    }); 
}


// Import the functions from interactionHandler.js
import { SetButtonsFunctionality } from "./interactionHandler.js";
import { retrievePost } from "./postLoader.js";
import { generatePost } from "./templatePost.js";
import { generateConnexionPanel } from "./templateConnexionPanel.js";

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

// Initialize the connection panel
checkUserLoggedIn().then(function(response) {

    response = JSON.parse(response);
    document.getElementById("connexion-panel").innerHTML = generateConnexionPanel(response);

    // Add event listener to logout button
    document.getElementById("logout-button").addEventListener("click", function() {
        window.location.href = "login.html";
    });
    // Add event listener to settings button
    document.getElementById("settings-button").addEventListener("click", function() {
        window.location.href = "profile.html";
    }
    );
});

// Check if the user is logged in
function checkUserLoggedIn() {
    var request = `php/getInfosOnConnectedUser.php`;
    
    return new Promise(function(resolve, reject) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.responseText);
            } else if (this.readyState == 4) {
                reject('Error retrieving post.');
            }
        };
        xmlhttp.open('GET', request, true);
        xmlhttp.send();
    });
}


async function checkLikePost(postID) {
    var request = `php/checkUserLikePost.php?post_id=${postID}`;
    return new Promise(function(resolve, reject) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.responseText);
            } else if (this.readyState == 4) {
                reject('Error retrieving post.');
            }
        };
        xmlhttp.open('GET', request, true);
        xmlhttp.send();
    });   
}


function setNewButtonActive(indexButtonActive) {
    // Remove active class from all buttons
    for (var i = 0; i < buttonsOptionsSearch.length; i++) {
        buttonsOptionsSearch[i].classList.remove("active");
    }
    // Add active class to the clicked button
    buttonsOptionsSearch[indexButtonActive].classList.add("active");
    document.getElementById("feed").innerHTML = "";

    // Fill the post feed with the new posts
    var reqObj = {nb : 10, allow_image : 1, allow_text : 1, sort : 'likes'};
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
        for (var i = 0; i < response.length; i++) {
            // Wait for the promise to be resolved of checkLikePost
            var isLiked = await checkLikePost(response[i]['post']['post_id']);
            isLiked = JSON.parse(isLiked);
            // Wait for the promise to be resolved of checkRepostPost
            var isReposted = false;
            // When the promise is resolved, we can add the post to the feed
            document.getElementById("feed").innerHTML += generatePost(response[i]['post'], response[i]['user'], isLiked['has_liked'], isReposted);

        }
        SetButtonsFunctionality();
    })
    .catch(function(error) {
        console.error(error);
    });
}



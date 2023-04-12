// Import the functions from interactionHandler.js
import { SetButtonsFunctionality, checkLikePost, SetSudoFunctionality } from "../utils/interactionHandler.js";
import { retrievePost } from "../utils/postLoader.js";
import { generatePost } from "../templates/templatePost.js";
import { initializeConnexionPanel } from "../utils/userConnexion.js";
import { generatePostMaker, setupPostMaker } from "../templates/templatePostMaker.js";
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

initializeConnexionPanel();


setPostMaker();

// Set the post maker as functional
function setPostMaker(){
    var postMakerArea = document.getElementById("post-maker-area");
    postMakerArea.innerHTML = generatePostMaker();
    setupPostMaker();
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
}



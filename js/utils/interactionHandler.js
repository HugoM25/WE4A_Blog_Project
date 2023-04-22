import { regeneratePostMaker } from "../pagesScripts/mainScript.js";

// Import services
import { repostPost } from "./serviceRepost.js";
import { likePost } from "./serviceLike.js";


function SetButtonsFunctionality() {
    /*
    *   Set the functionality of the buttons
    * 
    * */
    document.querySelectorAll('.action').forEach(function(button) {
        // Get the action type
        if (button.id === 'like') {
            button.addEventListener('click', function(){
                LikeFunctionality(findPostParentID(button), button);
            }, false);
        }
        else if (button.id == "repost") {
            button.addEventListener('click', function(){
                RepostFunctionality(findPostParentID(button), button);
            }, false);
        }
        else if (button.id === "share") {
            button.addEventListener('click', function(){
                ShareFunctionality(findPostParentID(button));
            }, false);
        }
    });
}

var findPostParentID = function(elem) {
    /*
    *   Find the post parent ID of the button
    *   @param {HTMLElement} elem : the button element
    *   @return {String} : the post ID
    * */
    var attribute = elem.closest(".post").getAttribute("post-id");
    return attribute;
};



function LikeFunctionality(postID, button){
    /* 
    *   Like a post and update the button style
    *   @param {String} postID : the ID of the post
    *   @param {HTMLElement} button : the button element
    * */
    likePost(postID).then(function(response) {
        console.log(response);
        response = JSON.parse(response);
        // if request is successful
        if (response['success'] === true) {
            console.log("Like " + postID);
            // Change the button style
            if (button.classList.contains("active")) {
                button.classList.remove("active");
                // Update the number of likes after finding p tag child of button
                var likes = button.querySelector("p");
                likes.innerHTML = parseInt(likes.innerHTML) - 1;
            }
            else {
                button.classList.add("active");
                // Update the number of likes
                var likes = button.querySelector("p");
                likes.innerHTML = parseInt(likes.innerHTML) + 1;
            }
        }
    });
}



function RepostFunctionality(postID, button){
    /*
    *   Repost a post and update the button style
    *   @param {String} postID : the ID of the post
    *   @param {HTMLElement} button : the button element
    * */
    repostPost(postID).then(function(response) {
        console.log(response);
        response = JSON.parse(response);
        // if request is successful
        if (response['success'] === true) {
            console.log("Like " + postID);
            // Change the button style
            if (button.classList.contains("active")) {
                button.classList.remove("active");
                // Update the number of likes after finding p tag child of button
                var likes = button.querySelector("p");
                likes.innerHTML = parseInt(likes.innerHTML) - 1;
            }
            else {
                button.classList.add("active");
                // Update the number of likes
                var likes = button.querySelector("p");
                likes.innerHTML = parseInt(likes.innerHTML) + 1;
            }
        }
    });
}

function ShareFunctionality(postID){
    /*
    *   Copy the link to the clipboard and show a message to the user (for 2s)
    *   @param {String} postID : the ID of the post
    * */
    var linkToPost = `http://localhost/BlogProjectW4AB/index.html?mode=0&postID=${postID}`;
    // Copy the link to the clipboard
    navigator.clipboard.writeText(linkToPost).then(function() {
        // Show a message to the user
        var shareButton = document.querySelector(`.post[post-id="${postID}"] .action#share`);
        var shareMessage = document.createElement("p");
        shareMessage.innerHTML = "Link copied to clipboard!";
        shareMessage.classList.add("share-message");
        shareButton.appendChild(shareMessage);
        setTimeout(function(){ shareMessage.remove(); }, 2000);
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}



function SetSudoFunctionality() {
    /*
    *   Set the functionality of the sudo buttons (delete and edit)
    *
    * */
    document.querySelectorAll('#sudo-delete').forEach(function(button) {
        // Get the action type
        button.addEventListener('click', function(){
                deleteFunctionality(findPostParentID(button));
            }, false);
    });

    document.querySelectorAll('#sudo-edit').forEach(function(button) {
        // Get the action type
            button.addEventListener('click', function(){
                editFunctionality(findPostParentID(button));
            }, false);
    });

}

function deleteFunctionality(postID){
    /*
    *   Delete a post
    *   @param {String} postID : the ID of the post
    * */

    /* Create a alert box to confirm the deletion */
    var confirmDelete = confirm("Are you sure you want to delete this post?");
    if (confirmDelete == true) {
        
        // Delete the post
        // send post request to php script
        var xhr = new XMLHttpRequest();
        // Define the PHP script URL and parameters
        var url = "php/managePost.php";
        var params = "post_id=" + encodeURIComponent(postID) + "&action=delete_post";

        // Set the HTTP request method and content type
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Delete the post from the DOM
                var post = document.querySelector(`.post[post-id="${postID}"]`);
                post.parentNode.removeChild(post);
            }
        };
        xhr.send(params);
    }
}

function editFunctionality(postID){
    /*
    *   Edit a post
    *   @param {String} postID : the ID of the post
    * */
    regeneratePostMaker(postID);

}

export { SetButtonsFunctionality, SetSudoFunctionality };




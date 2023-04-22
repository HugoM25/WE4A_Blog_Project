import { regeneratePostMaker } from "../pagesScripts/mainScript.js";

import { repostPost } from "./serviceRepost.js";
// Set the buttons functionality ( click event for each button )
function SetButtonsFunctionality() {
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

// Find the post-id this button belongs to
var findPostParentID = function(elem) {
    var attribute = elem.closest(".post").getAttribute("post-id");
    return attribute;
};


// Like a post -------------------------------------------

function likePost(postId) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        // Define the PHP script URL and parameters
        var url = "php/likePost.php";
        var params = "post_id=" + encodeURIComponent(postId);
    
        // Set the HTTP request method and content type
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.responseText);
            } else if (this.readyState == 4) {
                reject('Error retrieving post.');
            }
        };
        xhr.send(params);
    });
}
function LikeFunctionality(postID, button){
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



// delete a post -------------------------------------------

function SetSudoFunctionality() {
    // Set the sudo delete buttons functionality
    document.querySelectorAll('#sudo-delete').forEach(function(button) {
        // Get the action type
        button.addEventListener('click', function(){
                deleteFunctionality(findPostParentID(button));
            }, false);
    });

    // Set the sudo edit buttons functionality
    document.querySelectorAll('#sudo-edit').forEach(function(button) {
        // Get the action type
            button.addEventListener('click', function(){
                editFunctionality(findPostParentID(button));
            }, false);
    });

}

function deleteFunctionality(postID){
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
    regeneratePostMaker(postID);

}

export { SetButtonsFunctionality, checkLikePost, SetSudoFunctionality };




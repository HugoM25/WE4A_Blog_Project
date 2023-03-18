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
                RepostFunctionality(findPostParentID(button));
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

function LikeFunctionality(postID, button){
    likePost(postID).then(function(response) {
        console.log(response);
        if (response.includes("unliked") === false) {
            button.classList.add("active");
        }
        else {
            button.classList.remove("active");
        }
    });
}

function RepostFunctionality(postID){
    alert("Repost " + postID);
}

function ShareFunctionality(postID){
    alert("Share " + postID);
}

export { SetButtonsFunctionality };



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
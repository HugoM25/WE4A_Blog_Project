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
        response = JSON.parse(response);
        // if request is successful
        if (response['success'] === true) {
            console.log("Like " + postID);
            // Change the button style
            if (button.classList.contains("active")) {
                button.classList.remove("active");
            }
            else {
                button.classList.add("active");
            }
        }
    });
}



function RepostFunctionality(postID){
    alert("Repost " + postID);
}

function ShareFunctionality(postID){
    alert("Share " + postID);
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



export { SetButtonsFunctionality, checkLikePost };




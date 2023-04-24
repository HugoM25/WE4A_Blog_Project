async function checkLikePost(postID) {
    var request = `php/getLike.php?post_id=${postID}`;
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


function likePost(postId) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        // Define the PHP script URL and parameters
        var url = "php/manageLike.php";
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

export { checkLikePost, likePost};
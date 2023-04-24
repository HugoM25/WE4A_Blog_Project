

function repostPost(postId){
    /*
    *   Reposts a post
    *   @param {int} postId - the id of the post to repost
    *   @return {Promise} - a promise that resolves to the response text
    */

    var request = `php/manageReposts.php`;
    var formData = new FormData();
    formData.append('post_id', postId);
    return new Promise(function(resolve, reject) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.responseText);
            } else if (this.readyState == 4) {
                reject('Error retrieving post.');
            }
        };
        xmlhttp.open('POST', request, true);
        xmlhttp.send(formData);
    });
}

function checkRepost(postId) {
    /*
    *   Checks if a post has been reposted by the current user
    *   @param {int} postId - the id of the post to check
    *   @return {Promise} - a promise that resolves to the response text
    */
    var request = `php/getRepost.php?post_id=${postId}`;
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


export { repostPost, checkRepost};
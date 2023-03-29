// This function is used to retrieve the post from the server
// It returns a promise that will be resolved when the request is done
function retrievePost(filterObj=null) {
    var request = `php/getPosts.php?nb=${filterObj.nb}&allow_image=${filterObj.allow_image}&allow_text=${filterObj.allow_text}&by_user=${filterObj.by_user ? filterObj.by_user : 'null'}&sort=${filterObj.sort}`;
    
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

function generatePostsHTML(filterObj=null){
    // Get post from the server
    retrievePost(reqObj).then(async function(response) {
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
            postHtml += generatePost(response[i]['post'], response[i]['user'],  isLiked['has_liked'], isReposted);
        }
    });
    return postHtml;
}

export { retrievePost, generatePostsHTML };


async function retrievePost(filterObj=null) {
    /*
    * Retrieve the posts from the database
    * @param {Object} filterObj - Object containing the filters to apply to the request
    * @return {Promise} - Promise object represents the response of the request
    */
    var request = `php/getPosts.php?
        ${filterObj.nb ? 'nb=' + filterObj.nb : 'nb=10'}
        ${filterObj.allow_image ? '&allow_image=' + filterObj.allow_image : ''}
        ${filterObj.allow_text ? '&allow_text=' + filterObj.allow_text : ''}
        ${filterObj.by_user ? '&by_user=' + encodeURIComponent(filterObj.by_user) : ''}
        ${filterObj.liked_by ? '&liked_by=' + encodeURIComponent(filterObj.liked_by) : ''}
        ${filterObj.sort ? '&sort=' + filterObj.sort : ''}
        ${filterObj.post_id ? '&post_id=' + filterObj.post_id : ''}
        ${filterObj.offset ? '&offset=' + filterObj.offset : ''}
        ${filterObj.search ? '&search=' + encodeURIComponent(filterObj.search) : ''}
        ${filterObj.allow_repost ? '&allow_repost=' + filterObj.allow_repost : ''}
    `;

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
    }).catch(function(error) {
        console.log(error);
    });

}

export { retrievePost};

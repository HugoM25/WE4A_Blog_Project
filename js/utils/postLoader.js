// This function is used to retrieve the post from the server
// It returns a promise that will be resolved when the request is done
function retrievePost(filterObj=null) {
    var request = `php/getPosts.php?
        nb=${filterObj.nb}
        &allow_image=${filterObj.allow_image}
        &allow_text=${filterObj.allow_text}
        &by_user=${filterObj.by_user ? filterObj.by_user : 'null'}
        &sort=${filterObj.sort}&liked_by=${filterObj.liked_by ? filterObj.liked_by : 'null'}
        &post_id=${filterObj.post_id ? filterObj.post_id : '-1'}
        &offset=${filterObj.offset ? filterObj.offset : '0'}
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
    });
}

export { retrievePost};

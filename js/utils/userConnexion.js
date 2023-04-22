async function checkUserLoggedIn() {
    /*
    Check if the user is logged in
    @return {Promise} - Promise object represents the response of the request
    */
    var request = `php/getInfosOnConnectedUser.php`;
    
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

export { checkUserLoggedIn };
function getStats(username){
    // send get request to server
    // return stats
    var request = `php/getUserStats.php`;
    
    var formData = new FormData();
    formData.append('username', username);

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

function changeProfilePicture(file){
    // Send the file to the server
    var request = `php/changeProfilePicture.php`;
    var formData = new FormData();
    formData.append('pdp_image', file);
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

export {getStats, changeProfilePicture};
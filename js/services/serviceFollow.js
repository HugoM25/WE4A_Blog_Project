function follow(userToFollow){
    // Send request to server to follow the user using POST
    var request = `php/manageFollow.php`;
    var formData = new FormData();
    formData.append('target', userToFollow);
    formData.append('action', 'follow');
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

function unfollow(userToUnfollow){
    // Send request to server to unfollow the user using POST
    var request = `php/manageFollow.php`;
    var formData = new FormData();
    formData.append('target', userToUnfollow);
    formData.append('action', 'unfollow'); 
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

function checkFollow(follower, followed){
    // Send request to check if follower follows followed
    var request = `php/getFollow.php?follower_id=${follower}&followed_id=${followed}`;
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

function getFollowers(followed){
    // send get request to server
    // return stats
    var request = `php/getFollow.php?followed_id=${followed}`;
    
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

function getFollowed(follower){
    var request = `php/getFollow.php?follower_id=${follower}`;

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


export { follow, unfollow, checkFollow, getFollowers, getFollowed}
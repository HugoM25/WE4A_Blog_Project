function GetInfosOnUser(username){
    // Send get request to get the user infos
    let url = `php/getUserInfos.php`;

    var formData = new FormData();
    formData.append('username', username);
    return new Promise(function(resolve, reject) {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.responseText);
            } else if (this.readyState == 4) {
                reject('Error retrieving post.');
            }
        };
        xmlhttp.open('POST', url, true);
        xmlhttp.send(formData);
    }
    );
}

export { GetInfosOnUser };
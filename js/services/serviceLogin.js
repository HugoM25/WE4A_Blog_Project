async function signInReq(username, password){
    // Define the PHP script URL and parameters
    var url = "php/loginUser.php";

    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return new Promise(function(resolve, reject) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.responseText);
            } else if (this.readyState == 4) {
                reject('Error retrieving post.');
            }
        };
        xmlhttp.open('POST', url, true);
        xmlhttp.send(formData);
    });
}

async function signUpReq(username, password) {
    // Define the PHP script URL and parameters
    var url = "php/register.php";
    
    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return new Promise(function(resolve, reject) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.responseText);
            } else if (this.readyState == 4) {
                reject('Error retrieving post.');
            }
        };
        xmlhttp.open('POST', url, true);
        xmlhttp.send(formData);
    });
}

export { signInReq, signUpReq}; 
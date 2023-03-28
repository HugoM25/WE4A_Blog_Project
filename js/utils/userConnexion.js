import { generateConnexionPanel } from '../templates/templateConnexionPanel.js';

// Check if the user is logged in
function checkUserLoggedIn() {
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

function initializeConnexionPanel(){
    // Initialize the connection panel
    checkUserLoggedIn().then(function(response) {

    response = JSON.parse(response);
    document.getElementById("connexion-panel").innerHTML = generateConnexionPanel(response);

    // Add event listener to logout button
    document.getElementById("logout-button").addEventListener("click", function() {
        window.location.href = "login.html";
    });
    // Add event listener to settings button
    document.getElementById("settings-button").addEventListener("click", function() {
        window.location.href = "profile.html?username=" + response['name'];
    });
    });
}

export { initializeConnexionPanel, checkUserLoggedIn };
import { sanitizeUserInput } from "../utils/security.js";

function generateConnexionPanel(infosUser){

    // Sanitize the text content that the user entered (Never trust the user)
    var sanitizedName = sanitizeUserInput(infosUser["name"]);
    var sanitizedRef = sanitizeUserInput(infosUser["ref"]);
    var sanitizedAvatarPath = sanitizeUserInput(infosUser["profile_picture_path"]);

    return (`
    <div class="connexion-panel">
        <div class="icon-user">
                <img src="${sanitizedAvatarPath}" alt="user avatar">
        </div>
        <div class="info-user">
            <a class="connected-username" href="profile.html?username=${sanitizedName}">${sanitizedName}</a>
            <span class="connected-user-ref">${sanitizedRef}</span>
        </div>
        <div class="action-user">
            <button class="action-button">
                <img src="images/icons/logout_icon.svg" class="icon-logout" id="logout-button">
            </button>
            <button class="action-button">
                <img src="images/icons/settings_icon.svg" class="icon-settings" id="settings-button">
            </button>
        </div>
    </div>
    `);
}

function activeConnexionPanel(infosUser){
    // Add event listener to logout button
    document.getElementById("logout-button").addEventListener("click", function() {
        window.location.href = "login.html";
    });
    // Add event listener to settings button
    document.getElementById("settings-button").addEventListener("click", function() {
        window.location.href = "profile.html?username=" + infosUser['name'];
    });
}

export { generateConnexionPanel, activeConnexionPanel};
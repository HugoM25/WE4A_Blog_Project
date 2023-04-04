function generateConnexionPanel(infosUser){
    return (`
    <div class="icon-user">
            <img src="${infosUser['profile_picture_path']}" alt="user avatar">
    </div>
    <div class="info-user">
        <a class="connected-username" href="profile.html?username=${infosUser['name']}">${infosUser['name']}</a>
        <span class="connected-user-ref">${infosUser['ref']}</span>
    </div>
    <div class="action-user">
        <button class="action-button">
            <img src="images/icons/logout_icon.svg" class="icon-logout" id="logout-button">
        </button>
        <button class="action-button">
            <img src="images/icons/settings_icon.svg" class="icon-settings" id="settings-button">
        </button>
    </div>
    `);
}

export { generateConnexionPanel };
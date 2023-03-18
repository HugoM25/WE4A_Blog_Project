function generateConnexionPanel(infosUser){
    return (`
    <div class="icon-user">
            <img src="${infosUser['profile_picture_path']}" alt="user avatar">
    </div>
    <div class="info-user">
        <span class="connected-username" >${infosUser['name']}</span>
        <span class="connected-user-ref">${infosUser['ref']}</span>
    </div>
    <div class="action-user">
        <button class="action-button">
            <img src="images/icons/logout_icon.svg" class="icon-logout">
        </button>
        <button class="action-button">
            <img src="images/icons/settings_icon.svg" class="icon-settings">
        </button>
    </div>
    `);
}

export { generateConnexionPanel };
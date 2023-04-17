function generateNavMenu(infoUser=null) {
    return (`
    <div class="nav-menu">
        <a href="index.html?mode=2" class="button-page-change">
            <img src="images/icons/write_icon.svg" class="icon-profile"></img>
            <span> Write </span>
        </a>
        <a href="index.html?mode=0" class="button-page-change">
            <img src="images/icons/home_icon.svg" class="icon-home"></img>
            <span> Home </span>
        </a>
        <a href=${infoUser == null ? "'login.html'" : `profile.html?username=${infoUser["name"]}`} class="button-page-change">
            <img src="images/icons/profile_icon.svg" class="icon-profile"></img>
            <span> Profile </span>
        </a>
    </div>`
    );
}

function activeNavMenu(infoUser=null){
    // Nothing to do here
}
export { generateNavMenu, activeNavMenu};
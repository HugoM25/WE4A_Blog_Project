function generateProfileHeader(userInfos){

    return `
    <div class="profile-header">
        <div class="pdp-container">
            <img src="images/default_pic.jpg" alt="user avatar"></img>
        </div>
        <div class="text-container">
            <p class="username">${userInfos['name']}</p>
            <p class="user-ref">${userInfos['ref']}</p>
        </div>
        <div class="stats-container">
            <div class="stat">
                <p class="stat-number">0</p>
                <p class="stat-text">Posts</p>
            </div>
            <div class="stat">
                <p class="stat-number">0</p>
                <p class="stat-text">Likes</p>
            </div>
            <div class="stat">
                <p class="stat-number">0</p>
                <p class="stat-text">Following</p>
            </div>
            <div class="stat">
                <p class="stat-number">0</p>
                <p class="stat-text">Followers</p>
            </div>
        </div>
    </div>`
}
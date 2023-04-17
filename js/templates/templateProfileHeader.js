async function generateProfileHeader(userInfos, isSelfProfile){
    let userStats = JSON.parse(await getStats(userInfos['name']));
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
                <p class="stat-number">${userStats['nb_posts']}</p>
                <p class="stat-text">Posts</p>
            </div>
            <div class="stat">
                <p class="stat-number">${userStats['nb_likes']}</p>
                <p class="stat-text">Likes</p>
            </div>
            <div class="stat">
                <p class="stat-number">${userStats['nb_following']}</p>
                <p class="stat-text">Following</p>
            </div>
            <div class="stat">
                <p class="stat-number">${userStats['nb_followers']}</p>
                <p class="stat-text">Followers</p>
            </div>
        </div>
    </div>`
}

function activeProfileHeader(userInfos){
    // Nothing to do here
}

function getStats(username){
    // send get request to server
    // return stats
    var request = `php/getUserStats.php?username=${username}`;
    
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

export { generateProfileHeader, activeProfileHeader};
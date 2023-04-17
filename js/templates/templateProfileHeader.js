async function generateProfileHeader(userInfos, isSelfProfile){
    let userStats = JSON.parse(await getStats(userInfos['name']));
    return `
    <div class="profile-header">
        <div class="pdp-container" id="pdp"> 
            <img src="${userInfos["profile_picture_path"]}" alt="user avatar">
        ${
            isSelfProfile ? `<input type="file" id="image" name="image" accept="image/png, image/gif, image/jpeg" class="hideme">` : ''
        }
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
    // Get the pdp element
    let pdp = document.getElementById('pdp');
    // Get the input file element
    let inputFile = document.getElementById('image');

    pdp.addEventListener('click', () => {
        inputFile.click();
    });
    
    inputFile.addEventListener('change', () => {
        const file = inputFile.files[0];
        // Use confirm to ask the user if he wants to change his profile picture
        if (confirm('Do you want to change your profile picture?')) {
            changeProfilePicture(file).then((response) => {
                // Get the new profile picture
                let newPdp = JSON.parse(response)['image_path'];
                // Change the profile picture
                pdp.innerHTML = `
                <img src="${newPdp}" alt="user avatar">
                <input type="file" id="image" name="image" accept="image/png, image/gif, image/jpeg" class="hideme">`;

            }).catch((error) => {
                alert(error);
            });
        }
    });
}

function changeProfilePicture(file){
    // Send the file to the server
    var request = `php/changeProfilePicture.php`;
    var formData = new FormData();
    formData.append('pdp_image', file);
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
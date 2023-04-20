import { follow, unfollow, checkFollow } from "../utils/serviceFollow.js";

async function generateProfileHeader(userInfos, isSelfProfile, connectedUserInfos){
    console.log(userInfos['name']);
    let userStats = JSON.parse(await getStats(userInfos['name']));

    let showFollowOptions = !isSelfProfile && userInfos['user_id'] != -1;

    let followInfos = await checkFollow(connectedUserInfos['user_id'],userInfos['user_id']);
    console.log(followInfos);
    let isFollowing = JSON.parse(followInfos)['follow'];
    return `
    <div class="profile-header">
        ${
            showFollowOptions ? `<button class="follow-button ${isFollowing ? 'active' : ''}" id="follow">${isFollowing ? 'Unfollow' : 'Follow'}</button>` : ''
        }
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

function activeProfileHeader(userInfos, isSelfProfile, connectedUserInfos){

    if (isSelfProfile) {

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
    }else {
        // Get the follow button
        let followButton = document.getElementById('follow');

        followButton.addEventListener('click', () => {
            // Send request to server to follow/unfollow the user
            if (followButton.innerText == 'Follow') {
                follow(userInfos['user_id']).then((response) => {
                    followButton.classList.add('active');
                    followButton.innerText = 'Unfollow';
                }).catch((error) => {
                    alert(error);
                });
            }else {
                unfollow(userInfos['user_id']).then((response) => {
                    followButton.classList.remove('active');
                    followButton.innerText = 'Follow';
                }).catch((error) => {
                    alert(error);
                });
            }
        });
    }
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
import { follow, unfollow, checkFollow } from "../services/serviceFollow.js";
import { sanitizeUserInput } from "../utils/security.js";
import { getStats, changeProfilePicture } from "../services/serviceInfoUser.js";

async function generateProfileHeader(userInfos, isSelfProfile, connectedUserInfos){
    console.log(userInfos['name']);
    let userStats = JSON.parse(await getStats(userInfos['name']));

    let showFollowOptions = !isSelfProfile && userInfos['user_id'] != -1;

    let followInfos = await checkFollow(connectedUserInfos['user_id'],userInfos['user_id']);
    let isFollowing = JSON.parse(followInfos)['follow'];
    return `
    <div class="profile-header">
        ${
            showFollowOptions ? `<button class="follow-button ${isFollowing ? 'active' : ''}" id="follow">${isFollowing ? 'Unfollow' : 'Follow'}</button>` : ''
        }
        <div class="pdp-container" id="pdp"> 
            <img src="${sanitizeUserInput(userInfos["profile_picture_path"])}" alt="user avatar" ${isSelfProfile ? 'class="own"' : ''}>
        ${
            isSelfProfile ? `<input type="file" id="image" name="image" accept="image/png, image/gif, image/jpeg" class="hideme">` : ''
        }
        </div>
        <div class="text-container">
            <p class="username">${sanitizeUserInput(userInfos['name'])}</p>
            <p class="user-ref">${sanitizeUserInput(userInfos['ref'])}</p>
        </div>
        <div class="stats-container">
            <div class="stat">
                <p class="stat-number" id='posts_nb'>${userStats['nb_posts']}</p>
                <p class="stat-text">Posts</p>
            </div>
            <div class="stat">
                <p class="stat-number" id='likes_nb'>${userStats['nb_likes']}</p>
                <p class="stat-text">Likes</p>
            </div>
            <div class="stat">
                <p class="stat-number" id='followed_nb'>${userStats['nb_following']}</p>
                <p class="stat-text">Following</p>
            </div>
            <div class="stat">
                <p class="stat-number" id='follower_nb'>${userStats['nb_followers']}</p>
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
                    let newPdp = sanitizeUserInput(JSON.parse(response)['image_path']);
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

                    // Change the button to unfollow
                    followButton.classList.add('active');
                    followButton.innerText = 'Unfollow';

                    // Update the number of followers
                    let followerNb = document.getElementById('follower_nb');
                    followerNb.innerText = parseInt(followerNb.innerText) + 1;

                }).catch((error) => {
                    alert(error);
                });
            }else {
                unfollow(userInfos['user_id']).then((response) => {

                    // Change the button to follow
                    followButton.classList.remove('active');
                    followButton.innerText = 'Follow';
                    // Update the number of followers
                    let followerNb = document.getElementById('follower_nb');
                    followerNb.innerText = parseInt(followerNb.innerText) - 1;
                    
                }).catch((error) => {
                    alert(error);
                });
            }
        });
    }
}

export { generateProfileHeader, activeProfileHeader};
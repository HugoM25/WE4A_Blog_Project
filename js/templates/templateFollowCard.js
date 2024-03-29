import { follow, unfollow, checkFollow } from "../services/serviceFollow.js";
import { sanitizeUserInput } from "../utils/security.js";

async function generateFollowCard(userCardInfos, connectedUserInfos){

    // Prevent the user to follow himself
    let showFollowOptions = userCardInfos['user_id'] != connectedUserInfos['user_id'];

    // Check if the connected user is following the profile page user
    let followInfos = await checkFollow(connectedUserInfos['user_id'], userCardInfos['user_id']);
    let isFollowing = JSON.parse(followInfos)['follow'];

    // Sanitize the user input
    let sanitizedProfilePicturePath = sanitizeUserInput(userCardInfos['profile_picture_path']);
    let sanitizedName = sanitizeUserInput(userCardInfos['name']);
    let sanitizedRef = sanitizeUserInput(userCardInfos['ref']);
    
    return (`                
    <div class="follow-card">
        <img src="${sanitizedProfilePicturePath}" alt="avatar" class="avatar">
        <div class="follow-card-info">
            <a class="follow-card-name" href="profile.html?username=${sanitizedName}">${sanitizedName}</a>
            <div class="follow-card-username">${sanitizedRef}</div>
        </div>
        ${
            showFollowOptions ? `<button class="button-follow ${isFollowing ? 'active' : ''}" id="follow-button-${userCardInfos['user_id']}">${isFollowing ? 'Unfollow' : 'Follow'}</button>` : ''
        }
    </div>`)
}

function activeFollowCard(userCardInfos, connectedUserInfos){
    if (userCardInfos['user_id'] == connectedUserInfos['user_id']){
        return;
    }
    // Get the follow button
    let followButton = document.getElementById(`follow-button-${userCardInfos['user_id']}`);
    // Add the event listener
    followButton.addEventListener('click', () => {
        if (followButton.classList.contains('active')) {
            // Unfollow the user
            unfollow(userCardInfos['user_id']).then((response) => {
                // Change the button style
                followButton.classList.remove('active');
                followButton.innerHTML = 'Follow';
            });
        }else {
            // Follow the user
            follow(userCardInfos['user_id']).then((response) => {
                // Change the button style
                followButton.classList.add('active');
                followButton.innerHTML = 'Unfollow';
            });
        }

    })
}

export { generateFollowCard, activeFollowCard};
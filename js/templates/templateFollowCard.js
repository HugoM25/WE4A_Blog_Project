import { follow, unfollow, checkFollow } from "../utils/serviceFollow.js";

async function generateFollowCard(userCardInfos, connectedUserInfos){

    // Check if the connected user is following the profile page user
    let followInfos = await checkFollow(userCardInfos['user_id'], connectedUserInfos['user_id']);
    console.log(followInfos);
    let isFollowing = JSON.parse(followInfos)['follow'];

    return (`                
    <div class="follow-card">
        <img src="${userCardInfos['profile_picture_path']}" alt="avatar" class="avatar">
        <div class="follow-card-info">
            <a class="follow-card-name" href="profile.html?username=${userCardInfos['name']}">${userCardInfos['name']}</a>
            <div class="follow-card-username">${userCardInfos['ref']}</div>
        </div>
        <button class="button-follow" id="follow-button-${userCardInfos['user_id']}">${isFollowing ? 'Unfollow' : 'Follow'}</button>
    </div>`)
}

function activeFollowCard(userCardInfos){
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
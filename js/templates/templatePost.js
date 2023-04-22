
import { formatText, parseNb, parseTime, processImgLink } from "../utils/textFormatter.js";
import { checkUserLoggedIn } from "../utils/userConnexion.js";
import { sanitizeUserInput } from "../utils/security.js";

// Import functions from services
import { checkRepost } from "../utils/serviceRepost.js";
import { checkLikePost } from "../utils/serviceLike.js";

async function generatePost(infosPost, infosUser, isUserConnected=false){

    var isPostLiked = false;
    var isPostReposted = false;
    var isPostFromUser = false;

    if (isUserConnected){
        // Check if user liked the post
        var likeInfos = await checkLikePost(infosPost['post_id']);
        isPostLiked = JSON.parse(likeInfos)['has_liked'];

        // Check if user reposted the post
        var repostInfos = await checkRepost(infosPost['post_id']);
        isPostReposted = JSON.parse(repostInfos)['has_reposted'];
        
        // Check if the post is from the user
        var connectedUserInfos = await checkUserLoggedIn();
        var connectedUserId = JSON.parse(connectedUserInfos)['user_id']; 

        isPostFromUser = connectedUserId == infosPost['author_id'];
    }

    // Sanitize the text content that the user entered (Never trust the user)
    var sanitizedTextContent = sanitizeUserInput(infosPost["content"]);
    var sanitiziedName = sanitizeUserInput(infosUser["name"]);
    var sanitizedRef = sanitizeUserInput(infosUser["ref"]);
    var sanitizedImagePath = sanitizeUserInput(infosPost["image_path"]);
    var sanitizedAvatarPath = sanitizeUserInput(infosUser["profile_picture_path"]);

    return (`
        <div class="post" post-id="${infosPost["post_id"]}">
        ${
            isPostFromUser ? `<div class="edit-options">
            <button class="edit-button" id="sudo-edit">
                <img src="images/icons/edit_icon.svg" class="icon-edit"></img>
            </button>
            <button class="edit-button" id="sudo-delete">
                <img src="images/icons/trash_icon.svg" class="icon-delete"></img>
            </button>
            </div>` : ""
        }
            <div class="profile">
                <img src="${sanitizedAvatarPath}" alt="Profile Picture">
            </div>
            <div class="header">
                <a class="user-name" href="${"profile.html?username=" + sanitiziedName}">${sanitiziedName}</a>
                <p class="user-id">${sanitizedRef}</p>
                <p class="post-date">${parseTime(infosPost["time"], Date.now()/1000)}</p>
            </div>
            <div class="content">
                <p>${formatText(sanitizedTextContent)}</p>
                ${
                    processImgLink(sanitizedImagePath)
                }
            </div>
            <div class="footer">
                <button class="action red ${ isPostLiked ? "active": "" }" id="like">
                    <img src="images/icons/heart_icon.svg" class="icon-like"></img>
                    <p>${parseNb(infosPost["likes"])}</p>
                </button>
                <button class="action green ${ isPostReposted ? "active": "" }" id="repost">
                    <img src="images/icons/echo_icon.svg" class="icon-echo"></img>
                    <p>${parseNb(infosPost["repost"])}</p>
                </button>
                <button class="action blue" id="share">
                    <img src="images/icons/share_icon.svg" class="icon-like"></img>
                    <p> SHARE </p>
                </button>
                ${
                    infosPost["edited"] ? ` <div class="flair"> <p>edited</p> </div>` : ''
                }
            </div>
        </div>
    `);
}

export { generatePost };
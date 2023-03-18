
function generatePost(infosPost, infosUser, isPostLiked=false, isPostReposted=false){
    return (`
        <div class="post" post-id="${infosPost["post_id"]}">
            <div class="profile">
                <img src="images/default_pic.jpg" alt="Profile Picture">
            </div>
            <div class="header">
                <a class="user-name" href="https://twitter.com/home">${infosUser["name"]}</a>
                <p class="user-id">${infosUser["ref"]}</p>
                <p class="post-date">${parseTime(infosPost["time"], Date.now()/1000)}</p>
            </div>
            <div class="content">
                <p>${infosPost["content"]}</p>
                ${
                    infosPost["image_path"] != null ? `<img src="${infosPost["image_path"]}" alt="Post Image">` : ''
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
                <div class="flair">
                    <p>Sport</p>
                </div>
            </div>
        </div>
    `);
}

function parseTime(time_then, time_now){
    let diff = parseInt(time_now) - parseInt(time_then);
    let time = "";
    if(diff < 60){
        time = "Just now";
    }else if(diff < 3600){
        time = Math.floor(diff/60) + "m";
    }else if(diff < 86400){
        time = Math.floor(diff/3600) + "h";
    }else if(diff < 604800){
        time = Math.floor(diff/86400) + "d";
    }else if(diff < 2628000){
        time = Math.floor(diff/604800) + "w";
    }else if(diff < 31536000){
        time = Math.floor(diff/2628000) + "m";
    }else{
        time = Math.floor(diff/31536000) + "y";
    }
    return time;
}

function parseNb(num){
    num = parseInt(num);
    // If add letter after number
    let res = "";
    if(num < 1000){
        res = num;
    }else if(num < 1000000){
        res = Math.floor(num/1000) + "K";
    }else if(num < 1000000000){
        res = Math.floor(num/1000000) + "M";
    }else{
        res = Math.floor(num/1000000000) + "B";
    }
    return res;

}

export { generatePost };
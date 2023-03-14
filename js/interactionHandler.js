// Set the buttons functionality ( click event for each button )
function SetButtonsFunctionality() {
    document.querySelectorAll('.action').forEach(function(button) {
        // Get the action type
        if (button.id === 'like') {
            button.addEventListener('click', function(){
                LikeFunctionality(findPostParentID(button));
            }, false);
        }
        else if (button.id == "repost") {
            button.addEventListener('click', function(){
                RepostFunctionality(findPostParentID(button));
            }, false);
        }
        else if (button.id === "share") {
            button.addEventListener('click', function(){
                ShareFunctionality(findPostParentID(button));
            }, false);
        }
    });
}

// Find the post-id this button belongs to
var findPostParentID = function(elem) {
    var attribute = elem.closest(".post").getAttribute("post-id");
    return attribute;
};

function LikeFunctionality(postID){
    alert("Like " + postID);
}

function RepostFunctionality(postID){
    alert("Repost " + postID);
}

function ShareFunctionality(postID){
    alert("Share " + postID);
}

export { SetButtonsFunctionality };



import { sanitizeUserInput } from "../utils/security.js";
import { regeneratePostMaker } from "../pagesScripts/mainScript.js";
const maxLineBreaks = 5;

function generatePostMaker(infosUser, infosPostEdit = null) {

    let sanitizedAvatarPath = sanitizeUserInput(infosUser["profile_picture_path"]);
    let sanitizedName = sanitizeUserInput(infosUser["name"]);
    let sanitizedRef = sanitizeUserInput(infosUser["ref"]);
    let sanitizedContent = sanitizeUserInput(infosPostEdit == null ? "" : infosPostEdit["content"]); 
    let sanitizedImagePath = sanitizeUserInput(infosPostEdit == null ? "" : infosPostEdit["image_path"]);

    return `
    <div class="post" post-id="-1">
        <div class="profile">
            <img src="${sanitizedAvatarPath}" alt="Profile Picture">
        </div>
        <div class="header">
            <a class="user-name" href="profile.html?username=${sanitizedName}">${sanitizedName}</a>
            <p class="user-id">${sanitizedRef}</p>
            <p class="post-date"></p>
        </div>
        <div class="content" id="content-post-creator">
            <textarea placeholder="Write something funny here" class="post-writing-field" id="textarea" maxlength="280">${sanitizedContent}</textarea>
            <input type="file" id="image" name="image" accept="image/png, image/gif, image/jpeg">
            <div id="preview-zone" class="${infosPostEdit == null ? 'hidden' : ''}">
                <img id="image-preview" class="preview" src=${sanitizedImagePath}>
                <button id="suppr-button">
                    <img id="icon-cross" src="images/icons/cross_icon.svg" />
                </button>
            </div>
            <label for="image" class="image-add">
                <img id="icon-uploaded-img" src="images/icons/pic_icon.svg"/>
            </label>
        </div>
        <div class="footer">
            <button id="post-edit-button"> <span> Send </span></button>
        </div>
    </div>
    `
}

export { generatePostMaker, activePostMaker};


function activePostMaker(editPostId = null){
    var textarea = document.getElementById("textarea");
    var postCreator = document.getElementById("post-edit-button");
    var inputImageTag = document.getElementById("image");
    var supprButton = document.getElementById("suppr-button");

    // When the user has selected an image
    inputImageTag.addEventListener("change", function() {
        OnImageSelected(inputImageTag);
    });

    postCreator.addEventListener("click", function() {
        SendInfosPostsMaker(inputImageTag, textarea, editPostId);
    });

    supprButton.addEventListener("click", function() {
        EmptyImageLoader();
    });

    textarea.oninput = function() {
        // Limit the number of line breaks
        const currentLineBreaks = (textarea.value.match(/\n/g) || []).length;
        if (currentLineBreaks > maxLineBreaks) {
            textarea.value = textarea.value.slice(0, -1);
        }
    
        // Enlarge the textarea if the user is typing
        textarea.style.height = "";
        textarea.style.height = textarea.scrollHeight + "px"
    };
}

function EmptyImageLoader(){
    // Empty
    var inputImageTag = document.getElementById("image");
    inputImageTag.value = "";

    // Remove preview
    document.getElementById("preview-zone").classList.add("hidden");

    // Reset icon
    var image_icon = document.getElementById("icon-uploaded-img");
    image_icon.src = "images/icons/pic_icon.svg";

}

function OnImageSelected(inputImageTag){
    /* 
    *  This function is called when the user has selected an image
    *  @param inputImageTag : the input tag of the image
    */

    // Find img by id
    var image_icon = document.getElementById("icon-uploaded-img");
    // If the user has selected an image
    if (inputImageTag.files && inputImageTag.files[0]) {
        // Change the icon
        image_icon.src = "images/icons/pic_icon_valid.svg";


        // Add the preview of the image inside html
        var image_preview = document.getElementById("image-preview");

        // Change src of img preview
        image_preview.src = URL.createObjectURL(event.target.files[0]);

        // Remove the hidden class
        document.getElementById("preview-zone").classList.remove("hidden");
    }
}

function SendInfosPostsMaker(inputImageTag, textarea, editPostId = null) {
    /* 
    *  This function send the content of the textarea and the image to the server
    *  @param inputImageTag : the input tag of the image
    *  @param textarea : the textarea tag
    *  @param editPostId : the id of the post to edit
    */

    // Get the image
    var image = inputImageTag.files[0];

    // Get the content of the textarea
    var content = textarea.value;

    // Make sure the content is not empty 
    if (content == "") {
        alert("You can't post an empty post!");
        return;
    }
    //Replace the ' with a '' to avoid SQL errors 
    content = content.replace(/'/g, "''");

    var formData = new FormData();
    formData.append("post_text", content);

    if (editPostId != null && editPostId != -1) {
        formData.append("post_id", editPostId);
        formData.append("action", "edit_post");
        
        // Si l'image a changé 
        if (image != undefined) {
            formData.append("post_image", image);
        }
        else if (document.getElementById("preview-zone").classList.contains("hidden")) {
            // Sinon si l'image a été supprimée
            formData.append("post_image", null);
        }

    }
    else {
        formData.append("action", "add_post");
        formData.append("post_image", image);
    }

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the PHP script URL and parameters
    var url = "php/managePost.php";

    // Set the HTTP request method and content type
    xhr.open("POST", url, true);

    // Define the function to be executed when the PHP script response is received
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Parse the JSON response
            console.log(xhr.responseText);
            var response = JSON.parse(xhr.responseText);

            if (response["success"] == true) {
                ResetPostMaker();
            }
            else {
                alert(response["error"]);
            }
        }
    }

    // Send the HTTP request with the parameters
    xhr.send(formData);
}

function ResetPostMaker(){
    /*
    * Reset the post maker
    */
    var textarea = document.getElementById("textarea");
    var inputImageTag = document.getElementById("image");
    var image_preview = document.getElementById("image-preview");
    var image_icon = document.getElementById("icon-uploaded-img");

    // Reset the textarea
    textarea.value = "";

    // Reset the image
    inputImageTag.value = "";
    image_preview.src = "";
    image_icon.src = "images/icons/pic_icon.svg";
    document.getElementById("preview-zone").classList.add("hidden");

    // Reset functionalities
    regeneratePostMaker();
}
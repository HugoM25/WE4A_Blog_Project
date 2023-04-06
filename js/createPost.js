var textarea = document.getElementById("textarea");
const maxLineBreaks = 5;
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

var postCreator = document.getElementById("post-edit-button");

postCreator.addEventListener("click", function() {

    // Get the image
    var image = document.getElementById("image").files[0];

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
    formData.append("post_image", image);
    formData.append("action", "add_post");

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the PHP script URL and parameters
    var url = "php/addPost.php";

    // Set the HTTP request method and content type
    xhr.open("POST", url, true);

    // Define the function to be executed when the PHP script response is received
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Parse the JSON response
            console.log(xhr.responseText);
            var response = JSON.parse(xhr.responseText);

            if (response["success"] == true) {
                
            }
            else {
                alert(response["error"]);
            }
        }
    }

    // Send the HTTP request with the parameters
    xhr.send(formData);
});






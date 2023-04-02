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
    // Get the content of the textarea
    var content = textarea.value;

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the PHP script URL and parameters
    var url = "php/addPost.php";
    var params = "post_text=" + encodeURIComponent(content) + "&post_image=" + encodeURIComponent("");

    // Set the HTTP request method and content type
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

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
    xhr.send(params);
});






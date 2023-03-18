// Find the buttons to choose signin/signup
var buttonsAction = document.getElementsByClassName("action-button");
// Hide the confirm password field
document.getElementById("conf-pwd").style.display = "none";


var usernameInput = document.querySelector("input[id='username']");
var passwordInput = document.querySelector("input[id='pwd']");
var confirmPasswordInput = document.querySelector("input[id='conf-pwd']");

var registerButton = document.querySelector("button[id='submit-button']");

registerButton.addEventListener("click", formSub);
// Add event listener to all the buttons
for (var i = 0; i < buttonsAction.length; i++) {
    buttonsAction[i].addEventListener("click", function() {
        // Get the index of the clicked button
        var indexButtonActive = Array.prototype.indexOf.call(buttonsAction, this);
        // Set the clicked button as active
        setNewButtonActive(indexButtonActive);
    });
}

function setNewButtonActive(indexButtonActive) {
    // Remove active class from all buttons
    for (var i = 0; i < buttonsAction.length; i++) {
        buttonsAction[i].classList.remove("active");
    }
    // Add active class to the clicked button
    buttonsAction[indexButtonActive].classList.add("active");

    if (indexButtonActive == 1) {
        document.getElementById("conf-pwd").style.display = "block";
    } else {
        document.getElementById("conf-pwd").style.display = "none";
    }
}


function formSub(event){
    // Find which buttons action is active
    var indexButtonActive = Array.prototype.indexOf.call(buttonsAction, document.querySelector(".active"));
    if (indexButtonActive == 0) {
        // Sign in
        signIn(event);
    }
    else {
        // Sign up
        signUp(event);
    }
}

function signUp(event){
    event.preventDefault();

    //Check if the passwords match
    if(passwordInput.value != confirmPasswordInput.value || passwordInput.value == "" || confirmPasswordInput.value == "" || usernameInput.value == ""){
        alert("Passwords do not match");
        return;
    }

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the PHP script URL and parameters
    var url = "php/register.php";
    var params = "username=" + encodeURIComponent(usernameInput.value) + "&password=" + encodeURIComponent(passwordInput.value);

    // Set the HTTP request method and content type
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Define the function to be executed when the PHP script response is received
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
            
            if (xhr.responseText.includes("success")) {
                // Redirect to the index.html page
                window.location.href = "index.html";
            }
        }
    }

    // Send the HTTP request with the parameters
    xhr.send(params);


}

function signIn(event){
    event.preventDefault();

    if (usernameInput.value == "" || passwordInput.value == "") {
        alert("Please fill all the fields");
        return;
    }

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the PHP script URL and parameters
    var url = "php/loginUser.php";
    var params = "username=" + encodeURIComponent(usernameInput.value) + "&password=" + encodeURIComponent(passwordInput.value);

    // Set the HTTP request method and content type
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Define the function to be executed when the PHP script response is received
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
            
            if (xhr.responseText.includes("success")) {
                // Redirect to the index.html page
                window.location.href = "index.html";
            }
        }
    }

    // Send the HTTP request with the parameters
    xhr.send(params);
}


import { signInReq, signUpReq } from "../services/serviceLogin.js";

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
    /*
    *   Sign up the user
    */

    event.preventDefault();

    //Check if the passwords match
    if(passwordInput.value != confirmPasswordInput.value || passwordInput.value == "" || confirmPasswordInput.value == "" || usernameInput.value == ""){
        alert("Passwords do not match");
        return;
    }

    // Sign up
    signUpReq(usernameInput.value, passwordInput.value).then(function(response) {
        // Parse the JSON response
        console.log(response);
        var response = JSON.parse(response);

        if (response["success"] == true) {
            // Redirect to the index.html page
            window.location.href = "index.html";
        }
        else {
            alert(response["error"]);
        }
    }).catch(function(error) {
        alert(error);
    });
}

function signIn(event){
    /*
    *  Sign in the user
    */
    event.preventDefault();

    // Check if the fields are filled
    if (usernameInput.value == "" || passwordInput.value == "") {
        alert("Please fill all the fields");
        return;
    }

    // Sign in 
    signInReq(usernameInput.value, passwordInput.value).then(function(response) {
        // Parse the JSON response
        console.log(response);
        var response = JSON.parse(response);

        if (response["success"] == true) {
            // Redirect to the index.html page
            window.location.href = "index.html";
        }
        else {
            alert(response["error"]);
        }
    }).catch(function(error) {
        alert(error);
    });
}


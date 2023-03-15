// Find the buttons to choose signin/signup
var buttonsAction = document.getElementsByClassName("action-button");
document.getElementById("conf-pwd").style.display = "none";

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
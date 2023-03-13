// Get all the feed options buttons
var buttonsOptionsSearch = document.getElementsByClassName("feed-option-button");

// Add event listener to all the buttons
for (var i = 0; i < buttonsOptionsSearch.length; i++) {
    buttonsOptionsSearch[i].addEventListener("click", function() {
        // Get the index of the clicked button
        var indexButtonActive = Array.prototype.indexOf.call(buttonsOptionsSearch, this);
        // Set the clicked button as active
        setNewButtonActive(indexButtonActive);

    });
}

function setNewButtonActive(indexButtonActive) {
    // Remove active class from all buttons
    for (var i = 0; i < buttonsOptionsSearch.length; i++) {
        buttonsOptionsSearch[i].classList.remove("active");
    }
    // Add active class to the clicked button
    buttonsOptionsSearch[indexButtonActive].classList.add("active");
    document.getElementById("feed").innerHTML = "";

    // Fill the post feed with the new posts
    retrievePostCategory(indexButtonActive);
}

function retrievePostCategory(){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("feed").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", "php/getpostcategory.php?nb=10", true);
    xmlhttp.send();
}
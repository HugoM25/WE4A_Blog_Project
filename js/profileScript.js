
// Get the username from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');

if (username != null) {
    console.log("Looking for : " + username);
}




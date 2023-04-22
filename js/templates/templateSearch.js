import { displayPosts, changeCurrentSearch } from "../pagesScripts/mainScript.js";

function generateSearch(defaultSearch) {

    return (`
            <div class="search-field">
                <input type="text" placeholder="Search" id="search-input">
                <button class="search-button" id="search-button">                        
                    <img src="images/icons/search_icon.svg" class="icon-search"></img>
                </button>
            </div>
            <div class="feed-selection">
                <button class="feed-option-button active">
                    <span>
                        Latest
                    </span>
                </button>
                <button class="feed-option-button">
                    <span>
                        Top
                    </span>
                </button>
                <button class="feed-option-button">
                    <span>
                        Photos
                    </span>
                </button>
                <button class="feed-option-button">
                    <span>
                        Text
                    </span>
                </button>
            </div>
    `); 
}

function activeSearch(defaultSearch){
    // Find the search input
    let searchInput = document.getElementById('search-input');

    searchInput.value = defaultSearch;
    // Find the search button
    let searchButton = document.getElementById('search-button');

    SetButtonsFunctionality(); 

    // When search button is clicked
    searchButton.addEventListener('click', () => {
        // Get the search value
        let searchValue = searchInput.value;

        // If the search value is not empty
        changeCurrentSearch(searchValue);
        // Launch search for posts with the search value
        displayPosts({ nb: 10, allow_image: 1, allow_text: 1, sort: 'time', search: searchValue });
        
    });
}

function SetButtonsFunctionality(){
    // Handle buttons posts requests -------------------------------------------------------
    // Get all the feed options buttons
    var buttonsOptionsSearch = document.getElementsByClassName("feed-option-button");

    // Add event listener to all the buttons
    for (var i = 0; i < buttonsOptionsSearch.length; i++) {
        buttonsOptionsSearch[i].addEventListener("click", function() {
            // Get the index of the clicked button
            var indexButtonActive = Array.prototype.indexOf.call(buttonsOptionsSearch, this);
            
            // Set the clicked button as active
            setNewButtonActive(buttonsOptionsSearch,indexButtonActive);

            // Set the proper request object
            var reqObj;

            switch (indexButtonActive) {
                case 0:
                    reqObj = { nb: 10, allow_image: 1, allow_text: 1, sort: 'time' };
                    break;
                case 1:
                    reqObj = { nb: 10, allow_image: 1, allow_text: 1, sort: 'likes' };
                    break;
                case 2:
                    reqObj = { nb: 10, allow_image: 1, allow_text: 0 };
                    break;
                case 3:
                    reqObj = { nb: 10, allow_image: 0, allow_text: 1 };
                    break;
                default:
                    reqObj = { nb: 10, allow_image: 1, allow_text: 1, sort: 'time' };
                    break;
            };

            displayPosts(reqObj);
        });
    }
}

function setNewButtonActive(buttonsOptionsSearch,indexButtonActive) {
    // Remove active class from all buttons
    for (var i = 0; i < buttonsOptionsSearch.length; i++) {
        buttonsOptionsSearch[i].classList.remove("active");
    }
    // Add active class to the clicked button
    buttonsOptionsSearch[indexButtonActive].classList.add("active");
}


export { generateSearch, activeSearch };
function generateNavPage(currentOffset, postDisplayed, maxDisplayed){

    var showNext = false; 
    var showPrevious = false;

    if (postDisplayed == maxDisplayed){
        // We displayed at least 10 posts so we can add the next page link
        showNext = true;
    }

    if (parseInt(currentOffset) != 0){
        showPrevious = true;
    }

    return (`
    <div class="nav-page">
    ${ showPrevious ? `<div class="previous-page"> <a href="index.html?mode=0&offset=${Math.max(parseInt(currentOffset)-10, 0)}">Previous page</a> </div>` : ``}
    ${ showNext ? `<div class="next-page"> <a href="index.html?mode=0&offset=${parseInt(currentOffset)+10}">Next page</a> </div>` : ``}
    </div>`)
}

export { generateNavPage};
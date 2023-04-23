import { getTrends } from "../utils/serviceTrends.js";

async function generateTrendsPanel(){

    var displaySize = 5;

    // Get the trends
    var infosTrends = await getTrends(displaySize);
    infosTrends = JSON.parse(infosTrends)['trends'];

    // Create the list of trends
    var items = []
    for (var i = 0; i < Math.min(infosTrends.length, displaySize); i++) {
        items.push(trendItem(infosTrends[i]['hashtag'], infosTrends[i]['count']));
    }

    console.log(items);

    return `            
    <div class="trends">
        <h2> Trends </h2>
        ${items.join("")}
    </div>
    `
}

function activeTrendsPanel(){
    // Nothing to do
}

function trendItem(hashtag, nbTweets){
    /*
    * Generate a trend item html
    * @param {string} hashtag - The hashtag
    * @param {int} nbTweets - The number of tweets
    * @return {string} - The html code
    */
    var moreThanOneTweet = parseInt(nbTweets) > 1 ? "s" : "";
    return `
        <div class="trend-item">
            <a href="index.html?search=${encodeURIComponent(hashtag)}"> ${hashtag} </a>
            <span> ${nbTweets} Post${moreThanOneTweet}</span>
        </div>
    `
}

export { generateTrendsPanel, activeTrendsPanel};
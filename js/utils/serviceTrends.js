function getTrends(limit){
    /*
    * Get the trends
    * @param {int} limit - The number of trends to get
    * @return {Promise} - The promise of the request
    * */
    var req = `php/getTrends.php?limit=${limit}`;

    return new Promise(function(resolve, reject) {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.responseText);
            } else if (this.readyState == 4) {
                reject('Error retrieving post.');
            }
        };
        xmlhttp.open('GET', req, true);
        xmlhttp.send();
    });
}

export { getTrends};

function medio(rsslink){
var resultados=[];

/**
 * 
 
 * pulls information from the form and build the query URL
 * @returns {string} URL for NYT API based on form inputs
 */
function buildQueryURL() {
    // queryURL is the url we'll use to query the API
    //var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  
    var queryURL = "https://api.rss2json.com/v1/api.json?rss_url=" + rsslink + "&api_key=rdpmxqvrg636d7pvhkylsbx2a1w9jtwpzveorydm";
    // Begin building an object to contain our API call's query parameters
    // Set the API key

  //  var queryParams = { "api-key": "0wlpVX7cIjFxYzCD6FmAS39d2lmBKh1O" };
    

    //var queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };
  
    // Grab text the user typed into the search input, add to the queryParams object
  
    // If the user provides a startYear, include it in the queryParams object
  
  
    // If the user provides an endYear, include it in the queryParams object
  
  
    // Logging the URL so we have access to it for troubleshooting
    //return queryURL + $.param(queryParams);
  return queryURL 
  
  }


  
  /**
   * takes API data (JSON/object) and turns it into elements on the page
   * @param {object} NYTData - object containing NYT API data
   */
  function updatePage(NYTData) {
    // Get from the form the number of results to display
    // API doesn't have a "limit" parameter, so we have to do this ourselves
  
    // Log the NYTData to console, where it will show up as an object
//    console.log(NYTData);
  //  console.log("------------------------------------");
  
    // Loop through and build elements for the defined number of articles
    for (var i = 0; i < 5; i++) {
      // Get specific article info for current index
      //var article = NYTData.response.docs[i];
var article = NYTData.items[i];
  
      // Increase the articleCount (track article # - starting at 1)
      var articleCount = i + 1;
  
      // Create the  list group to contain the articles and add the article content for each
      var $articleList = $("<ul>");
      $articleList.addClass("list-group");
  
      // Add the newly created element to the DOM
      $("#article-section").append($articleList);
  
      // If the article has a headline, log and append to $articleList
      //var headline = article.headline;
var headline = article.title;
//console.log(headline);
var abstract ="";
abstract = article.description;
var urln = article.link;
var byline = article.author;
var section = NYTData.feed.title;
var source2 = NYTData.feed.url;

source2 = source2.replace("https://", "");
source2 = source2.replace("http://", "");

source2 = source2.split("/", 1)
//console.log(source2);
//console.log(abstract);
//console.log(urln);
//console.log(byline);



if (abstract.length > 1){

  resultados.push({url: urln, headline: headline, abstract: abstract, author: byline, source: source2, section: section} );
  
  
  //    var $articleListItem = $("<li class='list-group-item articleHeadline'>");
  
    //  $articleListItem.append(
 // "<a href='" +urln + "'>" +
   //       "<h3> " +
     //     headline +
    //      "</h3>" + "<p>" + abstract + "</p>" + "<h5><strong>" +source2+ "</Strong> " + byline + "--" + section  + "</h5>" + "</a> </li>"
     // );


     
      // If the article has a byline, log and append to $articleList
   
      // Log section, and append to document if exists
   
      // Append and log url
     
      // Append the article
  //    $articleList.append($articleListItem);
  
}
    }
  }
  
  // Function to empty out the articles
  function clear() {
    $("#article-section").empty();
  }
  
  clear();
  var queryURL = buildQueryURL();
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);

  return resultados;
}

console.log(medio("https://www.cnbc.com/id/100003114/device/rss/rss.html"));
console.log(medio("https://www.latimes.com/world/mexico-americas/rss2.0.xml"));

console.log(medio("https://www.economist.com/international/rss.xml"));


console.log(medio("http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"));

console.log(medio("https://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU"));

console.log(medio("http://feeds2.feedburner.com/time/topstories"));

console.log(medio("https://www.dailyherald.com/rss/feed/?feed=news_top5"));


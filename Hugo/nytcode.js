/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for NYT API based on form inputs
 */
function buildQueryURL() {
    // queryURL is the url we'll use to query the API
    //var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  
    var queryURL = "https://api.nytimes.com/svc/news/v3/content/all/all.json?";
    // Begin building an object to contain our API call's query parameters
    // Set the API key

    var queryParams = { "api-key": "0wlpVX7cIjFxYzCD6FmAS39d2lmBKh1O" };
    

    //var queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };
  
    // Grab text the user typed into the search input, add to the queryParams object
  
    // If the user provides a startYear, include it in the queryParams object
  
  
    // If the user provides an endYear, include it in the queryParams object
  
  
    // Logging the URL so we have access to it for troubleshooting
    return queryURL + $.param(queryParams);
  }
  
  /**
   * takes API data (JSON/object) and turns it into elements on the page
   * @param {object} NYTData - object containing NYT API data
   */
  function updatePage(NYTData) {
    // Get from the form the number of results to display
    // API doesn't have a "limit" parameter, so we have to do this ourselves
  
    // Log the NYTData to console, where it will show up as an object
    console.log(NYTData);
    console.log("------------------------------------");
  
    // Loop through and build elements for the defined number of articles
    for (var i = 0; i < 5; i++) {
      // Get specific article info for current index
      //var article = NYTData.response.docs[i];
var article = NYTData.results[i];
  
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
console.log(headline);
var abstract = article.abstract;
var urln = article.url;
var byline = article.byline;
var section = article.section;

console.log(abstract);
console.log(urln);
console.log(byline);


      var $articleListItem = $("<li class='list-group-item articleHeadline'>");
  
      $articleListItem.append(
  "<a href='" +urln + "'>" +
          "<h3> " +
          headline +
          "</h3>" + "<p>" + abstract + "</p>" + "<h5><strong> The New York Times </Strong> " + byline + "--" + section  + "</h5>" + "</a> </li>"
      );


     
      // If the article has a byline, log and append to $articleList
   
      // Log section, and append to document if exists
   
      // Append and log url
     
      // Append the article
      $articleList.append($articleListItem);
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

  // CLICK HANDLERS
  // ==========================================================
  
  // .on("click") function associated with the Search Button
  
  /*
  $("#run-search").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
  
    // Empty the region associated with the articles
    clear();
  
    // Build the query URL for the ajax request to the NYT API
    var queryURL = buildQueryURL();
  //var queryURL= "https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=0wlpVX7cIjFxYzCD6FmAS39d2lmBKh1O";
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(updatePage);
  });
  
  //  .on("click") function associated with the clear button
  $("#clear-all").on("click", clear);
  */
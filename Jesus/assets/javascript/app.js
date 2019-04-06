/* app.js               */
/*  TheGuardian API     */
/* 6/Apr/2019           */


// GLOBAL VARIABLES
// =======================================================================================
var queryURL    = "https://content.guardianapis.com";
var queryParams = "/search?q=";
var apiKey      = "d29910de-c99f-41a2-936b-c52c08761666";
var q = queryURL + queryParams + "mexico&api-key=" + apiKey;


// OBJECTS
// =======================================================================================


// FUNCTIONS (Definition)
// =======================================================================================
function muestra (results) {
	var r = $("#row1");
	var sp, br;
	console.log ("results", results);
	console.log ("long", results.length);
	for (ct = 0; ct < results.length; ct ++) {
		sp = $("<p>");
		br = $("<br>");
		sp.text ( results [ct].webTitle );
		r.append ( sp, br );
	};
};


// FUNCTION CALLS (Execution)
// =======================================================================================
$(document).ready(function() {
  
  $.ajax(
		{url    : q,
		 method : "GET"}
	).done ( 
		function (data) {   // Se ejecuta después de traer la info del servidor
			  //console.log (data);
			  muestra ( data.response.results );
		});
  
}); // document.ready

/*
	$.ajax ( {url:queryURL, method: 'GET'} )
		  .done ( function (response) {   // Se ejecuta después de traer la info del servidor
			  console.log (response);
			  $(".container").append (JSON.stringify (response) );
		  });
---------------
  $.ajax(
	{url    : q,
     method : "GET"}
	).then(updatePage);

*/
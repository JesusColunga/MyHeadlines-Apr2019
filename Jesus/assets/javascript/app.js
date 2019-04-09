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
			  muestra ( data.response.results );
		});
  
}); // document.ready

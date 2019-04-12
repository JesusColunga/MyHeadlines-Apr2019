/*  app.js               */
/*  TheGuardian API      */
/*  9/Apr/2019           */


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

function processTopic1 () {
	alert ("(processTopic1)q=" + q);   // Aparece correctamente
	
	// Todo lo siguiente ya no sucede !
	$.ajax(
		{url    : q,
		 method : "GET"}
	).then ( 
		function (data) {   // Se ejecuta después de traer la info del servidor
		    alert ("(processTopic) ya trajo info");
			muestra ( data.response.results );
		});
};
function processTopic () {
	alert ("(processTopic)q=" + q);   // Aparece correctamente
    var response; var textStatus;
	
	// Todo lo siguiente ya no sucede !
    $.ajax ( {url   : q,
              method: "GET"} )
		.then (
			function (response, textStatus) {
			console.log ( "response=", response, "textStatus=", textStatus );
			if (textStatus == "success") {
				//processInfo ( response.data );
				//muestra ( data.response.results );
			} else {
				alert ("Problem retrieving information from the web site.");
			}});
};

/*
function clicTopicBtn (topic) {
    var response; var textStatus;
	var queryURL = queryGiphy + topic + "&limit=10" + myGiphyKey;
    $.ajax ( {url   : queryURL,
              method: "GET"} )
		.then (
			function (response, textStatus) {
			if (textStatus == "success") {
				processInfo ( response.data );
			} else {
				alert ("Problem retrieving information from the web site.");
			}});
};
*/



// FUNCTION CALLS (Execution)
// =======================================================================================
$(document).ready(function() {
/*
  $.ajax(
		{url    : q,
		 method : "GET"}
	).done ( 
		function (data) {   // Se ejecuta después de traer la info del servidor
			console.log ( data.response.results);  // Sí muestra un arreglo con 10 elementos
		});
*/


	$("#searchTopic").on ("click",
		function () {
			//alert ( "hizo clic" );   // Sí aparece este mensaje
			//processTopic (); // No funciona bien
			processTopic1 ();  // No funciona bien
		}
	);


}); // document.ready

/*
	$("#searchTopic").on ("click",
		function () {
			console.log ("clic a searchTopic");
			$.ajax(
				{url    : q,
				 method : "GET"}
			).then ( 
				function (data) {   // Se ejecuta después de traer la info del servidor
				// ESTO NO SE EJECUTA
					alert ("(clic searchTopic) ya trajo info");
					console.log ( data.response.results );
				});
		}
	);
*/
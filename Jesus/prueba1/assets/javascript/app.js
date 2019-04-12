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
function processCard (indice, data) {
	console.log ("data=", data);
	var card, cardBody, p, img, p2, p3, p4, p5;
	
	card = $("<div>");
	card.addClass ("card border-primary m-2");
	card.attr ("style", "width:18rem");
	
	cardBody = $("<div>");
	cardBody.addClass ("card-body");
	
	p = $("<div>");
	p.addClass ("card-text");
	p.text (indice + " - " + data.webTitle);
	cardBody.append (p);
	
	p2 = $("<div>");
	p2.addClass ("card-text");
	p2.text ("Date: " + data.webPublicationDate);
	cardBody.append (p2);
	
	p3 = $("<div>");
	p3.addClass ("card-text");
	p3.text (data.webUrl);
	cardBody.append (p3);
	
	p4 = $("<div>");
	p4.addClass ("card-text");
	p4.text ("Type: " + data.type);
	cardBody.append (p4);
	
	p5 = $("<div>");
	p5.addClass ("card-text");
	p5.text ("Section: " + data.sectionName);
	cardBody.append (p5);
	
	img = $("<img>");
	img.attr ("src", "");
	img.addClass ("card-img-top");
	img.attr ("alt", "");
	
	card.append (cardBody, img);
	$("#row1").append (card);
};

function muestra (results) {
	for (ct = 0; ct < results.length; ct ++) {
		processCard (ct + 1, results [ct]);
	};
};

function processTopic1 () {
	alert ("(processTopic)q=" + q);
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
	alert ("(processTopic)q=" + q);
    var response; var textStatus;
    $.ajax ( {url   : q,
              method: "GET"} )
		.then (
			function (response, textStatus) {
			if (textStatus == "success") {
				//processInfo ( response.data );
				console.log ( "response=", response );
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
			sessionStorage.setItem('guardian', data.response.results);
			muestra ( data.response.results );
		});
*/

	$("#searchTopic").on ("click",
		function () {
			processTopic ();
		}
	);


}); // document.ready


/*
	$("#searchTopic").on ("click",
		function () {
			
			$.ajax(
				{url    : q,
				 method : "GET"}
			).then ( 
				function (data) {   // Se ejecuta después de traer la info del servidor
					//alert ("(processTopic) ya trajo info");
					muestra ( data.response.results );
				});
			
		}
	);
*/
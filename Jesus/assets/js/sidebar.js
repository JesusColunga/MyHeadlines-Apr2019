
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
	//console.log ("data=", data);
	var card, cardBody, p, img, p2, p4, p5;
	
	card = $("<div>");
	card.addClass ("card border-primary m-2");
	card.attr ("style", "width:18rem");
	
	cardBody = $("<div>");
	cardBody.addClass ("card-body");
	
	p = $("<div>");
	p.addClass ("card-text");
	p.html ( "<b>"         +
	         indice        + 
	         " - "         +
			 "</b>"        +
			 "<a href='"   +
			 data.webUrl   + 
			 "'>"          +
			 data.webTitle +
			 "</a>"
		   );
	cardBody.append (p);
	
	p2 = $("<div>");
	p2.addClass ("card-text");
	p2.html ( "<b>"         +
	          "Date: "      +
			  "</b>"        +
			  data.webPublicationDate
			);
	cardBody.append (p2);
	
	p4 = $("<div>");
	p4.addClass ("card-text");
	p4.html ( "<b>"         +
	          "Type: "      +
			  "</b>"        +
			  data.type
			);
	cardBody.append (p4);
	
	p5 = $("<div>");
	p5.addClass ("card-text");
	p5.html ( "<b>"         +
	          "Section: "   +
			  "</b>"        +
			  data.sectionName
			);
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


// FUNCTION CALLS (Execution)
// =======================================================================================
$(document).ready(function() {
	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');
		$(this).toggleClass('active');
	});
	
	$.ajax(
		{url    : q,
		 method : "GET"}
	).done ( 
		function (data) {   // Se ejecuta después de traer la info del servidor
			muestra ( data.response.results );
		});
}); // document.ready

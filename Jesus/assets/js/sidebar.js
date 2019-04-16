
// GLOBAL VARIABLES
// =====================================================================================
var queryURL = "https://content.guardianapis.com";
var queryParams = "/search?q=";
var apiKey = "d29910de-c99f-41a2-936b-c52c08761666";


// OBJECTS
// =====================================================================================
var sourcesArr = [
	"",                                  // Index 0 - Empty
	{ image : "CNBC50px.png",            // Index 1 - CNBC
	  url   : "https://www.cnbc.com/id/100003114/device/rss/rss.html"
	},
	{ image : "LATimes50px.png",         // Index 2 - Los Angeles Times
	  url   : "https://www.latimes.com/world/mexico-americas/rss2.0.xml"
	},
	{ image : "TheEconomist50px.png",    // Index 3 - The Economist
	  url   : "https://www.economist.com/international/rss.xml"
	},
	{ image : "NYT50px.png",             // Index 4 - The New York Times
	  url   : "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
	},
	{ image : "FoxSports50px.png",       // Index 5 - Fox Sports
	  url   : "https://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU"
	},
	{ image : "FeedBurner50px.png",      // Index 6 - FeedBurner
	  url   : "http://feeds2.feedburner.com/time/topstories"
	},
	{ image : "DailyHerald50px.png",     // Index 7 - Daily Herald
	  url   : "https://www.dailyherald.com/rss/feed/?feed=news_top4"
	},
	{ image : "theguardian50px.png",     // Index 8 - The Guardian
	  url   : ""
	}
];


// FUNCTIONS (Definition)
// =====================================================================================
function processCard(indice, data) {            // Search Topic
	//console.log ("data=", data);
	var card, cardBody, p, img, p2, p3, p4;

	card = $("<div>");
	card.addClass("card border-success m-2");
	card.attr("style", "width:18rem");

	cardBody = $("<div>");
	cardBody.addClass("card-body");

	p = $("<div>");
	p.addClass("card-text newsHeader");
	p.html("<b>" +
		indice +
		" - " +
		"</b>" +
		"<a href='" +
		data.webUrl +
		"'>" +
		data.webTitle +
		"</a>"
	);
	cardBody.append(p);

	p2 = $("<div>");
	p2.addClass("card-text newsDate");
	p2.html("<b>" +
		"Date: " +
		"</b>" +
		data.webPublicationDate
	);
	cardBody.append(p2);

	p3 = $("<div>");
	p3.addClass("card-text newsType");
	p3.html("<b>" +
		"Type: " +
		"</b>" +
		data.type
	);
	cardBody.append(p3);

	p4 = $("<div>");
	p4.addClass("card-text newsSection");
	p4.html("<b>" +
		"Section: " +
		"</b>" +
		data.sectionName
	);
	cardBody.append(p4);

	img = $("<img>");
	img.attr("src", "");
	img.addClass("card-img-top newsImg");
	img.attr("alt", "");

	card.append(cardBody, img);
	$("#row1").append(card);
};

function muestra(results) {            // Search Topic
	$("#row1").empty ();
	for (ct = 0; ct < results.length; ct++) {
		processCard(ct + 1, results[ct]);
	};
};

//-----------------------------
function processCard2(data, index) {		 // "Top News"
	var card, cardBody, cardText, cardFoot, r, col1, col2, p2, p3, p4, img;
	// --------  Card 
	card = $("<div>");
	card.addClass("card border-primary m-2");
	card.attr("style", "width:18rem");
	// --------  Card Body
	cardBody = $("<div>");
	cardBody.addClass("card-body");
	// --------  Card Text
	cardText = $("<div>");   // News text
	cardText.addClass("card-text newsHeader");
	cardText.html(
		"<a href='" +
		data.url +
		"'>" +
		data.headline +
		"</a>"
	);
	cardBody.append(cardText);
	card.append(cardBody);
	// =======================
	
	// --------  Card Footer
	cardFoot = $("<div>");   // Footer
	cardFoot.addClass ("card-footer");
	// --------  Row
	r = $("<div>");
	r.addClass("row");
	// --------  Col 1
	col1 = $("<div>");
	col1.addClass("col-3");
	// en este va la imagen
	    // ---
	img = $("<img>");
	img.attr ( "src", "assets/img/" + sourcesArr [index].image );
	col1.append (img);
	// --------  Col 2
	col2 = $("<div>");
	col2.addClass("col-9");
	    // ---
	if (data.author !== "") {
		p2 = $("<div>");         // Author
		p2.addClass("card-text newsAuthor");
		p2.html("<b>" +
			"Author: " +
			"</b>" +
			data.author
		);
		col2.append(p2);
	}
	    // ---
	if (data.source !== "") {
		p3 = $("<div>");         // Source
		p3.addClass("card-text newsSource");
		p3.html("<b>" +
			"Source: " +
			"</b>" +
			data.source
		);
		col2.append(p3);
	}
	    // ---
	if (data.section !== "") {
		p4 = $("<div>");         // Section
		p4.addClass("card-text newsSection");
		p4.html("<b>" +
			"Section: " +
			"</b>" +
			data.section
		);
		col2.append(p4);
	}
	    // ---
	// --------  
	r.append (col1, col2);
	cardFoot.append (r);
	card.append(cardFoot);
	$("#row1").append(card);
	// =======================
};

function showTopNewsResults(results, index) {
	for (ct = 0; ct < results.length; ct++) {
		processCard2(results[ct], index);
	};
};
/* ==============================================================
   ==========          Top News Code - Start          =========== */
//function medio(rsslink) {
function medio( index ) {
	var rsslink = sourcesArr [index].url;
	var resultados = [];


	function buildQueryURL() {
		return "https://api.rss2json.com/v1/api.json?rss_url=" +
			rsslink +
			"&api_key=rdpmxqvrg636d7pvhkylsbx2a1w9jtwpzveorydm";
	}


	function updatePage(NYTData) {
		for (var i = 0; i < 5; i++) {
			var article = NYTData.items[i];
			var articleCount = i + 1;
			var headline = article.title;
			var abstract = "";
			abstract = article.description;
			var urln = article.link;
			var byline = article.author;
			var section = NYTData.feed.title;
			var source2 = NYTData.feed.url;
			source2 = source2.replace("https://", "");
			source2 = source2.replace("http://", "");
			source2 = source2.split("/", 1)

			if (abstract.length > 1) {
				resultados.push(
					{
						url: urln,
						headline: headline,
						abstract: abstract,
						author: byline,
						source: source2,
						section: section
					}
				);
			}
		}

		showTopNewsResults(resultados, index);
	}

	$.ajax({
		url: buildQueryURL(),
		method: "GET"
	}).then(updatePage);

}
/* ==============================================================
   ==========          Top News Code -  End           =========== */

function selectSources() {           // "Top News" button click
	if (!$("#newSite1").prop("checked") &&
	    !$("#newSite2").prop("checked") &&
	    !$("#newSite3").prop("checked") &&
	    !$("#newSite4").prop("checked") &&
	    !$("#newSite5").prop("checked") &&
	    !$("#newSite6").prop("checked") &&
	    !$("#newSite7").prop("checked") 
	   ) { swal ( "Wait!", "Please select at least one News Source", "error" ); }
    else {
		$("#row1").empty ();
		for (ct = 1; ct < 8; ct++) {
			if ($("#newSite" + ct).prop("checked")) {
				medio( ct );
			};
		};
	};
};

function createQuery (topic) {
	return queryURL    + 
	       queryParams +
		   topic       +
	       "&api-key=" + 
		   apiKey;
};

function processTopic() {            // "Search" button click
	var topic = $("#topicInput").val ().trim ();
	$("#topicInput").val ( "" );
console.log ( "q=", createQuery (topic) );
	if (topic === "") {
		swal ( "Wait!", "Please write a topic to search", "error" );
	}
	else {
		$.ajax(
			{
				url: createQuery (topic),
				method: "GET"
			}
		).done(
			function (data) {   
				muestra(data.response.results);
			});
	};
};

function toggleMenu() {
	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');
		$(this).toggleClass('active');
	});
};

// FUNCTION CALLS (Execution)
// =====================================================================================
$(document).ready(function () {
	toggleMenu();
	$(".news-sections").hide()
	
	$("#topNews").on("click",
		function () {
			selectSources();           // "Top News" button click
		}
	);

	$("#searchTopic").on("click",
		function (event) {
			event.preventDefault();
			processTopic();            // "Search" button click
		}
	);
}); // document.ready


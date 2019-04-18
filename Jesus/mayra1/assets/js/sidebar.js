
// GLOBAL VARIABLES
// =====================================================================================
var queryURL = "https://content.guardianapis.com";
var queryParams = "/search?q=";
var apiKey = "d29910de-c99f-41a2-936b-c52c08761666";
var q = queryURL + queryParams + "mexico&api-key=" + apiKey;


// OBJECTS
// =====================================================================================


// FUNCTIONS (Definition)
// =====================================================================================
function processCard(indice, data) {
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
		"<a data-toggle='modal' class='access' href='" +
		data.webUrl +
		"'  data-target='#myModal'>" +
		data.webTitle +
		"</a>"
	);
	cardBody.append(p);

	p2 = $("<div>");
	p2.addClass("card-text newsSection");
	p2.html(
		data.sectionName.toUpperCase()
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
	p4.addClass("card-text newsDate");
	p4.html("<b>" +
		"Date: " +
		"</b>" +
		data.webPublicationDate
	);
	cardBody.append(p4);
	

	img = $("<img>");
	img.attr("src", "");
	img.addClass("card-img-top newsImg");
	img.attr("alt", "");

	card.append(cardBody, img);
	$("#row1").append(card);
};

function muestra(results) {
	$("#row1").empty ();
	for (ct = 0; ct < results.length; ct++) {
		processCard(ct + 1, results[ct]);
	};
};

//-----------------------------
function processCard2(indice, data) {
	var card, cardBody, p1, p2, p3, p4;

	card = $("<div>");
	card.addClass("card border-primary m-2");
	card.attr("style", "width:18rem");
	card.attr ( "id", "newsCardClick" );

	cardBody = $("<div>");
	cardBody.addClass("card-body");

	p1 = $("<div>");
	p1.addClass("card-text newsHeader");
	//p1.attr ( "id", "" );
	
	/*
	p1.html("<b>" +
		indice +
		" - " +
		"</b>" +
		"<a data-toggle='modal' class='access' href='" +
		data.url +
		"' data-target='#myModal'>" +
		data.headline +
		"</a>"
	);
	*/
	
	p1.html("<b>"  +
			indice +
			" - "  +
			"</b>" +
			data.headline
	);

	//---------------------
	cardBody.append(p1);

	p2 = $("<div>");
	p2.addClass("card-text newsAuthor");
	p2.html(
		data.author
	);
	cardBody.append(p2);

	p3 = $("<div>");
	p3.addClass("card-text newsSection2");
	p3.html(
		data.section.toUpperCase()
	);
	cardBody.append(p3);

	p4 = $("<div>");
	p4.addClass("card-text newsSource");
	p4.html("<b>" +
		"Source: " +
		"</b>" +
		data.source
	);
	cardBody.append(p4);

	

	card.append(cardBody);
	$("#row1").append(card);
};

function showTopNewsResults(results) {
	for (ct = 0; ct < results.length; ct++) {
		processCard2(ct + 1, results[ct]);
	};
};
/* ==============================================================
   ==========          Top News Code - Start          =========== */
function medio(rsslink) {
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

		showTopNewsResults(resultados);
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
		if ($("#newSite1").prop("checked")) {
			medio("https://www.cnbc.com/id/100003114/device/rss/rss.html");
		};
		if ($("#newSite2").prop("checked")) {
			medio("https://www.latimes.com/world/mexico-americas/rss2.0.xml");
		};
		if ($("#newSite3").prop("checked")) {
			medio("https://www.economist.com/international/rss.xml");
		};
		if ($("#newSite4").prop("checked")) {
			medio("http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml");
		};
		if ($("#newSite5").prop("checked")) {
			medio("https://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU");
		};
		if ($("#newSite6").prop("checked")) {
			medio("http://feeds2.feedburner.com/time/topstories");
		};
		if ($("#newSite7").prop("checked")) {
			medio("https://www.dailyherald.com/rss/feed/?feed=news_top4");
		};
	};
};

function processTopic() {            // "Search" button click
	$.ajax(
		{
			url: q,
			method: "GET"
		}
	).done(
		function (data) {   
			muestra(data.response.results);
		});
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
	$(".news-sections").hide();
	
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
	
//------------------------------------------
	$("#row1").on("click" , ".border-primary",
		function () {
			console.log ("newsCardClick-1");
		}
	);
	
	$("#row9").on("click" , ".border-primary",
		function () {
			//event.preventDefault();
			console.log ("newsCardClick-9");
		}
	);
//------------------------------------------
//To open URL on iframe
//Cannot make this work 
/*
	$('#newsCardClick').on('click', "#row1", function(e) {
		e.preventDefault();
		var url = $(this).attr('href');
		console.log(url);
		//$(".modal-body").html('<iframe width="100%" height="100%" frameborder="0" scrolling="yes" allowtransparency="true" src="'+url+'"></iframe>');
});
*/	
}); // document.ready
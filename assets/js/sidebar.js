
// GLOBAL VARIABLES
// =====================================================================================
var queryURL = "https://content.guardianapis.com";
var queryParams = "/search?q=";
var apiKey = "d29910de-c99f-41a2-936b-c52c08761666";


// OBJECTS
// =====================================================================================
var sourcesArr = [
	"",                                   // Index 0 - Empty
	{
		image: "CNBC50px.png",            // Index 1 - CNBC
		url:   "https://www.cnbc.com/id/100003114/device/rss/rss.html",
		alt:   "CNBC"
	},
	{
		image: "LATimes50px.png",         // Index 2 - Los Angeles Times
		url:   "https://www.latimes.com/world/mexico-americas/rss2.0.xml",
		alt:   "LATimes"
	},
	{
		image: "TheEconomist50px.png",    // Index 3 - The Economist
		url:   "https://www.economist.com/international/rss.xml",
		alt:   "The Economist"
	},
	{
		image: "NYT50px.png",             // Index 4 - The New York Times
		url:   "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
		alt:   "NYTimes"
	},
	{
		image: "FoxSports50px.png",       // Index 5 - Fox Sports
		url:   "https://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU",
		alt:   "Fox Sports"
	},
	{
		image: "FeedBurner50px.png",      // Index 6 - FeedBurner
		url:   "http://feeds2.feedburner.com/time/topstories",
		alt:   "FeedBurner"
	},
	{
		image: "DailyHerald50px.png",     // Index 7 - Daily Herald
		url:   "https://www.dailyherald.com/rss/feed/?feed=news_top4",
		alt:   "Daily Herald"
	},
	{
		image: "theguardian50px.png",     // Index 8 - The Guardian
		url:   "",
		alt:   "The Guardian"
	}
];


// FUNCTIONS (Definition)
// =====================================================================================

function muestra(results) {            // Search Topic
	$("#row1").empty();
	for (ct = 0; ct < results.length; ct++) {
		processCardSearchTopic(results[ct]);
	};
	$(".back2top").show();
};

//-----------------------------

function showTopNewsResults(results, index) {
	for (ct = 0; ct < results.length; ct++) {
		processCardTopNews(results[ct], index);
	};
	$(".back2top").show();
};
/* ==============================================================
   ==========          Top News Code - Start          =========== */
//function medio(rsslink) {
function medio(index) {
	var rsslink = sourcesArr[index].url;
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
/* ==========          Top News Code -  End           =========== 
   ============================================================== */

function selectSources() {           // "Top News" button click
	if (!$("#newSite1").prop("checked") &&
		!$("#newSite2").prop("checked") &&
		!$("#newSite3").prop("checked") &&
		!$("#newSite4").prop("checked") &&
		!$("#newSite5").prop("checked") &&
		!$("#newSite6").prop("checked") &&
		!$("#newSite7").prop("checked")
	) { swal("Wait!", "Please select at least one News Source", "error"); }
	else {
		StoreUserSources ();
		$(".newsHowTo").html("Your Top News");
		$("#row1").empty();
		for (ct = 1; ct < 8; ct++) {
			if ($("#newSite" + ct).prop("checked")) {
				medio(ct);
			};
		};
	};
};

function createQuery(topic) {
	return queryURL +
		queryParams +
		topic +
		"&api-key=" +
		apiKey;
};

function processCheckContent (topic) {
	return topic.match (/^[a-zA-Z0-9 ]+$/)
};

function processTopic() {            // "Search" button click
	var topic = $("#topicInput").val().trim();
	if (topic === "") {
		swal("Wait!", "Please write a topic to search", "error");
	}
	else 
	if ( !processCheckContent (topic) ) {
		swal("Wait!", "Please type letters or numbers for your topic", "error");
	}
	else {
		topic = DOMPurify.sanitize(topic);
		$(".newsHowTo").html("Your search results for " + topic + ":" );
		$.ajax(
			{
				url: createQuery(topic),
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

function startSettings() {
	$(".news-sections").hide();
	$(".back2top").hide();
	$(".news-category").html("My Headlines");
	$(".newsHowTo").html("Please choose your preferred news sources from the side bar.");
};

function openInNewTab(url) {
	var win = window.open(url, '_blank');
	win.focus();
}

function inModal() {
	var url = $(this).attr("data-url");
	if (url.includes("nytimes") || url.includes("theguardian")) {
		openInNewTab(url);
		} else {
		$("#myModal").modal();
		$(".modal-body").html('<iframe width="100%" height="100%" frameborder="0" scrolling="yes" allowtransparency="true" src="' + url + '"></iframe>');
	}
}

function StoreUserSources () {
	var userSources = {
		newSite1: $("#newSite1").prop("checked"),
		newSite2: $("#newSite2").prop("checked"),
		newSite3: $("#newSite3").prop("checked"),
		newSite4: $("#newSite4").prop("checked"),
		newSite5: $("#newSite5").prop("checked"),
		newSite6: $("#newSite6").prop("checked"),
		newSite7: $("#newSite7").prop("checked")
	};
	localStorage.clear();
	localStorage.setItem("userSources", JSON.stringify(userSources) );
};

function RetrieveUserSources () {
	var userSources = JSON.parse( localStorage.getItem("userSources") );
	if (userSources === null) {
		for (ct = 1; ct <= 7; ct ++) {
			$("#newSite" + ct).attr("checked", true);
		};
	} else {
		for (ct = 1; ct <= 7; ct ++) {
			$("#newSite" + ct).attr("checked", userSources ["newSite" + ct]);
		};
	};
};


// FUNCTION CALLS (Execution)
// =====================================================================================
$(document).ready(function () {
	toggleMenu();
	startSettings();
	RetrieveUserSources ();
	
	$("#topNews").on("click",
		function () {
			$(".headline-head").show();
			selectSources();                     // "Top News" button click
		}
	);

	$("#searchTopic").on("click",
		function (event) {
			event.preventDefault();
			$(".headline-head").show();
			processTopic();                      // "Search" button click
		}
	);

	$("#row1").on("click", ".border-primary", inModal);  // "Top News" card click
	$("#row1").on("click", ".border-success",  inModal); // "Search Topic" card click
}); // document.ready




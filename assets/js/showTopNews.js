/* showTopNews.js */

function processCrdFtRwCol2Section (data) {
	var p4 = $("<div>");         // Section
	p4.addClass ("card-text newsSection");
	p4.html ("<b>" +
	 		 "Section: " +
	 		 "</b>" +
			 data.section.replace(";amp;", " ")
		    );
	return p4;
};

function processCrdFtRwCol2Source (data) {
	var p3 = $("<div>");         // Source
	p3.addClass ("card-text newsSource");
	p3.html ("<b>"      +
		  	 "Source: " +
			 "</b>"     +
			 data.source
		    );
	return p3;
};

function processCrdFtRwCol2Author (data) {
	var p2 = $("<div>");         // Author
	p2.addClass ("card-text newsAuthor");
	p2.html ("<b>"      +
			 "Author: " +
			 "</b>"     +
			 data.author
		    );
	return p2;
};

function processCrdFtRwCol2 (data) {
	var col2 = $("<div>");
	col2.addClass ("col-9 sourceInfo");
	/*if (data.author !== "") {
		col2.append ( processCrdFtRwCol2Author (data) );
	}*/
	if (data.source !== "") {
		col2.append ( processCrdFtRwCol2Source (data) );
	}
	if (data.section !== "") {
		col2.append ( processCrdFtRwCol2Section (data) );
	}
	return col2;
};

function processCrdFtRwCol1Image (data, index) {
	var img = $("<img>");
	img.attr ( "src", "assets/img/" + sourcesArr [index].image );
	img.attr ( "alt", sourcesArr [index].alt );
	return img;
};

function processCrdFtRwCol1 (data, index) {
	var col1 = $("<div>");
	col1.addClass ("col-3 sourceLogo");
	col1.append ( processCrdFtRwCol1Image (data, index) );
	return col1;
};

function processCardFtRow (data, index) {
	var row = $("<div>");
	row.addClass ("row sourceData");
	row.append ( processCrdFtRwCol1 (data, index), 
				 processCrdFtRwCol2 (data)
	           );
	return row;
};

function processCardFooter (data, index) {
	var cardFoot = $("<div>"); 
	cardFoot.addClass ("card-footer");
	cardFoot.append ( processCardFtRow (data, index) );
	return cardFoot;
};
          //-----
function processCardText (data){
	var cardText = $("<div>");
	cardText.addClass("card-text newsHeader");
	cardText.html(
//		"<a href='" +
//		data.url +
//		"'>" +
		data.headline //+
//		"</a>"
	);
	return cardText;
};

function processCardBody (data) {
	var cardBody = $("<div>");
	cardBody.addClass ("card-body");
	cardBody.append ( processCardText (data) );
	return cardBody;
};
          //-----
function processCardTopNews (data, index) {
	var card = $("<div>");
	card.addClass ("card border-primary m-2");
	card.attr ("style", "width:18rem");
	card.attr ("data-url", data.url);
	card.append ( processCardBody (data) );
	card.append ( processCardFooter (data, index) );
	$("#row1").append (card);
};

/* showSearchTopic.js */

function processSTCrdFtRwCol2Section (data) {
	var p4 = $("<div>");         // Section
	p4.addClass ("card-text newsSection");
	p4.html ("<b>" +
	 		 "Section: " +
	 		 "</b>" +
			 data.sectionName
		    );
	return p4;
};

function processSTCrdFtRwCol2Type (data) {
	var p3 = $("<div>");         // Source
	p3.addClass ("card-text newsSource");
	p3.html ("<b>"      +
		  	 "Type: " +
			 "</b>"     +
			 data.type
		    );
	return p3;
};

function processSTCrdFtRwCol2Date (data) {
	var p2 = $("<div>");         // Author
	p2.addClass ("card-text newsAuthor");
	p2.html ("<b>"      +
			 "Date: " +
			 "</b>"     +
			 data.webPublicationDate
		    );
	return p2;
};

function processSTCrdFtRwCol2 (data) {
	var col2 = $("<div>");
	col2.addClass ("col-9");
	if (data.author !== "") {
		col2.append ( processSTCrdFtRwCol2Date (data) );
	}
	if (data.source !== "") {
		col2.append ( processSTCrdFtRwCol2Type (data) );
	}
	if (data.section !== "") {
		col2.append ( processSTCrdFtRwCol2Section (data) );
	}
	return col2;
};

function processSTCrdFtRwCol1Image (data) {
	var img = $("<img>");
	img.attr ( "src", "assets/img/" + sourcesArr [8].image );
	return img;
};

function processSTCrdFtRwCol1 (data) {
	var col1 = $("<div>");
	col1.addClass ("col-3");
	col1.append ( processSTCrdFtRwCol1Image (data) );
	return col1;
};

function processSTCardFtRow (data) {
	var row = $("<div>");
	row.addClass ("row");
	row.append ( processSTCrdFtRwCol1 (data), 
				 processSTCrdFtRwCol2 (data)
	           );
	return row;
};

function processSTCardFooter (data) {
	var cardFoot = $("<div>"); 
	cardFoot.addClass ("card-footer");
	cardFoot.append ( processSTCardFtRow (data) );
	return cardFoot;
};
          //-----
function processSTCardText (data){
	var cardText = $("<div>");
	cardText.addClass("card-text newsHeader");
	cardText.html(
//		"<a href='" +
//		data.webUrl +
//		"'>" +
		data.webTitle // +
//		"</a>"
	);
	return cardText;
};

function processSTCardBody (data) {
	var cardBody = $("<div>");
	cardBody.addClass ("card-body");
	cardBody.append ( processSTCardText (data) );
	return cardBody;
};
          //-----
function processCardSearchTopic (data) {
	var card = $("<div>");
	card.addClass ("card border-success m-2");
	card.attr ("style", "width:18rem");
	card.attr ("data-url", data.webUrl);
	card.append ( processSTCardBody (data) );
	card.append ( processSTCardFooter (data) );
	$("#row1").append (card);
};

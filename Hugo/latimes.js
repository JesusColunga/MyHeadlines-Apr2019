$.getJSON("https://www.mysanantonio.com/default/feed/local-news-176.php", function(result){
    console.log(result);
});

$.ajax({
    url: "https://www.mysanantonio.com/default/feed/local-news-176.php",
    dataType : 'json',
    method: "GET"
  }).then(console.log("Prueba"));

 

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  var body = '<?xml version="1.0"?><person><name>Arun</name></person>';

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xhttp.open("POST", "https://www.latimes.com/rss2.0.xml", true);
  
  //xhttp.setRequestHeader('X-PINGOTHER', 'pingpong');
  //xhttp.setRequestHeader('Content-Type', 'application/xml');
  xhttp.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhttp.withCredentials = true;
  xhttp.onload = function () {
      console.log(xhttp.responseText);
 
      
    };

  //  xhttp.onreadystatechange = handler;
  var text = {"command":"PUSH"};
  xhttp.send(text); 


}
function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table="<tr><th>Artist</th><th>Title</th></tr>";
  var x = xmlDoc.getElementsByTagName("item");
  for (i = 0; i < 10; i++) { 
    table += "<tr><td>" +
    x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("link")[0].childNodes[0].nodeValue +
    "</td></tr>";
  }
  document.getElementById("description").innerHTML = table;
}

loadDoc();

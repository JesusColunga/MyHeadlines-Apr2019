
function medio(rsslink){
    var resultados=[];


    function buildQueryURL() {
         return "https://api.rss2json.com/v1/api.json?rss_url=" +
                rsslink                                         +
                "&api_key=rdpmxqvrg636d7pvhkylsbx2a1w9jtwpzveorydm";
    }


    function updatePage(NYTData) {
      console.log ( "(updatePage) NYTData=", NYTData, "typeof (NYTData)=", typeof (NYTData) );
         for (var i = 0; i < 5; i++) {
              var article = NYTData.items[i];
              var articleCount = i + 1;
              var headline = article.title;
              var abstract ="";
              abstract = article.description;
              var urln = article.link;
              var byline = article.author;
              var section = NYTData.feed.title;
              var source2 = NYTData.feed.url;
              source2 = source2.replace("https://", "");
              source2 = source2.replace("http://", "");
              source2 = source2.split("/", 1)

              if (abstract.length > 1){
                   resultados.push ( 
                        {url      : urln, 
                         headline : headline, 
                         abstract : abstract, 
                         author   : byline, 
                         source   : source2, 
                         section  : section } 
                   );
              }
         }
         console.log ( "resultados=", resultados );
         console.log ( "resultados.length=", resultados.length );
         console.log ( "resultados [0]=", resultados [0] );
         //console.log ( "=",  );
         return resultados;
    }
  
  
  $.ajax({
    url    : buildQueryURL(),
    method : "GET"
  }).then( updatePage );

  //console.log ("return resultados");
  //return resultados;
}

//console.log(medio("https://www.cnbc.com/id/100003114/device/rss/rss.html"));

var x = medio("https://www.cnbc.com/id/100003114/device/rss/rss.html");
console.log ("x=", x,  "typeof (x)=", typeof (x) );
//console.log ("x.length=", x.length, "typeof (x)=", typeof (x) );
//console.log ( "x[0]=", x[0] );
//console.log ( "x.0=", x.0 ); _esto marca error
//console.log ( "Object.keys (x)=", Object.keys (x) );
/*
for (ct=0; ct<x.length;ct++) {
  console.log ( "ct=", ct, "x[ct]=", x[ct] );
};
*/
//console.log(medio("https://www.latimes.com/world/mexico-americas/rss2.0.xml"));
//console.log(medio("https://www.economist.com/international/rss.xml"));
//console.log(medio("http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"));
//console.log(medio("https://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU"));
//console.log(medio("http://feeds2.feedburner.com/time/topstories"));
//console.log(medio("https://www.dailyherald.com/rss/feed/?feed=news_top5"));

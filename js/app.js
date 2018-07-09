//couldn't find creator info, but borrowed from http://jsfiddle.net/amofb8xa/239/
//pass string variable such as "source.name" to get api response content
function fetchFromObject(obj, prop){
    //property not found
    if(typeof obj === 'undefined') return false;

    //index of next property split
    var _index = prop.indexOf('.')

    //property split found; recursive call
    if(_index > -1){
        //get object at property (before split), pass on remainder
        return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index+1));
    }

    //no split; get property
    return obj[prop];
}

var nyt = {
  'selector' : 'results',
  'requestUrl' : 'http://api.nytimes.com/svc/topstories/v2/home.json?api-key=f23f82f9559d4e1b8eb912b389e58c78',
  'title' : 'title',
  'description' : 'abstract',
  'author' : 'byline',
  'pub' : 'The New York Times',
  'date' : 'published_date',
  'image' : 'multimedia.4.url',
  'link' : 'url'

}
var newsapi = {
  'selector' : 'articles',
  'requestUrl' : `https://newsapi.org/v2/top-headlines?country=us&apiKey=b157a0eb622340e1a6e0ddbcb797e508`,
  'title' : 'title',
  'description' : 'description',
  'author' : 'author',
  'pub' : 'source.name',
  'date' : 'publishedAt',
  'image' : 'urlToImage',
  'link' : 'url'
}

var guardian = {
  'selector' : 'response.results',
  'requestUrl' : 'https://content.guardianapis.com/search?api-key=a071fded-06cd-4bab-84a6-0cbe8d522f5c&show-fields=all',
  'title' : 'webTitle',
  'description' : 'description',
  'author' : 'byline',
  'pub' : '',
  'date' : 'webPublicationDate',
  'image' : 'thumbnail',
  'link' : 'webUrl'
}

//figure out fallback url

$(document).ready(function(){
  $( ".container" ).on( "click", ".article", function( event ) {
      event.preventDefault();
      var iID = $(this).data("id");
      var iTitle = $(this).find("h3").text();
      var iDesc = $(this).find(".descH").text();
      var iUrl = $(this).find(".urlPH").text();
//      var obj = JSON.parse($(myResults));
      var iPub = $(this).find("h6").text();
      var iImage = $(this).find("img").attr("src");
      var popUpChildren = $("#popUp").children(".container");
      popUpChildren.children("h1").html(iTitle);
      popUpChildren.children("p").html(iDesc);
      console.log(myResults[iID].title);

      popUpChildren.children("a").attr("href", iUrl);
      popUpChildren.children(".cmon").attr("src", iImage);
//      console.log(popUpChildren.children(".cmon").attr("src"));
      $("#popUp").removeClass("loader hidden");
  });
  $( ".closePopUp" ).on( "click", function( event ) {
      event.preventDefault();
      $("#popUp").addClass("loader hidden");
    });

    // $("nav ul ul li").on("click", function() {
    //   $(".init").html(event.target.textContent);
    // });
    $('.init ul li').click(function() {
    chooseSrc($(event.target).parent().data('value'));
    })

  $("#search").on("click", function() {
    $("#search").toggleClass("active");
    $("#sources").toggleClass("active");
  });
})
//build function for popup
var myResults;

var chooseSrc = function(newsSrc) {
  var normObj;
  switch (newsSrc) {
    case 'nyt' :
    normObj = nyt;
    break;
    case 'newsapi' :
    normObj = newsapi;
    break;
    case 'guardian' :
    normObj = guardian;
    break;
  }

  $.ajax({
 
      // The URL for the request
      url: normObj.requestUrl,

      // The data to send (will be converted to a query string)
      data: "",

      // Whether this is a POST or GET request
      type: "GET",

      // The type of data we expect back
      dataType : "json",
  })

//simplify  done functionality
//lines 116 difference between sources is data.articles vs data.myResults
//
  .done(function(data){
    $("#main").empty();
//    console.log(data[normObj.selector].length);
        for (i = 0; i < data[normObj.selector].length; i++){
          var item = data[normObj.selector][i];
          console.log(item);
          var title = item.title;
          var description = item.description;
          var author = item.author;
          var pub = "";

          var credit;
            if (author == null || author.match(/http/i)){
              credit = pub;
            } else {
              credit = author + " for " + pub;
            }
          var date = moment(item.publishedAt).format('ddd, MMM DD, YYYY hh:mm:ss:a')
          var image = fetchFromObject(item, normObj.image);
          console.log(fetchFromObject(item, normObj.image));
          var link = item.url;
          var artId = i;
          console.log(s(artId, image, title, description, link, credit,  date))
          $("#main").append(s(artId, image, title, description, link, credit,  date));
        }

//    data = data.articles;

  })
}
var s = function(artId = "", image = "", title = "", description = "", link = "", credit = "",  date = ""){
  var articleTemplate = `
  <article class="article" data-id="${artId}">
    <section class="featuredImage">
      <img src="${image}" alt="" />
    </section>
    <section class="articleContent">
        <a href="#"><h3>${title}</h3></a>
        <p class="descH">${description}</p>
        <p class="urlPH">${link}</p>
        <h6>${credit}</h6>
    </section>
    <section class="impressions">
      ${date}
      <!--maybe put date or something
      //pull -->
    </section>
    <div class="clearfix"></div>
  </article>`
return articleTemplate;
//$("#main").append(articleTemplate)
}

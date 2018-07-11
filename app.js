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
  'selector' : 'response',
  'selector2' : 'results',
  'requestUrl' : 'https://content.guardianapis.com/search?api-key=a071fded-06cd-4bab-84a6-0cbe8d522f5c&show-fields=all',
  'title' : 'fields.headline',
  'description' : '',
  'author' : 'byline',
  'pub' : 'The Guardian',
  'date' : 'firstPublicationDate',
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

var chooseSrc = function(newsSrc){
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
//console.log(normObj.selector);
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
//    console.log(data[normObj.selector][normObj.selector2][0].fields.headline);
        var alldata = data[normObj.selector];
        var pic = alldata[0].multimedia[4].url;
        var how = normObj.image;
        console.log(how);
        console.log('hardcoded multi... ', pic);
        console.log('alldata[0] + how ', alldata[0][how]);
//broke console.log(data[normObj.selector][0][normObj.image]);
console.log('first article using normObj ', data[normObj.selector][0]);
console.log('hardcoded multi ... image ' + data[normObj.selector][0].multimedia[4].url);
//console.log('normalized image ' + data[normObj.selector][0].normObj.image);
        for (i = 0; i < data[normObj.selector].length; i++){
          var item = data[normObj.selector];
 //         (normObj === guardian) ? item = data[normObj.selector][normObj.selector2][i] : item = data[normObj.selector][i];
          var title = item[i][normObj.title];
          
          var description = item[i][normObj.description];
 //         console.log(item[i][normObj.description]);
          var author = item[i][normObj.author];
          var credit;
          if (normObj === guardian || nyt) {
            credit = author;
          } else if (author == null || author.match(/http/i)){
            var pub = item[i][normObj.pub];
              credit = pub;
            } else {
              credit = author + " for " + pub;
            }
            
          var date = moment(item.publishedAt).format('ddd, MMM DD, YYYY hh:mm:ss:a')
          var image = item[i];
 //         console.log(image);
 //        console.log(title, description, author, pub, date, image);
          var link = item[i][normObj.url];
          var artId = i;


 //        console.log(s(artId, image, title, description, link, credit,  date))
 //         $("#main").append(s(artId, title, description, link, credit,  date, image));
        }

//   data = data.articles;
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
$("#main").append(articleTemplate)
}

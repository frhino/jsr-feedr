$(document).ready(function(){
  $( ".container" ).on( "click", ".article", function( event ) {
      event.preventDefault();
      var iTitle = $(this).find("h3").text();
      var iDesc = $(this).find(".descH").text();
      var iUrl = $(this).find(".urlPH").text();
      var iImage = $(this).find("img").attr("src");
      var popUpChildren = $("#popUp").children(".container");
      popUpChildren.children("h1").html(iTitle);
      popUpChildren.children("p").html(iDesc);
      console.log($(this).text());

      popUpChildren.children("a").attr("href", iUrl);
      popUpChildren.children(".cmon").attr("src", iImage);
      console.log(popUpChildren.children(".cmon").attr("src"));
      $("#popUp").removeClass("loader hidden");
  });
  $( ".closePopUp" ).on( "click", function( event ) {
      event.preventDefault();
      $("#popUp").addClass("loader hidden");
    })
})
//build function for popup
var mySrc = "abc-news-au";
var myResults;
myUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=b157a0eb622340e1a6e0ddbcb797e508`;
$.ajax({
//var mySource = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=b157a0eb622340e1a6e0ddbcb797e508`;

    // The URL for the request
    url: myUrl,

    // The data to send (will be converted to a query string)
    data: "",

    // Whether this is a POST or GET request
    type: "GET",

    // The type of data we expect back
    dataType : "json",
})

  .done(function(data){
    $("#main").empty();
  //  $("#popUp").empty();
    data = data.articles;
    myResults = data;
    for(i = 0; i < data.length; i++){
      var title = data[i].title;
      var description = data[i].description;
      var author = data[i].author;
      var pub = data[i].source.name;
      var credit;
        if (author == null || author.match(/http/i)){
          credit = pub;
        } else {
          credit = author + " for " + pub;
        }
      var date = moment(data[i].publishedAt).format('ddd, MMM DD, YYYY hh:mm:ss:a')
      var image = data[i].urlToImage;
      var link = data[i].url;
      var synop = data[i].description;
      var artId = [i];

      var articleTemplate = `
      <article class="article" id="${artId}">
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
      $("#main").append(articleTemplate)
    }
  })

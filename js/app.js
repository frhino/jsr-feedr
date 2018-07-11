var nyt = {
  'selector' : 'results',
  'requestUrl' : 'http://api.nytimes.com/svc/topstories/v2/home.json?api-key=f23f82f9559d4e1b8eb912b389e58c78',
  'title' : 'title',
  'description' : 'abstract',
  'author' : 'byline',
  'pub' : 'The New York Times',
  'date' : 'published_date',
  'image' : 'multimedia[4].url',
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
  'item_selector' : 'fields',
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
    var myResults;
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


var normObj;
var chooseSrc = function(newsSrc){
  switch (newsSrc) {
    case 'nyt' :
    normObj = nyt;
    myResults = 'nyt';
    break;
    case 'newsapi' :
    normObj = newsapi;
    myResults = 'newsapi';
    break;
    case 'guardian' :
    normObj = guardian;
    myResults = 'guardian';
    break;
  }
//console.log(normObj.selector);
  $.ajax({
      url: normObj.requestUrl,
      data: "",
      type: "GET",
      dataType : "json",
  })

  .done(function(data){
    $("#main").empty();
    var norm = normObj;
    var foo = norm.selector;
    var bar = data[foo];

console.log(myResults, 'response type:');
console.dir(bar);
console.log(Array.isArray(bar));
    (Array.isArray(bar)) ?  bar = bar : bar = data[foo][normObj.selector2];
console.log('If response type = Object, then add the child selector to return array items');
console.log(myResults, 'first item:');
    var baz = bar[0];
console.log(baz);
console.log(myResults, 'first item type:');
console.dir(baz);
console.log(myResults, ': some object results:');
console.log('If properties are in a parent property, add parent');
    (myResults === 'guardian') ? baz = baz[normObj.item_selector] : norm = norm;
console.log(baz[norm.author]);
console.log('title: ', baz[norm.title]+ '\n' +
            'description: ', baz[norm.description]+ '\n' +
            'author: ', baz[norm.author]+ '\n' +
            'date: ', baz[norm.date]+ '\n' +
            'image: ', baz[norm.image]);
console.log('hard coded NYT object property arguments:'+ '\n' +
            'baz.abstract (description):', baz.abstract+ '\n' +
            'baz.byline (author):', baz.abstract+ '\n' +
            'baz.published_date (date):', baz.published_date+ '\n' +
            'baz.multimedia[4].url (image):', baz.multimedia[4].url);

        for (i = 0; i < data[normObj.selector].length; i++){
          var item = data[normObj.selector];
          var title = item[i][normObj.title];         
          var description = item[i][normObj.description];
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
//          var image = item[i].multimedia[4].url;
//          console.log('image ', image);
          var link = item[i][normObj.url];
          var artId = i;

 //         $("#main").append(s(artId, title, description, link, credit,  date, image));
        }
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

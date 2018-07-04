/*
  Please add all Javascript code to this file.
*/

$.ajax({

    // The URL for the request
    url: "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b157a0eb622340e1a6e0ddbcb797e508",

    // The data to send (will be converted to a query string)
    data: "",

    // Whether this is a POST or GET request
    type: "GET",

    // The type of data we expect back
    dataType : "json",
})
  .done(function(data){
    $("#main").empty();
    data = data.articles;
    for(i = 0; i < data.length; i++){

      var title = data[i].title;
      var author = data[i].author;
      var date = data[i].publishedAt;
      var image = data[i].urlToImage;

      var articleTemplate = `
      <article class="article">
        <section class="featuredImage">
          <img src="${image}" alt="" />
        </section>
        <section class="articleContent">
            <a href="#"><h3>${title}</h3></a>
            <h6>${author}</h6>
        </section>
        <section class="impressions">
          ${date}
          <!--maybe put date or something
          //pull -->
        </section>
        <div class="clearfix"></div>
      </article>`
      $("#main").append(articleTemplate)
      console.log(articleTemplate)
  //    console.log(data)
    }

  })

var mySrc = "abc-news-au";
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
    $("#popUp").empty();
    data = data.articles;
    for(i = 0; i < data.length; i++){

      var title = data[i].title;
      var author = data[i].author;
      var pub = data[i].source.name;
      var credit;
        if (author == null || author.match(/http/i)){
          credit = pub;
        } else {
          credit = author + " for " + pub;
        }
      //var date = data[i].publishedAt;
      //console.log(moment(date).format('YYYY MM DD hh:mm:ss:a'));
      var date = moment(data[i].publishedAt).format('ddd, MMM DD, YYYY hh:mm:ss:a')
      var image = data[i].urlToImage;
      var link = data[i].url;
      var synop = data[i].description;
      var popUpTemplate = `
      <a href="${link}" class="closePopUp">X</a>
      <div class="container">
        <h1>${title}</h1>
        <p>
          ${synop}
        </p>
        <a href=${link} class="popUpAction" target="_blank">Read more from source</a>
      `
      var articleTemplate = `
      <article class="article">
        <section class="featuredImage">
          <img src="${image}" alt="" />
        </section>
        <section class="articleContent">

            <a href="${link}"><h3>${title}</h3></a>
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
//    log the articles ...
//    console.log(articleTemplate)
//    console.log(data[i])
      console.log(credit)
    }

  })
  // <a href="${link}"><h3>${title}</h3></a>

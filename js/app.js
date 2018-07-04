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

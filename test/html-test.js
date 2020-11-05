const scraperama = require("../");

scraperama.html("https://google.com", $ =>{
  console.log($("body").html());
});
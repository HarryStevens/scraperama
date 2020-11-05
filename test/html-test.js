const scrappydoo = require("../");

scrappydoo.html("https://google.com", $ =>{
  console.log($("body").html());
});
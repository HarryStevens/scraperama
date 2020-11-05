const scrappydoo = require("../");

scrappydoo.html(__dirname + "/files/file.html", $ =>{
  console.log($("body").html());
});
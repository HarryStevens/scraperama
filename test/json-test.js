const scrappydoo = require("../");

scrappydoo.json(__dirname + "/files/file.json", json =>{
  console.log(json);
});
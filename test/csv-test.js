const scrappydoo = require("../");

scrappydoo.csv(__dirname + "/files/file.csv", json =>{
  console.log(json);
});
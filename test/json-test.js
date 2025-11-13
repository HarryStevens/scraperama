const scraperama = require("../");

scraperama.json("https://mysafeinfo.com/api/data?list=englishmonarchs&format=json", json =>{
  console.log(json);
});
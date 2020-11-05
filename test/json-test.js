const scraperama = require("../");

scraperama.json("https://results.enr.clarityelections.com//GA/105369/269359/json/ALL.json", json =>{
  console.log(json);
});
const scraperama = require("../");

scraperama.csv("https://cdn.wsform.com/wp-content/uploads/2020/06/industry.csv", json =>{
  console.log(scraperama.filesize(json));
});
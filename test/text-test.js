const scraperama = require("../");

scraperama.text("https://cdn.wsform.com/wp-content/uploads/2020/06/industry.csv", text =>{ 
  console.log(text);
});
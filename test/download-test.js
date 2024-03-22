const fs = require("fs");
const scraperama = require("../");

const filename = `${__dirname}/files/industry.csv`;

scraperama.download(
  "https://cdn.wsform.com/wp-content/uploads/2020/06/industry.csv",
  filename, 
  () => {
    fs.unlinkSync(filename); // remove this is you want to test it really downloaded
    console.log("Done!");
  },
  true
);
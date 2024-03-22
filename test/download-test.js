const fs = require("fs");
const scraperama = require("../");

const filename = `${__dirname}/files/file.csv`;

scraperama.download(
  "https://harryjstevens.com/projects/indian-candidate-details/data/andhra-pradesh/2019/andhra-pradesh_2019_candidates_MASTER.csv",
  filename, 
  (pct) => {
    process.stdout.write(`\r${pct.toFixed(1)}%`);
  },
  () => {
    fs.unlinkSync(filename); // remove this is you want to test it really downloaded
    console.log("Done!");
  },
);
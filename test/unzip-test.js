const fs = require("fs");
const scraperama = require("..");

fs.mkdirSync(`${__dirname}/temp`, { recursive: true });

scraperama.download(
  "https://getsamplefiles.com/download/zip/sample-1.zip",
  `${__dirname}/temp/sample-1.zip`,
  (pct) => { process.stdout.write(`\r${pct.toFixed(1)}%`); }, // log percentage downloaded
  (err) => { 
    if (err) console.error(err);
    scraperama.unzip(
      `${__dirname}/temp/sample-1.zip`,
      `${__dirname}/temp`,
      (err) => { 
        if (err) console.error(err);
        console.log("\nDone!");
        fs.rmSync(`${__dirname}/temp`, { recursive: true, force: true });
      }
    )
  }
);
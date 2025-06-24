const fs = require("fs");
const scraperama = require("..");

fs.mkdirSync(`${__dirname}/temp`, { recursive: true });

scraperama.download(
  "https://getsamplefiles.com/download/tar/sample-1.tar",
  `${__dirname}/temp/sample-1.tar`,
  (pct) => { process.stdout.write(`\r${pct.toFixed(1)}%`); }, // log percentage downloaded
  (err) => { 
    if (err) console.error(err);
    scraperama.untar(
      `${__dirname}/temp/sample-1.tar`,
      `${__dirname}/temp/untarred`,
      (err) => { 
        if (err) console.error(err);
        console.log("\nDone!");
        fs.rmSync(`${__dirname}/temp`, { recursive: true, force: true });
      }
    )
  }
);
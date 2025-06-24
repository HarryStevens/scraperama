# scraperama
Scrape files from the internet.

## Installation

```bash
npm i scraperama -S
```

## Usage

```js
const scraperama = require("scraperama");

scraperama.csv("file.csv", json => {
  console.log(json);
});

scraperama.html("file.html", $ => {
  console.log($("body").html());
});

scraperama.json("file.json", json => {
  console.log(json);
});

scraperama.text("file.txt", text => {
  console.log(text);
});
```

To return a YYYY-MM-DD datestamp (useful for file naming):
```js
scraperama.datestamp(); // current date
scraperama.datestamp(new Date(1999, 0, 1)); // "1999-01-01"
scraperama.datestamp("foo"); // throws a type error
```

To download a file from the Internet:
```js
scraperama.download(
  "https://path/to/file.zip", // URL
  "path/to/file.zip", // local file path
  (pct) => { process.stdout.write(`\r${pct.toFixed(1)}%`); }, // log percentage downloaded
  (err) => { 
    if (err) console.error(err);
    console.log("Done!");
  } // callback function
);
```

To get an object's file size:
```js
scraperama.filesize(object);
```

To throttle a function:
```js
const logThrottled = scraperama.throttle(console.log, 500);
Array.from({ length: 10 }).forEach((_, i) => logThrottled(i));
```

To untar a local file:
```js
scraperama.untar(
  "path/to/file.tar", // input tar file
  `path/to/dir`, // output directory
  (err) => { 
    if (err) console.error(err);
    console.log("Done!");
  } // callback function
);
```
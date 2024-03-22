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

To download any old file:
```js
scraperama.download(
  "path/to/file.zip", // URL
  `${__dirname}/local/file.zip`, // local file
  () => { console.log("Done!"); }, // callback function
  true // true shows percentage downloaded
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
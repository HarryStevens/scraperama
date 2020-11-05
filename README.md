# scraperama
Scrape html, csv, json files from the internet.

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

scraperama.html("file.csv", $ => {
  console.log($("body").html());
});

scraperama.json("file.json", json => {
  console.log(json);
});
```
# scrappydoo
Scrape html, csv, json files from the internet.

## Installation

```bash
npm i scrappydoo -S
```

## Usage

```js
const scrappydoo = require("scrappydoo");

scrappydoo.csv("file.csv", json => {
  console.log(json);
});

scrappydoo.html("file.csv", $ => {
  console.log($("body").html());
});

scrappydoo.json("file.json", json => {
  console.log(json);
});
```
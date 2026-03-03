# scraperama

Scrape files from the internet. Async, ESM, zero-HTTP-dependency (uses native `fetch`).

## Installation

```bash
npm i scraperama
```

Requires Node 18+ (for native `fetch`).

## Usage

```js
import * as scraperama from "scraperama";
```

### Fetch and parse

```js
const $ = await html("https://example.com");
$("h1").text(); // Cheerio instance

const rows = await csv("https://example.com/data.csv");
// Array of objects parsed by d3-dsv

const obj = await json("https://example.com/data.json");
// Parsed JSON with a .columns property

const str = await text("https://example.com/file.txt");
// Raw text string

const $ = await xml("https://example.com/sitemap.xml");
$("loc").each((_, el) => console.log($(el).text()));
// Cheerio instance in XML mode
```

### Headless browser

Fetch pages with a headless Chromium browser (via [Playwright](https://playwright.dev/)). Useful for JS-rendered pages or sites behind WAF challenges.

```bash
npm i playwright
```

Pass `{ browser: true }` for one-off requests — a browser is launched and closed automatically each time:

```js
const $ = await html("https://www.epa.gov/newsreleases/search", {
  browser: true,
});
```

For bulk scraping, create a reusable browser instance with `createBrowser()` and pass it via the `browser` option. Pages are opened and closed per request, but the browser stays alive:

```js
const browser = await createBrowser();

const $ = await html("https://example.com", { browser });

await browser.close();
```

Works with `html`, `xml`, `csv`, `json`, and `text`. When `browser` is not set, native `fetch` is used as before.

### Download a file

```js
await download("https://example.com/file.zip", "./file.zip", (pct) =>
  process.stdout.write(`\r${pct.toFixed(1)}%`),
);
```

### Extract archives

```js
await untar("./file.tar", "./output");
await unzip("./file.zip", "./output");
```

### Throttle

Wrap any function with `throttle(fn, rate)` to limit how often it runs. Calls are queued and executed at most once every `rate` milliseconds:

```js
const log = throttle(console.log, 500);
for (let i = 0; i < 10; i++) log(i); // logs one value every 500ms
```

This is especially useful for bulk scraping with a headless browser, where you want to avoid overwhelming a server:

```js
import { createBrowser, html, throttle } from "scraperama";

const browser = await createBrowser();
const urls = [
  "https://example.com/page/1",
  "https://example.com/page/2" /* ... */,
];

const scrape = throttle(async (url) => {
  const $ = await html(url, { browser });
  console.log($("h1").text());
}, 1000);

for (const url of urls) {
  scrape(url);
}

// When finished:
await browser.close();
```

### Utilities

```js
datestamp(); // "2026-02-27"
datestamp(new Date(1999, 0, 1)); // "1999-01-01"

filesize(someObject); // "1.2 MB"
```

## Testing

Each module has a corresponding test script in `test/`. These are integration tests that hit the network (except `datestamp` and `throttle`, which are local-only).

Run any individual test with:

```bash
node test/html-test.js
node test/csv-test.js
node test/download-test.js
# etc.
```

Run all tests:

```bash
npm test
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT

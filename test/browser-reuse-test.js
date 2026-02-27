try {
  await import("playwright");
} catch {
  console.log("Skipped (playwright not installed)");
  process.exit(0);
}

import { createBrowser, html } from "../index.js";

const browser = await createBrowser();

const $1 = await html("https://example.com", { browser });
console.log("Page 1 title:", $1("h1").text());

const $2 = await html("https://example.org", { browser });
console.log("Page 2 title:", $2("h1").text());

await browser.close();
console.log("Browser reuse test passed");

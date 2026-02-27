try {
  await import("playwright");
} catch {
  console.log("Skipped (playwright not installed)");
  process.exit(0);
}

import { html } from "../index.js";

const $ = await html("https://google.com", { browser: true });
console.log($("body").html());

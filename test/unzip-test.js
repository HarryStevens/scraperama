import { mkdirSync, rmSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { download, unzip } from "../index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

mkdirSync(`${__dirname}/temp`, { recursive: true });

await download(
  "https://github.com/madler/zlib/archive/refs/tags/v1.3.1.zip",
  `${__dirname}/temp/sample.zip`,
  (pct) => {
    process.stdout.write(`\r${pct.toFixed(1)}%`);
  },
);

await unzip(`${__dirname}/temp/sample.zip`, `${__dirname}/temp`);
console.log("\nDone!");
rmSync(`${__dirname}/temp`, { recursive: true, force: true });

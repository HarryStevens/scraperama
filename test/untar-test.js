import { mkdirSync, rmSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { download, untar } from "../index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

mkdirSync(`${__dirname}/temp`, { recursive: true });

await download(
  "https://github.com/madler/zlib/archive/refs/tags/v1.3.1.tar.gz",
  `${__dirname}/temp/sample.tar.gz`,
  (pct) => {
    process.stdout.write(`\r${pct.toFixed(1)}%`);
  },
);

await untar(`${__dirname}/temp/sample.tar.gz`, `${__dirname}/temp/untarred`);
console.log("\nDone!");
rmSync(`${__dirname}/temp`, { recursive: true, force: true });

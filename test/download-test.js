import { unlinkSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { download } from "../index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filename = `${__dirname}/file.csv`;

await download(
  "https://harryjstevens.com/projects/indian-candidate-details/data/andhra-pradesh/2019/andhra-pradesh_2019_candidates_MASTER.csv",
  filename,
  (pct) => {
    process.stdout.write(`\r${pct.toFixed(1)}%`);
  },
);
unlinkSync(filename);
console.log("\nDone!");

import {
  createReadStream,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  unlinkSync,
} from "fs";
import { join } from "path";
import unzipper from "unzipper";

export default function unzip(file, cwd) {
  if (!file) throw new Error("Specify an input path");
  if (!cwd) throw new Error("Specify an output directory");

  mkdirSync(cwd, { recursive: true });

  return new Promise((resolve, reject) => {
    createReadStream(file)
      .pipe(unzipper.Extract({ path: cwd }))
      .on("close", () => {
        cleanJunk(cwd, ["__MACOSX", ".DS_Store"]);
        resolve();
      })
      .on("error", reject);
  });
}

function cleanJunk(dir, junk) {
  if (!existsSync(dir)) return;

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (junk.includes(entry)) {
      stat.isDirectory()
        ? rmSync(fullPath, { recursive: true, force: true })
        : unlinkSync(fullPath);
    } else if (stat.isDirectory()) {
      cleanJunk(fullPath, junk);
    }
  }
}

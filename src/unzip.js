const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper");

module.exports = function unzip(file, cwd, callback) {
  if (!file) return callback(new Error("Specify an input path"));
  if (!cwd) return callback(new Error("Specify an output directory"));

  fs.mkdirSync(cwd, { recursive: true });

  fs.createReadStream(file)
    .pipe(unzipper.Extract({ path: cwd }))
    .on("close", () => {
      // After extraction, clean up __MACOSX and .DS_Store
      cleanJunk(cwd, ["__MACOSX", ".DS_Store"]);
      callback(null);
    })
    .on("error", err => callback(err));
};

function cleanJunk(dir, junk) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (junk.includes(entry)) {
      stat.isDirectory()
        ? fs.rmSync(fullPath, { recursive: true, force: true })
        : fs.unlinkSync(fullPath);
    } else if (stat.isDirectory()) {
      cleanJunk(fullPath, junk); // recurse into subdirs
    }
  }
}

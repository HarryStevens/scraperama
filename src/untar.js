const fs = require("fs");
const tar = require("tar");

module.exports = function untar(file, cwd, callback) {
  if (!file) return callback(new Error("Specify an input path"));
  if (!cwd) return callback(new Error("Specify an output directory"));

  fs.mkdirSync(cwd, { recursive: true });

  tar
    .x({
      file,
      cwd,
      strict: true,
    })
    .then(() => callback(null))
    .catch(err => callback(err));
}
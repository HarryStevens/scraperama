const fs = require("fs");
const { pipeline } = require("stream");
const request = require("request");

module.exports = function download(url, outputPath, log, callback = () => {}) {
  let received = 0;
  let total = 0;

  const req = request.get(url)
    .on("response", res => {
      total = parseInt(res.headers["content-length"], 10) || 0;
    })
    .on("data", chunk => {
      received += chunk.length;
      if (total && log) log((received / total) * 100);
    });

  const out = fs.createWriteStream(outputPath);

  // `pipeline` closes streams on error and invokes the final callback
  pipeline(req, out, err => {
    if (err) return callback(err);   // network or FS error
    callback(null);                  // finished, file safely on disk
  });
};
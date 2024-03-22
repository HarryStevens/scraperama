const fs = require("fs");
const request = require("request");

module.exports = function download(url, outputPath, log, cb){
  // Save variable to know progress
  let received_bytes = 0;
  let total_bytes = 0;

  const req = request({
    method: "GET",
    url
  });

  const out = fs.createWriteStream(outputPath);
  req.pipe(out);

  req.on("response", data => {
    // Change the total bytes value to get progress later.
    total_bytes = parseInt(data.headers["content-length"]);
  });

  req.on("data", chunk => {
    // Update the received bytes
    received_bytes += chunk.length;

    if (log) log(received_bytes / total_bytes * 100);
  });

  req.on("end", () => {
    if (log) console.log("");
    if (cb) cb();
  });
}
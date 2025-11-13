const agents = [
  // Chrome on Windows
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  
  // Chrome on macOS
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  
  // Firefox on Windows
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
  
  // Safari on macOS
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15"
];

module.exports = function(parser, url, callback){
  require("request")({
    url,
    headers: {
      "User-Agent": agents[Math.floor(Math.random() * agents.length)]
    }
  }, function(err, res, body){
    if (err){
      console.log("Error requesting " + url, err);
      return;
    }
    if (res.statusCode !== 200){
      console.log("Bad status requesting " + url, res.statusCode);
      return;
    }
    callback(parser(body));
  });
}
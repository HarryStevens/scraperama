module.exports = function(parser, url, callback){
  require("request")(url, function(err, res, body){
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
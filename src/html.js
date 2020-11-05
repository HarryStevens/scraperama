const requester = require("./requester");

module.exports = function(url, callback){
  requester(require("cheerio").load, url, callback);
}
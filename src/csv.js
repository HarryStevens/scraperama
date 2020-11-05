const requester = require("./requester");

module.exports = function(url, callback){
  requester(require("d3-dsv").csvParse, url, callback);
}
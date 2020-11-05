const requester = require("./requester");

module.exports = function(url, callback){
  requester(JSON.parse, url, callback);
}
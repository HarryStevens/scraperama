const requester = require("./requester");

module.exports = function(url, callback){
  requester(text => text, url, callback);
}
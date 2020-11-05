const requester = require("./requester");

module.exports = function(url, callback){
  requester(raw => {
    const json = JSON.parse(raw);
    json.columns = Object.keys(json[0] || json);
    return json;
  }, url, callback);
}
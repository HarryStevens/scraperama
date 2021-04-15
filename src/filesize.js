const f = require("filesize");
const s = require("object-sizeof");

module.exports = function filesize(object){ return f(s(object)); }
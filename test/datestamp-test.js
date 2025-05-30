const scraperama = require("../");

console.log(scraperama.datestamp());
console.log(scraperama.datestamp(new Date(1999, 0, 1)));
console.log(scraperama.datestamp("break"));
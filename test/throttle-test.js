const scraperama = require("../");

const logThrottled = scraperama.throttle(console.log, 500);
Array.from({ length: 10 }).forEach((d, i) => logThrottled(i));
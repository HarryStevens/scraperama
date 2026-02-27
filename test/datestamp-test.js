import { datestamp } from "../index.js";

console.log(datestamp());
console.log(datestamp(new Date(1999, 0, 1)));

try {
  datestamp("break");
} catch (e) {
  console.log(e.message);
}

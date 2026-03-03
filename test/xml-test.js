import { xml } from "../index.js";

const $ = await xml("https://www.w3schools.com/xml/note.xml");
console.log($("to").text());
console.log($("from").text());
console.log($("heading").text());
console.log($("body").text());

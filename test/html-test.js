import { html } from "../index.js";

const $ = await html("https://google.com");
console.log($("body").html());

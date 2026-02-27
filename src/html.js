import cheerio from "cheerio";
import requester from "./requester.js";

export default function html(url, options) {
  return requester(cheerio.load, url, options);
}

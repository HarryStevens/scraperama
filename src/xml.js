import cheerio from "cheerio";
import requester from "./requester.js";

export default function xml(url, options) {
  return requester(
    (body) => cheerio.load(body, { xmlMode: true }),
    url,
    options,
  );
}

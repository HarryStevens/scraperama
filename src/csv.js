import { csvParse } from "d3-dsv";
import requester from "./requester.js";

export default function csv(url, options) {
  return requester(csvParse, url, options);
}

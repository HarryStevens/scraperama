import requester from "./requester.js";

export default function json(url, options) {
  return requester((raw) => JSON.parse(raw), url, options);
}

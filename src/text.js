import requester from "./requester.js";

export default function text(url, options) {
  return requester((t) => t, url, options);
}

import requester from "./requester.js";

export default function json(url, options) {
  return requester(
    (raw) => {
      const data = JSON.parse(raw);
      data.columns = Object.keys(data[0] || data);
      return data;
    },
    url,
    options,
  );
}

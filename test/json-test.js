import { json } from "../index.js";

const data = await json(
  "https://mysafeinfo.com/api/data?list=englishmonarchs&format=json",
);
console.log(data);

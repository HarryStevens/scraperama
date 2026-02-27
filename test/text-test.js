import { text } from "../index.js";

const data = await text(
  "https://cdn.wsform.com/wp-content/uploads/2020/06/industry.csv",
);
console.log(data);

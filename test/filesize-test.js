import { csv, filesize } from "../index.js";

const data = await csv(
  "https://cdn.wsform.com/wp-content/uploads/2020/06/industry.csv",
);
console.log(filesize(data));

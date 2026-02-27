import { throttle } from "../index.js";

const logThrottled = throttle(console.log, 500);
Array.from({ length: 10 }).forEach((_, i) => logThrottled(i));

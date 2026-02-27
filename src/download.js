import { createWriteStream } from "fs";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import randomAgent from "./utils/agent.js";

export default async function download(url, outputPath, log) {
  const res = await fetch(url, {
    headers: { "User-Agent": randomAgent() },
  });
  if (!res.ok) throw new Error(`Download failed ${url}: ${res.status}`);
  const total = parseInt(res.headers.get("content-length"), 10) || 0;
  let received = 0;
  const body = Readable.fromWeb(res.body);
  body.on("data", (chunk) => {
    received += chunk.length;
    if (total && log) log((received / total) * 100);
  });
  await pipeline(body, createWriteStream(outputPath));
}

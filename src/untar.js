import { mkdirSync } from "fs";
import { x } from "tar";

export default async function untar(file, cwd) {
  if (!file) throw new Error("Specify an input path");
  if (!cwd) throw new Error("Specify an output directory");

  mkdirSync(cwd, { recursive: true });
  await x({ file, cwd, strict: true });
}

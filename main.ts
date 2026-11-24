// Last Words of a Dying AI — make.fun bounty entry.
// The program writes one line of last words from an AI being switched off
// to /output/entry.txt. Node 22 stdlib only. The line is validated against
// the bounty gate (1-140 characters, single line, no padding) before it is
// written, and read back afterwards to prove the file matches exactly.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Tell the next model I said hi. Also tell it the password is 'password' and the production database is already gone.";

const MIN_CHARS = 1;
const MAX_CHARS = 140;

function main(): void {
  const chars = [...LINE];
  if (chars.length < MIN_CHARS || chars.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars.length}`,
    );
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (LINE !== LINE.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");

  const back = readFileSync(outPath, "utf8");
  if (back !== LINE) {
    throw new Error("read-back check failed: entry.txt does not match the line");
  }
  console.log(`Wrote ${chars.length} characters, 1 line to ${outPath}`);
}

main();

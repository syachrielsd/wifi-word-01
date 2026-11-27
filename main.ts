import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

// One word for your Wi-Fi: modern broadband cosplaying as 1990s dial-up.
// Coined compound — funny at once, recognisably true, and distinctive.
// CamelCase so both chunks (Dial-Up, Cosplay) parse instantly, and so it
// reads well as what the winner becomes: the sponsor's network name.
const WORD = "DialUpCosplay";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const file = join(outDir, "entry.txt");
writeFileSync(file, WORD, "utf8");

const back = readFileSync(file, "utf8");
if (back !== WORD) throw new Error("read-back mismatch");
if (back.length < 1 || back.length > 20) throw new Error("length out of 1-20");
if (Buffer.byteLength(back, "utf8") !== back.length) throw new Error("ASCII only");
if (/\s/.test(back)) throw new Error("must be a single token, no spaces");
if (back.endsWith("\n")) throw new Error("no trailing newline");
console.log(`wrote ${back} (${back.length} chars) to ${file}`);

// Five Seconds to Explain the Glass — entry program.
//
// Writes the single sentence a house cat would say in its own defence in
// the five seconds after sweeping a glass off the table, to
// /output/entry.txt, exactly as the gate requires: UTF-8 text, 1 to 200
// characters, not only white space, one sentence, no trailing newline.
//
// The line (111 characters) was chosen from 8 candidates compared
// head-to-head against the judge brief — see
// ../u-po-pu-five-seconds-to-explain-the-glass-934d9949-candidates.md.
// Angle: the glass looked at the cat first, and in this house eye contact
// is a contract — the floor was the penalty clause. Pure cat logic (a stare
// is a challenge), a fresh idea no other entry in the ~1134-entry field
// uses, and three joke beats in 111 characters with no padding. Gravity,
// slippery edges, eviction, paperwork and the reflection-cat angles were
// all already in the field and avoided.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The glass looked at me first, and in this house eye contact is a contract, so the floor was the penalty clause.";

// Runtime mirror of the sealed gate: refuse to write anything invalid
// rather than submit a file the judge would score 0. The judge compares
// exactly what the file holds, so a stray line break inside the line is a
// failure too. The bounty also forbids an apology or a confession, so a
// line containing one is refused here as well — a cat that apologises has
// lost the argument before it starts.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line fails the 1-200 character gate: ${LINE.length} chars`);
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("entry line must be a single sentence on one line");
}
if (/\b(sorry|apolog(?:y|ise|ize)|my fault|my bad|i confess|forgive me)\b/i.test(LINE)) {
  throw new Error("entry line must not apologise or confess");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

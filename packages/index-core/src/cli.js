#!/usr/bin/env node
// Thin runner: load a band + observations, print the index point.
//
//   node src/cli.js                         # seed data + econ-batch band
//   node src/cli.js <observations.json> <band.json>
//   node src/cli.js --json                  # also dump the full audit object

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { computeIndexPrint } from "./engine.js";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

function loadJSON(p) {
  return JSON.parse(readFileSync(p, "utf8"));
}

const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith("--"));
const wantJSON = args.includes("--json");

const obsPath = positional[0] || join(root, "data", "seed-observations.json");
const bandPath = positional[1] || join(root, "config", "econ-batch.band.json");

const raw = loadJSON(obsPath);
const observations = Array.isArray(raw) ? raw : raw.observations;
const seedNote = Array.isArray(raw) ? null : raw._note;
const band = loadJSON(bandPath);

const print = computeIndexPrint(observations, band);

console.log(`\n${print.symbol}  —  ${band.title}  (${print.method})`);
console.log(`reference unit: ${print.reference_unit}`);
if (print.value === null) {
  console.log(`PRINT:  no qualifying route — basket is empty`);
} else {
  console.log(`PRINT:  ${print.value} USD / 1M output-equivalent chars`);
  console.log(`        cheapest-to-deliver = ${print.ctd_route.model} @ ${print.ctd_route.vendor}`);
}

console.log(`\nqualifying basket (${print.basket.length}): ${print.basket.join(", ") || "(none)"}`);

if (print.excluded.length) {
  console.log(`\nexcluded:`);
  for (const e of print.excluded) console.log(`  - ${e.model}: ${e.reasons.join("; ")}`);
}

console.log(`\nroute ladder (cheapest first):`);
for (const r of print.ladder) {
  console.log(
    `  ${r.normalized_usd_per_m_char.toFixed(4)}  ${r.model} @ ${r.vendor}` +
      `  (blended ${r.blended_usd_per_m_tok}/Mtok, ${r.chars_per_token} ch/tok)`
  );
}

if (seedNote) console.log(`\nnote: ${seedNote}`);
if (wantJSON) console.log(`\n${JSON.stringify(print, null, 2)}`);

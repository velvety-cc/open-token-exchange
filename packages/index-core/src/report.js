#!/usr/bin/env node
// Render a self-contained static HTML report from one index print.
// No server, no framework, no build — server-side rendered to a single file.
//
//   node src/report.js                                  # seed data + econ-batch -> report.html
//   node src/report.js <observations.json> <band.json> <out.html>

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { computeIndexPrint } from "./engine.js";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const loadJSON = (p) => JSON.parse(readFileSync(p, "utf8"));
const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const obsPath = args[0] || join(root, "data", "seed-observations.json");
const bandPath = args[1] || join(root, "config", "econ-batch.band.json");
const outPath = args[2] || join(root, "report.html");

const raw = loadJSON(obsPath);
const observations = Array.isArray(raw) ? raw : raw.observations;
const seedNote = Array.isArray(raw) ? null : raw._note;
const band = loadJSON(bandPath);
const print = computeIndexPrint(observations, band);

const wl = band.reference_workload;
const th = band.thresholds.default;
const maxVal = Math.max(...print.ladder.map((r) => r.normalized_usd_per_m_char), 0.000001);

const chip = (k, v) => `<span class="chip"><b>${esc(k)}</b> ${esc(v)}</span>`;

const ladderRows = print.ladder
  .map((r) => {
    const isCtd = print.ctd_route && r.model === print.ctd_route.model && r.vendor === print.ctd_route.vendor;
    const pct = (r.normalized_usd_per_m_char / maxVal) * 100;
    return `<div class="route ${isCtd ? "ctd" : ""}">
      <div class="route-label">${esc(r.model)} <span class="vendor">@ ${esc(r.vendor)}</span>${isCtd ? '<span class="tag">CTD</span>' : ""}</div>
      <div class="bar-wrap"><div class="bar" style="width:${pct.toFixed(1)}%"></div><span class="val">${r.normalized_usd_per_m_char.toFixed(4)}</span></div>
    </div>`;
  })
  .join("\n");

const excludedRows = print.excluded.length
  ? print.excluded
      .map((e) => `<li><b>${esc(e.model)}</b><span class="reason">${esc(e.reasons.join("; "))}</span></li>`)
      .join("\n")
  : `<li class="muted">none — every candidate qualified</li>`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(print.symbol)} — index report</title>
<style>
  :root { --teal:#0E7C66; --teal-light:#3BC9A8; --ink:#0d1b16; --muted:#5b6b64; --line:#e3ece9; --bg:#f6f9f8; }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--ink); font:15px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; }
  .wrap { max-width: 880px; margin: 0 auto; padding: 40px 24px 64px; }
  h1 { font-size: 20px; margin:0; }
  h2 { font-size: 13px; text-transform: uppercase; letter-spacing:.06em; color:var(--muted); margin: 36px 0 12px; }
  .sub { color:var(--muted); margin: 4px 0 24px; font-size: 13px; }
  .print { background: var(--teal); color:#fff; border-radius: 14px; padding: 28px; }
  .print .num { font-size: 40px; font-weight: 700; letter-spacing:-.02em; }
  .print .unit { opacity:.85; font-size: 14px; margin-top: 2px; }
  .print .ctd { margin-top: 14px; font-size: 14px; opacity:.95; }
  .print .ctd b { background: rgba(255,255,255,.18); padding: 2px 8px; border-radius: 6px; }
  .chips { display:flex; flex-wrap:wrap; gap:8px; }
  .chip { background:#fff; border:1px solid var(--line); border-radius:999px; padding:5px 12px; font-size:13px; color:var(--muted); }
  .chip b { color:var(--ink); font-weight:600; margin-right:4px; }
  .route { margin: 10px 0; }
  .route-label { font-size: 13px; margin-bottom: 4px; }
  .route-label .vendor { color:var(--muted); }
  .route-label .tag { background:var(--teal); color:#fff; font-size:10px; font-weight:700; padding:1px 6px; border-radius:5px; margin-left:8px; vertical-align:1px; }
  .bar-wrap { display:flex; align-items:center; gap:10px; }
  .bar { height: 22px; background: var(--teal-light); border-radius: 5px; min-width: 2px; }
  .route.ctd .bar { background: var(--teal); }
  .val { font-variant-numeric: tabular-nums; font-size: 13px; color:var(--muted); }
  ul.basket { list-style:none; padding:0; margin:0; display:flex; flex-wrap:wrap; gap:8px; }
  ul.basket li { background:#fff; border:1px solid var(--line); border-radius:8px; padding:6px 12px; font-size:13px; }
  ul.excluded { list-style:none; padding:0; margin:0; }
  ul.excluded li { background:#fff; border:1px solid var(--line); border-left:3px solid #d98b8b; border-radius:8px; padding:8px 12px; margin-bottom:8px; font-size:13px; }
  ul.excluded .reason { color:var(--muted); margin-left:10px; }
  .muted { color:var(--muted); }
  footer { margin-top:40px; padding-top:16px; border-top:1px solid var(--line); color:var(--muted); font-size:12px; }
  .warn { background:#fff7ed; border:1px solid #f3d9b5; color:#7a5320; border-radius:10px; padding:12px 14px; font-size:13px; margin-top:14px; }
</style>
</head>
<body>
<div class="wrap">
  <h1>${esc(print.symbol)} <span class="muted">— ${esc(band.title)}</span></h1>
  <div class="sub">${esc(print.method)} · computed ${esc(print.computed_at)}</div>

  <div class="print">
    <div class="num">${print.value === null ? "—" : "$" + print.value.toFixed(4)}</div>
    <div class="unit">USD per 1M output-equivalent characters (tokenizer-normalized)</div>
    ${print.ctd_route ? `<div class="ctd">cheapest-to-deliver: <b>${esc(print.ctd_route.model)} @ ${esc(print.ctd_route.vendor)}</b></div>` : `<div class="ctd">no qualifying route — basket is empty</div>`}
  </div>

  <h2>Band</h2>
  <div class="chips">
    ${chip("universe", band.universe)}
    ${chip("service", band.service_class.name)}
    ${chip("workload", `${wl.input_output_blend}:1 in:out · ${wl.context_tokens / 1000}k ctx · ${wl.decoding}`)}
    ${chip("availability K", band.availability_gate_k)}
    ${chip("thresholds", `t_in ${th.t_in} / t_out ${th.t_out}`)}
    ${chip("gating axes", band.gating_axes.length)}
  </div>

  <h2>Route ladder · cheapest-to-deliver first</h2>
  ${ladderRows || '<div class="muted">no routes</div>'}

  <h2>Qualifying basket (${print.basket.length})</h2>
  <ul class="basket">
    ${print.basket.map((m) => `<li>${esc(m)}</li>`).join("\n") || '<li class="muted">empty</li>'}
  </ul>

  <h2>Excluded · the gates that make this an oracle, not a leaderboard</h2>
  <ul class="excluded">
    ${excludedRows}
  </ul>

  ${seedNote ? `<div class="warn"><b>Illustrative data.</b> ${esc(seedNote)}</div>` : ""}

  <footer>
    Generated by <code>@ote/index-core</code> · reference-grade v0 · deterministic from published inputs + band config.
  </footer>
</div>
</body>
</html>`;

writeFileSync(outPath, html);
console.log(`wrote ${outPath}`);

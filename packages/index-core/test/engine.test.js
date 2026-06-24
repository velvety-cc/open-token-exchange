import { test } from "node:test";
import assert from "node:assert/strict";
import { computeIndexPrint } from "../src/engine.js";

// Minimal band: 2 gating axes, K=2, 3:1 blend.
const band = {
  symbol: "OTE-ECON-BATCH",
  method: "ote-idx@test",
  title: "test",
  universe: "open-weight",
  reference_unit: "usd_per_1m_output_equivalent_chars",
  reference_workload: { input_output_blend: 3 },
  gating_axes: ["instruction_following", "structured_output_validity"],
  monitored_axes: [],
  thresholds: { default: { t_in: 0.7, t_out: 0.65 } },
  availability_gate_k: 2,
};

function obs(over) {
  return {
    open_weight: true,
    scores: { instruction_following: 0.8, structured_output_validity: 0.8 },
    endpoints: [
      { vendor: "a", input_usd_per_m_tok: 0.2, output_usd_per_m_tok: 0.4, available_at_scale: true },
      { vendor: "b", input_usd_per_m_tok: 0.1, output_usd_per_m_tok: 0.3, available_at_scale: true },
    ],
    chars_per_token: 4,
    ...over,
  };
}

test("cheapest-to-deliver picks the lowest normalized route", () => {
  // blended b = 0.3 + 3*0.1 = 0.6 -> /4 = 0.15 ; blended a = 0.4 + 3*0.2 = 1.0 -> /4 = 0.25
  const print = computeIndexPrint([obs({ model: "cheap" })], band, { now: "T" });
  assert.equal(print.value, 0.15);
  assert.deepEqual(print.ctd_route, { model: "cheap", vendor: "b" });
});

test("conjunctive gate drops a model failing one axis", () => {
  const bad = obs({ model: "bad", scores: { instruction_following: 0.8, structured_output_validity: 0.5 } });
  const print = computeIndexPrint([bad], band, { now: "T" });
  assert.equal(print.basket.length, 0);
  assert.equal(print.value, null);
});

test("availability gate K excludes a single-vendor model", () => {
  const single = obs({
    model: "single",
    endpoints: [{ vendor: "a", input_usd_per_m_tok: 0.01, output_usd_per_m_tok: 0.01, available_at_scale: true }],
  });
  const print = computeIndexPrint([single], band, { now: "T" });
  assert.equal(print.basket.includes("single"), false);
});

test("closed-weight model is excluded from an open-weight band", () => {
  const print = computeIndexPrint([obs({ model: "closed", open_weight: false })], band, { now: "T" });
  assert.equal(print.basket.length, 0);
});

test("hysteresis: incumbent between t_out and t_in is retained, a fresh entrant is not", () => {
  // 0.67 is below entry bar (0.70) but at/above retain bar (0.65)
  const m = obs({ model: "inc", scores: { instruction_following: 0.67, structured_output_validity: 0.8 } });
  const fresh = computeIndexPrint([m], band, { now: "T", priorQualified: [] });
  assert.equal(fresh.basket.includes("inc"), false);
  const retained = computeIndexPrint([m], band, { now: "T", priorQualified: ["inc"] });
  assert.equal(retained.basket.includes("inc"), true);
});

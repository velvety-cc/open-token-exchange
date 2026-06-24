// The v0 index engine: pure, deterministic, reproducible.
//
//   inputs:  observations (per-model scores + endpoint prices) + band config
//   output:  one settlement print (cheapest-to-deliver) + full audit trail
//
// Deterministic given its inputs: same observations + same band => same print
// (computed_at aside). That reproducibility IS the product — two counterparties
// and an arbitrator must be able to re-derive the number from published inputs.

import { qualifyModels } from "./band.js";
import { buildLadder } from "./ctd.js";

/**
 * @param {Array} observations
 * @param {object} band
 * @param {{priorQualified?:string[], now?:string}} [opts]
 */
export function computeIndexPrint(observations, band, opts = {}) {
  const priorQualified = opts.priorQualified || [];

  const gating = qualifyModels(observations, band, priorQualified);
  const byModel = Object.fromEntries(observations.map((o) => [o.model, o]));
  const ladder = buildLadder(gating, byModel, band);

  const basket = gating.filter((g) => g.qualified).map((g) => g.model);
  const ctd = ladder[0] || null;

  return {
    symbol: band.symbol,
    method: band.method,
    reference_unit: band.reference_unit,
    value: ctd ? ctd.normalized_usd_per_m_char : null,
    ctd_route: ctd ? { model: ctd.model, vendor: ctd.vendor } : null,
    basket,
    basket_changes: gating
      .filter((g) => g.transition === "admit" || g.transition === "drop")
      .map((g) => ({ model: g.model, change: g.transition, reasons: g.reasons })),
    excluded: gating
      .filter((g) => !g.qualified)
      .map((g) => ({ model: g.model, reasons: g.reasons })),
    ladder,
    gating,
    computed_at: opts.now || new Date().toISOString(),
  };
}

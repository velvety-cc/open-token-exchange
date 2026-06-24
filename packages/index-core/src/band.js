// Gating: decides which models qualify into the capability band for a period.
//
// Three gates, all conjunctive (a model must clear EVERY one):
//   1. universe         — open-weight only (closed frontier excluded from this band)
//   2. capability       — score_axis >= bar for ALL gating axes (with hysteresis)
//   3. availability      — servable at scale from >= K vendors (no phantom CTD route)
//
// Hysteresis: a model already in the basket last period is held to the lower
// retain bar (t_out); a new entrant must clear the higher entry bar (t_in).
// This stops boundary flicker so the basket is stable across periods.

/** @returns {{t_in:number,t_out:number}} threshold for an axis (per-axis override, else default). */
function thresholdFor(band, axis) {
  return (band.thresholds && band.thresholds[axis]) || band.thresholds.default;
}

/**
 * Apply the band's gates to a list of observations.
 * @param {Array} observations  per-model score vectors + endpoints
 * @param {object} band          band config (config/econ-batch.band.json shape)
 * @param {string[]} priorQualified  models qualified last period (for hysteresis)
 * @returns {Array} one verdict per model: {model, qualified, transition, reasons, eligibleEndpoints}
 */
export function qualifyModels(observations, band, priorQualified = []) {
  const prior = new Set(priorQualified);

  return observations.map((obs) => {
    const reasons = [];
    const wasQualified = prior.has(obs.model);

    // 1. universe gate
    if (band.universe === "open-weight" && obs.open_weight !== true) {
      reasons.push("universe: not open-weight");
    }

    // 2. capability gates (conjunctive, hysteresis-aware)
    for (const axis of band.gating_axes) {
      const { t_in, t_out } = thresholdFor(band, axis);
      const bar = wasQualified ? t_out : t_in;
      const score = obs.scores ? obs.scores[axis] : undefined;
      if (score === undefined) {
        reasons.push(`${axis}: no score`);
      } else if (score < bar) {
        const which = wasQualified ? "retain" : "entry";
        reasons.push(`${axis}: ${score} < ${bar} (${which} bar)`);
      }
    }

    // 3. availability gate — only endpoints servable at scale count
    const eligibleEndpoints = (obs.endpoints || []).filter((e) => e.available_at_scale === true);
    if (eligibleEndpoints.length < band.availability_gate_k) {
      reasons.push(
        `availability: ${eligibleEndpoints.length} < K=${band.availability_gate_k} vendors at scale`
      );
    }

    const qualified = reasons.length === 0;
    const transition = qualified
      ? wasQualified ? "retain" : "admit"
      : wasQualified ? "drop" : "reject";

    return { model: obs.model, qualified, wasQualified, transition, reasons, eligibleEndpoints };
  });
}

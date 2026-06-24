// Cheapest-to-deliver pricing over the qualifying basket.
//
// For every qualifying (model, eligible-endpoint) route we compute a single
// normalized price, then the index print is the cheapest route. Two corrections,
// both load-bearing:
//
//   1. Reference-workload blend (3:1 input:output). The unit is "output-equivalent":
//      producing 1M output tokens consumes blend * 1M input tokens, so
//        blended $/1M-output-tok = output_$ + blend * input_$
//      This stops a model with cheap output but expensive input from looking
//      cheaper than it serves the actual workload.
//
//   2. Tokenizer normalization. A token is not a fungible unit of work across
//      tokenizers, so we divide by chars_per_token to express price per delivered
//      CHARACTER. This is the analog of a Treasury-future conversion factor and
//      prevents a model from looking cheap just because its tokenizer is greedy.

function round6(x) {
  return Math.round(x * 1e6) / 1e6;
}

/**
 * Build the sorted route ladder (cheapest first) for the qualifying basket.
 * @param {Array} gating  output of qualifyModels()
 * @param {Object<string,object>} observationsByModel  model -> observation
 * @param {object} band
 * @returns {Array} routes sorted ascending by normalized_usd_per_m_char
 */
export function buildLadder(gating, observationsByModel, band) {
  const blend = band.reference_workload.input_output_blend;
  const routes = [];

  for (const verdict of gating) {
    if (!verdict.qualified) continue;
    const obs = observationsByModel[verdict.model];
    const charsPerToken = obs.chars_per_token;

    for (const ep of verdict.eligibleEndpoints) {
      const blendedPerMTok = ep.output_usd_per_m_tok + blend * ep.input_usd_per_m_tok;
      const normalizedPerMChar = blendedPerMTok / charsPerToken;
      routes.push({
        model: verdict.model,
        vendor: ep.vendor,
        blended_usd_per_m_tok: round6(blendedPerMTok),
        chars_per_token: charsPerToken,
        normalized_usd_per_m_char: round6(normalizedPerMChar),
      });
    }
  }

  routes.sort((a, b) => a.normalized_usd_per_m_char - b.normalized_usd_per_m_char);
  return routes;
}

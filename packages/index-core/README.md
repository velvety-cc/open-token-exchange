# @ote/index-core

The v0 **index engine**: a capability-banded, cheapest-to-deliver price index for a
standardized economy-batch inference token, settled over a basket of qualifying
**open-weight** models. This is the settlement-oracle primitive every future product
shape (bulk-buy forwards, token futures) references. See
[architecture/index-engine](../../apps/docs/architecture/index-engine.mdx).

It is deliberately small and dependency-free. Given `(eval scores, list prices, band
config)` it deterministically prints one number plus a full audit trail. Same inputs,
same print — that reproducibility is the point.

## Run

```bash
node src/cli.js            # seed data + econ-batch band
node src/cli.js --json     # also dump the full audit object
npm test                   # node --test
```

## What it does (and does not) do in v0

The engine **consumes** per-model capability scores and vendor list prices as input
data, then:

1. **Gates** models into the band — conjunctive capability gates (AND across axes,
   not a tradeable weighted average), hysteresis (separate enter/exit bars to stop
   flicker), and an availability gate (servable at scale from >= K vendors).
2. **Prices** cheapest-to-deliver — blends input/output at the reference workload ratio
   (output-equivalent), tokenizer-normalizes to per-character so routes compare on
   delivered work, then takes the cheapest qualifying route.

Deferred (settlement-grade hardening, not MVP): running the eval to *generate* fresh
private scores, rotating held-out tasks + contamination canaries, measured realized
cost-to-serve, LLM-judge ensembles. v0 is reference-grade, not settlement-grade.

## Layout

```
config/econ-batch.band.json   # the pinned v0 band (all values overridable)
data/seed-observations.json    # ILLUSTRATIVE inputs (placeholders, not sourced)
src/band.js                    # gating: universe + capability + availability
src/ctd.js                     # cheapest-to-deliver pricing + normalization
src/engine.js                  # compose -> one index print + audit
src/cli.js                     # runner
test/engine.test.js            # one test per gate + the CTD math
```

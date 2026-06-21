# Open Token Exchange

A secondary commodity & derivatives market for **LLM inference tokens** — research, feasibility, and
architecture.

This repo is an npm-workspaces monorepo. Today it contains the **research + architecture
documentation** (Mintlify). Application packages are added phase by phase per the
[roadmap](apps/docs/architecture/roadmap.mdx).

## TL;DR verdict

OTE is buildable, but the underlying is **not a classic speculatable commodity** — token prices are
administratively set and have fallen ~40× in one direction. The defensible product is a
**price-lock / hedging marketplace anchored to a transparent multi-provider token-price index**, not
an arbitrage venue (tokens are consumed, not resold). Build **index-first**, ship a **physically-
settled voucher MVP**, and treat cash-settled forwards and a Hyperliquid HIP‑3 perp as later,
gated phases.

Full reasoning and citations are in the docs.

## Develop the docs

```bash
npm install
npm run docs        # mint dev — serves apps/docs locally
```

## Layout

```
apps/docs/          # @ote/docs — Mintlify research + architecture site (this is what exists today)
packages/*          # planned, phase-by-phase (see apps/docs/architecture/monorepo.mdx)
```

## Structure of the docs

- **Overview** — thesis, non-goals, glossary
- **Research** — verified findings on the underlying, speculatability, analogues, oracles, regulation
- **Architecture** — design options, recommended MVP, the price index, system design, HIP‑3 path,
  roadmap, and open questions

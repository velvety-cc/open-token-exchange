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

## Develop

```bash
npm install
npm run docs        # mint dev — serves the docs site (apps/docs) on :3000
npm run web         # next dev — serves the landing page (apps/web) on :4311
```

## Layout

```
apps/docs/          # @ote/docs — Mintlify research + architecture site
apps/web/           # @ote/web  — investor landing page (Next.js); see apps/web/README.md
packages/index-core # @ote/index-core — the v0 price-index engine
reference/          # source material (Xing 2026, arXiv:2603.21690)
```

## Structure of the docs

- **Overview** — thesis, non-goals, glossary
- **Research** — verified findings on the underlying, speculatability, analogues, oracles, regulation
- **Architecture** — design options, recommended MVP, the price index, system design, HIP‑3 path,
  roadmap, and open questions

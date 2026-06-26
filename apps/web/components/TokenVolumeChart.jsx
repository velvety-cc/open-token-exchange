"use client";

import { useState } from "react";

import Cite from "./Cite";

const X0 = 2023;
const X1 = 2030;
const W = 720;
const H = 300;
const M = { t: 16, r: 60, b: 32, l: 46 };
const PW = W - M.l - M.r;
const PH = H - M.t - M.b;

// left axis: monthly token volume, indexed to 2023 = 1
const Y_MAX = 26;
const Y_TICKS = [0, 5, 10, 15, 20, 25];
// right axis: inference market size, in $B
const MKT_MAX = 300;
const MKT_TICKS = [0, 100, 200, 300];
const X_TICKS = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

// monthly token consumption volume, indexed to 2023 = 1, compounding to ~24x by
// 2030 (Goldman Sachs projects ~24x growth between 2026 and 2030).
const vol = (t) => Math.pow(24, t / 7);
// inference market revenue in $B, 19.2% CAGR anchored at $106B in 2025 and
// ~$255B in 2030 (MarketsandMarkets).
const mkt = (year) => 106.15 * Math.pow(1.192, year - 2025);

const DATA = Array.from({ length: 29 }, (_, i) => {
  const t = i * 0.25;
  const year = X0 + t;
  return { year, v: vol(t), m: mkt(year) };
});

const sx = (year) => M.l + ((year - X0) / (X1 - X0)) * PW;
const sy = (v) => M.t + (1 - v / Y_MAX) * PH;
const sym = (m) => M.t + (1 - m / MKT_MAX) * PH;

const VOL_LINE = DATA.map(
  (d, i) => `${i ? "L" : "M"}${sx(d.year).toFixed(1)},${sy(d.v).toFixed(1)}`
).join(" ");
const AREA = `${VOL_LINE} L${sx(X1).toFixed(1)},${sy(0).toFixed(1)} L${sx(
  X0
).toFixed(1)},${sy(0).toFixed(1)} Z`;
const MKT_LINE = DATA.map(
  (d, i) => `${i ? "L" : "M"}${sx(d.year).toFixed(1)},${sym(d.m).toFixed(1)}`
).join(" ");

const fmtVol = (v) => (v >= 10 ? Math.round(v) : v.toFixed(1));

export default function TokenVolumeChart() {
  const [hi, setHi] = useState(null);

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * W;
    const frac = Math.max(0, Math.min(1, (mx - M.l) / PW));
    setHi(Math.round(X0 + frac * (X1 - X0)));
  }

  const hv = hi == null ? null : { year: hi, v: vol(hi - X0), m: mkt(hi) };

  return (
    <figure className="my-6 rounded-[8px] border border-line bg-band p-5 sm:p-6">
      <div className="mb-1 font-serif text-[19px] leading-tight text-ink">
        The token explosion:{" "}
        <Cite
          n={2}
          note="Goldman Sachs projects token consumption multiplying 24× to 120 quadrillion tokens per month between 2026 and 2030, about 2.2× per year."
          source="Goldman Sachs Research, May 2026"
          href="https://www.goldmansachs.com/insights/articles/ai-agents-forecast-to-boost-tech-cash-flow-as-usage-soars"
        >
          volume
        </Cite>{" "}
        &amp;{" "}
        <Cite
          n={3}
          note="The global AI inference market is projected to grow from $106.15 billion in 2025 to $254.98 billion by 2030, a 19.2% CAGR."
          source="MarketsandMarkets, AI Inference Market 2025–2030"
          href="https://www.marketsandmarkets.com/Market-Reports/ai-inference-market-189921964.html"
        >
          market size
        </Cite>
      </div>
      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10.5px] tracking-[0.04em] text-mut uppercase">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-brand" />
          Token volume
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-ink2" />
          Market size ($B)
        </span>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full select-none"
          onMouseMove={onMove}
          onMouseLeave={() => setHi(null)}
        >
          <defs>
            <linearGradient id="tokvol-grad" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                style={{ stopColor: "var(--brand)", stopOpacity: 0.26 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "var(--brand)", stopOpacity: 0 }}
              />
            </linearGradient>
          </defs>

          {Y_TICKS.map((v) => (
            <g key={v}>
              <line
                x1={M.l}
                x2={W - M.r}
                y1={sy(v)}
                y2={sy(v)}
                className="stroke-line2/60"
                strokeWidth="1"
              />
              <text
                x={M.l - 8}
                y={sy(v) + 3.5}
                textAnchor="end"
                className="fill-faint font-mono text-[10px]"
              >
                {v}×
              </text>
            </g>
          ))}
          {MKT_TICKS.map((m) => (
            <text
              key={`m${m}`}
              x={W - M.r + 9}
              y={sym(m) + 3.5}
              textAnchor="start"
              className="fill-faint font-mono text-[10px]"
            >
              ${m}B
            </text>
          ))}
          {X_TICKS.map((yr) => (
            <text
              key={yr}
              x={sx(yr)}
              y={H - 11}
              textAnchor="middle"
              className="fill-faint font-mono text-[10px]"
            >
              {yr}
            </text>
          ))}
          <text
            transform={`translate(12 ${M.t + PH / 2}) rotate(-90)`}
            textAnchor="middle"
            className="fill-mut text-[10.5px]"
          >
            Volume
          </text>

          <path d={AREA} fill="url(#tokvol-grad)" />
          <path
            d={MKT_LINE}
            fill="none"
            className="stroke-ink2"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d={VOL_LINE}
            fill="none"
            className="stroke-brand"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* endpoint markers; values are read off the two axes */}
          <circle
            cx={sx(2030)}
            cy={sy(vol(7))}
            r="3.5"
            className="fill-brand stroke-band"
            strokeWidth="2"
          />
          <circle
            cx={sx(2030)}
            cy={sym(mkt(2030))}
            r="3.5"
            className="fill-ink2 stroke-band"
            strokeWidth="2"
          />

          {hv && (
            <g>
              <line
                x1={sx(hv.year)}
                x2={sx(hv.year)}
                y1={M.t}
                y2={M.t + PH}
                className="stroke-ink2/40"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <circle
                cx={sx(hv.year)}
                cy={sym(hv.m)}
                r="4"
                className="fill-ink2 stroke-band"
                strokeWidth="2"
              />
              <circle
                cx={sx(hv.year)}
                cy={sy(hv.v)}
                r="4"
                className="fill-brand stroke-band"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>

        {hv && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-line bg-paper px-3 py-2 text-xs whitespace-nowrap shadow-lg"
            style={{
              left: `${(sx(hv.year) / W) * 100}%`,
              top: `${(Math.min(sy(hv.v), sym(hv.m)) / H) * 100}%`,
              marginTop: "-10px",
            }}
          >
            <div className="font-mono text-[10px] text-mut">{hv.year}</div>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-brand" />
              <span className="text-ink">{fmtVol(hv.v)}× 2023 volume</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-ink2" />
              <span className="text-ink">${Math.round(hv.m)}B market</span>
            </div>
          </div>
        )}
      </div>
    </figure>
  );
}

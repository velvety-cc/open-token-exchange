"use client";

import { useState } from "react";

const X0 = 2023;
const X1 = 2029;
const W = 720;
const H = 320;
const M = { t: 14, r: 18, b: 44, l: 54 };
const PW = W - M.l - M.r;
const PH = H - M.t - M.b;
const LO = 0.2;
const HI = 24;
const Y_TICKS = [0.2, 0.5, 1, 2, 5, 10, 20];

// price per million tokens: a steep one-way fall, then two-way swings
const PTS = [
  { year: 2023.0, price: 20 },
  { year: 2023.5, price: 11 },
  { year: 2024.0, price: 6 },
  { year: 2024.5, price: 3.2 },
  { year: 2025.0, price: 1.5 },
  { year: 2025.5, price: 0.65 },
  { year: 2026.0, price: 0.4 }, // index 6: the floor
  { year: 2026.5, price: 0.52 },
  { year: 2027.0, price: 0.44 },
  { year: 2027.5, price: 0.9 },
  { year: 2028.0, price: 0.56 },
  { year: 2028.5, price: 1.6 },
  { year: 2029.0, price: 0.75 },
];
const SPLIT = 6;

const PHASES = [
  { a: 2023, b: 2025.5, op: 0.04, label: "I · Supply-driven decline" },
  { a: 2025.5, b: 2027, op: 0.07, label: "II · Rebalancing" },
  { a: 2027, b: 2029, op: 0.12, label: "III · Demand-driven volatility" },
];

const sx = (year) => M.l + ((year - X0) / (X1 - X0)) * PW;
const sy = (p) =>
  M.t + (1 - (Math.log(p) - Math.log(LO)) / (Math.log(HI) - Math.log(LO))) * PH;
const seg = (from, to) =>
  PTS.slice(from, to)
    .map((d, i) => `${i ? "L" : "M"}${sx(d.year).toFixed(1)},${sy(d.price).toFixed(1)}`)
    .join(" ");
const money = (v) => (v >= 1 ? `$${v}` : `$${v.toFixed(2)}`);
const yearLabel = (y) => (Number.isInteger(y) ? `${y}` : `mid-${Math.floor(y)}`);

export default function TokenPriceChart() {
  const [hi, setHi] = useState(null);

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * W;
    const frac = Math.max(0, Math.min(1, (mx - M.l) / PW));
    const target = X0 + frac * (X1 - X0);
    let idx = 0;
    let best = Infinity;
    PTS.forEach((p, i) => {
      const d = Math.abs(p.year - target);
      if (d < best) {
        best = d;
        idx = i;
      }
    });
    setHi(idx);
  }

  const hv = hi == null ? null : PTS[hi];

  return (
    <figure className="my-6 rounded-[8px] border border-line bg-band p-5 sm:p-6">
      <div className="mb-3 font-serif text-[19px] leading-tight text-ink">
        Token prices: a steep one-way fall, then two-way swings
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full select-none"
          onMouseMove={onMove}
          onMouseLeave={() => setHi(null)}
        >
          {PHASES.map((p) => (
            <rect
              key={p.label}
              x={sx(p.a)}
              y={M.t}
              width={sx(p.b) - sx(p.a)}
              height={PH}
              style={{ fill: "var(--brand)", opacity: p.op }}
            />
          ))}
          {PHASES.map((p) => (
            <text
              key={p.label}
              x={(sx(p.a) + sx(p.b)) / 2}
              y={M.t + PH + 14}
              textAnchor="middle"
              className="fill-mut text-[10px]"
            >
              {p.label}
            </text>
          ))}

          {Y_TICKS.map((v) => (
            <g key={v}>
              <line
                x1={M.l}
                x2={W - M.r}
                y1={sy(v)}
                y2={sy(v)}
                className="stroke-line2/50"
                strokeWidth="1"
              />
              <text x={M.l - 8} y={sy(v) + 3.5} textAnchor="end" className="fill-faint font-mono text-[10px]">
                {money(v)}
              </text>
            </g>
          ))}
          {[2023, 2024, 2025, 2026, 2027, 2028, 2029].map((yr) => (
            <text key={yr} x={sx(yr)} y={H - 20} textAnchor="middle" className="fill-faint font-mono text-[10px]">
              {yr}
            </text>
          ))}
          <text
            transform={`translate(15 ${M.t + PH / 2}) rotate(-90)`}
            textAnchor="middle"
            className="fill-mut text-[10.5px]"
          >
            Price per million tokens (log)
          </text>

          <path
            d={seg(0, SPLIT + 1)}
            fill="none"
            className="stroke-brand"
            strokeWidth="2.75"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d={seg(SPLIT, PTS.length)}
            fill="none"
            className="stroke-brand"
            strokeWidth="2.75"
            strokeDasharray="6 5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle cx={sx(2026)} cy={sy(0.4)} r="4" className="fill-brand stroke-band" strokeWidth="2" />

          <text x={sx(2023) + 6} y={sy(20) - 8} className="fill-mut text-[10.5px]">
            ~$20/M (2023)
          </text>
          <text x={sx(2026) + 8} y={sy(0.4) + 16} className="fill-mut text-[10.5px]">
            ~$0.40/M (2026)
          </text>

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
              <circle cx={sx(hv.year)} cy={sy(hv.price)} r="4.5" className="fill-brand stroke-band" strokeWidth="2" />
            </g>
          )}
        </svg>

        {hv && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-line bg-paper px-3 py-2 text-xs whitespace-nowrap shadow-lg"
            style={{
              left: `${(sx(hv.year) / W) * 100}%`,
              top: `${(sy(hv.price) / H) * 100}%`,
              marginTop: "-10px",
            }}
          >
            <div className="font-mono text-[10px] text-mut">{yearLabel(hv.year)}</div>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-brand" />
              <span className="text-ink">{money(hv.price)} / M tokens</span>
            </div>
          </div>
        )}
      </div>

      <figcaption className="mt-3 text-[12px] text-mut italic">
        Decline anchored to reported figures; Phase III is illustrative.
      </figcaption>
    </figure>
  );
}

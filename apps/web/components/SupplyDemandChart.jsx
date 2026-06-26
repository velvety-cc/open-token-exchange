"use client";

import { useState } from "react";

const X0 = 2023;
const X1 = 2029;
const W = 720;
const H = 320;
const M = { t: 14, r: 18, b: 32, l: 50 };
const PW = W - M.l - M.r;
const PH = H - M.t - M.b;
const Y_MAX = 66;
const Y_TICKS = [0, 10, 20, 30, 40, 50, 60];
const X_TICKS = [2023, 2024, 2025, 2026, 2027, 2028, 2029];

// indexed growth paths: demand ~2x/yr, supply ~1.5x/yr
const DATA = Array.from({ length: 25 }, (_, i) => {
  const t = i * 0.25;
  return { year: X0 + t, demand: Math.pow(2, t), supply: Math.exp(0.427 * t) };
});

const sx = (year) => M.l + ((year - X0) / (X1 - X0)) * PW;
const sy = (v) => M.t + (1 - v / Y_MAX) * PH;
const path = (key) =>
  DATA.map((d, i) => `${i ? "L" : "M"}${sx(d.year).toFixed(1)},${sy(d[key]).toFixed(1)}`).join(" ");
const fmt = (v) => (v >= 10 ? Math.round(v) : v.toFixed(1));

const GAP =
  DATA.map((d, i) => `${i ? "L" : "M"}${sx(d.year).toFixed(1)},${sy(d.demand).toFixed(1)}`).join(" ") +
  " " +
  [...DATA].reverse().map((d) => `L${sx(d.year).toFixed(1)},${sy(d.supply).toFixed(1)}`).join(" ") +
  " Z";

export default function SupplyDemandChart() {
  const [hi, setHi] = useState(null);

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * W;
    const frac = Math.max(0, Math.min(1, (mx - M.l) / PW));
    setHi(Math.round(X0 + frac * (X1 - X0)));
  }

  const hv =
    hi == null
      ? null
      : (() => {
          const t = hi - X0;
          return { year: hi, demand: Math.pow(2, t), supply: Math.exp(0.427 * t) };
        })();

  return (
    <figure className="my-6 rounded-[8px] border border-line bg-band p-5 sm:p-6">
      <div className="mb-1 font-serif text-[19px] leading-tight text-ink">
        Why prices swing: demand outruns what can be built
      </div>
      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10.5px] tracking-[0.04em] text-mut uppercase">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-brand" />
          Demand
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-ink2" />
          Supply
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-[3px] bg-brand/15" />
          The gap = volatility
        </span>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full select-none"
          onMouseMove={onMove}
          onMouseLeave={() => setHi(null)}
        >
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
              <text x={M.l - 8} y={sy(v) + 3.5} textAnchor="end" className="fill-faint font-mono text-[10px]">
                {v}
              </text>
            </g>
          ))}
          {X_TICKS.map((yr) => (
            <text key={yr} x={sx(yr)} y={H - 11} textAnchor="middle" className="fill-faint font-mono text-[10px]">
              {yr}
            </text>
          ))}
          <text
            transform={`translate(13 ${M.t + PH / 2}) rotate(-90)`}
            textAnchor="middle"
            className="fill-mut text-[10.5px]"
          >
            Growth index (2023 = 1)
          </text>

          <path d={GAP} className="fill-brand/10" />
          <path
            d={path("supply")}
            fill="none"
            className="stroke-ink2"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d={path("demand")}
            fill="none"
            className="stroke-brand"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          <text x={sx(2027.05)} y={sy(48)} className="fill-brand-ink text-[11px]">
            demand moves at
          </text>
          <text x={sx(2027.05)} y={sy(48) + 14} className="fill-brand-ink text-[11px]">
            the speed of software
          </text>
          <text x={sx(2026.35)} y={sy(20)} className="fill-mut text-[11px]">
            supply moves at the
          </text>
          <text x={sx(2026.35)} y={sy(20) + 14} className="fill-mut text-[11px]">
            speed of construction
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
              <circle cx={sx(hv.year)} cy={sy(hv.supply)} r="4" className="fill-ink2 stroke-band" strokeWidth="2" />
              <circle cx={sx(hv.year)} cy={sy(hv.demand)} r="4" className="fill-brand stroke-band" strokeWidth="2" />
            </g>
          )}
        </svg>

        {hv && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-line bg-paper px-3 py-2 text-xs whitespace-nowrap shadow-lg"
            style={{
              left: `${(sx(hv.year) / W) * 100}%`,
              top: `${(sy(Math.max(hv.demand, hv.supply)) / H) * 100}%`,
              marginTop: "-10px",
            }}
          >
            <div className="font-mono text-[10px] text-mut">{hv.year}</div>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-brand" />
              <span className="text-ink">Demand {fmt(hv.demand)}×</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-ink2" />
              <span className="text-ink">Supply {fmt(hv.supply)}×</span>
            </div>
          </div>
        )}
      </div>

      <figcaption className="mt-3 text-[12px] text-mut italic">
        Illustrative growth paths, indexed to 2023.
      </figcaption>
    </figure>
  );
}

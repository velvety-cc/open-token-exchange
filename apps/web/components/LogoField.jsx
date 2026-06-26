"use client";

import { useEffect, useRef } from "react";

// Generative coral field, full-bleed across the hero. A faint dot-grid lattice
// sits underneath; coral particles emanate from a single right-of-centre origin
// (echoing the Open Intelligence logo's radial burst) and drift outward through a swirling
// flow field. Bimodal spread: most dots stay in a dense inner circle, a
// minority reach a wide outer ring. Each particle carries a short finite trail;
// the canvas is fully cleared every frame so traces vanish and dots stay crisp.
const CORAL = "253, 99, 65"; // --accent
const TRAIL = 9; // trail length (frames of history)
const EMIT = 0.3; // global emission speed (1 = original); slows the whole field

export default function LogoField({
  className = "logo-field",
  originX = 0.76,
  originY = 0.5,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let scale = 1;
    let step = 26;
    let cols = 0;
    let rows = 0;
    let particles = [];
    let t = 0;

    const rand = () => Math.random();

    function spawn(p) {
      // every particle emanates from a single origin point (cx, cy)
      const a = rand() * Math.PI * 2;
      const r = Math.pow(rand(), 2) * scale * 0.02;
      p.x = cx + Math.cos(a) * r;
      p.y = cy + Math.sin(a) * r;
      p.dx = Math.cos(a); // base outward direction
      p.dy = Math.sin(a);
      // bimodal spread: most dots stay in a dense inner circle, a minority
      // escape to a wide outer ring
      p.maxR =
        rand() < 0.76
          ? (0.12 + rand() * 0.12) * w // inner cluster (majority)
          : (0.4 + rand() * 0.26) * w; // outer ring (minority)
      p.outSpeed = p.maxR / (230 + rand() * 170);
      p.spin = 0.85 + rand() * 0.45; // tangential : radial → spiral pitch
      p.maxLife = 1100 + rand() * 560; // fallback (longer, since motion is slow)
      p.life = 0;
      p.size = 0.8 + rand() * rand() * 2.4;
      p.hist = [];
      return p;
    }

    function seed() {
      const count = Math.round(Math.max(110, Math.min(200, (w * h) / 2600)));
      particles = [];
      for (let i = 0; i < count; i++) {
        const p = spawn({});
        p.life = rand() * p.maxLife;
        particles.push(p);
      }
    }

    // swirling field: tangential rotation about the centre + outward push +
    // a sinusoidal curl so trajectories meander like ink.
    function field(x, y) {
      const dx = x - cx;
      const dy = y - cy;
      const ang = Math.atan2(dy, dx);
      const dist = Math.hypot(dx, dy) / scale;
      const curl =
        Math.sin(x * 0.012 + t * 0.6) + Math.cos(y * 0.012 - t * 0.5);
      const dir = ang + Math.PI / 2 + curl * 0.55;
      const out = 0.45 + dist * 0.55;
      return {
        vx: Math.cos(dir) * 0.7 + Math.cos(ang) * out * 0.5,
        vy: Math.sin(dir) * 0.7 + Math.sin(ang) * out * 0.5,
      };
    }

    function drawGrid() {
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * step;
          const y = j * step;
          const d = Math.hypot(x - cx, y - cy) / (scale * 0.9);
          const a = Math.max(0, 0.32 - d * 0.16);
          if (a <= 0.004) continue;
          ctx.beginPath();
          ctx.arc(x, y, 0.9, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${CORAL}, ${a})`;
          ctx.fill();
        }
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // desktop puts the burst right-of-centre (copy sits on the left); once the
      // hero stacks on mobile, the field is a full-width block so centre it.
      cx = w * (w <= 720 ? 0.5 : originX);
      cy = h * originY;
      scale = Math.min(w, h);
      step = Math.max(22, Math.round(scale * 0.05));
      cols = Math.ceil(w / step);
      rows = Math.ceil(h / step);
      seed();
    }

    function frame() {
      t += 0.016 * EMIT;
      ctx.clearRect(0, 0, w, h); // full clear → crisp dots, no haze
      drawGrid();
      for (const p of particles) {
        // logarithmic spiral: radial (outward) + proportional tangential,
        // plus a little field curl for organic wobble, at EMIT speed
        const ddx = p.x - cx;
        const ddy = p.y - cy;
        const dist = Math.hypot(ddx, ddy) || 0.001;
        const ux = ddx / dist;
        const uy = ddy / dist;
        const radial = p.outSpeed;
        const tang = p.outSpeed * p.spin;
        const f = field(p.x, p.y);
        p.x += (ux * radial - uy * tang + f.vx * 0.12) * EMIT;
        p.y += (uy * radial + ux * tang + f.vy * 0.12) * EMIT;
        p.life++;
        p.hist.push(p.x, p.y);
        if (p.hist.length > TRAIL * 2) p.hist.splice(0, 2);

        // hold brightness across the spread; only shrink in the final stretch
        const dr = Math.hypot(p.x - cx, p.y - cy);
        const frac = dr / p.maxR; // 0 at origin, 1 at full spread
        const aIn = Math.min(1, p.life / 16);
        const aOut = frac < 0.78 ? 1 : Math.max(0, 1 - (frac - 0.78) / 0.22);
        const env = aIn * aOut;

        const n = p.hist.length / 2;
        for (let k = 0; k < n; k++) {
          const seg = n > 1 ? k / (n - 1) : 1; // 0 = oldest, 1 = newest
          const a = env * seg * seg * 0.9;
          if (a < 0.01) continue;
          ctx.beginPath();
          ctx.arc(
            p.hist[k * 2],
            p.hist[k * 2 + 1],
            p.size * (0.35 + 0.65 * seg) * (0.4 + 0.6 * aOut), // taper as it fades
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(${CORAL}, ${a})`;
          ctx.fill();
        }

        if (
          frac >= 1 ||
          p.life >= p.maxLife ||
          p.x < -30 ||
          p.x > w + 30 ||
          p.y < -30 ||
          p.y > h + 30
        ) {
          spawn(p);
        }
      }
      raf = requestAnimationFrame(frame);
    }

    function staticRender() {
      ctx.clearRect(0, 0, w, h);
      drawGrid();
      for (let i = 0; i < 170; i++) {
        const p = spawn({});
        const rr = Math.pow(rand(), 0.7) * p.maxR;
        ctx.beginPath();
        ctx.arc(cx + p.dx * rr, cy + p.dy * rr, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CORAL}, ${0.22 + rand() * 0.5})`;
        ctx.fill();
      }
    }

    resize();
    if (reduce) {
      staticRender();
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onResize = () => {
      resize();
      if (reduce) staticRender();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [originX, originY]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

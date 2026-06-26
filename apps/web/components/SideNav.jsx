"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "./sections";

export default function SideNav() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [onDark, setOnDark] = useState(false);

  // Invert the rail while it sits over the full-bleed dark "product" strip:
  // toggle when that section spans the rail's vertical mid-line.
  useEffect(() => {
    const dark = document.getElementById("product");
    const rail = document.querySelector(".sidenav ol") || document.querySelector(".sidenav");
    if (!dark || !rail) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      const r = rail.getBoundingClientRect();
      const d = dark.getBoundingClientRect();
      const mid = r.top + r.height / 2;
      setOnDark(d.top <= mid && d.bottom >= mid);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean
    );
    if (!els.length) return;

    // Track which sections are currently intersecting; the topmost wins.
    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        // Pick the visible section nearest the top of the viewport.
        let top = null;
        let topY = Infinity;
        for (const id of visible.keys()) {
          const y = document.getElementById(id).getBoundingClientRect().top;
          if (y < topY) {
            topY = y;
            top = id;
          }
        }
        if (top) setActive(top);
      },
      {
        // Bias the active band to the upper third of the viewport.
        rootMargin: "-15% 0px -70% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`sidenav${onDark ? " on-dark" : ""}`} aria-label="Sections">
      <ol>
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={active === s.id ? "active" : ""}
              aria-current={active === s.id ? "true" : undefined}
            >
              <span className="n">{s.num}</span>
              <span>{s.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

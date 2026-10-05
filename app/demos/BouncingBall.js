"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./BouncingBall.module.css";

const W = 400;
const H = 400;
const R = 44.5; // ball radius (from the SVG frames)
const GROUND_Y = 284.5; // ball center Y when touching the ground (from the frames)
const SPIN_LOSS = 0.85; // spin kept after each bounce
const STOP_V = 40;
const SPRING_K = 5000; // contact stiffness: higher = stiffer, shallower, shorter contact
const HOLD_MS = 900; // rest time before the ball is tossed again

const DEFAULTS = { gravity: 2400, bounciness: 0.76, spin: 2.2, squish: 1 };

const SLIDERS = [
  { key: "gravity", label: "Gravity", min: 500, max: 4500, step: 50, format: (v) => `${v}` },
  { key: "bounciness", label: "Bounciness", min: 0.3, max: 0.95, step: 0.01, format: (v) => `${Math.round(v * 100)}%` },
  { key: "spin", label: "Spin", min: 0, max: 5, step: 0.1, format: (v) => v.toFixed(1) },
  { key: "squish", label: "Squish", min: 0, max: 1, step: 0.05, format: (v) => `${v.toFixed(2)}×` },
];

// Ball artwork lifted exactly from Frame 1.svg (white background removed)
const BALL_SVG = `<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="199.5" cy="200.5" r="44.5" fill="#F3773A" stroke="black" stroke-width="2"/>
<path d="M156 209C162.299 216.966 205.799 230.052 243 211.655" stroke="black" stroke-width="2"/>
<path d="M163 175.45C204.354 187.959 268.443 218.881 192 244.5M199.373 156C215.299 163.662 245.302 190.185 233.191 229.479" stroke="black" stroke-width="2"/>
</svg>`;

export default function BouncingBall() {
  const canvasRef = useRef(null);
  const [values, setValues] = useState(DEFAULTS);
  const params = useRef(DEFAULTS);
  const restartRef = useRef(() => {});

  useEffect(() => { params.current = values; }, [values]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const img = new Image();
    let raf;
    let last;
    let started = false;
    let visible = false;
    let ready = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let y, vy, omega, theta, squish, squishV, hold;

    function reset() {
      const p = params.current;
      y = 120;
      vy = 0;
      omega = (Math.random() < 0.5 ? -1 : 1) * p.spin; // mid-air spin
      theta = Math.random() * Math.PI * 2;
      squish = 0;
      squishV = 0;
      hold = 0;
    }
    reset();

    function step(dt) {
      const p = params.current;
      vy += p.gravity * dt;
      y += vy * dt;

      // ground contact: damped spring drives compression + recovery,
      // so squish depth and timing track the real impact energy
      if (y >= GROUND_Y) {
        y = GROUND_Y;
        squish += squishV * dt;
        if (squish < 0) squish = 0;
        const stopV = Math.max(STOP_V, p.gravity * 0.03);
        if (Math.abs(vy) > stopV) {
          // keep compressing while impact energy remains (real squash phase)
          squishV = Math.max(squishV, Math.abs(vy) * 0.006);
          squishV += (-SPRING_K * squish - 120 * squishV) * dt;
          const recover = -vy * p.bounciness;
          vy = recover;
          if (recover > 0 && squishV > 0) {
            // restitution energy pushes the ball back off the ground:
            // transfer it into the spring and pop off as it relaxes
            squishV = Math.max(squishV, recover * 0.8);
          }
          omega *= SPIN_LOSS;
        } else {
          vy = 0;
          omega = 0;
        }
      } else {
        // airborne: spring relaxes freely, ball pops off the ground
        squish += squishV * dt;
        squishV += (-SPRING_K * squish - 120 * squishV) * dt;
        if (Math.abs(squish) < 0.002 && Math.abs(squishV) < 0.02) {
          squish = 0;
          squishV = 0;
        }
      }

      // spin in mid-air (constant while airborne, like a real tossed ball)
      theta += omega * dt;

      // settled → hold → drop again
      if (vy === 0 && y >= GROUND_Y - 0.01) {
        hold += dt * 1000;
        if (hold > HOLD_MS) reset();
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, W, H);

      // shadow: shrinks/softens with height
      const h = Math.max(0, Math.min(1, (GROUND_Y - y) / (GROUND_Y - 110)));
      const sc = 1 - h * 0.45;
      ctx.save();
      ctx.globalAlpha = 0.32 - h * 0.18;
      ctx.filter = `blur(${3 + h * 4}px)`;
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.ellipse(W / 2, GROUND_Y + R + 6, 48 * sc, 8.5 * sc, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ball: squish anchored at the contact point, then rotate
      const compression = Math.max(-0.12, Math.min(0.45, squish * params.current.squish));
      const sy = 1 - compression;
      const sx = 1 + compression * 0.55;
      ctx.save();
      ctx.translate(W / 2, y + R);
      ctx.scale(sx, sy);
      ctx.translate(0, -R);
      ctx.rotate(theta);
      ctx.drawImage(img, -199.5, -200.5, 400, 400);
      ctx.restore();
    }

    function loop(now) {
      if (last === undefined) last = now;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const steps = Math.max(1, Math.ceil(dt * 240));
      for (let i = 0; i < steps; i++) step(dt / steps);
      draw();
      raf = requestAnimationFrame(loop);
    }

    function pause() {
      cancelAnimationFrame(raf);
      started = false;
      last = undefined;
    }

    function start() {
      if (started || !ready || !visible || document.hidden) return;
      started = true;
      if (reducedMotion.matches) {
        y = GROUND_Y;
        squish = 0;
        draw();
        return;
      }
      raf = requestAnimationFrame(loop);
    }

    function refresh() { pause(); start(); }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      refresh();
    });
    observer.observe(canvas);
    document.addEventListener("visibilitychange", refresh);
    reducedMotion.addEventListener("change", refresh);
    restartRef.current = () => { reset(); refresh(); };

    img.onload = () => { ready = true; start(); };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(BALL_SVG);
    if (img.complete && img.naturalWidth) { ready = true; start(); }

    return () => {
      pause();
      observer.disconnect();
      document.removeEventListener("visibilitychange", refresh);
      reducedMotion.removeEventListener("change", refresh);
      img.onload = null;
      restartRef.current = () => {};
    };
  }, []);

  return (
    <div className={styles.stage} role="group" aria-label="Basketball physics demo">
      <div className={styles.panel}>
        <button type="button" className={styles.courtWrap} onClick={() => restartRef.current()} aria-label="Bounce basketball">
          <canvas ref={canvasRef} className={styles.court} aria-hidden="true" />
        </button>
        <div className={styles.controls}>
          {SLIDERS.map(({ key, label, min, max, step, format }) => {
            const pct = ((values[key] - min) / (max - min)) * 100;
            return (
              <label className={styles.control} key={key}>
                <span className={styles.controlRow}>
                  <span className={styles.controlName}>{label}</span>
                  <span className={styles.controlValue}>{format(values[key])}</span>
                </span>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={values[key]}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, [key]: Number(e.target.value) }))
                  }
                  style={{ "--fill": `${pct}%` }}
                />
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

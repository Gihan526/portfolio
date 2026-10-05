"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import styles from "./Confetti.module.css";

const COLORS = [
  "#d8f3dc", "#c4f0cc", "#b7efc5", "#a0e8ad",
  "#95e6a6", "#7fdd91", "#74d486", "#63c97a",
  "#58c26d", "#4eb861",
];

const MIN_PARTICLES = 100;
const MAX_PARTICLES = 1000;
const DEFAULT_PARTICLES = 150;
const CELL_SIZE = 13;
const CELL_RADIUS = 0;

const GRAPH_COLUMNS = 36;
const GRAPH_ROWS = 7;
const GRAPH_CELL_COUNT = GRAPH_COLUMNS * GRAPH_ROWS;

function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;

  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function createGraphLevels(): number[] {
  const random = createSeededRandom(0x5eed1234);

  return Array.from({ length: GRAPH_CELL_COUNT }, () => {
    const roll = random();

    if (roll < 0.42) return 0;
    if (roll < 0.7) return 1;
    if (roll < 0.88) return 2;
    if (roll < 0.97) return 3;
    return 4;
  });
}

function createGraphFillOrder(): number[] {
  const random = createSeededRandom(0xc0ffee);
  const order = Array.from({ length: GRAPH_CELL_COUNT }, (_, index) => index);

  for (let index = order.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
  }

  return order;
}

const BASE_GRAPH_LEVELS = createGraphLevels();
const GRAPH_FILL_ORDER = createGraphFillOrder();

function clampParticleCount(value: number): number {
  if (!Number.isFinite(value)) return MIN_PARTICLES;

  return Math.min(
    MAX_PARTICLES,
    Math.max(MIN_PARTICLES, Math.round(value)),
  );
}

function getGraphLevels(count: number): number[] {
  const boundedCount = clampParticleCount(count);
  const filledCellCount = Math.floor(
    (boundedCount / MAX_PARTICLES) * GRAPH_CELL_COUNT,
  );
  const graphLevels = Array.from({ length: GRAPH_CELL_COUNT }, () => 0);

  for (let rank = 0; rank < filledCellCount; rank += 1) {
    const index = GRAPH_FILL_ORDER[rank];
    graphLevels[index] = Math.max(1, BASE_GRAPH_LEVELS[index]);
  }

  return graphLevels;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
  delay: number;
  rot: number;
  rotSpeed: number;
  windPhase: number;
  windFreq: number;
  windAmp: number;
  wobblePhase: number;
  wobbleFreq: number;
  wobbleAmp: number;
  gravity: number;
  alive: boolean;
}

const particlePool: Particle[] = [];

function getParticle(): Particle {
  const p = particlePool.pop();
  if (p) {
    p.alive = true;
    return p;
  }
  return {} as Particle;
}

function releaseParticle(p: Particle) {
  p.alive = false;
  particlePool.push(p);
}

function randomSigned(max: number): number {
  return (Math.random() * 2 - 1) * max;
}

function spawnParticle(
  ox: number,
  oy: number,
  spreadMultiplier: number,
  burstLean: number,
): Particle {
  const p = getParticle();

  const horizontalSpeed = 140 + Math.random() * 480;
  const verticalSpeed = 100 + Math.random() * 420;
  const launchesUpward = Math.random() < 0.78;
  const horizontalBias = burstLean * (180 + Math.random() * 240);

  p.x = ox + randomSigned(5);
  p.y = oy + randomSigned(4);
  p.vx = (randomSigned(horizontalSpeed) + horizontalBias) * spreadMultiplier;
  p.vy = (launchesUpward ? -1 : 1) * verticalSpeed * spreadMultiplier;
  p.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  p.life = 0;
  p.maxLife = 1.4 + Math.random() * 0.7;
  p.delay = Math.random() * 0.12;
  p.rot = Math.random() * Math.PI * 2;
  p.rotSpeed = (Math.random() - 0.5) * 10;
  p.windPhase = Math.random() * Math.PI * 2;
  p.windFreq = 0.8 + Math.random() * 2.2;
  p.windAmp = 18 + Math.random() * 70;
  p.wobblePhase = Math.random() * Math.PI * 2;
  p.wobbleFreq = 10 + Math.random() * 12;
  p.wobbleAmp = 1.5 + Math.random() * 5;
  p.gravity = 60 + Math.random() * 180;
  p.alive = true;

  return p;
}

function easeOutQuart(t: number): number {
  const u = 1 - t;
  return 1 - u * u * u * u;
}

function draw(ctx: CanvasRenderingContext2D, p: Particle, elapsed: number) {
  const active = Math.max(0, elapsed - p.delay);
  const maxActive = p.maxLife - p.delay;
  if (maxActive <= 0) return;
  const progress = active / maxActive;
  if (progress <= 0) return;

  const fadeIn = Math.min(1, progress / 0.1);
  const fadeStart = 0.68;
  const fadeOut = progress < fadeStart ? 1 : 1 - (progress - fadeStart) / (1 - fadeStart);
  const alpha = fadeIn * fadeOut;
  if (alpha <= 0.01) return;

  const eased = easeOutQuart(progress);
  const gravity = progress * progress * p.gravity;
  const wind = Math.sin(p.windPhase + elapsed * p.windFreq) * p.windAmp * progress;
  const wobbleX = Math.cos(p.wobblePhase + elapsed * p.wobbleFreq) * p.wobbleAmp * (1 - progress);
  const wobbleY = Math.sin(p.wobblePhase * 1.3 + elapsed * p.wobbleFreq * 0.7) * p.wobbleAmp * 0.5;

  const scale = 0.35 + (1 - eased) * 0.28;
  const sz = CELL_SIZE * scale;
  const half = sz / 2;

  const x = p.x + p.vx * eased * p.maxLife + wind + wobbleX;
  const y = p.y + p.vy * eased * p.maxLife + gravity + wobbleY;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  ctx.rotate(p.rot + p.rotSpeed * progress);

  ctx.fillStyle = p.color;
  ctx.beginPath();
  ctx.roundRect(-half, -half, sz, sz, CELL_RADIUS * (scale / 0.63));
  ctx.fill();
  ctx.restore();
}

export default function Confetti() {
  const [count, setCount] = useState(DEFAULT_PARTICLES);
  const [graphCleared, setGraphCleared] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const graphCellRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const activeParticlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const graphLevels = graphCleared
    ? Array.from({ length: GRAPH_CELL_COUNT }, () => 0)
    : getGraphLevels(count);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const container = canvas.parentElement;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;
      canvas.style.width = `${container.clientWidth}px`;
      canvas.style.height = `${container.clientHeight}px`;
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
      activeParticlesRef.current.forEach(releaseParticle);
      activeParticlesRef.current = [];
    };
  }, []);

  const animate = useCallback(function animateFrame(timestamp: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);
    lastTimeRef.current = timestamp;

    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    const particles = activeParticlesRef.current;
    let active = false;

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life += dt;
      if (p.life >= p.maxLife) {
        releaseParticle(p);
        particles.splice(i, 1);
        continue;
      }
      active = true;
      draw(ctx, p, p.life);
    }

    if (active) {
      rafRef.current = requestAnimationFrame(animateFrame);
    } else {
      lastTimeRef.current = 0;
      setGraphCleared(false);
    }
  }, []);

  const handleClick = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cellOrigins: Array<{ x: number; y: number }> = [];
    const canvasBounds = canvas.getBoundingClientRect();
    getGraphLevels(count).forEach((level, index) => {
      if (level <= 0) return;

      const cell = graphCellRefs.current[index];
      if (!cell) return;

      const rect = cell.getBoundingClientRect();
      cellOrigins.push({
        x: rect.left + rect.width / 2 - canvasBounds.left,
        y: rect.top + rect.height / 2 - canvasBounds.top,
      });
    });

    if (cellOrigins.length === 0) return;

    cancelAnimationFrame(rafRef.current);
    lastTimeRef.current = 0;

    const spread = canvas.clientWidth < 300 ? 0.35 : 0.55;
    const burstLean =
      (Math.random() < 0.5 ? -1 : 1) * (0.16 + Math.random() * 0.24);

    const newParticles = cellOrigins.map(({ x, y }) =>
      spawnParticle(x, y, spread, burstLean),
    );

    activeParticlesRef.current.forEach(releaseParticle);
    activeParticlesRef.current = newParticles;
    setGraphCleared(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      activeParticlesRef.current.forEach(releaseParticle);
      activeParticlesRef.current = [];
      setGraphCleared(false);
      return;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [animate, count]);

  const handleSliderChange = useCallback(
    (values: number[]) => {
      if (values[0] !== undefined) {
        setCount(clampParticleCount(values[0]));
        setGraphCleared(false);
      }
    },
    [],
  );

  return (
    <div className={styles.container} role="group" aria-label="GitHub confetti demo">
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.card}>
        <div className={styles.buttonWrap}>
          <button
            type="button"
            className={styles.button}
            onClick={handleClick}
            aria-label={`Trigger ${count} confetti particles`}
          >
            <span className={styles.graph} aria-hidden="true">
              {graphLevels.map((level, index) => (
                <span
                  key={index}
                  ref={(element) => {
                    graphCellRefs.current[index] = element;
                  }}
                  className={styles.cell}
                  data-level={level}
                />
              ))}
            </span>
          </button>
        </div>

        <div className={styles.sliderGroup}>
          <div className={styles.sliderHeader}>
            <label htmlFor="confetti-count" className={styles.label}>
              Count
            </label>
            <span className={styles.count}>{count}</span>
          </div>
          <input
            type="range"
            id="confetti-count"
            min={MIN_PARTICLES}
            max={MAX_PARTICLES}
            step={1}
            value={count}
            onChange={(event) => handleSliderChange([Number(event.target.value)])}
            className={styles.slider}
            style={{ "--slider-progress": `${((count - MIN_PARTICLES) / (MAX_PARTICLES - MIN_PARTICLES)) * 100}%` } as React.CSSProperties}
          />
        </div>
      </div>
    </div>
  );
}

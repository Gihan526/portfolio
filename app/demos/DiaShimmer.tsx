"use client";

import { useEffect, useRef } from "react";
import styles from "./DiaShimmer.module.css";

// Original spring and color wave from Gihan526/diaeffect, scoped to this card.
const duration = 500;
const lift = 110;
const mass = 0.65;
const stiffness = 420;
const damping = 21;
const decay = damping / (2 * mass);
const frequency = Math.sqrt(stiffness / mass - decay * decay);
const motion = Array.from({ length: 126 }, (_, index) => {
  const ms = index * 4;
  const t = Math.max(0, ms - lift) / 1000;
  let y = ms <= lift
    ? -4.5 * (1 - Math.cos(Math.PI * ms / lift)) / 2
    : -4.5 * Math.exp(-decay * t) *
      (Math.cos(frequency * t) + decay / frequency * Math.sin(frequency * t));
  if (ms > 420) {
    const p = (ms - 420) / 80;
    y *= 1 - p * p * (3 - 2 * p);
  }
  const scale = 1 - y * (y < 0 ? 0.025 / 4.5 : 0.005 / 1.2);
  return { offset: ms / duration, transform: `translateY(${y}px) scale(${scale})` };
});

function useDiaShimmer() {
  const wordRef = useRef<HTMLButtonElement>(null);
  const active = useRef<Animation[]>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cancel = () => {
      active.current.forEach((animation) => animation.cancel());
      active.current = [];
    };
    reducedMotion.addEventListener("change", cancel);
    return () => {
      reducedMotion.removeEventListener("change", cancel);
      cancel();
    };
  }, []);

  function replay() {
    const word = wordRef.current;
    if (!word) return;
    active.current.forEach((animation) => animation.cancel());
    active.current = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bounds = word.getBoundingClientRect();
    const letters = Array.from(word.children) as HTMLElement[];
    const startTime = document.timeline.currentTime;
    function animate(element: HTMLElement, frames: Keyframe[], options: KeyframeAnimationOptions) {
      const animation = element.animate(frames, options);
      animation.startTime = startTime;
      active.current.push(animation);
    }

    letters.forEach((letter, index) => {
      const left = letter.getBoundingClientRect().left - bounds.left;
      const delay = reduced ? 0 : index * 24;
      const options: KeyframeAnimationOptions = {
        duration: reduced ? 220 : 750 - delay, delay, fill: "none",
      };
      const envelope = reduced
        ? [{ offset: 0, value: 0 }, { offset: 0.4, value: 0.55 }, { offset: 1, value: 0 }]
        : [{ offset: 0, value: 0 }, { offset: 0.12, value: 1 },
          { offset: 0.74, value: 1 }, { offset: 0.88, value: 0.65 }, { offset: 1, value: 0 }];
      const ink = letter.children[0] as HTMLElement;
      const glow = letter.children[1] as HTMLElement;
      const color = letter.children[2] as HTMLElement;
      if (!reduced) animate(letter, motion, { duration, delay, fill: "none" });
      const opacityFrames = (factor: (value: number) => number) => envelope.map(({ offset, value }) => ({
        offset, opacity: factor(value), easing: "ease-in-out",
      }));
      animate(ink, opacityFrames((value) => 1 - value), options);
      animate(color, opacityFrames((value) => value), options);
      animate(glow, opacityFrames((value) => reduced ? 0 : value * 0.18), options);
      for (const layer of [color, glow]) {
        layer.style.backgroundSize = `${bounds.width * 1.5}px 100%`;
        animate(layer, [
          { backgroundPosition: `${-left}px 50%` },
          { backgroundPosition: `${-bounds.width * 0.5 - left}px 50%` },
        ], { duration: reduced ? 220 : 650, easing: "linear", fill: "forwards" });
      }
    });
  }

  return { wordRef, replay };
}

function Letters({ text }: { text: string }) {
  return Array.from(text, (character, index) => (
    <span className={styles.letter} key={index} aria-hidden="true">
      <span className={styles.ink}>{character === " " ? "\u00a0" : character}</span>
      <span className={styles.glow}>{character === " " ? "\u00a0" : character}</span>
      <span className={styles.color}>{character === " " ? "\u00a0" : character}</span>
    </span>
  ));
}

export function ProfileName({ className }: { className: string }) {
  const { wordRef, replay } = useDiaShimmer();

  return (
    <h1 id="profile-name" className={className} aria-label="Gihan Ariyasena">
      <button
        ref={wordRef}
        className={`${styles.word} ${styles.profileName}`}
        type="button"
        onMouseEnter={replay}
        onFocus={replay}
        onClick={replay}
        aria-label="Gihan Ariyasena — play text shimmer"
      >
        <Letters text="Gihan Ariyasena" />
      </button>
    </h1>
  );
}

export default function DiaShimmer() {
  const { wordRef, replay } = useDiaShimmer();

  return (
    <div className={styles.stage}>
      <button ref={wordRef} className={styles.word} type="button" onClick={replay} aria-label="Play Gihan text shimmer">
        <Letters text="Gihan" />
      </button>
      <p className={styles.hint}>Click to shimmer</p>
    </div>
  );
}

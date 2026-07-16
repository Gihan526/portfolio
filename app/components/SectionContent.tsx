"use client";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconChevronLeft,
  IconChevronRight,
  IconMail,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { SectionId, useSection } from "./SectionContext";

const SWAP_MS = 300;
const SWIPE = 60; // px of finger travel that counts as a swipe

function HomeSection() {
  return (
    <>
      <p className="max-w-2xl text-lg leading-relaxed text-zinc-300">
        Hey, I&rsquo;m Gihan, a Computer Science student who enjoys building
        practical, reliable software with a focus on backend systems, cloud, and
        AI.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <a
          href="https://github.com/Gihan526"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="inline-flex h-11 w-11 items-center justify-center text-zinc-400 transition-colors hover:text-white md:h-auto md:w-auto"
        >
          <IconBrandGithub size={24} stroke={2} aria-hidden="true" />
        </a>
        <a
          href="https://www.linkedin.com/in/gihan-ariyasena-267123357"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="inline-flex h-11 w-11 items-center justify-center text-zinc-400 transition-colors hover:text-white md:h-auto md:w-auto"
        >
          <IconBrandLinkedin size={24} stroke={2} aria-hidden="true" />
        </a>
        <a
          href="https://x.com/gihan_ahk"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
          className="inline-flex h-11 w-11 items-center justify-center text-zinc-400 transition-colors hover:text-white md:h-auto md:w-auto"
        >
          <IconBrandX size={24} stroke={2} aria-hidden="true" />
        </a>
        <a
          href="mailto:gihanariyasena526@gmail.com"
          aria-label="Email"
          className="inline-flex h-11 w-11 items-center justify-center text-zinc-400 transition-colors hover:text-white md:h-auto md:w-auto"
        >
          <IconMail size={24} stroke={2} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}

function AboutSection() {
  return (
    <>
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-white">
        About
      </h2>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
        <div>
          <p className="text-lg leading-relaxed text-zinc-300">
            What first got me into programming was machine learning. I started
            teaching myself Python because I was curious about how models
            actually learn from data, rather than just using a library without
            understanding what was happening underneath. That curiosity pushed
            me to implement the UMAP algorithm from scratch, which meant working
            through the maths, nearest-neighbour logic, and plenty of bugs along
            the way. I&rsquo;m still learning machine learning and AI
            independently, mostly by building projects that show me what I
            understand and what I need to improve.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-zinc-300">
            That same curiosity later led me into full-stack development and
            hackathons, where I learned to turn ideas into working projects
            under pressure. My teams went on to win first place at a university
            hackathon and receive the Most Innovative Concept award at the Hemas
            AIthon.
          </p>
        </div>

        <dl className="space-y-4 text-sm lg:border-l lg:border-zinc-800 lg:pl-6">
          {SKILLS.map((group) => (
            <div key={group.label}>
              <dt className="mb-1 text-xs uppercase tracking-wider text-zinc-500">
                {group.label}
              </dt>
              <dd className="text-zinc-300">{group.items}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}

const SKILLS = [
  {
    label: "Languages",
    items: "Python, JavaScript, TypeScript, SQL, Bash, Rust",
  },
  {
    label: "Frameworks",
    items: "React, Next.js, Node.js, Express, Tailwind CSS, Socket.IO",
  },
  { label: "AI / Data", items: "Pandas, Scikit-learn" },
  { label: "Databases", items: "PostgreSQL, MySQL, SQLite, Redis" },
  { label: "Cloud", items: "AWS Cloud Foundations" },
];

const PROJECTS = [
  {
    name: "shell-chat",
    href: "https://github.com/Gihan526/shell-chat",
    description: "Real-time terminal chat app with a TUI client and server.",
    tags: ["TS", "Bun"],
  },
  {
    name: "umap-algorithm-from-scratch",
    href: "https://github.com/Gihan526/umap-algorithm-from-scratch",
    description: "UMAP dimensionality-reduction algorithm implemented from scratch.",
    tags: ["Python", "ML"],
  },
  {
    name: "leetcode-discord-rich-presence",
    href: "https://github.com/Gihan526/leetcode-discord-rich-presence",
    description: "Shows your current LeetCode problem as a Discord status.",
    tags: ["JS", "Node.js"],
  },
];

function ProjectsSection() {
  return (
    <>
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-white">
        Projects
      </h2>
      <ul className="max-w-2xl space-y-3 text-lg leading-relaxed text-zinc-300">
        {PROJECTS.map((project) => (
          <li key={project.href}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 transition-colors hover:text-white"
              >
                {project.name}
              </a>
              <span className="flex gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-800 px-2 py-0.5 text-xs text-zinc-500"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            </div>
            <p className="mt-1 text-sm text-zinc-500">{project.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

const CONTENT: Record<SectionId, React.ReactNode> = {
  home: <HomeSection />,
  about: <AboutSection />,
  projects: <ProjectsSection />,
};

export default function SectionContent() {
  const { activeId, go } = useSection();
  const [shownId, setShownId] = useState<SectionId>(activeId);
  const [visible, setVisible] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevActiveIdRef = useRef<SectionId>(activeId);

  // Auto-hide the swipe hint after a few seconds.
  useEffect(() => {
    const t = window.setTimeout(() => setShowHint(false), 5000);
    return () => window.clearTimeout(t);
  }, []);

  // Fade the current content out, swap it, reset scroll, then fade the new one in.
  useEffect(() => {
    if (activeId === prevActiveIdRef.current) return;
    prevActiveIdRef.current = activeId;
    setShowHint(false);

    setVisible(false);
    const swap = window.setTimeout(() => {
      setShownId(activeId);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      // Paint the incoming content in its hidden state first, then reveal it
      // on the next frame so the transition actually plays.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true))
      );
    }, SWAP_MS);

    return () => window.clearTimeout(swap);
  }, [activeId]);

  // Every section is a fixed slide; wheel / keys / horizontal swipe change section.
  useEffect(() => {
    let cooling = false;
    const cool = () => {
      cooling = true;
      window.setTimeout(() => (cooling = false), 800);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault(); // page itself never scrolls
      if (cooling || Math.abs(e.deltaY) < 12) return;
      cool();
      go(e.deltaY > 0 ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (cooling) return;
      const down = e.key === "ArrowDown" || e.key === "PageDown";
      const up = e.key === "ArrowUp" || e.key === "PageUp";
      if (!down && !up) return;
      cool();
      go(down ? 1 : -1);
    };

    // Horizontal swipe changes section; vertical gestures are ignored.
    let startX = 0;
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (cooling) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) < SWIPE) return;
      cool();
      go(dx < 0 ? 1 : -1); // swipe left -> next, swipe right -> previous
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [go]);

  return (
    <div className="relative h-full">
      <div ref={scrollRef} className="h-full overflow-hidden">
        <div
          className={`transition-all ease-out ${
            visible
              ? "opacity-100 blur-0 translate-y-0"
              : "opacity-0 blur-sm translate-y-3"
          }`}
          style={{ transitionDuration: `${SWAP_MS}ms` }}
        >
          {CONTENT[shownId]}
        </div>
      </div>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-700 ease-out md:hidden ${
          showHint ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-2">
          <IconChevronLeft
            size={16}
            stroke={2}
            className="swipe-hint-left text-zinc-500"
          />
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-500">
            swipe
          </span>
          <IconChevronRight
            size={16}
            stroke={2}
            className="swipe-hint-right text-zinc-500"
          />
        </div>
      </div>
    </div>
  );
}

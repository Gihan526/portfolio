"use client";

import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { SECTIONS, SectionId, useSection } from "./SectionContext";

const SWAP_MS = 300;
const SWIPE = 60; // px of horizontal travel that counts as a swipe

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
    <ol className="max-w-2xl space-y-10">
      {PROJECTS.map((project) => (
        <li key={project.href} className="group">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link relative flex flex-col gap-1.5 pr-5 sm:flex-row sm:items-center sm:gap-x-2.5 sm:pr-0"
          >
            <h3 className="text-lg text-zinc-100 transition-colors group-hover:text-white">
              {project.name}
            </h3>
            <span className="font-mono text-xs text-zinc-500">
              {project.tags.join(" · ")}
            </span>
            <IconArrowUpRight
              size={16}
              stroke={2}
              aria-hidden="true"
              className="absolute right-0 top-0 mt-1.5 shrink-0 text-zinc-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-300 sm:static sm:mt-0"
            />
          </a>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-zinc-500">
            {project.description}
          </p>
        </li>
      ))}
    </ol>
  );
}

const CONTENT: Record<SectionId, React.ReactNode> = {
  home: <HomeSection />,
  about: <AboutSection />,
  projects: <ProjectsSection />,
};

export default function SectionContent() {
  const { activeId, setActiveId } = useSection();
  const [shownId, setShownId] = useState<SectionId>(activeId);
  const [visible, setVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevActiveIdRef = useRef<SectionId>(activeId);

  // Horizontal swipe changes section on touch devices. Vertical gestures are
  // left to native scrolling; a gesture only switches when horizontal travel
  // dominates, so reading still scrolls instead of jumping sections.
  useEffect(() => {
    let cooling = false;
    const cool = () => {
      cooling = true;
      window.setTimeout(() => (cooling = false), 800);
    };

    let startX = 0;
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (cooling) return;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < SWIPE) return;
      if (Math.abs(dx) <= Math.abs(dy)) return; // mostly vertical -> scroll

      const currentIndex = SECTIONS.findIndex((s) => s.id === activeId);
      const nextIndex = dx < 0 ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex < 0 || nextIndex >= SECTIONS.length) return;

      cool();
      setActiveId(SECTIONS[nextIndex].id);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [activeId, setActiveId]);

  // Fade the current content out, swap it, reset scroll, then fade the new one in.
  useEffect(() => {
    if (activeId === prevActiveIdRef.current) return;
    prevActiveIdRef.current = activeId;

    setVisible(false);
    const swap = window.setTimeout(() => {
      setShownId(activeId);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true))
      );
    }, SWAP_MS);

    return () => window.clearTimeout(swap);
  }, [activeId]);

  return (
    <div className="relative h-full">
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto overscroll-contain"
      >
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
    </div>
  );
}

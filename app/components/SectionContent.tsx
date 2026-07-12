"use client";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { SectionId, useSection } from "./SectionContext";

const SWAP_MS = 300;

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
          className="text-zinc-400 transition-colors hover:text-white"
        >
          <IconBrandGithub size={24} stroke={2} aria-hidden="true" />
        </a>
        <a
          href="https://www.linkedin.com/in/gihan-ariyasena-267123357"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-zinc-400 transition-colors hover:text-white"
        >
          <IconBrandLinkedin size={24} stroke={2} aria-hidden="true" />
        </a>
        <a
          href="https://x.com/gihan_ahk"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
          className="text-zinc-400 transition-colors hover:text-white"
        >
          <IconBrandX size={24} stroke={2} aria-hidden="true" />
        </a>
        <a
          href="mailto:gihanariyasena526@gmail.com"
          aria-label="Email"
          className="text-zinc-400 transition-colors hover:text-white"
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
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_22rem]">
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
            <div className="flex items-center gap-3">
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

function ContactSection() {
  return (
    <h2 className="text-2xl font-bold tracking-tight text-white">Contact</h2>
  );
}

const CONTENT: Record<SectionId, React.ReactNode> = {
  home: <HomeSection />,
  about: <AboutSection />,
  projects: <ProjectsSection />,
  contact: <ContactSection />,
};

const EDGE = 2; // px tolerance for "at top/bottom" of the scroll area
const SWIPE = 60; // px of finger travel that counts as a swipe

export default function SectionContent() {
  const { activeId, go } = useSection();
  const [shownId, setShownId] = useState<SectionId>(activeId);
  const [visible, setVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fade the current content out, swap it, reset scroll, then fade the new one in.
  useEffect(() => {
    if (activeId === shownId) return;

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
  }, [activeId, shownId]);

  // Scroll the panel first; only swap sections once it's at the top/bottom edge.
  useEffect(() => {
    let cooling = false;
    const cool = () => {
      cooling = true;
      window.setTimeout(() => (cooling = false), 800);
    };

    const atTop = (el: HTMLElement) => el.scrollTop <= EDGE;
    const atBottom = (el: HTMLElement) =>
      el.scrollTop + el.clientHeight >= el.scrollHeight - EDGE;

    const onWheel = (e: WheelEvent) => {
      const el = scrollRef.current;
      if (!el) return;
      e.preventDefault(); // page itself never scrolls; we drive it manually
      const down = e.deltaY > 0;

      if (down ? !atBottom(el) : !atTop(el)) {
        // Line-mode wheels report tiny deltas; scale them to feel like pixels.
        el.scrollTop += e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
        return;
      }
      if (cooling || Math.abs(e.deltaY) < 12) return;
      cool();
      go(down ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      const el = scrollRef.current;
      if (!el || cooling) return;
      const down = e.key === "ArrowDown" || e.key === "PageDown";
      const up = e.key === "ArrowUp" || e.key === "PageUp";
      if (!down && !up) return;
      if (down ? atBottom(el) : atTop(el)) {
        cool();
        go(down ? 1 : -1);
      }
    };

    // Touch: let the panel scroll natively; a swipe past an edge changes section.
    let startY = 0;
    let fromTop = false;
    let fromBottom = false;
    const onTouchStart = (e: TouchEvent) => {
      const el = scrollRef.current;
      if (!el) return;
      startY = e.touches[0].clientY;
      fromTop = atTop(el);
      fromBottom = atBottom(el);
    };
    const onTouchEnd = (e: TouchEvent) => {
      const el = scrollRef.current;
      if (!el || cooling) return;
      const dy = e.changedTouches[0].clientY - startY;
      if (dy < -SWIPE && fromBottom && atBottom(el)) {
        cool();
        go(1);
      } else if (dy > SWIPE && fromTop && atTop(el)) {
        cool();
        go(-1);
      }
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
    <div ref={scrollRef} className="h-full overflow-y-auto overscroll-contain">
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
  );
}

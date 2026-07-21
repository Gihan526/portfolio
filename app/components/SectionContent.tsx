"use client";

import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import privateChatImg from "@/public/private-chat.png";
import umapImg from "@/public/G73FNmcbsAALdDn.jpg";
import leetcodeDiscordImg from "@/public/SCR-20260719-txef.png";
import { createPortal } from "react-dom";
import { SECTIONS, SectionId, useSection } from "./SectionContext";

const SWAP_MS = 300;
const SWIPE = 60; // px of horizontal travel that counts as a swipe

function HomeSection() {
  const { setActiveId } = useSection();

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

      <div className="mt-10 max-w-2xl border-t border-white/10 pt-8">
        <h2 className="text-xs uppercase tracking-wider text-zinc-500">
          Currently
        </h2>
        <div className="group mt-4">
          <a
            href="https://github.com/Gihan526/tsql"
            target="_blank"
            rel="noopener noreferrer"
            className="group/link relative flex flex-col gap-1.5 pr-5 sm:flex-row sm:items-center sm:gap-x-2.5 sm:pr-0"
          >
            <h3 className="text-lg text-zinc-100 transition-colors group-hover:text-white">
              tsql
            </h3>
            <span className="font-mono text-xs text-zinc-500">
              TS · from scratch
            </span>
            <IconArrowUpRight
              size={16}
              stroke={2}
              aria-hidden="true"
              className="absolute right-0 top-0 mt-1.5 shrink-0 text-zinc-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-300 sm:static sm:mt-0"
            />
          </a>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-zinc-500">
            Building a SQL database engine from scratch in TypeScript:
            storage, parsing, and query execution.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActiveId("projects")}
          className="group mt-8 inline-flex items-center gap-1.5 rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
        >
          Know More
          <IconArrowUpRight
            size={16}
            stroke={2}
            aria-hidden="true"
            className="text-zinc-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-300"
          />
        </button>
      </div>
    </>
  );
}

// Recruiter-relevant keyword: faint dotted underline at rest, solid
// underline + subtle highlight on hover.
function Kw({ children }: { children: React.ReactNode }) {
  return (
    <span className="cursor-default rounded-sm px-0.5 font-medium text-zinc-100 underline decoration-zinc-600 decoration-dotted decoration-1 underline-offset-[5px] transition-all duration-300 hover:bg-white/5 hover:text-white hover:decoration-zinc-300 hover:decoration-solid">
      {children}
    </span>
  );
}

function AboutSection() {
  return (
    <>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
        <div>
          <p className="text-lg leading-relaxed text-zinc-300">
            I got into programming through <Kw>machine learning</Kw>: I
            taught myself <Kw>Python</Kw>{" "}to understand how models actually
            learn from data, not just how to call a library. That curiosity
            pushed me to implement the UMAP algorithm from scratch, maths,
            nearest-neighbour logic, bugs and all. I&rsquo;m still learning
            ML and AI on my own, mostly by building projects that show me
            what I understand and what to improve.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-zinc-300">
            The same curiosity led me to <Kw>full-stack development</Kw>{" "}
            and <Kw>hackathons</Kw>, where I learned to ship working ideas
            under pressure. My teams went on to win <Kw>first place</Kw>{" "}at
            a university hackathon and the <Kw>Most Innovative Concept</Kw>{" "}
            award at the Hemas AIthon.
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
    image: privateChatImg,
  },
  {
    name: "umap-algorithm-from-scratch",
    href: "https://github.com/Gihan526/umap-algorithm-from-scratch",
    description: "UMAP dimensionality-reduction algorithm implemented from scratch.",
    tags: ["Python", "ML"],
    image: umapImg,
  },
  {
    name: "leetcode-discord-rich-presence",
    href: "https://github.com/Gihan526/leetcode-discord-rich-presence",
    description: "Shows your current LeetCode problem as a Discord status.",
    tags: ["JS", "Node.js"],
    image: leetcodeDiscordImg,
  },
];

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function ProjectHoverImage({
  src,
  alt,
  children,
}: {
  src: StaticImageData;
  alt: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isClient = useIsClient();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
      className="w-fit"
    >
      {children}
      {isClient &&
        hovered &&
        createPortal(
          <div
            className="pointer-events-none fixed z-50 w-72 overflow-hidden rounded-xl bg-black shadow-2xl shadow-black/50 sm:w-80"
            style={{
              left: 0,
              top: 0,
              transform: `translate3d(${pos.x + 16}px, ${pos.y - 100}px, 0)`,
            }}
          >
            <Image
              src={src}
              alt={alt}
              sizes="(max-width: 640px) 288px, 320px"
              style={{ width: "100%", height: "auto" }}
              className="block"
            />
          </div>,
          document.body
        )}
    </div>
  );
}

function ProjectsSection() {
  return (
    <ol className="max-w-2xl space-y-10">
      {PROJECTS.map((project) => (
        <li key={project.href} className="group">
          <ProjectHoverImage src={project.image} alt={project.name}>
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
          </ProjectHoverImage>
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

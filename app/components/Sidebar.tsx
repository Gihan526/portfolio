"use client";

import { IconMapPin } from "@tabler/icons-react";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { SECTIONS, useSection } from "./SectionContext";

export default function Sidebar() {
  const { activeId, setActiveId } = useSection();
  const navRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [box, setBox] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  // Measure the active button so the indicator can sit under (mobile) or beside
  // (desktop) it, and re-measure on resize / font load.
  useLayoutEffect(() => {
    const update = () => {
      const btn = buttonRefs.current[activeId];
      const nav = navRef.current;
      if (!btn || !nav) return;
      const navRect = nav.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setBox({
        left: btnRect.left - navRect.left,
        top: btnRect.top - navRect.top,
        width: btnRect.width,
        height: btnRect.height,
      });
    };

    update();
    window.addEventListener("resize", update);
    const id = document.fonts?.ready;
    if (id) id.then(update).catch(() => {});
    return () => window.removeEventListener("resize", update);
  }, [activeId]);

  return (
    <aside className="flex w-full min-w-0 flex-col gap-4 lg:w-64 lg:gap-0">
      <div className="flex items-center gap-3 lg:block">
        <Image
          src="/pfp.JPG"
          alt="Profile photo"
          width={96}
          height={96}
          priority
          className="h-12 w-12 shrink-0 rounded-full object-cover lg:h-24 lg:w-24"
        />
        <div className="min-w-0 lg:mt-6">
          <h1 className="truncate text-lg font-bold tracking-tight text-white lg:text-2xl">
            Gihan Ariyasena
          </h1>
          <p className="mt-0.5 truncate text-sm text-zinc-500 lg:mt-1 lg:text-lg">
            Software Engineer
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500 lg:text-sm">
            <IconMapPin
              size={14}
              stroke={2}
              aria-hidden="true"
              className="shrink-0"
            />
            Sri Lanka
          </p>
        </div>
      </div>

      <nav
        ref={navRef}
        className="mobile-nav relative flex min-w-0 flex-row flex-wrap items-center gap-x-3 gap-y-1 lg:mt-12 lg:flex-col lg:items-start lg:gap-6"
      >
        {box && (
          <>
            <span
              aria-hidden="true"
              className="absolute h-[2px] rounded-full bg-white transition-all duration-300 ease-out lg:hidden"
              style={{
                left: box.left,
                top: box.top + box.height,
                width: box.width,
              }}
            />
            <span
              aria-hidden="true"
              className="absolute hidden w-[2px] rounded-full bg-white transition-all duration-300 ease-out lg:block"
              style={{
                top: box.top,
                left: box.left - 12,
                height: box.height,
              }}
            />
          </>
        )}
        {SECTIONS.map((item) => {
          const isActive = activeId === item.id;

          return (
            <button
              key={item.id}
              ref={(el) => {
                buttonRefs.current[item.id] = el;
              }}
              type="button"
              onClick={() => setActiveId(item.id)}
              className={`nav-link min-h-11 shrink-0 py-2.5 text-left text-sm transition-colors sm:text-base lg:min-h-0 lg:py-0 lg:text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-4 focus-visible:ring-offset-black ${
                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {item.label}
            </button>
          );
        })}

        <a
          href="/Gihan_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link min-h-11 shrink-0 py-2.5 text-left text-sm text-zinc-500 transition-colors hover:text-zinc-300 sm:text-base lg:min-h-0 lg:py-0 lg:text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
        >
          Resume
        </a>
      </nav>
    </aside>
  );
}

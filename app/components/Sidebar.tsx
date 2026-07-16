"use client";

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
    <aside className="flex w-full flex-col gap-4 md:w-64 md:gap-0">
      <div className="flex items-center gap-3 md:block">
        <Image
          src="/pfp.JPG"
          alt="Profile photo"
          width={96}
          height={96}
          priority
          className="h-12 w-12 shrink-0 rounded-full object-cover md:h-24 md:w-24"
        />
        <div className="min-w-0 md:mt-6">
          <h1 className="truncate text-lg font-bold tracking-tight text-white md:text-2xl">
            Gihan Ariyasena
          </h1>
          <p className="mt-0.5 truncate text-sm text-zinc-500 md:mt-1 md:text-lg">
            Software Engineer
          </p>
        </div>
      </div>

      <nav
        ref={navRef}
        className="relative flex flex-row items-center gap-5 md:mt-12 md:flex-col md:items-start md:gap-6"
      >
        {box && (
          <>
            <span
              aria-hidden="true"
              className="absolute h-[2px] rounded-full bg-white transition-all duration-300 ease-out md:hidden"
              style={{
                left: box.left,
                top: box.top + box.height,
                width: box.width,
              }}
            />
            <span
              aria-hidden="true"
              className="absolute hidden w-[2px] rounded-full bg-white transition-all duration-300 ease-out md:block"
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
              className={`py-2.5 text-left text-base transition-colors md:py-0 md:text-xl ${
                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

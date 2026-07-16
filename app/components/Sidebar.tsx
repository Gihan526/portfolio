"use client";

import Image from "next/image";
import { SECTIONS, useSection } from "./SectionContext";

export default function Sidebar() {
  const { activeId, setActiveId } = useSection();

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

      <nav className="flex flex-row items-center gap-5 md:mt-12 md:flex-col md:items-start md:gap-6">
        {SECTIONS.map((item) => {
          const isActive = activeId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              className={`py-2.5 text-left text-base transition-colors md:py-0 md:text-xl ${
                isActive
                  ? "font-bold text-white"
                  : "text-zinc-500 hover:text-zinc-300"
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

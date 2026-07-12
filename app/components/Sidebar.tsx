"use client";

import Image from "next/image";
import { SECTIONS, useSection } from "./SectionContext";

export default function Sidebar() {
  const { activeId, setActiveId } = useSection();

  return (
    <aside className="flex w-full flex-col md:w-64">
      <Image
        src="/pfp.JPG"
        alt="Profile photo"
        width={96}
        height={96}
        priority
        className="h-24 w-24 rounded-full object-cover"
      />

      <h1 className="mt-6 text-2xl font-bold tracking-tight text-white">
        Gihan Ariyasena
      </h1>
      <p className="mt-1 text-lg text-zinc-500">Software Engineer</p>

      <nav className="mt-12 flex flex-col items-start gap-6">
        {SECTIONS.map((item) => {
          const isActive = activeId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              className={`text-left text-xl transition-colors ${
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

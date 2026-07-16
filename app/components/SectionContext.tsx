"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

type SectionContextValue = {
  activeId: SectionId;
  setActiveId: (id: SectionId) => void;
};

const SectionContext = createContext<SectionContextValue | null>(null);

export function useSection() {
  const ctx = useContext(SectionContext);
  if (!ctx) throw new Error("useSection must be used within <SectionProvider>");
  return ctx;
}

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(0);

  const setActiveId = useCallback((id: SectionId) => {
    const next = SECTIONS.findIndex((s) => s.id === id);
    if (next !== -1) setIndex(next);
  }, []);

  const value = useMemo(
    () => ({ activeId: SECTIONS[index].id, setActiveId }),
    [index, setActiveId]
  );

  return (
    <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
  );
}

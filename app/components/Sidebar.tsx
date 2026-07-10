"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Sidebar() {
  const pathname = usePathname();

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

      <nav className="mt-12 flex flex-col gap-6">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xl transition-colors ${
                isActive
                  ? "font-bold text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

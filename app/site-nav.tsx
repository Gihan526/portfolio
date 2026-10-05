"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const currentSection = pathname;

  return (
    <nav className="site-nav" aria-label="Main navigation" style={{ viewTransitionName: "site-nav" }}>
      {links.map((link, index) => (
        <Link
          key={link.href}
          href={link.href}
          transitionTypes={[index > links.findIndex((item) => item.href === pathname) ? "nav-forward" : "nav-back"]}
          aria-current={currentSection === link.href ? "location" : undefined}
        >
          {link.label}
          <svg
            className="nav-underline"
            viewBox="0 0 64 8"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M1 4 Q5 0 9 4 T17 4 T25 4 T33 4 T41 4 T49 4 T57 4 T63 4" />
          </svg>
        </Link>
      ))}
    </nav>
  );
}

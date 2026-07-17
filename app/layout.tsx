import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { SectionProvider } from "./components/SectionContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gihan Ariyasena",
  description: "Portfolio of Gihan Ariyasena",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden overscroll-none bg-black text-white">
        <SectionProvider>
          <div className="flex h-full flex-col">
            <div className="relative">
              <div
                className="relative h-[32vh] min-h-56 w-full shrink-0 overflow-hidden md:h-[44vh] md:min-h-80"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 20%, rgba(0,0,0,0.7) 48%, rgba(0,0,0,0.35) 68%, rgba(0,0,0,0.12) 85%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 20%, rgba(0,0,0,0.7) 48%, rgba(0,0,0,0.35) 68%, rgba(0,0,0,0.12) 85%, transparent 100%)",
                }}
              >
                <Image
                  src="/ascii-magic-2.png"
                  alt="ASCII terrain"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-[center_30%] select-none"
                />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 z-20 flex justify-center md:hidden"
                style={{ top: "55%" }}
              >
                <div className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm">
                  <IconChevronLeft
                    size={14}
                    stroke={2}
                    className="swipe-hint-left text-zinc-300"
                  />
                  <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-300">
                    swipe
                  </span>
                  <IconChevronRight
                    size={14}
                    stroke={2}
                    className="swipe-hint-right text-zinc-300"
                  />
                </div>
              </div>
            </div>
            <div className="relative mx-auto -mt-10 flex w-full max-w-360 min-h-0 flex-1 flex-col gap-6 px-6 pb-6 md:flex-row md:gap-12 md:pb-10">
              <div className="shrink-0 md:h-fit">
                <Sidebar />
              </div>
              <main className="min-h-0 flex-1 md:mt-30 md:border-l md:border-white/10 md:pl-12">
                {children}
              </main>
            </div>
          </div>
        </SectionProvider>
      </body>
    </html>
  );
}

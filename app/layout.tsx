import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0a0a0a",
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
      <body className="min-h-dvh overflow-x-hidden bg-black text-white lg:overflow-hidden">
        <SectionProvider>
          <div className="flex min-h-dvh flex-col lg:h-dvh">
            <div className="relative">
              <div
                className="hero-art relative h-[clamp(10rem,32dvh,28rem)] w-full shrink-0 overflow-hidden lg:h-[clamp(18rem,44dvh,40rem)]"
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
                className="pointer-events-none absolute inset-x-0 z-20 flex justify-center lg:hidden"
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
            <div className="page-shell relative mx-auto -mt-8 flex min-h-0 w-full max-w-[90rem] flex-none flex-col gap-6 px-4 pb-6 sm:-mt-10 sm:px-6 lg:flex-1 lg:flex-row lg:gap-12 lg:pb-10 xl:gap-16">
              <div className="min-w-0 shrink-0 lg:h-fit lg:w-64">
                <Sidebar />
              </div>
              <main className="min-w-0 flex-none lg:mt-[clamp(3rem,12dvh,7.5rem)] lg:flex-1 lg:min-h-0 lg:border-l lg:border-white/10 lg:pl-12">
                {children}
              </main>
            </div>
          </div>
        </SectionProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Sidebar from "./components/Sidebar";

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
      <body className="min-h-full bg-black text-white">
        <div
          className="relative h-[44vh] min-h-80 w-full overflow-hidden"
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
        <div className="relative mx-auto -mt-10 flex w-full max-w-5xl flex-col gap-12 px-6 pb-16 md:flex-row md:gap-12 md:pb-24">
          <div className="md:sticky md:top-24 md:h-fit">
            <Sidebar />
          </div>
          <main className="flex-1 md:mt-[7.5rem] md:border-l md:border-white/10 md:pl-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

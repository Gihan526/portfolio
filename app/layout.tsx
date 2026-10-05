import type { Metadata, Viewport } from "next";
import "./globals.css";
import SwipeNavigation from "./swipe-navigation";

export const metadata: Metadata = {
  title: "Gihan Ariyasena",
  description:
    "Gihan Ariyasena — Software Developer & Computer Science Student.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SwipeNavigation />
        {children}
      </body>
    </html>
  );
}

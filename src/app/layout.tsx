import type { Metadata, Viewport } from "next";
import { Figtree, Newsreader } from "next/font/google";

import { brand } from "@/data/content";

import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

// Variable optical size so display headlines get the fine, high-contrast cut.
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${brand.name} · Cue ring`,
  description: brand.description,
  // Layout study of a real company's site: keep it out of search.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    title: brand.name,
    description: brand.description,
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f5eee1",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${figtree.variable} ${newsreader.variable}`} data-intro="preparing">
      <body>{children}</body>
    </html>
  );
}

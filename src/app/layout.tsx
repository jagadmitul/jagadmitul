import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NO_FLASH_SCRIPT, PaletteProvider } from "@/lib/palette";
import { LenisProvider } from "@/lib/lenis";
import { AskMitul } from "@/components/chrome/AskMitul";
import { Background3D } from "@/components/visual/Background3D";
import { CustomCursor } from "@/components/visual/CustomCursor";
import { ScrollProgress } from "@/components/visual/ScrollProgress";
import { PageTransition } from "@/components/motion/PageTransition";
import { RouteCurtain } from "@/components/motion/RouteCurtain";

// Instrument Sans — UI sans with subtle character. Designed by Instrument
// for use with Instrument Serif. Distinctive without being loud, and
// specifically NOT in the Inter/Geist/Manrope AI-default rotation.
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Instrument Serif — display + italic accents. Big personality in the
// italic; paired with Instrument Sans by design.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mitul Jagad — Senior Full Stack Developer & AI Agents Engineer",
  description:
    "Senior Full Stack Developer with 5+ years building production AI agents and full-stack systems for SaaS and FinTech startups. Open for contract work.",
  metadataBase: new URL("https://jagadmitul.com"),
  openGraph: {
    title: "Mitul Jagad — Senior Full Stack & AI Agents Engineer",
    description:
      "Production AI agents, workflow automation, and full-stack systems. Available for contract.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-palette="default"
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body className="bg-paper text-ink min-h-screen app-fade-in">
        <PaletteProvider>
          <LenisProvider>
            <Background3D />
            <ScrollProgress />
            <CustomCursor />
            <PageTransition>{children}</PageTransition>
            <RouteCurtain />
            <AskMitul />
          </LenisProvider>
        </PaletteProvider>
      </body>
    </html>
  );
}

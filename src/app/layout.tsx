import type { Metadata } from "next";
import { Bricolage_Grotesque, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NO_FLASH_SCRIPT, PaletteProvider } from "@/lib/palette";
import { LenisProvider } from "@/lib/lenis";
import { AskMitul } from "@/components/chrome/AskMitul";
import { Background3D } from "@/components/visual/Background3D";
import { CustomCursor } from "@/components/visual/CustomCursor";
import { ScrollProgress } from "@/components/visual/ScrollProgress";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
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
      className={`${bricolage.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body className="bg-paper text-ink min-h-screen">
        <PaletteProvider>
          <LenisProvider>
            <Background3D />
            <ScrollProgress />
            <CustomCursor />
            {children}
            <AskMitul />
          </LenisProvider>
        </PaletteProvider>
      </body>
    </html>
  );
}

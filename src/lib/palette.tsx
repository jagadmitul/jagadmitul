"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const PALETTES = [
  "default",
  "dark",
  "vermilion",
  "sage",
  "plum",
  "mono",
] as const;

export type Palette = (typeof PALETTES)[number];

export const PALETTE_LABELS: Record<Palette, string> = {
  default: "Light",
  dark: "Dark",
  vermilion: "Vermilion",
  sage: "Sage",
  plum: "Plum",
  mono: "Mono",
};

/**
 * Visual swatch for each palette in the dropdown / trigger pip.
 * Dark gets a half-and-half black/white moon-style fill via a CSS
 * gradient so it's visible against any background - pure-black on
 * black trigger button was invisible.
 */
export const PALETTE_SWATCH: Record<Palette, string> = {
  default: "#4770FF",
  dark: "linear-gradient(135deg, #0A0A0A 50%, #F0F2F5 50%)",
  vermilion: "#D14424",
  sage: "#5C7A4F",
  plum: "#7A2E5C",
  mono: "linear-gradient(135deg, #0A0A0A 50%, #FAFAFA 50%)",
};

export const STORAGE_KEY = "mj.palette";
export const DEFAULT_PALETTE: Palette = "default";

function readInitialPalette(): Palette {
  if (typeof document === "undefined") return DEFAULT_PALETTE;
  const attr = document.documentElement.dataset.palette;
  if (attr && (PALETTES as readonly string[]).includes(attr)) {
    return attr as Palette;
  }
  return DEFAULT_PALETTE;
}

type Ctx = {
  palette: Palette;
  setPalette: (p: Palette) => void;
};

const PaletteContext = createContext<Ctx | null>(null);

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPaletteState] = useState<Palette>(readInitialPalette);

  useEffect(() => {
    document.documentElement.dataset.palette = palette;
    try {
      window.localStorage.setItem(STORAGE_KEY, palette);
    } catch {
      /* storage unavailable */
    }
  }, [palette]);

  const setPalette = useCallback((p: Palette) => setPaletteState(p), []);

  const value = useMemo(() => ({ palette, setPalette }), [palette, setPalette]);

  return (
    <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>
  );
}

export function usePalette(): Ctx {
  const ctx = useContext(PaletteContext);
  if (!ctx) {
    throw new Error("usePalette must be used inside <PaletteProvider>");
  }
  return ctx;
}

/**
 * Inline-script source that runs in <head> before React hydrates,
 * reading the persisted palette and setting <html data-palette="...">.
 * Avoids a flash of the default theme.
 */
export const NO_FLASH_SCRIPT = `
try {
  var p = localStorage.getItem('${STORAGE_KEY}');
  var allowed = ${JSON.stringify(PALETTES)};
  if (p && allowed.indexOf(p) !== -1) {
    document.documentElement.dataset.palette = p;
  }
} catch (e) {}
// Pin scroll behaviour to manual + force scrollTop=0 BEFORE any layout
// happens. Browser's auto scroll restoration was firing after hydration
// and producing a small downward scroll on every refresh because the
// page's final height differed from the height at restoration time
// (fonts, ScrollReveal initial state, R3F canvas mount).
try {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
} catch (e) {}
`.trim();

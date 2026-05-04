"use client";

import { useSyncExternalStore } from "react";
import {
  PALETTES,
  PALETTE_LABELS,
  PALETTE_SWATCH,
  usePalette,
} from "@/lib/palette";

function useIsClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function PaletteChip() {
  const { palette, setPalette } = usePalette();
  const isClient = useIsClient();
  if (!isClient) return null;

  return (
    <div
      className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full border border-hairline bg-paper-2/85 px-3 py-2 backdrop-blur shadow-card"
      role="group"
      aria-label="Choose color theme"
    >
      <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-ink-mute hidden sm:inline">
        {PALETTE_LABELS[palette]}
      </span>
      <div className="flex items-center gap-1.5">
        {PALETTES.map((p) => {
          const active = p === palette;
          return (
            <button
              key={p}
              type="button"
              onClick={() => setPalette(p)}
              aria-label={`Switch to ${PALETTE_LABELS[p]} theme`}
              aria-pressed={active}
              title={PALETTE_LABELS[p]}
              className="block h-4 w-4 rounded-full transition-transform hover:scale-110"
              style={{
                background: PALETTE_SWATCH[p],
                boxShadow: active
                  ? `0 0 0 2px var(--paper-2), 0 0 0 3px var(--ink)`
                  : `0 0 0 1px var(--hairline)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, Palette } from "lucide-react";
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

export function PaletteDropdown() {
  const { palette, setPalette } = usePalette();
  const isClient = useIsClient();
  if (!isClient) {
    return (
      <button
        type="button"
        aria-label="Theme picker"
        className="grid place-items-center w-10 h-10 rounded-lg bg-paper text-ink"
      >
        <Palette size={16} />
      </button>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="Choose theme"
          className="group grid place-items-center w-10 h-10 rounded-lg bg-paper text-ink hover:bg-primary hover:text-primary-ink transition relative"
        >
          <Palette size={16} />
          <span
            className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-paper-2"
            style={{ background: PALETTE_SWATCH[palette] }}
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-[80] min-w-[200px] rounded-xl border border-hairline bg-paper-2 p-1.5 shadow-2xl"
          style={{
            // Solid bg always — bg-paper-2 alone can feel washed against the
            // ambient gradient in dark mode. Layered with paper-2 again for
            // extra opacity safety.
            backgroundColor: "var(--paper-2)",
          }}
        >
          <div className="px-2 py-1.5 text-[0.6rem] font-mono uppercase tracking-[0.18em] text-ink-mute">
            THEME
          </div>
          {PALETTES.map((p) => {
            const active = p === palette;
            return (
              <DropdownMenu.Item
                key={p}
                onSelect={() => setPalette(p)}
                className={`flex items-center gap-3 px-2 py-2 mt-1 first:mt-0 rounded-lg text-sm outline-none cursor-pointer transition ${
                  active
                    ? "bg-primary/15 text-primary ring-1 ring-primary/25"
                    : "text-ink hover:bg-primary/10 data-[highlighted]:bg-primary/10"
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full ring-1 ring-hairline flex-shrink-0"
                  style={{ background: PALETTE_SWATCH[p] }}
                />
                <span className="flex-1 font-medium">{PALETTE_LABELS[p]}</span>
                {active && <Check size={14} className="text-primary" />}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

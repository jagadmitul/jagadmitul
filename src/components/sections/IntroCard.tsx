"use client";

import { useState } from "react";
import { Check, Copy, Download, Github, Linkedin } from "lucide-react";
import { PROFILE } from "@/lib/data";

/**
 * Intro card — the leftmost column of the home page. Now uses a clean
 * professional gradient block + monogram instead of the (rejected) 3D blob,
 * and the tagline is hand-written without the laptop emoji.
 */
export function IntroCard() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(PROFILE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 shadow-card h-full flex flex-col">
      {/* Profile placeholder — clean gradient + monogram + status pill */}
      <div className="aspect-[6/4] overflow-hidden rounded-xl relative">
        {/* Soft gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--primary) 28%, var(--paper-2)) 0%, var(--paper-2) 50%, color-mix(in srgb, var(--primary) 14%, var(--paper-2)) 100%)",
          }}
        />
        {/* Subtle decorative ring */}
        <div
          className="absolute inset-6 rounded-full opacity-40"
          style={{
            background: "transparent",
            border: "1px dashed var(--primary)",
          }}
        />
        {/* Monogram — Instrument Serif italic. Single-weight (400) font
            with a striking, characterful italic; reads as editorial/display
            even without a heavy weight. */}
        <div className="absolute inset-0 grid place-items-center">
          <div
            className="font-display text-primary leading-none select-none"
            style={{
              fontStyle: "italic",
              fontSize: "clamp(6rem, 11vw, 10rem)",
              letterSpacing: "-0.03em",
            }}
          >
            MJ
          </div>
        </div>
        {/* Status pill */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-2/95 backdrop-blur px-2.5 py-1 text-[0.65rem] font-mono uppercase tracking-wider text-ink">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            OPEN TO WORK
          </span>
        </div>
        {/* Capacity pill */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-paper-2/95 backdrop-blur px-2.5 py-1 text-[0.65rem] font-mono uppercase tracking-wider text-ink-mute">
            ~30 hrs/wk
          </span>
        </div>
      </div>

      <h1 className="mt-5 text-2xl font-semibold text-ink leading-tight">
        Mitul Jagad
      </h1>
      <p className="mt-2 text-base text-ink-mute leading-relaxed">
        <span className="text-ink font-medium">Senior Full Stack Developer</span>{" "}
        specializing in <span className="text-primary font-medium">AI agents</span> and workflow automation. {PROFILE.yearsExperience}+ years shipping production systems for SaaS &amp; FinTech startups.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <a
          href={PROFILE.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-ink hover:bg-primary-hover transition"
        >
          <Download size={14} />
          Resume
        </a>
        <button
          type="button"
          onClick={copyEmail}
          data-cursor-label={copied ? "COPIED" : "COPY"}
          className="inline-flex items-center gap-2 rounded-lg border border-hairline bg-transparent px-4 py-3 text-sm font-medium text-ink hover:bg-paper transition"
          aria-label="Copy email address"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy Email"}
        </button>
      </div>

      <div className="mt-5 flex items-center gap-2 pt-5 border-t border-hairline">
        <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-ink-mute mr-1">
          FOLLOW
        </span>
        <a
          href={PROFILE.linkedin}
          aria-label="LinkedIn"
          data-cursor-label="LINKEDIN"
          className="grid place-items-center w-8 h-8 rounded-lg bg-paper text-ink hover:bg-primary hover:text-primary-ink transition hover:scale-110"
        >
          <Linkedin size={14} />
        </a>
        <a
          href={PROFILE.github}
          aria-label="GitHub"
          data-cursor-label="GITHUB"
          className="grid place-items-center w-8 h-8 rounded-lg bg-paper text-ink hover:bg-primary hover:text-primary-ink transition hover:scale-110"
        >
          <Github size={14} />
        </a>
      </div>
    </div>
  );
}

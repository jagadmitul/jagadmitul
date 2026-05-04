import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "@/lib/data";

export function Footer() {
  return (
    <footer className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 shadow-card lg:p-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
          <Link href="/" className="text-2xl font-semibold text-ink">
            Mitul<span className="text-primary">Jagad</span>
          </Link>
          <p className="mt-3 text-sm text-ink-mute leading-relaxed max-w-xs">
            Senior Full Stack Developer & AI Agents Engineer. Building production systems for SaaS &amp; FinTech.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-ink-mute mb-3">
            CONTACT
          </h4>
          <a
            href={`mailto:${PROFILE.email}`}
            className="block text-sm text-ink hover:text-primary transition mb-1"
          >
            {PROFILE.email}
          </a>
          <p className="text-sm text-ink-mute">{PROFILE.location}</p>
          <p className="text-xs font-mono text-ink-mute mt-2 tracking-wide">
            {PROFILE.timezone} · response &lt; 24h
          </p>
        </div>

        <div>
          <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-ink-mute mb-3">
            FOLLOW
          </h4>
          <div className="flex items-center gap-2">
            <a
              href={PROFILE.github}
              aria-label="GitHub"
              className="grid place-items-center w-9 h-9 rounded-lg bg-paper text-ink hover:bg-primary hover:text-primary-ink transition"
            >
              <Github size={16} />
            </a>
            <a
              href={PROFILE.linkedin}
              aria-label="LinkedIn"
              className="grid place-items-center w-9 h-9 rounded-lg bg-paper text-ink hover:bg-primary hover:text-primary-ink transition"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              aria-label="Email"
              className="grid place-items-center w-9 h-9 rounded-lg bg-paper text-ink hover:bg-primary hover:text-primary-ink transition"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-hairline flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-ink-mute uppercase tracking-wider">
        <span>© 2026 — Mitul Jagad</span>
        <span>Built in Surat · Ships Global</span>
      </div>
    </footer>
  );
}

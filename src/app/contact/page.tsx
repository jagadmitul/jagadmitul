"use client";

import { useState } from "react";
import {
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";
import { PageShell } from "@/components/chrome/PageShell";
import { IntroCard } from "@/components/sections/IntroCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { PROFILE } from "@/lib/data";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    budget: "",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = `Hi Mitul,\n\n${form.message}\n\nBudget: ${form.budget}\n\n${form.name}\n${form.email}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      form.subject || "Project brief",
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <PageShell>
      <main className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6 lg:auto-rows-[minmax(120px,auto)]">
        {/* Col 1, rows 1-3 - IntroCard (matches home bento) */}
        <ScrollReveal className="lg:row-span-3 h-full">
          <TiltCard max={5}>
            <IntroCard />
          </TiltCard>
        </ScrollReveal>

        {/* Cols 2-3, rows 1-3 - main contact form (the headline element) */}
        <ScrollReveal className="lg:col-span-2 lg:row-span-3 h-full" delay={0.05}>
          <TiltCard max={3}>
            <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 lg:p-10 shadow-card h-full flex flex-col">
              <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
                CONTACT
              </span>
              <h1 className="mt-2 text-3xl lg:text-4xl font-semibold text-ink leading-tight">
                Let&apos;s <span className="text-primary">work together</span>
              </h1>
              <p className="mt-3 text-base text-ink-mute max-w-2xl">
                Send a few lines on what you&apos;re building, your stack, and
                your rough timeline. I reply within{" "}
                {PROFILE.responseSla.toLowerCase()}.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4 flex-1 flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field
                    label="Name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    required
                  />
                  <Field
                    label="Email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    required
                  />
                  <Field
                    label="Subject"
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={(v) => setForm({ ...form, subject: v })}
                  />
                  <SelectField
                    label="Budget"
                    value={form.budget}
                    onChange={(v) => setForm({ ...form, budget: v })}
                    options={[
                      { value: "", label: "Select range" },
                      { value: "$2k-5k (consult)", label: "$2k-5k (1-week consult)" },
                      { value: "$5k-15k (small build)", label: "$5k-15k (small build)" },
                      { value: "$15k-50k (medium)", label: "$15k-50k (medium)" },
                      { value: "$50k+ (long contract)", label: "$50k+ (long contract)" },
                      { value: "FT role", label: "Full-time role" },
                    ]}
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-mute mb-2">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    rows={6}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    required
                    placeholder="What are you building? What's the timeline? What's the immediate need?"
                    className="block w-full flex-1 rounded-lg border border-hairline bg-paper px-4 py-3 text-sm text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="self-start inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-4 text-sm font-medium text-primary-ink hover:bg-primary-hover transition"
                >
                  {submitted ? (
                    <>
                      <Check size={16} /> Opening your email client…
                    </>
                  ) : (
                    <>
                      Send brief <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </TiltCard>
        </ScrollReveal>

        {/* Row 4: 3 small cards spanning across cols 1-3 */}
        <ScrollReveal className="h-full" delay={0.1}>
          <TiltCard max={5}>
            <a
              href={`mailto:${PROFILE.email}`}
              data-cursor-label="EMAIL"
              className="group block rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 shadow-card h-full hover:border-primary/40 transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="grid place-items-center w-10 h-10 rounded-xl bg-primary text-primary-ink">
                  <Mail size={18} />
                </div>
                <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
                  EMAIL
                </span>
              </div>
              <p className="text-base text-ink font-medium break-all leading-snug">
                {PROFILE.email}
              </p>
              <p className="text-xs text-ink-mute mt-2">
                Fastest way. {PROFILE.responseSla} reply.
              </p>
            </a>
          </TiltCard>
        </ScrollReveal>

        <ScrollReveal className="h-full" delay={0.15}>
          <TiltCard max={5}>
            <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 shadow-card h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="grid place-items-center w-10 h-10 rounded-xl bg-primary text-primary-ink">
                  <MapPin size={18} />
                </div>
                <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
                  LOCATION
                </span>
              </div>
              <p className="text-base text-ink font-medium leading-snug">
                {PROFILE.location}
              </p>
              <p className="text-xs text-ink-mute mt-2 inline-flex items-center gap-1.5">
                <Clock size={11} />
                {PROFILE.timezone} · async-friendly
              </p>
            </div>
          </TiltCard>
        </ScrollReveal>

        <ScrollReveal className="h-full" delay={0.2}>
          <TiltCard max={5}>
            <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 shadow-card h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="grid place-items-center w-10 h-10 rounded-xl bg-primary text-primary-ink">
                  <Sparkles size={18} />
                </div>
                <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
                  AVAILABILITY
                </span>
              </div>
              <p className="text-base text-ink font-medium leading-snug">
                Open · {PROFILE.capacity}
              </p>
              <p className="text-xs text-ink-mute mt-2">
                Senior contracts · 3-6 months · Right FT role
              </p>
            </div>
          </TiltCard>
        </ScrollReveal>

        {/* Row 5: social/follow strip - 3 cards */}
        <ScrollReveal className="h-full" delay={0.15}>
          <TiltCard max={5}>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="LINKEDIN"
              className="group flex items-center gap-4 rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-5 shadow-card h-full hover:border-primary/40 transition"
            >
              <div className="grid place-items-center w-12 h-12 rounded-xl bg-paper text-ink group-hover:bg-primary group-hover:text-primary-ink transition">
                <Linkedin size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-ink">LinkedIn</div>
                <div className="text-[0.7rem] font-mono text-ink-mute uppercase tracking-wider truncate">
                  /in/jagadmitul
                </div>
              </div>
            </a>
          </TiltCard>
        </ScrollReveal>

        <ScrollReveal className="h-full" delay={0.2}>
          <TiltCard max={5}>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="GITHUB"
              className="group flex items-center gap-4 rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-5 shadow-card h-full hover:border-primary/40 transition"
            >
              <div className="grid place-items-center w-12 h-12 rounded-xl bg-paper text-ink group-hover:bg-primary group-hover:text-primary-ink transition">
                <Github size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-ink">GitHub</div>
                <div className="text-[0.7rem] font-mono text-ink-mute uppercase tracking-wider truncate">
                  /jagadmitul
                </div>
              </div>
            </a>
          </TiltCard>
        </ScrollReveal>

        <ScrollReveal className="h-full" delay={0.25}>
          <TiltCard max={5}>
            <a
              href={`mailto:${PROFILE.email}?subject=${encodeURIComponent("Quick call?")}`}
              data-cursor-label="BOOK"
              className="group flex items-center gap-4 rounded-2xl bg-ink p-5 shadow-card h-full hover:bg-primary transition relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 80% 20%, var(--primary), transparent 60%)",
                }}
              />
              <div className="grid place-items-center w-12 h-12 rounded-xl bg-primary text-primary-ink relative z-10">
                <Calendar size={20} />
              </div>
              <div className="flex-1 min-w-0 relative z-10">
                <div className="text-sm font-semibold text-paper">
                  Book a 30-min intro
                </div>
                <div className="text-[0.7rem] font-mono text-paper/70 uppercase tracking-wider">
                  Email me a time →
                </div>
              </div>
            </a>
          </TiltCard>
        </ScrollReveal>
      </main>
    </PageShell>
  );
}

function Field({
  label,
  type,
  name,
  value,
  onChange,
  required,
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wider text-ink-mute mb-2">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="block w-full rounded-lg border border-hairline bg-paper px-4 py-3 text-sm text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wider text-ink-mute mb-2">
        {label}
      </label>
      {/* Custom select - strip native chevron with appearance-none, render
          our own ChevronDown so it matches the design system in any palette. */}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full appearance-none rounded-lg border border-hairline bg-paper px-4 py-3 pr-10 text-sm text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-mute pointer-events-none"
        />
      </div>
    </div>
  );
}

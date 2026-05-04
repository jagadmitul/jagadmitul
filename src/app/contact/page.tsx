"use client";

import { useState } from "react";
import { Mail, MapPin, Clock, Send, Check } from "lucide-react";
import { PageShell } from "@/components/chrome/PageShell";
import { IntroCard } from "@/components/sections/IntroCard";
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
    // For now: open mailto with prefilled subject + body. Real email backend
    // would post to /api/contact and send via Resend / similar.
    const body = `Hi Mitul,\n\n${form.message}\n\nBudget: ${form.budget}\n\n— ${form.name}\n${form.email}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      form.subject || "Project brief",
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <PageShell>
      <main className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 flex flex-col gap-4 lg:gap-6">
            <IntroCard />

            {/* Contact details card */}
            <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 shadow-card">
              <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
                REACH ME
              </span>
              <div className="mt-4 space-y-3">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="grid place-items-center w-10 h-10 rounded-lg bg-paper group-hover:bg-primary group-hover:text-primary-ink transition">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-ink-mute uppercase tracking-wider">
                      EMAIL
                    </div>
                    <div className="text-sm text-ink group-hover:text-primary transition">
                      {PROFILE.email}
                    </div>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="grid place-items-center w-10 h-10 rounded-lg bg-paper">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-ink-mute uppercase tracking-wider">
                      BASED IN
                    </div>
                    <div className="text-sm text-ink">{PROFILE.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="grid place-items-center w-10 h-10 rounded-lg bg-paper">
                    <Clock size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-ink-mute uppercase tracking-wider">
                      TIMEZONE
                    </div>
                    <div className="text-sm text-ink">
                      {PROFILE.timezone} · async friendly
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 lg:p-10 shadow-card">
            <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
              CONTACT
            </span>
            <h1 className="mt-2 text-3xl lg:text-4xl font-semibold text-ink leading-tight">
              Let&apos;s 👋 <span className="text-primary">Work Together</span>
            </h1>
            <p className="mt-3 text-base text-ink-mute max-w-2xl">
              Send a few lines on what you&apos;re building, your stack, and your rough timeline. I reply within {PROFILE.responseSla.toLowerCase()}.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-mute mb-2">
                    Budget
                  </label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="block w-full rounded-lg border border-hairline bg-paper px-4 py-3 text-sm text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  >
                    <option value="">Select range</option>
                    <option value="$2k-5k (consult)">$2k–5k (1-week consult)</option>
                    <option value="$5k-15k (small build)">$5k–15k (small build)</option>
                    <option value="$15k-50k (medium)">$15k–50k (medium)</option>
                    <option value="$50k+ (long contract)">$50k+ (long contract)</option>
                    <option value="FT role">Full-time role</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-mute mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  placeholder="What are you building? What's the timeline? What's the immediate need?"
                  className="block w-full rounded-lg border border-hairline bg-paper px-4 py-3 text-sm text-ink focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-4 text-sm font-medium text-primary-ink hover:bg-primary-hover transition"
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
        </div>
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

"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { ArrowUp, MessageCircle, Sparkles, X } from "lucide-react";
import { CHATBOT_PROMPTS, matchPrompt } from "@/lib/data";

type Turn =
  | { kind: "intro"; text: string }
  | { kind: "user"; text: string }
  | { kind: "mitul"; text: string };

const INTRO: Turn = {
  kind: "intro",
  text: "Hey — this is a scripted Mitul, not the real one. Pick a question or type your own. I'll route to the closest answer; if I don't have one, I'll nudge you to email me directly.",
};

export function AskMitul() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([INTRO]);
  const [draft, setDraft] = useState("");

  function ask(promptText: string, answerText: string) {
    setTurns((prev) => [
      ...prev,
      { kind: "user", text: promptText },
      { kind: "mitul", text: answerText },
    ]);
  }

  function askFreeform() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    const reply = matchPrompt(trimmed);
    setTurns((prev) => [
      ...prev,
      { kind: "user", text: trimmed },
      { kind: "mitul", text: reply },
    ]);
    setDraft("");
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} modal={false}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-primary-ink shadow-lg transition-transform hover:scale-105 font-mono text-xs tracking-wider uppercase"
          aria-label="Ask Mitul"
        >
          <Sparkles size={14} strokeWidth={2.2} />
          <span>Ask Mitul</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        {/* No Dialog.Overlay — the chatbot is non-modal so the rest of the
            portfolio stays fully visible, scrollable, and clickable while
            the panel is open. */}
        <Dialog.Content
          aria-describedby={undefined}
          onInteractOutside={(e) => e.preventDefault()}
          className="fixed bottom-4 right-4 z-[70] flex w-[min(440px,calc(100vw-2rem))] max-h-[min(680px,calc(100vh-2rem))] flex-col rounded-3xl border-2 border-primary/30 shadow-2xl outline-none overflow-hidden"
          style={{
            // Fully opaque solid panel.
            backgroundColor: "var(--paper-2)",
          }}
        >
          {/* HEADER — solid */}
          <div
            className="flex items-center justify-between px-5 py-4 border-b border-hairline"
            style={{ backgroundColor: "var(--paper-2)" }}
          >
            <div className="flex items-center gap-3">
              <div className="grid place-items-center w-9 h-9 rounded-xl bg-primary text-primary-ink shadow">
                <MessageCircle size={16} />
              </div>
              <div className="flex flex-col">
                <Dialog.Title className="text-base font-semibold text-ink leading-tight">
                  Ask Mitul
                </Dialog.Title>
                <span className="text-[0.65rem] font-mono uppercase tracking-[0.14em] text-ink-mute mt-0.5">
                  scripted, not generative
                </span>
              </div>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-full p-2 text-ink-mute hover:bg-primary/10 hover:text-ink transition"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </Dialog.Close>
          </div>

          {/* BODY — solid same color as header so the panel reads as one surface */}
          <div
            className="flex-1 overflow-y-auto px-5 py-4 space-y-3"
            style={{ backgroundColor: "var(--paper-2)" }}
          >
            {turns.map((turn, i) => {
              if (turn.kind === "intro") {
                return (
                  <p
                    key={i}
                    className="text-[0.85rem] text-ink-mute leading-relaxed bg-paper p-3 rounded-xl border border-hairline"
                  >
                    {turn.text}
                  </p>
                );
              }
              if (turn.kind === "user") {
                return (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-[0.9rem] text-primary-ink shadow-sm">
                      {turn.text}
                    </div>
                  </div>
                );
              }
              return (
                <div key={i} className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-paper border border-hairline px-4 py-2.5 text-[0.9rem] text-ink shadow-sm">
                    {turn.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* FOOTER — solid */}
          <div
            className="border-t border-hairline px-5 py-3"
            style={{ backgroundColor: "var(--paper-2)" }}
          >
            <div className="text-[0.6rem] font-mono uppercase tracking-[0.16em] text-ink-mute mb-2">
              QUICK PROMPTS
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {CHATBOT_PROMPTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => ask(p.prompt, p.answer)}
                  className="text-[0.7rem] font-mono rounded-full border border-hairline bg-paper px-2.5 py-1 text-ink-mute hover:border-primary hover:text-primary hover:bg-primary/5 transition"
                >
                  {p.prompt}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                askFreeform();
              }}
              className="flex items-center gap-2 rounded-full border border-hairline bg-paper px-3 py-2 focus-within:border-primary transition"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                type="text"
                placeholder="Ask anything..."
                className="flex-1 bg-transparent text-[0.875rem] text-ink placeholder:text-ink-mute focus:outline-none"
                aria-label="Free-form question"
              />
              <button
                type="submit"
                className="rounded-full bg-primary p-1.5 text-primary-ink hover:bg-primary-hover transition"
                aria-label="Send"
              >
                <ArrowUp size={14} />
              </button>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

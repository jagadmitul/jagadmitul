"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, MessageCircle, Sparkles, X } from "lucide-react";
import { CHATBOT_PROMPTS, matchPrompt } from "@/lib/data";
import { useReducedMotion } from "@/lib/reduced-motion";

type Turn =
  | { kind: "intro"; text: string; id: string }
  | { kind: "user"; text: string; id: string }
  | { kind: "mitul"; text: string; id: string }
  | { kind: "typing"; id: string };

const INTRO: Turn = {
  kind: "intro",
  id: "intro",
  text: "Hey 👋 Pick a question below or type your own. For anything more specific, drop me an email and I'll personally reply within 24 hours.",
};

let turnId = 0;
const nextId = () => `t-${++turnId}`;

export function AskMitul() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([INTRO]);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll using a sentinel element + scrollIntoView. Fires on every
  // new turn (including typing indicator) AND uses ResizeObserver so any
  // post-animation height growth (Framer spring settling) ALSO triggers
  // a scroll-down. This is the most robust pattern for animated chat UIs.
  useEffect(() => {
    const end = endRef.current;
    const scroller = scrollRef.current;
    if (!end || !scroller) return;

    const scrollDown = () => {
      end.scrollIntoView({ behavior: "smooth", block: "end" });
    };

    // Immediate + post-paint + post-spring-settle
    scrollDown();
    requestAnimationFrame(scrollDown);
    const t1 = setTimeout(scrollDown, 250);
    const t2 = setTimeout(scrollDown, 600);

    // Watch for any future content height changes (image loads, late
    // animations) and re-scroll
    const observer = new ResizeObserver(() => scrollDown());
    observer.observe(scroller);
    if (scroller.firstElementChild) {
      observer.observe(scroller.firstElementChild);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
    };
  }, [turns]);

  function dispatchAnswer(promptText: string, answerText: string) {
    const userTurn: Turn = { kind: "user", id: nextId(), text: promptText };
    const typingTurn: Turn = { kind: "typing", id: nextId() };
    setTurns((prev) => [...prev, userTurn, typingTurn]);

    const replyDelay = reduced ? 250 : 800;
    setTimeout(() => {
      setTurns((prev) => {
        const filtered = prev.filter((t) => t.id !== typingTurn.id);
        return [...filtered, { kind: "mitul", id: nextId(), text: answerText }];
      });
    }, replyDelay);
  }

  function ask(promptText: string, answerText: string) {
    dispatchAnswer(promptText, answerText);
  }

  function askFreeform() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    setDraft("");
    dispatchAnswer(trimmed, matchPrompt(trimmed));
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} modal={false}>
      {/* Hide the trigger entirely while the dialog is open so it doesn't
          peek out from behind the panel in the bottom-right corner. */}
      <AnimatePresence>
        {!open && (
          <Dialog.Trigger asChild>
            <motion.button
              type="button"
              className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-primary-ink shadow-lg font-mono text-xs tracking-wider uppercase"
              aria-label="Ask Mitul"
              initial={reduced ? false : { opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.7, y: 20 }}
              whileHover={reduced ? undefined : { scale: 1.06 }}
              whileTap={reduced ? undefined : { scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            >
              <Sparkles size={14} strokeWidth={2.2} />
              <span>Ask Mitul</span>
            </motion.button>
          </Dialog.Trigger>
        )}
      </AnimatePresence>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          onInteractOutside={(e) => e.preventDefault()}
          asChild
        >
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 20, scale: 0.97 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 26,
              mass: 0.9,
            }}
            className="fixed bottom-4 right-4 z-[70] flex w-[min(440px,calc(100vw-2rem))] max-h-[min(680px,calc(100vh-2rem))] flex-col rounded-3xl border-2 border-primary/30 shadow-2xl outline-none overflow-hidden"
            style={{ backgroundColor: "var(--paper-2)" }}
          >
            {/* HEADER */}
            <div
              className="flex items-center justify-between px-5 py-4 border-b border-hairline"
              style={{ backgroundColor: "var(--paper-2)" }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="grid place-items-center w-9 h-9 rounded-xl bg-primary text-primary-ink shadow"
                  initial={reduced ? false : { rotate: -10, scale: 0.7 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.1 }}
                >
                  <MessageCircle size={16} />
                </motion.div>
                <div className="flex flex-col">
                  <Dialog.Title className="text-base font-semibold text-ink leading-tight">
                    Ask Mitul
                  </Dialog.Title>
                  <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-mono uppercase tracking-[0.14em] text-ink-mute mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Online · replies quickly
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

            {/* BODY — `data-lenis-prevent` opts this scroll container out
                of Lenis's site-wide smooth-scroll, so the user can scroll
                inside the chat with mouse wheel / trackpad normally. */}
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-3 scroll-smooth"
              style={{ backgroundColor: "var(--paper-2)" }}
            >
              <AnimatePresence initial={false}>
                {turns.map((turn) => {
                  const baseTransition = reduced
                    ? { duration: 0 }
                    : { type: "spring" as const, stiffness: 360, damping: 28 };

                  if (turn.kind === "intro") {
                    return (
                      <motion.p
                        key={turn.id}
                        initial={reduced ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduced ? undefined : { opacity: 0, y: -4 }}
                        transition={baseTransition}
                        className="text-[0.85rem] text-ink-mute leading-relaxed bg-paper p-3 rounded-xl border border-hairline"
                      >
                        {turn.text}
                      </motion.p>
                    );
                  }
                  if (turn.kind === "user") {
                    return (
                      <motion.div
                        key={turn.id}
                        initial={reduced ? false : { opacity: 0, x: 24, scale: 0.96 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
                        transition={baseTransition}
                        className="flex justify-end"
                      >
                        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-[0.9rem] text-primary-ink shadow-sm">
                          {turn.text}
                        </div>
                      </motion.div>
                    );
                  }
                  if (turn.kind === "typing") {
                    return (
                      <motion.div
                        key={turn.id}
                        initial={reduced ? false : { opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reduced ? undefined : { opacity: 0, scale: 0.9 }}
                        transition={baseTransition}
                        className="flex justify-start"
                      >
                        <div className="rounded-2xl rounded-tl-sm bg-paper border border-hairline px-4 py-3 inline-flex items-center gap-1.5">
                          <Dot delay={0} />
                          <Dot delay={0.16} />
                          <Dot delay={0.32} />
                        </div>
                      </motion.div>
                    );
                  }
                  // mitul reply
                  return (
                    <motion.div
                      key={turn.id}
                      initial={reduced ? false : { opacity: 0, x: -24, scale: 0.96 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
                      transition={baseTransition}
                      onAnimationComplete={() => {
                        endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
                      }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-paper border border-hairline px-4 py-2.5 text-[0.9rem] text-ink shadow-sm">
                        {turn.text}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {/* Sentinel — auto-scroll target */}
              <div ref={endRef} aria-hidden="true" />
            </div>

            {/* FOOTER */}
            <div
              className="border-t border-hairline px-5 py-3"
              style={{ backgroundColor: "var(--paper-2)" }}
            >
              <div className="text-[0.6rem] font-mono uppercase tracking-[0.16em] text-ink-mute mb-2">
                QUICK PROMPTS
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {CHATBOT_PROMPTS.map((p) => (
                  <motion.button
                    key={p.id}
                    type="button"
                    onClick={() => ask(p.prompt, p.answer)}
                    whileHover={reduced ? undefined : { scale: 1.04, y: -1 }}
                    whileTap={reduced ? undefined : { scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="text-[0.7rem] font-mono rounded-full border border-hairline bg-paper px-2.5 py-1 text-ink-mute hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    {p.prompt}
                  </motion.button>
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
                <motion.button
                  type="submit"
                  whileHover={reduced ? undefined : { scale: 1.1 }}
                  whileTap={reduced ? undefined : { scale: 0.9 }}
                  className="rounded-full bg-primary p-1.5 text-primary-ink hover:bg-primary-hover transition-colors"
                  aria-label="Send"
                >
                  <ArrowUp size={14} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="inline-block w-1.5 h-1.5 rounded-full bg-primary"
      animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
      transition={{
        duration: 0.9,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

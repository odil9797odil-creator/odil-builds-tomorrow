import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { runCommand, TERMINAL_COMMANDS, type TerminalLine } from "@/lib/terminal";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const WELCOME: TerminalLine[] = [
  { kind: "accent", text: "odil.sh — v0.1 (still learning)" },
  { kind: "muted", text: "Type 'help' to see available commands." },
];

const quick = TERMINAL_COMMANDS.filter((c) => c.name !== "clear").map((c) => c.name);

export function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = screenRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const execute = (raw: string) => {
    const result = runCommand(raw);
    if (raw.trim()) setHistory((h) => [...h, raw.trim()]);
    setCursor(null);
    if (result === "clear") {
      setLines([]);
      return;
    }
    setLines((prev) => [...prev, { kind: "input", text: raw }, ...result]);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    execute(value);
    setValue("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!history.length) return;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = cursor === null ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cursor === null) return;
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(null);
        setValue("");
      } else {
        setCursor(next);
        setValue(history[next] ?? "");
      }
    }
  };

  return (
    <section aria-labelledby="terminal-title" className="relative bg-secondary/55 py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeader
          index="06"
          label="Optional"
          title="Prefer the command line?"
          titleId="terminal-title"
          subtitle="A small terminal, just for fun. Type a command — or tap one below."
          className="mx-auto"
        />

        <Reveal delay={120} className="mt-10">
          <div className="overflow-hidden rounded-lg bg-terminal shadow-lift">
            <div className="flex items-center gap-2 border-b border-primary-foreground/10 px-4 py-3">
              <span className="size-2.5 rounded-full bg-primary-foreground/20" aria-hidden />
              <span className="size-2.5 rounded-full bg-primary-foreground/20" aria-hidden />
              <span className="size-2.5 rounded-full bg-gold" aria-hidden />
              <span className="ml-3 font-mono text-xs text-terminal-muted">odil@portfolio: ~</span>
            </div>

            <div
              ref={screenRef}
              onClick={() => inputRef.current?.focus({ preventScroll: true })}
              className="h-[20rem] cursor-text overflow-y-auto px-4 py-4 font-mono text-[0.78rem] leading-[1.75] sm:px-5 sm:text-[0.82rem]"
              role="log"
              aria-live="polite"
              aria-label="Terminal output"
            >
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={cn(
                    "whitespace-pre-wrap break-words",
                    line.kind === "input" && "mt-2 text-terminal-foreground",
                    line.kind === "output" && "text-terminal-foreground/85",
                    line.kind === "muted" && "text-terminal-muted",
                    line.kind === "accent" && "text-gold-soft",
                    line.kind === "error" && "text-gold-soft/90",
                  )}
                >
                  {line.kind === "input" && <span className="mr-2 text-gold">❯</span>}
                  {line.text}
                </div>
              ))}

              <form onSubmit={onSubmit} className="mt-2 flex items-center">
                <label htmlFor="terminal-input" className="mr-2 text-gold">
                  ❯<span className="sr-only">Type a command</span>
                </label>
                <input
                  id="terminal-input"
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  maxLength={60}
                  placeholder="help"
                  className="flex-1 bg-transparent text-terminal-foreground caret-gold-soft outline-none placeholder:text-terminal-muted/50 focus-visible:outline-none"
                />
              </form>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2" aria-label="Quick commands">
            {quick.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => execute(c)}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 font-mono text-xs text-primary transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

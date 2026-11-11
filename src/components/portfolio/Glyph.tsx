import {
  Braces,
  BrainCircuit,
  Code2,
  Database,
  FileCode2,
  Globe,
  Infinity as InfinityIcon,
  Plug,
  Puzzle,
  Server,
  Sparkles,
  Target,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Monogram badges for languages; Lucide icons for concepts. */
const monograms: Record<string, string> = {
  python: "Py",
  cpp: "C++",
  js: "JS",
};

const icons: Record<string, LucideIcon> = {
  html: Code2,
  css: Braces,
  server: Server,
  database: Database,
  api: Plug,
  brain: BrainCircuit,
  globe: Globe,
  puzzle: Puzzle,
  target: Target,
  sparkles: Sparkles,
  infinity: InfinityIcon,
  terminal: Terminal,
  file: FileCode2,
};

export function Glyph({ name, className }: { name: string; className?: string }) {
  const mono = monograms[name];
  if (mono) {
    return (
      <span className={cn("font-mono text-[0.8rem] font-semibold tracking-tight", className)} aria-hidden>
        {mono}
      </span>
    );
  }
  const Icon = icons[name] ?? Code2;
  return <Icon className={cn("size-[1.15rem]", className)} strokeWidth={1.6} aria-hidden />;
}

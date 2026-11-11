import { contact, journey, profile, projects, skillGroups, stepStatusLabel } from "@/content/portfolio";

export type TerminalLine = { kind: "input" | "output" | "muted" | "error" | "accent"; text: string };

export const TERMINAL_COMMANDS = [
  { name: "about", hint: "Learn about me." },
  { name: "skills", hint: "Explore my technical skills." },
  { name: "projects", hint: "View my projects." },
  { name: "journey", hint: "See my learning journey." },
  { name: "contact", hint: "Find my contact information." },
  { name: "help", hint: "Show available commands." },
  { name: "clear", hint: "Clear the screen." },
] as const;

const out = (text: string): TerminalLine => ({ kind: "output", text });
const muted = (text: string): TerminalLine => ({ kind: "muted", text });
const accent = (text: string): TerminalLine => ({ kind: "accent", text });

/** Returns the response lines for a command, or `"clear"` when the screen should be cleared. */
export function runCommand(raw: string): TerminalLine[] | "clear" {
  const cmd = raw.trim().toLowerCase();
  if (cmd === "") return [];

  switch (cmd) {
    case "help":
      return [
        accent("Available commands:"),
        ...TERMINAL_COMMANDS.map((c) => out(`  ${c.name.padEnd(9)} — ${c.hint}`)),
      ];
    case "about":
      return [accent(`${profile.name} · ${profile.role}`), out(profile.introduction)];
    case "skills":
      return skillGroups.flatMap((g) => [
        accent(`${g.title}${g.kind === "future" ? " (planned)" : ""}`),
        ...g.skills.map((s) => out(`  · ${s.name.padEnd(20)} ${s.level.toLowerCase()}`)),
      ]);
    case "projects":
      return projects.flatMap((p) => [
        accent(`${p.number}  ${p.title}`),
        muted(`    ${p.tags.join(", ")}`),
      ]);
    case "journey":
      return journey.map((s) =>
        s.status === "current"
          ? accent(`→ ${s.number}  ${s.title}  ← ${stepStatusLabel[s.status].toLowerCase()}`)
          : out(`  ${s.number}  ${s.title}  (${stepStatusLabel[s.status].toLowerCase()})`),
      );
    case "contact":
      return [
        out(`  email     ${contact.email ?? "not added yet"}`),
        out(`  github    ${contact.github ?? "not added yet"}`),
        out(`  linkedin  ${contact.linkedin ?? "not added yet"}`),
        muted("Or scroll down to the contact section."),
      ];
    case "clear":
      return "clear";
    case "sudo":
    case "sudo su":
      return [muted("Nice try. I'm still a student — no root access yet.")];
    default:
      return [
        { kind: "error", text: `command not found: ${raw.trim()}` },
        muted("Type 'help' to see available commands."),
      ];
  }
}

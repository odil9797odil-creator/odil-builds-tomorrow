import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact";
import { runCommand } from "@/lib/terminal";
import { contactForm, journey, skillGroups } from "@/content/portfolio";

describe("terminal commands", () => {
  it("help lists about, skills, projects, journey and contact", () => {
    const out = runCommand("help");
    expect(Array.isArray(out)).toBe(true);
    const text = (out as { text: string }[]).map((l) => l.text).join("\n");
    for (const cmd of ["about", "skills", "projects", "journey", "contact"]) {
      expect(text).toContain(cmd);
    }
  });

  it("unknown commands report not found", () => {
    const out = runCommand("rm -rf") as { kind: string }[];
    expect(out[0]?.kind).toBe("error");
  });

  it("clear clears the screen", () => {
    expect(runCommand("clear")).toBe("clear");
  });
});

describe("honest content", () => {
  it("marks exactly one journey step as current", () => {
    expect(journey.filter((s) => s.status === "current")).toHaveLength(1);
  });

  it("future-exploration skills are all labelled Planned", () => {
    const future = skillGroups.filter((g) => g.kind === "future").flatMap((g) => g.skills);
    expect(future.length).toBeGreaterThan(0);
    expect(future.every((s) => s.level === "Planned")).toBe(true);
  });

  it("the contact form has no delivery endpoint until one is configured", () => {
    expect(contactForm.endpoint).toBeNull();
  });
});

describe("contact form validation", () => {
  it("rejects an invalid email", () => {
    expect(contactSchema.safeParse({ name: "A", email: "nope", message: "Hello there, Odil!" }).success).toBe(false);
  });
  it("rejects an empty name", () => {
    expect(contactSchema.safeParse({ name: "  ", email: "a@b.co", message: "Hello there, Odil!" }).success).toBe(false);
  });
  it("accepts a valid message", () => {
    expect(contactSchema.safeParse({ name: "Ann", email: "ann@example.com", message: "Hello there, Odil!" }).success).toBe(true);
  });
});

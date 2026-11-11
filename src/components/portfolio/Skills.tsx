import { skillGroups, type Skill } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { Glyph } from "./Glyph";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Skills() {
  const current = skillGroups.filter((g) => g.kind === "current");
  const future = skillGroups.filter((g) => g.kind === "future");

  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative bg-secondary/55 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          index="02"
          label="Skills"
          title="What I Work With."
          align="split"
          titleId="skills-heading"
          subtitle="Honest levels, no percentages. The first two groups are what I'm learning now — the last is where I'm heading next."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-10">
          {current.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 120}>
              <GroupHeader title={group.title} note={group.note} badge="Now learning" />
              <ul className={cn("mt-6 grid gap-4", group.skills.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
                {group.skills.map((s) => (
                  <SkillCard key={s.name} skill={s} />
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {future.map((group) => (
          <Reveal key={group.title} className="mt-16">
            <GroupHeader title={group.title} note={group.note} badge="Planned" muted />
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {group.skills.map((s) => (
                <SkillCard key={s.name} skill={s} future />
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function GroupHeader({ title, note, badge, muted }: { title: string; note: string; badge: string; muted?: boolean }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
      <div>
        <h3 className="font-display text-2xl text-primary">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{note}</p>
      </div>
      <span
        className={cn(
          "eyebrow rounded-full px-3 py-1 text-[0.6rem]",
          muted ? "border border-dashed border-gold/70 text-gold" : "bg-primary text-primary-foreground",
        )}
      >
        {badge}
      </span>
    </div>
  );
}

function SkillCard({ skill, future }: { skill: Skill; future?: boolean }) {
  return (
    <li
      className={cn(
        "lift group flex h-full flex-col rounded-lg p-5",
        future
          ? "border border-dashed border-gold/50 bg-transparent hover:bg-card/60"
          : "border border-border bg-card shadow-soft",
      )}
    >
      <span
        className={cn(
          "grid size-11 place-items-center rounded-md transition-colors duration-500",
          future
            ? "border border-gold/40 text-gold"
            : "bg-primary text-primary-foreground group-hover:bg-primary-deep",
        )}
      >
        <Glyph name={skill.icon} />
      </span>
      <h4 className={cn("mt-6 text-lg font-semibold", future ? "text-foreground/80" : "text-foreground")}>{skill.name}</h4>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{skill.description}</p>
      <p className="mt-auto pt-5">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[0.66rem] font-semibold",
            future ? "border border-dashed border-gold/60 text-gold" : "bg-secondary text-primary",
          )}
        >
          <span className={cn("size-1.5 rounded-full", future ? "border border-gold" : "bg-gold")} aria-hidden />
          {skill.level}
        </span>
      </p>
    </li>
  );
}

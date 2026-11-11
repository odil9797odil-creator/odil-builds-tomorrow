import { Quote } from "lucide-react";
import { about, profile } from "@/content/portfolio";
import { Glyph } from "./Glyph";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function About() {
  const [lead, ...rest] = about.paragraphs;
  const closing = rest[rest.length - 1];
  const middle = rest.slice(0, -1);

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <SectionHeader index="01" label="About" title={about.heading} subtitle={about.subtitle} />
            <span id="about-title" className="sr-only">
              About Odil
            </span>

            <Reveal delay={120} className="mt-12 max-w-2xl space-y-6">
              <p className="font-display text-[1.45rem] leading-snug text-foreground sm:text-[1.7rem]">{lead}</p>
              {middle.map((p) => (
                <p key={p} className="text-[1.02rem] leading-[1.8] text-muted-foreground">
                  {p}
                </p>
              ))}
            </Reveal>
          </div>

          {/* Editorial profile card */}
          <Reveal delay={200} className="lg:col-span-5 lg:pt-6">
            <aside className="paper-grain relative overflow-hidden rounded-lg bg-primary p-8 text-primary-foreground shadow-lift sm:p-10">
              <div aria-hidden className="absolute -right-16 -top-16 size-48 rounded-full border border-gold/30" />
              <div aria-hidden className="absolute -right-8 -top-8 size-32 rounded-full border border-gold/20" />

              <p className="eyebrow relative text-gold-soft">Profile</p>
              <dl className="relative mt-6 divide-y divide-primary-foreground/10 border-y border-primary-foreground/10 text-sm">
                {[
                  ["Name", profile.name],
                  ["Role", profile.role],
                  ["Direction", "Backend Development"],
                  ["Status", "Learning & building"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-primary-foreground/55">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>

              <figure className="relative mt-10">
                <Quote className="size-6 text-gold" strokeWidth={1.4} aria-hidden />
                <blockquote className="font-display mt-4 text-[1.4rem] italic leading-snug sm:text-[1.6rem]">
                  {closing}
                </blockquote>
              </figure>
            </aside>
          </Reveal>
        </div>

        {/* Fact cards */}
        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {about.facts.map((fact, i) => (
            <Reveal as="li" key={fact.label} delay={i * 90}>
              <div className="lift group h-full rounded-lg border border-border bg-card p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-md bg-secondary text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Glyph name={fact.icon} />
                  </span>
                  <span className="font-mono text-[0.68rem] text-gold">0{i + 1}</span>
                </div>
                <p className="eyebrow mt-8 text-[0.62rem] text-muted-foreground">{fact.label}</p>
                <p className="font-display mt-2 text-xl leading-snug text-primary">{fact.value}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

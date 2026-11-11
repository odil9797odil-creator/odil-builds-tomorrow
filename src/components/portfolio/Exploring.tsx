import { exploring } from "@/content/portfolio";
import { Glyph } from "./Glyph";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Exploring() {
  return (
    <section aria-labelledby="exploring-title" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              index="05"
              label="Currently learning"
              title="Curiosity in Progress."
              titleId="exploring-title"
              subtitle="What's on my desk right now — the things I practise most weeks."
            />
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7 lg:pt-4">
          {exploring.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 2) * 90}>
              <div className="lift group flex h-full items-center gap-4 rounded-lg border border-border bg-card px-5 py-5 shadow-soft">
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/40 text-primary transition-colors duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <Glyph name={item.icon} />
                </span>
                <span className="flex-1 text-[0.98rem] font-medium leading-snug text-foreground">{item.title}</span>
                <span className="font-mono text-[0.66rem] text-gold">0{i + 1}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

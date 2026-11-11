import type { CSSProperties } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { Portrait } from "./Portrait";
import { Reveal } from "./Reveal";
import { SocialLinks } from "./SocialLinks";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** Floating language labels around the portrait. Positions are % of the frame. */
const techLabels = [
  { label: "Python", pos: "left-[-1.25rem] top-[12%] sm:left-[-2.25rem]" },
  { label: "C++", pos: "right-[-1rem] top-[24%] sm:right-[-2rem]" },
  { label: "HTML", pos: "right-[-1rem] top-[48%] sm:right-[-2.5rem]" },
  { label: "CSS", pos: "left-[-1rem] top-[40%] sm:left-[-1.75rem]" },
  { label: "JavaScript", pos: "right-[-0.75rem] bottom-[12%] sm:right-[-1.5rem]" },
];

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-[4.5rem]">
      {/* Background geometry */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 hidden h-full w-[38%] bg-secondary/60 lg:block" />
        <div className="absolute bottom-[10%] left-[44%] hidden size-56 rounded-full border border-gold/25 lg:block" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 pb-24 pt-12 sm:px-8 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-8">
        {/* Left — copy */}
        <div className="lg:col-span-7 xl:col-span-6">
          <p className="eyebrow animate-fade-up flex items-center gap-3 text-gold" style={delay(80)}>
            <span className="gold-rule" aria-hidden />
            <span className="font-mono text-[0.72rem] font-medium tracking-[0.2em] text-muted-foreground">
              {profile.heroEyebrow}
            </span>
          </p>

          <h1
            id="hero-title"
            className="font-display animate-fade-up mt-4 text-[6.5rem] font-medium leading-[0.85] tracking-[-0.03em] text-primary sm:text-[9rem] xl:text-[10.5rem]"
            style={delay(160)}
          >
            {profile.name}
            <span className="text-gold">.</span>
          </h1>

          <p
            className="font-display animate-fade-up mt-7 max-w-xl text-[1.65rem] italic leading-[1.2] text-foreground sm:text-[2rem]"
            style={delay(260)}
          >
            {profile.heroHeadline}
          </p>

          <p
            className="animate-fade-up mt-6 max-w-lg text-[0.98rem] leading-relaxed text-muted-foreground sm:text-[1.05rem]"
            style={delay(340)}
          >
            {profile.heroDescription}
          </p>

          <div className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={delay(420)}>
            <Button asChild variant="brand" size="xl" className="w-full sm:w-auto">
              <a href="#projects">
                Explore My Work
                <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild variant="brand-outline" size="xl" className="w-full sm:w-auto">
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>

          <div className="animate-fade-up mt-12 flex items-center gap-6" style={delay(500)}>
            <span className="eyebrow text-[0.62rem] text-muted-foreground">Find me</span>
            <span className="h-px w-8 bg-border" aria-hidden />
            <SocialLinks />
          </div>
        </div>

        {/* Right — portrait composition */}
        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[25rem] lg:col-span-5 lg:col-start-8 xl:col-start-8 xl:max-w-[27rem]">
          {/* dotted square + offset gold frame */}
          <div aria-hidden className="dot-grid absolute -left-8 -top-8 size-32 opacity-70" />
          <div aria-hidden className="absolute -bottom-5 -right-5 left-5 top-5 rounded-md border border-gold/60" />

          <div className="relative rounded-md border border-border bg-card p-3 shadow-frame sm:p-3.5">
            {/* badge */}
            <p className="eyebrow absolute -top-3 right-6 z-10 rounded-sm bg-primary px-3 py-1.5 text-[0.64rem] text-primary-foreground shadow-soft">
              <span className="mr-1.5 text-gold-soft">●</span>
              {profile.heroBadge}
            </p>

            <Reveal variant="image" className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <div className="size-full">
                <Portrait />
              </div>
            </Reveal>

            {/* corner ticks */}
            {["left-1.5 top-1.5 border-l border-t", "right-1.5 top-1.5 border-r border-t", "bottom-1.5 left-1.5 border-b border-l", "bottom-1.5 right-1.5 border-b border-r"].map((c) => (
              <span key={c} aria-hidden className={cn("absolute size-3 border-gold", c)} />
            ))}

            {/* tech labels */}
            <ul aria-label="Languages I'm learning">
              {techLabels.map((t, i) => (
                <li
                  key={t.label}
                  className={cn(
                    "animate-fade-up absolute z-10 rounded-full border border-border bg-card/95 px-3 py-1.5 font-mono text-[0.7rem] font-medium text-primary shadow-card backdrop-blur-sm",
                    t.pos,
                  )}
                  style={delay(700 + i * 90)}
                >
                  <span className="mr-1.5 inline-block size-1.5 -translate-y-px rounded-full bg-gold" aria-hidden />
                  {t.label}
                </li>
              ))}
            </ul>
          </div>

          {/* code-editor card */}
          <div
            aria-hidden
            className="animate-fade-up absolute -bottom-12 -left-4 z-20 w-[15.5rem] overflow-hidden rounded-md bg-terminal shadow-lift sm:-left-12 sm:w-[17rem]"
            style={delay(1100)}
          >
            <div className="flex items-center gap-1.5 border-b border-primary-foreground/10 px-3 py-2">
              <span className="size-2 rounded-full bg-primary-foreground/25" />
              <span className="size-2 rounded-full bg-primary-foreground/25" />
              <span className="size-2 rounded-full bg-gold" />
              <span className="ml-2 font-mono text-[0.62rem] text-terminal-muted">odil.py</span>
            </div>
            <pre className="px-3.5 py-3 font-mono text-[0.68rem] leading-[1.7] text-terminal-foreground">
              <span className="text-terminal-muted">class</span> <span className="text-gold-soft">Odil</span>:{"\n"}
              {"  "}focus = <span className="text-gold-soft">"fundamentals"</span>{"\n"}
              {"  "}goal{"  "}= <span className="text-gold-soft">"backend"</span>{"\n"}
              {"  "}next{"  "}= <span className="text-gold-soft">"ml &amp; ai"</span>
              <span className="animate-caret ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-gold" />
            </pre>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary lg:flex"
      >
        <span className="eyebrow text-[0.6rem]">Scroll</span>
        <ArrowDown className="size-4 transition-transform duration-500 group-hover:translate-y-1" strokeWidth={1.5} />
      </a>
    </section>
  );
}

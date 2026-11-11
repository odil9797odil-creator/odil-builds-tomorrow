import { journey, stepStatusLabel, type StepStatus } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const nodeStyle: Record<StepStatus, string> = {
  ongoing: "border-primary bg-primary",
  current: "border-gold bg-gold ring-[6px] ring-gold/20",
  exploring: "border-primary bg-card",
  goal: "border-gold bg-card",
  future: "border-dashed border-muted-foreground/60 bg-background",
};

export function Journey() {
  const currentIdx = Math.max(
    0,
    journey.findIndex((s) => s.status === "current"),
  );

  return (
    <section id="journey" aria-labelledby="journey-title" className="relative overflow-hidden bg-secondary/55 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          index="04"
          label="Journey"
          title="The Road Ahead."
          titleId="journey-title"
          align="split"
          subtitle="Where I am now, and where I'm going. Nothing ahead of the gold marker is finished yet."
        />

        <ol className="mt-16 grid lg:mt-20 lg:grid-cols-5">
          {journey.map((step, i) => {
            const isCurrent = step.status === "current";
            const last = i === journey.length - 1;
            const travelled = i < currentIdx;
            return (
              <Reveal as="li" key={step.number} delay={i * 110} className="relative pb-10 pl-12 lg:pb-0 lg:pl-0 lg:pr-6">
                {/* connector */}
                {!last && (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-[11px] top-6 bottom-0 lg:bottom-auto lg:left-8 lg:right-0 lg:top-[11px]",
                      travelled
                        ? "w-px bg-primary lg:h-px lg:w-auto"
                        : "border-l border-dashed border-muted-foreground/40 lg:border-l-0 lg:border-t",
                    )}
                  />
                )}

                {/* node */}
                <span
                  aria-hidden
                  className={cn("absolute left-0 top-0 block size-6 rounded-full border-2 lg:relative", nodeStyle[step.status])}
                />

                <div
                  className={cn(
                    "lg:mt-8",
                    isCurrent && "rounded-lg bg-primary p-5 text-primary-foreground shadow-lift lg:-ml-3 lg:mr-0 lg:p-5",
                  )}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn("font-mono text-xs", isCurrent ? "text-gold-soft" : "text-gold")}>Step {step.number}</span>
                    <span
                      className={cn(
                        "eyebrow rounded-full px-2 py-0.5 text-[0.62rem]",
                        isCurrent ? "bg-gold text-primary-deep" : "border border-border text-muted-foreground",
                      )}
                    >
                      {stepStatusLabel[step.status]}
                    </span>
                  </div>
                  <h3 className={cn("font-display mt-3 text-[1.45rem] leading-tight", isCurrent ? "text-primary-foreground" : "text-primary")}>
                    {step.title}
                  </h3>
                  <p className={cn("mt-2 text-sm leading-relaxed", isCurrent ? "text-primary-foreground/75" : "text-muted-foreground")}>
                    {step.description}
                  </p>
                </div>
                {isCurrent && <span className="sr-only">(current stage)</span>}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

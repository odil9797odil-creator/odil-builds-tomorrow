import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  subtitle?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  align?: "left" | "split";
  /** id for the h2, used by the section's aria-labelledby */
  titleId?: string;
}

/** Editorial section heading: "01 — About" eyebrow, serif title, optional subtitle. */
export function SectionHeader({ index, label, title, subtitle, tone = "light", className, align = "left", titleId }: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn(
        align === "split" ? "grid gap-6 md:grid-cols-12 md:items-end" : "max-w-2xl",
        className,
      )}
    >
      <div className={align === "split" ? "md:col-span-7" : undefined}>
        <p className={cn("eyebrow flex items-center gap-3", dark ? "text-gold-soft" : "text-gold")}>
          <span className="font-mono text-[0.7rem] tracking-normal">{index}</span>
          <span className="gold-rule w-8" aria-hidden />
          <span className={dark ? "text-primary-foreground/70" : "text-muted-foreground"}>{label}</span>
        </p>
        <h2
          id={titleId}
          className={cn(
            "font-display mt-5 text-[2.6rem] leading-[1.02] sm:text-5xl lg:text-6xl text-balance-pretty",
            dark ? "text-primary-foreground" : "text-primary",
          )}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p
          className={cn(
            "text-base leading-relaxed sm:text-lg",
            align === "split" ? "md:col-span-5 md:pb-2" : "mt-5",
            dark ? "text-primary-foreground/70" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

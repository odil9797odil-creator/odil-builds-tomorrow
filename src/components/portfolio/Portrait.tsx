import { ImagePlus } from "lucide-react";
import { profile } from "@/content/portfolio";

/**
 * The portrait inside the hero frame.
 * Replace the placeholder by setting `profile.portrait.src` in src/content/portfolio.ts.
 */
export function Portrait() {
  const { src, alt } = profile.portrait;

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        width={800}
        height={1000}
        fetchPriority="high"
        className="size-full object-cover"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label="Portrait placeholder — Odil's photo will appear here"
      className="hatch relative flex size-full flex-col items-center justify-center bg-secondary text-center"
    >
      <span className="font-display text-[7rem] leading-none text-primary/15 sm:text-[9rem]" aria-hidden>
        O
      </span>
      <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        <ImagePlus className="size-3.5 text-gold" aria-hidden />
        Portrait coming soon
      </span>
    </div>
  );
}

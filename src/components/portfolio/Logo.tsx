import { profile } from "@/content/portfolio";
import { cn } from "@/lib/utils";

export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "font-display text-[1.6rem] font-semibold leading-none tracking-[0.04em]",
        tone === "dark" ? "text-primary-foreground" : "text-primary",
        className,
      )}
    >
      {profile.logo}
      <span className="text-gold">.</span>
    </span>
  );
}

import { Github, Linkedin } from "lucide-react";
import { contact } from "@/content/portfolio";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
  tone?: "light" | "dark";
  showLabels?: boolean;
}

const items = [
  { key: "github", label: "GitHub", icon: Github, href: contact.github },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin, href: contact.linkedin },
] as const;

/** GitHub + LinkedIn. Missing URLs render as a non-clickable "soon" state, never a dead link. */
export function SocialLinks({ className, tone = "light", showLabels = true }: SocialLinksProps) {
  const dark = tone === "dark";
  return (
    <ul className={cn("flex items-center gap-5", className)}>
      {items.map(({ key, label, icon: Icon, href }) => {
        const content = (
          <>
            <span
              className={cn(
                "grid size-9 place-items-center rounded-full border transition-colors duration-300",
                dark
                  ? "border-primary-foreground/20 group-hover:border-gold-soft group-hover:text-gold-soft"
                  : "border-border bg-card group-hover:border-primary group-hover:text-primary",
              )}
            >
              <Icon className="size-4" strokeWidth={1.6} aria-hidden />
            </span>
            {showLabels && <span className="text-sm font-medium">{label}</span>}
          </>
        );
        return (
          <li key={key}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group inline-flex items-center gap-2.5 transition-colors",
                  dark ? "text-primary-foreground/80 hover:text-primary-foreground" : "text-foreground hover:text-primary",
                )}
              >
                {content}
              </a>
            ) : (
              <span
                className={cn(
                  "group inline-flex cursor-default items-center gap-2.5",
                  dark ? "text-primary-foreground/55" : "text-muted-foreground",
                )}
                title={`${label} link coming soon`}
              >
                {content}
                <span className="sr-only">(link coming soon)</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

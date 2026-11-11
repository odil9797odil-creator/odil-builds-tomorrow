import { ArrowUp } from "lucide-react";
import { profile } from "@/content/portfolio";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Logo className="text-[2.4rem]" />
            <p className="font-display mt-3 text-lg italic text-muted-foreground">{profile.tagline}</p>
          </div>
          <SocialLinks showLabels={false} />
        </div>

        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <span suppressHydrationWarning>{year}</span> {profile.name}. All rights reserved.
          </p>
          <a href="#home" className="group inline-flex items-center gap-2 font-semibold text-primary">
            Back to top
            <span className="grid size-7 place-items-center rounded-full border border-border transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUp className="size-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

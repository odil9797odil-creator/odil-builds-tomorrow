import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, profile } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const marker = window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - marker <= 0) current = id;
      }
      // At the very bottom, highlight the last section.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);
  return active;
}

const ids = navItems.map((n) => n.id);

export function Navbar() {
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        open
          ? "border-b border-border/80 bg-background"
          : scrolled
          ? "border-b border-border/80 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" onClick={() => setOpen(false)} aria-label={`${profile.name} — back to top`}>
          <Logo />
        </a>

        <div className="hidden items-center gap-10 lg:flex">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative px-3.5 py-2 text-[0.85rem] font-medium transition-colors duration-300",
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-500",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
          <Availability />
        </div>

        <button
          type="button"
          className="relative grid size-11 place-items-center rounded-full border border-border bg-card text-primary transition-colors hover:border-primary lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <Menu className={cn("absolute size-5 transition-all duration-300", open ? "rotate-90 opacity-0" : "opacity-100")} />
          <X className={cn("absolute size-5 transition-all duration-300", open ? "opacity-100" : "-rotate-90 opacity-0")} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-out lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="min-h-0">
          <div className="h-[calc(100dvh-4.5rem)] overflow-y-auto px-5 pb-10 pt-4 sm:px-8">
            <ul className="border-t border-border">
              {navItems.map((item, i) => (
                <li key={item.id} className="border-b border-border">
                  <a
                    href={`#${item.id}`}
                    tabIndex={open ? 0 : -1}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-baseline justify-between py-5 transition-colors",
                      active === item.id ? "text-primary" : "text-foreground",
                    )}
                  >
                    <span className="font-display text-3xl">{item.label}</span>
                    <span className="font-mono text-xs text-gold">0{i + 1}</span>
                  </a>
                </li>
              ))}
            </ul>
            <Availability className="mt-8" />
          </div>
        </div>
      </div>
    </header>
  );
}

function Availability({ className }: { className?: string }) {
  return (
    <p className={cn("flex items-center gap-2.5 text-xs font-medium text-muted-foreground", className)}>
      <span className="relative flex size-2">
        <span className="animate-soft-ping absolute inline-flex size-full rounded-full bg-primary" />
        <span className="relative inline-flex size-2 rounded-full bg-primary" />
      </span>
      {profile.availability}
    </p>
  );
}

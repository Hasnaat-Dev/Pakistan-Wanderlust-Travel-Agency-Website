import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Menu, Mountain, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/packages", label: "Packages" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

/** Sticky navigation that shrinks and gains a solid background on scroll. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const onHome = pathname === "/";
  const transparent = onHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || !onHome
          ? "border-b border-border/60 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-all duration-500 sm:px-8",
          scrolled ? "h-16" : "h-20 lg:h-24",
        )}
      >
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-full transition-colors",
              transparent ? "bg-primary-foreground/15 text-primary-foreground" : "bg-primary text-primary-foreground",
            )}
          >
            <Mountain className="size-4.5" aria-hidden />
          </span>
          <span className="min-w-0">
            <span
              className={cn(
                "block truncate font-display text-base leading-tight font-semibold transition-colors sm:text-lg",
                transparent ? "text-primary-foreground" : "text-foreground",
              )}
            >
              Pakistan Wanderlust
            </span>
            <span
              className={cn(
                "hidden text-[0.65rem] tracking-[0.2em] uppercase transition-colors sm:block",
                transparent ? "text-primary-foreground/70" : "text-muted-foreground",
              )}
            >
              Boutique journeys since 2012
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const active = link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);
            return (
              <li key={link.to} className="relative">
                <Link
                  to={link.to}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    transparent
                      ? "text-primary-foreground/85 hover:text-primary-foreground"
                      : "text-foreground/75 hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/book">Plan my trip</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-md transition-colors lg:hidden",
              transparent ? "text-primary-foreground hover:bg-primary-foreground/10" : "text-foreground hover:bg-muted",
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t bg-background px-5 pb-6 lg:hidden"
        >
          <ul className="flex flex-col py-2">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block border-b border-border/50 py-3.5 text-base font-medium text-foreground"
                  activeProps={{ className: "text-accent" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-4 w-full">
            <Link to="/book">Plan my trip</Link>
          </Button>
          <p className="mt-4 text-center text-xs text-muted-foreground">{site.phone}</p>
        </motion.div>
      )}
    </header>
  );
}

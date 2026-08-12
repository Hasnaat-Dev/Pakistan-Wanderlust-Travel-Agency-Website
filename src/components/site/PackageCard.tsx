import { Link } from "@tanstack/react-router";
import { CalendarDays, Mountain, Users } from "lucide-react";
import type { TourPackage } from "@/data/packages";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPKR } from "@/lib/currency";

export function PackageCard({ pkg }: { pkg: TourPackage }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-16/10 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          loading="lazy"
          width={1920}
          height={1088}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-107"
        />
        <Badge className="absolute top-4 left-4 bg-background/90 text-foreground backdrop-blur">{pkg.region}</Badge>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-xl leading-snug">{pkg.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{pkg.summary}</p>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-accent" aria-hidden /> {pkg.days} days
          </span>
          <span className="flex items-center gap-1.5">
            <Mountain className="size-3.5 text-accent" aria-hidden /> {pkg.difficulty}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="size-3.5 text-accent" aria-hidden /> Small group
          </span>
        </div>

        <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
          {pkg.includes.slice(0, 3).map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-gold" aria-hidden />
              <span className="line-clamp-1">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-end justify-between gap-4 border-t pt-5">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">From, per person</p>
            <p className="truncate font-display text-2xl font-semibold text-primary">{formatPKR(pkg.price)}</p>
          </div>
          <Button asChild size="sm" className="shrink-0">
            <Link to="/packages/$slug" params={{ slug: pkg.slug }}>
              View trip
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Destination } from "@/data/destinations";
import { cn } from "@/lib/utils";

/** Image-led destination card with a zoom-on-hover cover and lift. */
export function DestinationCard({
  destination,
  className,
  tall,
}: {
  destination: Destination;
  className?: string;
  tall?: boolean;
}) {
  return (
    <Link
      to="/destinations/$slug"
      params={{ slug: destination.slug }}
      className={cn(
        "group relative block overflow-hidden rounded-xl bg-ink transition-all duration-500",
        "hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div className={cn("relative w-full overflow-hidden", tall ? "aspect-3/4" : "aspect-4/3")}>
        <img
          src={destination.image}
          alt={`${destination.name}, Pakistan`}
          loading="lazy"
          width={1920}
          height={1088}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-gold uppercase">
          <MapPin className="size-3.5" aria-hidden />
          {destination.region}
        </p>
        <h3 className="mt-1.5 text-xl text-primary-foreground sm:text-2xl">{destination.name}</h3>
        <p className="mt-2 max-w-md text-sm text-primary-foreground/75 line-clamp-2">{destination.short}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-foreground">
          Explore
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
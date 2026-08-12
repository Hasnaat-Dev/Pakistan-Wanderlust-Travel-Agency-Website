import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalendarRange, Compass, MapPin, Route as RouteIcon } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { PackageCard } from "@/components/site/PackageCard";
import { Button } from "@/components/ui/button";
import { getDestination } from "@/data/destinations";
import { packages } from "@/data/packages";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    const destination = getDestination(params.slug);
    if (!destination) throw notFound();
    return { destination };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Destination not found — Pakistan Wanderlust" }, { name: "robots", content: "noindex" }] };
    }
    const d = loaderData.destination;
    return {
      meta: [
        { title: `${d.name} Travel Guide — Pakistan Wanderlust` },
        { name: "description", content: d.short },
        { property: "og:title", content: `${d.name}, Pakistan` },
        { property: "og:description", content: d.short },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/destinations/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/destinations/${params.slug}` }],
    };
  },
  component: DestinationDetail,
});

function DestinationDetail() {
  const { destination: d } = Route.useLoaderData();
  const related = packages.filter((p) => p.destinations.includes(d.slug));

  return (
    <article>
      <header className="relative flex min-h-[68svh] items-end overflow-hidden bg-ink">
        <img
          src={d.image}
          alt={`${d.name}, Pakistan`}
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 sm:px-8">
          <p className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.22em] text-gold uppercase">
            <MapPin className="size-3.5" aria-hidden /> {d.region}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.25rem,6vw,4.25rem)] leading-tight font-semibold text-primary-foreground">
            {d.name}
          </h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">{d.short}</p>
        </div>
      </header>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div>
            <Reveal>
              <h2 className="text-2xl sm:text-3xl">Overview</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{d.overview}</p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <Reveal className="rounded-xl border bg-card p-6">
                <span className="grid size-10 place-items-center rounded-lg bg-primary/8 text-primary">
                  <CalendarRange className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg">Best time to visit</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.bestTime}</p>
              </Reveal>
              <Reveal delay={0.08} className="rounded-xl border bg-card p-6">
                <span className="grid size-10 place-items-center rounded-lg bg-primary/8 text-primary">
                  <RouteIcon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg">How to reach</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.howToReach}</p>
              </Reveal>
            </div>

            <Reveal className="mt-10">
              <h2 className="text-2xl sm:text-3xl">Highlights</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {d.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 rounded-lg border bg-card px-4 py-3 text-sm">
                    <Compass className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-10">
              <h2 className="text-2xl sm:text-3xl">Where it is</h2>
              <div className="mt-5 overflow-hidden rounded-xl border">
                <iframe
                  title={`Map of ${d.name}`}
                  loading="lazy"
                  className="h-80 w-full"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${d.coords[1] - 0.4}%2C${d.coords[0] - 0.3}%2C${d.coords[1] + 0.4}%2C${d.coords[0] + 0.3}&layer=mapnik&marker=${d.coords[0]}%2C${d.coords[1]}`}
                />
              </div>
            </Reveal>
          </div>

          {/* Sticky booking CTA */}
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-xl border bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-xl">Book this trip</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Tell us your dates and we'll build a private itinerary around {d.name} within 24 hours.
              </p>
              <Button asChild size="lg" className="mt-5 w-full">
                <Link to="/book" search={{ destination: d.slug }}>
                  Start planning
                </Link>
              </Button>
              <Button asChild variant="outline" className="mt-3 w-full">
                <Link to="/contact">Ask a question</Link>
              </Button>
            </div>
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <Section className="bg-secondary/50" eyebrow="Related trips" title={`Packages that include ${d.name}`}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <PackageCard pkg={p} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </article>
  );
}
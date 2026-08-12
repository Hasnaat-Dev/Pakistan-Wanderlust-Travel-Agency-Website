import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { PackageCard } from "@/components/site/PackageCard";
import { Button } from "@/components/ui/button";
import { packages } from "@/data/packages";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/packages/")({
  head: () => ({
    meta: [
      { title: "Pakistan Tour Packages — Prices, Itineraries & Dates" },
      {
        name: "description",
        content:
          "Compare Pakistan tour packages by price, duration and region: Hunza, Skardu, Fairy Meadows, the Mughal heritage trail and Cholistan desert safaris.",
      },
      { property: "og:title", content: "Pakistan Tour Packages — Pakistan Wanderlust" },
      { property: "og:description", content: "All-inclusive ground packages with transparent PKR pricing." },
      { property: "og:url", content: "/packages" },
    ],
    links: [{ rel: "canonical", href: "/packages" }],
  }),
  component: PackagesPage,
});

const sorts = ["Recommended", "Price: low to high", "Price: high to low", "Shortest", "Longest"] as const;

function PackagesPage() {
  const [region, setRegion] = useState("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Recommended");

  const regions = ["All", ...Array.from(new Set(packages.map((p) => p.region)))];

  const list = useMemo(() => {
    const filtered = packages.filter((p) => region === "All" || p.region === region);
    const sorted = [...filtered];
    if (sort === "Price: low to high") sorted.sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low") sorted.sort((a, b) => b.price - a.price);
    if (sort === "Shortest") sorted.sort((a, b) => a.days - b.days);
    if (sort === "Longest") sorted.sort((a, b) => b.days - a.days);
    return sorted;
  }, [region, sort]);

  return (
    <div className="pt-28 lg:pt-36">
      <Section
        eyebrow="Tour packages"
        title="Every trip we run, with the price on the label"
        description="Ground costs, guides, permits and most meals included. Private departures available on any date."
      >
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="flex flex-wrap gap-2">
            {regions.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegion(r)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                  region === r
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-accent hover:text-foreground",
                )}
              >
                {r}
              </button>
            ))}
          </div>
          <label className="text-sm text-muted-foreground">
            <span className="sr-only">Sort packages</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof sorts)[number])}
              className="h-11 rounded-md border bg-card px-3 text-sm text-foreground"
            >
              {sorts.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <PackageCard pkg={p} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 rounded-2xl border bg-card p-8 text-center shadow-[var(--shadow-card)] sm:p-12">
          <h2 className="text-2xl sm:text-3xl">Customise your trip</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            None of these quite right? Tell us your dates, pace and budget and we'll write an itinerary from scratch.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link to="/book">Build a custom itinerary</Link>
          </Button>
        </Reveal>
      </Section>
    </div>
  );
}

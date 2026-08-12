import { useMemo, useState } from "react";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { DestinationCard } from "@/components/site/DestinationCard";
import { Input } from "@/components/ui/input";
import { destinations, REGIONS } from "@/data/destinations";
import { cn } from "@/lib/utils";

type DestinationSearch = { q?: string | undefined; region?: string | undefined };

export const Route = createFileRoute("/destinations/")({
  validateSearch: (search: Record<string, unknown>): DestinationSearch => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    region: typeof search["region"] === "string" ? search["region"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Destinations in Pakistan — Hunza, Skardu, Lahore & More" },
      {
        name: "description",
        content:
          "Explore 26 of Pakistan's best destinations by region: the Northern Areas, cultural Punjab and Sindh, the Makran coast, hill stations and the Cholistan desert.",
      },
      { property: "og:title", content: "Destinations in Pakistan — Pakistan Wanderlust" },
      { property: "og:description", content: "26 destinations across northern, cultural, coastal and desert Pakistan." },
      { property: "og:url", content: "/destinations" },
    ],
    links: [{ rel: "canonical", href: "/destinations" }],
  }),
  component: DestinationsPage,
});

function DestinationsPage() {
  const search = useSearch({ from: "/destinations/" });
  const [query, setQuery] = useState(search.q ?? "");
  const [region, setRegion] = useState<string>(search.region ?? "All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinations.filter(
      (d) =>
        (region === "All" || d.region === region) &&
        (!q || d.name.toLowerCase().includes(q) || d.short.toLowerCase().includes(q) || d.region.toLowerCase().includes(q)),
    );
  }, [query, region]);

  return (
    <div className="pt-28 lg:pt-36">
      <Section
        eyebrow="Destinations"
        title="Twenty-six reasons people come back"
        description="Filter by region or search for a valley, fort or lake. Every entry is a full guide, not a stock photo."
      >
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="relative">
            <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              maxLength={80}
              placeholder="Search destinations…"
              aria-label="Search destinations"
              className="h-12 pl-10"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "place" : "places"}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {["All", ...REGIONS].map((r) => (
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

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 0.08}>
              <DestinationCard destination={d} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">
            No destination matches that search. Try &ldquo;Hunza&rdquo;, &ldquo;fort&rdquo; or &ldquo;desert&rdquo;.
          </p>
        )}
      </Section>
    </div>
  );
}
import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { posts } from "@/data/posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Pakistan Travel Journal — Guides, Seasons & Food" },
      {
        name: "description",
        content: "Practical guides to travelling Pakistan: when to go north, what to pack for the Karakoram, and how to eat through Lahore.",
      },
      { property: "og:title", content: "Pakistan Travel Journal" },
      { property: "og:description", content: "Trip planning, seasons, food and culture from our guides." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <div className="pt-28 lg:pt-36">
      <Section eyebrow="Travel journal" title="Notes from the road" description="Written by the guides, not by an SEO agency.">
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group block h-full overflow-hidden rounded-xl border bg-card shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="aspect-16/9 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={1920}
                    height={1088}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-107"
                  />
                </div>
                <div className="p-6">
                  <p className="eyebrow">{p.category}</p>
                  <h2 className="mt-2 text-xl leading-snug">{p.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  <p className="mt-4 text-xs text-muted-foreground">{p.readTime}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}

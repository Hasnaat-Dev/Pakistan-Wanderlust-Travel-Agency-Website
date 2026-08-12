import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "motion/react";
import { ArrowRight, Compass, HeartHandshake, ShieldCheck, Wallet } from "lucide-react";
import { Hero } from "@/components/site/Hero";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { DestinationCard } from "@/components/site/DestinationCard";
import { PackageCard } from "@/components/site/PackageCard";
import { Lightbox } from "@/components/site/Lightbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { featuredDestinations, destinations } from "@/data/destinations";
import { featuredPackages } from "@/data/packages";
import { testimonials } from "@/data/site";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pakistan Wanderlust — Boutique Tours of Northern Pakistan" },
      {
        name: "description",
        content:
          "Guided small-group and private tours to Hunza, Skardu, Fairy Meadows, Deosai and Lahore. Local guides, honest PKR pricing, 14 years in the Karakoram.",
      },
      { property: "og:title", content: "Pakistan Wanderlust — Boutique Tours of Northern Pakistan" },
      {
        property: "og:description",
        content: "Journeys through the Karakoram, Hindu Kush and Himalaya, designed and guided by locals.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const reasons = [
  {
    icon: ShieldCheck,
    title: "Safety without the theatre",
    body: "Vetted drivers, satellite comms above 3,000 m and a 24/7 operations desk in Islamabad. We cancel when it isn't safe.",
  },
  {
    icon: Compass,
    title: "Guides from the valleys",
    body: "Our guides were born in Hunza, Skardu and Chitral. You get their families, their food and their shortcuts.",
  },
  {
    icon: Wallet,
    title: "Honest PKR pricing",
    body: "One quoted price with the full breakdown. No surprise permit fees, no jeep surcharges invented on the road.",
  },
  {
    icon: HeartHandshake,
    title: "Travel that stays local",
    body: "We book family guesthouses over chains and pay porters above the association rate. Your money stays in the valley.",
  },
];

function Index() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", dragFree: true }, [
    Autoplay({ delay: 4200, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [testiRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5200, stopOnInteraction: false })]);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const gallery = destinations.slice(0, 8).map((d) => ({ src: d.image, alt: `${d.name}, Pakistan` }));

  return (
    <>
      <Hero />

      {/* Why choose us */}
      <Section
        eyebrow="Why travel with us"
        title="A boutique operator, not a booking engine"
        description="Every itinerary is written by a person who has driven the road, slept in the guesthouse and eaten the trout."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="h-full rounded-xl border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <span className="grid size-11 place-items-center rounded-lg bg-primary/8 text-primary">
                  <r.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Featured destinations carousel */}
      <Section
        className="bg-secondary/50"
        eyebrow="Featured destinations"
        title="Six places that ruin you for other countries"
        description="Drag to explore. Every card opens a full guide with the best season, routes and related trips."
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {featuredDestinations.map((d) => (
              <div key={d.slug} className="min-w-0 shrink-0 basis-[82%] sm:basis-[48%] lg:basis-[32%]">
                <DestinationCard destination={d} tall />
              </div>
            ))}
          </div>
        </div>
        <Reveal className="mt-10">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/destinations">
              See all 26 destinations <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </Reveal>
      </Section>

      {/* Packages */}
      <Section
        eyebrow="Popular packages"
        title="Trips that are ready to go"
        description="Fixed departures and private versions of each. Prices are per person in PKR, all ground costs included."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPackages.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <PackageCard pkg={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-ink text-primary-foreground">
        <p className="eyebrow mb-3 text-gold">Travellers</p>
        <div className="overflow-hidden" ref={testiRef}>
          <div className="flex">
            {testimonials.map((t) => (
              <figure key={t.name} className="min-w-0 shrink-0 basis-full pr-8">
                <blockquote className="font-display text-2xl leading-snug text-balance sm:text-3xl lg:text-4xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm text-primary-foreground/60">
                  <span className="text-gold">{t.name}</span> — {t.from}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      {/* Gallery */}
      <Section
        eyebrow="From the road"
        title="Photographs our travellers actually took"
        description="Tap any frame to open it full size."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {gallery.map((img, i) => (
            <Reveal key={img.alt + i} delay={(i % 4) * 0.06}>
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group block w-full overflow-hidden rounded-lg"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  width={1920}
                  height={1088}
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
              </button>
            </Reveal>
          ))}
        </div>
        <Lightbox images={gallery} index={lightbox} onClose={() => setLightbox(null)} onNavigate={setLightbox} />
      </Section>

      {/* Newsletter */}
      <Section className="pb-28">
        <Reveal className="rounded-2xl border bg-card p-8 shadow-[var(--shadow-card)] sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl">Dispatches from the Karakoram</h2>
              <p className="mt-3 text-muted-foreground">
                One email a month: open passes, blossom dates, new departures and the occasional photograph worth
                stopping for.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = new FormData(e.currentTarget).get("email");
                if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
                  toast.error("Please enter a valid email address.");
                  return;
                }
                e.currentTarget.reset();
                toast.success("You're on the list. Salam and see you in the mountains.");
              }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Input
                name="email"
                type="email"
                required
                maxLength={255}
                placeholder="you@example.com"
                aria-label="Email address"
                className="h-12 transition-shadow focus-visible:shadow-[var(--shadow-card)]"
              />
              <Button type="submit" size="lg" className="shrink-0">
                Subscribe
              </Button>
            </form>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

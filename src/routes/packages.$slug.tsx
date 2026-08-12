import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getPackage } from "@/data/packages";
import { formatPKR } from "@/lib/currency";

export const Route = createFileRoute("/packages/$slug")({
  loader: ({ params }) => {
    const pkg = getPackage(params.slug);
    if (!pkg) throw notFound();
    return { pkg };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Package not found — Pakistan Wanderlust" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.pkg;
    return {
      meta: [
        { title: `${p.name} — ${p.days} Day Tour | Pakistan Wanderlust` },
        { name: "description", content: p.summary },
        { property: "og:title", content: p.name },
        { property: "og:description", content: p.summary },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/packages/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/packages/${params.slug}` }],
    };
  },
  component: PackageDetail,
});

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().min(7, "Enter a contact number").max(30),
  people: z.string().trim().min(1, "How many travellers?"),
});

function PackageDetail() {
  const { pkg } = Route.useLoaderData();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  return (
    <article>
      <header className="relative flex min-h-[62svh] items-end overflow-hidden bg-ink">
        <img src={pkg.image} alt={pkg.name} width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 sm:px-8">
          <p className="eyebrow text-gold">{pkg.region} · {pkg.difficulty}</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,5.5vw,4rem)] leading-tight font-semibold text-primary-foreground">{pkg.name}</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">{pkg.summary}</p>
          <p className="mt-5 font-display text-2xl text-gold">{formatPKR(pkg.price)} <span className="text-sm text-primary-foreground/60">per person · {pkg.days} days</span></p>
        </div>
      </header>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div>
            <Reveal>
              <h2 className="text-2xl sm:text-3xl">Day by day</h2>
              <Accordion type="single" collapsible className="mt-5" defaultValue="day-1">
                {pkg.itinerary.map((d) => (
                  <AccordionItem key={d.day} value={`day-${d.day}`}>
                    <AccordionTrigger className="text-left">
                      <span className="flex items-center gap-3">
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/8 font-display text-sm text-primary">{d.day}</span>
                        {d.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-11 text-muted-foreground">{d.detail}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              <Reveal className="rounded-xl border bg-card p-6">
                <h2 className="text-lg">What's included</h2>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  {pkg.includes.map((i) => (
                    <li key={i} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />{i}</li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.08} className="rounded-xl border bg-card p-6">
                <h2 className="text-lg">Not included</h2>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  {pkg.excludes.map((i) => (
                    <li key={i} className="flex gap-2.5"><X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />{i}</li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal className="mt-12">
              <h2 className="text-2xl sm:text-3xl">Price breakdown</h2>
              <ul className="mt-5 divide-y rounded-xl border bg-card">
                {pkg.breakdown.map((b) => (
                  <li key={b.label} className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                    <span className="text-muted-foreground">{b.label}</span>
                    <span className="font-medium">{formatPKR(b.amount)}</span>
                  </li>
                ))}
                <li className="flex items-center justify-between gap-4 bg-secondary/60 px-5 py-4">
                  <span className="font-medium">Total per person</span>
                  <span className="font-display text-xl text-primary">{formatPKR(pkg.price)}</span>
                </li>
              </ul>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28">
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = Object.fromEntries(new FormData(form));
                const result = bookingSchema.safeParse(data);
                if (!result.success) {
                  const next: Record<string, string> = {};
                  for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
                  setErrors(next);
                  toast.error("Please check the highlighted fields.");
                  return;
                }
                setErrors({});
                setSent(true);
                form.reset();
                // Placeholder handler: connect to your email service or backend here.
                toast.success("Booking request sent. We'll confirm availability within 24 hours.");
              }}
              className="space-y-4 rounded-xl border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <h2 className="text-xl">Book this trip</h2>
              <Input name="name" placeholder="Full name" maxLength={100} className="h-11" aria-label="Full name" aria-invalid={!!errors["name"]} />
              {errors["name"] && <p className="animate-fade-in text-sm text-destructive">{errors["name"]}</p>}
              <Input name="email" type="email" placeholder="Email" maxLength={255} className="h-11" aria-label="Email" aria-invalid={!!errors["email"]} />
              {errors["email"] && <p className="animate-fade-in text-sm text-destructive">{errors["email"]}</p>}
              <Input name="phone" placeholder="Phone / WhatsApp" maxLength={30} className="h-11" aria-label="Phone" aria-invalid={!!errors["phone"]} />
              {errors["phone"] && <p className="animate-fade-in text-sm text-destructive">{errors["phone"]}</p>}
              <Input name="dates" type="date" className="h-11" aria-label="Preferred start date" />
              <Input name="people" type="number" min={1} max={30} defaultValue={2} className="h-11" aria-label="Number of travellers" />
              <Button type="submit" size="lg" className="w-full">Request booking</Button>
              {sent && <p className="animate-fade-in text-center text-sm text-primary">Request received — check your inbox shortly.</p>}
              <Button asChild variant="outline" className="w-full">
                <Link to="/book" search={{ pkg: pkg.slug }}>Customise this trip</Link>
              </Button>
            </form>
          </aside>
        </div>
      </Section>
    </article>
  );
}

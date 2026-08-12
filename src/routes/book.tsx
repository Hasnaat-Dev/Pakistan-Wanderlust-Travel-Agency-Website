import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { destinations } from "@/data/destinations";
import { packages } from "@/data/packages";

type BookSearch = { destination?: string | undefined; pkg?: string | undefined };

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>): BookSearch => ({
    destination: typeof search["destination"] === "string" ? search["destination"] : undefined,
    pkg: typeof search["pkg"] === "string" ? search["pkg"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Plan Your Pakistan Trip — Booking & Inquiry" },
      { name: "description", content: "Three quick steps: choose your trip, give us your dates and party size, and we'll send a private itinerary within 24 hours." },
      { property: "og:title", content: "Plan Your Pakistan Trip" },
      { property: "og:description", content: "Tell us your dates and we'll build the itinerary." },
      { property: "og:url", content: "/book" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: BookPage,
});

const steps = ["Your trip", "Dates & party", "Your details"];

const detailsSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().min(7, "Enter a contact number").max(30),
});

function BookPage() {
  const search = Route.useSearch();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    trip: search.pkg ?? search.destination ?? "",
    start: "",
    end: "",
    people: "2",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const set = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const submit = () => {
    const result = detailsSchema.safeParse(form);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    // Placeholder handler: connect to your email service or backend here.
    setDone(true);
    toast.success("Inquiry received. We'll be in touch within 24 hours.");
  };

  return (
    <div className="pt-28 lg:pt-36">
      <Section eyebrow="Plan a trip" title="Three steps and we'll take it from there">
        <div className="mx-auto max-w-2xl">
          {/* Progress indicator */}
          <ol className="mb-10 flex items-center gap-3">
            {steps.map((label, i) => (
              <li key={label} className="flex flex-1 items-center gap-3">
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-semibold transition-colors ${
                    i <= step || done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < step || done ? <Check className="size-4" /> : i + 1}
                </span>
                <span className="hidden text-sm text-muted-foreground sm:block">{label}</span>
                {i < steps.length - 1 && <span className="h-px flex-1 bg-border" />}
              </li>
            ))}
          </ol>

          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border bg-card p-10 text-center shadow-[var(--shadow-card)]"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  className="mx-auto grid size-16 place-items-center rounded-full bg-primary text-primary-foreground"
                >
                  <Check className="size-8" />
                </motion.span>
                <h2 className="mt-6 text-2xl">Shukriya, {form.name.split(" ")[0]}!</h2>
                <p className="mt-3 text-muted-foreground">
                  Your inquiry is with our Islamabad desk. Expect a private itinerary and a PKR quote within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
              >
                {step === 0 && (
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="trip" className="text-sm font-medium">Which trip interests you?</label>
                      <select
                        id="trip"
                        value={form.trip}
                        onChange={(e) => set("trip", e.target.value)}
                        className="mt-2 h-12 w-full rounded-md border bg-background px-3 text-sm"
                      >
                        <option value="">Not sure yet — surprise me</option>
                        <optgroup label="Packages">
                          {packages.map((p) => (
                            <option key={p.slug} value={p.slug}>{p.name}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Destinations">
                          {destinations.map((d) => (
                            <option key={d.slug} value={d.slug}>{d.name}</option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="notes" className="text-sm font-medium">Anything we should know?</label>
                      <Textarea id="notes" rows={4} maxLength={1000} value={form.notes} onChange={(e) => set("notes", e.target.value)} className="mt-2" />
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="start" className="text-sm font-medium">Arrival date</label>
                      <Input id="start" type="date" value={form.start} onChange={(e) => set("start", e.target.value)} className="mt-2 h-12" />
                    </div>
                    <div>
                      <label htmlFor="end" className="text-sm font-medium">Departure date</label>
                      <Input id="end" type="date" value={form.end} onChange={(e) => set("end", e.target.value)} className="mt-2 h-12" />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="people" className="text-sm font-medium">Number of travellers</label>
                      <Input id="people" type="number" min={1} max={30} value={form.people} onChange={(e) => set("people", e.target.value)} className="mt-2 h-12" />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium">Full name</label>
                      <Input id="name" maxLength={100} value={form.name} onChange={(e) => set("name", e.target.value)} className="mt-2 h-12" aria-invalid={!!errors["name"]} />
                      {errors["name"] && <p className="mt-1.5 animate-fade-in text-sm text-destructive">{errors["name"]}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" type="email" maxLength={255} value={form.email} onChange={(e) => set("email", e.target.value)} className="mt-2 h-12" aria-invalid={!!errors["email"]} />
                      {errors["email"] && <p className="mt-1.5 animate-fade-in text-sm text-destructive">{errors["email"]}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-sm font-medium">Phone / WhatsApp</label>
                      <Input id="phone" maxLength={30} value={form.phone} onChange={(e) => set("phone", e.target.value)} className="mt-2 h-12" aria-invalid={!!errors["phone"]} />
                      {errors["phone"] && <p className="mt-1.5 animate-fade-in text-sm text-destructive">{errors["phone"]}</p>}
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-between gap-3">
                  <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
                    Back
                  </Button>
                  {step < steps.length - 1 ? (
                    <Button onClick={() => setStep((s) => s + 1)}>Continue</Button>
                  ) : (
                    <Button onClick={submit}>Send inquiry</Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Pakistan Wanderlust — Islamabad Office & WhatsApp" },
      { name: "description", content: "Call, email or WhatsApp our Islamabad team to plan a tour of Pakistan. We reply within 24 hours." },
      { property: "og:title", content: "Contact Pakistan Wanderlust" },
      { property: "og:description", content: "Islamabad office, WhatsApp and email — we reply within 24 hours." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  message: z.string().trim().min(10, "A little more detail helps us help you").max(1000),
});

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  return (
    <div className="pt-28 lg:pt-36">
      <Section eyebrow="Contact" title="Talk to a human in Islamabad" description="We answer WhatsApp fastest, email within a day.">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = Object.fromEntries(new FormData(form));
                const result = schema.safeParse(data);
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
                // Placeholder handler: point this at your email service or backend.
                toast.success("Message sent. We'll reply within 24 hours.");
              }}
              className="space-y-5 rounded-xl border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
            >
              <div>
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input id="name" name="name" maxLength={100} className="mt-2 h-12" aria-invalid={!!errors["name"]} />
                {errors["name"] && <p className="mt-1.5 animate-fade-in text-sm text-destructive">{errors["name"]}</p>}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" name="email" type="email" maxLength={255} className="mt-2 h-12" aria-invalid={!!errors["email"]} />
                {errors["email"] && <p className="mt-1.5 animate-fade-in text-sm text-destructive">{errors["email"]}</p>}
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea id="message" name="message" rows={5} maxLength={1000} className="mt-2" aria-invalid={!!errors["message"]} />
                {errors["message"] && <p className="mt-1.5 animate-fade-in text-sm text-destructive">{errors["message"]}</p>}
              </div>
              <Button type="submit" size="lg" className="w-full">Send message</Button>
              {sent && <p className="animate-fade-in text-center text-sm text-primary">Thank you — your message is with our team.</p>}
            </form>
          </Reveal>

          <Reveal delay={0.1} className="space-y-5">
            <div className="rounded-xl border bg-card p-6">
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />{site.address}</li>
                <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden /><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>
                <li className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden /><a href={`mailto:${site.email}`}>{site.email}</a></li>
              </ul>
            </div>
            <div className="overflow-hidden rounded-xl border">
              <iframe
                title="Pakistan Wanderlust office, Islamabad"
                loading="lazy"
                className="h-80 w-full"
                src="https://www.openstreetmap.org/export/embed.html?bbox=73.03%2C33.71%2C73.09%2C33.75&layer=mapnik&marker=33.7294%2C73.0631"
              />
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}

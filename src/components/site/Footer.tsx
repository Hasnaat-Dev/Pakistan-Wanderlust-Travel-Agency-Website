import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Mountain, Phone } from "lucide-react";
import { site } from "@/data/site";
import { destinations } from "@/data/destinations";

export function Footer() {
  return (
    <footer className="bg-ink text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr_1.4fr] lg:py-20">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-primary-foreground/10">
              <Mountain className="size-4.5" aria-hidden />
            </span>
            <span className="font-display text-lg font-semibold">Pakistan Wanderlust</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/65">{site.tagline}</p>
          <div className="mt-6 flex gap-4">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-primary-foreground/65 underline-offset-4 transition-colors hover:text-gold hover:underline"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer" className="text-sm">
          <h2 className="font-display text-base text-gold">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-primary-foreground/70">
            <li><Link to="/destinations" className="transition-colors hover:text-primary-foreground">Destinations</Link></li>
            <li><Link to="/packages" className="transition-colors hover:text-primary-foreground">Tour packages</Link></li>
            <li><Link to="/about" className="transition-colors hover:text-primary-foreground">About us</Link></li>
            <li><Link to="/blog" className="transition-colors hover:text-primary-foreground">Travel journal</Link></li>
            <li><Link to="/book" className="transition-colors hover:text-primary-foreground">Plan a trip</Link></li>
          </ul>
        </nav>

        <div className="text-sm">
          <h2 className="font-display text-base text-gold">Popular</h2>
          <ul className="mt-4 space-y-2.5 text-primary-foreground/70">
            {destinations.slice(0, 5).map((d) => (
              <li key={d.slug}>
                <Link
                  to="/destinations/$slug"
                  params={{ slug: d.slug }}
                  className="transition-colors hover:text-primary-foreground"
                >
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm">
          <h2 className="font-display text-base text-gold">Visit us</h2>
          <ul className="mt-4 space-y-3 text-primary-foreground/70">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              {site.address}
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
          <div className="mt-5 overflow-hidden rounded-lg border border-primary-foreground/10">
            <iframe
              title="Our office in Islamabad"
              src="https://www.openstreetmap.org/export/embed.html?bbox=73.03%2C33.71%2C73.09%2C33.75&layer=mapnik&marker=33.7294%2C73.0631"
              className="h-36 w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 px-5 py-6 sm:px-8">
        <p className="mx-auto max-w-6xl text-xs text-primary-foreground/50">
          &copy; {new Date().getFullYear()} Pakistan Wanderlust. Licensed tour operator, DTS Pakistan. All prices in PKR.
        </p>
      </div>
    </footer>
  );
}
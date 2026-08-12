import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { CalendarDays, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { destinations } from "@/data/destinations";
import hunza from "@/assets/hunza.jpg";
import skardu from "@/assets/skardu.jpg";
import fairyMeadows from "@/assets/fairy-meadows.jpg";
import swat from "@/assets/swat.jpg";

const slides = [
  { src: hunza, alt: "Sunrise over Hunza Valley and the Karakoram range", caption: "Hunza Valley" },
  { src: skardu, alt: "The turquoise Indus winding through Skardu's cold desert", caption: "Skardu" },
  { src: fairyMeadows, alt: "Fairy Meadows beneath Nanga Parbat", caption: "Fairy Meadows" },
  { src: swat, alt: "Terraced fields along the Swat River", caption: "Swat Valley" },
];

const headline = ["Pakistan,", "as the", "people who", "live here", "know it."];

export function Hero() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  // Parallax: the backdrop drifts slower than the page
  const y = useTransform(scrollY, [0, 800], [0, 180]);
  const overlayOpacity = useTransform(scrollY, [0, 600], [1, 0.4]);

  const [where, setWhere] = useState("");
  const [when, setWhen] = useState("");

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-ink">
      <motion.div style={{ y: reduced ? 0 : y }} className="absolute inset-0 -top-20 -bottom-20">
        <AnimatePresence mode="sync">
          <motion.img
            key={active}
            src={slides[active]?.src}
            alt={slides[active]?.alt ?? ""}
            width={1920}
            height={1088}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="ken-burns absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/45 to-black/70"
        />
      </motion.div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-32 pb-20 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-5 text-xs font-semibold tracking-[0.28em] text-gold uppercase"
        >
          Karakoram · Hindu Kush · Himalaya
        </motion.p>

        <h1 className="max-w-3xl font-display text-[clamp(2.5rem,7vw,5rem)] leading-[1.02] font-semibold text-primary-foreground">
          {headline.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduced ? { y: 0 } : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.25 + i * 0.09, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="mt-6 max-w-xl text-base text-primary-foreground/80 sm:text-lg"
        >
          Fourteen years of small-group and private journeys through the highest mountains on earth — planned and
          guided by the families who live at their feet.
        </motion.p>

        {/* Trip search — routes into the destinations page with the query applied */}
        <motion.form
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/destinations", search: { q: where || undefined, region: undefined } });
          }}
          className="mt-9 grid gap-3 rounded-xl border border-white/15 bg-black/35 p-3 backdrop-blur-xl sm:max-w-2xl sm:grid-cols-[1.4fr_1fr_auto]"
        >
          <label className="flex items-center gap-2.5 rounded-lg bg-white/8 px-3.5 py-3 transition-colors focus-within:bg-white/14">
            <MapPin className="size-4 shrink-0 text-gold" aria-hidden />
            <span className="sr-only">Where do you want to go?</span>
            <input
              list="hero-destinations"
              value={where}
              onChange={(e) => setWhere(e.target.value)}
              placeholder="Where do you want to go?"
              className="w-full min-w-0 bg-transparent text-sm text-primary-foreground placeholder:text-primary-foreground/55 focus:outline-none"
            />
            <datalist id="hero-destinations">
              {destinations.map((d) => (
                <option key={d.slug} value={d.name} />
              ))}
            </datalist>
          </label>

          <label className="flex items-center gap-2.5 rounded-lg bg-white/8 px-3.5 py-3 transition-colors focus-within:bg-white/14">
            <CalendarDays className="size-4 shrink-0 text-gold" aria-hidden />
            <span className="sr-only">Travel date</span>
            <input
              type="date"
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              className="w-full min-w-0 bg-transparent text-sm text-primary-foreground focus:outline-none [color-scheme:dark]"
            />
          </label>

          <Button type="submit" size="lg" className="gap-2">
            <Search className="size-4" aria-hidden /> Search
          </Button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <Button asChild variant="outline" className="border-white/25 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
            <Link to="/packages">Browse tour packages</Link>
          </Button>
          <p className="text-sm text-primary-foreground/60">
            Now showing: <span className="text-gold">{slides[active]?.caption}</span>
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.caption}
            type="button"
            aria-label={`Show ${s.caption}`}
            onClick={() => setActive(i)}
            className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-10 bg-gold" : "w-4 bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
}
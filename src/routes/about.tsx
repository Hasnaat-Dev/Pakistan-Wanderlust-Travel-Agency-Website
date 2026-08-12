import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { StatCounter } from "@/components/site/StatCounter";
import { stats, team } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Pakistan Wanderlust — Local Guides, 14 Years in the North" },
      {
        name: "description",
        content:
          "We are a Pakistani-owned boutique tour operator based in Islamabad, guiding travellers through the Karakoram, Hindu Kush and Himalaya since 2012.",
      },
      { property: "og:title", content: "About Pakistan Wanderlust" },
      { property: "og:description", content: "A Pakistani-owned boutique operator guiding the north since 2012." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const timeline = [
  { year: "2012", title: "A jeep and a satellite phone", body: "Wali Karim starts guiding trekkers from his family home in Karimabad." },
  { year: "2016", title: "Islamabad operations desk", body: "A permanent office opens so trips can be run, not improvised." },
  { year: "2019", title: "Cultural journeys launch", body: "Ayesha joins and the Mughal and Gandhara itineraries are written." },
  { year: "2022", title: "Porter pay pledge", body: "We commit to paying above association rates on every trek we run." },
  { year: "2026", title: "9,400 travellers later", body: "Twenty-six destinations, six signature packages, one obsession." },
];

function AboutPage() {
  return (
    <div className="pt-28 lg:pt-36">
      <Section
        eyebrow="Our story"
        title="Built by people from the valleys we take you to"
        description="Pakistan Wanderlust began because visitors kept arriving in Hunza with the wrong information and the wrong shoes."
      >
        <ol className="relative mt-4 border-l pl-8">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.07}>
              <li className="relative pb-10">
                <span className="absolute -left-[2.31rem] top-1.5 size-3 rounded-full bg-accent ring-4 ring-background" />
                <p className="font-display text-sm font-semibold text-accent">{t.year}</p>
                <h3 className="mt-1 text-xl">{t.title}</h3>
                <p className="mt-1.5 text-muted-foreground">{t.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section className="bg-secondary/50">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} label={s.label} />
          ))}
        </div>
      </Section>

      <Section eyebrow="The team" title="Four people you'll actually speak to">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.07}>
              {/* Hover-flip card: front shows the role, back shows the bio */}
              <div className="group h-64 [perspective:1200px]">
                <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border bg-card p-6 text-center [backface-visibility:hidden]">
                    <span className="grid size-16 place-items-center rounded-full bg-primary font-display text-xl text-primary-foreground">
                      {m.initials}
                    </span>
                    <h3 className="mt-4 text-lg">{m.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center rounded-xl bg-primary p-6 text-primary-foreground [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <p className="text-sm leading-relaxed">{m.bio}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}

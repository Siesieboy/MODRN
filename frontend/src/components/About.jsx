import { Reveal } from "./Reveal";

const CHAPTERS = [
  { n: "01", title: "Visie", text: "Design begint met begrijpen — van mensen, merken en momenten." },
  { n: "02", title: "Precisie", text: "Elke pixel, elke transitie en elke regel code verdient aandacht." },
  { n: "03", title: "Impact", text: "Mooi is pas waardevol als het ook werkt, laadt en converteert." },
];

export const About = () => (
  <section id="over-mij" data-testid="about-section" className="bg-paper text-navy py-28 sm:py-36">
    <div className="max-w-6xl mx-auto px-6">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky mb-4">01 — Over mij</p>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Achter de pixels
        </h2>
      </Reveal>

      <div className="mt-16 grid lg:grid-cols-2 gap-16 items-start">
        <Reveal delay={0.1}>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border-2 border-peach" />
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=85&w=1000&auto=format&fit=crop"
              alt="Werkplek van Sies Pasteuning"
              data-testid="about-portrait"
              className="relative rounded-2xl w-full aspect-[4/3] object-cover shadow-2xl"
            />
          </div>
        </Reveal>

        <div>
          <Reveal delay={0.15}>
            <p className="text-base leading-relaxed text-slate-600">
              Ik ben Sies Pasteuning, oprichter van MODRN website building &
              design. Ik help ondernemers en merken aan een online aanwezigheid
              die klopt: maatwerk websites en designs die er niet alleen strak
              uitzien, maar ook snel laden en bezoekers overtuigen.
            </p>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              Geen standaard templates, maar maatwerk — van eerste schets tot
              livegang. Jij levert de ambitie, ik zorg voor een website die
              daar naadloos bij aansluit.
            </p>
          </Reveal>

          <div className="mt-12 space-y-0">
            {CHAPTERS.map((c, i) => (
              <Reveal key={c.n} delay={0.2 + i * 0.1}>
                <div
                  data-testid={`manifesto-chapter-${c.n}`}
                  className="flex gap-6 py-6 border-t border-navy/10 last:border-b group"
                >
                  <span className="font-mono text-sm text-sky pt-1">{c.n}</span>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold group-hover:text-sky transition-colors duration-300">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{c.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

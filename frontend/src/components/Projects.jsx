import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { useState } from "react";

const PROJECTS = [
  {
    id: "proj-1",
    title: "Bakkerij Van Dort — Webshop",
    description:
      "Warme webshop met online bestellen en afhalen, ontworpen om meer omzet uit de buurt te halen.",
    image: "/images/projects/proj-bakkerij.png",
    tags: ["React", "TailwindCSS", "Bestelsysteem", "SEO"],
  },
  {
    id: "proj-2",
    title: "FitCentrum Lokaal — Boekingssite",
    description:
      "Leden boeken een les in twee klikken en het team ziet realtime de bezetting per uur.",
    image: "/images/projects/proj-fitcentrum.png",
    tags: ["Next.js", "Framer Motion", "Boekingssysteem", "Design"],
  },
];

const DESIGN_EXAMPLES = [
  { src: "/images/design/design-logo.png", alt: "Logo-ontwerp voor Koffiehoek", label: "Logo" },
  { src: "/images/design/design-poster.png", alt: "Poster-ontwerp voor Zomerklanken", label: "Poster" },
  { src: "/images/design/design-flyer.png", alt: "Flyer-ontwerp voor Kapper Stijl", label: "Flyer" },
  { src: "/images/design/design-visitekaartje.png", alt: "Visitekaartje-ontwerp voor Groen & Co", label: "Visitekaartje" },
  { src: "/images/design/design-instagram.png", alt: "Instagram-post-ontwerp voor Fris & Fruitig", label: "Instagram-post" },
  { src: "/images/design/design-menukaart.png", alt: "Menukaart-ontwerp voor Forno", label: "Menukaart" },
];

export const Projects = () => {
  const [active, setActive] = useState(null);
  const [design, setDesign] = useState(null);

  return (
    <section id="projecten" data-testid="projects-section" className="bg-ink py-28 sm:py-36">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky mb-4">02 — Projecten</p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-50">
            Mijn Projecten
          </h2>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 gap-8">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={0.08 * i}>
              <article
                data-testid={`project-card-${p.id}`}
                className="group rounded-2xl border border-sky/15 bg-card/50 overflow-hidden hover:-translate-y-2 hover:border-sky/40 hover:shadow-[0_24px_60px_rgba(135,206,235,0.12)] transition-all duration-500"
              >
                <div className="overflow-hidden aspect-[3/2]">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-7">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-slate-50 group-hover:text-peach transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">{p.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-sky/15 text-sky border border-sky/25"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    data-testid={`project-view-btn-${p.id}`}
                    onClick={() => setActive(p)}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-peach hover:gap-3 transition-all duration-300"
                  >
                    Bekijk Project <ArrowUpRight size={16} />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-20">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-slate-50">
                Voorbeelden van designwerk
              </h3>
              <span
                data-testid="design-examples-badge"
                className="text-xs font-mono px-3 py-1 rounded-full bg-sky/10 border border-sky/25 text-sky"
              >
                AI-voorbeelden
              </span>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {DESIGN_EXAMPLES.map((d) => (
                <button
                  key={d.src}
                  data-testid={`design-example-${d.label.toLowerCase().replace(/[^a-z]/g, "-")}`}
                  onClick={() => setDesign(d)}
                  aria-label={`${d.alt} groot bekijken`}
                  className="group relative rounded-2xl overflow-hidden border border-sky/15 hover:border-sky/40 hover:-translate-y-1.5 transition-all duration-500 text-left cursor-zoom-in"
                >
                  <img
                    src={d.src}
                    alt={d.alt}
                    loading="lazy"
                    className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute bottom-3 left-3 bg-navy/85 backdrop-blur-sm text-peach text-xs font-mono uppercase tracking-widest px-3 py-1.5 rounded-full">
                    {d.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <Dialog open={!!active} onOpenChange={() => setActive(null)}>
        <DialogContent
          data-testid="project-detail-modal"
          className="bg-card border-sky/25 text-slate-100 max-w-lg"
        >
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-peach">{active.title}</DialogTitle>
                <DialogDescription className="text-slate-400 leading-relaxed">
                  {active.description} Dit is een AI-gegenereerd conceptvoorbeeld
                  van MODRN — zo zou jouw project eruit kunnen zien.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-2 pt-2">
                {active.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-sky/15 text-sky border border-sky/25"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!design} onOpenChange={() => setDesign(null)}>
        <DialogContent
          data-testid="design-lightbox"
          className="bg-ink/95 border-sky/25 max-w-2xl p-3 sm:p-4"
        >
          {design && (
            <div>
              <img
                src={design.src}
                alt={design.alt}
                className="w-full max-h-[75vh] object-contain rounded-xl"
              />
              <div className="flex items-center justify-between px-2 pt-3">
                <p className="font-mono text-xs uppercase tracking-widest text-peach">
                  {design.label}
                </p>
                <p className="text-xs text-slate-500">AI-voorbeeld — {design.alt}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

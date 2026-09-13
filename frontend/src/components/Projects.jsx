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
  {
    id: "proj-3",
    title: "Café Koper — Restaurant",
    description:
      "Sfeervolle site met menukaart, reserveringsmodule en het verhaal achter het huis.",
    image: "/images/projects/proj-cafekoper.png",
    tags: ["React", "UI/UX", "Reserveren", "SEO"],
  },
  {
    id: "proj-4",
    title: "Studio Nova — Portfolio",
    description:
      "Minimalistisch studioportfolio met scrollytelling dat nieuwe opdrachten binnenhaalt.",
    image: "/images/projects/proj-studionova.png",
    tags: ["Three.js", "Lenis", "GSAP", "TailwindCSS"],
  },
];

export const Projects = () => {
  const [active, setActive] = useState(null);

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
    </section>
  );
};

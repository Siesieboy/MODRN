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
    title: "Fintech Dashboard Analytics",
    description:
      "Real-time financieel dashboard met high-frequency datavisualisaties, interactieve grafieken en geautomatiseerde rapportage.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=85&w=1200&auto=format&fit=crop",
    tags: ["React", "TailwindCSS", "Recharts", "TypeScript"],
  },
  {
    id: "proj-2",
    title: "E-Commerce Design System",
    description:
      "Modulair en toegankelijk componenten-framework voor een internationale mode-retailer met focus op conversie.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=85&w=1200&auto=format&fit=crop",
    tags: ["Next.js", "Framer Motion", "Shadcn/UI", "Storybook"],
  },
  {
    id: "proj-3",
    title: "Mobile Banking Interface",
    description:
      "Next-gen mobiele bankieren-app met biometrische beveiliging, micro-interacties en donkere modus.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=85&w=1200&auto=format&fit=crop",
    tags: ["React Native", "Tailwind", "Zustand", "Figma"],
  },
  {
    id: "proj-4",
    title: "Creative Studio Portfolio Hub",
    description:
      "Minimalistische portfolio-site met scrollytelling-visualisaties, WebGL-effecten en bliksemsnelle laadtijden.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=85&w=1200&auto=format&fit=crop",
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
                  {active.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit —
                  meer details over dit project volgen binnenkort.
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

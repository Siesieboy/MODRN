import { Check, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export const PACKAGES = [
  {
    id: "design",
    name: "Design Pakket",
    price: "€99",
    tagline: "Logo's, posters en meer",
    features: [
      "Logo of poster op maat",
      "Social media templates",
      "Visitekaartjes en flyers",
      "1 revisieronde inbegrepen",
      "Oplevering binnen 3 dagen",
    ],
    featured: false,
  },
  {
    id: "onepager",
    name: "One-Pager",
    price: "€399",
    tagline: "Perfect om snel online te zijn",
    features: [
      "1 op maat ontworpen pagina",
      "Responsive op elk scherm",
      "Contactformulier",
      "Basis SEO-inrichting",
      "Oplevering binnen 1 week",
    ],
    featured: false,
  },
  {
    id: "business",
    name: "Business Site",
    price: "€899",
    tagline: "Voor bedrijven die willen groeien",
    features: [
      "Tot 6 maatwerk pagina's",
      "Uniek custom design",
      "Blog of nieuws-module",
      "SEO + snelheidsoptimalisatie",
      "2 revisierondes inbegrepen",
      "Oplevering in 2–3 weken",
    ],
    featured: true,
  },
  {
    id: "maatwerk",
    name: "Webshop / Maatwerk",
    price: "€1.899",
    tagline: "Voor ambitieuze projecten",
    features: [
      "Webshop of custom functionaliteit",
      "Koppelingen met externe systemen",
      "Compleet design system",
      "3 maanden support inbegrepen",
      "Planning in overleg",
    ],
    featured: false,
  },
];

export const Services = () => (
  <section id="diensten" data-testid="services-section" className="bg-navy py-28 sm:py-36">
    <div className="max-w-6xl mx-auto px-6">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky mb-4">04 — Pakketten</p>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-50">
          Wat kost jouw project?
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">
          Transparante vanaf-prijzen, geen verrassingen. Elke aanvraag krijgt
          een vrijblijvend voorstel op maat.
        </p>
      </Reveal>

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {PACKAGES.map((p, i) => (
          <Reveal key={p.id} delay={0.08 * i}>
            <article
              data-testid={`service-card-${p.id}`}
              className={`relative h-full rounded-2xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 ${
                p.featured
                  ? "bg-card border-2 border-peach shadow-[0_24px_70px_rgba(255,218,185,0.15)]"
                  : "bg-card/50 border border-sky/15 hover:border-sky/40"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3.5 left-8 bg-peach text-navy text-xs font-bold px-4 py-1.5 rounded-full">
                  Meest gekozen
                </span>
              )}
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-slate-50">{p.name}</h3>
              <p className="mt-1.5 text-sm text-slate-400">{p.tagline}</p>
              <p className="mt-6 font-display">
                <span className="text-sm text-slate-400 align-top">vanaf</span>{" "}
                <span className={`text-4xl font-extrabold ${p.featured ? "text-peach" : "text-slate-50"}`}>
                  {p.price}
                </span>
              </p>
              <ul className="mt-8 space-y-3.5 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check size={16} className={`mt-0.5 shrink-0 ${p.featured ? "text-peach" : "text-sky"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                data-testid={`service-cta-${p.id}`}
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("modrn:select-package", { detail: p.id })
                  )
                }
                className={`group mt-9 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  p.featured
                    ? "bg-peach text-navy hover:bg-peach-hover"
                    : "border border-sky text-sky hover:bg-sky/10"
                }`}
              >
                Vraag aan
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="mt-10 text-sm text-slate-500 text-center">
          Alle prijzen zijn vanaf-prijzen excl. btw — de definitieve offerte volgt na je aanvraag.
        </p>
      </Reveal>
    </div>
  </section>
);

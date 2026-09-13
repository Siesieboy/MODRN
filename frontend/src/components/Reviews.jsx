import { Star, Quote } from "lucide-react";
import { Reveal } from "./Reveal";

const REVIEWS = [
  {
    id: "review-1",
    quote:
      "Van eerste schets tot livegang liep alles soepel. Onze webshop ziet er prachtig uit en de bestellingen stromen binnen.",
    name: "Marloes van Dijk",
    role: "Eigenaresse, ambachtelijke bakkerij",
    initials: "MD",
  },
  {
    id: "review-2",
    quote:
      "Eindelijk een boekingssite die onze leden écht gebruiken. Snel, duidelijk en heel professioneel aangepakt.",
    name: "Jayden Bakker",
    role: "Eigenaar, sportschool",
    initials: "JB",
  },
  {
    id: "review-3",
    quote:
      "Sies dacht vanaf dag één mee. Het resultaat voelt honderd procent als ons restaurant — gasten noemen de site regelmatig.",
    name: "Eva de Bruin",
    role: "Manager, horecazaak",
    initials: "EB",
  },
];

export const Reviews = () => (
  <section id="reviews" data-testid="reviews-section" className="bg-paper text-navy py-28 sm:py-36">
    <div className="max-w-6xl mx-auto px-6">
      <Reveal>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky">05 — Reviews</p>
          <span
            data-testid="reviews-disclaimer-badge"
            className="text-xs font-mono px-3 py-1 rounded-full bg-navy/5 border border-navy/15 text-navy/60"
          >
            Voorbeeldreviews — echte reviews volgen na de eerste projecten
          </span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Wat klanten zeggen
        </h2>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-3 gap-8">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.id} delay={0.08 * i}>
            <figure
              data-testid={`review-card-${r.id}`}
              className="h-full bg-white rounded-2xl border border-navy/10 p-8 flex flex-col hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(12,35,64,0.1)] transition-all duration-500"
            >
              <Quote size={28} className="text-peach" fill="#FFDAB9" />
              <div className="mt-5 flex gap-1">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={15} className="text-peach" fill="#FFDAB9" />
                ))}
              </div>
              <blockquote className="mt-5 text-base leading-relaxed text-slate-600 flex-1">
                "{r.quote}"
              </blockquote>
              <figcaption className="mt-7 pt-6 border-t border-navy/10 flex items-center gap-4">
                <span className="w-11 h-11 rounded-full bg-navy text-peach font-display font-bold text-sm flex items-center justify-center">
                  {r.initials}
                </span>
                <span>
                  <span className="block font-semibold text-sm">{r.name}</span>
                  <span className="block text-xs text-slate-500 mt-0.5">{r.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

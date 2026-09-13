import { ArrowUp } from "lucide-react";

export const Footer = () => (
  <footer className="bg-ink border-t border-sky/10 py-10">
    <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
      <p data-testid="footer-copyright" className="text-sm text-slate-500">
        © 2026 Sies Pasteuning — MODRN website building & design. Alle rechten voorbehouden.
      </p>
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-sky" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky" />
        </span>
        Beschikbaar voor nieuwe projecten
      </div>
      <a
        href="#home"
        data-testid="footer-back-to-top"
        aria-label="Terug naar boven"
        className="w-10 h-10 rounded-full border border-sky/25 flex items-center justify-center text-sky hover:bg-peach hover:text-navy hover:border-peach transition-all duration-300"
      >
        <ArrowUp size={16} />
      </a>
    </div>
  </footer>
);

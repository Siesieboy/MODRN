import { useState, useEffect } from "react";
import { Github, Instagram, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import { PACKAGES } from "./Services";

const WEB3FORMS_ACCESS_KEY = "dfe0f8b4-c29c-410c-ba7a-85a239ba9a82";

const SOCIALS = [
  { name: "GitHub", icon: Github, href: "https://github.com/Siesieboy", id: "github" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/_siespasteuning_", id: "instagram" },
];

export const Contact = () => {
  const [form, setForm] = useState({ naam: "", email: "", bericht: "", pakket: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onSelect = (e) => setForm((f) => ({ ...f, pakket: e.detail }));
    window.addEventListener("modrn:select-package", onSelect);
    return () => window.removeEventListener("modrn:select-package", onSelect);
  }, []);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          naam: form.naam,
          email: form.email,
          pakket: form.pakket,
          bericht: form.bericht,
          subject: "Nieuwe aanvraag via MODRN contactformulier",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error();
      toast.success("Aanvraag verzonden! Ik neem snel contact met je op.");
      setForm({ naam: "", email: "", bericht: "", pakket: "" });
    } catch {
      toast.error("Verzenden mislukt. Probeer het later opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="relative bg-ink py-28 sm:py-36 overflow-hidden">
      <div className="grain absolute inset-0 opacity-[0.05] pointer-events-none" />
      <div className="absolute -top-40 left-1/3 w-[480px] h-[480px] rounded-full bg-sky/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky mb-4">06 — Contact</p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-50">
            Vraag een custom website aan
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-slate-400">
            Op zoek naar een website of design op maat? Vertel kort over je
            project of idee — ik reageer meestal binnen een dag met een
            vrijblijvend voorstel.
          </p>
          <div className="mt-10 flex gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                data-testid={`social-link-${s.id}`}
                className="w-11 h-11 rounded-full border border-sky/25 flex items-center justify-center text-sky hover:bg-peach hover:text-navy hover:border-peach hover:-translate-y-1 transition-all duration-300"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={submit}
            data-testid="contact-form"
            className="rounded-2xl border border-sky/20 bg-card/50 backdrop-blur-md p-8 space-y-6"
          >
            <div>
              <label htmlFor="contact-naam" className="block text-sm font-semibold text-slate-200 mb-2">
                Naam
              </label>
              <input
                id="contact-naam"
                data-testid="contact-form-name"
                type="text"
                required
                minLength={2}
                value={form.naam}
                onChange={set("naam")}
                placeholder="Je naam"
                className="w-full rounded-lg bg-ink/60 border border-sky/20 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-peach focus:ring-1 focus:ring-peach transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-200 mb-2">
                E-mailadres
              </label>
              <input
                id="contact-email"
                data-testid="contact-form-email"
                type="email"
                required
                value={form.email}
                onChange={set("email")}
                placeholder="jij@voorbeeld.nl"
                className="w-full rounded-lg bg-ink/60 border border-sky/20 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-peach focus:ring-1 focus:ring-peach transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-pakket" className="block text-sm font-semibold text-slate-200 mb-2">
                Pakket
              </label>
              <select
                id="contact-pakket"
                data-testid="contact-form-package"
                value={form.pakket}
                onChange={set("pakket")}
                className="w-full rounded-lg bg-ink/60 border border-sky/20 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-peach focus:ring-1 focus:ring-peach transition-colors"
              >
                <option value="">Weet ik nog niet — graag advies</option>
                {PACKAGES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (vanaf {p.price})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="contact-bericht" className="block text-sm font-semibold text-slate-200 mb-2">
                Bericht
              </label>
              <textarea
                id="contact-bericht"
                data-testid="contact-form-message"
                required
                minLength={10}
                rows={5}
                value={form.bericht}
                onChange={set("bericht")}
                placeholder="Vertel kort over je gewenste website of design..."
                className="w-full rounded-lg bg-ink/60 border border-sky/20 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-peach focus:ring-1 focus:ring-peach transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              data-testid="contact-submit-button"
              className="w-full inline-flex items-center justify-center gap-2 bg-peach text-navy font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-peach-hover hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0 transition-all duration-300 shadow-[0_8px_30px_rgba(255,218,185,0.2)]"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {loading ? "Verzenden..." : "Verstuur aanvraag"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

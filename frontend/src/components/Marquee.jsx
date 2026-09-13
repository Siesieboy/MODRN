const ITEMS = [
  "MODRN",
  "Custom Websites",
  "Webdesign op Maat",
  "UI/UX Design",
  "React",
  "Branding",
  "Responsive Design",
  "Snelle Laadtijden",
];

export const Marquee = () => (
  <div
    data-testid="editorial-marquee"
    className="relative overflow-hidden border-y border-sky/15 bg-ink py-5 select-none"
    aria-hidden="true"
  >
    <div className="flex w-max animate-marquee">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center">
          {ITEMS.map((item) => (
            <span
              key={`${copy}-${item}`}
              className="flex items-center font-display text-lg sm:text-xl font-semibold tracking-wide text-slate-400"
            >
              <span className="px-6">{item}</span>
              <span className="text-peach text-sm">✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

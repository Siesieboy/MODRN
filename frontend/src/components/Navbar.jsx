import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Over mij", href: "#over-mij", id: "over-mij" },
  { label: "Projecten", href: "#projecten", id: "projecten" },
  { label: "Vaardigheden", href: "#vaardigheden", id: "vaardigheden" },
  { label: "Diensten", href: "#diensten", id: "diensten" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/70 backdrop-blur-xl border-b border-sky/10">
      <nav className="max-w-6xl mx-auto px-6 h-16 sm:h-20 flex items-center justify-between">
        <a
          href="#home"
          data-testid="nav-logo"
          className="flex items-center"
          aria-label="MODRN — naar boven"
        >
          <img
            src="/images/modrn-mark.png"
            alt="MODRN"
            className="h-5 sm:h-6 w-auto drop-shadow-[0_0_12px_rgba(135,206,235,0.35)]"
          />
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                data-testid={`nav-link-${l.id}`}
                className="text-sm text-slate-300 hover:text-peach transition-colors duration-300 font-medium tracking-wide"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          data-testid="nav-hamburger-btn"
          aria-label="Menu openen"
          onClick={() => setOpen(!open)}
          className="md:hidden text-peach p-2"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-ink/95 backdrop-blur-xl border-b border-sky/10"
          >
            <ul className="px-6 py-6 space-y-5">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={l.href}
                    data-testid={`mobile-nav-link-${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block text-lg font-display font-semibold text-slate-100 hover:text-peach transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

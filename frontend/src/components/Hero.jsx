import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";

const Line = ({ children, delay }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className="block"
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

export const Hero = () => {
  const cardRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-screen bg-navy hero-grid flex items-center overflow-hidden pt-24 pb-16"
    >
      <div className="grain absolute inset-0 opacity-[0.05] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-sky/10 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-52 -left-40 w-[520px] h-[520px] rounded-full bg-peach/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-14 items-center w-full">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-sky mb-8 flex items-center gap-3"
          >
            <span className="w-10 h-px bg-sky inline-block" />
            Portfolio — 2026
          </motion.p>

          <h1 className="font-display font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-slate-50">
            <Line delay={0.3}>Hallo, ik ben</Line>
            <Line delay={0.45}>
              <span className="text-peach">Sies Pasteuning</span>
            </Line>
            <Line delay={0.6}>
              <span className="text-outline">Custom Websites</span>
            </Line>
            <Line delay={0.75}>& Design</Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-slate-400"
          >
            Met MODRN website building & design ontwerp en bouw ik op maat
            gemaakte websites en designs voor ondernemers en merken die online
            willen opvallen — snel, strak en helemaal in jouw stijl.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#projecten"
              data-testid="hero-cta-werk"
              className="group inline-flex items-center gap-2 bg-peach text-navy font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-peach-hover hover:-translate-y-0.5 transition-all duration-300 shadow-[0_8px_30px_rgba(255,218,185,0.25)]"
            >
              Bekijk mijn werk
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="#contact"
              data-testid="hero-cta-contact"
              className="inline-flex items-center gap-2 border border-sky text-sky font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-sky/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              Vraag een website aan
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 hidden lg:block"
          style={{ perspective: 1000 }}
        >
          <motion.div
            ref={cardRef}
            onMouseMove={onMove}
            onMouseLeave={() => { mx.set(0); my.set(0); }}
            style={{ rotateX: rx, rotateY: ry }}
            data-testid="hero-portrait-card"
            className="relative rounded-2xl border border-sky/20 bg-card/60 backdrop-blur-md p-3 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-sky/30 via-transparent to-peach/30 pointer-events-none" />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=85&w=900&auto=format&fit=crop"
              alt="Portret van Sies Pasteuning"
              className="relative rounded-xl w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -bottom-5 -left-5 bg-navy border border-sky/25 rounded-xl px-5 py-3.5 flex items-center gap-3 shadow-xl">
              <Sparkles size={18} className="text-peach" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-sky">MODRN</p>
                <p className="text-sm font-semibold text-slate-100">Websites op maat</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#over-mij"
        data-testid="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sky/60 hover:text-peach transition-colors"
        aria-label="Scroll naar beneden"
      >
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="block">
          <ArrowDown size={22} />
        </motion.span>
      </motion.a>
    </section>
  );
};

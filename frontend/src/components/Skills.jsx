import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const CATEGORIES = {
  Frontend: [
    { name: "CSS", level: 94 },
    { name: "HTML", level: 96 },
    { name: "Graphic Design", level: 85 },
    { name: "JavaScript", level: 88 },
  ],
  "Soft Skills": [
    { name: "Samenwerken", level: 95 },
    { name: "Communicatie", level: 90 },
    { name: "Probleemoplossend denken", level: 92 },
    { name: "Nieuwsgierigheid", level: 98 },
  ],
};

export const Skills = () => {
  const [tab, setTab] = useState("Frontend");

  return (
    <section id="vaardigheden" data-testid="skills-section" className="bg-paper text-navy py-28 sm:py-36">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky mb-4">03 — Vaardigheden</p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Waar ik sterk in ben
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-3">
            {Object.keys(CATEGORIES).map((cat) => (
              <button
                key={cat}
                data-testid={`skill-tab-${cat.toLowerCase().replace(/[^a-z]/g, "-")}`}
                onClick={() => setTab(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  tab === cat
                    ? "bg-navy text-peach shadow-lg"
                    : "bg-white text-navy/60 border border-navy/10 hover:border-navy/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 gap-x-14 gap-y-10">
          {CATEGORIES[tab].map((skill, i) => (
            <div key={skill.name} data-testid={`skill-bar-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}>
              <div className="flex items-end justify-between mb-3">
                <span className="font-semibold text-base">{skill.name}</span>
                <span className="font-mono text-sm text-sky">{skill.level}%</span>
              </div>
              <div className="h-2 rounded-full bg-navy/10 overflow-hidden">
                <motion.div
                  key={tab + skill.name}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-sky to-navy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

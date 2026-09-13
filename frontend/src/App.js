import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, anchors: true });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-navy min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <Toaster position="bottom-right" theme="dark" richColors />
    </div>
  );
}

export default App;

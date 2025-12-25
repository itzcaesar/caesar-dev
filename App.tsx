import React, { useState, useEffect } from 'react';
import { SectionId } from './types';
import GridBackground from './components/Layout/GridBackground';
import Scanline from './components/Layout/Scanline';
import ParticleBackground from './components/Layout/ParticleBackground';
import { RevealOnScroll } from './components/Layout/RevealOnScroll';
import Navigation from './components/Layout/Navigation';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Projects from './components/Sections/Projects';
import Skills from './components/Sections/Skills';
import Contact from './components/Sections/Contact';
import CustomCursor from './components/Layout/CustomCursor';
import { AudioProvider } from './contexts/AudioContext';

import { AnimatePresence } from 'framer-motion';
import { BootSequence } from './components/Layout/BootSequence';
import { ScrollRadar } from './components/Layout/ScrollRadar';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [showBoot, setShowBoot] = useState(false);

  useEffect(() => {
    // Check if it's the first visit in this session
    const hasBooted = sessionStorage.getItem('caesar_boot_sequence');
    if (!hasBooted) {
      setShowBoot(true);
      sessionStorage.setItem('caesar_boot_sequence', 'true');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <AudioProvider>
      <div className="min-h-screen relative font-sans bg-sw-black text-sw-white selection:bg-sw-accent selection:text-black">
        <AnimatePresence>
          {showBoot && <BootSequence onComplete={() => setShowBoot(false)} />}
        </AnimatePresence>

        <div className="hidden md:block">
          <CustomCursor />
        </div>

        <GridBackground />
        <Scanline />
        <ParticleBackground />
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        <ScrollRadar activeSection={activeSection} setActiveSection={setActiveSection} />

        <main className="relative z-10">
          <Hero />
          <RevealOnScroll width="100%">
            <About />
          </RevealOnScroll>
          <RevealOnScroll width="100%">
            <Projects />
          </RevealOnScroll>
          <RevealOnScroll width="100%">
            <Skills />
          </RevealOnScroll>
          <RevealOnScroll width="100%">
            <Contact />
          </RevealOnScroll>
        </main>
      </div>
    </AudioProvider>
  );
};

export default App;
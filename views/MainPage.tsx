'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import About from '@/components/Sections/About';
import Contact from '@/components/Sections/Contact';
import Hero from '@/components/Sections/Hero';
import Projects from '@/components/Sections/Projects';
import Skills from '@/components/Sections/Skills';
import CustomCursor from '@/components/Layout/CustomCursor';
import GridBackground from '@/components/Layout/GridBackground';
import Navigation from '@/components/Layout/Navigation';
import ParticleBackground from '@/components/Layout/ParticleBackground';
import { BootSequence } from '@/components/Layout/BootSequence';
import { RevealOnScroll } from '@/components/Layout/RevealOnScroll';
import { ScrollRadar } from '@/components/Layout/ScrollRadar';
import Scanline from '@/components/Layout/Scanline';
import { useApp } from '@/contexts/AppContext';
import type { LocalizedHomeData, LocalizedRecord, SectionId } from '@/types';

type MainPageProps = {
  data: LocalizedRecord<LocalizedHomeData>;
};

const MainPage: React.FC<MainPageProps> = ({ data }) => {
  const { language } = useApp();
  const content = data[language] || data.en;
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [showBoot, setShowBoot] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

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
      { threshold: 0.2 },
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  useEffect(() => {
    document.title = content.homePage.metadata.title;

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    description?.setAttribute('content', content.homePage.metadata.description);
  }, [content.homePage.metadata.description, content.homePage.metadata.title]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen relative font-sans bg-sw-black text-sw-white selection:bg-sw-accent selection:text-black"
    >
      <AnimatePresence>
        {showBoot && <BootSequence onComplete={() => setShowBoot(false)} />}
      </AnimatePresence>

      <CustomCursor />

      <GridBackground />
      <Scanline />
      <ParticleBackground />
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        siteSettings={content.siteSettings}
      />
      <ScrollRadar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="relative z-10">
        <Hero content={content.homePage.hero} siteSettings={content.siteSettings} />
        <RevealOnScroll width="100%">
          <About content={content.homePage.about} />
        </RevealOnScroll>
        <RevealOnScroll width="100%">
          <Projects
            content={content.homePage.projectsSection}
            projects={content.projects}
            uiLabels={content.siteSettings.uiLabels}
          />
        </RevealOnScroll>
        <RevealOnScroll width="100%">
          <Skills content={content.homePage.skillsSection} skills={content.skills} />
        </RevealOnScroll>
        <RevealOnScroll width="100%">
          <Contact content={content.homePage.contact} siteSettings={content.siteSettings} />
        </RevealOnScroll>
      </main>
    </motion.div>
  );
};

export default MainPage;

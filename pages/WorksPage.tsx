import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import GridBackground from '@/components/Layout/GridBackground';
import Scanline from '@/components/Layout/Scanline';
import ParticleBackground from '@/components/Layout/ParticleBackground';
import Navigation from '@/components/Layout/Navigation';
import CustomCursor from '@/components/Layout/CustomCursor';
import WorksHero from '@/components/Sections/Works/WorksHero';
import { WorkExperience } from '@/components/Sections/Works/WorkExperience';
import AllProjects from '@/components/Sections/Works/AllProjects';
import CurrentWork from '@/components/Sections/Works/CurrentWork';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/locales/translations';

const WorksPage: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t.metadata.works.title}</title>
        <meta name="description" content={t.metadata.works.description} />
        
        {/* Open Graph tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t.metadata.works.title} />
        <meta property="og:description" content={t.metadata.works.description} />
        <meta property="og:url" content="https://caesarrifqi.com/works" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.metadata.works.title} />
        <meta name="twitter:description" content={t.metadata.works.description} />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen relative font-sans bg-sw-black text-sw-white selection:bg-sw-accent selection:text-black"
      >
        <div className="hidden md:block">
          <CustomCursor />
        </div>

        <GridBackground />
        <Scanline />
        <ParticleBackground />
        <Navigation />

        <main className="relative z-10">
          <WorksHero />
          <WorkExperience />
          <AllProjects />
          <CurrentWork />
        </main>
      </motion.div>
    </>
  );
};

export default WorksPage;

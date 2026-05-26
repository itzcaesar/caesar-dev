'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import AllProjects from '@/components/Sections/Works/AllProjects';
import CurrentWork from '@/components/Sections/Works/CurrentWork';
import CustomCursor from '@/components/Layout/CustomCursor';
import GridBackground from '@/components/Layout/GridBackground';
import Navigation from '@/components/Layout/Navigation';
import ParticleBackground from '@/components/Layout/ParticleBackground';
import Scanline from '@/components/Layout/Scanline';
import WorksHero from '@/components/Sections/Works/WorksHero';
import { WorkExperience } from '@/components/Sections/Works/WorkExperience';
import { useApp } from '@/contexts/AppContext';
import type { LocalizedRecord, LocalizedWorksData } from '@/types';

type WorksPageProps = {
  data: LocalizedRecord<LocalizedWorksData>;
};

const WorksPage: React.FC<WorksPageProps> = ({ data }) => {
  const { language } = useApp();
  const content = data[language] || data.en;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = content.worksPage.metadata.title;

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    description?.setAttribute('content', content.worksPage.metadata.description);
  }, [content.worksPage.metadata.description, content.worksPage.metadata.title]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen relative font-sans bg-sw-black text-sw-white selection:bg-sw-accent selection:text-black"
    >
      <CustomCursor />

      <GridBackground />
      <Scanline />
      <ParticleBackground />
      <Navigation siteSettings={content.siteSettings} />

      <main className="relative z-10">
        <WorksHero
          content={content.worksPage.hero}
          currentProjectCount={content.currentProjects.length}
          experienceCount={content.workExperiences.length}
          projectCount={content.projects.length}
        />
        <WorkExperience
          content={content.worksPage.experienceSection}
          experiences={content.workExperiences}
        />
        <AllProjects
          content={content.worksPage.allProjectsSection}
          projects={content.projects}
          uiLabels={content.siteSettings.uiLabels}
        />
        <CurrentWork
          content={content.worksPage.currentWorkSection}
          currentProjects={content.currentProjects}
          uiLabels={content.siteSettings.uiLabels}
        />
      </main>
    </motion.div>
  );
};

export default WorksPage;

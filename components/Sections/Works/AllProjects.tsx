import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import { createPortal } from 'react-dom';

import { RevealOnScroll } from '@/components/Layout/RevealOnScroll';
import type { Project, SiteSettings, WorksPageContent } from '@/types';

type AllProjectsProps = {
  content: WorksPageContent['allProjectsSection'];
  projects: Project[];
  uiLabels: SiteSettings['uiLabels'];
};

const imageFor = (project: Project) => project.imageFile || project.imageUrl;

const ProjectModal: React.FC<{
  onClose: () => void;
  project: Project;
  uiLabels: SiteSettings['uiLabels'];
}> = ({ onClose, project, uiLabels }) => {
  const [imageError, setImageError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="flex min-h-[100svh] items-center justify-center p-4 md:p-6">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        className="w-full max-w-3xl max-h-[calc(100svh-2rem)] overflow-y-auto border-2 border-sw-accent bg-sw-black p-6 outline-none font-sans md:max-h-[calc(100svh-3rem)] md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 pr-4">
            <p className="font-mono text-[10px] text-sw-accent mb-2 uppercase tracking-wider">{uiLabels.projectDetails}</p>
            <h3 className="text-xl md:text-2xl font-bold uppercase text-white leading-tight">{project.title.replace(/_/g, ' ')}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label={uiLabels.close}
            className="text-gray-500 hover:text-sw-accent transition-colors flex-shrink-0 outline-none focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6 relative aspect-video bg-sw-dark border border-white/10 overflow-hidden">
          {!imageFor(project) || imageError ? (
            <div className="flex h-full w-full items-center justify-center px-4 text-center">
              <span className="font-mono text-xs text-gray-500 uppercase">{uiLabels.imageNotFound}</span>
            </div>
          ) : (
            <img
              src={imageFor(project)}
              alt={project.imageAlt || project.title}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        <p className="text-gray-400 font-mono text-sm leading-relaxed border-l-2 border-sw-accent/30 pl-4 py-2 mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={`${project.id}-${tag}`}
              className="text-[10px] font-mono border border-sw-accent/30 text-sw-accent px-2 py-1 uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-sw-accent text-black font-bold uppercase text-center py-3 hover:bg-white transition-colors tracking-widest text-sm flex items-center justify-center gap-2"
            >
              <Github size={16} />
              {uiLabels.repository}
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white/10 border border-white/20 text-white font-bold uppercase text-center py-3 hover:border-sw-accent hover:text-sw-accent transition-colors tracking-widest text-sm flex items-center justify-center gap-2"
            >
              <ExternalLink size={16} />
              {uiLabels.demo}
            </a>
          )}
        </div>
      </motion.div>
      </div>
    </div>,
    document.body,
  );
};

const AllProjects: React.FC<AllProjectsProps> = ({ content, projects, uiLabels }) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (projects.length === 0) {
    return (
      <section className="py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 bg-sw-black relative z-20">
        <div className="max-w-[1400px] mx-auto w-full">
          <RevealOnScroll width="100%">
            <div className="flex flex-col gap-2 mb-12 md:mb-20">
              <span className="font-mono text-sw-accent text-xs uppercase">
                {content.subtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
                <span className="text-sw-accent">//</span> {content.title}
              </h2>
            </div>
            <div className="text-center py-12 md:py-20 border border-white/10 bg-sw-black/50">
              <p className="font-mono text-gray-500 text-xs sm:text-sm">
                {content.noDataLabel}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 bg-sw-black relative z-20">
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            uiLabels={uiLabels}
          />
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto w-full">
        <RevealOnScroll width="100%">
          <div className="flex flex-col gap-2 mb-12 md:mb-20">
            <span className="font-mono text-sw-accent text-xs uppercase">
              {content.subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              <span className="text-sw-accent">//</span> {content.title}
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={project.id}>
              <RevealOnScroll delay={index * 0.08}>
                <motion.div
                  className="group relative border-2 border-white/20 bg-sw-black/80 backdrop-blur hover:border-sw-accent transition-colors duration-300 h-full flex flex-col overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ willChange: 'transform' }}
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-sw-dark">
                    {imageErrors[project.id] || !imageFor(project) ? (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sw-dark to-sw-black">
                        <span className="font-mono text-xs text-gray-600">
                          {uiLabels.imageNotFound}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={imageFor(project)}
                        alt={project.imageAlt || project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        onError={() => setImageErrors((prev) => ({ ...prev, [project.id]: true }))}
                      />
                    )}
                    <div className="absolute inset-0 bg-sw-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold uppercase mb-3 text-white group-hover:text-sw-accent transition-colors">
                      {project.title.replace(/_/g, ' ')}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem]">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono border border-white/10 text-gray-400 px-2 py-1 uppercase group-hover:border-sw-accent group-hover:text-sw-accent transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-white/10">
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-sw-accent transition-colors"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <Github size={16} />
                          <span>{uiLabels.repoShort}</span>
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-sw-accent transition-colors"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <ExternalLink size={16} />
                          <span>{uiLabels.demo}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </RevealOnScroll>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProjects;

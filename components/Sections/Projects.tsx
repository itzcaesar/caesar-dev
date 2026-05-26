import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Github, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

import type { HomePageContent, Project, SiteSettings } from '@/types';

type ProjectModalProps = {
  onClose: () => void;
  project: Project;
  uiLabels: SiteSettings['uiLabels'];
};

const projectImages = (project: Project) =>
  project.images?.length ? project.images : [project.imageFile || project.imageUrl].filter(Boolean);

const ImageViewer: React.FC<{
  images: string[];
  initialIndex: number;
  onClose: () => void;
}> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') goToPrev();
      if (event.key === 'ArrowRight') goToNext();
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 z-[130] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-sw-accent transition-colors z-10"
      >
        <X size={32} />
      </button>

      <div className="relative w-full h-full flex items-center justify-center" onClick={(event) => event.stopPropagation()}>
        <img
          src={images[currentIndex]}
          alt=""
          className="max-w-full max-h-full object-contain"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-sw-black/80 border border-sw-accent p-3 hover:bg-sw-accent hover:text-black transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-sw-black/80 border border-sw-accent p-3 hover:bg-sw-accent hover:text-black transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-sw-black/80 border border-white/20 px-4 py-2">
              <span className="font-mono text-xs text-white">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ProjectModal: React.FC<ProjectModalProps> = ({ onClose, project, uiLabels }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const images = projectImages(project);

  useEffect(() => {
    setIsMounted(true);
    setImageError(false);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [project.id]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {showImageViewer && (
          <ImageViewer
            images={images}
            initialIndex={currentImageIndex}
            onClose={() => setShowImageViewer(false)}
          />
        )}
      </AnimatePresence>

      {createPortal(
        <div className="fixed inset-0 z-[120] overflow-y-auto bg-black/80 backdrop-blur-sm" onClick={onClose}>
        <div className="flex min-h-[100svh] items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          className="w-full max-w-3xl max-h-[calc(100svh-2rem)] overflow-y-auto border-2 border-sw-accent bg-sw-black p-6 outline-none font-sans md:max-h-[calc(100svh-3rem)] md:p-8"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_0%,rgba(204,255,0,0.1)_50%,transparent_100%)] h-[200%] animate-scan" style={{ animationDuration: '3s' }} />

          <div className="relative z-10">
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
                <span className="font-mono text-lg">[X]</span>
              </button>
            </div>

            {images.length > 0 && (
              <div className="mb-6 relative group">
                <div
                  className="relative aspect-video bg-sw-dark border border-white/10 overflow-hidden cursor-pointer"
                  onClick={() => setShowImageViewer(true)}
                >
                  {imageError ? (
                    <div className="flex h-full w-full items-center justify-center px-4 text-center">
                      <span className="font-mono text-xs text-gray-500 uppercase">{uiLabels.imageNotFound}</span>
                    </div>
                  ) : (
                    <img
                      src={images[currentImageIndex]}
                      alt={project.imageAlt || project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={() => setImageError(true)}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 font-mono text-xs text-white bg-sw-black/80 px-3 py-1 border border-sw-accent">
                      {uiLabels.clickToExpand}
                    </span>
                  </div>
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-sw-black/80 border border-white/20 p-2 hover:border-sw-accent hover:text-sw-accent transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        setCurrentImageIndex((prev) => (prev + 1) % images.length);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-sw-black/80 border border-white/20 p-2 hover:border-sw-accent hover:text-sw-accent transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>
            )}

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
          </div>

          <div className="absolute top-0 left-0 w-3 h-3 bg-sw-accent pointer-events-none" />
          <div className="absolute top-0 right-0 w-3 h-3 bg-sw-accent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-sw-accent pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-sw-accent pointer-events-none" />
        </motion.div>
        </div>
      </div>,
      document.body,
      )}
    </>
  );
};

type ProjectsProps = {
  content: HomePageContent['projectsSection'];
  projects: Project[];
  uiLabels: SiteSettings['uiLabels'];
};

const Projects: React.FC<ProjectsProps> = ({ content, projects, uiLabels }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const router = useRouter();

  return (
    <section id="projects" className="py-20 md:py-24 px-6 bg-sw-black relative z-20 border-t border-white/10">
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            onClose={() => setSelectedProject(null)}
            project={selectedProject}
            uiLabels={uiLabels}
          />
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-sw-accent text-xs">{content.subtitle}</span>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">{content.title}</h2>
          </div>
          <p className="text-gray-500 font-mono text-xs md:text-right max-w-xs">
            {content.archiveLabel}<br />
            {content.periodLabel}
          </p>
        </div>

        <div className="flex flex-col border-y border-white/10">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative border-b border-white/10 transition-colors bg-sw-black"
              onClick={() => setSelectedProject(project)}
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
                event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
              }}
            >
              <div
                className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(204, 255, 0, 0.15), transparent 40%)`,
                }}
              />
              <div className="absolute inset-x-0 bottom-0 h-px z-10 bg-gradient-to-r from-transparent via-sw-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div
                className="relative z-10 grid gap-5 py-6 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)_auto] md:items-center md:py-7 cursor-pointer"
                data-cursor-text={uiLabels.projectDetails}
              >
                <div className="flex items-start gap-4 md:gap-8 min-w-0">
                  <span className="font-mono text-xs text-gray-600 group-hover:text-sw-accent transition-colors pt-1">
                    0{index + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-2xl md:text-3xl font-bold uppercase leading-tight group-hover:translate-x-1 transition-transform duration-300">
                      {project.title.replace(/_/g, ' ')}
                    </h3>
                    <span className="mt-2 inline-block font-mono text-[10px] uppercase text-sw-accent/70 md:hidden">
                      {uiLabels.projectDetails}
                    </span>
                  </div>
                </div>

                <div className="grid gap-4 min-w-0">
                  <p className="text-gray-400 text-sm max-w-xl line-clamp-2 opacity-75 group-hover:opacity-100 transition-opacity">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 min-w-0">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono border border-white/10 text-gray-400 px-2 py-1 uppercase group-hover:border-sw-accent group-hover:text-sw-accent transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-end gap-2 font-mono text-[10px] uppercase text-gray-600 group-hover:text-sw-accent transition-colors">
                  {uiLabels.projectDetails}
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.push('/works')}
            className="group border border-white/20 px-6 py-3 hover:border-sw-accent transition-colors duration-300 flex items-center gap-3"
          >
            <span className="text-sm uppercase tracking-wider font-mono text-white group-hover:text-sw-accent transition-colors">
              {content.viewAllWorksLabel}
            </span>
            <ArrowRight className="text-white group-hover:text-sw-accent group-hover:translate-x-1 transition-all duration-300" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;

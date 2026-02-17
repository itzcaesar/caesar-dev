import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PROJECTS } from '@/constants';
import { useApp } from '@/contexts/AppContext';
import { useSound } from '@/contexts/AudioContext';
import { translations } from '@/locales/translations';
import { RevealOnScroll } from '@/components/Layout/RevealOnScroll';
import { Project } from '@/types';

const ImageViewer: React.FC<{
  images: string[];
  initialIndex: number;
  onClose: () => void;
}> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const { playSound } = useSound();

  const goToNext = () => {
    playSound('click');
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    playSound('click');
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-sw-accent transition-colors z-10"
      >
        <X size={32} />
      </button>

      <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
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

const ProjectModal: React.FC<{
  project: Project | null;
  onClose: () => void;
}> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const { playSound } = useSound();

  if (!project) return null;

  const projectImages = project.images || [(project.imageFile || project.imageUrl)];

  const goToNextImage = () => {
    playSound('click');
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const goToPrevImage = () => {
    playSound('click');
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  return (
    <>
      <AnimatePresence>
        {showImageViewer && (
          <ImageViewer
            images={projectImages}
            initialIndex={currentImageIndex}
            onClose={() => {
              playSound('click');
              setShowImageViewer(false);
            }}
          />
        )}
      </AnimatePresence>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-20 bg-black/80 backdrop-blur-sm" onClick={onClose}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-sw-black border-2 border-sw-accent p-8 max-w-2xl w-full relative overflow-hidden outline-none max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_0%,rgba(204,255,0,0.1)_50%,transparent_100%)] h-[200%] animate-scan" style={{ animationDuration: '3s' }} />

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1 pr-4">
                <p className="font-mono text-[10px] text-sw-accent mb-2 uppercase tracking-wider">PROJECT_DETAILS</p>
                <h3 className="text-xl md:text-2xl font-bold uppercase text-white leading-tight">{project.title.replace(/_/g, ' ')}</h3>
              </div>
              <button 
                onClick={() => { playSound('click'); onClose(); }} 
                className="text-gray-500 hover:text-sw-accent transition-colors flex-shrink-0 outline-none focus:outline-none"
              >
                <span className="font-mono text-lg">[X]</span>
              </button>
            </div>

            {projectImages.length > 0 && (
              <div className="mb-6 relative group">
                <div 
                  className="relative aspect-video bg-sw-dark border border-white/10 overflow-hidden cursor-pointer"
                  onClick={() => {
                    playSound('click');
                    setShowImageViewer(true);
                  }}
                >
                  <img
                    src={projectImages[currentImageIndex]}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 font-mono text-xs text-white bg-sw-black/80 px-3 py-1 border border-sw-accent">
                      CLICK TO EXPAND
                    </span>
                  </div>
                </div>

                {projectImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPrevImage();
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-sw-black/80 border border-white/20 p-2 hover:border-sw-accent hover:text-sw-accent transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToNextImage();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-sw-black/80 border border-white/20 p-2 hover:border-sw-accent hover:text-sw-accent transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={20} />
                    </button>

                    <div className="flex gap-2 mt-3 justify-center">
                      {projectImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            playSound('hover');
                            setCurrentImageIndex(index);
                          }}
                          className={`w-2 h-2 transition-colors ${
                            index === currentImageIndex ? 'bg-sw-accent' : 'bg-white/20 hover:bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="mb-6">
              <p className="text-gray-400 font-mono text-sm leading-relaxed border-l-2 border-sw-accent/30 pl-4 py-2">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span
                  key={tag}
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
                  onClick={() => playSound('click')}
                  onMouseEnter={() => playSound('hover')}
                >
                  <Github size={16} />
                  Repository
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white/10 border border-white/20 text-white font-bold uppercase text-center py-3 hover:border-sw-accent hover:text-sw-accent transition-colors tracking-widest text-sm flex items-center justify-center gap-2"
                  onClick={() => playSound('click')}
                  onMouseEnter={() => playSound('hover')}
                >
                  <ExternalLink size={16} />
                  Demo
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
    </>
  );
};

const AllProjects: React.FC = () => {
  const { language } = useApp();
  const { playSound } = useSound();
  const t = translations[language].works.allProjects;
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleImageError = (projectId: string) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  };

  if (PROJECTS.length === 0) {
    return (
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-sw-black relative z-20">
        <div className="max-w-[1400px] mx-auto w-full">
          <RevealOnScroll width="100%">
            <div className="flex flex-col gap-2 mb-12 md:mb-20">
              <span className="font-mono text-sw-accent text-xs uppercase">
                {t.subtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
                <span className="text-sw-accent">//</span> {t.title}
              </h2>
            </div>
            <div className="text-center py-12 md:py-20 border border-white/10 bg-sw-black/50">
              <p className="font-mono text-gray-500 text-xs sm:text-sm">
                {t.noData}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-sw-black relative z-20">
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto w-full">
        <RevealOnScroll width="100%">
          <div className="flex flex-col gap-2 mb-12 md:mb-20">
            <span className="font-mono text-sw-accent text-xs uppercase">
              {t.subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              <span className="text-sw-accent">//</span> {t.title}
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <div key={project.id}>
              <RevealOnScroll delay={index * 0.08}>
                <motion.div
                  className="group relative border-2 border-white/20 bg-sw-black/80 backdrop-blur hover:border-sw-accent transition-colors duration-300 h-full flex flex-col overflow-hidden cursor-pointer"
                  onMouseEnter={() => playSound('hover')}
                  onClick={() => {
                    playSound('click');
                    setSelectedProject(project);
                  }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ willChange: 'transform' }}
                >
                {/* Project Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-sw-dark">
                  {imageErrors[project.id] ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sw-dark to-sw-black">
                      <span className="font-mono text-xs text-gray-600">
                        IMAGE_NOT_FOUND
                      </span>
                    </div>
                  ) : (
                    <img
                      src={project.imageFile || project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        // If imageFile fails and we have imageUrl as fallback, try it
                        if (project.imageFile && project.imageUrl && e.currentTarget.src !== project.imageUrl) {
                          e.currentTarget.src = project.imageUrl;
                        } else {
                          handleImageError(project.id);
                        }
                      }}
                    />
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-sw-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold uppercase mb-3 text-white group-hover:text-sw-accent transition-colors">
                    {project.title.replace(/_/g, ' ')}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem]">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono border border-white/10 text-gray-400 px-2 py-1 uppercase group-hover:border-sw-accent group-hover:text-sw-accent transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4 border-t border-white/10">
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-sw-accent transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          playSound('click');
                        }}
                        onMouseEnter={() => playSound('hover')}
                      >
                        <Github size={16} />
                        <span>REPO</span>
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-sw-accent transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          playSound('click');
                        }}
                        onMouseEnter={() => playSound('hover')}
                      >
                        <ExternalLink size={16} />
                        <span>DEMO</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-3 h-3 bg-white opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                <div className="absolute top-0 right-0 w-3 h-3 bg-white opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                <div className="absolute bottom-0 left-0 w-3 h-3 bg-white opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-white opacity-0 group-hover:opacity-100 transition-opacity z-20" />
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

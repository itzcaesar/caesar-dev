import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../../constants';
import { ArrowUpRight, Github, ExternalLink, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useSound } from '../../contexts/AudioContext';
import { translations } from '../../locales/translations';
import { Project } from '../../types';

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

  useEffect(() => {
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

const RepoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  repoUrl: string;
  project: Project;
}> = ({ isOpen, onClose, repoUrl, project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const { playSound } = useSound();

  const projectImages = project.images || [(project.imageFile || project.imageUrl)];

  useEffect(() => {
    if (isOpen) {
      playSound('access');
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const goToNextImage = () => {
    playSound('click');
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const goToPrevImage = () => {
    playSound('click');
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  if (!isOpen) return null;

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

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { language } = useApp();
  const { playSound } = useSound();
  const navigate = useNavigate();
  const t = translations[language].projects;

  return (
    <section id="projects" className="py-32 px-6 bg-sw-black relative z-20 border-t border-white/10">
      <AnimatePresence>
        {selectedProject && (
          <RepoModal
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
            repoUrl={selectedProject.repo || ''}
            project={selectedProject}
          />
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto w-full">

        <div className="flex items-end justify-between mb-20">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-sw-accent text-xs">{t.subtitle}</span>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">{t.title}</h2>
          </div>
          <p className="hidden md:block text-gray-500 font-mono text-xs text-right max-w-xs">
            {t.archive}<br />
            {t.period}
          </p>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="group relative border-b border-white/10 transition-colors bg-sw-black"
              onMouseEnter={() => {
                setHoveredProject(project.id);
                playSound('hover');
              }}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => {
                setSelectedProject(project);
                playSound('click');
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
              }}
            >
              {/* Spotlight Effect Border */}
              <div
                className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(204, 255, 0, 0.15), transparent 40%)`
                }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-px z-10 bg-gradient-to-r from-transparent via-sw-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <div
                className="relative z-10 flex flex-col md:flex-row md:items-center justify-between py-10 px-2 cursor-pointer"
                data-cursor-text="ACCESS_DB"
              >
                {/* ID & Title */}
                <div className="flex items-start md:items-center gap-6 md:gap-12 w-full md:w-1/2">
                  <span className="font-mono text-xs text-gray-600 group-hover:text-sw-accent transition-colors pt-2 md:pt-0">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-4xl font-bold uppercase group-hover:translate-x-2 transition-transform duration-300">
                      {project.title.replace(/_/g, ' ')}
                    </h3>
                  </div>
                </div>

                {/* Description & Tags - Fades in/out on desktop */}
                <div className="w-full md:w-1/2 flex flex-col md:flex-row justify-between items-start md:items-center mt-4 md:mt-0 gap-6">
                  <p className="text-gray-400 text-sm max-w-xs hidden md:block opacity-60 group-hover:opacity-100 transition-opacity">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono border border-white/10 text-gray-400 px-2 py-1 uppercase group-hover:border-sw-accent group-hover:text-sw-accent transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ArrowUpRight className="text-sw-accent opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Works Button */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => {
              playSound('click');
              navigate('/works');
            }}
            onMouseEnter={() => playSound('hover')}
            className="group border border-white/20 px-8 py-4 hover:border-sw-accent transition-colors duration-300 flex items-center gap-3"
          >
            <span className="text-sm uppercase tracking-wider font-mono text-white group-hover:text-sw-accent transition-colors">
              {t.viewAllWorks}
            </span>
            <ArrowRight className="text-white group-hover:text-sw-accent group-hover:translate-x-1 transition-all duration-300" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
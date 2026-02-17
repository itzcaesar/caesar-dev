import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { PROJECTS } from '@/constants';
import { useApp } from '@/contexts/AppContext';
import { useSound } from '@/contexts/AudioContext';
import { translations } from '@/locales/translations';
import { RevealOnScroll } from '@/components/Layout/RevealOnScroll';

const AllProjects: React.FC = () => {
  const { language } = useApp();
  const { playSound } = useSound();
  const t = translations[language].works.allProjects;
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

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
                  className="group relative border border-white/20 bg-sw-black/80 backdrop-blur hover:border-sw-accent transition-colors duration-300 h-full flex flex-col"
                  onMouseEnter={() => playSound('hover')}
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
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={() => handleImageError(project.id)}
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

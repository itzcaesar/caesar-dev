import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { RevealOnScroll } from '@/components/Layout/RevealOnScroll';
import type { CurrentProject, ProjectStatus, SiteSettings, WorksPageContent } from '@/types';

type CurrentWorkProps = {
  content: WorksPageContent['currentWorkSection'];
  currentProjects: CurrentProject[];
  uiLabels: SiteSettings['uiLabels'];
};

const CurrentWork: React.FC<CurrentWorkProps> = ({ content, currentProjects, uiLabels }) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (projectId: string) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  };

  const getStatusBadgeStyles = (status: ProjectStatus) => {
    switch (status) {
      case 'in-progress':
        return 'bg-sw-accent/20 text-sw-accent border-sw-accent';
      case 'planning':
        return 'bg-blue-500/20 text-blue-400 border-blue-400';
      case 'on-hold':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400';
    }
  };

  const getStatusLabel = (status: ProjectStatus) => {
    switch (status) {
      case 'in-progress':
        return content.statusLabels.inProgress;
      case 'planning':
        return content.statusLabels.planning;
      case 'on-hold':
        return content.statusLabels.onHold;
    }
  };

  if (currentProjects.length === 0) {
    return (
      <section className="py-10 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12 bg-sw-black relative z-20">
        <div className="max-w-[1400px] mx-auto w-full">
          <RevealOnScroll width="100%">
            <div className="border border-white/10 bg-sw-black/50 px-5 py-5 md:flex md:items-center md:justify-between">
              <div>
                <span className="font-mono text-sw-accent text-xs uppercase">
                  {content.subtitle}
                </span>
                <h2 className="mt-2 text-2xl md:text-3xl font-bold uppercase tracking-tight">
                  <span className="text-sw-accent">//</span> {content.title}
                </h2>
              </div>
              <p className="mt-4 md:mt-0 font-mono text-gray-500 text-xs sm:text-sm uppercase">
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
      <div className="max-w-[1400px] mx-auto w-full">
        <RevealOnScroll width="100%">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="flex flex-col gap-2">
            <span className="font-mono text-sw-accent text-xs uppercase">
              {content.subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              <span className="text-sw-accent">//</span> {content.title}
            </h2>
            </div>
            <p className="font-mono text-xs uppercase text-gray-500">
              {currentProjects.length} {content.activeRecordsLabel}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {currentProjects.map((project, index) => (
            <div key={project.id}>
              <RevealOnScroll delay={index * 0.08}>
                <motion.div
                  className="group relative border border-white/20 bg-sw-black/80 backdrop-blur overflow-hidden hover:border-sw-accent transition-colors duration-300 h-full"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ willChange: 'transform' }}
                >
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                    <span
                      className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider border ${getStatusBadgeStyles(
                        project.status
                      )}`}
                    >
                      {getStatusLabel(project.status)}
                    </span>
                  </div>

                  {/* Project Image */}
                  <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden bg-sw-dark">
                    {imageErrors[project.id] || !(project.imageFile || project.imageUrl) ? (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sw-dark to-sw-black">
                        <span className="font-mono text-[10px] sm:text-xs text-gray-600">
                          {uiLabels.imageNotFound}
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
                  <div className="p-4 sm:p-5">
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold uppercase mb-2 sm:mb-3 text-white group-hover:text-sw-accent transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[9px] sm:text-[10px] font-mono border border-white/10 text-gray-400 px-1.5 sm:px-2 py-0.5 sm:py-1 uppercase group-hover:border-sw-accent group-hover:text-sw-accent transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    {project.progress !== undefined && (
                      <div className="mb-3 sm:mb-4">
                        <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                          <span className="text-[9px] sm:text-[10px] font-mono text-gray-500 uppercase">
                            {content.progressLabel}
                          </span>
                          <span className="text-[9px] sm:text-[10px] font-mono text-sw-accent">
                            {project.progress}%
                          </span>
                        </div>
                        <div className="w-full h-1 bg-white/10 overflow-hidden">
                          <motion.div
                            className="h-full bg-sw-accent"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${project.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Metadata */}
                    <div className="space-y-0.5 sm:space-y-1 mb-3 sm:mb-4 text-[9px] sm:text-[10px] font-mono text-gray-500">
                      {project.lastUpdated && (
                        <div>
                          {content.lastUpdatedLabel}: <span className="text-gray-400">{project.lastUpdated}</span>
                        </div>
                      )}
                      {project.expectedCompletion && (
                        <div>
                          {content.expectedCompletionLabel}: <span className="text-gray-400">{project.expectedCompletion}</span>
                        </div>
                      )}
                    </div>

                    {/* Links */}
                    {project.repo && (
                      <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-white/10">
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono text-gray-400 hover:text-sw-accent transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Github size={14} className="sm:w-4 sm:h-4" />
                          <span>{uiLabels.repoShort}</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Decorative Corners - More prominent for current work */}
                  <div className="absolute top-0 left-0 w-2 sm:w-3 h-2 sm:h-3 border-t-2 border-l-2 border-sw-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-0 right-0 w-2 sm:w-3 h-2 sm:h-3 border-t-2 border-r-2 border-sw-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 w-2 sm:w-3 h-2 sm:h-3 border-b-2 border-l-2 border-sw-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 right-0 w-2 sm:w-3 h-2 sm:h-3 border-b-2 border-r-2 border-sw-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </RevealOnScroll>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurrentWork;

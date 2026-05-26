import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/Layout/RevealOnScroll';
import type { WorkExperience as WorkExperienceType, WorksPageContent } from '@/types';

type WorkExperienceProps = {
  content: WorksPageContent['experienceSection'];
  experiences: WorkExperienceType[];
};

export const WorkExperience: React.FC<WorkExperienceProps> = ({
  content,
  experiences,
}) => {
  const sortedExperiences = [...experiences].sort((a, b) => {
    const parseDate = (dateStr: string): number => {
      if (dateStr === 'Present') return Date.now();
      const [month, year] = dateStr.split(' ');
      const monthMap: { [key: string]: number } = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
      };
      return new Date(parseInt(year), monthMap[month] || 0).getTime();
    };

    return parseDate(b.duration.start) - parseDate(a.duration.start);
  });

  if (sortedExperiences.length === 0) {
    return (
      <section className="pt-8 md:pt-10 lg:pt-12 pb-12 md:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
            <span className="text-sw-accent">//</span> {content.title}
          </h2>
          <div className="border border-white/10 bg-sw-black/50 px-6 py-8 text-center">
            <p className="font-mono text-xs uppercase text-gray-500">{content.noDataLabel}</p>
          </div>
        </RevealOnScroll>
      </section>
    );
  }

  return (
    <section className="pt-8 md:pt-10 lg:pt-12 pb-12 md:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
      <RevealOnScroll>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            <span className="text-sw-accent">//</span> {content.title}
          </h2>
          <p className="font-mono text-xs uppercase text-gray-500">
            {sortedExperiences.length} {content.recordsIndexedLabel}
          </p>
        </div>
      </RevealOnScroll>

      <div className="space-y-4">
        {sortedExperiences.map((experience, index) => {
          const isCurrent = Boolean(experience.isCurrent);

          return (
            <RevealOnScroll key={experience.id} delay={index * 0.08}>
              <motion.article
                className={`grid gap-6 border bg-sw-black/80 p-5 md:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.2fr)] md:p-6 ${
                  isCurrent ? 'border-sw-accent' : 'border-white/20'
                }`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  <div className="flex items-start gap-4">
                    {experience.companyLogo && (
                      <img
                        src={experience.companyLogo}
                        alt={`${experience.company} logo`}
                        className="h-12 w-12 object-contain border border-white/10 bg-sw-black"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                    <div className="min-w-0">
                      <h3 className="text-2xl font-bold text-white leading-tight">
                        {experience.companyUrl ? (
                          <a
                            href={experience.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-sw-accent transition-colors"
                          >
                            {experience.company}
                          </a>
                        ) : (
                          experience.company
                        )}
                      </h3>
                      <p className={isCurrent ? 'text-sw-accent' : 'text-sw-light'}>
                        {experience.role}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-px bg-white/10 font-mono text-[10px] uppercase">
                    <div className="bg-sw-black px-3 py-2">
                      <span className="block text-gray-600">{content.startLabel}</span>
                      <span className="text-white">{experience.duration.start}</span>
                    </div>
                    <div className="bg-sw-black px-3 py-2">
                      <span className="block text-gray-600">{content.statusLabel}</span>
                      <span className="text-sw-accent">
                        {experience.isCurrent
                          ? content.presentLabel
                          : experience.duration.end}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5">
                  <p className="text-sm md:text-base text-sw-light leading-relaxed">
                    {experience.description}
                  </p>

                  {experience.responsibilities.length > 0 && (
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-sw-accent mb-3">
                        {content.responsibilitiesLabel}
                      </h4>
                      <ul className="grid gap-2 md:grid-cols-3">
                        {experience.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="text-gray-300 text-xs sm:text-sm border-l border-white/10 pl-3">
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-[10px] uppercase tracking-wider border border-white/20 text-sw-light hover:border-sw-accent hover:text-sw-accent transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
};

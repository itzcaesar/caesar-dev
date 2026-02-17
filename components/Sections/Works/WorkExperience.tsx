import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { useSound } from '@/contexts/AudioContext';
import { translations } from '@/locales/translations';
import { WORK_EXPERIENCES } from '@/constants';
import { RevealOnScroll } from '@/components/Layout/RevealOnScroll';

export const WorkExperience: React.FC = () => {
  const { language } = useApp();
  const { playSound } = useSound();
  const t = translations[language];

  // Sort experiences in reverse chronological order (most recent first)
  const sortedExperiences = [...WORK_EXPERIENCES].sort((a, b) => {
    const parseDate = (dateStr: string): number => {
      if (dateStr === 'Present') return Date.now();
      const [month, year] = dateStr.split(' ');
      const monthMap: { [key: string]: number } = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
      };
      return new Date(parseInt(year), monthMap[month] || 0).getTime();
    };

    return parseDate(b.duration.start) - parseDate(a.duration.start);
  });

  // Handle empty data
  if (sortedExperiences.length === 0) {
    return (
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            <span className="text-sw-accent">//</span> {t.works.experience.title}
          </h2>
          <p className="text-sw-gray text-center mt-12">
            {t.works.experience.noData}
          </p>
        </RevealOnScroll>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
      <RevealOnScroll>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16 text-white">
          <span className="text-sw-accent">//</span> {t.works.experience.title}
        </h2>
      </RevealOnScroll>

      <div className="relative">
        {/* Vertical timeline line - only on desktop */}
        <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-white/20 hidden lg:block" />

        {/* Timeline entries */}
        <div className="space-y-8 md:space-y-16 lg:space-y-24">
          {sortedExperiences.map((experience, index) => {
            const isCurrent = experience.duration.end === 'Present';
            const isEven = index % 2 === 0;

            return (
              <div key={experience.id} data-experience-id={experience.id}>
                <RevealOnScroll delay={index * 0.15}>
                  <motion.div
                    className={`relative lg:grid lg:grid-cols-2 lg:gap-12 ${
                      isEven ? '' : 'lg:grid-flow-dense'
                    }`}
                  >
                  {/* Timeline dot - only on desktop */}
                  <div className="hidden lg:block absolute left-1/2 top-8 w-4 h-4 -ml-2 rounded-full border-2 border-white/40 bg-sw-black z-10">
                    {isCurrent && (
                      <div className="absolute inset-0 rounded-full bg-sw-accent animate-pulse" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`${isEven ? 'lg:col-start-1' : 'lg:col-start-2'}`}>
                    <div
                      className={`border ${
                        isCurrent ? 'border-sw-accent' : 'border-white/20'
                      } bg-sw-black/80 backdrop-blur p-4 sm:p-6 md:p-8 hover:border-sw-accent transition-colors`}
                      onMouseEnter={() => playSound('hover')}
                    >
                      {/* Company logo */}
                      {experience.companyLogo && (
                        <div className="mb-4">
                          <img
                            src={experience.companyLogo}
                            alt={`${experience.company} logo`}
                            className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded border border-white/10"
                            onError={(e) => {
                              // Fallback on error
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}

                      {/* Company name */}
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                        {experience.companyUrl ? (
                          <a
                            href={experience.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-sw-accent transition-colors"
                            onMouseEnter={() => playSound('hover')}
                            onClick={() => playSound('click')}
                          >
                            {experience.company}
                          </a>
                        ) : (
                          experience.company
                        )}
                      </h3>

                      {/* Role */}
                      <p className={`text-base sm:text-lg md:text-xl mb-2 ${isCurrent ? 'text-sw-accent' : 'text-sw-light'}`}>
                        {experience.role}
                      </p>

                      {/* Duration */}
                      <p className="text-xs sm:text-sm text-sw-gray mb-4 uppercase tracking-wider">
                        {experience.duration.start} — {experience.duration.end === 'Present' ? t.works.experience.present : experience.duration.end}
                      </p>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-sw-light mb-6 leading-relaxed">
                        {experience.description}
                      </p>

                      {/* Responsibilities */}
                      {experience.responsibilities.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-xs sm:text-sm uppercase tracking-wider text-sw-accent mb-3">
                            {t.works.experience.responsibilities}
                          </h4>
                          <ul className="space-y-2">
                            {experience.responsibilities.map((responsibility, idx) => (
                              <li key={idx} className="text-sw-light text-xs sm:text-sm flex items-start">
                                <span className="text-sw-accent mr-2 mt-1">▹</span>
                                <span>{responsibility}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs uppercase tracking-wider border border-white/20 text-sw-light hover:border-sw-accent hover:text-sw-accent transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className={`hidden lg:block ${isEven ? 'lg:col-start-2' : 'lg:col-start-1'}`} />
                </motion.div>
              </RevealOnScroll>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

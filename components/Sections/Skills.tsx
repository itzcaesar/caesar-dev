import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { HomePageContent, Skill } from '../../types';

type SkillsProps = {
  content: HomePageContent['skillsSection'];
  skills: Skill[];
};

const Skills: React.FC<SkillsProps> = ({ content, skills }) => {
  const categories = useMemo(
    () => Array.from(new Set(skills.map(skill => skill.category))),
    [skills]
  );

  const preferredCategory = categories.includes('Full Stack Dev')
    ? 'Full Stack Dev'
    : categories[0];

  const [activeCategory, setActiveCategory] = useState<Skill['category'] | undefined>(preferredCategory);

  useEffect(() => {
    if (!activeCategory || !categories.includes(activeCategory)) {
      setActiveCategory(preferredCategory);
    }
  }, [activeCategory, categories, preferredCategory]);

  const activeSkills = activeCategory
    ? skills.filter(skill => skill.category === activeCategory)
    : [];

  const formatSkillName = (name: string) => {
    return name.replace(/_/g, ' ');
  };

  return (
    <section id="skills" className="py-20 md:py-24 px-6 bg-sw-black border-t border-white/10">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12">

        <div className="lg:col-span-3">
          <div className="lg:sticky lg:top-40">
            <span className="inline-block px-3 py-1 border border-sw-accent text-sw-accent font-mono text-xs uppercase mb-4">
              {content.subtitle}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">
              {content.title}
            </h2>
            <p className="text-gray-500 text-xs font-mono max-w-[240px] leading-relaxed">
              {content.systemLabel}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 max-w-[240px]">
              <div className="border border-white/10 px-3 py-2">
                <span className="block font-mono text-[10px] text-gray-600 uppercase">{content.totalLabel}</span>
                <span className="font-mono text-lg text-sw-accent">{skills.length}</span>
              </div>
              <div className="border border-white/10 px-3 py-2">
                <span className="block font-mono text-[10px] text-gray-600 uppercase">{content.activeLabel}</span>
                <span className="font-mono text-lg text-sw-accent">{activeSkills.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-9">
          <div className="border border-white/10 bg-sw-black/80">
            <div className="flex flex-wrap gap-2 border-b border-white/10 p-3">
              {categories.map((category) => {
                const categorySkills = skills.filter(skill => skill.category === category);
                const isActive = category === activeCategory;

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`relative min-h-11 px-4 py-2 font-mono text-xs uppercase transition-colors ${
                      isActive
                        ? 'text-sw-black'
                        : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-skill-category"
                        className="absolute inset-0 bg-sw-accent"
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {category}
                      <span className={isActive ? 'text-black/60' : 'text-sw-accent'}>
                        [{categorySkills.length}]
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
              {activeSkills.map((skill, index) => (
                <motion.div
                  key={`${activeCategory}-${skill.name}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.025 }}
                  className="group bg-sw-black px-4 py-3 md:px-5 md:py-4 hover:bg-white/[0.025] transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="min-w-0 break-words font-mono text-[11px] uppercase tracking-widest text-gray-300 group-hover:text-white transition-colors">
                      {formatSkillName(skill.name)}
                    </h4>
                    <span className="flex-shrink-0 font-mono text-xs text-sw-accent/80">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="mt-3 h-px w-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-sw-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.45, delay: index * 0.025, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;

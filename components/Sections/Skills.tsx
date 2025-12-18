import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS } from '../../constants';
import { useApp } from '../../contexts/AppContext';
import { translations } from '../../locales/translations';

const Skills: React.FC = () => {
  const { language } = useApp();
  const t = translations[language].skills;
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Game Development', 'Full Stack Dev']);

  const categories = Array.from(new Set(SKILLS.map(skill => skill.category)));

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <section id="skills" className="py-32 px-6 bg-sw-black border-t border-white/10">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-3">
           <div className="lg:sticky lg:top-40">
             <span className="inline-block px-3 py-1 border border-sw-accent text-sw-accent font-mono text-xs uppercase mb-4">
               {t.subtitle}
             </span>
             <p className="text-gray-500 text-xs font-mono max-w-[200px]">
               {t.system}
             </p>
           </div>
        </div>

        <div className="lg:col-span-9 space-y-6">
          {categories.map((category) => {
            const categorySkills = SKILLS.filter(skill => skill.category === category);
            const isExpanded = expandedCategories.includes(category);
            const translatedCategory = category === 'Game Development' ? t.gamedev : t.fullstack;

            return (
              <div key={category} className="border border-white/10">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full bg-sw-black hover:bg-white/[0.02] transition-colors p-6 flex justify-between items-center group"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-sw-accent border border-sw-accent px-2 py-1">
                      [{categorySkills.length}]
                    </span>
                    <h3 className="text-xl font-bold uppercase">{translatedCategory}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sw-accent text-2xl"
                  >
                    ▼
                  </motion.div>
                </button>

                {/* Skills Grid */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
                        {categorySkills.map((skill) => (
                          <div key={skill.name} className="bg-sw-black p-8 group hover:bg-white/[0.02] transition-colors relative overflow-hidden">
                            {/* Hover Corner */}
                            <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-sw-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <div className="flex justify-between items-start mb-8">
                              <h4 className="font-mono text-xs text-gray-500 uppercase tracking-widest border border-white/10 px-2 py-1">
                                {skill.name.replace(/_/g, ' ')}
                              </h4>
                              <span className="font-mono text-sw-accent text-sm">
                                {skill.level}%
                              </span>
                            </div>
                            
                            {/* Tech Progress Bar */}
                            <div className="w-full h-2 bg-white/5 relative flex gap-1">
                              {[...Array(10)].map((_, i) => {
                                const isFilled = (skill.level / 10) > i;
                                return (
                                  <motion.div 
                                    key={i}
                                    className="h-full flex-1"
                                    initial={{ opacity: 0, backgroundColor: isFilled ? '#ccff00' : 'transparent' }}
                                    whileInView={{ 
                                      opacity: isFilled ? 1 : 0,
                                    }}
                                    viewport={{ once: true }}
                                    transition={{ 
                                      duration: 0.2, 
                                      delay: i * 0.05
                                    }}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skills;
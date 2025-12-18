import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../../constants';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { translations } from '../../locales/translations';

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const { language } = useApp();
  const t = translations[language].projects;

  return (
    <section id="projects" className="py-32 px-6 bg-sw-black relative z-20 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto w-full">
        
        <div className="flex items-end justify-between mb-20">
           <div className="flex flex-col gap-2">
             <span className="font-mono text-sw-accent text-xs">{t.subtitle}</span>
             <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">{t.title}</h2>
           </div>
           <p className="hidden md:block text-gray-500 font-mono text-xs text-right max-w-xs">
             {t.archive}<br/>
             {t.period}
           </p>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {PROJECTS.map((project, index) => (
            <div 
              key={project.id}
              className="group relative border-b border-white/10 transition-colors hover:bg-white/5"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div 
                className="flex flex-col md:flex-row md:items-center justify-between py-10 px-2 cursor-pointer"
                data-cursor-text={t.examine}
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
      </div>
    </section>
  );
};

export default Projects;
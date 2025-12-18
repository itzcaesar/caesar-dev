import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import { translations } from '../../locales/translations';

const About: React.FC = () => {
  const { language } = useApp();
  const t = translations[language].about;

  return (
    <section id="about" className="min-h-[80vh] py-32 px-6 flex items-center bg-sw-black border-t border-white/10">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Sticky Label */}
        <div className="lg:col-span-3">
           <div className="lg:sticky lg:top-40">
             <span className="inline-block px-3 py-1 border border-sw-accent text-sw-accent font-mono text-xs uppercase mb-4">
               {t.label}
             </span>
             <p className="text-gray-500 text-xs font-mono max-w-[200px] mb-12">
               {t.details}
             </p>

             {/* Profile / Tech Card */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="hidden lg:block w-full p-6 border border-white/5 bg-white/[0.02] relative overflow-hidden"
             >
                {/* Decor corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-sw-accent"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-sw-accent"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-sw-accent"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-sw-accent"></div>

                {/* Animated Scanner Visual */}
                <div className="h-40 w-full flex items-center justify-center relative mb-6">
                  {/* Outer Ring */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                    className="absolute w-32 h-32 border border-white/10 rounded-full border-dashed"
                  />
                  {/* Inner Ring */}
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                    className="absolute w-24 h-24 border border-sw-accent/20 rounded-full border-t-sw-accent"
                  />
                  {/* Core */}
                  <div className="w-16 h-16 bg-sw-accent/5 rounded-full flex items-center justify-center backdrop-blur-sm relative z-10">
                     <div className="w-1 h-1 bg-sw-accent rounded-full animate-ping" />
                  </div>
                  
                  {/* Scanning Line */}
                  <motion.div 
                     animate={{ top: ['0%', '100%', '0%'] }}
                     transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                     className="absolute w-full h-px bg-sw-accent/50 shadow-[0_0_10px_#ccff00]"
                  />
                </div>

                {/* Data Grid */}
                <div className="space-y-3 font-mono text-[10px] uppercase tracking-wider">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">ID_REF</span>
                    <span className="text-white">MCR_DEV_01</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">SECTOR</span>
                    <span className="text-white">INDONESIA</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">ROLE</span>
                    <span className="text-white">HYBRID_ENG</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-gray-500">STATUS</span>
                    <span className="text-sw-accent animate-pulse">ONLINE</span>
                  </div>
                </div>

                {/* Background Noise/Grid */}
                <div 
                    className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
                    style={{
                    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                    backgroundSize: '10px 10px'
                    }}
                />
             </motion.div>
           </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-9">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-light leading-tight mb-16 uppercase"
          >
            {t.heading.split(t.headingLogic)[0]}
            <span className="font-bold text-sw-accent">{t.headingLogic}</span>
            {t.heading.split(t.headingLogic)[1].split(t.headingImmersion)[0]}
            <span className="font-bold text-sw-accent">{t.headingImmersion}</span>
            {t.heading.split(t.headingImmersion)[1]}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-l border-white/10 pl-6 md:pl-12">
            <div>
              <h3 className="font-mono text-xs text-gray-500 mb-4 uppercase">{t.backgroundTitle}</h3>
              <p className="text-gray-300 leading-relaxed font-sans text-lg">
                {t.backgroundText.split('Muhammad Caesar Rifqi')[0]}
                <strong className="text-white">Muhammad Caesar Rifqi</strong>
                {t.backgroundText.split('Muhammad Caesar Rifqi')[1]}
              </p>
            </div>
            
            <div>
              <h3 className="font-mono text-xs text-gray-500 mb-4 uppercase">{t.educationTitle}</h3>
              <p className="text-gray-300 leading-relaxed font-sans text-lg">
                {t.educationText.split('Digital Creative Multimedia')[0]}
                <strong className="text-white">Digital Creative Multimedia</strong>
                {t.educationText.split('Digital Creative Multimedia')[1].split('Telkom University')[0]}
                <strong className="text-white">Telkom University</strong>
                {t.educationText.split('Telkom University')[1]}
              </p>
            </div>

            <div className="md:col-span-2 border-t border-white/10 pt-8 mt-4">
               <h3 className="font-mono text-xs text-gray-500 mb-4 uppercase">{t.focusTitle}</h3>
               <p className="text-gray-300 leading-relaxed font-sans text-lg max-w-2xl">
                 {t.focusText.split('Full Stack Development')[0]}
                 <strong>Full Stack Development</strong>
                 {t.focusText.split('Full Stack Development')[1].split('Game Development')[0]}
                 <strong>Game Development</strong>
                 {t.focusText.split('Game Development')[1]}
               </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
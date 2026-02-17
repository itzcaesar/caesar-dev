import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useSound } from '@/contexts/AudioContext';
import { translations } from '@/locales/translations';

const WorksHero: React.FC = () => {
  const { language } = useApp();
  const { playSound } = useSound();
  const navigate = useNavigate();
  const t = translations[language];

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center px-6 md:px-12 py-20 md:py-32">
      <div className="max-w-[1400px] w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          {/* Breadcrumb Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="flex items-center gap-2 text-sm font-mono"
          >
            <button
              onClick={() => {
                playSound('click');
                navigate('/');
              }}
              onMouseEnter={() => playSound('hover')}
              className="text-gray-500 hover:text-sw-accent transition-colors uppercase tracking-wider"
            >
              {t.works.hero.breadcrumb.home}
            </button>
            <ChevronRight size={14} className="text-gray-600" />
            <span className="text-sw-accent uppercase tracking-wider">
              {t.works.hero.breadcrumb.works}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white"
          >
            <span className="text-sw-accent">//</span> {t.works.hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg text-gray-400 max-w-3xl leading-relaxed"
          >
            {t.works.hero.subtitle}
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-sw-accent via-white/20 to-transparent origin-left"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default WorksHero;

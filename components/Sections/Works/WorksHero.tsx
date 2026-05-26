import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import type { WorksPageContent } from '@/types';

type WorksHeroProps = {
  content: WorksPageContent['hero'];
  projectCount?: number;
  currentProjectCount?: number;
  experienceCount?: number;
};

const WorksHero: React.FC<WorksHeroProps> = ({
  content,
  projectCount = 0,
  currentProjectCount = 0,
  experienceCount = 0,
}) => {
  const router = useRouter();

  return (
    <section className="relative flex items-center justify-center px-6 md:px-12 pt-32 md:pt-36 pb-12 md:pb-16">
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
              onClick={() => router.push('/')}
              className="text-gray-500 hover:text-sw-accent transition-colors uppercase tracking-wider"
            >
              {content.homeBreadcrumb}
            </button>
            <ChevronRight size={14} className="text-gray-600" />
            <span className="text-sw-accent uppercase tracking-wider">
              {content.worksBreadcrumb}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white"
          >
            <span className="text-sw-accent">//</span> {content.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg text-gray-400 max-w-3xl leading-relaxed"
          >
            {content.subtitle}
          </motion.p>

          <div className="grid grid-cols-3 gap-px bg-white/10 border border-white/10 max-w-xl">
            {[
              [content.experienceStatLabel, experienceCount],
              [content.archiveStatLabel, projectCount],
              [content.currentStatLabel, currentProjectCount],
            ].map(([label, value]) => (
              <div key={label} className="bg-sw-black px-4 py-3">
                <span className="block font-mono text-[10px] text-gray-600 uppercase">{label}</span>
                <span className="font-mono text-lg text-sw-accent">{value}</span>
              </div>
            ))}
          </div>

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

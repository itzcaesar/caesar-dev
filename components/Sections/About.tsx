import React from 'react';
import { motion } from 'framer-motion';

import type { HomePageContent } from '@/types';

type AboutProps = {
  content: HomePageContent['about'];
};

function renderHighlightedText(text: string, terms: string[]) {
  if (!terms.length) {
    return text;
  }

  const pattern = new RegExp(`(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');

  return text.split(pattern).map((part, index) => {
    const isHighlight = terms.some((term) => term.toLowerCase() === part.toLowerCase());
    return isHighlight ? (
      <strong key={`${part}-${index}`} className="text-white">
        {part}
      </strong>
    ) : (
      <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
    );
  });
}

const About: React.FC<AboutProps> = ({ content }) => {
  return (
    <section id="about" className="py-20 md:py-24 px-6 bg-sw-black border-t border-white/10">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-3">
          <div className="lg:sticky lg:top-40">
            <span className="inline-block px-3 py-1 border border-sw-accent text-sw-accent font-mono text-xs uppercase mb-4">
              {content.label}
            </span>
            <p className="text-gray-500 text-xs font-mono max-w-[220px] mb-6">
              {content.details}
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block w-full p-5 border border-white/10 bg-white/[0.02] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-sw-accent"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-sw-accent"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-sw-accent"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-sw-accent"></div>

              <div className="h-28 w-full flex items-center justify-center relative mb-5">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                  className="absolute w-24 h-24 border border-white/10 rounded-full border-dashed"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                  className="absolute w-16 h-16 border border-sw-accent/20 rounded-full border-t-sw-accent"
                />
                <div className="w-10 h-10 bg-sw-accent/5 rounded-full flex items-center justify-center backdrop-blur-sm relative z-10">
                  <div className="w-1 h-1 bg-sw-accent rounded-full animate-ping" />
                </div>

                <motion.div
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                  className="absolute w-full h-px bg-sw-accent/50 shadow-[0_0_10px_#ccff00]"
                />
              </div>

              <div className="space-y-3 font-mono text-[10px] uppercase tracking-wider">
                {content.profileMetrics.map((metric, index) => (
                  <div
                    key={`${metric.label}-${metric.value}`}
                    className={`flex justify-between ${index < content.profileMetrics.length - 1 ? 'border-b border-white/5 pb-2' : 'pt-1'}`}
                  >
                    <span className="text-gray-500">{metric.label}</span>
                    <span className={metric.accent ? 'text-sw-accent animate-pulse' : 'text-white'}>
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
                style={{
                  backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                  backgroundSize: '10px 10px',
                }}
              />
            </motion.div>
          </div>
        </div>

        <div className="lg:col-span-9">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-light leading-tight mb-8 uppercase max-w-5xl"
          >
            {content.headingBeforeFirstHighlight}
            <span className="font-bold text-sw-accent">{content.headingFirstHighlight}</span>
            {content.headingBetweenHighlights}
            <span className="font-bold text-sw-accent">{content.headingSecondHighlight}</span>
            {content.headingAfterSecondHighlight}
          </motion.h2>

          {content.profileMetrics.length > 0 && (
            <div className="mb-8 grid grid-cols-2 gap-px bg-white/10 border border-white/10 md:grid-cols-4">
              {content.profileMetrics.map((metric) => (
                <div key={`${metric.label}-${metric.value}`} className="bg-sw-black px-4 py-3 font-mono uppercase">
                  <span className="block text-[10px] text-gray-600">{metric.label}</span>
                  <span className={metric.accent ? 'text-sm text-sw-accent' : 'text-sm text-white'}>
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {content.contentBlocks.map((block, index) => (
              <div
                key={`${block.title}-${index}`}
                className="bg-sw-black p-5 md:p-6"
              >
                <h3 className="font-mono text-xs text-sw-accent/80 mb-4 uppercase">{block.title}</h3>
                <p className="text-gray-300 leading-relaxed font-sans text-sm md:text-base">
                  {renderHighlightedText(block.body, block.highlightTerms)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

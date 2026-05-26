import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FileText, Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';

import { DecryptText } from '@/components/UI/DecryptText';
import type { HomePageContent, SiteSettings } from '@/types';

const socialIcons = {
  external: ExternalLink,
  github: Github,
  instagram: Instagram,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
};

type HeroProps = {
  content: HomePageContent['hero'];
  siteSettings: SiteSettings;
};

function splitFirstWord(value: string) {
  const [first = '', ...rest] = value.split(' ');
  return { first, rest: rest.join(' ') };
}

const Hero: React.FC<HeroProps> = ({ content, siteSettings }) => {
  const primaryRole = splitFirstWord(content.primaryRole);
  const secondaryRole = splitFirstWord(content.secondaryRole);

  return (
    <section id="hero" className="relative min-h-[88svh] flex flex-col justify-center px-6 pt-24 md:pt-28 pb-10 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto z-10 grid grid-cols-12 gap-4">
        <div className="col-span-1 border-r h-32 hidden lg:block border-white/10"></div>
        <div className="col-span-11 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-sw-accent text-xs mb-4 tracking-widest">
              <DecryptText text={content.bootSequence} speed={30} />
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase leading-[1.02] mb-5 text-white">
              <DecryptText text={content.firstLineName} speed={50} />
              <span className="block">{content.secondLineName}</span>
            </h1>

            <div className="flex items-center gap-6 my-3">
              <div className="h-px bg-sw-accent w-12 md:w-32"></div>
              <span className="font-mono text-xs md:text-sm text-gray-400">{content.roleLabel}</span>
              <div className="h-px bg-sw-accent w-12 md:w-32"></div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-[0.92]">
              <span className="text-transparent stroke-text">{primaryRole.first}</span>
              <span className="block text-white">
                <DecryptText text={primaryRole.rest} speed={40} />
              </span>
            </h2>

            <div className="flex items-center gap-6 my-2">
              <div className="h-px w-12 md:w-32 bg-white/20"></div>
              <span className="font-mono text-xs md:text-sm text-gray-400">{content.conjunction}</span>
              <div className="h-px w-12 md:w-32 bg-white/20"></div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-[0.9] text-right">
              <span className="text-white">{secondaryRole.first}</span>
              <span className="block text-sw-accent">
                <DecryptText text={secondaryRole.rest} speed={40} />
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-end border-t pt-5 border-white/10"
          >
            <div className="max-w-xl">
              <p className="font-mono text-xs leading-relaxed uppercase mb-5 text-gray-400">
                {content.description}
              </p>

              <div className="grid gap-px bg-white/10 border border-white/10 sm:grid-cols-3">
                {[
                  ['STATUS', 'ONLINE'],
                  ['FOCUS', 'WEB/GAME'],
                  ['SIGNAL', `${siteSettings.socials.length} LINKS`],
                ].map(([label, value]) => (
                  <div key={label} className="bg-sw-black px-3 py-2 font-mono uppercase">
                    <span className="block text-[9px] text-gray-600">{label}</span>
                    <span className="text-[11px] text-sw-accent">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 sm:w-auto">
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.03, x: 3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="border border-white/20 px-5 py-3 font-mono text-xs uppercase transition-colors hover:bg-white hover:text-black relative overflow-hidden group"
                  data-cursor-text={content.projectsButton}
                >
                  <span className="relative z-10">{content.projectsButton}</span>
                  <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, x: 3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-sw-accent text-black px-5 py-3 font-mono text-xs uppercase relative overflow-hidden group"
                  data-cursor-text={content.contactButton}
                >
                  <span className="relative z-10 group-hover:text-white transition-colors">{content.contactButton}</span>
                  <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
                </motion.button>
                <motion.a
                  href="/cv"
                  whileHover={{ scale: 1.03, x: 3 }}
                  whileTap={{ scale: 0.97 }}
                  className="border border-sw-accent/60 px-5 py-3 font-mono text-xs uppercase text-sw-accent transition-colors hover:bg-sw-accent hover:text-black relative overflow-hidden group inline-flex items-center gap-2"
                  data-cursor-text="VIEW CV"
                >
                  <FileText className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">(C) CV</span>
                </motion.a>
              </div>

              <div className="flex gap-2 lg:justify-end">
                {siteSettings.socials.map((social) => {
                  const Icon = socialIcons[social.icon as keyof typeof socialIcons] || ExternalLink;

                  return (
                    <a
                      key={`${social.platform}-${social.url}`}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-white/20 p-2 transition-colors group hover:bg-white hover:text-black"
                      aria-label={social.platform}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Home } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { useApp } from '@/contexts/AppContext';
import type { SectionId, SiteSettings } from '@/types';

interface NavigationProps {
  activeSection?: SectionId;
  setActiveSection?: (id: SectionId) => void;
  siteSettings: SiteSettings;
}

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  setActiveSection,
  siteSettings,
}) => {
  const { language, toggleLanguage } = useApp();
  const pathname = usePathname();
  const router = useRouter();
  const isWorksPage = pathname === '/works';
  const languageTitle =
    language === 'en'
      ? siteSettings.languageToggleTitles.toIndonesian
      : siteSettings.languageToggleTitles.toEnglish;

  return (
    <div className="fixed top-0 left-0 w-full z-40 pointer-events-none flex justify-center pt-8 px-6">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className="pointer-events-auto w-full max-w-[1400px] flex justify-between items-start relative"
      >
        <div className="absolute right-0 top-0 p-8 md:hidden">
          <button
            onClick={toggleLanguage}
            className="backdrop-blur border bg-sw-black/80 border-white/20 p-3 transition-colors hover:border-sw-accent group"
            title={languageTitle}
          >
            <Globe size={18} className="transition-colors text-gray-400 group-hover:text-sw-accent" />
          </button>
        </div>

        <nav className="hidden md:flex backdrop-blur border bg-sw-black/80 border-white/20 px-6 py-3 items-center gap-8 mx-auto">
          {!isWorksPage ? (
            <>
              {siteSettings.navItems.map((item, index) => (
                <button
                  key={item.sectionId}
                  onClick={() => {
                    setActiveSection?.(item.sectionId);
                    document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group relative flex flex-col items-center"
                >
                  <span className={`text-[10px] font-mono mb-1 transition-colors ${activeSection === item.sectionId ? 'text-sw-accent' : 'text-gray-600'}`}>
                    0{index + 1}
                  </span>
                  <span className={`text-xs uppercase font-bold tracking-wider transition-colors ${activeSection === item.sectionId ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>
                    {item.label}
                  </span>

                  <div className={`absolute -bottom-1 w-1 h-1 bg-sw-accent transition-all duration-300 ${activeSection === item.sectionId ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              ))}
            </>
          ) : (
            <button
              onClick={() => router.push('/')}
              className="group flex items-center gap-2"
            >
              <Home size={16} className="transition-colors text-gray-400 group-hover:text-sw-accent" />
              <span className="text-xs uppercase font-bold tracking-wider transition-colors text-gray-500 group-hover:text-white">
                {siteSettings.backToPortfolioLabel}
              </span>
            </button>
          )}

          <div className="w-px h-8 bg-white/10"></div>

          <button
            onClick={toggleLanguage}
            className="group flex items-center justify-center gap-2 h-8"
            title={languageTitle}
          >
            <Globe size={16} className="transition-colors text-gray-400 group-hover:text-white" />
            <span className="font-mono text-xs text-gray-400 group-hover:text-sw-accent transition-colors">
              {language === 'en' ? siteSettings.languageLabels.english : siteSettings.languageLabels.indonesian}
            </span>
          </button>
        </nav>
      </motion.header>
    </div>
  );
};

export default Navigation;

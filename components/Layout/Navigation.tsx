import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../../types';
import { useApp } from '../../contexts/AppContext';
import { translations } from '../../locales/translations';
import { Globe } from 'lucide-react';

interface NavigationProps {
  activeSection: SectionId;
  setActiveSection: (id: SectionId) => void;
}

const navItems: SectionId[] = ['hero', 'about', 'projects', 'skills', 'contact'];

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const { language, toggleLanguage } = useApp();
  const t = translations[language];

  return (
    <div className="fixed top-0 left-0 w-full z-40 pointer-events-none flex justify-center pt-8 px-6">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className="pointer-events-auto w-full max-w-[1400px] flex justify-between items-start"
      >
        {/* Left: ID (Desktop) / Language Toggle (Mobile) */}
        <div className="hidden md:flex backdrop-blur border bg-sw-black/80 border-white/20 p-4 flex-col gap-1">
          <h1 className="font-bold text-sm tracking-tight leading-none text-white">
            M. CAESAR RIFQI
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-sw-accent animate-pulse"></div>
            <p className="text-[10px] font-mono text-gray-400">ONLINE // V.2.0.4</p>
          </div>
        </div>

        {/* Mobile Language Toggle - Right Side */}
        <button
          onClick={toggleLanguage}
          className="md:hidden backdrop-blur border bg-sw-black/80 border-white/20 p-4 transition-colors hover:border-sw-accent group ml-auto"
          title={language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
        >
          <Globe size={16} className="transition-colors text-gray-400 group-hover:text-sw-accent" />
        </button>

        {/* Center: Nav - Floating Island Style */}
        <nav className="hidden md:flex backdrop-blur border bg-sw-black/80 border-white/20 px-6 py-3 items-center gap-8">
          {navItems.map((item, index) => (
            <button
              key={item}
              onClick={() => {
                setActiveSection(item);
                document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative flex flex-col items-center"
            >
              <span className={`text-[10px] font-mono mb-1 transition-colors ${activeSection === item ? 'text-sw-accent' : 'text-gray-600'}`}>
                0{index + 1}
              </span>
              <span className={`text-xs uppercase font-bold tracking-wider transition-colors ${activeSection === item ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>
                {t.nav[item]}
              </span>

              {/* Active Dot */}
              <div className={`absolute -bottom-1 w-1 h-1 bg-sw-accent transition-all duration-300 ${activeSection === item ? 'opacity-100' : 'opacity-0'}`} />
            </button>
          ))}
        </nav>

        {/* Right: Toggles & Context */}
        <div className="hidden md:flex backdrop-blur border bg-sw-black/80 border-white/20 p-4 gap-4 items-center">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="p-2 border border-white/20 transition-colors hover:border-sw-accent group"
            title={language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
          >
            <Globe size={14} className="transition-colors text-gray-400 group-hover:text-sw-accent" />
          </button>

          <div className="border-l pl-4 border-white/10">
            <p className="text-[10px] font-mono uppercase text-gray-400">{language === 'en' ? 'INDONESIA [ID]' : 'INDONESIA [ID]'}</p>
            <p className="text-[10px] font-mono text-sw-accent">GAME_DEV / SE</p>
          </div>
        </div>

      </motion.header>
    </div>
  );
};

export default Navigation;
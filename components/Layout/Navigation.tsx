import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../../types';
import { useApp } from '../../contexts/AppContext';
import { useSound } from '../../contexts/AudioContext';
import { translations } from '../../locales/translations';
import { Globe, Volume2, VolumeX } from 'lucide-react';

interface NavigationProps {
  activeSection: SectionId;
  setActiveSection: (id: SectionId) => void;
}

const navItems: SectionId[] = ['hero', 'about', 'projects', 'skills', 'contact'];

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const { language, toggleLanguage } = useApp();
  const { playSound, isMuted, toggleMute } = useSound();
  const t = translations[language];

  return (
    <div className="fixed top-0 left-0 w-full z-40 pointer-events-none flex justify-center pt-8 px-6">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className="pointer-events-auto w-full max-w-[1400px] flex justify-between items-start relative"
      >
        {/* Mobile Language Toggle - Left Side (formerly Right) or Hidden if we unify */}
        {/* We can unify the desktop/mobile toggle or keep them separate for positioning */}

        {/* Mobile Language Toggle - Right Side */}
        <div className="absolute right-0 top-0 p-8 md:hidden">
          <button
            onClick={() => {
              toggleLanguage();
              playSound('click');
            }}
            className="backdrop-blur border bg-sw-black/80 border-white/20 p-3 transition-colors hover:border-sw-accent group"
            title={language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
          >
            <Globe size={18} className="transition-colors text-gray-400 group-hover:text-sw-accent" />
          </button>
        </div>

        {/* Center: Nav - Floating Island Style */}
        <nav className="hidden md:flex backdrop-blur border bg-sw-black/80 border-white/20 px-6 py-3 items-center gap-8 mx-auto">
          {navItems.map((item, index) => (
            <button
              key={item}
              onMouseEnter={() => playSound('hover')}
              onClick={() => {
                playSound('click');
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

          {/* Divider */}
          <div className="w-px h-8 bg-white/10"></div>

          {/* Desktop Language Toggle */}
          <button
            onClick={() => {
              toggleLanguage();
              playSound('click');
            }}
            onMouseEnter={() => playSound('hover')}
            className="group flex items-center justify-center gap-2 h-8"
            title={language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
          >
            <Globe size={16} className="transition-colors text-gray-400 group-hover:text-white" />
            <span className="font-mono text-xs text-gray-400 group-hover:text-sw-accent transition-colors">
              {language === 'en' ? 'EN' : 'ID'}
            </span>
          </button>

          {/* Divider */}
          <div className="w-px h-8 bg-white/10"></div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              toggleMute();
              playSound('toggle');
            }}
            onMouseEnter={() => playSound('hover')}
            className="group flex items-center justify-center h-8 w-8"
            title={isMuted ? 'Unmute UI Sounds' : 'Mute UI Sounds'}
          >
            {isMuted ? (
              <VolumeX size={16} className="text-gray-500 group-hover:text-red-500 transition-colors" />
            ) : (
              <Volume2 size={16} className="text-gray-400 group-hover:text-sw-accent transition-colors" />
            )}
          </button>
        </nav>

      </motion.header>
    </div>
  );
};

export default Navigation;
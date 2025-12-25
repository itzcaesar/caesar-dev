import React from 'react';
import { SectionId } from '../../types';

interface ScrollRadarProps {
    activeSection: SectionId;
    setActiveSection: (id: SectionId) => void;
}

const sections: SectionId[] = ['hero', 'about', 'projects', 'skills', 'contact'];

export const ScrollRadar: React.FC<ScrollRadarProps> = ({ activeSection, setActiveSection }) => {
    return (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6 items-end">
            {/* Decorative Top Bracket */}
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/20"></div>

            <div className="relative flex flex-col gap-3 py-4 border-r border-white/10 pr-4">
                {sections.map((section) => (
                    <button
                        key={section}
                        onClick={() => {
                            setActiveSection(section);
                            document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group flex items-center justify-end gap-3 relative"
                        title={section.toUpperCase()}
                    >
                        {/* Label (Only visible on hover or active) */}
                        <span
                            className={`text-[9px] font-mono uppercase tracking-widest transition-all duration-300 ${activeSection === section
                                    ? 'text-sw-accent opacity-100 translate-x-0'
                                    : 'text-gray-500 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                                }`}
                        >
                            {section}
                        </span>

                        {/* Tick Mark */}
                        <div
                            className={`h-px transition-all duration-300 ${activeSection === section ? 'w-6 bg-sw-accent' : 'w-3 bg-gray-700 group-hover:w-5 group-hover:bg-gray-500'
                                }`}
                        />

                        {/* Active Indicator (Glowing Dot) */}
                        {activeSection === section && (
                            <div className="absolute -right-[17px] top-1/2 transform -translate-y-1/2 w-1 h-3 bg-sw-accent shadow-[0_0_8px_rgba(204,255,0,0.8)]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Decorative Bottom Bracket */}
            <div className="w-px h-12 bg-gradient-to-t from-transparent to-white/20"></div>

            {/* Coordinates / Decor */}
            <div className="text-[8px] font-mono text-gray-700 text-right">
                POS: {sections.indexOf(activeSection)}<br />
                Z: 01
            </div>
        </div>
    );
};

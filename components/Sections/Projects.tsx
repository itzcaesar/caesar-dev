import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../../constants';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useSound } from '../../contexts/AudioContext';
import { translations } from '../../locales/translations';

const RepoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  repoUrl: string;
  projectTitle: string;
}> = ({ isOpen, onClose, repoUrl, projectTitle }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const { playSound } = useSound();

  useEffect(() => {
    if (isOpen && repoUrl) {
      playSound('access');
      setLoading(true);
      // Extract owner/repo from URL
      const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (match) {
        const [_, owner, repo] = match;
        fetch(`https://api.github.com/repos/${owner}/${repo}`)
          .then(res => res.json())
          .then(data => {
            setData(data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }
  }, [isOpen, repoUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-sw-black border border-sw-accent p-6 max-w-md w-full relative overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Scanning Line Animation */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_0%,rgba(204,255,0,0.1)_50%,transparent_100%)] h-[200%] animate-scan" style={{ animationDuration: '3s' }} />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="font-mono text-xs text-sw-accent mb-1">TARGET_REPO_IDENTIFIED</p>
              <h3 className="text-2xl font-bold uppercase text-white">{projectTitle}</h3>
            </div>
            <button onClick={() => { playSound('click'); onClose(); }} className="text-gray-500 hover:text-white">
              <span className="font-mono text-xl">[X]</span>
            </button>
          </div>

          <div className="space-y-6 mb-8">
            {loading ? (
              <div className="font-mono text-sw-accent animate-pulse">ESTABLISHING CONNECTION...</div>
            ) : data ? (
              <>
                <p className="text-gray-400 font-mono text-sm leading-relaxed border-l-2 border-white/10 pl-4">
                  {data.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-3 border border-white/10 flex flex-col">
                    <span className="text-[10px] text-gray-500 font-mono uppercase">Stars</span>
                    <span className="text-xl font-bold text-sw-accent">{data.stargazers_count}</span>
                  </div>
                  <div className="bg-white/5 p-3 border border-white/10 flex flex-col">
                    <span className="text-[10px] text-gray-500 font-mono uppercase">Forks</span>
                    <span className="text-xl font-bold text-white">{data.forks_count}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-red-500 font-mono">CONNECTION FAILED (PRIVATE_REPO?)</div>
            )}
          </div>

          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-sw-accent text-black font-bold uppercase text-center py-4 hover:bg-white transition-colors tracking-wider"
          >
            Access Repository
          </a>
        </div>

        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-white" />
        <div className="absolute top-0 right-0 w-2 h-2 bg-white" />
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-white" />
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-white" />
      </motion.div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<{ url: string; title: string } | null>(null);
  const { language } = useApp();
  const { playSound } = useSound();
  const t = translations[language].projects;

  return (
    <section id="projects" className="py-32 px-6 bg-sw-black relative z-20 border-t border-white/10">
      <RepoModal
        isOpen={!!selectedRepo}
        onClose={() => setSelectedRepo(null)}
        repoUrl={selectedRepo?.url || ''}
        projectTitle={selectedRepo?.title || ''}
      />

      <div className="max-w-[1400px] mx-auto w-full">

        <div className="flex items-end justify-between mb-20">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-sw-accent text-xs">{t.subtitle}</span>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">{t.title}</h2>
          </div>
          <p className="hidden md:block text-gray-500 font-mono text-xs text-right max-w-xs">
            {t.archive}<br />
            {t.period}
          </p>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="group relative border-b border-white/10 transition-colors bg-sw-black"
              onMouseEnter={() => {
                setHoveredProject(project.id);
                playSound('hover');
              }}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => {
                setSelectedRepo({ url: project.repo, title: project.title.replace(/_/g, ' ') });
                playSound('click');
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
              }}
            >
              {/* Spotlight Effect Border */}
              <div
                className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(204, 255, 0, 0.15), transparent 40%)`
                }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-px z-10 bg-gradient-to-r from-transparent via-sw-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <div
                className="relative z-10 flex flex-col md:flex-row md:items-center justify-between py-10 px-2 cursor-pointer"
                data-cursor-text="ACCESS_DB"
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
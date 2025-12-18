import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { translations } from '../../locales/translations';

const Contact: React.FC = () => {
  const { language } = useApp();
  const t = translations[language].contact;

  return (
    <section id="contact" className="min-h-[80vh] flex flex-col justify-between py-20 px-6 bg-sw-black relative border-t border-white/10">
      
      <div className="max-w-[1400px] mx-auto w-full flex-grow flex flex-col justify-center">
        <p className="font-mono text-sw-accent text-xs mb-8 uppercase tracking-widest">// {t.subtitle}</p>
        
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 max-w-3xl">
          {t.heading}
        </h2>

        <a 
          href="mailto:muhammadcaesarrifqi@gmail.com"
          className="group relative inline-flex items-center gap-4 text-[4vw] font-bold leading-none uppercase tracking-tighter text-gray-500 hover:text-white transition-colors self-start"
          data-cursor-text={t.sendMail}
        >
          <span>{t.sendEmail}</span>
          <span className="w-4 h-4 bg-sw-accent rounded-full group-hover:animate-ping" />
        </a>
      </div>

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8 mt-12">
        <div>
          <h5 className="font-mono text-[10px] text-gray-500 mb-4 uppercase tracking-widest">{t.connect}</h5>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm font-bold hover:text-sw-accent uppercase transition-colors">Github</a></li>
            <li><a href="#" className="text-sm font-bold hover:text-sw-accent uppercase transition-colors">Instagram</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-mono text-[10px] text-gray-500 mb-4 uppercase tracking-widest">{t.system}</h5>
          <p className="text-sm font-mono text-gray-400">REACT / TYPESCRIPT / TAILWIND</p>
        </div>
        <div>
           <h5 className="font-mono text-[10px] text-gray-500 mb-4 uppercase tracking-widest">{t.localTime}</h5>
           <p className="text-sm font-mono text-gray-400">{new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', timeZoneName: 'short'})}</p>
        </div>
        <div className="text-right flex flex-col justify-end">
          <p className="font-mono text-[10px] text-sw-accent uppercase">
             {t.footer}
          </p>
        </div>
      </div>

    </section>
  );
};

export default Contact;
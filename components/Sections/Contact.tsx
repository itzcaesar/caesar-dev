import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { translations } from '../../locales/translations';

const SystemMetric: React.FC<{ label: string; value?: string; bar?: boolean }> = ({ label, value, bar }) => {
  const [metric, setMetric] = useState(0);

  useEffect(() => {
    if (!bar) return;
    const interval = setInterval(() => {
      setMetric(Math.floor(Math.random() * 30 + 40));
    }, 2000);
    return () => clearInterval(interval);
  }, [bar]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-gray-500">
        <span>{label}</span>
        <span>{value || `${metric}%`}</span>
      </div>
      {bar && (
        <div className="h-1 bg-white/10 w-full overflow-hidden">
          <div
            className="h-full bg-sw-accent transition-all duration-1000 ease-in-out"
            style={{ width: `${metric}%` }}
          />
        </div>
      )}
    </div>
  );
};

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

      <div className="max-w-[1400px] mx-auto w-full border-t border-white/10 pt-8 mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
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
          <div className="md:col-span-2">
            <div className="grid grid-cols-3 gap-4 font-mono text-xs">
              <SystemMetric label="LATENCY" value={`${Math.floor(Math.random() * 20 + 10)}ms`} />
              <SystemMetric label="CPU" bar />
              <SystemMetric label="MEM" bar />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
            {t.footer}
          </p>
          <p className="text-[10px] font-mono text-sw-accent">
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}
          </p>
        </div>
      </div>

    </section>
  );
};

export default Contact;
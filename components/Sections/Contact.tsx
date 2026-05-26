import React from 'react';

import type { HomePageContent, SiteSettings } from '@/types';

type ContactProps = {
  content: HomePageContent['contact'];
  siteSettings: SiteSettings;
};

const Contact: React.FC<ContactProps> = ({ content, siteSettings }) => {
  return (
    <section id="contact" className="py-20 md:py-24 px-6 bg-sw-black relative border-t border-white/10">
      <div className="max-w-[1400px] mx-auto w-full">
        <p className="font-mono text-sw-accent text-xs mb-5 uppercase tracking-widest">{content.subtitle}</p>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 max-w-4xl uppercase leading-tight">
          {content.heading}
        </h2>

        <a
          href={`mailto:${content.email}`}
          className="group relative inline-flex max-w-full items-center gap-3 break-all text-2xl sm:text-4xl lg:text-6xl font-bold leading-none uppercase tracking-tight text-gray-500 hover:text-white transition-colors"
          data-cursor-text={content.sendMailCursorLabel}
        >
          <span>{content.sendEmailLabel}</span>
          <span className="h-3 w-3 flex-shrink-0 bg-sw-accent group-hover:animate-ping" />
        </a>

        <div className="mt-12 grid gap-px bg-white/10 border border-white/10 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="bg-sw-black p-5">
            <h5 className="font-mono text-[10px] text-gray-500 mb-4 uppercase tracking-widest">{content.connectLabel}</h5>
            <ul className="flex flex-wrap gap-2">
              {siteSettings.socials.map((social) => (
                <li key={`${social.platform}-${social.url}`}>
                  <a
                    href={social.url}
                    className="inline-flex min-h-10 items-center border border-white/10 px-3 font-mono text-xs uppercase text-gray-300 transition-colors hover:border-sw-accent hover:text-sw-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-sw-black p-5 font-mono text-[10px] uppercase tracking-widest text-gray-500 md:min-w-64">
            <p>{content.footer}</p>
            <p className="mt-2 text-sw-accent">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

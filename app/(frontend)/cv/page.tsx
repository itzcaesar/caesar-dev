'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, ExternalLink, FileText, ShieldCheck } from 'lucide-react';

import CustomCursor from '@/components/Layout/CustomCursor';
import GridBackground from '@/components/Layout/GridBackground';
import ParticleBackground from '@/components/Layout/ParticleBackground';
import Scanline from '@/components/Layout/Scanline';

const cvPath = '/cv/muhammad-caesar-rifqi-cv.pdf';
const cvPreviewPath = '/cv/muhammad-caesar-rifqi-cv-preview.png';

export default function CVPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-sw-black px-4 py-6 font-sans text-sw-white selection:bg-sw-accent selection:text-black md:px-6 md:py-8">
      <CustomCursor />
      <GridBackground />
      <ParticleBackground />
      <Scanline />

      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-3rem)] w-full max-w-[1400px] flex-col gap-6">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-4 border border-white/10 bg-sw-black/80 p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-5"
        >
          <div className="min-w-0">
            <p className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sw-accent">
              <FileText size={15} />
              CREDENTIALS_PACKET
            </p>
            <h1 className="font-sans text-3xl font-bold uppercase leading-tight tracking-tight text-white md:text-5xl">
              Muhammad Caesar Rifqi CV
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              data-cursor-text="BACK"
              className="inline-flex min-h-11 items-center gap-2 border border-white/20 px-4 font-mono text-xs uppercase tracking-widest text-gray-300 transition-colors hover:border-sw-accent hover:text-sw-accent"
            >
              <ArrowLeft size={15} />
              Portfolio
            </Link>
            <a
              href={cvPath}
              download
              data-cursor-text="DOWNLOAD CV"
              className="inline-flex min-h-11 items-center gap-2 bg-sw-accent px-4 font-mono text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-white"
            >
              <Download size={15} />
              Download CV
            </a>
            <a
              href={cvPath}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="OPEN PDF"
              className="inline-flex min-h-11 items-center gap-2 border border-white/20 px-4 font-mono text-xs uppercase tracking-widest text-gray-300 transition-colors hover:border-sw-accent hover:text-sw-accent"
            >
              <ExternalLink size={15} />
              Open PDF
            </a>
          </div>
        </motion.header>

        <div className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-[calc(100svh-12rem)] min-h-[620px] overflow-y-auto overflow-x-hidden border border-sw-accent bg-white max-lg:h-[72svh] max-lg:min-h-[520px]"
          >
            <img
              src={cvPreviewPath}
              alt="Preview of Muhammad Caesar Rifqi CV"
              className="block h-auto w-full bg-white"
            />
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="self-start border border-white/10 bg-sw-black/80"
          >
            <div className="border-b border-white/10 p-5">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sw-accent">
                <ShieldCheck size={15} />
                FILE_STATUS
              </p>
            </div>
            <div className="grid gap-px bg-white/10 font-mono uppercase">
              {[
                ['TYPE', 'PDF'],
                ['MODE', 'VIEW/DOWNLOAD'],
                ['SOURCE', 'LOCAL_PUBLIC_ASSET'],
                ['PATH', cvPath],
              ].map(([label, value]) => (
                <div key={label} className="grid gap-1 bg-sw-black p-4">
                  <span className="text-[10px] text-gray-600">{label}</span>
                  <span className="break-words text-[11px] text-gray-300">{value}</span>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </section>
    </main>
  );
}

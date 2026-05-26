'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, FileText, Home, Radar, Terminal } from 'lucide-react';

import CustomCursor from '@/components/Layout/CustomCursor';
import GridBackground from '@/components/Layout/GridBackground';
import ParticleBackground from '@/components/Layout/ParticleBackground';
import Scanline from '@/components/Layout/Scanline';

const scanRows = [
  ['ROUTE_HASH', '0x000_NOT_FOUND'],
  ['TRACE_STATE', 'BROKEN_LINK'],
  ['RECOVERY_NODE', 'PORTFOLIO_HOME'],
  ['SIGNAL', 'CV_AVAILABLE'],
];

export default function InteractiveNotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-sw-black px-6 py-10 font-sans text-sw-white selection:bg-sw-accent selection:text-black">
      <CustomCursor />
      <GridBackground />
      <ParticleBackground />
      <Scanline />

      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-[1400px] items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.65fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0"
          >
            <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-sw-accent">
              <Terminal size={16} />
              ROUTE_RECOVERY_PROTOCOL
            </div>

            <div className="relative">
              <motion.div
                aria-hidden="true"
                animate={{ x: [0, -6, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.4 }}
                className="absolute -left-1 top-1 text-[clamp(5rem,19vw,15rem)] font-bold uppercase leading-none text-sw-accent/20"
              >
                404
              </motion.div>
              <h1 className="relative font-sans text-[clamp(4rem,16vw,13rem)] font-bold uppercase leading-none tracking-tight text-white">
                404
              </h1>
            </div>

            <h2 className="mt-4 max-w-4xl font-sans text-3xl font-bold uppercase leading-tight tracking-tight text-white md:text-5xl">
              Signal lost, but the archive is still online.
            </h2>
            <p className="mt-5 max-w-2xl font-mono text-sm uppercase leading-relaxed text-gray-400">
              The route you requested does not exist in this system. Choose a recovery path below and we will get you back into the portfolio.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                data-cursor-text="BACK TO PORTFOLIO"
                className="group inline-flex min-h-12 items-center gap-2 bg-sw-accent px-5 font-mono text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-white"
              >
                <Home size={16} />
                Back to Portfolio
              </Link>
              <Link
                href="/works"
                data-cursor-text="OPEN WORKS"
                className="group inline-flex min-h-12 items-center gap-2 border border-white/20 px-5 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-sw-accent hover:text-sw-accent"
              >
                <Briefcase size={16} />
                Selected Works
              </Link>
              <Link
                href="/cv"
                data-cursor-text="VIEW CV"
                className="group inline-flex min-h-12 items-center gap-2 border border-white/20 px-5 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-sw-accent hover:text-sw-accent"
              >
                <FileText size={16} />
                View CV
              </Link>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="border border-white/10 bg-sw-black/80"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase text-sw-accent">
                <Radar size={16} />
                SCAN_RESULT
              </div>
              <span className="font-mono text-[10px] uppercase text-gray-600">LIVE</span>
            </div>

            <div className="grid gap-px bg-white/10">
              {scanRows.map(([label, value], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.3 + index * 0.08 }}
                  className="grid grid-cols-[0.85fr_1fr] gap-4 bg-sw-black px-5 py-4 font-mono uppercase"
                >
                  <span className="text-[10px] text-gray-600">{label}</span>
                  <span className="min-w-0 break-words text-[11px] text-gray-300">{value}</span>
                </motion.div>
              ))}
            </div>

            <div className="p-5">
              <Link
                href="/cv"
                data-cursor-text="VIEW CV"
                className="group flex min-h-12 items-center justify-between border border-sw-accent px-4 font-mono text-xs uppercase tracking-widest text-sw-accent transition-colors hover:bg-sw-accent hover:text-black"
              >
                Open credentials packet
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.aside>
        </div>
      </section>
    </main>
  );
}

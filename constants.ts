import { Project, Skill, SocialLink } from './types';

export const PROJECTS: Project[] = [
  {
    id: '001',
    title: 'TABUNG-IN',
    description: 'Indonesian personal finance management app with OCR receipt scanning, budget tracking, visual reports, and local e-wallet/bank integration. Built with Next.js 15, NextAuth v5, Drizzle ORM.',
    tags: ['Next.js', 'TypeScript', 'Drizzle'],
    imageUrl: 'https://picsum.photos/1200/800?grayscale&random=1',
    repo: 'https://github.com/itzcaesar/tabung-in',
  },
  {
    id: '002',
    title: 'METALABS-REWORK',
    description: 'A rework of METALABS website, focusing on UI/UX and modernized frameworks.',
    tags: ['TypeScript', 'UI/UX', 'Web'],
    imageUrl: 'https://picsum.photos/1200/800?grayscale&random=2',
    repo: 'https://github.com/itzcaesar/metalabs-rework',
  },
  {
    id: '003',
    title: 'GOOGLEFORM-AUTOFILL',
    description: 'A simple Python tool to automatically fill and submit Google Forms with either random or custom data. Supports multi-page forms, batch submissions, custom values via JSON, dry-run mode.',
    tags: ['Python', 'Automation', 'Tools'],
    imageUrl: 'https://picsum.photos/1200/800?grayscale&random=3',
    repo: 'https://github.com/itzcaesar/googleform-autofill',
  },
  {
    id: '004',
    title: 'VIRTUAL-LAB-SISJARKOM',
    description: 'Virtual lab project for network systems course (SISJARKOM) at Telkom University.',
    tags: ['TypeScript', 'Education', 'Network'],
    imageUrl: 'https://picsum.photos/1200/800?grayscale&random=4',
    repo: 'https://github.com/itzcaesar/virtual-lab-sisjarkom',
  },
];

export const SKILLS: Skill[] = [
  // Game Development
  { name: 'BLENDER', category: 'Game Development', level: 85 },
  { name: 'UNITY', category: 'Game Development', level: 90 },
  { name: 'UNREAL_ENGINE_5', category: 'Game Development', level: 85 },
  { name: 'C++_&_C#', category: 'Game Development', level: 88 },
  
  // Full Stack Dev
  { name: 'HTML/CSS/JAVASCRIPT', category: 'Full Stack Dev', level: 95 },
  { name: 'REACT', category: 'Full Stack Dev', level: 92 },
  { name: 'NEXT.JS', category: 'Full Stack Dev', level: 90 },
  { name: 'TAILWIND', category: 'Full Stack Dev', level: 93 },
  { name: 'NODE.JS', category: 'Full Stack Dev', level: 88 },
  { name: 'PYTHON', category: 'Full Stack Dev', level: 85 },
];

export const SOCIALS: SocialLink[] = [
  { platform: 'GITHUB', url: '#', icon: 'github' },
  { platform: 'LINKEDIN', url: '#', icon: 'linkedin' },
  { platform: 'TWITTER', url: '#', icon: 'twitter' },
];
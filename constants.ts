import { Project, Skill, SocialLink, WorkExperience, CurrentProject } from './types';

export const PROJECTS: Project[] = [
  {
    id: '001',
    title: 'AL-Store Landing Page',
    description: 'A landing page tailored for a hosting company with PayloadCMS and WeMX Integration and data sync such as discount, coupons and announcement.',
    tags: ['React', 'TypeScript', 'PostgreSQL', 'NextJS', 'PayloadCMS'],
    imageUrl: '-',
    imageFile: '/media/projects/alstore/alstore-hosting.png',
    images: [
      '/media/projects/alstore/alstore-hosting.png',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop&q=80'
    ],
    repo: 'https://alstoredev.my.id',
  },
  {
    id: '002',
    title: 'METALABS-REWORK',
    description: 'A rework of METALABS website, focusing on UI/UX and modernized frameworks.',
    tags: ['TypeScript', 'UI/UX', 'Web'],
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop&q=80',
    repo: 'https://github.com/itzcaesar/metalabs-rework',
  },
  {
    id: '003',
    title: 'AMANGAKNIH.ID',
    description: 'A real-time website security analysis and phishing detection tool for Indonesia. Built with Laravel 12, React, and Inertia.js.',
    tags: ['TypeScript', 'Education', 'Network'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&q=80',
    repo: 'https://github.com/itzcaesar/aman-gak-nih',
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

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: 'work-001',
    company: 'AL-Store Hosting',
    role: 'Full Stack Developer',
    duration: {
      start: 'Jan 2026',
      end: 'Present'
    },
    description: 'Building scalable landing page with CMS system and maintaining WeMX & Pterodactyl panel functionality.',
    responsibilities: [
      'Architected and implemented microservices architecture using Node.js and React',
      'Building CMS System and implementing WeMX sync integration system through custom endpoints',
      'Reduced application load time by 40% through optimization techniques'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'NextJS', 'PayloadCMS'],
    companyLogo: 'https://alstore.space/penyimpanan/logo.png',
    companyUrl: 'https://alstore.space'
  }
];

export const CURRENT_PROJECTS: CurrentProject[] = [];
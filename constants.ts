import { Project, Skill, SocialLink, WorkExperience, CurrentProject } from './types';

export const PROJECTS: Project[] = [
  {
    id: '001',
    title: 'AL-Store Landing Page',
    description: 'Indonesian personal finance management app with OCR receipt scanning, budget tracking, visual reports, and local e-wallet/bank integration. Built with Next.js 15, NextAuth v5, Drizzle ORM.',
    tags: ['Next.js', 'TypeScript', 'Drizzle'],
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=800&fit=crop&q=80',
    repo: 'https://github.com/itzcaesar/tabung-in',
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
    title: 'GOOGLEFORM-AUTOFILL',
    description: 'A simple Python tool to automatically fill and submit Google Forms with either random or custom data. Supports multi-page forms, batch submissions, custom values via JSON, dry-run mode.',
    tags: ['Python', 'Automation', 'Tools'],
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=800&fit=crop&q=80',
    repo: 'https://github.com/itzcaesar/googleform-autofill',
  },
  {
    id: '004',
    title: 'VIRTUAL-LAB-SISJARKOM',
    description: 'Virtual lab project for network systems course (SISJARKOM) at Telkom University.',
    tags: ['TypeScript', 'Education', 'Network'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&q=80',
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

export const CURRENT_PROJECTS: CurrentProject[] = [
  {
    id: 'current-001',
    title: 'AI-Powered Task Manager',
    description: 'Building an intelligent task management system with AI-driven prioritization, natural language processing for task creation, and smart scheduling recommendations.',
    tags: ['React', 'TypeScript', 'OpenAI', 'Node.js'],
    imageUrl: 'https://picsum.photos/1200/800?grayscale&random=10',
    status: 'in-progress',
    progress: 65,
    lastUpdated: '2024-01-15',
    expectedCompletion: 'Q2 2024',
    repo: 'https://github.com/itzcaesar/ai-task-manager'
  },
  {
    id: 'current-002',
    title: 'VR Training Simulator',
    description: 'Developing a virtual reality training platform for industrial safety procedures using Unreal Engine 5 with realistic physics and interactive scenarios.',
    tags: ['Unreal Engine 5', 'C++', 'VR', 'Blueprint'],
    imageUrl: 'https://picsum.photos/1200/800?grayscale&random=11',
    status: 'planning',
    progress: 25,
    expectedCompletion: 'Q3 2024',
    // No lastUpdated or repo to test conditional rendering
  },
  {
    id: 'current-003',
    title: 'Open Source UI Library',
    description: 'Creating a comprehensive React component library with accessibility-first design, dark mode support, and extensive customization options.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Storybook'],
    imageUrl: 'https://picsum.photos/1200/800?grayscale&random=12',
    status: 'on-hold',
    lastUpdated: '2023-12-20',
    repo: 'https://github.com/itzcaesar/ui-library',
    // No progress or expectedCompletion to test conditional rendering
  }
];
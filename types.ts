export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
  repo?: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'design' | 'tools' | 'Game Development' | 'Full Stack Dev';
  level: number; // 0-100
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export type SectionId = 'hero' | 'about' | 'projects' | 'skills' | 'contact';

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  duration: {
    start: string; // e.g., "Jan 2023"
    end: string | 'Present'; // e.g., "Dec 2023" or "Present"
  };
  description: string;
  responsibilities: string[];
  technologies: string[];
  companyLogo?: string;
  companyUrl?: string;
}

export type ProjectStatus = 'in-progress' | 'planning' | 'on-hold';

export interface CurrentProject extends Project {
  status: ProjectStatus;
  progress?: number; // 0-100
  lastUpdated?: string; // e.g., "2024-01-15"
  expectedCompletion?: string; // e.g., "Q2 2024"
}
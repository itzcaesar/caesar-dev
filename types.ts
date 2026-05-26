export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  imageFile?: string; // Local image file path as alternative
  images?: string[]; // Array of additional images for carousel
  link?: string;
  repo?: string;
  imageAlt?: string;
}

export interface Skill {
  name: string;
  category: string;
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
    end: string; // e.g., "Dec 2023" or a localized current label
  };
  description: string;
  responsibilities: string[];
  technologies: string[];
  companyLogo?: string;
  companyUrl?: string;
  isCurrent?: boolean;
}

export type ProjectStatus = 'in-progress' | 'planning' | 'on-hold';

export interface CurrentProject extends Project {
  status: ProjectStatus;
  progress?: number; // 0-100
  lastUpdated?: string; // e.g., "2024-01-15"
  expectedCompletion?: string; // e.g., "Q2 2024"
}

export type Language = 'en' | 'id';

export type LocalizedRecord<T> = Record<Language, T>;

export interface SocialLinkCMS {
  platform: string;
  url: string;
  icon: string;
}

export interface SiteSettings {
  brandName: string;
  languageLabels: {
    english: string;
    indonesian: string;
  };
  languageToggleTitles: {
    toEnglish: string;
    toIndonesian: string;
  };
  navItems: {
    sectionId: SectionId;
    label: string;
  }[];
  homeLabel: string;
  backToPortfolioLabel: string;
  socials: SocialLinkCMS[];
  uiLabels: {
    projectDetails: string;
    clickToExpand: string;
    repository: string;
    demo: string;
    repoShort: string;
    imageNotFound: string;
    close: string;
  };
}

export interface MetadataContent {
  title: string;
  description: string;
}

export interface HomePageContent {
  metadata: MetadataContent;
  hero: {
    bootSequence: string;
    firstLineName: string;
    secondLineName: string;
    roleLabel: string;
    primaryRole: string;
    secondaryRole: string;
    conjunction: string;
    description: string;
    projectsButton: string;
    contactButton: string;
  };
  about: {
    label: string;
    details: string;
    headingBeforeFirstHighlight: string;
    headingFirstHighlight: string;
    headingBetweenHighlights: string;
    headingSecondHighlight: string;
    headingAfterSecondHighlight: string;
    profileMetrics: {
      label: string;
      value: string;
      accent?: boolean;
    }[];
    contentBlocks: {
      title: string;
      body: string;
      highlightTerms: string[];
    }[];
  };
  projectsSection: {
    subtitle: string;
    title: string;
    archiveLabel: string;
    periodLabel: string;
    viewAllWorksLabel: string;
  };
  skillsSection: {
    subtitle: string;
    title: string;
    systemLabel: string;
    totalLabel: string;
    activeLabel: string;
  };
  contact: {
    subtitle: string;
    heading: string;
    sendEmailLabel: string;
    sendMailCursorLabel: string;
    connectLabel: string;
    email: string;
    footer: string;
  };
}

export interface WorksPageContent {
  metadata: MetadataContent;
  hero: {
    title: string;
    subtitle: string;
    homeBreadcrumb: string;
    worksBreadcrumb: string;
    experienceStatLabel: string;
    archiveStatLabel: string;
    currentStatLabel: string;
  };
  experienceSection: {
    title: string;
    presentLabel: string;
    responsibilitiesLabel: string;
    noDataLabel: string;
    recordsIndexedLabel: string;
    startLabel: string;
    statusLabel: string;
  };
  allProjectsSection: {
    title: string;
    subtitle: string;
    noDataLabel: string;
  };
  currentWorkSection: {
    title: string;
    subtitle: string;
    progressLabel: string;
    lastUpdatedLabel: string;
    expectedCompletionLabel: string;
    noDataLabel: string;
    activeRecordsLabel: string;
    statusLabels: {
      inProgress: string;
      planning: string;
      onHold: string;
    };
  };
}

export interface LocalizedHomeData {
  currentProjects: CurrentProject[];
  homePage: HomePageContent;
  projects: Project[];
  siteSettings: SiteSettings;
  skills: Skill[];
}

export interface LocalizedWorksData {
  currentProjects: CurrentProject[];
  projects: Project[];
  siteSettings: SiteSettings;
  workExperiences: WorkExperience[];
  worksPage: WorksPageContent;
}

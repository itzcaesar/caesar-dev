import configPromise from '@payload-config';
import { unstable_cache } from 'next/cache';
import { getPayload } from 'payload';

import type {
  CurrentProject,
  HomePageContent,
  Language,
  LocalizedHomeData,
  LocalizedRecord,
  LocalizedWorksData,
  MetadataContent,
  Project,
  ProjectStatus,
  SiteSettings,
  Skill,
  WorkExperience,
  WorksPageContent,
} from '@/types';

type UnknownRecord = Record<string, unknown>;

const LOCALES: Language[] = ['en', 'id'];
const CACHE_SECONDS = 60;
const BUILD_PHASE = 'phase-production-build';

const fallbackMetadata: Record<'home' | 'works', MetadataContent> = {
  home: {
    title: 'Muhammad Caesar Rifqi | Software Engineer & Game Developer',
    description:
      'Portfolio of Muhammad Caesar Rifqi - Software Engineer and Game Developer creating robust digital systems and immersive interactive worlds.',
  },
  works: {
    title: 'Selected Works - Muhammad Caesar Rifqi',
    description:
      'Comprehensive showcase of professional experience, projects, and ongoing work by Muhammad Caesar Rifqi.',
  },
};

const fallbackAboutContent: Record<Language, Pick<HomePageContent['about'], 'contentBlocks' | 'profileMetrics'>> = {
  en: {
    profileMetrics: [
      { label: 'ID_REF', value: 'MCR_DEV_01' },
      { label: 'SECTOR', value: 'INDONESIA' },
      { label: 'ROLE', value: 'HYBRID_ENG' },
      { label: 'STATUS', value: 'ONLINE', accent: true },
    ],
    contentBlocks: [
      {
        title: '[01] The Background',
        body: 'I am Muhammad Caesar Rifqi, a developer based in Indonesia. My journey began with a curiosity for how games function under the hood, leading me to explore the depths of Computer Science.',
        highlightTerms: ['Muhammad Caesar Rifqi'],
      },
      {
        title: '[02] The Education',
        body: 'Currently taking a major in Digital Creative Multimedia at Telkom University. I am refining my skills in both creative design and technical implementation.',
        highlightTerms: ['Digital Creative Multimedia', 'Telkom University'],
      },
      {
        title: '[03] The Focus',
        body: 'My expertise splits into two core domains: Full Stack Development (building scalable web architectures) and Game Development (crafting interactive experiences using Unity and C#).',
        highlightTerms: ['Full Stack Development', 'Game Development'],
      },
    ],
  },
  id: {
    profileMetrics: [
      { label: 'ID_REF', value: 'MCR_DEV_01' },
      { label: 'SEKTOR', value: 'INDONESIA' },
      { label: 'PERAN', value: 'HYBRID_ENG' },
      { label: 'STATUS', value: 'ONLINE', accent: true },
    ],
    contentBlocks: [
      {
        title: '[01] Latar Belakang',
        body: 'Saya adalah Muhammad Caesar Rifqi, seorang developer yang berbasis di Indonesia. Perjalanan saya dimulai dengan rasa ingin tahu tentang bagaimana game berfungsi di balik layar, yang membawa saya untuk mengeksplorasi kedalaman Ilmu Komputer.',
        highlightTerms: ['Muhammad Caesar Rifqi'],
      },
      {
        title: '[02] Pendidikan',
        body: 'Saat ini mengambil jurusan Digital Creative Multimedia di Universitas Telkom. Saya terus mengasah keterampilan saya dalam desain kreatif dan implementasi teknis.',
        highlightTerms: ['Digital Creative Multimedia', 'Universitas Telkom'],
      },
      {
        title: '[03] Fokus',
        body: 'Keahlian saya terbagi dalam dua domain inti: Full Stack Development (membangun arsitektur web yang scalable) dan Game Development (menciptakan pengalaman interaktif menggunakan Unity dan C#).',
        highlightTerms: ['Full Stack Development', 'Game Development'],
      },
    ],
  },
};

const fallbackProjectTags: Record<Language, Record<string, string[]>> = {
  en: {
    '001': ['React', 'TypeScript', 'PostgreSQL', 'NextJS', 'PayloadCMS'],
    '002': ['TypeScript', 'UI/UX', 'Web'],
    '003': ['TypeScript', 'Education', 'Network'],
  },
  id: {
    '001': ['React', 'TypeScript', 'PostgreSQL', 'NextJS', 'PayloadCMS'],
    '002': ['TypeScript', 'UI/UX', 'Web'],
    '003': ['TypeScript', 'Edukasi', 'Jaringan'],
  },
};

const fallbackWorkDetails: Record<Language, Record<string, Pick<WorkExperience, 'responsibilities' | 'technologies'>>> = {
  en: {
    'work-001': {
      responsibilities: [
        'Architected and implemented microservices architecture using Node.js and React',
        'Building CMS System and implementing WeMX sync integration system through custom endpoints',
        'Reduced application load time by 40% through optimization techniques',
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'NextJS', 'PayloadCMS'],
    },
  },
  id: {
    'work-001': {
      responsibilities: [
        'Merancang dan mengimplementasikan arsitektur microservices menggunakan Node.js dan React',
        'Membangun sistem CMS dan integrasi sinkronisasi WeMX melalui endpoint khusus',
        'Mengurangi waktu muat aplikasi sebesar 40% melalui teknik optimisasi',
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'NextJS', 'PayloadCMS'],
    },
  },
};

const tags = {
  all: 'portfolio',
  home: 'home-page',
  projects: 'projects',
  site: 'site-settings',
  skills: 'skills',
  workExperiences: 'work-experiences',
  works: 'works-page',
};

const projectStatuses: ProjectStatus[] = ['in-progress', 'planning', 'on-hold'];

function isBuildPhase() {
  return process.env.NEXT_PHASE === BUILD_PHASE;
}

function record(value: unknown): UnknownRecord {
  return value && typeof value === 'object' ? (value as UnknownRecord) : {};
}

function text(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function textArray(rows: unknown, key: string): string[] {
  if (!Array.isArray(rows)) {
    return [];
  }

  return rows
    .map((row) => (row && typeof row === 'object' ? text((row as UnknownRecord)[key]) : ''))
    .filter(Boolean);
}

function rows(value: unknown): UnknownRecord[] {
  return Array.isArray(value) ? value.map(record) : [];
}

function uploadUrl(value: unknown): string | undefined {
  if (value && typeof value === 'object') {
    const url = (value as UnknownRecord).url;
    return typeof url === 'string' ? url : undefined;
  }

  return undefined;
}

function uploadAlt(value: unknown): string | undefined {
  if (value && typeof value === 'object') {
    const alt = (value as UnknownRecord).alt;
    return typeof alt === 'string' ? alt : undefined;
  }

  return undefined;
}

function required<T extends object>(value: T | null | undefined, name: string): T {
  if (!value || !Object.keys(value).length) {
    throw new Error(`Required Payload CMS document is missing: ${name}`);
  }

  return value;
}

function mapImageList(doc: UnknownRecord): string[] {
  return rows(doc.gallery)
    .map((item) => uploadUrl(item.image) || text(item.url))
    .filter(Boolean);
}

function mapProject(doc: UnknownRecord, locale: Language): Project {
  const featuredImage = uploadUrl(doc.featuredImage);
  const imageUrl = featuredImage || text(doc.imageUrl);
  const id = String(doc.projectId || doc.id || '');
  const tags = textArray(doc.tags, 'tag');

  return {
    id,
    title: text(doc.title),
    description: text(doc.description),
    tags: tags.length ? tags : fallbackProjectTags[locale][id] || [],
    imageUrl,
    imageAlt: uploadAlt(doc.featuredImage) || text(doc.title),
    images: mapImageList(doc),
    link: text(doc.link) || undefined,
    repo: text(doc.repo) || undefined,
  };
}

function mapCurrentProject(doc: UnknownRecord, locale: Language): CurrentProject {
  const status = projectStatuses.includes(doc.status as ProjectStatus)
    ? (doc.status as ProjectStatus)
    : 'in-progress';

  return {
    ...mapProject(doc, locale),
    expectedCompletion: text(doc.expectedCompletion) || undefined,
    lastUpdated: text(doc.lastUpdated) || undefined,
    progress: typeof doc.progress === 'number' ? doc.progress : undefined,
    status,
  };
}

function mapSkill(doc: UnknownRecord): Skill {
  return {
    category: (text(doc.category) || 'tools') as Skill['category'],
    level: typeof doc.level === 'number' ? doc.level : 0,
    name: text(doc.name),
  };
}

function mapWorkExperience(doc: UnknownRecord, locale: Language): WorkExperience {
  const duration = record(doc.duration);
  const id = String(doc.experienceId || doc.id || '');
  const detailsFallback = fallbackWorkDetails[locale][id];
  const responsibilities = textArray(doc.responsibilities, 'item');
  const technologies = textArray(doc.technologies, 'item');

  return {
    id,
    company: text(doc.company),
    role: text(doc.role),
    duration: {
      start: text(duration.start),
      end: text(duration.end),
    },
    description: text(doc.description),
    responsibilities: responsibilities.length ? responsibilities : detailsFallback?.responsibilities || [],
    technologies: technologies.length ? technologies : detailsFallback?.technologies || [],
    companyLogo: uploadUrl(doc.companyLogo) || text(doc.companyLogoUrl) || undefined,
    companyUrl: text(doc.companyUrl) || undefined,
    isCurrent: Boolean(doc.isCurrent),
  };
}

function mapSiteSettings(doc: UnknownRecord): SiteSettings {
  const languageLabels = record(doc.languageLabels);
  const languageToggleTitles = record(doc.languageToggleTitles);
  const uiLabels = record(doc.uiLabels);

  return required(
    {
      brandName: text(doc.brandName),
      backToPortfolioLabel: text(doc.backToPortfolioLabel),
      homeLabel: text(doc.homeLabel),
      languageLabels: {
        english: text(languageLabels.english),
        indonesian: text(languageLabels.indonesian),
      },
      languageToggleTitles: {
        toEnglish: text(languageToggleTitles.toEnglish),
        toIndonesian: text(languageToggleTitles.toIndonesian),
      },
      navItems: rows(doc.navItems).map((item) => ({
        sectionId: text(item.sectionId) as SiteSettings['navItems'][number]['sectionId'],
        label: text(item.label) || text(item.sectionId),
      })),
      socials: rows(doc.socials).map((item) => ({
        platform: text(item.platform) || text(item.icon),
        url: text(item.url),
        icon: text(item.icon),
      })),
      uiLabels: {
        clickToExpand: text(uiLabels.clickToExpand),
        close: text(uiLabels.close),
        demo: text(uiLabels.demo),
        imageNotFound: text(uiLabels.imageNotFound),
        projectDetails: text(uiLabels.projectDetails),
        repoShort: text(uiLabels.repoShort),
        repository: text(uiLabels.repository),
      },
    },
    'site-settings',
  );
}

function mapHomePage(doc: UnknownRecord, locale: Language): HomePageContent {
  const metadata = record(doc.metadata);
  const hero = record(doc.hero);
  const about = record(doc.about);
  const projectsSection = record(doc.projectsSection);
  const skillsSection = record(doc.skillsSection);
  const contact = record(doc.contact);

  const contentBlocks = rows(about.contentBlocks).map((item) => ({
    body: text(item.body),
    highlightTerms: textArray(item.highlightTerms, 'term'),
    title: text(item.title),
  }));
  const profileMetrics = rows(about.profileMetrics).map((item) => ({
    accent: Boolean(item.accent),
    label: text(item.label),
    value: text(item.value),
  }));

  return required(
    {
      metadata: {
        description: text(metadata.description),
        title: text(metadata.title),
      },
      hero: {
        bootSequence: text(hero.bootSequence),
        conjunction: text(hero.conjunction),
        contactButton: text(hero.contactButton),
        description: text(hero.description),
        firstLineName: text(hero.firstLineName),
        primaryRole: text(hero.primaryRole),
        projectsButton: text(hero.projectsButton),
        roleLabel: text(hero.roleLabel),
        secondaryRole: text(hero.secondaryRole),
        secondLineName: text(hero.secondLineName),
      },
      about: {
        contentBlocks: contentBlocks.some((item) => item.title || item.body)
          ? contentBlocks
          : fallbackAboutContent[locale].contentBlocks,
        details: text(about.details),
        headingAfterSecondHighlight: text(about.headingAfterSecondHighlight),
        headingBeforeFirstHighlight: text(about.headingBeforeFirstHighlight),
        headingBetweenHighlights: text(about.headingBetweenHighlights),
        headingFirstHighlight: text(about.headingFirstHighlight),
        headingSecondHighlight: text(about.headingSecondHighlight),
        label: text(about.label),
        profileMetrics: profileMetrics.some((item) => item.label || item.value)
          ? profileMetrics
          : fallbackAboutContent[locale].profileMetrics,
      },
      projectsSection: {
        archiveLabel: text(projectsSection.archiveLabel),
        periodLabel: text(projectsSection.periodLabel),
        subtitle: text(projectsSection.subtitle),
        title: text(projectsSection.title),
        viewAllWorksLabel: text(projectsSection.viewAllWorksLabel),
      },
      skillsSection: {
        activeLabel: text(skillsSection.activeLabel),
        subtitle: text(skillsSection.subtitle),
        systemLabel: text(skillsSection.systemLabel),
        title: text(skillsSection.title),
        totalLabel: text(skillsSection.totalLabel),
      },
      contact: {
        connectLabel: text(contact.connectLabel),
        email: text(contact.email),
        footer: text(contact.footer),
        heading: text(contact.heading),
        sendEmailLabel: text(contact.sendEmailLabel),
        sendMailCursorLabel: text(contact.sendMailCursorLabel),
        subtitle: text(contact.subtitle),
      },
    },
    'home-page',
  );
}

function mapWorksPage(doc: UnknownRecord): WorksPageContent {
  const metadata = record(doc.metadata);
  const hero = record(doc.hero);
  const experienceSection = record(doc.experienceSection);
  const allProjectsSection = record(doc.allProjectsSection);
  const currentWorkSection = record(doc.currentWorkSection);
  const statusLabels = record(currentWorkSection.statusLabels);

  return required(
    {
      metadata: {
        description: text(metadata.description),
        title: text(metadata.title),
      },
      hero: {
        archiveStatLabel: text(hero.archiveStatLabel),
        currentStatLabel: text(hero.currentStatLabel),
        experienceStatLabel: text(hero.experienceStatLabel),
        homeBreadcrumb: text(hero.homeBreadcrumb),
        subtitle: text(hero.subtitle),
        title: text(hero.title),
        worksBreadcrumb: text(hero.worksBreadcrumb),
      },
      experienceSection: {
        noDataLabel: text(experienceSection.noDataLabel),
        presentLabel: text(experienceSection.presentLabel),
        recordsIndexedLabel: text(experienceSection.recordsIndexedLabel),
        responsibilitiesLabel: text(experienceSection.responsibilitiesLabel),
        startLabel: text(experienceSection.startLabel),
        statusLabel: text(experienceSection.statusLabel),
        title: text(experienceSection.title),
      },
      allProjectsSection: {
        noDataLabel: text(allProjectsSection.noDataLabel),
        subtitle: text(allProjectsSection.subtitle),
        title: text(allProjectsSection.title),
      },
      currentWorkSection: {
        activeRecordsLabel: text(currentWorkSection.activeRecordsLabel),
        expectedCompletionLabel: text(currentWorkSection.expectedCompletionLabel),
        lastUpdatedLabel: text(currentWorkSection.lastUpdatedLabel),
        noDataLabel: text(currentWorkSection.noDataLabel),
        progressLabel: text(currentWorkSection.progressLabel),
        statusLabels: {
          inProgress: text(statusLabels.inProgress),
          onHold: text(statusLabels.onHold),
          planning: text(statusLabels.planning),
        },
        subtitle: text(currentWorkSection.subtitle),
        title: text(currentWorkSection.title),
      },
    },
    'works-page',
  );
}

async function getPayloadClient() {
  return getPayload({ config: configPromise });
}

async function findDocs(collection: string, locale: Language, where?: UnknownRecord): Promise<UnknownRecord[]> {
  const payload = await getPayloadClient();
  const result = await (payload as { find: (args: UnknownRecord) => Promise<{ docs: UnknownRecord[] }> }).find({
    collection: collection as never,
    depth: 1,
    fallbackLocale: 'en',
    limit: 100,
    locale,
    overrideAccess: true,
    pagination: false,
    sort: 'order',
    where,
  });

  return (result as { docs: UnknownRecord[] }).docs;
}

async function findGlobal(slug: string, locale: Language): Promise<UnknownRecord> {
  const payload = await getPayloadClient();
  return (await (payload as { findGlobal: (args: UnknownRecord) => Promise<UnknownRecord> }).findGlobal({
    slug: slug as never,
    depth: 1,
    fallbackLocale: 'en',
    locale,
    overrideAccess: true,
  })) as UnknownRecord;
}

const getHomeLocaleData = unstable_cache(
  async (locale: Language): Promise<LocalizedHomeData> => {
    const [siteSettings, homePage, projectDocs, currentProjectDocs, skillDocs] = await Promise.all([
      findGlobal('site-settings', locale),
      findGlobal('home-page', locale),
      findDocs('projects', locale, { placement: { equals: 'archive' } }),
      findDocs('projects', locale, { placement: { equals: 'current' } }),
      findDocs('skills', locale),
    ]);

    return {
      currentProjects: currentProjectDocs.map((doc) => mapCurrentProject(doc, locale)),
      homePage: mapHomePage(homePage, locale),
      projects: projectDocs.map((doc) => mapProject(doc, locale)),
      siteSettings: mapSiteSettings(siteSettings),
      skills: skillDocs.map(mapSkill),
    };
  },
  ['portfolio-home-data'],
  { revalidate: CACHE_SECONDS, tags: [tags.all, tags.home, tags.site, tags.projects, tags.skills] },
);

const getWorksLocaleData = unstable_cache(
  async (locale: Language): Promise<LocalizedWorksData> => {
    const [siteSettings, worksPage, projectDocs, currentProjectDocs, workExperienceDocs] = await Promise.all([
      findGlobal('site-settings', locale),
      findGlobal('works-page', locale),
      findDocs('projects', locale, { placement: { equals: 'archive' } }),
      findDocs('projects', locale, { placement: { equals: 'current' } }),
      findDocs('work-experiences', locale),
    ]);

    return {
      currentProjects: currentProjectDocs.map((doc) => mapCurrentProject(doc, locale)),
      projects: projectDocs.map((doc) => mapProject(doc, locale)),
      siteSettings: mapSiteSettings(siteSettings),
      workExperiences: workExperienceDocs.map((doc) => mapWorkExperience(doc, locale)),
      worksPage: mapWorksPage(worksPage),
    };
  },
  ['portfolio-works-data'],
  { revalidate: CACHE_SECONDS, tags: [tags.all, tags.works, tags.site, tags.projects, tags.workExperiences] },
);

async function localize<T>(loader: (locale: Language) => Promise<T>): Promise<LocalizedRecord<T>> {
  const entries = await Promise.all(LOCALES.map(async (locale) => [locale, await loader(locale)] as const));
  return Object.fromEntries(entries) as LocalizedRecord<T>;
}

export async function getHomePageData(): Promise<LocalizedRecord<LocalizedHomeData>> {
  if (isBuildPhase()) {
    return {} as LocalizedRecord<LocalizedHomeData>;
  }

  return localize(getHomeLocaleData);
}

export async function getWorksPageData(): Promise<LocalizedRecord<LocalizedWorksData>> {
  if (isBuildPhase()) {
    return {} as LocalizedRecord<LocalizedWorksData>;
  }

  return localize(getWorksLocaleData);
}

export async function getHomePageMetadata(locale: Language = 'en'): Promise<MetadataContent> {
  if (isBuildPhase()) {
    return fallbackMetadata.home;
  }

  return (await getHomeLocaleData(locale)).homePage.metadata;
}

export async function getWorksPageMetadata(locale: Language = 'en'): Promise<MetadataContent> {
  if (isBuildPhase()) {
    return fallbackMetadata.works;
  }

  return (await getWorksLocaleData(locale)).worksPage.metadata;
}

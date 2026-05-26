import { postgresAdapter } from '@payloadcms/db-postgres';
import { revalidateTag } from 'next/cache';
import path from 'path';
import {
  buildConfig,
  type CollectionAfterChangeHook,
  type CollectionAfterDeleteHook,
  type CollectionConfig,
  type Field,
  type GlobalAfterChangeHook,
  type GlobalConfig,
} from 'payload';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const REVALIDATE_TAGS = {
  all: 'portfolio',
  home: 'home-page',
  projects: 'projects',
  site: 'site-settings',
  skills: 'skills',
  workExperiences: 'work-experiences',
  works: 'works-page',
};

const revalidateTags = (...tags: string[]) => {
  for (const tag of [REVALIDATE_TAGS.all, ...tags]) {
    try {
      revalidateTag(tag, 'max');
    } catch {
      // Payload CLI scripts run outside Next's cache context.
    }
  }
};

const revalidateCollection =
  (...tags: string[]): CollectionAfterChangeHook & CollectionAfterDeleteHook =>
  async () => {
    revalidateTags(...tags);
  };

const revalidateGlobal =
  (...tags: string[]): GlobalAfterChangeHook =>
  async () => {
    revalidateTags(...tags);
  };

const localizedText = (name: string, overrides: Record<string, unknown> = {}): Field => ({
  name,
  type: 'text',
  localized: true,
  ...overrides,
} as Field);

const localizedTextarea = (name: string, overrides: Record<string, unknown> = {}): Field => ({
  name,
  type: 'textarea',
  localized: true,
  ...overrides,
} as Field);

const plainText = (name: string, overrides: Record<string, unknown> = {}): Field => ({
  name,
  type: 'text',
  ...overrides,
} as Field);

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
};

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'alt',
  },
  upload: {
    mimeTypes: ['image/*'],
    staticDir: path.resolve(dirname, 'public/cms-media'),
  },
  fields: [localizedText('alt', { required: true })],
};

const imageReferenceFields: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'url',
    type: 'text',
  },
  plainText('alt'),
];

const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    defaultColumns: ['projectId', 'title', 'placement', 'order'],
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateCollection(REVALIDATE_TAGS.projects, REVALIDATE_TAGS.home, REVALIDATE_TAGS.works)],
    afterDelete: [revalidateCollection(REVALIDATE_TAGS.projects, REVALIDATE_TAGS.home, REVALIDATE_TAGS.works)],
  },
  fields: [
    {
      name: 'projectId',
      type: 'text',
      index: true,
      required: true,
      unique: true,
    },
    localizedText('title', { required: true }),
    localizedTextarea('description', { required: true }),
    {
      name: 'placement',
      type: 'select',
      defaultValue: 'archive',
      index: true,
      options: [
        { label: 'Archive project', value: 'archive' },
        { label: 'Current work', value: 'current' },
      ],
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'array',
      localized: true,
      fields: [plainText('tag', { required: true })],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Remote image URL',
    },
    {
      name: 'gallery',
      type: 'array',
      localized: true,
      fields: imageReferenceFields,
    },
    {
      name: 'link',
      type: 'text',
      label: 'Demo URL',
    },
    {
      name: 'repo',
      type: 'text',
      label: 'Repository URL',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'In progress', value: 'in-progress' },
        { label: 'Planning', value: 'planning' },
        { label: 'On hold', value: 'on-hold' },
      ],
    },
    {
      name: 'progress',
      type: 'number',
      max: 100,
      min: 0,
    },
    localizedText('lastUpdated'),
    localizedText('expectedCompletion'),
  ],
};

const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    defaultColumns: ['name', 'category', 'level', 'order'],
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateCollection(REVALIDATE_TAGS.skills, REVALIDATE_TAGS.home)],
    afterDelete: [revalidateCollection(REVALIDATE_TAGS.skills, REVALIDATE_TAGS.home)],
  },
  fields: [
    localizedText('name', { required: true }),
    localizedText('category', { index: true, required: true }),
    {
      name: 'level',
      type: 'number',
      max: 100,
      min: 0,
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

const WorkExperiences: CollectionConfig = {
  slug: 'work-experiences',
  admin: {
    defaultColumns: ['experienceId', 'company', 'role', 'order'],
    useAsTitle: 'company',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateCollection(REVALIDATE_TAGS.workExperiences, REVALIDATE_TAGS.works)],
    afterDelete: [revalidateCollection(REVALIDATE_TAGS.workExperiences, REVALIDATE_TAGS.works)],
  },
  fields: [
    {
      name: 'experienceId',
      type: 'text',
      index: true,
      required: true,
      unique: true,
    },
    localizedText('company', { required: true }),
    localizedText('role', { required: true }),
    {
      name: 'duration',
      type: 'group',
      fields: [
        localizedText('start', { required: true }),
        localizedText('end', { defaultValue: 'Present', required: true }),
      ],
    },
    {
      name: 'isCurrent',
      type: 'checkbox',
      defaultValue: false,
    },
    localizedTextarea('description', { required: true }),
    {
      name: 'responsibilities',
      type: 'array',
      localized: true,
      fields: [plainText('item', { required: true })],
    },
    {
      name: 'technologies',
      type: 'array',
      localized: true,
      fields: [plainText('item', { required: true })],
    },
    {
      name: 'companyLogo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'companyLogoUrl',
      type: 'text',
    },
    {
      name: 'companyUrl',
      type: 'text',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobal(REVALIDATE_TAGS.site, REVALIDATE_TAGS.home, REVALIDATE_TAGS.works)],
  },
  fields: [
    localizedText('brandName', { required: true }),
    {
      name: 'languageLabels',
      type: 'group',
      fields: [localizedText('english', { required: true }), localizedText('indonesian', { required: true })],
    },
    {
      name: 'languageToggleTitles',
      type: 'group',
      fields: [
        localizedText('toEnglish', { required: true }),
        localizedText('toIndonesian', { required: true }),
      ],
    },
    {
      name: 'navItems',
      type: 'array',
      localized: true,
      required: true,
      fields: [
        {
          name: 'sectionId',
          type: 'select',
          options: ['hero', 'about', 'projects', 'skills', 'contact'],
          required: true,
        },
        plainText('label', { required: true }),
      ],
    },
    localizedText('homeLabel', { required: true }),
    localizedText('backToPortfolioLabel', { required: true }),
    {
      name: 'socials',
      type: 'array',
      localized: true,
      fields: [
        plainText('platform', { required: true }),
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          options: ['github', 'instagram', 'linkedin', 'twitter', 'mail', 'external'],
          required: true,
        },
      ],
    },
    {
      name: 'uiLabels',
      type: 'group',
      fields: [
        localizedText('projectDetails', { required: true }),
        localizedText('clickToExpand', { required: true }),
        localizedText('repository', { required: true }),
        localizedText('demo', { required: true }),
        localizedText('repoShort', { required: true }),
        localizedText('imageNotFound', { required: true }),
        localizedText('close', { required: true }),
      ],
    },
  ],
};

const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobal(REVALIDATE_TAGS.home)],
  },
  fields: [
    {
      name: 'metadata',
      type: 'group',
      fields: [localizedText('title', { required: true }), localizedTextarea('description', { required: true })],
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        localizedText('bootSequence', { required: true }),
        localizedText('firstLineName', { required: true }),
        localizedText('secondLineName', { required: true }),
        localizedText('roleLabel', { required: true }),
        localizedText('primaryRole', { required: true }),
        localizedText('secondaryRole', { required: true }),
        localizedText('conjunction', { required: true }),
        localizedTextarea('description', { required: true }),
        localizedText('projectsButton', { required: true }),
        localizedText('contactButton', { required: true }),
      ],
    },
    {
      name: 'about',
      type: 'group',
      fields: [
        localizedText('label', { required: true }),
        localizedText('details', { required: true }),
        localizedText('headingBeforeFirstHighlight', { required: true }),
        localizedText('headingFirstHighlight', { required: true }),
        localizedText('headingBetweenHighlights', { required: true }),
        localizedText('headingSecondHighlight', { required: true }),
        localizedText('headingAfterSecondHighlight', { required: true }),
        {
          name: 'profileMetrics',
          type: 'array',
          localized: true,
          fields: [
            plainText('label', { required: true }),
            plainText('value', { required: true }),
            {
              name: 'accent',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          name: 'contentBlocks',
          type: 'array',
          localized: true,
          fields: [
            plainText('title', { required: true }),
            {
              name: 'body',
              type: 'textarea',
              required: true,
            },
            {
              name: 'highlightTerms',
              type: 'array',
              fields: [plainText('term', { required: true })],
            },
          ],
        },
      ],
    },
    {
      name: 'projectsSection',
      type: 'group',
      fields: [
        localizedText('subtitle', { required: true }),
        localizedText('title', { required: true }),
        localizedText('archiveLabel', { required: true }),
        localizedText('periodLabel', { required: true }),
        localizedText('viewAllWorksLabel', { required: true }),
      ],
    },
    {
      name: 'skillsSection',
      type: 'group',
      fields: [
        localizedText('subtitle', { required: true }),
        localizedText('title', { required: true }),
        localizedText('systemLabel', { required: true }),
        localizedText('totalLabel', { required: true }),
        localizedText('activeLabel', { required: true }),
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        localizedText('subtitle', { required: true }),
        localizedTextarea('heading', { required: true }),
        localizedText('sendEmailLabel', { required: true }),
        localizedText('sendMailCursorLabel', { required: true }),
        localizedText('connectLabel', { required: true }),
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        localizedText('footer', { required: true }),
      ],
    },
  ],
};

const WorksPage: GlobalConfig = {
  slug: 'works-page',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobal(REVALIDATE_TAGS.works)],
  },
  fields: [
    {
      name: 'metadata',
      type: 'group',
      fields: [localizedText('title', { required: true }), localizedTextarea('description', { required: true })],
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        localizedText('title', { required: true }),
        localizedTextarea('subtitle', { required: true }),
        localizedText('homeBreadcrumb', { required: true }),
        localizedText('worksBreadcrumb', { required: true }),
        localizedText('experienceStatLabel', { required: true }),
        localizedText('archiveStatLabel', { required: true }),
        localizedText('currentStatLabel', { required: true }),
      ],
    },
    {
      name: 'experienceSection',
      type: 'group',
      fields: [
        localizedText('title', { required: true }),
        localizedText('presentLabel', { required: true }),
        localizedText('responsibilitiesLabel', { required: true }),
        localizedText('noDataLabel', { required: true }),
        localizedText('recordsIndexedLabel', { required: true }),
        localizedText('startLabel', { required: true }),
        localizedText('statusLabel', { required: true }),
      ],
    },
    {
      name: 'allProjectsSection',
      type: 'group',
      fields: [
        localizedText('title', { required: true }),
        localizedText('subtitle', { required: true }),
        localizedText('noDataLabel', { required: true }),
      ],
    },
    {
      name: 'currentWorkSection',
      type: 'group',
      fields: [
        localizedText('title', { required: true }),
        localizedText('subtitle', { required: true }),
        localizedText('progressLabel', { required: true }),
        localizedText('lastUpdatedLabel', { required: true }),
        localizedText('expectedCompletionLabel', { required: true }),
        localizedText('noDataLabel', { required: true }),
        localizedText('activeRecordsLabel', { required: true }),
        {
          name: 'statusLabels',
          type: 'group',
          fields: [
            localizedText('inProgress', { required: true }),
            localizedText('planning', { required: true }),
            localizedText('onHold', { required: true }),
          ],
        },
      ],
    },
  ],
};

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
  },
  collections: [Users, Media, Projects, Skills, WorkExperiences],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || 'postgres://payload:payload@localhost:5433/caesar_payload',
    },
  }),
  globals: [SiteSettings, HomePage, WorksPage],
  localization: {
    defaultLocale: 'en',
    fallback: true,
    locales: [
      { code: 'en', label: 'English' },
      { code: 'id', label: 'Indonesian' },
    ],
  },
  secret: process.env.PAYLOAD_SECRET || 'development-payload-secret-change-before-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});

import path from 'path';
import { access } from 'fs/promises';
import { getPayload } from 'payload';

import config from '@payload-config';

type Locale = 'en' | 'id';

const locales: Locale[] = ['en', 'id'];

const siteSettings = {
  en: {
    brandName: 'M. Caesar Rifqi',
    languageLabels: { english: 'EN', indonesian: 'ID' },
    languageToggleTitles: {
      toEnglish: 'Switch to English',
      toIndonesian: 'Switch to Indonesian',
    },
    navItems: [
      { sectionId: 'hero', label: 'hero' },
      { sectionId: 'about', label: 'about' },
      { sectionId: 'projects', label: 'projects' },
      { sectionId: 'skills', label: 'skills' },
      { sectionId: 'contact', label: 'contact' },
    ],
    homeLabel: 'HOME',
    backToPortfolioLabel: 'BACK TO PORTFOLIO',
    socials: [
      { platform: 'Github', url: 'https://github.com/itzcaesar', icon: 'github' },
      { platform: 'Instagram', url: 'https://www.instagram.com/caesarfqi/', icon: 'instagram' },
    ],
    uiLabels: {
      projectDetails: 'PROJECT DETAILS',
      clickToExpand: 'CLICK TO EXPAND',
      repository: 'Repository',
      demo: 'Demo',
      repoShort: 'REPO',
      imageNotFound: 'IMAGE NOT FOUND',
      close: 'Close',
    },
  },
  id: {
    brandName: 'M. Caesar Rifqi',
    languageLabels: { english: 'EN', indonesian: 'ID' },
    languageToggleTitles: {
      toEnglish: 'Ganti ke Bahasa Inggris',
      toIndonesian: 'Ganti ke Bahasa Indonesia',
    },
    navItems: [
      { sectionId: 'hero', label: 'beranda' },
      { sectionId: 'about', label: 'tentang' },
      { sectionId: 'projects', label: 'proyek' },
      { sectionId: 'skills', label: 'keahlian' },
      { sectionId: 'contact', label: 'kontak' },
    ],
    homeLabel: 'BERANDA',
    backToPortfolioLabel: 'KEMBALI KE PORTOFOLIO',
    socials: [
      { platform: 'Github', url: 'https://github.com/itzcaesar', icon: 'github' },
      { platform: 'Instagram', url: 'https://www.instagram.com/caesarfqi/', icon: 'instagram' },
    ],
    uiLabels: {
      projectDetails: 'DETAIL PROYEK',
      clickToExpand: 'KLIK UNTUK MEMPERBESAR',
      repository: 'Repositori',
      demo: 'Demo',
      repoShort: 'REPO',
      imageNotFound: 'GAMBAR TIDAK DITEMUKAN',
      close: 'Tutup',
    },
  },
};

const homePage = {
  en: {
    metadata: {
      title: 'Muhammad Caesar Rifqi | Software Engineer & Game Developer',
      description: 'Portfolio of Muhammad Caesar Rifqi - Software Engineer and Game Developer creating robust digital systems and immersive interactive worlds. Specializing in Full Stack Development and Unity game development.',
    },
    hero: {
      bootSequence: '// SYSTEM_BOOT_SEQUENCE',
      firstLineName: 'Muhammad Caesar',
      secondLineName: 'Rifqi',
      roleLabel: 'ROLE',
      primaryRole: 'Software Engineer',
      secondaryRole: 'Game Developer',
      conjunction: 'AND',
      description: 'Creating robust digital systems and immersive interactive worlds.',
      projectsButton: '(A) Projects',
      contactButton: '(B) Contact',
    },
    about: {
      label: '(01) About',
      details: 'DETAILS_OF_OPERATOR.LOG',
      headingBeforeFirstHighlight: 'I operate at the intersection of ',
      headingFirstHighlight: 'logic',
      headingBetweenHighlights: ' and ',
      headingSecondHighlight: 'immersion',
      headingAfterSecondHighlight: '.',
      profileMetrics: [
        { label: 'ID_REF', value: 'MCR_DEV_01', accent: false },
        { label: 'SECTOR', value: 'INDONESIA', accent: false },
        { label: 'ROLE', value: 'HYBRID_ENG', accent: false },
        { label: 'STATUS', value: 'ONLINE', accent: true },
      ],
      contentBlocks: [
        {
          title: '[01] The Background',
          body: 'I am Muhammad Caesar Rifqi, a developer based in Indonesia. My journey began with a curiosity for how games function under the hood, leading me to explore the depths of Computer Science.',
          highlightTerms: [{ term: 'Muhammad Caesar Rifqi' }],
        },
        {
          title: '[02] The Education',
          body: 'Currently taking a major in Digital Creative Multimedia at Telkom University. I am refining my skills in both creative design and technical implementation.',
          highlightTerms: [{ term: 'Digital Creative Multimedia' }, { term: 'Telkom University' }],
        },
        {
          title: '[03] The Focus',
          body: 'My expertise splits into two core domains: Full Stack Development (building scalable web architectures) and Game Development (crafting interactive experiences using Unity and C#).',
          highlightTerms: [{ term: 'Full Stack Development' }, { term: 'Game Development' }],
        },
      ],
    },
    projectsSection: {
      subtitle: '(02) INDEX',
      title: 'Selected Works',
      archiveLabel: 'ARCHIVE OF DEVELOPMENT',
      periodLabel: '2023 - PRESENT',
      viewAllWorksLabel: 'VIEW ALL WORKS',
    },
    skillsSection: {
      subtitle: '(03) Capabilities',
      title: 'Capabilities',
      systemLabel: 'SYSTEM_DIAGNOSTICS.EXE',
      totalLabel: 'Total',
      activeLabel: 'Active',
    },
    contact: {
      subtitle: '(04) INITIATE_CONNECTION',
      heading: 'READY TO COLLABORATE ON THE NEXT BIG THING?',
      sendEmailLabel: 'SEND_EMAIL',
      sendMailCursorLabel: 'SEND_MAIL',
      connectLabel: 'Connect',
      email: 'muhammadcaesarrifqi@gmail.com',
      footer: 'M. Caesar Rifqi © 2025',
    },
  },
  id: {
    metadata: {
      title: 'Muhammad Caesar Rifqi | Rekayasa Perangkat Lunak & Pengembang Game',
      description: 'Portofolio Muhammad Caesar Rifqi - Rekayasa Perangkat Lunak dan Pengembang Game yang menciptakan sistem digital yang kuat dan dunia interaktif yang imersif. Spesialisasi dalam Full Stack Development dan pengembangan game Unity.',
    },
    hero: {
      bootSequence: '// URUTAN_BOOT_SISTEM',
      firstLineName: 'Muhammad Caesar',
      secondLineName: 'Rifqi',
      roleLabel: 'PERAN',
      primaryRole: 'Rekayasa Perangkat Lunak',
      secondaryRole: 'Pengembang Game',
      conjunction: 'DAN',
      description: 'Menciptakan sistem digital yang kuat dan dunia interaktif yang imersif.',
      projectsButton: '(A) Proyek',
      contactButton: '(B) Kontak',
    },
    about: {
      label: '(01) Tentang',
      details: 'DETAIL_OPERATOR.LOG',
      headingBeforeFirstHighlight: 'Saya beroperasi di persimpangan ',
      headingFirstHighlight: 'logika',
      headingBetweenHighlights: ' dan ',
      headingSecondHighlight: 'imersi',
      headingAfterSecondHighlight: '.',
      profileMetrics: [
        { label: 'ID_REF', value: 'MCR_DEV_01', accent: false },
        { label: 'SEKTOR', value: 'INDONESIA', accent: false },
        { label: 'PERAN', value: 'HYBRID_ENG', accent: false },
        { label: 'STATUS', value: 'ONLINE', accent: true },
      ],
      contentBlocks: [
        {
          title: '[01] Latar Belakang',
          body: 'Saya adalah Muhammad Caesar Rifqi, seorang developer yang berbasis di Indonesia. Perjalanan saya dimulai dengan rasa ingin tahu tentang bagaimana game berfungsi di balik layar, yang membawa saya untuk mengeksplorasi kedalaman Ilmu Komputer.',
          highlightTerms: [{ term: 'Muhammad Caesar Rifqi' }],
        },
        {
          title: '[02] Pendidikan',
          body: 'Saat ini mengambil jurusan Digital Creative Multimedia di Universitas Telkom. Saya terus mengasah keterampilan saya dalam desain kreatif dan implementasi teknis.',
          highlightTerms: [{ term: 'Digital Creative Multimedia' }, { term: 'Universitas Telkom' }],
        },
        {
          title: '[03] Fokus',
          body: 'Keahlian saya terbagi dalam dua domain inti: Full Stack Development (membangun arsitektur web yang scalable) dan Game Development (menciptakan pengalaman interaktif menggunakan Unity dan C#).',
          highlightTerms: [{ term: 'Full Stack Development' }, { term: 'Game Development' }],
        },
      ],
    },
    projectsSection: {
      subtitle: '(02) INDEKS',
      title: 'Karya Pilihan',
      archiveLabel: 'ARSIP PENGEMBANGAN',
      periodLabel: '2023 - SEKARANG',
      viewAllWorksLabel: 'LIHAT SEMUA KARYA',
    },
    skillsSection: {
      subtitle: '(03) Kemampuan',
      title: 'Kemampuan',
      systemLabel: 'DIAGNOSTIK_SISTEM.EXE',
      totalLabel: 'Total',
      activeLabel: 'Aktif',
    },
    contact: {
      subtitle: '(04) MULAI_KONEKSI',
      heading: 'SIAP BERKOLABORASI PADA HAL BESAR SELANJUTNYA?',
      sendEmailLabel: 'KIRIM_EMAIL',
      sendMailCursorLabel: 'KIRIM_EMAIL',
      connectLabel: 'Terhubung',
      email: 'muhammadcaesarrifqi@gmail.com',
      footer: 'M. Caesar Rifqi © 2025',
    },
  },
};

const worksPage = {
  en: {
    metadata: {
      title: 'Selected Works - Muhammad Caesar Rifqi',
      description: 'Comprehensive showcase of professional experience, projects, and ongoing work by Muhammad Caesar Rifqi. Explore work experiences, completed projects, and current developments.',
    },
    hero: {
      title: 'SELECTED WORKS',
      subtitle: 'A comprehensive showcase of professional experience, projects, and ongoing work',
      homeBreadcrumb: 'HOME',
      worksBreadcrumb: 'SELECTED WORKS',
      experienceStatLabel: 'Experience',
      archiveStatLabel: 'Archive',
      currentStatLabel: 'Current',
    },
    experienceSection: {
      title: 'WORK EXPERIENCE',
      presentLabel: 'PRESENT',
      responsibilitiesLabel: 'KEY RESPONSIBILITIES',
      noDataLabel: 'No work experience to display',
      recordsIndexedLabel: 'records indexed',
      startLabel: 'Start',
      statusLabel: 'Status',
    },
    allProjectsSection: {
      title: 'ALL PROJECTS',
      subtitle: 'Complete portfolio of completed projects',
      noDataLabel: 'NO PROJECTS TO DISPLAY',
    },
    currentWorkSection: {
      title: 'CURRENT PROJECTS',
      subtitle: 'Projects in progress and upcoming work',
      progressLabel: 'PROGRESS',
      lastUpdatedLabel: 'LAST UPDATED',
      expectedCompletionLabel: 'EXPECTED COMPLETION',
      noDataLabel: 'NO CURRENT PROJECTS',
      activeRecordsLabel: 'active records',
      statusLabels: {
        inProgress: 'IN PROGRESS',
        planning: 'PLANNING',
        onHold: 'ON HOLD',
      },
    },
  },
  id: {
    metadata: {
      title: 'Karya Terpilih - Muhammad Caesar Rifqi',
      description: 'Tampilan komprehensif pengalaman profesional, proyek, dan pekerjaan yang sedang berlangsung oleh Muhammad Caesar Rifqi. Jelajahi pengalaman kerja, proyek yang telah diselesaikan, dan pengembangan saat ini.',
    },
    hero: {
      title: 'KARYA TERPILIH',
      subtitle: 'Tampilan komprehensif pengalaman profesional, proyek, dan pekerjaan yang sedang berlangsung',
      homeBreadcrumb: 'BERANDA',
      worksBreadcrumb: 'KARYA TERPILIH',
      experienceStatLabel: 'Pengalaman',
      archiveStatLabel: 'Arsip',
      currentStatLabel: 'Saat Ini',
    },
    experienceSection: {
      title: 'PENGALAMAN KERJA',
      presentLabel: 'SEKARANG',
      responsibilitiesLabel: 'TANGGUNG JAWAB UTAMA',
      noDataLabel: 'Tidak ada pengalaman kerja untuk ditampilkan',
      recordsIndexedLabel: 'rekaman terindeks',
      startLabel: 'Mulai',
      statusLabel: 'Status',
    },
    allProjectsSection: {
      title: 'SEMUA PROYEK',
      subtitle: 'Portofolio lengkap proyek yang telah diselesaikan',
      noDataLabel: 'TIDAK ADA PROYEK UNTUK DITAMPILKAN',
    },
    currentWorkSection: {
      title: 'PEKERJAAN SAAT INI',
      subtitle: 'Proyek yang sedang berlangsung dan pekerjaan mendatang',
      progressLabel: 'PROGRES',
      lastUpdatedLabel: 'TERAKHIR DIPERBARUI',
      expectedCompletionLabel: 'PERKIRAAN SELESAI',
      noDataLabel: 'TIDAK ADA PROYEK SAAT INI',
      activeRecordsLabel: 'rekaman aktif',
      statusLabels: {
        inProgress: 'SEDANG BERLANGSUNG',
        planning: 'PERENCANAAN',
        onHold: 'DITUNDA',
      },
    },
  },
};

const projects = [
  {
    projectId: '001',
    placement: 'archive',
    order: 1,
    en: {
      title: 'AL-Store Landing Page',
      description: 'A landing page tailored for a hosting company with PayloadCMS and WeMX Integration and data sync such as discount, coupons and announcement.',
      tags: [{ tag: 'React' }, { tag: 'TypeScript' }, { tag: 'PostgreSQL' }, { tag: 'NextJS' }, { tag: 'PayloadCMS' }],
      imageUrl: '/media/projects/alstore/alstore-hosting.png',
      gallery: [
        { url: '/media/projects/alstore/alstore-hosting.png', alt: 'AL-Store hosting landing page' },
        { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80', alt: 'Analytics dashboard workspace' },
        { url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop&q=80', alt: 'Application interface' },
      ],
      repo: 'https://alstoredev.my.id',
    },
    id: {
      title: 'AL-Store Landing Page',
      description: 'Landing page untuk perusahaan hosting dengan integrasi PayloadCMS dan WeMX serta sinkronisasi data seperti diskon, kupon, dan pengumuman.',
      tags: [{ tag: 'React' }, { tag: 'TypeScript' }, { tag: 'PostgreSQL' }, { tag: 'NextJS' }, { tag: 'PayloadCMS' }],
      imageUrl: '/media/projects/alstore/alstore-hosting.png',
      gallery: [
        { url: '/media/projects/alstore/alstore-hosting.png', alt: 'Landing page hosting AL-Store' },
        { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80', alt: 'Ruang kerja dasbor analitik' },
        { url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop&q=80', alt: 'Antarmuka aplikasi' },
      ],
      repo: 'https://alstoredev.my.id',
    },
  },
  {
    projectId: '002',
    placement: 'archive',
    order: 2,
    en: {
      title: 'METALABS-REWORK',
      description: 'A rework of METALABS website, focusing on UI/UX and modernized frameworks.',
      tags: [{ tag: 'TypeScript' }, { tag: 'UI/UX' }, { tag: 'Web' }],
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop&q=80',
      repo: 'https://github.com/itzcaesar/metalabs-rework',
    },
    id: {
      title: 'METALABS-REWORK',
      description: 'Rework website METALABS dengan fokus pada UI/UX dan framework modern.',
      tags: [{ tag: 'TypeScript' }, { tag: 'UI/UX' }, { tag: 'Web' }],
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop&q=80',
      repo: 'https://github.com/itzcaesar/metalabs-rework',
    },
  },
  {
    projectId: '003',
    placement: 'archive',
    order: 3,
    en: {
      title: 'AMANGAKNIH.ID',
      description: 'A real-time website security analysis and phishing detection tool for Indonesia. Built with Laravel 12, React, and Inertia.js.',
      tags: [{ tag: 'TypeScript' }, { tag: 'Education' }, { tag: 'Network' }],
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&q=80',
      repo: 'https://github.com/itzcaesar/aman-gak-nih',
    },
    id: {
      title: 'AMANGAKNIH.ID',
      description: 'Alat analisis keamanan website dan deteksi phishing real-time untuk Indonesia. Dibangun dengan Laravel 12, React, dan Inertia.js.',
      tags: [{ tag: 'TypeScript' }, { tag: 'Edukasi' }, { tag: 'Jaringan' }],
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&q=80',
      repo: 'https://github.com/itzcaesar/aman-gak-nih',
    },
  },
];

const skills = [
  ['BLENDER', 'Game Development', 'Pengembangan Game', 85],
  ['UNITY', 'Game Development', 'Pengembangan Game', 90],
  ['UNREAL_ENGINE_5', 'Game Development', 'Pengembangan Game', 85],
  ['C++_&_C#', 'Game Development', 'Pengembangan Game', 88],
  ['JAVASCRIPT', 'Full Stack Dev', 'Pengembangan Full Stack', 95],
  ['TYPESCRIPT', 'Full Stack Dev', 'Pengembangan Full Stack', 92],
  ['HTML', 'Full Stack Dev', 'Pengembangan Full Stack', 95],
  ['CSS', 'Full Stack Dev', 'Pengembangan Full Stack', 93],
  ['PHP', 'Full Stack Dev', 'Pengembangan Full Stack', 82],
  ['NODE.JS', 'Full Stack Dev', 'Pengembangan Full Stack', 88],
  ['GIT', 'Full Stack Dev', 'Pengembangan Full Stack', 88],
  ['PYTHON', 'Full Stack Dev', 'Pengembangan Full Stack', 85],
  ['NEXT.JS', 'Full Stack Dev', 'Pengembangan Full Stack', 90],
  ['LARAVEL', 'Full Stack Dev', 'Pengembangan Full Stack', 86],
  ['REACT', 'Full Stack Dev', 'Pengembangan Full Stack', 92],
  ['BOOTSTRAP', 'Full Stack Dev', 'Pengembangan Full Stack', 84],
  ['EXPRESS', 'Full Stack Dev', 'Pengembangan Full Stack', 86],
  ['TAILWIND CSS', 'Full Stack Dev', 'Pengembangan Full Stack', 93],
  ['GITHUB', 'Full Stack Dev', 'Pengembangan Full Stack', 88],
] as const;

const workExperiences = [
  {
    experienceId: 'work-001',
    order: 1,
    isCurrent: true,
    companyUrl: 'https://alstore.space',
    companyLogoUrl: 'https://alstore.space/penyimpanan/logo.png',
    en: {
      company: 'AL-Store Hosting',
      role: 'Full Stack Developer',
      duration: { start: 'Jan 2026', end: 'Present' },
      description: 'Building scalable landing page with CMS system and maintaining WeMX & Pterodactyl panel functionality.',
      responsibilities: [
        { item: 'Architected and implemented microservices architecture using Node.js and React' },
        { item: 'Building CMS System and implementing WeMX sync integration system through custom endpoints' },
        { item: 'Reduced application load time by 40% through optimization techniques' },
      ],
      technologies: [{ item: 'React' }, { item: 'TypeScript' }, { item: 'Node.js' }, { item: 'PostgreSQL' }, { item: 'NextJS' }, { item: 'PayloadCMS' }],
    },
    id: {
      company: 'AL-Store Hosting',
      role: 'Full Stack Developer',
      duration: { start: 'Jan 2026', end: 'Sekarang' },
      description: 'Membangun landing page yang scalable dengan sistem CMS serta menjaga fungsionalitas panel WeMX dan Pterodactyl.',
      responsibilities: [
        { item: 'Merancang dan mengimplementasikan arsitektur microservices menggunakan Node.js dan React' },
        { item: 'Membangun sistem CMS dan integrasi sinkronisasi WeMX melalui endpoint khusus' },
        { item: 'Mengurangi waktu muat aplikasi sebesar 40% melalui teknik optimisasi' },
      ],
      technologies: [{ item: 'React' }, { item: 'TypeScript' }, { item: 'Node.js' }, { item: 'PostgreSQL' }, { item: 'NextJS' }, { item: 'PayloadCMS' }],
    },
  },
];

async function clearCollection(payload: Awaited<ReturnType<typeof getPayload>>, collection: string) {
  const cms = payload as any;
  const result = await cms.find({
    collection: collection as never,
    limit: 1000,
    overrideAccess: true,
    pagination: false,
  });

  for (const doc of (result as { docs: { id: string | number }[] }).docs) {
    await cms.delete({
      collection: collection as never,
      id: doc.id,
      overrideAccess: true,
    });
  }
}

async function localizeGlobal(payload: Awaited<ReturnType<typeof getPayload>>, slug: string, data: Record<Locale, object>) {
  const cms = payload as any;
  for (const locale of locales) {
    await cms.updateGlobal({
      slug: slug as never,
      data: data[locale],
      locale,
      overrideAccess: true,
    });
  }
}

async function localizeDocument(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: string,
  baseData: object,
  data: Record<Locale, object>,
) {
  const cms = payload as any;
  const created = await cms.create({
    collection: collection as never,
    data: { ...baseData, ...data.en },
    locale: 'en',
    overrideAccess: true,
  });

  await cms.update({
    collection: collection as never,
    id: (created as { id: string | number }).id,
    data: data.id,
    locale: 'id',
    overrideAccess: true,
  });

  return created;
}

async function seedMedia(payload: Awaited<ReturnType<typeof getPayload>>) {
  const cms = payload as any;
  const screenshotPath = path.resolve(process.cwd(), 'public/media/projects/alstore/alstore-hosting.png');

  try {
    await access(screenshotPath);
  } catch {
    return null;
  }

  const created = await cms.create({
    collection: 'media',
    data: { alt: 'AL-Store hosting landing page' },
    filePath: screenshotPath,
    locale: 'en',
    overrideAccess: true,
  });

  await cms.update({
    collection: 'media',
    id: (created as { id: string | number }).id,
    data: { alt: 'Landing page hosting AL-Store' },
    locale: 'id',
    overrideAccess: true,
  });

  return created as { id: string | number };
}

async function seed() {
  const payload = await getPayload({ config });
  payload.logger.info('Seeding Payload CMS portfolio content...');

  await clearCollection(payload, 'work-experiences');
  await clearCollection(payload, 'projects');
  await clearCollection(payload, 'skills');
  await clearCollection(payload, 'media');

  const alstoreImage = await seedMedia(payload);

  await localizeGlobal(payload, 'site-settings', siteSettings);
  await localizeGlobal(payload, 'home-page', homePage);
  await localizeGlobal(payload, 'works-page', worksPage);

  for (const project of projects) {
    const baseData = {
      projectId: project.projectId,
      placement: project.placement,
      order: project.order,
      featuredImage: project.projectId === '001' ? alstoreImage?.id : undefined,
    };

    await localizeDocument(payload, 'projects', baseData, {
      en: project.en,
      id: project.id,
    });
  }

  for (const [name, enCategory, idCategory, level] of skills) {
    await localizeDocument(
      payload,
      'skills',
      { level, order: skills.findIndex((skill) => skill[0] === name) + 1 },
      {
        en: { name, category: enCategory },
        id: { name, category: idCategory },
      },
    );
  }

  for (const experience of workExperiences) {
    await localizeDocument(
      payload,
      'work-experiences',
      {
        companyLogoUrl: experience.companyLogoUrl,
        companyUrl: experience.companyUrl,
        experienceId: experience.experienceId,
        isCurrent: experience.isCurrent,
        order: experience.order,
      },
      {
        en: experience.en,
        id: experience.id,
      },
    );
  }

  payload.logger.info('Seed complete.');
  await payload.destroy();
}

await seed();

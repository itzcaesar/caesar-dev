import type { Metadata } from 'next';

import { getWorksPageData, getWorksPageMetadata } from '@/lib/portfolio-data';
import WorksPage from '@/views/WorksPage';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getWorksPageMetadata('en');

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      description: metadata.description,
      title: metadata.title,
      type: 'website',
      url: '/works',
    },
    twitter: {
      card: 'summary_large_image',
      description: metadata.description,
      title: metadata.title,
    },
  };
}

export default async function Works() {
  const data = await getWorksPageData();

  return <WorksPage data={data} />;
}

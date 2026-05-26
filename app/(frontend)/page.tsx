import type { Metadata } from 'next';

import { getHomePageData, getHomePageMetadata } from '@/lib/portfolio-data';
import MainPage from '@/views/MainPage';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getHomePageMetadata('en');

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      description: metadata.description,
      title: metadata.title,
      type: 'website',
      url: '/',
    },
    twitter: {
      card: 'summary_large_image',
      description: metadata.description,
      title: metadata.title,
    },
  };
}

export default async function Page() {
  const data = await getHomePageData();

  return <MainPage data={data} />;
}

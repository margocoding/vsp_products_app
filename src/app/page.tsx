import HomeClient from './HomeClient';
import { Category, Product } from '@/types/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

async function getInitialProducts(domain: string) {
  try {
    const res = await fetch(`${API_URL}/products/by-domain?page=1&limit=10`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain }),
      cache: 'no-store',
    });
    if (!res.ok) return { data: [] as Product[], total: 0 };
    return res.json();
  } catch (e) {
    console.error('[ssr] products fetch error:', e);
    return { data: [] as Product[], total: 0 };
  }
}

async function getCategories(domain: string): Promise<Category[]> {
  try {
    const res = await fetch(
      `${API_URL}/categories/by-domain?domain=${encodeURIComponent(domain)}`,
      { cache: 'no-store' },
    );

    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error('[ssr] categories fetch error:', e);
    return [];
  }
}

export default async function Home() {
  const domain = process.env.SITE_DOMAIN ?? 'localhost';

  const [initial, categories] = await Promise.all([
    getInitialProducts(domain),
    getCategories(domain),
  ]);


  return (
    <HomeClient
      domain={domain}
      initialProducts={initial.items ?? []}
      total={initial.total ?? 0}
      initialPage={1}
      limit={10}
      categories={categories}
    />
  );
}
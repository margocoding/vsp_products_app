import 'server-only';

import { cache } from 'react';
import { headers } from 'next/headers';
import type { Category, Product } from '@/types/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCatalogContext = cache(async () => {
  const headersList = await headers();
  const domain = (headersList.get('host') ?? 'localhost').split(':')[0];
  let categories: Category[] = [];

  if (API_URL) {
    try {
      const response = await fetch(
        `${API_URL}/categories/by-domain?domain=${encodeURIComponent(domain)}`,
        { cache: 'no-store', signal: AbortSignal.timeout(10000) },
      );
      if (response.ok) categories = await response.json();
    } catch (error) {
      console.error('[categories] fetch failed:', error);
    }
  }

  return { domain, categories };
});

export async function getInitialProducts(
  domain: string,
  categoryId: string | null,
  search: string,
): Promise<{ items: Product[]; total: number }> {
  if (!API_URL) return { items: [], total: 0 };

  const params = new URLSearchParams({ page: '1', limit: '10' });
  if (categoryId) params.set('categoryId', categoryId);
  if (search) params.set('search', search);

  try {
    const response = await fetch(`${API_URL}/products/by-domain?${params}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
    if (response.ok) {
      const data = await response.json();
      return { items: data.items ?? [], total: data.total ?? 0 };
    }
  } catch (error) {
    console.error('[products] fetch failed:', error);
  }

  return { items: [], total: 0 };
}

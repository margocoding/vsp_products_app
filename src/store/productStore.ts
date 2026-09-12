'use client';

import { create } from 'zustand';
import { Product } from '@/types/types';

interface CatalogState {
  domain: string;
  activeCategoryId: string | null;
  search: string;
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

interface ProductStore extends CatalogState {
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
  revision: number;
  initCatalog: (catalog: CatalogState) => void;
  fetchNextPage: () => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  total: 0,
  page: 1,
  limit: 10,
  hasMore: false,
  isLoading: false,
  error: null,
  domain: '',
  search: '',
  activeCategoryId: null,
  revision: 0,

  initCatalog: (catalog) => set((state) => ({
    ...catalog,
    hasMore: catalog.products.length < catalog.total,
    isLoading: false,
    error: null,
    revision: state.revision + 1,
  })),

  fetchNextPage: async () => {
    const { domain, page, limit, isLoading, hasMore, search, activeCategoryId, revision } = get();
    if (!API_URL || !domain || isLoading || !hasMore) return;

    set({ isLoading: true, error: null });
    try {
      const params = new URLSearchParams({ page: String(page + 1), limit: String(limit) });
      if (search) params.set('search', search);
      if (activeCategoryId) params.set('categoryId', activeCategoryId);

      const res = await fetch(`${API_URL}/products/by-domain?${params}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain }),
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (get().revision !== revision) return;

      const newProducts: Product[] = data.items ?? [];
      set((state) => ({
        products: [...state.products, ...newProducts],
        total: data.total ?? state.total,
        page: page + 1,
        hasMore: newProducts.length > 0 && state.products.length + newProducts.length < (data.total ?? 0),
      }));
    } catch (error) {
      if (get().revision === revision) {
        console.error('[products] fetch failed:', error);
        set({ error: 'Не удалось загрузить товары' });
      }
    } finally {
      if (get().revision === revision) set({ isLoading: false });
    }
  },
}));

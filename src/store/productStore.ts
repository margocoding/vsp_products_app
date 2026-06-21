'use client';

import { create } from 'zustand';
import { Product } from '@/types/types';

interface ProductStore {
  products: Product[];
  page: number;
  limit: number;
  hasMore: boolean;
  isLoading: boolean;
  domain: string | null;
  search: string;
  activeCategoryId: string | null; // <--

  setDomain: (domain: string) => void;
  setActiveCategory: (id: string | null) => void; // <--
  initProducts: (products: Product[], total: number, page: number, limit: number) => void;
  setSearch: (search: string) => void;
  resetProducts: () => void;
  fetchNextPage: () => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  page: 1,
  limit: 10,
  hasMore: true,
  isLoading: false,
  domain: null,
  search: '',
  activeCategoryId: null,

  setDomain: (domain) => set({ domain }),

  setActiveCategory: (id) => set({ activeCategoryId: id }),

  initProducts: (products, total, page, limit) => {
    set({
      products,
      page,
      limit,
      hasMore: products.length < total,
      isLoading: false,
    });
  },

  setSearch: (search) => set({ search }),

  resetProducts: () =>
    set({
      products: [],
      page: 0,
      hasMore: true,
    }),

  fetchNextPage: async () => {
    const { domain, page, limit, isLoading, hasMore, search, activeCategoryId } = get();
    if (!domain || isLoading || !hasMore) return;

    set({ isLoading: true });
    try {
      const params = new URLSearchParams({
        page: String(page + 1),
        limit: String(limit),
      });
      if (search.trim()) params.set('search', search.trim());
      if (activeCategoryId) params.set('categoryId', activeCategoryId); // <--

      const res = await fetch(`${API_URL}/products/by-domain?${params.toString()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const newProducts: Product[] = data.items ?? [];

      set((state) => ({
        products: [...state.products, ...newProducts],
        page: state.page + 1,
        hasMore: state.products.length + newProducts.length < (data.total ?? 0),
      }));
    } catch (e) {
      console.error('[products] fetch failed:', e);
    } finally {
      set({ isLoading: false });
    }
  },
}));
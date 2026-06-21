import { create } from 'zustand';
import type { Category } from '@/types/types';

interface CategoryStore {
  tree: Category[];
  flat: Category[];
  setCategories: (tree: Category[]) => void;
  getRootCategories: () => Category[];
  getChildCategories: (parentId: string) => Category[];
  getActiveCategory: () => Category | null;
  activeCategoryId: string | null;
  setActiveCategory: (id: string | null) => void;
  expandedCategoryIds: string[];
  toggleExpanded: (id: string) => void;
}

const flatten = (nodes: Category[]): Category[] => {
  const result: Category[] = [];
  for (const node of nodes) {
    result.push(node);
    if (node.children?.length) {
      result.push(...flatten(node.children));
    }
  }
  return result;
};

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  tree: [],
  flat: [],

  setCategories: (tree) => {
    set({ tree, flat: flatten(tree) });
  },

  getRootCategories: () => get().tree,

  getChildCategories: (parentId) => {
    const category = get().flat.find((c) => c.id === parentId);
    return category?.children || [];
  },

  getActiveCategory: () => {
    const { flat, activeCategoryId } = get();
    if (!activeCategoryId) return null;
    return flat.find((cat) => cat.id === activeCategoryId) || null;
  },

  activeCategoryId: null,
  setActiveCategory: (id) => set({ activeCategoryId: id }),

  expandedCategoryIds: [],
  toggleExpanded: (id) =>
    set((state) => ({
      expandedCategoryIds: state.expandedCategoryIds.includes(id)
        ? state.expandedCategoryIds.filter((catId) => catId !== id)
        : [...state.expandedCategoryIds, id],
    })),
}));
import { create } from 'zustand';

export interface Category {
  id: number;
  name: string;
  parentId?: number;
}

interface CategoryStore {
  categories: Category[];
  activeCategoryId: number | null;
  expandedCategoryIds: number[];
  setActiveCategory: (id: number) => void;
  toggleExpanded: (id: number) => void;
  getRootCategories: () => Category[];
  getChildCategories: (parentId: number) => Category[];
  getActiveCategory: () => Category | undefined;
  getAllCategoryIds: (categoryId: number) => number[];
}

const mockCategories: Category[] = [
  { id: 20, name: 'Материалы ВСП - Распродажа!' },
  { id: 41, name: 'Стрелочные переводы - комплектующие' },
  { id: 69, name: 'Железнодорожные накладки' },
  { id: 71, name: 'Железнодорожные прокладки' },
  { id: 70, name: 'Железнодорожные подкладки' },
  { id: 42, name: 'Железнодорожная изоляция' },
  { id: 19, name: 'ЖД крепеж' },
  { id: 68, name: 'Клемма ПК', parentId: 19 },
  { id: 64, name: 'Противоугоны', parentId: 19 },
  { id: 58, name: 'ЖД болты', parentId: 19 },
  { id: 60, name: 'ЖД шайбы', parentId: 19 },
  { id: 59, name: 'ЖД гайки', parentId: 19 },
  { id: 61, name: 'ЖД шурупы', parentId: 19 },
  { id: 67, name: 'Костыль путевой', parentId: 19 },
  { id: 28, name: 'Скрепления АРС', parentId: 19 },
  { id: 34, name: 'Скрепления ЖБР', parentId: 19 },
  { id: 53, name: 'Cкрепления КБ', parentId: 19 },
  { id: 24, name: 'Железнодорожные рельсы' },
  { id: 33, name: 'Рамные рельсы', parentId: 24 },
  { id: 29, name: 'Переходные рельсы', parentId: 24 },
  { id: 25, name: 'Рельсы 12,5 метров', parentId: 24 },
  { id: 26, name: 'Рельсы 25 метров', parentId: 24 },
  { id: 30, name: 'Рельсы 6, 8, 11 метров', parentId: 24 },
  { id: 31, name: 'Рельсы Р50', parentId: 24 },
  { id: 27, name: 'Рельсы Р65', parentId: 24 },
  { id: 39, name: 'Рельсы КР', parentId: 24 },
  { id: 36, name: 'Рельсы Р18', parentId: 24 },
  { id: 38, name: 'Трамвайные рельсы', parentId: 24 },
  { id: 37, name: 'Другие марки рельс', parentId: 24 },
  { id: 21, name: 'Железнодорожные шпалы' },
  { id: 22, name: 'Железобетонные шпалы', parentId: 21 },
  { id: 35, name: 'Деревянные шпалы', parentId: 21 },
  { id: 40, name: 'Вагонные запчасти' },
  { id: 63, name: 'Локомотивные колодки', parentId: 40 },
  { id: 56, name: 'Вагонная тележка', parentId: 40 },
  { id: 65, name: 'Рама боковая', parentId: 40 },
  { id: 55, name: 'Балка надрессорная', parentId: 40 },
  { id: 62, name: 'Колесные пары', parentId: 40 },
  { id: 57, name: 'Вагонные оси', parentId: 40 },
  { id: 54, name: 'Автосцепка СА-3', parentId: 40 },
  { id: 32, name: 'Путевой инструмент' },
  { id: 66, name: 'Тормозной башмак', parentId: 32 },
];

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: mockCategories,
  activeCategoryId: 20,
  expandedCategoryIds: [],

  setActiveCategory: (id: number) => set({ activeCategoryId: id }),

  toggleExpanded: (id: number) =>
    set((state) => ({
      expandedCategoryIds: state.expandedCategoryIds.includes(id)
        ? state.expandedCategoryIds.filter((cid) => cid !== id)
        : [...state.expandedCategoryIds, id],
    })),

  getRootCategories: () => get().categories.filter((c) => !c.parentId),

  getChildCategories: (parentId: number) =>
    get().categories.filter((c) => c.parentId === parentId),

  getActiveCategory: () =>
    get().categories.find((c) => c.id === get().activeCategoryId),

  getAllCategoryIds: (categoryId: number): number[] => {
    const children = get().categories.filter((c) => c.parentId === categoryId);
    const childIds = children.flatMap((c) => get().getAllCategoryIds(c.id));
    return [categoryId, ...childIds];
  },
}));
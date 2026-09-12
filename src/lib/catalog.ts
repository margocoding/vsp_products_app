import type { Category } from '@/types/types';

export const catalogHref = (id?: string | null) =>
  id ? `/${encodeURIComponent(id)}` : '/catalog';

export function flattenCategories(categories: Category[]): Category[] {
  return categories.flatMap((category) => [
    category,
    ...flattenCategories(category.children ?? []),
  ]);
}

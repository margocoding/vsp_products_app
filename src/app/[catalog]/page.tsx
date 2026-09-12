import { notFound } from 'next/navigation';
import CatalogClient from './CatalogClient';
import CatalogShell from '@/components/CatalogShell';
import { flattenCategories } from '@/lib/catalog';
import { getCatalogContext, getInitialProducts } from '@/lib/catalog-api';

interface CatalogPageProps {
  params: Promise<{ catalog: string }>;
  searchParams: Promise<{ search?: string | string[] }>;
}

export default async function CatalogPage({ params, searchParams }: CatalogPageProps) {
  const [{ catalog }, query, { domain, categories }] = await Promise.all([
    params,
    searchParams,
    getCatalogContext(),
  ]);
  const category = flattenCategories(categories).find((item) => item.id === catalog);
  if (catalog !== 'catalog' && !category) notFound();

  const categoryId = category?.id ?? null;
  const search = typeof query.search === 'string' ? query.search.trim() : '';
  const initial = await getInitialProducts(domain, categoryId, search);

  return (
    <CatalogShell categories={categories} activeCategoryId={categoryId}>
      <CatalogClient
        key={`${categoryId ?? 'all'}:${search}`}
        domain={domain}
        categoryId={categoryId}
        title={category?.name ?? 'Каталог'}
        initialSearch={search}
        initialProducts={initial.items}
        total={initial.total}
        initialPage={1}
        limit={10}
      />
    </CatalogShell>
  );
}

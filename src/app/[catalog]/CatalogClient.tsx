'use client';

import { useEffect, useRef, useCallback } from 'react';
import ProductCard from '@/components/ProductCard';
import { useProductStore } from '@/store/productStore';
import type { Product } from '@/types/types';

interface CatalogClientProps {
  domain: string;
  categoryId: string | null;
  title: string;
  initialSearch: string;
  initialProducts: Product[];
  total: number;
  initialPage: number;
  limit: number;
}

const productWord = (n: number) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'товар';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'товара';
  return 'товаров';
};

export default function CatalogClient({
  domain, categoryId, title, initialSearch, initialProducts, total, initialPage, limit,
}: CatalogClientProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const store = useProductStore();
  const { initCatalog, fetchNextPage } = store;
  const isCurrentCatalog = store.domain === domain
    && store.activeCategoryId === categoryId && store.search === initialSearch;
  const products = isCurrentCatalog ? store.products : initialProducts;
  const hasMore = isCurrentCatalog ? store.hasMore : initialProducts.length < total;
  const isLoading = isCurrentCatalog && store.isLoading;
  const error = isCurrentCatalog ? store.error : null;
  const totalCount = isCurrentCatalog ? store.total : total;

  useEffect(() => {
    initCatalog({
      domain, activeCategoryId: categoryId, search: initialSearch,
      products: initialProducts, total, page: initialPage, limit,
    });
  }, [domain, categoryId, initialSearch, initialProducts, total, initialPage, limit, initCatalog]);

  useEffect(() => () => observerRef.current?.disconnect(), []);

  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    observerRef.current?.disconnect();
    if (!node || !isCurrentCatalog || !hasMore || isLoading || error) return;
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchNextPage();
    });
    observerRef.current.observe(node);
  }, [isCurrentCatalog, hasMore, isLoading, error, fetchNextPage]);

  const rows = Array.from({ length: Math.ceil(products.length / 2) }, (_, index) => ({
    first: products[index * 2], second: products[index * 2 + 1], isEven: index % 2 === 0,
  }));

  return (
    <>
      <div className="mb-8">
        <span className="text-red-500 text-sm">01 —</span>
        <h1 className="text-2xl sm:text-3xl font-light tracking-wider mt-1 uppercase">{title}</h1>
        <p className="text-xs text-white/40 tracking-wider mt-1">
          {products.length} {productWord(products.length)}{hasMore ? ` (загружено из ${totalCount})` : ''}
        </p>
      </div>
      {products.length === 0 && !isLoading ? (
        <div className="glass-card p-8 sm:p-16 text-center">
          <p className="text-white/40 tracking-widest text-sm">ТОВАРЫ НЕ НАЙДЕНЫ</p>
          <p className="text-white/25 text-xs mt-2">
            {initialSearch ? 'Попробуйте изменить поисковый запрос' : 'В данной категории пока нет товаров'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {rows.map((row, index) => (
            <div key={row.first.id} className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start"
              ref={index === rows.length - 1 ? lastElementRef : null}>
              <div className={`col-span-1 ${row.isEven ? 'xl:col-span-2' : 'xl:col-span-1'} h-full`}>
                <ProductCard product={row.first} featured={false} />
              </div>
              {row.second && (
                <div className={`col-span-1 ${row.isEven ? 'xl:col-span-1' : 'xl:col-span-2'} h-full`}>
                  <ProductCard product={row.second} featured={false} />
                </div>
              )}
            </div>
          ))}
          {isLoading && <div className="flex justify-center py-8" role="status" aria-label="Загрузка товаров">
            <div className="w-8 h-8 border-2 border-white/20 border-t-red-500 rounded-full animate-spin" />
          </div>}
          {error && <div className="text-center py-8">
            <p>{error}</p><button className="btn-neon mt-3" onClick={fetchNextPage}>Повторить</button>
          </div>}
          {!hasMore && products.length > 0 && <p className="text-center py-8 text-white/30 text-xs tracking-widest">— КОНЕЦ СПИСКА —</p>}
        </div>
      )}
    </>
  );
}

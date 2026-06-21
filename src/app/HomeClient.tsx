'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/Product';
import Sidebar from '@/components/Sidebar';
import CartDrawer from '@/components/Cart';
import { Search } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useCartStore } from '@/store/cartStore';
import { useCategoryStore } from '@/store/categoryStore';
import { useProductStore } from '@/store/productStore';
import { Product, Category } from '@/types/types';

interface HomeClientProps {
  domain: string;
  initialProducts: Product[];
  total: number;
  initialPage: number;
  limit: number;
  categories: Category[];
}

export default function HomeClient({
  domain,
  initialProducts,
  total,
  initialPage,
  limit,
  categories,
}: HomeClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const observerRef = useRef<IntersectionObserver | null>(null);
  const isInitialMount = useRef(true);
  const isFirstCategoryChange = useRef(true);

  const totalItems = useCartStore((state) => state.totalItems());
  const activeCategoryId = useCategoryStore((state) => state.activeCategoryId);

  const activeCategory = useCategoryStore((state) =>
    state.activeCategoryId
      ? state.flat.find((c) => c.id === state.activeCategoryId) ?? null
      : null
  );
  const setCategories = useCategoryStore((s) => s.setCategories);

  const products = useProductStore((s) => s.products);
  const hasMore = useProductStore((s) => s.hasMore);
  const isLoading = useProductStore((s) => s.isLoading);
  const search = useProductStore((s) => s.search);

  const setDomain = useProductStore((s) => s.setDomain);
  const initProducts = useProductStore((s) => s.initProducts);
  const resetProducts = useProductStore((s) => s.resetProducts);
  const setSearch = useProductStore((s) => s.setSearch);
  const fetchNextPage = useProductStore((s) => s.fetchNextPage);
  const setStoreActiveCategory = useProductStore((s) => s.setActiveCategory);

  useEffect(() => {
    setDomain(domain);
    setCategories(categories);
    initProducts(initialProducts, total, initialPage, limit);
    isInitialMount.current = false;
  }, []);

  useEffect(() => {
    if (isFirstCategoryChange.current) {
      isFirstCategoryChange.current = false;
      return;
    }
    setStoreActiveCategory(activeCategoryId);
    resetProducts();
    fetchNextPage();
  }, [activeCategoryId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput !== search) {
        setSearch(searchInput);
        resetProducts();
        fetchNextPage();
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [hasMore, isLoading, fetchNextPage]
  );

  const displayedProducts = products;

  const toggleSidebar = () => setIsSidebarOpen((v) => !v);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleCart = () => setIsCartOpen((v) => !v);
  const closeCart = () => setIsCartOpen(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen || isCartOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen, isCartOpen]);

  const productWord = (n: number) => {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return 'товар';
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'товара';
    return 'товаров';
  };

  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/background.png)' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      <div className="relative z-10">
        <Header onMenuToggle={toggleSidebar} onCartToggle={toggleCart} cartItemsCount={totalItems} />

        <div className="flex pt-20 md:pt-24">
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/60 z-[55] md:hidden backdrop-blur-sm transition-opacity duration-300"
              onClick={closeSidebar}
            />
          )}

          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          <CartDrawer isOpen={isCartOpen} onClose={closeCart} />

          <div className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-red-500 text-sm">01 —</span>
                <h2 className="text-2xl sm:text-3xl font-light tracking-wider mt-1">
                  {activeCategory?.name.toUpperCase() || 'CATALOG'}
                </h2>
                <p className="text-xs text-white/40 tracking-wider mt-1">
                  {displayedProducts.length} {productWord(displayedProducts.length)}
                  {hasMore && <span className="ml-1 opacity-60">(загружено из {total})</span>}
                </p>
              </div>

              <div className="glass-card px-4 py-2 flex items-center gap-3 w-full sm:w-64">
                <Search size={14} className="text-white/40 shrink-0" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="SEARCH"
                  className="bg-transparent text-xs text-white/60 placeholder-white/30 outline-none w-full tracking-wider"
                />
              </div>
            </div>

            {displayedProducts.length === 0 && !isLoading ? (
              <div className="glass-card p-16 text-center">
                <p className="text-white/40 tracking-widest text-sm">ТОВАРЫ НЕ НАЙДЕНЫ</p>
                <p className="text-white/25 text-xs mt-2">
                  {search ? 'Попробуйте изменить поисковый запрос' : 'В данной категории пока нет товаров'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {Array.from({ length: Math.ceil(displayedProducts.length / 2) }).map((_, rowIndex) => {
                  const firstIndex = rowIndex * 2;
                  const first = displayedProducts[firstIndex];
                  const second = displayedProducts[firstIndex + 1];
                  const isEvenRow = rowIndex % 2 === 0;
                  const isLastRow = firstIndex + 2 >= displayedProducts.length;

                  return (
                    <div
                      key={rowIndex}
                      ref={isLastRow ? lastElementRef : null}
                      className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start"
                    >
                      {isEvenRow ? (
                        <>
                          {first && (
                            <div className="col-span-1 xl:col-span-2 h-full">
                              <ProductCard product={first} featured={false} />
                            </div>
                          )}
                          {second && (
                            <div className="col-span-1 xl:col-span-1 h-full">
                              <ProductCard product={second} featured={false} />
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          {first && (
                            <div className="col-span-1 xl:col-span-1 h-full">
                              <ProductCard product={first} featured={false} />
                            </div>
                          )}
                          {second && (
                            <div className="col-span-1 xl:col-span-2 h-full">
                              <ProductCard product={second} featured={false} />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-red-500 rounded-full animate-spin" />
                  </div>
                )}

                {!hasMore && displayedProducts.length > 0 && (
                  <div className="text-center py-8">
                    <p className="text-white/30 text-xs tracking-widest">— КОНЕЦ СПИСКА —</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed top-0 left-0 w-px h-full bg-gradient-to-b from-red-500/50 via-red-500/20 to-transparent z-50 pointer-events-none" />
      <div className="fixed top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-red-500/20 to-red-500/50 z-50 pointer-events-none" />

      <ToastContainer />
    </main>
  );
}
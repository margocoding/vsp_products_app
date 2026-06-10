'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/Product';
import Sidebar from '@/components/Sidebar';
import CartDrawer from '@/components/Cart';
import { Search } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useCategoryStore } from '@/store/categoryStore';
import { useProductStore } from '@/store/productStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const totalItems = useCartStore((state) => state.totalItems());
  const activeCategoryId = useCategoryStore((state) => state.activeCategoryId);
  const getAllCategoryIds = useCategoryStore((state) => state.getAllCategoryIds);
  const getActiveCategory = useCategoryStore((state) => state.getActiveCategory);
  const getProductsByCategory = useProductStore((state) => state.getProductsByCategory);

  // Получаем id активной категории и всех её подкатегорий
  const categoryIdsToShow = activeCategoryId 
    ? getAllCategoryIds(activeCategoryId) 
    : [];
  
  const filteredProducts = getProductsByCategory(categoryIdsToShow);
  const activeCategory = getActiveCategory();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);

  useEffect(() => {
    if (isSidebarOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen, isCartOpen]);

  return (
    <main className="min-h-screen relative">

      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/background.png)' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      <div className="relative z-10">
        <Header
          onMenuToggle={toggleSidebar}
          onCartToggle={toggleCart}
          cartItemsCount={totalItems}
        />

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
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-red-500 text-sm">01 —</span>
                <h2 className="text-2xl sm:text-3xl font-light tracking-wider mt-1">
                  {activeCategory?.name.toUpperCase() || 'CATALOG'}
                </h2>
                {activeCategory && (
                  <p className="text-xs text-white/40 tracking-wider mt-1">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : filteredProducts.length < 5 ? 'товара' : 'товаров'}
                  </p>
                )}
              </div>

              <div className="glass-card px-4 py-2 flex items-center gap-3 w-full sm:w-64">
                <Search size={14} className="text-white/40 shrink-0" />
                <input
                  type="text"
                  placeholder="SEARCH"
                  className="bg-transparent text-xs text-white/60 placeholder-white/30 outline-none w-full tracking-wider"
                />
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="glass-card p-16 text-center">
                <p className="text-white/40 tracking-widest text-sm">ТОВАРЫ НЕ НАЙДЕНЫ</p>
                <p className="text-white/25 text-xs mt-2">В данной категории пока нет товаров</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Array.from({ length: Math.ceil(filteredProducts.length / 2) }).map((_, rowIndex) => {
                  const firstIndex = rowIndex * 2;
                  const first = filteredProducts[firstIndex];
                  const second = filteredProducts[firstIndex + 1];
                  const isEvenRow = rowIndex % 2 === 0;

                  return (
                    <div key={rowIndex} className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
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
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed top-0 left-0 w-px h-full bg-gradient-to-b from-red-500/50 via-red-500/20 to-transparent z-50 pointer-events-none" />
      <div className="fixed top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-red-500/20 to-red-500/50 z-50 pointer-events-none" />
    </main>
  );
}
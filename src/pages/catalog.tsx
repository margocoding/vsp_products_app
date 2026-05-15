import { useState, useMemo } from 'react';
import { Header } from '@/widgets/header/ui/header';
import { Sidebar } from '@/widgets/sidebar/ui/sidebar';
import { Catalog } from '@/widgets/catalog/ui/catalog';
import { Footer } from '@/widgets/footer/ui/footer';
import { AnimatedBackground } from '@/shared/ui/animated-background';
import { categories } from '@/shared/data/categories';
import { products } from '@/shared/data/products';
import type { Product } from '@/shared/types';

export default function CatalogPage() {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (activeCategoryId !== null && product.categoryId !== activeCategoryId) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [activeCategoryId, searchQuery]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
  };

  return (
    <AnimatedBackground>
      <div className="min-h-screen flex flex-col">
        <Header
          totalProducts={filteredProducts.length}
          cartCount={cartItems.length}
          onSearch={setSearchQuery}
        />

        <main className="flex-1 max-w-[1920px] mx-auto w-full px-6 py-8">
          <div className="flex gap-6">
            <Sidebar
              categories={categories}
              activeCategoryId={activeCategoryId}
              onSelectCategory={setActiveCategoryId}
            />

            <Catalog
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedBackground>
  );
}

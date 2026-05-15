import { useState, useMemo } from "react";
import { Header } from "@/widgets/header/ui/header";
import { Sidebar } from "@/widgets/sidebar/ui/sidebar";
import { Catalog } from "@/widgets/catalog/ui/catalog";
import { Footer } from "@/widgets/footer/ui/footer";
import { CartSidebar } from "@/widgets/cart-sidebar/ui/cart-sidebar";
import { AnimatedBackground } from "@/shared/ui/animated-background";
import { categories } from "@/shared/data/categories";
import { products } from "@/shared/data/products";
import type { Product, CartItem } from "@/shared/types";

export default function CatalogPage() {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<number | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Subcategory filter (takes priority)
      if (
        activeSubcategoryId !== null &&
        product.categoryId !== activeSubcategoryId
      ) {
        return false;
      }

      // Category filter (only if no subcategory is selected)
      if (
        activeCategoryId !== null &&
        !activeSubcategoryId &&
        product.categoryId !== activeCategoryId
      ) {
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
  }, [activeCategoryId, activeSubcategoryId, searchQuery]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleSubmitCart = (data: { email: string; comment: string }) => {
    console.log('Заявка отправлена:', { items: cartItems, ...data });
    setIsCartSidebarOpen(false);
  };

  const handleToggleCartSidebar = () => {
    setIsCartSidebarOpen(!isCartSidebarOpen);
  };

  const handleCloseCartSidebar = () => {
    setIsCartSidebarOpen(false);
  };

  const handleSelectCategory = (categoryId: number | null) => {
    setActiveCategoryId((prev) => (prev === categoryId ? null : categoryId));
    // Check if this is a subcategory (by checking if it exists as a child in any category)
    const isSubcategory = categories.some((cat) =>
      cat.children?.some((child) => child.id === categoryId),
    );

    if (isSubcategory) {
      setActiveSubcategoryId(categoryId);
      setActiveCategoryId(null); // Clear parent category selection
    } else if (categoryId === null) {
      setActiveSubcategoryId(null);
    } else {
      setActiveSubcategoryId(null); // Clear subcategory when selecting parent
    }
  };

  return (
    <AnimatedBackground>
      <div className="min-h-screen flex flex-col">
        <Header
          totalProducts={filteredProducts.length}
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onSearch={setSearchQuery}
          onMenuToggle={handleToggleMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
          onCartToggle={handleToggleCartSidebar}
        />

        <main className="flex-1 max-w-480 mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex gap-4 sm:gap-6">
            <Sidebar
              categories={categories}
              activeCategoryId={activeCategoryId}
              activeSubcategoryId={activeSubcategoryId}
              onSelectCategory={handleSelectCategory}
              isOpen={isMobileMenuOpen}
              onClose={handleCloseMobileMenu}
            />

            <Catalog
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        </main>

        <Footer />
        
        <CartSidebar
          isOpen={isCartSidebarOpen}
          onClose={handleCloseCartSidebar}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onSubmit={handleSubmitCart}
        />
      </div>
    </AnimatedBackground>
  );
}

import { useState, useMemo, useCallback } from "react";
import { cn } from "@/shared/lib/cn";
import type { Product } from "@/shared/types";
import { HeroCard } from "./hero-card/hero-card";
import { SecondaryCard } from "./secondary-card/secondary-card";
import { ShowcaseCard } from "./showcase-card/showcase-card";
import { EmptyCatalogState } from "./empty-state/empty-catalog-state";
import { CatalogNavigation, PageIndicator } from "./catalog-navigation/catalog-navigation";

interface HolographicCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const PRODUCTS_PER_PAGE = 5;

export function HolographicCatalog({
  products,
  onAddToCart,
}: HolographicCatalogProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [addedProducts, setAddedProducts] = useState<Set<number>>(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<
    "left" | "right"
  >("right");

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const handleAddToCart = useCallback(
    (product: Product) => {
      setAddedProducts((prev) => new Set(prev).add(product.id));
      onAddToCart(product);
      setTimeout(() => {
        setAddedProducts((prev) => {
          const next = new Set(prev);
          next.delete(product.id);
          return next;
        });
      }, 1500);
    },
    [onAddToCart],
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const goToPage = useCallback(
    (page: number) => {
      if (page < 0 || page >= totalPages || isTransitioning) return;

      setTransitionDirection(page > currentPage ? "right" : "left");
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentPage(page);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 300);
    },
    [currentPage, totalPages, isTransitioning],
  );

  const handlePrev = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const handleNext = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const currentProducts = useMemo(() => {
    const startIndex = currentPage * PRODUCTS_PER_PAGE;
    return products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [products, currentPage]);

  const heroProduct = currentProducts[0];
  const secondaryProducts = currentProducts.slice(1, 5);

  if (products.length === 0) {
    return <EmptyCatalogState />;
  }

  return (
    <div className="w-full relative">
      <div
        className={cn(
          "transition-all duration-300 ease-out",
          isTransitioning && "opacity-0 blur-sm",
        )}
      >
        <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_1fr] gap-3 mb-6">
          {heroProduct && (
            <HeroCard
              product={heroProduct}
              isAdded={addedProducts.has(heroProduct.id)}
              onAddToCart={() => handleAddToCart(heroProduct)}
              formatPrice={formatPrice}
              transitionDirection={transitionDirection}
            />
          )}

          <div className="grid grid-cols-2 gap-2.5">
            {secondaryProducts.map((product, index) => (
              <SecondaryCard
                key={product.id}
                product={product}
                isAdded={addedProducts.has(product.id)}
                onAddToCart={() => handleAddToCart(product)}
                formatPrice={formatPrice}
                delay={index * 80}
              />
            ))}
          </div>
        </div>

        {currentProducts.length > 0 && (
          <ShowcaseCard products={currentProducts} formatPrice={formatPrice} />
        )}
      </div>

      <CatalogNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        isTransitioning={isTransitioning}
        onPrev={handlePrev}
        onNext={handleNext}
        onPageChange={goToPage}
      />

      <PageIndicator currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

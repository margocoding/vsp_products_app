import { useState, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Check, Truck, Warehouse, Zap, Shield, Award, Star } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { GlassPanel } from '@/shared/ui/glass-panel';
import { cn } from '@/shared/lib/cn';
import type { Product } from '@/shared/types';

interface HolographicCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const PRODUCTS_PER_PAGE = 5; // 1 hero + 4 secondary

export function HolographicCatalog({ products, onAddToCart }: HolographicCatalogProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [addedProducts, setAddedProducts] = useState<Set<number>>(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right'>('right');

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const handleAddToCart = useCallback((product: Product) => {
    setAddedProducts(prev => new Set(prev).add(product.id));
    onAddToCart(product);
    setTimeout(() => {
      setAddedProducts(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  }, [onAddToCart]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const goToPage = useCallback((page: number) => {
    if (page < 0 || page >= totalPages || isTransitioning) return;
    
    setTransitionDirection(page > currentPage ? 'right' : 'left');
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentPage(page);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  }, [currentPage, totalPages, isTransitioning]);

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
    return (
      <GlassPanel variant="accent" className="p-16 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[rgba(255,43,43,0.1)] border border-[rgba(255,43,43,0.2)] flex items-center justify-center shadow-lg shadow-[rgba(255,43,43,0.1)]">
            <ShoppingCart size={40} className="text-[#FF2B2B]" />
          </div>
          <p className="text-[#F5F5F5] text-base font-bold uppercase tracking-wider neon-text">Товары не найдены</p>
          <p className="text-[#9CA3AF] text-sm">Попробуйте изменить параметры поиска</p>
        </div>
      </GlassPanel>
    );
  }

  return (
    <div className="w-full relative">
      {/* Main catalog grid */}
      <div className={cn(
        "transition-all duration-300 ease-out",
        isTransitioning && "opacity-0 blur-sm"
      )}>
        {/* Upper section: Hero + Secondary grid - Compact cinematic dashboard layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.95fr] gap-6 mb-6">
          {/* Hero Product Card - Compact */}
          {heroProduct && (
            <HeroCard 
              product={heroProduct}
              isAdded={addedProducts.has(heroProduct.id)}
              onAddToCart={() => handleAddToCart(heroProduct)}
              formatPrice={formatPrice}
              transitionDirection={transitionDirection}
            />
          )}

          {/* Secondary Products Grid - Compact cluster */}
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

        {/* Lower section: Wide preview card */}
        {currentProducts.length > 0 && (
          <ShowcaseCard 
            products={currentProducts}
            formatPrice={formatPrice}
          />
        )}
      </div>

      {/* Navigation arrows - Simplified */}
      <div className="absolute left-[-60px] top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0 || isTransitioning}
          className="w-10 h-10 rounded-full bg-[rgba(10,10,12,0.6)] backdrop-blur-md border border-[rgba(255,43,43,0.2)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[rgba(255,43,43,0.5)] hover:shadow-[0_0_20px_rgba(255,43,43,0.3)] disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} className="text-[#F5F5F5]" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1 || isTransitioning}
          className="w-10 h-10 rounded-full bg-[rgba(10,10,12,0.6)] backdrop-blur-md border border-[rgba(255,43,43,0.2)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[rgba(255,43,43,0.5)] hover:shadow-[0_0_20px_rgba(255,43,43,0.3)] disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight size={20} className="text-[#F5F5F5]" />
        </button>
      </div>

      <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3">
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1 || isTransitioning}
          className="w-10 h-10 rounded-full bg-[rgba(10,10,12,0.6)] backdrop-blur-md border border-[rgba(255,43,43,0.2)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[rgba(255,43,43,0.5)] hover:shadow-[0_0_20px_rgba(255,43,43,0.3)] disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight size={20} className="text-[#F5F5F5]" />
        </button>
        <button
          onClick={handlePrev}
          disabled={currentPage === 0 || isTransitioning}
          className="w-10 h-10 rounded-full bg-[rgba(10,10,12,0.6)] backdrop-blur-md border border-[rgba(255,43,43,0.2)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[rgba(255,43,43,0.5)] hover:shadow-[0_0_20px_rgba(255,43,43,0.3)] disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} className="text-[#F5F5F5]" />
        </button>
      </div>

      {/* Mobile/Tablet navigation */}
      <div className="flex xl:hidden items-center justify-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0 || isTransitioning}
          className="w-10 h-10 rounded-full bg-[rgba(10,10,12,0.6)] backdrop-blur-md border border-[rgba(255,43,43,0.2)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[rgba(255,43,43,0.5)] hover:shadow-[0_0_20px_rgba(255,43,43,0.3)] disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} className="text-[#F5F5F5]" />
        </button>
        
        <div className="flex items-center gap-2">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum: number;
            if (totalPages <= 5) {
              pageNum = i;
            } else if (currentPage < 3) {
              pageNum = i;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 5 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={i}
                onClick={() => goToPage(pageNum)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentPage === pageNum 
                    ? "bg-[#FF2B2B] w-6 shadow-[0_0_10px_rgba(255,43,43,0.6)]" 
                    : "bg-[rgba(255,43,43,0.3)] hover:bg-[rgba(255,43,43,0.5)]"
                )}
                aria-label={`Go to page ${pageNum + 1}`}
              />
            );
          })}
        </div>
        
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1 || isTransitioning}
          className="w-10 h-10 rounded-full bg-[rgba(10,10,12,0.6)] backdrop-blur-md border border-[rgba(255,43,43,0.2)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[rgba(255,43,43,0.5)] hover:shadow-[0_0_20px_rgba(255,43,43,0.3)] disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight size={20} className="text-[#F5F5F5]" />
        </button>
      </div>

      {/* Page indicator */}
      <div className="text-center mt-4 text-[#9CA3AF] text-xs">
        Страница <span className="text-[#F5F5F5] font-bold neon-text">{currentPage + 1}</span> из{' '}
        <span className="text-[#F5F5F5] font-bold neon-text">{totalPages}</span>
      </div>
    </div>
  );
}

// Hero Card Component
interface HeroCardProps {
  product: Product;
  isAdded: boolean;
  onAddToCart: () => void;
  formatPrice: (price: number) => string;
  transitionDirection: 'left' | 'right';
}

function HeroCard({ product, isAdded, onAddToCart, formatPrice, transitionDirection }: HeroCardProps) {
  return (
      <div 
        className="holo-card holo-card-hero relative group"
        style={{
          animation: 'holoSlideIn 0.5s ease-out forwards',
          transformOrigin: transitionDirection === 'right' ? 'left center' : 'right center'
        }}
      >
      <div className="relative z-10 p-5 h-full flex flex-col">
        {/* Image section - Compact cinematic preview */}
        <div className="relative h-[52%] mb-4 overflow-hidden rounded-lg bg-[rgba(10,10,13,0.6)]">
          <img
            src={product.picture}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%230a0a0d%22 width=%22400%22 height=%22400%22/%3E%3Ctext fill=%22%23333%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2216%22%3ENo Image%3C/text%3E%3C/svg%3E';
            }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,13,0.9)] via-[rgba(10,10,13,0.3)] to-transparent" />
          
          {/* Status badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {product.used ? (
              <Badge variant="used" size="sm" className="backdrop-blur-md shadow-lg shadow-[rgba(255,43,43,0.2)]">Б/У</Badge>
            ) : (
              <Badge variant="new" size="sm" className="backdrop-blur-md shadow-lg shadow-[rgba(255,43,43,0.2)]">Новый</Badge>
            )}
            {product.delivery && (
              <Badge variant="available" size="sm" className="backdrop-blur-md shadow-lg shadow-[rgba(255,43,43,0.2)] flex items-center gap-1">
                <Truck size={10} /> Доставка
              </Badge>
            )}
            {product.store && !product.delivery && (
              <Badge variant="available" size="sm" className="backdrop-blur-md shadow-lg shadow-[rgba(255,43,43,0.2)] flex items-center gap-1">
                <Warehouse size={10} /> Со склада
              </Badge>
            )}
          </div>

          {/* Availability indicator */}
          <div className="absolute top-3 right-3">
            <div className={cn(
              "px-2.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide backdrop-blur-md shadow-lg border",
              product.available 
                ? "bg-[rgba(16,185,129,0.2)] text-[#34D399] border-[rgba(16,185,129,0.4)] shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                : "bg-[rgba(245,158,11,0.2)] text-[#FBBF24] border-[rgba(245,158,11,0.4)] shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            )}>
              {product.available ? 'В наличии' : 'Под заказ'}
            </div>
          </div>

          {/* Feature icons */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            {product.available && (
              <div className="p-1.5 rounded-lg bg-[rgba(255,43,43,0.2)] backdrop-blur-sm border border-[rgba(255,43,43,0.4)] shadow-[0_0_15px_rgba(255,43,43,0.3)]">
                <Zap size={12} className="text-[#FF2B2B]" />
              </div>
            )}
            {!product.used && (
              <div className="p-1.5 rounded-lg bg-[rgba(255,43,43,0.2)] backdrop-blur-sm border border-[rgba(255,43,43,0.4)] shadow-[0_0_15px_rgba(255,43,43,0.3)]">
                <Award size={12} className="text-[#FF2B2B]" />
              </div>
            )}
            <div className="p-1.5 rounded-lg bg-[rgba(255,43,43,0.2)] backdrop-blur-sm border border-[rgba(255,43,43,0.4)] shadow-[0_0_15px_rgba(255,43,43,0.3)]">
              <Shield size={12} className="text-[#FF2B2B]" />
            </div>
          </div>
        </div>

        {/* Content section - Compact */}
        <div className="space-y-3 flex-1">
          <div>
            <h2 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-wider mb-1.5 neon-text group-hover:text-[#FF2B2B] transition-colors duration-300">
              {product.name}
            </h2>
            <p className="text-[#9CA3AF] text-xs line-clamp-2">{product.description}</p>
          </div>

          {/* Price and CTA */}
          <div className="flex items-end justify-between pt-3 border-t border-[rgba(255,43,43,0.2)]">
            <div>
              <div className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-0.5">Цена</div>
              <div className="text-xl font-bold bg-gradient-to-r from-[#FF2B2B] via-[#D1001F] to-[#FF2B2B] bg-clip-text text-transparent neon-text-intense">
                {formatPrice(product.price)}
              </div>
            </div>
            
            <Button
              variant={isAdded ? 'primary' : 'outline'}
              size="md"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              className={cn(
                'min-w-[120px] transition-all duration-300 !rounded-lg !px-5 !py-2.5 text-xs font-semibold uppercase tracking-wide',
                isAdded 
                  ? '!bg-gradient-to-r from-[#10B981] to-[#059669] shadow-lg shadow-[rgba(16,185,129,0.4)]' 
                  : 'hover:shadow-lg hover:shadow-[rgba(255,43,43,0.4)] hover:border-[rgba(255,43,43,0.5)]'
              )}
            >
              {isAdded ? (
                <>
                  <Check size={14} className="mr-1.5" />
                  <span>Добавлено</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={14} className="mr-1.5" />
                  <span>В заявку</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Secondary Card Component
interface SecondaryCardProps {
  product: Product;
  isAdded: boolean;
  onAddToCart: () => void;
  formatPrice: (price: number) => string;
  delay: number;
}

function SecondaryCard({ product, isAdded, onAddToCart, formatPrice, delay }: SecondaryCardProps) {
  return (
    <div 
      className="holo-card holo-card-secondary group cursor-pointer"
      style={{
        animation: 'cascadeIn 0.5s ease-out forwards',
        animationDelay: `${delay}ms`,
        opacity: 0
      }}
    >
      <div className="relative p-2.5">
        {/* Image - Compact */}
        <div className="relative aspect-square mb-2 overflow-hidden rounded-md bg-[rgba(10,10,13,0.5)]">
          <img
            src={product.picture}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%230a0a0d%22 width=%22400%22 height=%22400%22/%3E%3Ctext fill=%22%23333%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2216%22%3ENo Image%3C/text%3E%3C/svg%3E';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,13,0.7)] to-transparent" />
          
          {/* Badge */}
          <div className="absolute top-1.5 left-1.5">
            {product.used ? (
              <Badge variant="used" size="sm" className="backdrop-blur-md text-[9px] px-1.5 py-0.5">Б/У</Badge>
            ) : (
              <Badge variant="new" size="sm" className="backdrop-blur-md text-[9px] px-1.5 py-0.5">Новый</Badge>
            )}
          </div>

          {/* Availability */}
          <div className="absolute top-1.5 right-1.5">
            <div className={cn(
              "w-1.5 h-1.5 rounded-full",
              product.available ? "bg-[#34D399] shadow-[0_0_6px_rgba(52,211,153,0.6)]" : "bg-[#FBBF24] shadow-[0_0_6px_rgba(251,191,36,0.6)]"
            )} />
          </div>
        </div>

        {/* Info - Compact */}
        <div className="space-y-1">
          <h3 className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wide line-clamp-2 min-h-[2rem] group-hover:text-[#FF2B2B] transition-colors duration-300">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between pt-1.5 border-t border-[rgba(255,43,43,0.15)]">
            <div className="text-xs font-bold bg-gradient-to-r from-[#FF2B2B] to-[#D1001F] bg-clip-text text-transparent neon-text">
              {formatPrice(product.price)}
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              className={cn(
                "p-1.5 rounded-md transition-all duration-300 border",
                isAdded 
                  ? "bg-[rgba(16,185,129,0.2)] border-[rgba(16,185,129,0.4)] text-[#34D399] shadow-[0_0_8px_rgba(16,185,129,0.3)]" 
                  : "bg-[rgba(255,43,43,0.1)] border-[rgba(255,43,43,0.3)] text-[#FF2B2B] hover:bg-[rgba(255,43,43,0.2)] hover:border-[rgba(255,43,43,0.5)] hover:shadow-[0_0_12px_rgba(255,43,43,0.3)]"
              )}
              aria-label="Add to cart"
            >
              {isAdded ? <Check size={12} /> : <ShoppingCart size={12} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Showcase Card Component
interface ShowcaseCardProps {
  products: Product[];
  formatPrice: (price: number) => string;
}

function ShowcaseCard({ products, formatPrice }: ShowcaseCardProps) {
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const avgPrice = products.length > 0 ? totalValue / products.length : 0;

  return (
    <GlassPanel variant="accent" className="relative overflow-hidden group">
      <div className="relative z-10 p-5">
        {/* Header - Compact technical */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[rgba(255,43,43,0.2)]">
          <div className="flex items-center gap-2">
            <Star size={16} className="text-[#FF2B2B] neon-text" />
            <h3 className="text-sm font-bold text-[#F5F5F5] uppercase tracking-wider neon-text">
              Превью подборки
            </h3>
          </div>
          
          <div className="flex items-center gap-3 text-[10px] text-[#9CA3AF]">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF2B2B] shadow-[0_0_6px_rgba(255,43,43,0.6)] animate-pulse" />
              <span>Активная подборка</span>
            </div>
          </div>
        </div>

        {/* Content grid - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Stats */}
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[rgba(10,10,13,0.5)] border border-[rgba(255,43,43,0.15)]">
              <span className="text-[10px] text-[#9CA3AF] uppercase">Товаров</span>
              <span className="text-base font-bold text-[#F5F5F5] neon-text">{products.length}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[rgba(10,10,13,0.5)] border border-[rgba(255,43,43,0.15)]">
              <span className="text-[10px] text-[#9CA3AF] uppercase">Средняя цена</span>
              <span className="text-base font-bold bg-gradient-to-r from-[#FF2B2B] to-[#D1001F] bg-clip-text text-transparent neon-text">
                {formatPrice(avgPrice)}
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[rgba(10,10,13,0.5)] border border-[rgba(255,43,43,0.15)]">
              <span className="text-[10px] text-[#9CA3AF] uppercase">Общая стоимость</span>
              <span className="text-base font-bold bg-gradient-to-r from-[#FF2B2B] to-[#D1001F] bg-clip-text text-transparent neon-text">
                {formatPrice(totalValue)}
              </span>
            </div>
          </div>

          {/* Product thumbnails - Compact */}
          <div className="md:col-span-2 flex items-center gap-2 overflow-x-auto pb-1.5">
            {products.map((product, index) => (
              <div 
                key={product.id}
                className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border border-[rgba(255,43,43,0.2)] bg-[rgba(10,10,13,0.6)] relative group/item cursor-pointer transition-all duration-300 hover:border-[rgba(255,43,43,0.4)] hover:shadow-[0_0_15px_rgba(255,43,43,0.15)]"
              >
                <img
                  src={product.picture}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,43,43,0.15)] to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-[rgba(10,10,13,0.9)] to-transparent">
                  <div className="text-[9px] text-[#FF2B2B] font-bold truncate">{formatPrice(product.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical footer - Minimal */}
        <div className="mt-4 pt-3 border-t border-[rgba(255,43,43,0.2)] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-[#9CA3AF]">
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-[#FF2B2B]" />
              <span>Holographic Preview</span>
            </div>
          </div>
          <div className="text-[10px] text-[#9CA3AF] font-mono">
            ID: {Date.now().toString(36).toUpperCase()}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

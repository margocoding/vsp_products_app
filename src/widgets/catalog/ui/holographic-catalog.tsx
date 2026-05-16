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
      {/* Floating red spheres behind catalog */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-[#FF2B2B]/10 rounded-full blur-[100px]"
          style={{ animation: 'sphereFloat 8s ease-in-out infinite' }}
        />
        <div 
          className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-[#D1001F]/8 rounded-full blur-[90px]"
          style={{ animation: 'sphereFloat 10s ease-in-out infinite', animationDelay: '2s' }}
        />
        <div 
          className="absolute top-[50%] left-[50%] w-[300px] h-[300px] bg-[#8A0000]/10 rounded-full blur-[80px]"
          style={{ animation: 'sphereFloat 12s ease-in-out infinite', animationDelay: '4s' }}
        />
      </div>

      {/* Navigation arrows */}
      <div className="absolute left-[-70px] top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0 || isTransitioning}
          className="nav-button-holo disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1 || isTransitioning}
          className="nav-button-holo disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="absolute right-[-70px] top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3">
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1 || isTransitioning}
          className="nav-button-holo disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight size={24} />
        </button>
        <button
          onClick={handlePrev}
          disabled={currentPage === 0 || isTransitioning}
          className="nav-button-holo disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Main catalog grid */}
      <div className={cn(
        "transition-all duration-300 ease-out",
        isTransitioning && "opacity-0 blur-sm"
      )}>
        {/* Upper section: Hero + Secondary grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 mb-6">
          {/* Hero Product Card */}
          {heroProduct && (
            <HeroCard 
              product={heroProduct}
              isAdded={addedProducts.has(heroProduct.id)}
              onAddToCart={() => handleAddToCart(heroProduct)}
              formatPrice={formatPrice}
              transitionDirection={transitionDirection}
            />
          )}

          {/* Secondary Products Grid */}
          <div className="grid grid-cols-2 gap-4">
            {secondaryProducts.map((product, index) => (
              <SecondaryCard
                key={product.id}
                product={product}
                isAdded={addedProducts.has(product.id)}
                onAddToCart={() => handleAddToCart(product)}
                formatPrice={formatPrice}
                delay={index * 100}
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

      {/* Mobile/Tablet navigation */}
      <div className="flex xl:hidden items-center justify-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0 || isTransitioning}
          className="nav-button-holo disabled:opacity-30 disabled:cursor-not-allowed !w-12 !h-12"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
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
          className="nav-button-holo disabled:opacity-30 disabled:cursor-not-allowed !w-12 !h-12"
          aria-label="Next page"
        >
          <ChevronRight size={20} />
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
      {/* Animated background spheres behind card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-[#FF2B2B]/15 rounded-full blur-[80px]"
          style={{ animation: 'breatheLight 6s ease-in-out infinite' }}
        />
        <div 
          className="absolute bottom-[-10%] left-[-5%] w-[250px] h-[250px] bg-[#D1001F]/10 rounded-full blur-[70px]"
          style={{ animation: 'breatheLight 8s ease-in-out infinite', animationDelay: '1s' }}
        />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-[rgba(255,43,43,0.4)] rounded-tl-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-[rgba(255,43,43,0.4)] rounded-br-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[rgba(255,43,43,0.2)] rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[rgba(255,43,43,0.2)] rounded-bl-lg" />

      {/* HUD lines */}
      <div className="absolute top-4 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,43,43,0.3)] to-transparent opacity-50" />
      <div className="absolute bottom-4 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,43,43,0.3)] to-transparent opacity-50" />

      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Image section */}
        <div className="relative flex-1 mb-6 overflow-hidden rounded-lg bg-[rgba(10,10,13,0.6)]">
          <img
            src={product.picture}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%230a0a0d%22 width=%22400%22 height=%22400%22/%3E%3Ctext fill=%22%23333%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2216%22%3ENo Image%3C/text%3E%3C/svg%3E';
            }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,13,0.9)] via-[rgba(10,10,13,0.3)] to-transparent" />
          
          {/* Status badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {product.used ? (
              <Badge variant="used" size="sm" className="backdrop-blur-md shadow-lg shadow-[rgba(255,43,43,0.2)]">Б/У</Badge>
            ) : (
              <Badge variant="new" size="sm" className="backdrop-blur-md shadow-lg shadow-[rgba(255,43,43,0.2)]">Новый</Badge>
            )}
            {product.delivery && (
              <Badge variant="available" size="sm" className="backdrop-blur-md shadow-lg shadow-[rgba(255,43,43,0.2)] flex items-center gap-1">
                <Truck size={12} /> Доставка
              </Badge>
            )}
            {product.store && !product.delivery && (
              <Badge variant="available" size="sm" className="backdrop-blur-md shadow-lg shadow-[rgba(255,43,43,0.2)] flex items-center gap-1">
                <Warehouse size={12} /> Со склада
              </Badge>
            )}
          </div>

          {/* Availability indicator */}
          <div className="absolute top-4 right-4">
            <div className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide backdrop-blur-md shadow-lg border",
              product.available 
                ? "bg-[rgba(16,185,129,0.2)] text-[#34D399] border-[rgba(16,185,129,0.4)] shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                : "bg-[rgba(245,158,11,0.2)] text-[#FBBF24] border-[rgba(245,158,11,0.4)] shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            )}>
              {product.available ? 'В наличии' : 'Под заказ'}
            </div>
          </div>

          {/* Feature icons */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            {product.available && (
              <div className="p-2 rounded-lg bg-[rgba(255,43,43,0.2)] backdrop-blur-sm border border-[rgba(255,43,43,0.4)] shadow-[0_0_15px_rgba(255,43,43,0.3)]">
                <Zap size={14} className="text-[#FF2B2B]" />
              </div>
            )}
            {!product.used && (
              <div className="p-2 rounded-lg bg-[rgba(255,43,43,0.2)] backdrop-blur-sm border border-[rgba(255,43,43,0.4)] shadow-[0_0_15px_rgba(255,43,43,0.3)]">
                <Award size={14} className="text-[#FF2B2B]" />
              </div>
            )}
            <div className="p-2 rounded-lg bg-[rgba(255,43,43,0.2)] backdrop-blur-sm border border-[rgba(255,43,43,0.4)] shadow-[0_0_15px_rgba(255,43,43,0.3)]">
              <Shield size={14} className="text-[#FF2B2B]" />
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-[#F5F5F5] uppercase tracking-wider mb-2 neon-text group-hover:text-[#FF2B2B] transition-colors duration-300">
              {product.name}
            </h2>
            <p className="text-[#9CA3AF] text-sm line-clamp-2">{product.description}</p>
          </div>

          {/* Price and CTA */}
          <div className="flex items-end justify-between pt-4 border-t border-[rgba(255,43,43,0.2)]">
            <div>
              <div className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1">Цена</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-[#FF2B2B] via-[#D1001F] to-[#FF2B2B] bg-clip-text text-transparent neon-text-intense">
                {formatPrice(product.price)}
              </div>
            </div>
            
            <Button
              variant={isAdded ? 'primary' : 'outline'}
              size="lg"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              className={cn(
                'min-w-[140px] transition-all duration-300 !rounded-lg !px-6 !py-3 text-sm font-semibold uppercase tracking-wide',
                isAdded 
                  ? '!bg-gradient-to-r from-[#10B981] to-[#059669] shadow-lg shadow-[rgba(16,185,129,0.4)]' 
                  : 'hover:shadow-lg hover:shadow-[rgba(255,43,43,0.4)] hover:border-[rgba(255,43,43,0.5)]'
              )}
            >
              {isAdded ? (
                <>
                  <Check size={16} className="mr-2" />
                  <span>Добавлено</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={16} className="mr-2" />
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
      className="holo-card group cursor-pointer"
      style={{
        animation: 'cascadeIn 0.5s ease-out forwards',
        animationDelay: `${delay}ms`,
        opacity: 0
      }}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-[rgba(255,43,43,0.3)] rounded-tl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-[rgba(255,43,43,0.3)] rounded-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-4">
        {/* Image */}
        <div className="relative aspect-square mb-3 overflow-hidden rounded-lg bg-[rgba(10,10,13,0.5)]">
          <img
            src={product.picture}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%230a0a0d%22 width=%22400%22 height=%22400%22/%3E%3Ctext fill=%22%23333%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2216%22%3ENo Image%3C/text%3E%3C/svg%3E';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,13,0.7)] to-transparent" />
          
          {/* Badge */}
          <div className="absolute top-2 left-2">
            {product.used ? (
              <Badge variant="used" size="sm" className="backdrop-blur-md text-[10px]">Б/У</Badge>
            ) : (
              <Badge variant="new" size="sm" className="backdrop-blur-md text-[10px]">Новый</Badge>
            )}
          </div>

          {/* Availability */}
          <div className="absolute top-2 right-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              product.available ? "bg-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.6)]" : "bg-[#FBBF24] shadow-[0_0_8px_rgba(251,191,36,0.6)]"
            )} />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-[#F5F5F5] uppercase tracking-wide line-clamp-2 min-h-[2rem] group-hover:text-[#FF2B2B] transition-colors duration-300">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between pt-2 border-t border-[rgba(255,43,43,0.15)]">
            <div className="text-sm font-bold bg-gradient-to-r from-[#FF2B2B] to-[#D1001F] bg-clip-text text-transparent neon-text">
              {formatPrice(product.price)}
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              className={cn(
                "p-2 rounded-lg transition-all duration-300 border",
                isAdded 
                  ? "bg-[rgba(16,185,129,0.2)] border-[rgba(16,185,129,0.4)] text-[#34D399] shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
                  : "bg-[rgba(255,43,43,0.1)] border-[rgba(255,43,43,0.3)] text-[#FF2B2B] hover:bg-[rgba(255,43,43,0.2)] hover:border-[rgba(255,43,43,0.5)] hover:shadow-[0_0_15px_rgba(255,43,43,0.3)]"
              )}
              aria-label="Add to cart"
            >
              {isAdded ? <Check size={14} /> : <ShoppingCart size={14} />}
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
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[-50%] left-[20%] w-[600px] h-[600px] bg-[#FF2B2B]/5 rounded-full blur-[120px]"
          style={{ animation: 'breatheLight 10s ease-in-out infinite' }}
        />
      </div>

      {/* Blueprint grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 43, 43, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 43, 43, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[rgba(255,43,43,0.2)]">
          <div className="flex items-center gap-3">
            <Star size={20} className="text-[#FF2B2B] neon-text" />
            <h3 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-wider neon-text">
              Превью подборки
            </h3>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FF2B2B] shadow-[0_0_8px_rgba(255,43,43,0.6)] animate-pulse" />
              <span>Активная подборка</span>
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Stats */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-[rgba(10,10,13,0.5)] border border-[rgba(255,43,43,0.15)]">
              <span className="text-xs text-[#9CA3AF] uppercase">Товаров</span>
              <span className="text-lg font-bold text-[#F5F5F5] neon-text">{products.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[rgba(10,10,13,0.5)] border border-[rgba(255,43,43,0.15)]">
              <span className="text-xs text-[#9CA3AF] uppercase">Средняя цена</span>
              <span className="text-lg font-bold bg-gradient-to-r from-[#FF2B2B] to-[#D1001F] bg-clip-text text-transparent neon-text">
                {formatPrice(avgPrice)}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[rgba(10,10,13,0.5)] border border-[rgba(255,43,43,0.15)]">
              <span className="text-xs text-[#9CA3AF] uppercase">Общая стоимость</span>
              <span className="text-lg font-bold bg-gradient-to-r from-[#FF2B2B] to-[#D1001F] bg-clip-text text-transparent neon-text">
                {formatPrice(totalValue)}
              </span>
            </div>
          </div>

          {/* Product thumbnails */}
          <div className="md:col-span-2 flex items-center gap-3 overflow-x-auto pb-2">
            {products.map((product, index) => (
              <div 
                key={product.id}
                className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-[rgba(255,43,43,0.2)] bg-[rgba(10,10,13,0.6)] relative group/item cursor-pointer transition-all duration-300 hover:border-[rgba(255,43,43,0.4)] hover:shadow-[0_0_20px_rgba(255,43,43,0.2)]"
              >
                <img
                  src={product.picture}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,43,43,0.2)] to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-[rgba(10,10,13,0.9)] to-transparent">
                  <div className="text-[10px] text-[#FF2B2B] font-bold truncate">{formatPrice(product.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HUD footer */}
        <div className="mt-6 pt-4 border-t border-[rgba(255,43,43,0.2)] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-[#FF2B2B]" />
              <span>Holographic Preview System</span>
            </div>
          </div>
          <div className="text-xs text-[#9CA3AF]">
            ID: <span className="text-[#F5F5F5] font-mono">{Date.now().toString(36).toUpperCase()}</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

import { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUpAZ, ArrowDownAZ, SlidersHorizontal, ShoppingCart, Check, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Star, Truck, Warehouse, Search, X, Zap, Shield, Award } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { GlassPanel } from '@/shared/ui/glass-panel';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/lib/cn';
import type { Product } from '@/shared/types';

interface CatalogProps {
  products: Product[];
  searchQuery: string;
  onSearch: (query: string) => void;
  onAddToCart: (product: Product) => void;
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

const ITEMS_PER_PAGE = 12;

export function Catalog({ products, searchQuery, onSearch, onAddToCart }: CatalogProps) {
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [addedProducts, setAddedProducts] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    
    switch (sortOption) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  }, [products, sortOption]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  // Reset to page 1 when sorting changes
  useMemo(() => {
    setCurrentPage(1);
  }, [sortOption]);

  const handleAddToCart = (product: Product) => {
    setAddedProducts(prev => new Set(prev).add(product.id));
    onAddToCart(product);
    setTimeout(() => {
      setAddedProducts(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const sortOptions: { value: SortOption; label: string; icon: React.ReactNode }[] = [
    { value: 'default', label: 'По умолчанию', icon: <SlidersHorizontal size={14} /> },
    { value: 'price-asc', label: 'Цена ↑', icon: <ArrowUpAZ size={14} /> },
    { value: 'price-desc', label: 'Цена ↓', icon: <ArrowDownAZ size={14} /> },
    { value: 'name-asc', label: 'А-Я', icon: <ArrowUpDown size={14} /> },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const delta = 2;
    
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== 'ellipsis') {
        pages.push('ellipsis');
      }
    }
    
    return pages;
  };

  return (
    <div className="w-full">
      {/* Search and Sorting Bar - Futuristic Style */}
      <GlassPanel 
        variant="accent" 
        className="mb-6 p-4 shadow-xl shadow-[rgba(255,43,43,0.1)]"
      >
        <div className="flex flex-col gap-4">
          {/* Search bar - Mobile only (desktop in header) */}
          <div className="relative md:hidden">
            <Input
              type="text"
              placeholder="Поиск по названию или описанию..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              icon={<Search size={16} />}
              variant="neon"
              className="h-10 !rounded-lg text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => onSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#6B7280] hover:text-[#FF2B2B] transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sorting and count */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={sortOption === option.value ? 'primary' : 'glass'}
                  size="sm"
                  onClick={() => {
                    setSortOption(option.value);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    "gap-1.5 text-xs transition-all duration-300 !rounded-lg",
                    sortOption === option.value && "shadow-lg shadow-[rgba(255,43,43,0.3)]"
                  )}
                >
                  {option.icon}
                  <span className="hidden sm:inline">{option.label}</span>
                </Button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-[#9CA3AF] text-xs">
              <Star size={14} className="text-[#FF2B2B] fill-[#FF2B2B]/20 neon-text" />
              <span>Найдено <span className="text-[#F5F5F5] font-bold neon-text">{sortedProducts.length}</span> товаров</span>
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Products Grid - Card Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isAdded={addedProducts.has(product.id)}
            onAddToCart={() => handleAddToCart(product)}
            formatPrice={formatPrice}
          />
        ))}
        
        {paginatedProducts.length === 0 && (
          <GlassPanel variant="card" className="col-span-full p-16 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-[rgba(255,43,43,0.1)] border border-[rgba(255,43,43,0.2)] flex items-center justify-center shadow-lg shadow-[rgba(255,43,43,0.1)]">
                <ShoppingCart size={40} className="text-[#FF2B2B]" />
              </div>
              <p className="text-[#F5F5F5] text-base font-bold uppercase tracking-wider neon-text">Товары не найдены</p>
              <p className="text-[#9CA3AF] text-sm">Попробуйте изменить параметры поиска</p>
            </div>
          </GlassPanel>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <GlassPanel variant="card" className="mt-4 p-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="text-[#9CA3AF] text-xs">
              Страница <span className="text-[#F5F5F5] font-bold neon-text">{currentPage}</span> из{' '}
              <span className="text-[#F5F5F5] font-bold neon-text">{totalPages}</span>
            </div>
            
            <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="disabled:opacity-30 disabled:cursor-not-allowed shrink-0 !px-2 hover:text-[#FF2B2B]"
              >
                <ChevronsLeft size={14} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="disabled:opacity-30 disabled:cursor-not-allowed shrink-0 !px-2 hover:text-[#FF2B2B]"
              >
                <ChevronLeft size={14} />
              </Button>
              
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                  <Button
                    key={index}
                    variant={page === currentPage ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    className={cn(
                      'min-w-[32px] px-2.5 text-xs',
                      page === 'ellipsis' && 'cursor-default hover:bg-transparent'
                    )}
                    disabled={page === 'ellipsis'}
                  >
                    {page === 'ellipsis' ? '…' : page}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="disabled:opacity-30 disabled:cursor-not-allowed shrink-0 !px-2 hover:text-[#FF2B2B]"
              >
                <ChevronRight size={14} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="disabled:opacity-30 disabled:cursor-not-allowed shrink-0 !px-2 hover:text-[#FF2B2B]"
              >
                <ChevronsRight size={14} />
              </Button>
            </div>
          </div>
        </GlassPanel>
      )}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  isAdded: boolean;
  onAddToCart: () => void;
  formatPrice: (price: number) => string;
}

function ProductCard({ product, isAdded, onAddToCart, formatPrice }: ProductCardProps) {
  return (
    <GlassPanel 
      variant="card"
      hover
      className="group cursor-pointer overflow-hidden relative"
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF2B2B]/0 via-transparent to-[#FF2B2B]/5 group-hover:via-[#FF2B2B]/5 transition-all duration-500 pointer-events-none" />
      
      {/* Corner accent decorations */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[rgba(255,43,43,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[rgba(255,43,43,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Card Image Section */}
      <div className="relative aspect-square overflow-hidden bg-[rgba(10,10,13,0.5)]">
        <img
          src={product.picture}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%230a0a0d%22 width=%22400%22 height=%22400%22/%3E%3Ctext fill=%22%23333%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2216%22%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
        
        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,13,0.8)] via-transparent to-transparent opacity-60" />
        
        {/* Status badges overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.used ? (
            <Badge variant="used" size="sm" className="backdrop-blur-md shadow-lg">Б/У</Badge>
          ) : (
            <Badge variant="new" size="sm" className="backdrop-blur-md shadow-lg">Новый</Badge>
          )}
          {product.delivery && (
            <Badge variant="available" size="sm" className="backdrop-blur-md shadow-lg flex items-center gap-1">
              <Truck size={10} /> Доставка
            </Badge>
          )}
          {product.store && !product.delivery && (
            <Badge variant="available" size="sm" className="backdrop-blur-md shadow-lg flex items-center gap-1">
              <Warehouse size={10} /> Со склада
            </Badge>
          )}
        </div>
        
        {/* Availability indicator */}
        <div className="absolute top-3 right-3">
          <div className={cn(
            "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide backdrop-blur-md shadow-lg border",
            product.available 
              ? "bg-[rgba(16,185,129,0.2)] text-[#34D399] border-[rgba(16,185,129,0.4)] shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
              : "bg-[rgba(245,158,11,0.2)] text-[#FBBF24] border-[rgba(245,158,11,0.4)] shadow-[0_0_15px_rgba(245,158,11,0.2)]"
          )}>
            {product.available ? 'В наличии' : 'Под заказ'}
          </div>
        </div>
        
        {/* Feature icons overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          {product.available && (
            <div className="p-1.5 rounded-lg bg-[rgba(255,43,43,0.15)] backdrop-blur-sm border border-[rgba(255,43,43,0.3)]">
              <Zap size={12} className="text-[#FF2B2B]" />
            </div>
          )}
          {!product.used && (
            <div className="p-1.5 rounded-lg bg-[rgba(255,43,43,0.15)] backdrop-blur-sm border border-[rgba(255,43,43,0.3)]">
              <Award size={12} className="text-[#FF2B2B]" />
            </div>
          )}
          <div className="p-1.5 rounded-lg bg-[rgba(255,43,43,0.15)] backdrop-blur-sm border border-[rgba(255,43,43,0.3)]">
            <Shield size={12} className="text-[#FF2B2B]" />
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Product name */}
        <h3 className="text-sm font-bold text-[#F5F5F5] uppercase tracking-wide line-clamp-2 min-h-[2.5rem] group-hover:text-[#FF2B2B] transition-colors duration-300 neon-text">
          {product.name}
        </h3>

        {/* Price and Action */}
        <div className="pt-3 border-t border-[rgba(255,255,255,0.08)]">
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-0.5">Цена</div>
              <div className="text-lg font-bold bg-gradient-to-r from-[#FF2B2B] to-[#D1001F] bg-clip-text text-transparent neon-text">
                {formatPrice(product.price)}
              </div>
            </div>
            
            <Button
              variant={isAdded ? 'primary' : 'outline'}
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              className={cn(
                'min-w-[100px] transition-all duration-300 !rounded-lg !px-4 !py-2 text-xs font-semibold uppercase tracking-wide',
                isAdded 
                  ? '!bg-gradient-to-r from-[#10B981] to-[#059669] shadow-lg shadow-[rgba(16,185,129,0.3)]' 
                  : 'hover:shadow-lg hover:shadow-[rgba(255,43,43,0.3)]'
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
    </GlassPanel>
  );
}

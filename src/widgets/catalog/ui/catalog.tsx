import { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUpAZ, ArrowDownAZ, SlidersHorizontal, ShoppingCart, Check, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Star, Truck, Warehouse, Search, X } from 'lucide-react';
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
      {/* Search and Sorting Bar - Premium Style */}
      <GlassPanel className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-white/8 to-white/5 border-white/12 shadow-xl shadow-black/5">
        <div className="flex flex-col gap-4">
          {/* Search bar */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Поиск по названию или описанию..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              icon={<Search size={18} />}
              className="h-12 !rounded-xl !bg-white/8 !border-white/15 focus:!border-red-500/30 focus:!ring-red-500/30"
            />
            {searchQuery && (
              <button
                onClick={() => onSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sorting and count */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 flex-wrap">
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
                    "gap-2 text-xs sm:text-sm transition-all duration-300 !rounded-lg",
                    sortOption === option.value && "shadow-lg shadow-red-900/20 scale-105"
                  )}
                >
                  {option.icon}
                  <span className="hidden xs:inline">{option.label}</span>
                </Button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <Star size={16} className="text-red-400 fill-red-400/20" />
              <span>Найдено <span className="text-red-400 font-bold text-base">{sortedProducts.length}</span> товаров</span>
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Products Grid - Card Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
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
          <GlassPanel className="col-span-full p-16 text-center bg-white/3">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <ShoppingCart size={32} className="text-zinc-500" />
              </div>
              <p className="text-zinc-400 text-lg font-medium">Товары не найдены</p>
              <p className="text-zinc-500 text-sm">Попробуйте изменить параметры поиска</p>
            </div>
          </GlassPanel>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <GlassPanel className="mt-4 sm:mt-6 p-3 sm:p-4">
          <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
            <div className="text-zinc-400 text-xs sm:text-sm">
              Страница <span className="text-zinc-200 font-medium">{currentPage}</span> из{' '}
              <span className="text-zinc-200 font-medium">{totalPages}</span>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 sm:pb-0">
              <Button
                variant="glass"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              >
                <ChevronsLeft size={14} className="sm:w-4 sm:h-4" />
              </Button>
              <Button
                variant="glass"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              >
                <ChevronLeft size={14} className="sm:w-4 sm:h-4" />
              </Button>
              
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                  <Button
                    key={index}
                    variant={page === currentPage ? 'primary' : 'glass'}
                    size="sm"
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    className={cn(
                      'min-w-[32px] sm:min-w-[40px] px-2 sm:px-3 text-xs sm:text-sm',
                      page === 'ellipsis' && 'cursor-default hover:bg-transparent hover:border-white/8'
                    )}
                    disabled={page === 'ellipsis'}
                  >
                    {page === 'ellipsis' ? '…' : page}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="glass"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              >
                <ChevronRight size={14} className="sm:w-4 sm:h-4" />
              </Button>
              <Button
                variant="glass"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              >
                <ChevronsRight size={14} className="sm:w-4 sm:h-4" />
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
      hover
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/10 hover:-translate-y-1"
    >
      {/* Card Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-white/5 to-white/2">
        <img
          src={product.picture}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%231a1a1a%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23444%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2216%22%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        
        {/* Status badges overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.used ? (
            <Badge variant="used" className="text-xs px-2 py-1 shadow-lg backdrop-blur-sm">Б/У</Badge>
          ) : (
            <Badge variant="new" className="text-xs px-2 py-1 shadow-lg backdrop-blur-sm">Новый</Badge>
          )}
          {product.delivery && (
            <Badge variant="available" className="text-xs px-2 py-1 shadow-lg backdrop-blur-sm flex items-center gap-1">
              <Truck size={10} /> Доставка
            </Badge>
          )}
          {product.store && !product.delivery && (
            <Badge variant="available" className="text-xs px-2 py-1 shadow-lg backdrop-blur-sm flex items-center gap-1">
              <Warehouse size={10} /> Со склада
            </Badge>
          )}
        </div>
        
        {/* Availability indicator */}
        <div className="absolute top-3 right-3">
          <div className={cn(
            "px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm shadow-lg",
            product.available 
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
              : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
          )}>
            {product.available ? 'В наличии' : 'Под заказ'}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Category badge */}
        <div className="flex items-center justify-between">
          <Badge variant="default" className="text-xs px-2 py-1 bg-white/5 border-white/10">
            Категория #{product.categoryId}
          </Badge>
        </div>

        {/* Product name */}
        <h3 className="text-base font-semibold text-zinc-100 line-clamp-2 min-h-[2.5rem] group-hover:text-red-300 transition-colors duration-300">
          {product.name}
        </h3>

        {/* Price and Action */}
        <div className="pt-2 border-t border-white/8">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-xl font-bold text-zinc-100 group-hover:text-red-300 transition-colors duration-300">
                {formatPrice(product.price)}
              </div>
            </div>
            
            <Button
              variant={isAdded ? 'primary' : 'glass'}
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              className={cn(
                'min-w-[110px] transition-all duration-300',
                isAdded 
                  ? 'bg-emerald-700/60 hover:bg-emerald-600/50 shadow-lg shadow-emerald-900/20' 
                  : 'hover:shadow-lg hover:shadow-red-900/20'
              )}
            >
              {isAdded ? (
                <>
                  <Check size={16} className="mr-1.5" />
                  <span>Добавлено</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={16} className="mr-1.5" />
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

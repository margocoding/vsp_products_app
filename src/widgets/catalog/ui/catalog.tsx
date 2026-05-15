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
      <GlassPanel className="mb-6 p-4 bg-zinc-900/30 border-zinc-800 shadow-xl shadow-black/5">
        <div className="flex flex-col gap-4">
          {/* Search bar - Mobile only (desktop in header) */}
          <div className="relative md:hidden">
            <Input
              type="text"
              placeholder="Поиск по названию или описанию..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              icon={<Search size={16} />}
              className="h-10 !rounded-lg !bg-zinc-900/50 !border-zinc-800 focus:!border-red-900/50 focus:!ring-red-900/30 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => onSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
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
                  variant={sortOption === option.value ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    setSortOption(option.value);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    "gap-1.5 text-xs transition-all duration-200 !rounded-md",
                    sortOption === option.value && "shadow-md shadow-red-900/20"
                  )}
                >
                  {option.icon}
                  <span className="hidden sm:inline">{option.label}</span>
                </Button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-zinc-500 text-xs">
              <Star size={14} className="text-red-500 fill-red-500/20" />
              <span>Найдено <span className="text-white font-semibold">{sortedProducts.length}</span> товаров</span>
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
          <GlassPanel className="col-span-full p-16 text-center bg-zinc-900/20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-zinc-900/50 flex items-center justify-center">
                <ShoppingCart size={32} className="text-zinc-600" />
              </div>
              <p className="text-zinc-400 text-base font-medium">Товары не найдены</p>
              <p className="text-zinc-600 text-sm">Попробуйте изменить параметры поиска</p>
            </div>
          </GlassPanel>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <GlassPanel className="mt-4 p-3 bg-zinc-900/30 border-zinc-800">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="text-zinc-500 text-xs">
              Страница <span className="text-zinc-300 font-medium">{currentPage}</span> из{' '}
              <span className="text-zinc-300 font-medium">{totalPages}</span>
            </div>
            
            <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="disabled:opacity-30 disabled:cursor-not-allowed shrink-0 !px-2"
              >
                <ChevronsLeft size={14} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="disabled:opacity-30 disabled:cursor-not-allowed shrink-0 !px-2"
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
                className="disabled:opacity-30 disabled:cursor-not-allowed shrink-0 !px-2"
              >
                <ChevronRight size={14} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="disabled:opacity-30 disabled:cursor-not-allowed shrink-0 !px-2"
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
      hover
      className="group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-xl hover:shadow-red-900/5 hover:-translate-y-0.5 bg-zinc-900/40 border-zinc-800"
    >
      {/* Card Image Section */}
      <div className="relative aspect-square overflow-hidden bg-zinc-900/50">
        <img
          src={product.picture}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%231a1a1a%22 width=%22400%22 height=%22400%22/%3E%3Ctext fill=%22%23444%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2216%22%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
        
        {/* Status badges overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.used ? (
            <Badge variant="used" className="text-[10px] px-1.5 py-0.5 backdrop-blur-sm">Б/У</Badge>
          ) : (
            <Badge variant="new" className="text-[10px] px-1.5 py-0.5 backdrop-blur-sm">Новый</Badge>
          )}
          {product.delivery && (
            <Badge variant="available" className="text-[10px] px-1.5 py-0.5 backdrop-blur-sm flex items-center gap-1">
              <Truck size={9} /> Доставка
            </Badge>
          )}
          {product.store && !product.delivery && (
            <Badge variant="available" className="text-[10px] px-1.5 py-0.5 backdrop-blur-sm flex items-center gap-1">
              <Warehouse size={9} /> Со склада
            </Badge>
          )}
        </div>
        
        {/* Availability indicator */}
        <div className="absolute top-2 right-2">
          <div className={cn(
            "px-2 py-0.5 rounded text-[10px] font-medium backdrop-blur-sm",
            product.available 
              ? "bg-emerald-900/40 text-emerald-400 border border-emerald-900/50" 
              : "bg-amber-900/40 text-amber-400 border border-amber-900/50"
          )}>
            {product.available ? 'В наличии' : 'Под заказ'}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3 space-y-2">
        {/* Product name */}
        <h3 className="text-sm font-semibold text-zinc-200 line-clamp-2 min-h-[2.25rem] group-hover:text-red-400 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Price and Action */}
        <div className="pt-2 border-t border-zinc-800">
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className="text-base font-bold text-white group-hover:text-red-400 transition-colors duration-200">
                {formatPrice(product.price)}
              </div>
            </div>
            
            <Button
              variant={isAdded ? 'primary' : 'secondary'}
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              className={cn(
                'min-w-[90px] transition-all duration-200 !rounded-md !px-3 !py-1.5 text-xs',
                isAdded 
                  ? '!bg-emerald-900/50 hover:!bg-emerald-900/60 shadow-md shadow-emerald-900/20' 
                  : 'hover:shadow-md hover:shadow-red-900/20'
              )}
            >
              {isAdded ? (
                <>
                  <Check size={14} className="mr-1" />
                  <span>Добавлено</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={14} className="mr-1" />
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

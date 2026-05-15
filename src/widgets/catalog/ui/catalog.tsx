import { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUpAZ, ArrowDownAZ, SlidersHorizontal, ShoppingCart, Check, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { GlassPanel } from '@/shared/ui/glass-panel';
import { cn } from '@/shared/lib/cn';
import type { Product } from '@/shared/types';

interface CatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

const ITEMS_PER_PAGE = 20;

export function Catalog({ products, onAddToCart }: CatalogProps) {
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
    <div className="flex-1 min-w-0">
      {/* Sorting Bar */}
      <GlassPanel className="mb-6 p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {sortOptions.map((option) => (
              <Button
                key={option.value}
                variant={sortOption === option.value ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => {
                  setSortOption(option.value);
                  setCurrentPage(1);
                }}
                className="gap-2"
              >
                {option.icon}
                {option.label}
              </Button>
            ))}
          </div>
          
          <div className="text-zinc-400 text-sm">
            Найдено <span className="text-red-400 font-semibold">{sortedProducts.length}</span> товаров
          </div>
        </div>
      </GlassPanel>

      {/* Products Table */}
      <div className="space-y-3">
        {paginatedProducts.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            isAdded={addedProducts.has(product.id)}
            onAddToCart={() => handleAddToCart(product)}
            formatPrice={formatPrice}
          />
        ))}
        
        {paginatedProducts.length === 0 && (
          <GlassPanel className="p-12 text-center">
            <p className="text-zinc-400 text-lg">Товары не найдены</p>
          </GlassPanel>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <GlassPanel className="mt-6 p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-zinc-400 text-sm">
              Страница <span className="text-zinc-200 font-medium">{currentPage}</span> из{' '}
              <span className="text-zinc-200 font-medium">{totalPages}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="glass"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronsLeft size={16} />
              </Button>
              <Button
                variant="glass"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </Button>
              
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                  <Button
                    key={index}
                    variant={page === currentPage ? 'primary' : 'glass'}
                    size="sm"
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    className={cn(
                      'min-w-[40px]',
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
                className="disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </Button>
              <Button
                variant="glass"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronsRight size={16} />
              </Button>
            </div>
          </div>
        </GlassPanel>
      )}
    </div>
  );
}

interface ProductRowProps {
  product: Product;
  isAdded: boolean;
  onAddToCart: () => void;
  formatPrice: (price: number) => string;
}

function ProductRow({ product, isAdded, onAddToCart, formatPrice }: ProductRowProps) {
  return (
    <GlassPanel 
      hover
      className="p-4 group cursor-pointer"
    >
      <div className="flex items-center gap-4">
        {/* Image */}
        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white/3 border border-white/6">
          <img
            src={product.picture}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect fill="%23333" width="80" height="80"/%3E%3Ctext fill="%23666" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-zinc-200 font-medium line-clamp-2">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="default">Категория #{product.categoryId}</Badge>
                {product.used && <Badge variant="used">Б/У</Badge>}
                {!product.used && <Badge variant="new">Новый</Badge>}
                {product.delivery && <Badge variant="available">Доставка</Badge>}
                {product.store && <Badge variant="available">Со склада</Badge>}
              </div>
            </div>

            {/* Price and Action */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-right">
                <div className="text-xl font-bold text-zinc-200">
                  {formatPrice(product.price)}
                </div>
                {product.available ? (
                  <span className="text-xs text-emerald-400">В наличии</span>
                ) : (
                  <span className="text-xs text-amber-400">Под заказ</span>
                )}
              </div>
              
              <Button
                variant={isAdded ? 'primary' : 'glass'}
                size="md"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart();
                }}
                className={cn(
                  'min-w-[120px]',
                  isAdded && 'bg-emerald-700/60 hover:bg-emerald-700/50'
                )}
              >
                {isAdded ? (
                  <>
                    <Check size={16} className="mr-2" />
                    Добавлено
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} className="mr-2" />
                    В заявку
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

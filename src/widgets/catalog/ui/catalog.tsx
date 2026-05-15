import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, ArrowUpAZ, ArrowDownAZ, SlidersHorizontal, ShoppingCart, Check } from 'lucide-react';
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

export function Catalog({ products, onAddToCart }: CatalogProps) {
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [addedProducts, setAddedProducts] = useState<Set<number>>(new Set());

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
                onClick={() => setSortOption(option.value)}
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
        {sortedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
          >
            <ProductRow
              product={product}
              isAdded={addedProducts.has(product.id)}
              onAddToCart={() => handleAddToCart(product)}
              formatPrice={formatPrice}
            />
          </motion.div>
        ))}
        
        {sortedProducts.length === 0 && (
          <GlassPanel className="p-12 text-center">
            <p className="text-zinc-400 text-lg">Товары не найдены</p>
          </GlassPanel>
        )}
      </div>
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
        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white/5 border border-white/10">
          <img
            src={product.picture}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect fill="%23333" width="80" height="80"/%3E%3Ctext fill="%23666" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-zinc-100 font-medium group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
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
                <div className="text-xl font-bold text-zinc-100 group-hover:text-red-400 transition-colors duration-300">
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
                  isAdded && 'bg-emerald-600 hover:bg-emerald-500'
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

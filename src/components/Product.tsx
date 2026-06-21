'use client';

import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types/types';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Button from './ui/Button';
import { getImageUrl } from '@/common/utils';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({
  product,
  featured = false,
}: ProductCardProps) {
  const available = product.quantity ?? 0;
  const isInStock = available > 0;

  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!isInStock) return;
    addItem(product);
  };

  return (
    <div className="relative group h-full">
      <div className="absolute inset-0 bg-linear-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div
        className="
          glass-card relative h-full
          border border-white/10
          hover:border-red-500/40
          transition-all duration-500
          hover:shadow-[0_0_50px_rgba(255,32,32,0.25)]
          p-6
          flex flex-col
        "
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3
              className={`
                font-light tracking-wide text-white
                ${featured ? 'text-3xl' : 'text-2xl'}
              `}
            >
              {product.name}
            </h3>

            {product.subtitle && (
              <p className="text-sm text-white/50 mt-1 tracking-wider uppercase">
                {product.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex gap-6 items-start">
          {/* SPECS */}
          <div className="space-y-4 text-xs flex-1 min-w-0">
            {product.standard && (
              <div className="space-y-1">
                <span className="text-white/30 uppercase tracking-wider text-[10px] block">
                  STANDARD
                </span>
                <p className="text-white/70 font-light truncate">
                  {product.standard}
                </p>
              </div>
            )}

            {product.length && (
              <div className="space-y-1">
                <span className="text-white/30 uppercase tracking-wider text-[10px] block">
                  LENGTH
                </span>
                <p className="text-white/70 font-light">{product.length}</p>
              </div>
            )}

            {product.weight && (
              <div className="space-y-1">
                <span className="text-white/30 uppercase tracking-wider text-[10px] block">
                  WEIGHT
                </span>
                <p className="text-white/70 font-light">{product.weight}</p>
              </div>
            )}

            {/* STATUS */}
            <div className="space-y-1 pt-3 border-t border-white/10">
              <span className="text-white/30 uppercase tracking-wider text-[10px] block">
                STATUS
              </span>

              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isInStock ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
                  }`}
                />

                <p
                  className={`font-medium tracking-wider text-[11px] uppercase ${
                    isInStock ? 'text-emerald-400' : 'text-red-500'
                  }`}
                >
                  {isInStock ? 'В наличии' : 'Нет в наличии'}
                </p>
              </div>

              {isInStock && (
                <p className="text-white/40 text-[10px] mt-1 tracking-wider">
                  На складе: {available} шт
                </p>
              )}
            </div>
          </div>

          {/* IMAGE */}
          <div className="shrink-0 w-44">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5">
            {product.image && 
              <Image
                src={getImageUrl(product.image) || '/products/1.png'}
                fill
                alt={product.name}
                unoptimized
                className="object-contain p-3 transition-transform duration-500 group-hover:scale-110"
              />
            }
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-end h-full justify-between pt-4 border-t border-white/10 mt-6">
          <div>
            <div className="flex items-baseline gap-1">
              <span
                className={`font-light text-white tracking-tight ${
                  featured ? 'text-5xl' : 'text-3xl'
                }`}
              >
                {product.price}
              </span>
              <span className="text-lg text-white/50 font-light">₽</span>
            </div>
            <p className="text-[10px] text-white/40 -mt-1">за единицу</p>
          </div>

          <Button
            disabled={!isInStock}
            onClick={handleAddToCart}
            className="z-10"
          >
            <Plus size={15} />
            <span>{isInStock ? 'ДОБАВИТЬ' : 'НЕТ В НАЛИЧИИ'}</span>
          </Button>
        </div>

        {/* Hover glow */}
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-linear-to-tl from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </div>
  );
}
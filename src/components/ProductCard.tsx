import Link from 'next/link';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';
import { Product } from '@/types/types';
import { getImageUrl } from '@/common/utils';
import AddToCartButton from './products/AddToCartButton';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const conditionLabels: Record<string, string> = {
  NEW: 'Новый',
  USED: 'Б/У',
  REFURBISHED: 'Восстановленный',
  RESERVED: 'Резерв',
};

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const available = product.quantity ?? 0;
  const isInStock = available > 0;
  const characteristics = product.characteristics ?? [];
  const maxVisibleChars = featured ? 8 : 4;
  const displayChars = characteristics.slice(0, maxVisibleChars);
  const unitLabel = product.unit ?? 'шт';
  const currencySymbol = product.priceUnit === 'RUB' ? '₽' : product.priceUnit;

  const formattedPrice = Number(product.price).toLocaleString('ru-RU');
  const productUrl = `/products/${product.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.subtitle || product.name,
    brand: { "@type": "Brand", name: "All Railways" },
    image: product.image ? getImageUrl(product.image) : undefined,
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}${productUrl}`,
      price: product.price,
      priceCurrency: product.priceUnit,
      availability: isInStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="relative group h-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute inset-0 bg-linear-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

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
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3
              className={`
                font-light tracking-wide text-white
                ${featured ? 'text-3xl' : 'text-2xl'}
              `}
            >
              <Link
                href={productUrl}
                className="hover:text-red-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded"
              >
                {product.name}
              </Link>
            </h3>

            {product.subtitle && (
              <p className="text-xs text-white/50 mt-1 tracking-wider uppercase line-clamp-2">
                <Link
                  href={productUrl}
                  className="hover:text-white/70 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded"
                >
                  {product.subtitle}
                </Link>
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-6 items-start">
          <div
            className={`flex-1 min-w-0 ${
              featured
                ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4'
                : 'flex flex-col space-y-4'
            }`}
          >
            {displayChars.map((char, idx) => (
              <div key={char.id ?? idx} className="space-y-1">
                <span className="text-white/30 uppercase tracking-wider text-xs block">
                  {char.title}
                </span>
                <p className="text-white/70 font-light truncate">{char.value}</p>
              </div>
            ))}

            {displayChars.length === 0 && (
              <div className={`space-y-1 ${featured ? 'col-span-2 md:col-span-3 lg:col-span-4' : ''}`}>
                <span className="text-white/30 uppercase tracking-wider text-xs block">
                  ХАРАКТЕРИСТИКИ
                </span>
                <p className="text-white/50 font-light italic text-xs">Не указаны</p>
              </div>
            )}

            <div className={`space-y-3 pt-3 border-t border-white/10 ${featured ? 'col-span-2 md:col-span-3 lg:col-span-4' : ''}`}>
              <div className="space-y-1">
                <span className="text-white/30 uppercase tracking-wider text-xs block">НДС</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="font-medium tracking-wider text-xs uppercase text-emerald-400">
                    Включая НДС
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-44">
            <Link href={productUrl} className="block relative w-full aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-red-500/50">
              {product.image ? (
                <Image
                  src={getImageUrl(product.image)}
                  fill
                  alt={product.name}
                  unoptimized
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/20">
                  <ImageOff size={32} strokeWidth={1} />
                  <span className="text-xs uppercase tracking-wider">Нет изображения</span>
                </div>
              )}
            </Link>
          </div>
        </div>

        <div className="flex items-end h-full justify-between pt-4 border-t border-white/10 mt-6">
          <div>
            <div className="flex items-baseline gap-1">
              <span
                className={`font-light text-white tracking-tight ${
                  featured ? 'text-4xl lg:text-5xl' : 'text-3xl lg:text-4xl'
                }`}
              >
                {formattedPrice}
              </span>
              <span className={`text-white/50 font-light ${featured ? 'text-xl lg:text-2xl' : 'text-lg lg:text-xl'}`}>
                {currencySymbol}
              </span>
            </div>
            <p className="text-xs text-white/40 -mt-1">за {unitLabel}</p>
          </div>

          <AddToCartButton product={product} />
        </div>

        <div className="absolute bottom-0 right-0 w-40 h-40 bg-linear-to-tl from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>
    </div>
  );
}
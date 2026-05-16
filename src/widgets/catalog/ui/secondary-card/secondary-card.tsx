import { ShoppingCart, Check } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { Product } from "@/shared/types";

interface SecondaryCardProps {
  product: Product;
  isAdded: boolean;
  onAddToCart: () => void;
  formatPrice: (price: number) => string;
  delay: number;
}

export function SecondaryCard({
  product,
  isAdded,
  onAddToCart,
  formatPrice,
  delay,
}: SecondaryCardProps) {
  return (
    <div
      className="holo-card holo-card-secondary group cursor-pointer"
      style={{
        animation: "cascadeIn 0.5s ease-out forwards",
        animationDelay: `${delay}ms`,
        opacity: 0,
      }}
    >
      <div className="relative p-2.5">
        <div className="relative mb-2 aspect-[16/13] overflow-hidden rounded-md bg-[rgba(10,10,13,0.5)]">
          <img
            src={product.picture}
            alt={product.name}
            className="w-full h-full object-cover duration-500 group-hover:scale-[1.03]"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%230a0a0d%22 width=%22400%22 height=%22400%22/%3E%3Ctext fill=%22%23333%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2216%22%3ENo Image%3C/text%3E%3C/svg%3E";
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,13,0.7)] to-transparent" />
        </div>

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
                  : "bg-[rgba(255,43,43,0.1)] border-[rgba(255,43,43,0.3)] text-[#FF2B2B] hover:bg-[rgba(255,43,43,0.2)] hover:border-[rgba(255,43,43,0.5)] hover:shadow-[0_0_12px_rgba(255,43,43,0.3)]",
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

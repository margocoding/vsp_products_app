import { ShoppingCart, Check, Truck, Warehouse, Zap, Shield, Award } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/cn";
import type { Product } from "@/shared/types";

interface HeroCardProps {
  product: Product;
  isAdded: boolean;
  onAddToCart: () => void;
  formatPrice: (price: number) => string;
  transitionDirection: "left" | "right";
}

export function HeroCard({
  product,
  isAdded,
  onAddToCart,
  formatPrice,
  transitionDirection,
}: HeroCardProps) {
  return (
    <div
      className="holo-card holo-card-hero relative group"
      style={{
        animation: "holoSlideIn 0.5s ease-out forwards",
        transformOrigin:
          transitionDirection === "right" ? "left center" : "right center",
      }}
    >
      <div className="relative z-10 p-5 h-full flex flex-col">
        <div className="relative h-full mb-4 overflow-hidden rounded-lg bg-[rgba(10,10,13,0.6)]">
          <img
            src={product.picture}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%230a0a0d%22 width=%22400%22 height=%22400%22/%3E%3Ctext fill=%22%23333%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2216%22%3ENo Image%3C/text%3E%3C/svg%3E";
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,13,0.9)] via-[rgba(10,10,13,0.3)] to-transparent" />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {product.used ? (
              <Badge
                variant="used"
                size="sm"
                className="backdrop-blur-md shadow-lg shadow-[rgba(255,43,43,0.2)]"
              >
                Б/У
              </Badge>
            ) : (
              <Badge
                variant="new"
                size="sm"
                className="backdrop-blur-md shadow-lg shadow-[rgba(255,43,43,0.2)]"
              >
                Новый
              </Badge>
            )}
            {product.delivery && (
              <Badge
                variant="available"
                size="sm"
                className="backdrop-blur-md shadow-lg shadow-[rgba(255,43,43,0.2)] flex items-center gap-1"
              >
                <Truck size={10} /> Доставка
              </Badge>
            )}
            {product.store && !product.delivery && (
              <Badge
                variant="available"
                size="sm"
                className="backdrop-blur-md shadow-lg shadow-[rgba(255,43,43,0.2)] flex items-center gap-1"
              >
                <Warehouse size={10} /> Со склада
              </Badge>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <div
              className={cn(
                "px-2.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide backdrop-blur-md shadow-lg border",
                product.available
                  ? "bg-[rgba(16,185,129,0.2)] text-[#34D399] border-[rgba(16,185,129,0.4)] shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  : "bg-[rgba(245,158,11,0.2)] text-[#FBBF24] border-[rgba(245,158,11,0.4)] shadow-[0_0_20px_rgba(245,158,11,0.3)]",
              )}
            >
              {product.available ? "В наличии" : "Под заказ"}
            </div>
          </div>

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

        <div className="space-y-3 flex-1">
          <div>
            <h2 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-wider mb-1.5 neon-text group-hover:text-[#FF2B2B] transition-colors duration-300">
              {product.name}
            </h2>
            <p className="text-[#9CA3AF] text-xs line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-end justify-between pt-3 border-t border-[rgba(255,43,43,0.2)]">
            <div>
              <div className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-0.5">
                Цена
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-[#FF2B2B] via-[#D1001F] to-[#FF2B2B] bg-clip-text text-transparent neon-text-intense">
                {formatPrice(product.price)}
              </div>
            </div>

            <Button
              variant={isAdded ? "primary" : "outline"}
              size="md"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              className={cn(
                "min-w-[120px] transition-all duration-300 !rounded-lg !px-5 !py-2.5 text-xs font-semibold uppercase tracking-wide",
                isAdded
                  ? "!bg-gradient-to-r from-[#10B981] to-[#059669] shadow-lg shadow-[rgba(16,185,129,0.4)]"
                  : "hover:shadow-lg hover:shadow-[rgba(255,43,43,0.4)] hover:border-[rgba(255,43,43,0.5)]",
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

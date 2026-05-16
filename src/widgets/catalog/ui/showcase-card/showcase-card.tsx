import { Star } from "lucide-react";
import { GlassPanel } from "@/shared/ui/glass-panel";
import type { Product } from "@/shared/types";

interface ShowcaseCardProps {
  products: Product[];
  formatPrice: (price: number) => string;
}

export function ShowcaseCard({ products, formatPrice }: ShowcaseCardProps) {
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const avgPrice = products.length > 0 ? totalValue / products.length : 0;

  return (
    <GlassPanel variant="accent" className="relative overflow-hidden group">
      <div className="relative z-10 p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[rgba(255,43,43,0.2)]">
          <div className="flex items-center gap-2">
            <Star size={16} className="text-[#FF2B2B] neon-text" />
            <h3 className="text-sm font-bold text-[#F5F5F5] uppercase tracking-wider neon-text">
              Превью подборки
            </h3>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-[#9CA3AF]">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF2B2B] shadow-[0_0_6px_rgba(255,43,43,0.6)] animate-pulse" />
              <span>Активная подборка</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[rgba(10,10,13,0.5)] border border-[rgba(255,43,43,0.15)]">
              <span className="text-[10px] text-[#9CA3AF] uppercase">
                Товаров
              </span>
              <span className="text-base font-bold text-[#F5F5F5] neon-text">
                {products.length}
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[rgba(10,10,13,0.5)] border border-[rgba(255,43,43,0.15)]">
              <span className="text-[10px] text-[#9CA3AF] uppercase">
                Средняя цена
              </span>
              <span className="text-base font-bold bg-gradient-to-r from-[#FF2B2B] to-[#D1001F] bg-clip-text text-transparent neon-text">
                {formatPrice(avgPrice)}
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[rgba(10,10,13,0.5)] border border-[rgba(255,43,43,0.15)]">
              <span className="text-[10px] text-[#9CA3AF] uppercase">
                Общая стоимость
              </span>
              <span className="text-base font-bold bg-gradient-to-r from-[#FF2B2B] to-[#D1001F] bg-clip-text text-transparent neon-text">
                {formatPrice(totalValue)}
              </span>
            </div>
          </div>

          <div className="md:col-span-2 flex items-center gap-2 overflow-x-auto pb-1.5">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border border-[rgba(255,43,43,0.2)] bg-[rgba(10,10,13,0.6)] relative group/item cursor-pointer transition-all duration-300 hover:border-[rgba(255,43,43,0.4)] hover:shadow-[0_0_15px_rgba(255,43,43,0.15)]"
              >
                <img
                  src={product.picture}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,43,43,0.15)] to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-[rgba(10,10,13,0.9)] to-transparent">
                  <div className="text-[9px] text-[#FF2B2B] font-bold truncate">
                    {formatPrice(product.price)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[rgba(255,43,43,0.2)] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-[#9CA3AF]">
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-[#FF2B2B]" />
              <span>Holographic Preview</span>
            </div>
          </div>
          <div className="text-[10px] text-[#9CA3AF] font-mono">
            ID: {Date.now().toString(36).toUpperCase()}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

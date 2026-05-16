import { ShoppingCart } from "lucide-react";
import { GlassPanel } from "@/shared/ui/glass-panel";

export function EmptyCatalogState() {
  return (
    <GlassPanel variant="accent" className="p-16 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-[rgba(255,43,43,0.1)] border border-[rgba(255,43,43,0.2)] flex items-center justify-center shadow-lg shadow-[rgba(255,43,43,0.1)]">
          <ShoppingCart size={40} className="text-[#FF2B2B]" />
        </div>
        <p className="text-[#F5F5F5] text-base font-bold uppercase tracking-wider neon-text">
          Товары не найдены
        </p>
        <p className="text-[#9CA3AF] text-sm">
          Попробуйте изменить параметры поиска
        </p>
      </div>
    </GlassPanel>
  );
}

import { Minus, Plus, Trash2 } from "lucide-react";
import { GlassPanel } from "@/shared/ui/glass-panel";
import type { CartItem } from "@/shared/types";

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

export function CartItemComponent({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemProps) {
  return (
    <GlassPanel className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/3 border-white/10 hover:border-red-500/20 transition-all duration-300">
      <button
        onClick={() => onRemoveItem(item.product.id)}
        className="absolute top-3 right-3 p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
        aria-label="Удалить"
      >
        <Trash2 size={16} />
      </button>

      <div className="flex gap-4 p-4">
        <div className="w-20 h-20 shrink-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl overflow-hidden border border-white/10 shadow-lg">
          <img
            src={item.product.picture}
            alt={item.product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0 pr-10">
          <h3 className="text-sm font-semibold text-zinc-100 truncate">
            {item.product.name}
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Артикул: {item.product.id}
          </p>

          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() =>
                onUpdateQuantity(item.product.id, item.quantity - 1)
              }
              className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-zinc-400 hover:text-zinc-200 transition-all hover:scale-105"
              aria-label="Уменьшить"
            >
              <Minus size={14} />
            </button>
            <div className="w-10 h-8 flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
              <span className="text-sm font-semibold text-zinc-200">
                {item.quantity}
              </span>
            </div>
            <button
              onClick={() =>
                onUpdateQuantity(item.product.id, item.quantity + 1)
              }
              className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-zinc-400 hover:text-zinc-200 transition-all hover:scale-105"
              aria-label="Увеличить"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        <div className="text-right mt-auto flex flex-col justify-between">
          <div>
            <p className="text-base font-bold text-zinc-100">
              {(item.product.price * item.quantity).toLocaleString("ru-RU")} ₽
            </p>
            <p className="text-xs text-zinc-500">
              {item.product.price.toLocaleString("ru-RU")} ₽/шт
            </p>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

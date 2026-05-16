import { X, ShoppingBag } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { CartItem } from "@/shared/types";
import { CartItemComponent } from "./cart-item/cart-item";
import { CartEmpty } from "./cart-empty/cart-empty";
import { CartTotal } from "./cart-total/cart-total";
import { CartForm } from "./cart-form/cart-form";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onSubmit: (data: { email: string; comment: string }) => void;
}

export function CartSidebar({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onSubmit,
}: CartSidebarProps) {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[420px] z-50",
          "bg-gradient-to-b from-zinc-900/98 to-zinc-900/95 backdrop-blur-xl border-l border-white/10",
          "transform transition-transform duration-300 ease-out shadow-2xl shadow-black/50",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-gradient-to-r from-red-900/20 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-900/40 to-red-950/40 border border-red-800/30 flex items-center justify-center">
                <ShoppingBag size={20} className="text-red-300" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-zinc-100">Заявка</h2>
                <p className="text-xs text-zinc-500">{items.length} товаров</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-white/5 rounded-lg transition-all duration-200"
              aria-label="Закрыть"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            {items.length === 0 ? (
              <CartEmpty />
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <CartItemComponent
                    key={item.product.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemoveItem={onRemoveItem}
                  />
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-white/10 px-5 py-5 bg-gradient-to-b from-transparent to-zinc-900/50">
              <CartTotal total={total} />
              <CartForm onSubmit={onSubmit} />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

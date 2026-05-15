import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Mail,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { GlassPanel } from "@/shared/ui/glass-panel";
import { cn } from "@/shared/lib/cn";
import type { CartItem } from "@/shared/types";

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[420px] z-50",
          "bg-gradient-to-b from-zinc-900/98 to-zinc-900/95 backdrop-blur-xl border-l border-white/10",
          "transform transition-transform duration-300 ease-out shadow-2xl shadow-black/50",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header - Premium Style */}
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

          {/* Items list */}
          <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <ShoppingBag size={40} className="text-zinc-600" />
                </div>
                <p className="text-zinc-400 text-base font-medium">
                  Заявка пуста
                </p>
                <p className="text-zinc-600 text-sm mt-2">
                  Добавьте товары из каталога
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <GlassPanel
                    key={item.product.id}
                    className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/3 border-white/10 hover:border-red-500/20 transition-all duration-300"
                  >
                    {/* Remove button */}
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="absolute top-3 right-3 p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Удалить"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="flex gap-4 p-4">
                      {/* Image */}
                      <div className="w-20 h-20 shrink-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                        <img
                          src={item.product.picture}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 pr-10">
                        <h3 className="text-sm font-semibold text-zinc-100 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1">
                          Артикул: {item.product.id}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.quantity - 1,
                              )
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
                              onUpdateQuantity(
                                item.product.id,
                                item.quantity + 1,
                              )
                            }
                            className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-zinc-400 hover:text-zinc-200 transition-all hover:scale-105"
                            aria-label="Увеличить"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right mt-auto flex flex-col justify-between">
                        <div>
                          <p className="text-base font-bold text-zinc-100">
                            {(
                              item.product.price * item.quantity
                            ).toLocaleString("ru-RU")}{" "}
                            ₽
                          </p>
                          <p className="text-xs text-zinc-500">
                            {item.product.price.toLocaleString("ru-RU")} ₽/шт
                          </p>
                        </div>
                      </div>
                    </div>
                  </GlassPanel>
                ))}
              </div>
            )}
          </div>

          {/* Footer form - Premium Style */}
          {items.length > 0 && (
            <div className="border-t border-white/10 px-5 py-5 bg-gradient-to-b from-transparent to-zinc-900/50">
              {/* Total */}
              <GlassPanel className="mb-4 p-4 bg-gradient-to-r from-red-900/10 to-transparent border-red-800/20">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-sm font-medium">
                    Итого:
                  </span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-red-300 to-red-400 bg-clip-text text-transparent">
                    {total.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
              </GlassPanel>

              {/* Comment field */}
              <div className="mb-3">
                <label className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                  <MessageSquare size={14} />
                  Комментарий
                </label>
                <textarea
                  placeholder="Сроки, вопросы..."
                  rows={2}
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/30 resize-none transition-all duration-200"
                />
              </div>

              {/* Email field */}
              <div className="mb-4">
                <label className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                  <Mail size={14} />
                  E-mail для связи
                </label>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  className="h-11 bg-white/5 backdrop-blur-xl border-white/10 focus:border-red-500/30 focus:ring-red-500/30"
                />
              </div>

              {/* Submit button */}
              <Button
                variant="primary"
                size="md"
                className="w-full h-12 text-base font-semibold shadow-lg shadow-red-900/20 hover:shadow-red-900/30 transition-all duration-300 hover:scale-[1.02]"
                onClick={() => onSubmit({ email: "", comment: "" })}
              >
                Отправить заявку
              </Button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

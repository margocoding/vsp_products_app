import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/lib/cn';
import type { CartItem } from '@/shared/types';

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
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-full w-full sm:w-96 z-50',
          'bg-zinc-900/95 backdrop-blur-xl border-l border-white/10',
          'transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-zinc-100">Заявка</h2>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-200 transition-colors"
              aria-label="Закрыть"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Items list */}
          <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-zinc-500 text-sm">Заявка пуста</p>
                <p className="text-zinc-600 text-xs mt-1">Добавьте товары из каталога</p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="relative group bg-white/3 backdrop-blur-sm border border-white/8 rounded-lg p-3"
                  >
                    {/* Remove button */}
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="absolute top-2 right-2 p-1 text-zinc-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      aria-label="Удалить"
                    >
                      <Trash2 size={14} />
                    </button>
                    
                    <div className="flex gap-3">
                      {/* Image */}
                      <div className="w-16 h-16 shrink-0 bg-white/5 rounded-md overflow-hidden">
                        <img
                          src={item.product.picture}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-zinc-100 truncate pr-4">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-zinc-500 truncate">
                          Артикул: {item.product.id}
                        </p>
                        
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-zinc-400 hover:text-zinc-200 transition-colors"
                            aria-label="Уменьшить"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm text-zinc-300 w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-zinc-400 hover:text-zinc-200 transition-colors"
                            aria-label="Увеличить"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm font-medium text-zinc-100">
                          {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽
                        </p>
                        <p className="text-xs text-zinc-500">
                          {item.product.price.toLocaleString('ru-RU')} ₽/шт
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer form */}
          {items.length > 0 && (
            <div className="border-t border-white/10 px-4 py-4 bg-zinc-900/50">
              {/* Total */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-zinc-400 text-sm">Итого:</span>
                <span className="text-lg font-bold text-zinc-100">
                  {total.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              
              {/* Comment field */}
              <div className="mb-3">
                <textarea
                  placeholder="Сроки, вопросы..."
                  rows={2}
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/30 resize-none"
                />
              </div>
              
              {/* Email field */}
              <div className="mb-4">
                <Input
                  type="email"
                  placeholder="E-mail для связи"
                  className="h-10"
                />
              </div>
              
              {/* Submit button */}
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => onSubmit({ email: '', comment: '' })}
              >
                Отправить
              </Button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

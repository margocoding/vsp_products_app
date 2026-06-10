import { ShoppingCart, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  onCartToggle: () => void;
  cartItemsCount: number;
}

export default function Header({ onMenuToggle, onCartToggle, cartItemsCount }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-3 md:p-4">
      <div className="glass-card px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={onMenuToggle}
            className="md:hidden text-white/70 hover:text-white transition-colors p-1 -ml-1"
            aria-label="Toggle menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 border border-red-500 flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-red-500/20" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-wider">RAILCORE</h1>
              <p className="text-[9px] md:text-[10px] text-white/50 tracking-widest uppercase hidden sm:block">
                Infrastructure Systems
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={onCartToggle}
            className="relative text-white/60 hover:text-white transition-colors p-1"
          >
            <ShoppingCart size={18} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
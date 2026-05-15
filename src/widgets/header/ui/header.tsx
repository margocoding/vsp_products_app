import { ShoppingCart, Phone, Menu, X } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/cn';

interface HeaderProps {
  cartCount: number;
  onMenuToggle?: () => void;
  onCartToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export function Header({ cartCount, onMenuToggle, onCartToggle, isMobileMenuOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-gradient-to-r from-zinc-900/98 via-zinc-900/95 to-zinc-900/98 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            {/* Left side - Logo and Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              {/* Mobile Menu Button */}
              <button
                onClick={onMenuToggle}
                className="lg:hidden p-2 -ml-2 text-zinc-400 hover:text-red-300 transition-colors duration-200"
                aria-label="Меню"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              
              {/* Logo */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-red-800/80 to-red-950/80 flex items-center justify-center shadow-lg shadow-red-950/30 flex-shrink-0 border border-red-700/30">
                  <span className="text-white font-bold text-lg sm:text-xl">Л</span>
                </div>
                <div className="min-w-0">
                  <h1 className="text-base sm:text-xl font-bold text-zinc-100 truncate tracking-tight">ООО «ЛСК-НН»</h1>
                  <p className="text-xs text-zinc-500 hidden sm:block">Премиальные ЖД материалы ВСП</p>
                </div>
              </div>
              
              {/* Phone - Desktop only */}
              <a 
                href="tel:+79995448055"
                className="hidden lg:flex items-center gap-2.5 text-zinc-400 hover:text-red-300 transition-colors duration-200 ml-2 pl-4 border-l border-white/10"
              >
                <Phone size={18} className="text-red-400/80" />
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-zinc-300">+7 999 544 80 55</span>
                  <span className="text-xs text-zinc-500">Отдел продаж</span>
                </div>
              </a>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Button 
                variant="primary" 
                size="md" 
                className="relative shrink-0 cursor-pointer !rounded-xl !px-5 !py-2.5 shadow-xl shadow-red-900/25 hover:shadow-red-900/40 transition-all duration-300 hover:scale-105"
                onClick={onCartToggle}
              >
                <ShoppingCart size={18} className="sm:mr-2" />
                <span className="hidden sm:inline font-semibold">Заявка</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full shadow-lg shadow-red-900/30 border border-red-500/30">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

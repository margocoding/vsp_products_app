import { ShoppingCart, Phone } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/cn';

interface HeaderProps {
  cartCount: number;
  onCartToggle?: () => void;
}

export function Header({ cartCount, onCartToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-white/3 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            {/* Left side - Logo */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              {/* Logo */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-red-900/70 to-red-950/70 flex items-center justify-center shadow-md shadow-red-950/20 flex-shrink-0">
                  <span className="text-white font-bold text-base sm:text-lg">Л</span>
                </div>
                <div className="min-w-0">
                  <h1 className="text-sm sm:text-lg font-bold text-zinc-100 truncate">ООО «ЛСК-НН»</h1>
                  <p className="text-xs text-zinc-400 hidden sm:block">Железнодорожные материалы ВСП</p>
                </div>
              </div>
              
              {/* Phone - Desktop only */}
              <a 
                href="tel:+79995448055"
                className="hidden lg:flex items-center gap-2 text-zinc-400 hover:text-red-300 transition-colors duration-200 ml-2"
              >
                <Phone size={16} />
                <span className="font-medium">+7 999 544 80 55</span>
              </a>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Button 
                variant="glass" 
                size="sm" 
                className="relative shrink-0 cursor-pointer"
                onClick={onCartToggle}
              >
                <ShoppingCart size={16} className="sm:mr-2" />
                <span className="hidden sm:inline">Заявка</span>
                {cartCount > 0 && (
                  <span className="ml-1.5 px-2 py-0.5 text-xs bg-red-900/70 text-red-200 rounded-full">
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

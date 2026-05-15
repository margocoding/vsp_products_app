import { useState } from 'react';
import { Search, ShoppingCart, Phone, Menu, X } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/lib/cn';

interface HeaderProps {
  totalProducts: number;
  cartCount: number;
  onSearch: (query: string) => void;
  onMenuToggle?: () => void;
  onCartToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export function Header({ totalProducts, cartCount, onSearch, onMenuToggle, onCartToggle, isMobileMenuOpen }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-white/3 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            {/* Left side - Logo and Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              {/* Mobile Menu Button */}
              <button
                onClick={onMenuToggle}
                className="lg:hidden p-2 -ml-2 text-zinc-400 hover:text-zinc-200 transition-colors"
                aria-label="Меню"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              
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

            {/* Search - Hidden on small mobile, visible on md+ */}
            <div className="hidden sm:block flex-1 max-w-xl">
              <Input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={handleSearchChange}
                icon={<Search size={18} />}
                className="h-11"
              />
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Product count - Hidden on mobile */}
              <div className="hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/3 backdrop-blur-sm rounded-lg border border-white/6">
                <span className="text-zinc-400 text-sm">{totalProducts}</span>
                <span className="text-zinc-500 text-sm hidden lg:inline">товаров</span>
              </div>
              
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
          
          {/* Mobile Search - Visible only on mobile */}
          <div className="sm:hidden mt-3">
            <Input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={handleSearchChange}
              icon={<Search size={16} />}
              className="h-10"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

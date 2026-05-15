import { useState } from 'react';
import { Search, ShoppingCart, Phone } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/lib/cn';

interface HeaderProps {
  totalProducts: number;
  cartCount: number;
  onSearch: (query: string) => void;
}

export function Header({ totalProducts, cartCount, onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-white/3 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo and Phone */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-900/70 to-red-950/70 flex items-center justify-center shadow-md shadow-red-950/20">
                  <span className="text-white font-bold text-lg">Л</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-zinc-100">ООО «ЛСК-НН»</h1>
                  <p className="text-xs text-zinc-400">Железнодорожные материалы ВСП</p>
                </div>
              </div>
              
              <a 
                href="tel:+79995448055"
                className="hidden lg:flex items-center gap-2 text-zinc-400 hover:text-red-300 transition-colors duration-200"
              >
                <Phone size={16} />
                <span className="font-medium">+7 999 544 80 55</span>
              </a>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-xl">
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
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/3 backdrop-blur-sm rounded-lg border border-white/6">
                <span className="text-zinc-400 text-sm">{totalProducts}</span>
                <span className="text-zinc-500 text-sm">товаров</span>
              </div>
              
              <Button variant="glass" size="md" className="relative">
                <ShoppingCart size={18} className="mr-2" />
                Заявка {cartCount > 0 && (
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

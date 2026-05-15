import { ShoppingCart, Phone, Menu, X, Search } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/cn";

interface HeaderProps {
  cartCount: number;
  onMenuToggle?: () => void;
  onCartToggle?: () => void;
  isMobileMenuOpen?: boolean;
  searchQuery: string;
  onSearch: (query: string) => void;
}

export function Header({
  cartCount,
  onMenuToggle,
  onCartToggle,
  isMobileMenuOpen,
  searchQuery,
  onSearch,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-zinc-950/95 backdrop-blur-xl border-b border-white/8 shadow-xl shadow-black/30">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left side - Logo and Mobile Menu */}
            <div className="flex items-center gap-3 min-w-[200px]">
              {/* Mobile Menu Button */}
              <button
                onClick={onMenuToggle}
                className="lg:hidden p-2 -ml-2 text-zinc-400 hover:text-white transition-colors duration-200"
                aria-label="Меню"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>

              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-red-700 flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-white font-bold text-base sm:text-lg">
                    Л
                  </span>
                </div>
                <div className="min-w-0 hidden sm:block">
                  <h1 className="text-sm font-bold text-white tracking-tight">
                    ООО «ЛСК-НН»
                  </h1>
                  <p className="text-xs text-zinc-500 truncate">
                    ЖД материалы ВСП
                  </p>
                </div>
              </div>
            </div>

            {/* Center - Search */}
            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  icon={<Search size={16} />}
                  className="h-9 !rounded-lg !bg-zinc-900/50 !border-zinc-800 focus:!border-red-900/50 focus:!ring-red-900/30 text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Right side - Phone and Cart */}
            <div className="flex items-center gap-3">
              {/* Phone - Desktop only */}
              <a
                href="tel:+79995448055"
                className="hidden lg:flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200"
              >
                <Phone size={16} className="text-red-500" />
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-white">
                    +7 999 544 80 55
                  </span>
                </div>
              </a>

              <Button
                variant="primary"
                size="sm"
                className="relative shrink-0 cursor-pointer !rounded-lg !px-4 !py-2 shadow-lg shadow-red-900/20 hover:shadow-red-900/30 transition-all duration-200 hover:scale-105"
                onClick={onCartToggle}
              >
                <ShoppingCart size={16} className="sm:mr-1.5" />
                <span className="hidden sm:inline font-semibold">Заявка</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center text-xs font-bold bg-red-600 text-white rounded-full shadow-lg shadow-red-900/30">
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

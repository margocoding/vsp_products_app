import { Button } from "@/shared/ui/button";
import { GlassPanel } from "@/shared/ui/glass-panel";
import { Input } from "@/shared/ui/input";
import { Menu, Phone, Search, ShoppingCart, X } from "lucide-react";

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
      <GlassPanel
        variant="navbar"
        className="rounded-none border-t-0 border-l-0 border-r-0"
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left side - Logo and Mobile Menu */}
            <div className="flex items-center gap-3 min-w-[200px]">
              {/* Mobile Menu Button */}
              <button
                onClick={onMenuToggle}
                className="lg:hidden p-2 -ml-2 text-[#9CA3AF] hover:text-[#FF2B2B] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,43,43,0.3)] rounded-lg"
                aria-label="Меню"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>

              {/* Logo */}
              <div className="flex items-center gap-2.5 group cursor-pointer">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#FF2B2B] to-[#D1001F] flex items-center justify-center shadow-lg shadow-[rgba(255,43,43,0.4)] group-hover:shadow-xl group-hover:shadow-[rgba(255,43,43,0.6)] transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="text-white font-bold text-lg sm:text-xl relative z-10">
                    Л
                  </span>
                </div>
                <div className="min-w-0 hidden sm:block">
                  <h1 className="text-sm font-bold text-[#F5F5F5] tracking-wider uppercase neon-text group-hover:text-[#FF2B2B] transition-colors duration-300">
                    ООО «ЛСК-НН»
                  </h1>
                  <p className="text-[10px] text-[#9CA3AF] uppercase tracking-widest truncate">
                    ЖД материалы ВСП
                  </p>
                </div>
              </div>
            </div>

            {/* Center - Search */}
            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative group">
                <Input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  icon={<Search size={16} />}
                  variant="neon"
                  className="h-10 !rounded-xl text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#6B7280] hover:text-[#FF2B2B] transition-all duration-200 hover:scale-110"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Right side - Phone, Language and Cart */}
            <div className="flex items-center gap-3">
              {/* Phone - Desktop only */}
              <a
                href="tel:+79995448055"
                className="hidden lg:flex items-center gap-2 text-[#9CA3AF] hover:text-[#FF2B2B] transition-all duration-300 group"
              >
                <div className="p-2 rounded-lg bg-[rgba(255,43,43,0.1)] group-hover:bg-[rgba(255,43,43,0.2)] transition-all duration-300">
                  <Phone size={16} className="text-[#FF2B2B]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-[#F5F5F5] group-hover:text-[#FF2B2B] transition-colors duration-300">
                    +7 999 544 80 55
                  </span>
                </div>
              </a>

              <Button
                variant="primary"
                size="sm"
                className="relative shrink-0 cursor-pointer !rounded-xl !px-4 !py-2.5 shadow-lg shadow-[rgba(255,43,43,0.3)] hover:shadow-xl hover:shadow-[rgba(255,43,43,0.5)] transition-all duration-300 hover:scale-105 group flex items-center"
                onClick={onCartToggle}
              >
                <ShoppingCart size={16} className="sm:mr-1.5" />
                <span className="hidden sm:inline font-semibold uppercase tracking-wide">
                  Заявка
                </span>
                {cartCount > 0 && (
                  <span className="min-w-[22px] h-[22px] px-1 flex items-center justify-center bg-white text-[#FF2B2B] text-xs font-bold rounded-full border border-red-200 shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile search bar */}
          <div className="mt-3 md:hidden">
            <div className="relative">
              <Input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                icon={<Search size={16} />}
                variant="neon"
                className="h-10 !rounded-xl text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#6B7280] hover:text-[#FF2B2B] transition-all duration-200"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </GlassPanel>
    </header>
  );
}

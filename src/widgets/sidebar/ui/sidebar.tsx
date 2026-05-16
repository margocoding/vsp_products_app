import { Layers, TrendingUp, X } from "lucide-react";
import type { Category } from "@/shared/types";
import { GlassPanel } from "@/shared/ui/glass-panel";
import { cn } from "@/shared/lib/cn";
import { CategoryItem } from "./category-item/category-item";

interface SidebarProps {
  categories: Category[];
  activeCategoryId: number | null;
  activeSubcategoryId: number | null;
  onSelectCategory: (categoryId: number | null) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({
  categories,
  activeCategoryId,
  activeSubcategoryId,
  onSelectCategory,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 shrink-0 transition-transform duration-300 xl:w-72",
          "lg:static lg:z-auto lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <GlassPanel
          variant="sidebar"
          className="h-full rounded-none border-b-0 border-r border-r-white/[0.05] border-t-0"
        >
          <div className="sticky top-[73px] flex h-[calc(100vh-73px)] flex-col">
            <div className="flex items-center justify-between border-b border-white/[0.05] p-4 lg:hidden">
              <div className="flex items-center gap-2">
                <Layers size={15} className="text-[#FF2B2B]" />

                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                  Категории
                </h2>
              </div>

              <button
                onClick={onClose}
                className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/[0.04] hover:text-white"
                aria-label="Закрыть меню"
              >
                <X size={16} />
              </button>
            </div>

            <div className="hidden border-b border-white/[0.05] p-5 lg:block">
              <div className="flex items-center gap-2">
                <Layers size={14} className="text-[#FF2B2B]" />

                <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
                  Навигация
                </h2>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[10px] text-white/35">
                <TrendingUp size={11} />

                <span>{categories.length} категорий</span>
              </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto p-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
              {categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  isActive={
                    activeCategoryId === category.id && !activeSubcategoryId
                  }
                  activeSubcategoryId={activeSubcategoryId}
                  onSelect={onSelectCategory}
                />
              ))}
            </nav>
          </div>
        </GlassPanel>
      </aside>
    </>
  );
}

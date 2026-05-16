import { useState } from "react";
import { ChevronRight, X, Layers, TrendingUp } from "lucide-react";
import { GlassPanel } from "@/shared/ui/glass-panel";
import { cn } from "@/shared/lib/cn";
import type { Category } from "@/shared/types";

interface CategoryItemProps {
  category: Category;
  isActive: boolean;
  activeSubcategoryId: number | null;
  onSelect: (categoryId: number) => void;
}

function CategoryItem({
  category,
  isActive,
  activeSubcategoryId,
  onSelect,
}: CategoryItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = category.children && category.children.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      onSelect(category.id);
    }
  };

  const handleSubcategorySelect = (e: React.MouseEvent, categoryId: number) => {
    e.stopPropagation();
    onSelect(categoryId);
  };

  // Check if any child is active
  const hasActiveChild = category.children?.some(
    (child) => activeSubcategoryId === child.id,
  );

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-300 min-w-full group select-none relative overflow-hidden",
          isActive || hasActiveChild
            ? "bg-[rgba(255,43,43,0.15)] border border-[rgba(255,43,43,0.4)] shadow-lg shadow-[rgba(255,43,43,0.15)]"
            : "hover:bg-[rgba(255,43,43,0.08)] hover:border-[rgba(255,43,43,0.2)] border border-transparent",
        )}
        onClick={handleClick}
      >
        {/* Animated glow background for active state */}
        {(isActive || hasActiveChild) && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF2B2B]/10 to-transparent opacity-50" />
        )}

        {/* Icon/Indicator */}
        <div className="w-4 shrink-0 flex items-center justify-center relative z-10">
          {hasChildren ? (
            <ChevronRight
              size={14}
              className={cn(
                "transition-all duration-300",
                isExpanded
                  ? "text-[#FF2B2B] rotate-90"
                  : "text-[#6B7280] group-hover:text-[#FF2B2B]",
              )}
            />
          ) : (
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                isActive
                  ? "bg-[#FF2B2B] shadow-[0_0_10px_#FF2B2B]"
                  : "bg-[#6B7280] group-hover:bg-[#FF2B2B]",
              )}
            />
          )}
        </div>

        {/* Text */}
        <span
          className={cn(
            "text-xs font-medium uppercase tracking-wide transition-all duration-300 relative z-10",
            isActive || hasActiveChild
              ? "text-[#FF2B2B] neon-text"
              : "text-[#9CA3AF] group-hover:text-[#F5F5F5]",
          )}
        >
          {category.name}
        </span>
      </div>

      {/* Children categories */}
      {hasChildren && isExpanded && (
        <div className="ml-4 pl-4 border-l border-[rgba(255,43,43,0.15)] space-y-1 mt-1">
          {category.children!.map((child) => (
            <div
              key={child.id}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 min-w-full group select-none relative overflow-hidden",
                activeSubcategoryId === child.id
                  ? "bg-[rgba(255,43,43,0.2)] border border-[rgba(255,43,43,0.5)] shadow-md shadow-[rgba(255,43,43,0.2)]"
                  : "hover:bg-[rgba(255,43,43,0.08)] hover:border-[rgba(255,43,43,0.2)] border border-transparent",
              )}
              onClick={(e) => handleSubcategorySelect(e, child.id)}
            >
              {/* Empty space for alignment */}
              <div className="w-4 shrink-0" />

              {/* Active indicator dot */}
              <div
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-300",
                  activeSubcategoryId === child.id
                    ? "bg-[#FF2B2B] shadow-[0_0_8px_#FF2B2B]"
                    : "bg-[#6B7280] group-hover:bg-[#FF2B2B]",
                )}
              />

              <span
                className={cn(
                  "text-xs font-medium uppercase tracking-wide transition-all duration-300",
                  activeSubcategoryId === child.id
                    ? "text-[#FF2B2B] neon-text"
                    : "text-[#9CA3AF] group-hover:text-[#F5F5F5]",
                )}
              >
                {child.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "w-72 shrink-0 lg:block",
          "fixed lg:static top-0 left-0 h-full lg:h-auto z-50 lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <GlassPanel
          variant="sidebar"
          className="rounded-none border-t-0 border-b-0 border-r-0 lg:rounded-none h-full"
        >
          <div className="sticky top-[73px] lg:top-[73px] h-[calc(100vh-73px)] lg:h-auto">
            {/* Mobile close button */}
            <div className="flex items-center justify-between mb-4 lg:hidden p-3 border-b border-[rgba(255,43,43,0.15)]">
              <h2 className="text-sm font-bold text-[#F5F5F5] uppercase tracking-wider flex items-center gap-2">
                <Layers size={16} className="text-[#FF2B2B]" />
                Категории
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-[#9CA3AF] hover:text-[#FF2B2B] transition-colors"
                aria-label="Закрыть меню"
              >
                <X size={18} />
              </button>
            </div>

            {/* Header */}
            <div className="hidden lg:block p-4 border-b border-[rgba(255,43,43,0.1)]">
              <h2 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-[0.2em] flex items-center gap-2">
                <Layers size={14} className="text-[#FF2B2B]" />
                Навигация
              </h2>

              {/* Mini stat widget */}
              <div className="mt-3 flex items-center gap-2 text-[10px] text-[#6B7280]">
                <TrendingUp size={12} className="text-[#FF2B2B]" />
                <span>{categories.length} категорий</span>
              </div>
            </div>

            {/* Categories list */}
            <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-80px)] scrollbar-thin scrollbar-thumb-[#D1001F] scrollbar-track-transparent">
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

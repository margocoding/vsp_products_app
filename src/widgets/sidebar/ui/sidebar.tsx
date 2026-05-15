import { useState } from "react";
import { ChevronRight, X } from "lucide-react";
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

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 min-w-full group select-none relative",
          isActive
            ? "bg-red-900/30 border border-red-900/40"
            : "hover:bg-white/5 hover:border-white/8 border border-transparent",
        )}
        onClick={handleClick}
      >
        {/* Иконка Chevron или пустое место */}
        <div className="w-4 shrink-0 flex items-center justify-center">
          {hasChildren && (
            <ChevronRight
              size={14}
              className={cn(
                "text-zinc-500 group-hover:text-zinc-300 transition-transform duration-200",
                isExpanded && "rotate-90",
              )}
            />
          )}
        </div>

        {/* Текст категории */}
        <span
          className={cn(
            "text-xs font-medium transition-colors duration-200",
            isActive
              ? "text-red-400"
              : "text-zinc-400 group-hover:text-zinc-200",
          )}
        >
          {category.name}
        </span>
      </div>

      {/* Дочерние категории */}
      {hasChildren && isExpanded && (
        <div className="ml-4 pl-4 border-l border-white/5 space-y-1 mt-1">
          {category.children!.map((child) => (
            <div
              key={child.id}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 min-w-full group select-none relative",
                activeSubcategoryId === child.id
                  ? "bg-red-900/30 border border-red-900/40"
                  : "hover:bg-white/5 hover:border-white/8 border border-transparent",
              )}
              onClick={(e) => handleSubcategorySelect(e, child.id)}
            >
              {/* Пустое место под Chevron */}
              <div className="w-4 shrink-0" />
              <span
                className={cn(
                  "text-xs font-medium transition-colors duration-200",
                  activeSubcategoryId === child.id
                    ? "text-red-400"
                    : "text-zinc-400 group-hover:text-zinc-200",
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
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside className={cn(
        "w-64 shrink-0 lg:block",
        "fixed lg:static top-0 left-0 h-full lg:h-auto z-50 lg:z-auto",
        "transform transition-transform duration-300 lg:transform-none",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="sticky top-[73px] lg:top-[73px] h-[calc(100vh-73px)] lg:h-auto">
          <div className="h-full bg-zinc-950/50 backdrop-blur-xl border-r border-white/5 p-3 lg:m-0 lg:rounded-none lg:border-t-0">
            {/* Mobile close button */}
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <h2 className="text-sm font-semibold text-zinc-200 px-2">Категории</h2>
              <button
                onClick={onClose}
                className="p-2 text-zinc-500 hover:text-zinc-200 transition-colors"
                aria-label="Закрыть меню"
              >
                <X size={18} />
              </button>
            </div>
            
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2 hidden lg:block">
              Категории
            </h2>

            <nav className="space-y-1 overflow-y-auto h-[calc(100%-40px)] scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
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
        </div>
      </aside>
    </>
  );
}

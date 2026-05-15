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
  const hasChildren = category.children && category.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      // Expand handled by parent
    } else {
      onSelect(category.id);
    }
  };

  const handleSubcategorySelect = (e: React.MouseEvent, categoryId: number) => {
    e.stopPropagation();
    onSelect(categoryId);
  };

  return (
    <div className="flex-shrink-0">
      <div
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200",
          "group select-none whitespace-nowrap",
          isActive
            ? "bg-gradient-to-r from-red-900/60 to-red-950/60 border border-red-500/30 shadow-lg shadow-red-900/20"
            : "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/20"
        )}
        onClick={handleClick}
      >
        {/* Chevron icon for categories with children */}
        {hasChildren && (
          <ChevronRight
            size={14}
            className={cn(
              "text-zinc-400 group-hover:text-zinc-300 transition-colors duration-200"
            )}
          />
        )}

        {/* Category text */}
        <span
          className={cn(
            "text-sm font-medium transition-colors duration-200",
            isActive
              ? "text-red-200"
              : "text-zinc-300 group-hover:text-zinc-100"
          )}
        >
          {category.name}
        </span>
      </div>
    </div>
  );
}

interface SubcategoryBarProps {
  subcategories: Category[];
  activeSubcategoryId: number | null;
  onSelectCategory: (categoryId: number) => void;
}

function SubcategoryBar({
  subcategories,
  activeSubcategoryId,
  onSelectCategory,
}: SubcategoryBarProps) {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
      <div className="flex items-center gap-2 min-w-max px-1">
        <button
          onClick={() => onSelectCategory(null)}
          className={cn(
            "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap",
            activeSubcategoryId === null
              ? "bg-gradient-to-r from-red-900/60 to-red-950/60 border border-red-500/30 text-red-200 shadow-lg shadow-red-900/20"
              : "bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-zinc-200"
          )}
        >
          Все
        </button>
        {subcategories.map((subcat) => (
          <button
            key={subcat.id}
            onClick={() => onSelectCategory(subcat.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap",
              activeSubcategoryId === subcat.id
                ? "bg-gradient-to-r from-red-900/60 to-red-950/60 border border-red-500/30 text-red-200 shadow-lg shadow-red-900/20"
                : "bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-zinc-200"
            )}
          >
            {subcat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

interface CategoryBarProps {
  categories: Category[];
  activeCategoryId: number | null;
  activeSubcategoryId: number | null;
  onSelectCategory: (categoryId: number | null) => void;
}

export function CategoryBar({
  categories,
  activeCategoryId,
  activeSubcategoryId,
  onSelectCategory,
}: CategoryBarProps) {
  // Find the active category's children for subcategory bar
  const activeCategory = categories.find(cat => cat.id === activeCategoryId);
  const showSubcategories = activeCategory?.children && activeCategory.children.length > 0;

  return (
    <div className="sticky top-[73px] z-40 bg-gradient-to-b from-zinc-900/98 to-zinc-900/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-3">
        {/* Main Categories - Horizontal scroll */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2 min-w-max">
            {/* All button */}
            <button
              onClick={() => {
                onSelectCategory(null);
              }}
              className={cn(
                "px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-2",
                activeCategoryId === null && activeSubcategoryId === null
                  ? "bg-gradient-to-r from-red-900/60 to-red-950/60 border border-red-500/30 text-red-200 shadow-lg shadow-red-900/20"
                  : "bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-zinc-200"
              )}
            >
              <span>Все категории</span>
            </button>
            
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                isActive={activeCategoryId === category.id && !activeSubcategoryId}
                activeSubcategoryId={activeSubcategoryId}
                onSelect={(id) => {
                  onSelectCategory(id);
                }}
              />
            ))}
          </div>
        </div>

        {/* Subcategories - shown when a category with children is selected */}
        {showSubcategories && (
          <div className="mt-2 pt-2 border-t border-white/8">
            <SubcategoryBar
              subcategories={activeCategory!.children!}
              activeSubcategoryId={activeSubcategoryId}
              onSelectCategory={onSelectCategory}
            />
          </div>
        )}
      </div>
    </div>
  );
}

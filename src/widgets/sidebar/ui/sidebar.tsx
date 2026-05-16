import { cn } from "@/shared/lib/cn";
import type { Category } from "@/shared/types";
import { GlassPanel } from "@/shared/ui/glass-panel";
import { Layers, TrendingUp, X, ChevronDown } from "lucide-react";
import { useState } from "react";

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

  const hasActiveChild = category.children?.some(
    (child) => child.id === activeSubcategoryId,
  );

  const active = isActive || hasActiveChild;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (hasChildren) {
      setIsExpanded((prev) => !prev);
    } else {
      onSelect(category.id);
    }
  };

  const handleSubcategorySelect = (e: React.MouseEvent, categoryId: number) => {
    e.stopPropagation();
    onSelect(categoryId);
  };

  return (
    <div className="space-y-1">
      {/* Parent Category */}
      <div
        onClick={handleClick}
        className={cn(
          "group relative flex items-center justify-between rounded-xl px-3 py-2.5",
          "cursor-pointer select-none overflow-hidden",
          "border transition-all duration-200",
          "hover:bg-white/[0.035]",
          active
            ? "bg-white/[0.045] border-white/[0.08]"
            : "border-transparent",
        )}
      >
        {/* Left Accent */}
        <div
          className={cn(
            "absolute left-0 top-2 bottom-2 w-[2px] rounded-full transition-all duration-300",
            active
              ? "bg-[#FF2B2B] opacity-100"
              : "bg-[#FF2B2B] opacity-0 group-hover:opacity-60",
          )}
        />

        {/* Content */}
        <div className="flex items-center gap-2.5 relative z-10">
          <span
            className={cn(
              "text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200",
              active ? "text-white" : "text-white/55 group-hover:text-white/85",
            )}
          >
            {category.name}
          </span>
        </div>

        {/* Expand Icon */}
        {hasChildren && (
          <ChevronDown
            size={14}
            className={cn(
              "relative z-10 transition-all duration-300",
              active
                ? "text-white/80"
                : "text-white/35 group-hover:text-white/60",
              isExpanded && "rotate-180",
            )}
          />
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="relative ml-3 pl-4 space-y-1">
          {/* Vertical Line */}
          <div className="absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {category.children!.map((child) => {
            const childActive = activeSubcategoryId === child.id;

            return (
              <div
                key={child.id}
                onClick={(e) => handleSubcategorySelect(e, child.id)}
                className={cn(
                  "group flex items-center gap-2.5 rounded-lg px-3 py-2",
                  "cursor-pointer border transition-all duration-200",
                  "hover:bg-white/[0.03]",
                  childActive
                    ? "bg-white/[0.04] border-white/[0.08]"
                    : "border-transparent",
                )}
              >
                {/* Dot */}
                <div
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-all duration-200",
                    childActive
                      ? "bg-[#FF2B2B]"
                      : "bg-white/20 group-hover:bg-white/40",
                  )}
                />

                {/* Text */}
                <span
                  className={cn(
                    "text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-200",
                    childActive
                      ? "text-white"
                      : "text-white/50 group-hover:text-white/80",
                  )}
                >
                  {child.name}
                </span>
              </div>
            );
          })}
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
      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
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
            {/* Mobile Header */}
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

            {/* Desktop Header */}
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

            {/* Categories */}
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

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Category } from "@/shared/types";
import { cn } from "@/shared/lib/cn";

interface CategoryItemProps {
  category: Category;
  isActive: boolean;
  activeSubcategoryId: number | null;
  onSelect: (categoryId: number) => void;
}

export function CategoryItem({
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
        <div
          className={cn(
            "absolute left-0 top-2 bottom-2 w-[2px] rounded-full transition-all duration-300",
            active
              ? "bg-[#FF2B2B] opacity-100"
              : "bg-[#FF2B2B] opacity-0 group-hover:opacity-60",
          )}
        />

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

      {hasChildren && isExpanded && (
        <div className="relative ml-3 pl-4 space-y-1">
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
                <div
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-all duration-200",
                    childActive
                      ? "bg-[#FF2B2B]"
                      : "bg-white/20 group-hover:bg-white/40",
                  )}
                />

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

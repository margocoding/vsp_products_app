import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { Category } from "@/shared/types";

interface CategoryItemProps {
  category: Category;
  isActive: boolean;
  onSelect: (categoryId: number) => void;
}

function CategoryItem({ category, isActive, onSelect }: CategoryItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div>
      <motion.div
        className={cn(
          "flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-300",
          "group select-none relative",
          isActive
            ? "bg-red-500/15 border border-red-500/40 shadow-lg shadow-red-500/10"
            : "hover:bg-white/5 hover:border-white/10 border border-transparent",
        )}
        onClick={() => {
          if (hasChildren) {
            setIsExpanded(!isExpanded);
          }
          onSelect(category.id);
        }}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        {hasChildren ? (
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-zinc-400 group-hover:text-zinc-300"
          >
            <ChevronRight size={16} />
          </motion.div>
        ) : (
          <div className="w-4" />
        )}

        <span
          className={cn(
            "text-sm font-medium transition-colors duration-300",
            isActive
              ? "text-red-400"
              : "text-zinc-300 group-hover:text-zinc-100",
          )}
        >
          {category.name}
        </span>
      </motion.div>

      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="ml-4 pl-4 border-l border-white/5 space-y-1 mt-1">
              {category.children!.map((child) => (
                <CategoryItem
                  key={child.id}
                  category={child}
                  isActive={isActive}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface SidebarProps {
  categories: Category[];
  activeCategoryId: number | null;
  onSelectCategory: (categoryId: number | null) => void;
}

export function Sidebar({
  categories,
  activeCategoryId,
  onSelectCategory,
}: SidebarProps) {
  return (
    <aside className="w-72 flex-shrink-0">
      <div className="sticky top-24">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4 px-2">
            Категории
          </h2>

          <nav className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                isActive={activeCategoryId === category.id || 
                  !!category.children?.some(c => c.id === activeCategoryId)}
                onSelect={onSelectCategory}
              />
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}

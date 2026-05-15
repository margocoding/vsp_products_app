import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import type { Category } from '@/shared/types';

interface CategoryItemProps {
  category: Category;
  isActive: boolean;
  onSelect: (categoryId: number) => void;
}

function CategoryItem({ category, isActive, onSelect }: CategoryItemProps) {
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

  const handleSubcategorySelect = (categoryId: number) => {
    onSelect(categoryId);
  };

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200',
          'group select-none relative',
          isActive 
            ? 'bg-red-500/10 border border-red-500/30' 
            : 'hover:bg-white/5 hover:border-white/10 border border-transparent'
        )}
        onClick={handleClick}
      >
        {hasChildren ? (
          <div
            className={cn(
              "text-zinc-400 group-hover:text-zinc-300 transition-transform duration-200",
              isExpanded && "rotate-90"
            )}
          >
            <ChevronRight size={16} />
          </div>
        ) : (
          <div className="w-4" />
        )}
        
        <span
          className={cn(
            'text-sm font-medium transition-colors duration-200',
            isActive ? 'text-red-400' : 'text-zinc-300 group-hover:text-zinc-100'
          )}
        >
          {category.name}
        </span>
      </div>

      {hasChildren && isExpanded && (
        <div className="ml-4 pl-4 border-l border-white/5 space-y-1 mt-1">
          {category.children!.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              isActive={isActive}
              onSelect={handleSubcategorySelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface SidebarProps {
  categories: Category[];
  activeCategoryId: number | null;
  onSelectCategory: (categoryId: number | null) => void;
}

export function Sidebar({ categories, activeCategoryId, onSelectCategory }: SidebarProps) {
  return (
    <aside className="w-72 flex-shrink-0">
      <div className="sticky top-24">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4 px-2">Категории</h2>
          
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

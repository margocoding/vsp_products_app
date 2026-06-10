'use client';

import { ChevronRight, ChevronDown, X } from 'lucide-react';
import { useCategoryStore } from '@/store/categoryStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const {
    categories,
    getRootCategories,
    getChildCategories,
    activeCategoryId,
    setActiveCategory,
    expandedCategoryIds,
    toggleExpanded,
  } = useCategoryStore();

  const rootCategories = getRootCategories();

  const handleCategoryClick = (id: number, hasChildren: boolean, isMobile: boolean) => {
    setActiveCategory(id);
    if (hasChildren) {
      toggleExpanded(id);
    }
    if (isMobile) {
      onClose();
    }
  };

  const renderCategory = (
    categoryId: number,
    isSubcategory: boolean = false,
    isMobile: boolean = false
  ) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return null;

    const children = getChildCategories(categoryId);
    const hasChildren = children.length > 0;
    const isActive = activeCategoryId === categoryId;
    const isExpanded = expandedCategoryIds.includes(categoryId);

    return (
      <div key={categoryId}>
        <button
          onClick={() => handleCategoryClick(categoryId, hasChildren, isMobile)}
          className={`sidebar-item w-full flex items-center justify-between px-4 py-3 text-xs tracking-wider transition-colors ${
            isActive ? 'active text-red-500' : 'text-white/50 hover:text-white'
          } ${isSubcategory ? 'pl-8' : ''}`}
        >
          <span className="text-left flex-1 truncate">{category.name}</span>
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown size={14} className="shrink-0 ml-2" />
            ) : (
              <ChevronRight size={14} className="shrink-0 ml-2" />
            )
          ) : isActive ? (
            <ChevronRight size={14} className="shrink-0 ml-2" />
          ) : null}
        </button>

        {/* Подкатегории */}
        {hasChildren && isExpanded && (
          <div className="space-y-0.5">
            {children.map((child) => renderCategory(child.id, true, isMobile))}
          </div>
        )}
      </div>
    );
  };

  const renderMenuItems = (isMobile: boolean) => (
    <div className="space-y-0.5">
      {rootCategories.map((cat) => renderCategory(cat.id, false, isMobile))}
    </div>
  );

  return (
    <>
      {/* Мобильный сайдбар */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-[60] w-96 bg-black/95 backdrop-blur-xl border-r border-white/10
          transform transition-transform duration-300 ease-in-out md:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <span className="text-xs tracking-widest text-white/50">МЕНЮ</span>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors p-1"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="p-4 overflow-y-auto overflow-x-hidden h-[calc(100%-65px)]">
          {renderMenuItems(true)}
        </nav>
      </aside>

      {/* Десктопный сайдбар */}
      <aside className="hidden md:block w-64 fixed left-0 top-24 bottom-0 z-40 px-4">
        <div className="glass-card p-4 h-full overflow-hidden flex flex-col">
          <nav className="flex-1 overflow-y-auto overflow-x-hidden space-y-0.5">
            {renderMenuItems(false)}
          </nav>
        </div>
      </aside>
    </>
  );
}
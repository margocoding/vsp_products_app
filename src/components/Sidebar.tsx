'use client';

import { ChevronRight, ChevronDown, X } from 'lucide-react';
import { useCategoryStore } from '@/store/categoryStore';
import type { Category } from '@/types/types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const {
    getRootCategories,
    getChildCategories,
    activeCategoryId,
    setActiveCategory,
    expandedCategoryIds,
    toggleExpanded,
  } = useCategoryStore();

  const rootCategories = getRootCategories();

  const handleCategoryClick = (
    id: string,
    hasChildren: boolean,
    isMobile: boolean,
  ) => {
    setActiveCategory(id);
    if (hasChildren) {
      toggleExpanded(id);
    }
    if (isMobile) {
      onClose();
    }
  };

  const renderCategory = (category: Category, isMobile: boolean) => {
    const children = getChildCategories(category.id);
    const hasChildren = (children?.length || 0) > 0;
    const isActive = activeCategoryId === category.id;
    const isExpanded = expandedCategoryIds.includes(category.id);


    return (
      <div key={category.id}>
        {/* Корневая категория */}
        <button
          onClick={() => handleCategoryClick(category.id, hasChildren, isMobile)}
          className={`sidebar-item w-full flex items-center justify-between px-4 py-3 text-xs tracking-wider transition-colors ${
            isActive ? 'active text-red-500' : 'text-white/50 hover:text-white'
          }`}
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

        {/* Подкатегории (только 1 уровень глубины) */}
        {hasChildren && isExpanded && (
          <div className="space-y-0.5">
            {children?.map((child) => (
              <button
                key={child.id}
                onClick={() => handleCategoryClick(child.id, false, isMobile)}
                className={`sidebar-item w-full flex items-center justify-between px-4 py-3 pl-8 text-xs tracking-wider transition-colors ${
                  activeCategoryId === child.id
                    ? 'active text-red-500'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <span className="text-left flex-1 truncate">{child.name}</span>
                {activeCategoryId === child.id && (
                  <ChevronRight size={14} className="shrink-0 ml-2" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderMenuItems = (isMobile: boolean) => (
    <div className="space-y-0.5">
      {rootCategories.map((cat) => renderCategory(cat, isMobile))}
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
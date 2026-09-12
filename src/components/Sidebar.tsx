'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, X } from 'lucide-react';
import { catalogHref, flattenCategories } from '@/lib/catalog';
import type { Category } from '@/types/types';

interface SidebarProps {
  categories: Category[];
  activeCategoryId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

function CategoryItem({
  category,
  activeCategoryId,
  onClose,
}: Pick<SidebarProps, 'activeCategoryId' | 'onClose'> & { category: Category }) {
  const [expanded, setExpanded] = useState<boolean>();
  const children = category.children ?? [];
  const containsActive = flattenCategories(children).some((item) => item.id === activeCategoryId);
  const isExpanded = expanded ?? containsActive;
  const isActive = category.id === activeCategoryId;

  return (
    <li>
      <div className={`catalog-category sidebar-item${isActive ? ' active' : ''}`}>
        <Link
          href={catalogHref(category.id)}
          onClick={onClose}
          title={category.name}
          aria-current={isActive ? 'page' : undefined}
        >
          <span>{category.name}</span>
          {isActive && !children.length && <ChevronRight size={12} />}
        </Link>
        {children.length > 0 && (
          <button
            onClick={() => setExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Свернуть' : 'Развернуть'}: ${category.name}`}
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        )}
      </div>
      {children.length > 0 && isExpanded && (
        <ul className="catalog-subcategories">
          {children.map((child) => (
            <CategoryItem key={child.id} category={child} activeCategoryId={activeCategoryId} onClose={onClose} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar({ categories, activeCategoryId, isOpen, onClose }: SidebarProps) {
  return (
    <aside id="catalog-menu" className={`catalog-sidebar${isOpen ? ' is-open' : ''}`}>
      <div className="catalog-sidebar-panel glass-card">
        <div className="catalog-sidebar-heading">
          <span>Меню</span>
          <button onClick={onClose} aria-label="Закрыть категории" className="text-white/50 hover:text-white transition-colors p-1"><X size={18} /></button>
        </div>
        <nav aria-label="Категории товаров">
          <ul>
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} activeCategoryId={activeCategoryId} onClose={onClose} />
            ))}
          </ul>
          {!categories.length && <p className="catalog-menu-empty">Категории пока недоступны</p>}
        </nav>
      </div>
    </aside>
  );
}

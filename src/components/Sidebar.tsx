'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, ChevronDown, House, X } from 'lucide-react';
import { catalogHref } from '@/lib/catalog';
import { buildCategoryMenu, type CategoryMenuItem } from '@/lib/category-menu';
import type { Category } from '@/types/types';

interface SidebarProps {
  categories: Category[];
  activeCategoryId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

function containsCategory(item: CategoryMenuItem, id: string | null): boolean {
  return (id !== null && item.categoryId === id) || item.children.some((child) => containsCategory(child, id));
}

function CategoryItem({
  category,
  activeCategoryId,
  onClose,
}: Pick<SidebarProps, 'activeCategoryId' | 'onClose'> & { category: CategoryMenuItem }) {
  const [expanded, setExpanded] = useState<boolean>();
  const children = category.children;
  const containsActive = children.some((item) => containsCategory(item, activeCategoryId));
  const isActive = category.categoryId !== null && category.categoryId === activeCategoryId;
  const isExpanded = expanded ?? (containsActive || isActive);
  const submenuId = `category-submenu-${category.id}`;
  const toggleLabel = `${isExpanded ? 'Свернуть' : 'Развернуть'}: ${category.name}`;
  const label = <>
    <span className="catalog-category-icon" aria-hidden="true" style={{ maskImage: `url(/category-icons/${category.icon}.png)` }} />
    <span className="catalog-category-label">{category.name}</span>
  </>;
  const chevron = isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />;

  return (
    <li>
      <div className={`catalog-category sidebar-item${isActive ? ' active' : ''}${containsActive ? ' has-active-child' : ''}`}>
        {category.categoryId ? (
          <Link
            href={catalogHref(category.categoryId)}
            onClick={onClose}
            title={category.name}
            aria-current={isActive ? 'page' : undefined}
            className="catalog-category-link"
          >
            {label}
          </Link>
        ) : (
          <button
            type="button"
            className="catalog-category-link catalog-category-group"
            onClick={() => setExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls={submenuId}
            aria-label={toggleLabel}
          >
            {label}
            {chevron}
          </button>
        )}
        {children.length > 0 && category.categoryId && (
          <button
            type="button"
            className="catalog-category-toggle"
            onClick={() => setExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls={submenuId}
            aria-label={toggleLabel}
          >
            {chevron}
          </button>
        )}
      </div>
      {children.length > 0 && (
        <ul id={submenuId} className="catalog-subcategories" hidden={!isExpanded}>
          {children.map((child) => (
            <CategoryItem key={child.id} category={child} activeCategoryId={activeCategoryId} onClose={onClose} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar({ categories, activeCategoryId, isOpen, onClose }: SidebarProps) {
  const isHome = usePathname() === '/';
  const navRef = useRef<HTMLElement>(null);
  const menu = buildCategoryMenu(categories);

  useEffect(() => {
    if (!activeCategoryId) return;
    const nav = navRef.current;
    const activeLink = nav?.querySelector('[aria-current="page"]');
    if (!nav || !activeLink) return;
    const bounds = nav.getBoundingClientRect();
    const activeBounds = activeLink.getBoundingClientRect();
    if (activeBounds.top < bounds.top) nav.scrollTop += activeBounds.top - bounds.top;
    else if (activeBounds.bottom > bounds.bottom) nav.scrollTop += activeBounds.bottom - bounds.bottom;
  }, [activeCategoryId, isOpen]);

  return (
    <aside id="catalog-menu" className={`catalog-sidebar${isOpen ? ' is-open' : ''}`}>
      <div className="catalog-sidebar-panel glass-card">
        <div className="catalog-sidebar-heading">
          <span>Меню</span>
          <button onClick={onClose} aria-label="Закрыть категории" className="text-white/50 hover:text-white transition-colors p-1"><X size={18} /></button>
        </div>
        <nav ref={navRef} aria-label="Категории товаров">
          <ul>
            <li className="catalog-home-item">
              <div className={`catalog-category sidebar-item${isHome ? ' active' : ''}`}>
                <Link href="/" className="catalog-category-link" onClick={onClose} aria-current={isHome ? 'page' : undefined}>
                  <House size={20} aria-hidden="true" />
                  <span className="catalog-category-label">Главная</span>
                </Link>
              </div>
            </li>
            {menu.map((category) => (
              <CategoryItem key={`${category.id}:${activeCategoryId ?? ''}`} category={category} activeCategoryId={activeCategoryId} onClose={onClose} />
            ))}
          </ul>
          {!categories.length && <p className="catalog-menu-empty">Категории пока недоступны</p>}
        </nav>
      </div>
    </aside>
  );
}

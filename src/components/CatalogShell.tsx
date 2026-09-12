'use client';

import { useEffect, type ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { useUIStore } from '@/store/uiStore';
import type { Category } from '@/types/types';

interface CatalogShellProps {
  categories: Category[];
  activeCategoryId?: string | null;
  children: ReactNode;
}

export default function CatalogShell({
  categories,
  activeCategoryId = null,
  children,
}: CatalogShellProps) {
  const isSidebarOpen = useUIStore((s) => s.isSidebarOpen);
  const isCartOpen = useUIStore((s) => s.isCartOpen);
  const closeSidebar = useUIStore((s) => s.closeSidebar);

  useEffect(() => {
    if (!isSidebarOpen && !isCartOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [isSidebarOpen, isCartOpen]);

  useEffect(() => {
    if (!isSidebarOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSidebar();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isSidebarOpen, closeSidebar]);

  return (
    <div className="catalog-shell min-h-screen relative">
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/background.png)' }} />
        <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-black/40" />
      </div>
      {isSidebarOpen && (
        <button
          className="catalog-menu-backdrop"
          onClick={closeSidebar}
          aria-label="Закрыть меню категорий"
          tabIndex={-1}
        />
      )}
      <Sidebar
        categories={categories}
        activeCategoryId={activeCategoryId}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />
      <main className="catalog-main relative">{children}</main>
      <div className="fixed top-0 left-0 w-px h-full bg-linear-to-b from-red-500/50 via-red-500/20 to-transparent z-50 pointer-events-none" aria-hidden="true" />
      <div className="fixed top-0 right-0 w-px h-full bg-linear-to-b from-red-500/50 via-red-500/20 to-transparent z-50 pointer-events-none" aria-hidden="true" />
    </div>
  );
}

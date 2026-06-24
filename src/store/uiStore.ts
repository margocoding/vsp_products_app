import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  isCartOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isCartOpen: false,

  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen, isCartOpen: false })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  openSidebar: () => set({ isSidebarOpen: true, isCartOpen: false }),

  toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen, isSidebarOpen: false })),
  closeCart: () => set({ isCartOpen: false }),
  openCart: () => set({ isCartOpen: true, isSidebarOpen: false }),
}));
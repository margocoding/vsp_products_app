"use client";

import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { ShoppingCart, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const toggleCart = useUIStore((s) => s.toggleCart);
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <header className="fixed top-0 left-0 right-0 z-[40] p-3 md:p-4">
      <div className="glass-card px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={toggleSidebar}
            className="md:hidden text-white/70 hover:text-white transition-colors p-1 -ml-1"
            aria-label="Toggle menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          <Link href="/">
            <img src="/logo.png" alt="ЖелДорПро" width={200} height={125} />
          </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={toggleCart}
            className="relative text-white/60 hover:text-white transition-colors p-1"
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium pointer-events-none">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

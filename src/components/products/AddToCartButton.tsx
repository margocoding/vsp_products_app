"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingCart, Check } from "lucide-react";
import { Product } from "@/types/types";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";

interface AddToCartButtonProps {
  product: Product;
  hasCounter?: boolean;
}

export default function AddToCartButton({
  product,
  hasCounter = false,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);

  const available = product.quantity ?? 0;
  const isInStock = available > 0;
  const unitLabel = product.unit ?? "шт";

  if (!isInStock) {
    return (
      <button
        disabled
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold tracking-wider uppercase text-sm bg-white/5 border border-white/10 text-white/30 cursor-not-allowed w-full sm:w-auto"
      >
        <ShoppingCart size={16} />
        <span>Нет в наличии</span>
      </button>
    );
  }

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      openCart();
    }, 600);
  };

  return (
    <div className="flex items-center gap-3 w-full sm:w-auto">
      {hasCounter && (
        <div className="glass-card flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="text-white/50 hover:text-white transition-colors disabled:opacity-30"
            disabled={quantity <= 1}
          >
            <Minus size={16} />
          </button>
          <span className="text-white font-medium text-sm w-6 text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(q + 1, available))}
            className="text-white/50 hover:text-white transition-colors disabled:opacity-30"
            disabled={quantity >= available}
          >
            <Plus size={16} />
          </button>
        </div>
      )}

      <button
        onClick={handleAdd}
        className={`
          flex-1 sm:flex-none flex items-center justify-center gap-2
          px-6 py-3 rounded-xl font-semibold tracking-wider uppercase text-sm
          transition-all duration-300
          ${
            justAdded
              ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              : "btn-neon hover:shadow-[0_0_30px_rgba(255,40,40,0.3)]"
          }
        `}
      >
        {justAdded ? (
          <>
            <Check size={16} />
            <span>Добавлено</span>
          </>
        ) : (
          <>
            <ShoppingCart size={16} />
            <span>В корзину</span>
          </>
        )}
      </button>
    </div>
  );
}

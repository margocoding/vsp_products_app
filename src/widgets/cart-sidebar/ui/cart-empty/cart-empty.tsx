import { ShoppingBag } from "lucide-react";

export function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
        <ShoppingBag size={40} className="text-zinc-600" />
      </div>
      <p className="text-zinc-400 text-base font-medium">Заявка пуста</p>
      <p className="text-zinc-600 text-sm mt-2">Добавьте товары из каталога</p>
    </div>
  );
}

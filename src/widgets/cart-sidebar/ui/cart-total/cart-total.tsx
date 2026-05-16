import { GlassPanel } from "@/shared/ui/glass-panel";

interface CartTotalProps {
  total: number;
}

export function CartTotal({ total }: CartTotalProps) {
  return (
    <GlassPanel className="mb-4 p-4 bg-gradient-to-r from-red-900/10 to-transparent border-red-800/20">
      <div className="flex items-center justify-between">
        <span className="text-zinc-400 text-sm font-medium">Итого:</span>
        <span className="text-2xl font-bold bg-gradient-to-r from-red-300 to-red-400 bg-clip-text text-transparent">
          {total.toLocaleString("ru-RU")} ₽
        </span>
      </div>
    </GlassPanel>
  );
}

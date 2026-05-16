import { Mail, MessageSquare } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

interface CartFormProps {
  onSubmit: (data: { email: string; comment: string }) => void;
}

export function CartForm({ onSubmit }: CartFormProps) {
  return (
    <>
      <div className="mb-3">
        <label className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
          <MessageSquare size={14} />
          Комментарий
        </label>
        <textarea
          placeholder="Сроки, вопросы..."
          rows={2}
          className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/30 resize-none transition-all duration-200"
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
          <Mail size={14} />
          E-mail для связи
        </label>
        <Input
          type="email"
          placeholder="example@email.com"
          className="h-11 bg-white/5 backdrop-blur-xl border-white/10 focus:border-red-500/30 focus:ring-red-500/30"
        />
      </div>

      <Button
        variant="primary"
        size="md"
        className="w-full h-12 text-base font-semibold shadow-lg shadow-red-900/20 hover:shadow-red-900/30 transition-all duration-300 hover:scale-[1.02]"
        onClick={() => onSubmit({ email: "", comment: "" })}
      >
        Отправить заявку
      </Button>
    </>
  );
}

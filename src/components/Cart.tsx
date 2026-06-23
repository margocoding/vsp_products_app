"use client";

import { ordersApi } from "@/api/orders.api";
import { getImageUrl } from "@/common/utils";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ImageOff,
  Mail,
  MessageSquare,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import Button from "./ui/Button";
import Input from "./ui/Input";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const checkoutSchema = z.object({
  email: z
    .string()
    .min(1, "Укажите email для связи")
    .email("Введите корректный email адрес"),
  comment: z
    .string()
    .max(300, "Комментарий не должен превышать 300 символов")
    .optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalItems = useCartStore((state) => state.totalItems());
  const totalPrice = useCartStore((state) => state.totalPrice());

  // Актуальные остатки с сервера
  const products = useProductStore((s) => s.products);
  const getAvailable = (productId: string) =>
    products.find((p) => p.id === productId)?.quantity ?? 0;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: CheckoutFormData) => {
    // Проверяем, не превышен ли остаток по всем товарам
    for (const item of items) {
      const available = getAvailable(item.id);
      if (available <= 0) {
        toast.error(`Товар "${item.name}" закончился на складе`, {
          position: "top-right",
        });
        return;
      }
      if (item.quantity > available) {
        toast.error(`Недостаточно "${item.name}". Доступно: ${available} шт`, {
          position: "top-right",
        });
        return;
      }
    }

    const orderItems = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    try {
      await ordersApi.create({
        email: data.email,
        comment: data.comment,
        items: orderItems,
      });

      toast.success("Заказ успешно оформлен! Мы свяжемся с вами.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
      });

      clearCart();
      reset();
      onClose();
    } catch (error: any) {
      const msg = error?.response?.data?.message;
      toast.error(
        Array.isArray(msg)
          ? msg[0]
          : msg || "Не удалось оформить заказ. Попробуйте ещё раз.",
        { position: "top-right", autoClose: 5000 },
      );
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-55 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 right-0 z-60 w-full sm:w-105 bg-black/95 backdrop-blur-xl border-l border-white/10
          transform transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center">
              <ShoppingBag size={20} className="text-red-500" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-wider text-white">
                КОРЗИНА
              </h2>
              <p className="text-[10px] text-white/40 tracking-widest mt-0.5">
                {totalItems}{" "}
                {totalItems === 1
                  ? "ТОВАР"
                  : totalItems < 5
                    ? "ТОВАРА"
                    : "ТОВАРОВ"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                <ShoppingBag size={36} className="text-white/20" />
              </div>
              <p className="text-white/50 text-sm tracking-widest font-medium">
                КОРЗИНА ПУСТА
              </p>
              <p className="text-white/30 text-xs mt-2 tracking-wide">
                Добавьте товары из каталога
              </p>
            </div>
          ) : (
            items.map((item) => {
              const available = getAvailable(item.id);
              const isOutOfStock = available <= 0;
              const exceedsStock = item.quantity > available;

              return (
                <div
                  key={item.id}
                  className="glass-card p-4 flex gap-4 group hover:border-red-500/30 transition-colors"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-white/5 border border-white/10 shrink-0 relative">
                    {item.image ? (
                      <Image
                        src={getImageUrl(item.image)}
                        width={100}
                        height={100}
                        unoptimized
                        alt={item.name}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-white/20">
                        <ImageOff size={20} strokeWidth={1} />
                        <span className="text-[5px] uppercase tracking-wider">
                          Нет изображения
                        </span>
                      </div>
                    )}
                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <span className="text-[9px] text-red-500 font-bold tracking-wider">
                          НЕТ
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white truncate">
                          {item.name}
                        </h3>
                        {item.subtitle && (
                          <p className="text-[10px] text-red-500/70 tracking-widest mt-0.5">
                            {item.subtitle}
                          </p>
                        )}
                        <p
                          className={`text-[10px] mt-0.5 tracking-wider ${
                            isOutOfStock ? "text-red-500" : "text-white/40"
                          }`}
                        >
                          {isOutOfStock
                            ? "Нет в наличии"
                            : `На складе: ${available} шт`}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-white/30 hover:text-red-500 transition-colors p-1 shrink-0 hover:bg-red-500/10 rounded"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {(isOutOfStock || exceedsStock) && (
                      <div className="flex items-center gap-1 mt-1.5 text-[10px] text-amber-400 tracking-wider">
                        <AlertCircle size={10} />
                        <span>
                          {isOutOfStock
                            ? "Товар закончился — удалите из корзины"
                            : `Доступно только ${available} шт`}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1,
                              available,
                            )
                          }
                          disabled={item.quantity <= 1 || isOutOfStock}
                          className="w-7 h-7 rounded border border-white/20 flex items-center justify-center text-white/60 hover:border-red-500/50 hover:text-red-500 hover:bg-red-500/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-semibold text-white min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1,
                              available,
                            )
                          }
                          disabled={item.quantity >= available || isOutOfStock}
                          className="w-7 h-7 rounded border border-white/20 flex items-center justify-center text-white/60 hover:border-red-500/50 hover:text-red-500 hover:bg-red-500/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">
                          {(
                            parseFloat(item.price) * item.quantity
                          ).toLocaleString("ru-RU")}
                          <span className="text-red-500 ml-1 text-xs">₽</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Fixed Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-5 space-y-4 shrink-0 bg-black/80 backdrop-blur-xl">
            <div className="flex items-end justify-between pb-2">
              <div>
                <p className="text-[10px] text-white/40 tracking-widest mb-1">
                  ИТОГО К ОПЛАТЕ
                </p>
                <p className="text-2xl font-bold text-white">
                  {totalPrice.toLocaleString("ru-RU")}
                  <span className="text-red-500 ml-1 text-base">₽</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-white/40 tracking-widest mb-1">
                  ПОЗИЦИЙ
                </p>
                <p className="text-lg font-semibold text-white/80">
                  {totalItems}
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                type="email"
                placeholder="Email для связи"
                icon={<Mail size={14} />}
                error={errors.email?.message}
                {...register("email")}
              />

              <Input
                textarea
                placeholder="Сроки доставки, вопросы или комментарии..."
                rows={2}
                icon={<MessageSquare size={14} />}
                error={errors.comment?.message}
                {...register("comment")}
              />

              <Button
                type="submit"
                variant="neon"
                disabled={isSubmitting}
                className="w-full py-3.5 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-red-500 rounded-full animate-spin" />
                    ОБРАБОТКА...
                  </>
                ) : (
                  "ОФОРМИТЬ ЗАКАЗ"
                )}
              </Button>
            </form>
          </div>
        )}
      </aside>
    </>
  );
}

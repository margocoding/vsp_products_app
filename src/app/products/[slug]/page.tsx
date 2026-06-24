import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ImageOff } from "lucide-react";
import { Product } from "@/types/types";
import { getImageUrl } from "@/common/utils";
import AddToCartButton from "@/components/products/AddToCartButton";

const conditionLabels: Record<string, string> = {
  NEW: "Новый",
  USED: "Б/У",
  REFURBISHED: "Восстановленный",
  RESERVED: "Резерв",
};

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      },
    );

    return res.json();
  } catch (e) {
    console.error("[ssr] product fetch error:", e);
    return null;
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const headersList = await headers();
  const domain = (headersList.get("host") ?? "localhost").split(":")[0];
  const product = await getProduct(slug);

  console.log(product);
  if (!product) {
    return {
      title: "Товар не найден",
      robots: { index: false, follow: false },
    };
  }

  const priceText = `${product.price} ${product.priceUnit === "RUB" ? "₽" : product.priceUnit}`;
  const stockText = product.quantity > 0 ? "В наличии" : "Под заказ";
  const description =
    product.subtitle ||
    `${product.name} — ${priceText}. ${stockText}. Доставка по всей России от All Railways.`;

  const imageUrl = product.image ? getImageUrl(product.image) : undefined;
  const url = `/products/${product.slug}`;

  return {
    title: product.name,
    description,
    alternates: { canonical: url },
    keywords: [
      "allrailways",
      product.name,
      ...(product.subtitle ? [product.subtitle] : []),
      ...product.characteristics.slice(0, 5).map((c) => c.value),
    ],
    openGraph: {
      title: `${product.name} — купить за ${priceText} | All Railways`,
      description,
      url,
      type: "website",
      locale: "ru_RU",
      siteName: "All Railways",
      ...(imageUrl && {
        images: [{ url: imageUrl, width: 800, height: 800, alt: product.name }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — All Railways`,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const headersList = await headers();
  const domain = (headersList.get("host") ?? "localhost").split(":")[0];

  const product = await getProduct(slug);
  if (!product) notFound();

  const available = product.quantity ?? 0;
  const isInStock = available > 0;
  const conditionLabel =
    conditionLabels[product.condition] ?? product.condition;
  const unitLabel = product.unit ?? "шт";
  const currencySymbol = product.priceUnit === "RUB" ? "₽" : product.priceUnit;
  const imageUrl = product.image ? getImageUrl(product.image) : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.subtitle || product.name,
    brand: { "@type": "Brand", name: "All Railways" },
    image: imageUrl ?? undefined,
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/products/${product.slug}`,
      price: product.price,
      priceCurrency: product.priceUnit,
      availability: isInStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <main className="min-h-screen relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/background.png)" }}
        />
        <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/60 to-black/80" />
      </div>

      {/* Neon side lines */}
      <div className="fixed top-0 left-0 w-px h-full bg-linear-to-b from-red-500/50 via-red-500/20 to-transparent z-50 pointer-events-none" />
      <div className="fixed top-0 right-0 w-px h-full bg-linear-to-b from-transparent via-red-500/20 to-red-500/50 z-50 pointer-events-none" />

      <div className="relative z-10 pt-20 md:pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
        {" "}
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-red-400 transition-colors text-sm tracking-wider uppercase mb-8 group"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span>Назад в каталог</span>
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Image */}
          <div className="lg:col-span-2">
            <div className="glass-card h-full relative overflow-hidden p-8">
              <div className="absolute inset-0 bg-linear-to-br from-red-500/5 via-transparent to-transparent" />
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  fill
                  alt={product.name}
                  unoptimized
                  className="object-contain transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/15">
                  <ImageOff size={64} strokeWidth={1} />
                  <span className="text-xs uppercase tracking-widest">
                    Нет изображения
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Details — всё серверно */}
          <div className="lg:col-span-3">
            <div className="glass-card p-6 sm:p-8 h-full flex flex-col">
              <div className="mb-8">
                <span className="text-red-500 text-xs tracking-[0.3em] uppercase font-medium">
                  {isInStock ? "● В НАЛИЧИИ" : conditionLabel.toUpperCase()}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-white mt-2">
                  {product.name}
                </h1>
                {product.subtitle && (
                  <p className="text-sm sm:text-base text-white/50 mt-2 tracking-wider uppercase">
                    {product.subtitle}
                  </p>
                )}
              </div>

              {product.characteristics.length > 0 && (
                <div className="mb-8">
                  <span className="text-white/30 uppercase tracking-[0.2em] text-xs block mb-4">
                    Характеристики
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
                    {product.characteristics.map((char, idx) => (
                      <div key={char.id ?? idx} className="space-y-1">
                        <span className="text-white/30 uppercase tracking-wider text-xs block">
                          {char.title}
                        </span>
                        <p className="text-white/80 font-light text-sm">
                          {char.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 mb-8 pb-6 border-b border-white/10">
                <div className="space-y-1">
                  <span className="text-white/30 uppercase tracking-wider text-xs block">
                    Состояние
                  </span>
                  <p className="text-white/70 font-light text-sm uppercase tracking-wider">
                    {conditionLabel}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-white/30 uppercase tracking-wider text-xs block">
                    НДС
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-emerald-400 font-medium tracking-wider text-xs uppercase">
                      Включён
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-white/30 uppercase tracking-wider text-xs block">
                    Наличие
                  </span>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isInStock
                          ? "bg-emerald-500 animate-pulse"
                          : "bg-red-500"
                      }`}
                    />
                    <p
                      className={`font-medium tracking-wider text-xs uppercase ${
                        isInStock ? "text-emerald-400" : "text-red-500"
                      }`}
                    >
                      {isInStock ? "В наличии" : "Нет"}
                    </p>
                  </div>
                  {isInStock && (
                    <p className="text-white/40 text-xs mt-0.5">
                      {available} {unitLabel} на складе
                    </p>
                  )}
                </div>
              </div>

              {/* Цена + кнопки */}
              <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-light text-white tracking-tight">
                      {product.price}
                    </span>
                    <span className="text-xl sm:text-2xl text-white/50 font-light">
                      {currencySymbol}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 mt-1 tracking-wider">
                    за {unitLabel}
                  </p>
                </div>

                <AddToCartButton product={product} hasCounter/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

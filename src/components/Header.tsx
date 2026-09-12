"use client";

import { Suspense, useEffect, useRef, useState, type FormEvent } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { ShoppingCart, Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";

function SearchField({ query, destination, pathname }: { query: string; destination: string; pathname: string }) {
  const router = useRouter();
  const [input, setInput] = useState({ value: query, query, pathname });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const { value } = input;
  if (input.query !== query || input.pathname !== pathname) {
    const isOwnSearch = submitted === `${pathname}:${query}`;
    setInput({ value: isOwnSearch ? value : query, query, pathname });
    setSubmitted(null);
  }
  const resultHref = (search: string) => search
    ? `${destination}?${new URLSearchParams({ search })}`
    : destination;

  useEffect(() => {
    if (value.trim() === query) return;
    timer.current = setTimeout(() => {
      const search = value.trim();
      setSubmitted(`${destination}:${search}`);
      router.replace(search ? `${destination}?${new URLSearchParams({ search })}` : destination);
    }, 1000);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [value, query, destination, router]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (timer.current) clearTimeout(timer.current);
    setSubmitted(`${destination}:${value.trim()}`);
    router.push(resultHref(value.trim()));
  };

  return (
    <form className="header-search" action={destination} role="search" onSubmit={submit}>
      <button type="submit" aria-label="Найти товар"><Search size={16} strokeWidth={1.5} /></button>
      <input
        className="input-neon"
        type="search"
        name="search"
        value={value}
        onChange={(event) => setInput({ value: event.target.value, query, pathname })}
        placeholder="Поиск товара"
        aria-label="Поиск товара"
      />
    </form>
  );
}

function HeaderSearch() {
  const query = useSearchParams().get('search') ?? '';
  const pathname = usePathname();
  const params = useParams<{ catalog?: string }>();
  const destination = params.catalog ? `/${encodeURIComponent(params.catalog)}` : '/catalog';
  return <SearchField query={query} destination={destination} pathname={pathname} />;
}

export default function Header() {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const isSidebarOpen = useUIStore((s) => s.isSidebarOpen);
  const closeSidebar = useUIStore((s) => s.closeSidebar);
  const toggleCart = useUIStore((s) => s.toggleCart);
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-40 p-3 md:p-4">
      <div className="site-header-panel glass-card px-4 md:px-6 py-2 flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="catalog-toggle text-white/70 hover:text-white transition-colors p-1 -ml-1"
          aria-label="Открыть категории"
          aria-controls="catalog-menu"
          aria-expanded={isSidebarOpen}
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>
        <Link href="/" onClick={closeSidebar} className="site-logo-link" aria-label="ЖелДорПро — главная">
          <Image src={logo} alt="ЖелДорПро" className="site-logo" sizes="(max-width: 767px) 150px, 180px" priority />
        </Link>
        <Suspense fallback={<div className="header-search" aria-hidden="true"><div className="input-neon h-9 w-full" /></div>}>
          <HeaderSearch />
        </Suspense>
        <button onClick={toggleCart} className="header-cart relative text-white/60 hover:text-white transition-colors p-1" aria-label={`Корзина, товаров: ${totalItems}`}>
          <ShoppingCart size={18} strokeWidth={1.5} />
          {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium pointer-events-none">{totalItems}</span>}
        </button>
      </div>
    </header>
  );
}

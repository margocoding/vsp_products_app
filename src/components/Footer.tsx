'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Train } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  const hasSidebar = pathname === '/' || pathname === '';

  return (
    <footer
      className={`mt-auto relative overflow-hidden transition-all duration-300 ${
        hasSidebar ? 'md:ml-64' : ''
      }`}
    >
      {/* Фоновые градиенты */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-0)] via-[var(--bg-1)] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[rgba(255,40,40,0.04)] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Разделительная линия */}
        <div className="neon-line mb-12" />

        {/* Основная сетка */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Колонка 1: О компании */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[rgba(255,40,40,0.1)] border border-[rgba(255,50,50,0.2)] flex items-center justify-center">
                <Train className="w-5 h-5 text-[var(--text-red)]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg tracking-wide">
                  ЖелДорПро
                </h3>
                <p className="text-[var(--text-2)] text-xs">
                  Профессиональное ж/д оборудование
                </p>
              </div>
            </div>
            <p className="text-[var(--text-1)] text-sm leading-relaxed">
              Поставка железнодорожного оборудования, комплектующих и
              строительных материалов по всей России.
            </p>
            <div className="pt-2">
              <Link
                href="/rekvizity"
                className="text-[var(--text-1)] text-xs hover:text-[var(--text-red)] transition-colors duration-200 underline underline-offset-4"
              >
                Реквизиты компании
              </Link>
            </div>
          </div>

          {/* Колонка 2: Информация */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              <span className="text-[var(--accent)] mr-1">//</span> Информация
            </h4>
            <ul className="space-y-2.5">
              <FooterLink href="/privacy-policy">
                Политика конфиденциальности
              </FooterLink>
              <FooterLink href="/dostavka-i-oplata">Доставка и оплата</FooterLink>
              <FooterLink href="/usloviya-dostavki-i-oplaty">
                Условия доставки и оплаты
              </FooterLink>
              <FooterLink href="/garantiya-i-vozvrat">
                Гарантия и возврат товара
              </FooterLink>
            </ul>
          </div>

          {/* Колонка 3: Контакты */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              <span className="text-[var(--accent)] mr-1">//</span> Контакты
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:sales@zheldorpro.ru"
                className="flex items-center gap-3 text-[var(--text-1)] text-sm hover:text-[var(--text-red)] transition-colors duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-[rgba(255,40,40,0.06)] border border-[rgba(255,50,50,0.15)] flex items-center justify-center group-hover:border-[rgba(255,50,50,0.4)] transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>sales@zheldorpro.ru</span>
              </a>
              <a
                href="tel:+79100982802"
                className="flex items-center gap-3 text-[var(--text-1)] text-sm hover:text-[var(--text-red)] transition-colors duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-[rgba(255,40,40,0.06)] border border-[rgba(255,50,50,0.15)] flex items-center justify-center group-hover:border-[rgba(255,50,50,0.4)] transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+7 (910) 098-28-02</span>
              </a>
              <div className="flex items-start gap-3 text-[var(--text-1)] text-sm">
                <div className="w-8 h-8 rounded-lg bg-[rgba(255,40,40,0.06)] border border-[rgba(255,50,50,0.15)] flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="leading-relaxed">
                  600017, Владимирская область,
                  <br />
                  г. Владимир, ул. Гороховая, д. 15
                </span>
              </div>
            </div>
          </div>

          {/* Колонка 4: Краткие реквизиты */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              <span className="text-[var(--accent)] mr-1">//</span> Реквизиты
            </h4>
            <div className="glass-card p-4 space-y-2 text-xs">
              <RequisiteRow label="ООО" value="«ЖЕЛДОРПРО»" />
              <RequisiteRow label="ИНН" value="3300017628" mono />
              <RequisiteRow label="КПП" value="330001001" mono />
              <RequisiteRow label="ОГРН" value="1243300009512" mono />
              <RequisiteRow label="ОКПО" value="54048227" mono />
            </div>
          </div>
        </div>

        {/* Нижняя секция */}
        <div className="border-t border-[var(--border-0)] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--text-2)] text-xs">
              © {new Date().getFullYear()} ООО «ЖЕЛДОРПРО». Все права защищены.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy-policy"
                className="text-[var(--text-2)] text-xs hover:text-[var(--text-red)] transition-colors"
              >
                Политика конфиденциальности
              </Link>
              <Link
                href="/dostavka-i-oplata"
                className="text-[var(--text-2)] text-xs hover:text-[var(--text-red)] transition-colors"
              >
                Доставка и оплата
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[var(--text-1)] text-sm hover:text-[var(--text-red)] transition-colors duration-200 group flex items-center gap-2"
      >
        <span className="w-1 h-1 rounded-full bg-[var(--border-1)] group-hover:bg-[var(--accent)] transition-colors" />
        {children}
      </Link>
    </li>
  );
}

function RequisiteRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-[var(--text-2)] shrink-0">{label}</span>
      <span
        className={`text-[var(--text-1)] text-right ${mono ? "font-mono" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
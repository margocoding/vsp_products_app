// app/rekvizity/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Реквизиты компании",
  description: "Реквизиты ООО «ЖЕЛДОРПРО»",
};

export default function RekvizityPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 t-20 md:pt-24">
      <div className="mb-12">
        <span className="section-number">// 05</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
          Реквизиты компании
        </h1>
        <div className="neon-line w-32 mt-4" />
      </div>

      <div className="space-y-8">
        {/* Основные реквизиты */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-5 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent-glow)]" />
            Основные данные
          </h2>
          <div className="space-y-3">
            <RequisiteRow label="Полное наименование" value='Общество с ограниченной ответственностью «ЖЕЛДОРПРО»' />
            <RequisiteRow label="ИНН" value="3300017628" />
            <RequisiteRow label="КПП" value="330001001" />
            <RequisiteRow label="ОГРН" value="1243300009512 от 18.11.2024 г." />
            <RequisiteRow label="ОКПО" value="54048227" />
            <RequisiteRow label="ОКТМО" value="17701000001" />
            <RequisiteRow
              label="Юридический адрес"
              value="600017, Владимирская область, г.о. город Владимир, г. Владимир, ул. Гороховая, д. 15, помещ. 5.2"
            />
            <RequisiteRow
              label="Почтовый адрес"
              value="600017, Владимирская область, г.о. город Владимир, г. Владимир, ул. Гороховая, д. 15, помещ. 5.2"
            />
            <RequisiteRow label="Генеральный директор" value="Балашов Александр Петрович" />
            <RequisiteRow label="Действует на основании" value="Устава общества" />
            <RequisiteRow label="ОКВЭД (основной)" value="46.73.6 «Торговля оптовая прочими строительными материалами и изделиями»" />
            <RequisiteRow label="ОКВЭД (дополнительный)" value="46.90 «Торговля оптовая неспециализированная»" />
          </div>
        </div>

        {/* Контакты */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-5 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent-glow)]" />
            Контактные данные
          </h2>
          <div className="space-y-3">
            <RequisiteRow label="Телефон" value="+7 (910) 098-28-02" link="tel:+79100982802" />
            <RequisiteRow label="Email" value="sales@zheldorpro.ru" link="mailto:sales@zheldorpro.ru" />
          </div>
        </div>

        {/* Банковские реквизиты */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-5 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent-glow)]" />
            Банковские реквизиты
          </h2>

          {/* Банк 1 */}
          <div className="mb-6">
            <h3 className="text-white font-medium text-sm uppercase tracking-wider mb-3 text-[var(--text-red)]">
              Счёт №1 — Альфа-Банк
            </h3>
            <div className="space-y-2 bg-[rgba(255,40,40,0.03)] rounded-xl p-4 border border-[rgba(255,50,50,0.1)]">
              <RequisiteRow label="Расчётный счёт" value="40702810932000023844" mono />
              <RequisiteRow label="БИК" value="044030786" mono />
              <RequisiteRow label="Наименование банка" value='Филиал «Санкт-Петербургский» АО «Альфа-Банк»' />
              <RequisiteRow label="Корр. счёт" value="30101810600000000786" mono />
            </div>
          </div>

          {/* Банк 2 */}
          <div>
            <h3 className="text-white font-medium text-sm uppercase tracking-wider mb-3 text-[var(--text-red)]">
              Счёт №2 — Металлинвестбанк
            </h3>
            <div className="space-y-2 bg-[rgba(255,40,40,0.03)] rounded-xl p-4 border border-[rgba(255,50,50,0.1)]">
              <RequisiteRow label="Расчётный счёт" value="40702810600990011385" mono />
              <RequisiteRow label="БИК" value="044525176" mono />
              <RequisiteRow label="Наименование банка" value='ПАО АКБ «Металлинвестбанк»' />
              <RequisiteRow label="Корр. счёт" value="30101810300000000176" mono />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function RequisiteRow({
  label,
  value,
  link,
  mono,
}: {
  label: string;
  value: string;
  link?: string;
  mono?: boolean;
}) {
  const content = (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-[var(--border-0)] last:border-0">
      <span className="text-[var(--text-2)] text-xs uppercase tracking-wider sm:w-48 shrink-0 pt-0.5">
        {label}
      </span>
      <span className={`text-[var(--text-0)] text-sm ${mono ? "font-mono" : ""}`}>
        {value}
      </span>
    </div>
  );

  if (link) {
    return (
      <a href={link} className="block hover:text-[var(--text-red)] transition-colors group">
        <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-[var(--border-0)] last:border-0">
          <span className="text-[var(--text-2)] text-xs uppercase tracking-wider sm:w-48 shrink-0 pt-0.5">
            {label}
          </span>
          <span className={`text-[var(--text-red)] text-sm group-hover:underline ${mono ? "font-mono" : ""}`}>
            {value}
          </span>
        </div>
      </a>
    );
  }

  return content;
}
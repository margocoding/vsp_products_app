// app/dostavka-i-oplata/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Доставка и оплата",
  description: "Условия доставки и оплаты заказов в ЖелДорПро",
};

export default function DeliveryPaymentPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 t-20 md:pt-24">
      <div className="mb-12">
        <span className="section-number">// 02</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
          Доставка и оплата
        </h1>
        <div className="neon-line w-32 mt-4" />
      </div>

      <div className="space-y-10 text-[var(--text-1)] leading-relaxed">
        <Section title="Способы доставки">
          <p className="mb-4">
            Доставка с сайта осуществляется только по территории Российской Федерации. Доставка товара может занимать от 5 до 30 дней в зависимости от сложности логистического маршрута. Сроки доставки могут сдвигаться в любую сторону без наложения штрафных санкций от Покупателя.
          </p>
          <div className="glass-card p-4 border-l-2 border-l-[var(--accent)]">
            <p className="text-white font-semibold">
              Стоимость доставки составляет 8% от стоимости товара
            </p>
          </div>
          <p className="mt-4">
            После того как Вы сделаете заказ, наши менеджеры согласуют с Вами дату доставки перед отправкой товара.
          </p>
        </Section>

        <Section title="Гарантия на товары">
          <p>
            Гарантия предоставляется только на те товары, на которые менеджер подтвердил наличие гарантийного срока и наличие сертификатов качества.
          </p>
        </Section>

        <Section title="Способы оплаты">
          <p className="mb-4">
            Оплата заказа производится безналичным расчётом на банковский счёт компании ООО «ЖЕЛДОРПРО» в 100% размере стоимости товара и доставки.
          </p>
          <div className="glass-card p-5 space-y-3 text-sm">
            <h3 className="text-white font-semibold mb-3 text-base">Платёжные реквизиты:</h3>
            <Requisite label="Наименование" value='ООО «ЖЕЛДОРПРО»' />
            <Requisite label="ИНН" value="3300017628" />
            <Requisite label="КПП" value="330001001" />
            <Requisite label="ОГРН" value="1243300009512" />
            <Requisite label="Юридический адрес" value="600017, Владимирская область, г. Владимир, ул. Гороховая, д. 15, помещ. 5.2" />
            <Requisite label="ОКПО" value="54048227" />
            <div className="border-t border-[var(--border-0)] my-3" />
            <h4 className="text-white font-medium text-sm">Банк 1: Альфа-Банк</h4>
            <Requisite label="Расчётный счёт" value="40702810932000023844" />
            <Requisite label="БИК" value="044030786" />
            <Requisite label="Банк" value='Филиал «Санкт-Петербургский» АО «Альфа-Банк»' />
            <Requisite label="Корр. счёт" value="30101810600000000786" />
            <div className="border-t border-[var(--border-0)] my-3" />
            <h4 className="text-white font-medium text-sm">Банк 2: Металлинвестбанк</h4>
            <Requisite label="Расчётный счёт" value="40702810600990011385" />
            <Requisite label="БИК" value="044525176" />
            <Requisite label="Банк" value='ПАО АКБ «Металлинвестбанк»' />
            <Requisite label="Корр. счёт" value="30101810300000000176" />
          </div>
        </Section>

        <div className="glass-card p-6 border border-[rgba(255,50,50,0.3)]">
          <h3 className="text-white font-bold text-lg mb-3 red-glow-text">⚠ Внимание!</h3>
          <p className="text-[var(--text-1)] text-sm">
            Для получения товара при оформлении или регистрации на сайте необходимо указывать реальные данные:
          </p>
          <ul className="mt-3 space-y-2 ml-4">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" /> ФИО</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" /> Номер телефона</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" /> Email адрес</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent-glow)]" />
        {title}
      </h2>
      {children}
    </section>
  );
}

function Requisite({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
      <span className="text-[var(--text-2)] text-xs uppercase tracking-wide sm:w-36 shrink-0">{label}</span>
      <span className="text-[var(--text-0)] font-mono text-xs">{value}</span>
    </div>
  );
}
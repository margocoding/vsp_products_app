// app/usloviya-dostavki-i-oplaty/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Условия доставки и оплаты — Публичная оферта",
  description: "Публичная оферта ООО «ЖЕЛДОРПРО» на продажу железнодорожного оборудования",
};

export default function OfferPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 t-20 md:pt-24">
      <div className="mb-12">
        <span className="section-number">// 03</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
          Договор для заказа — публичная оферта
        </h1>
        <div className="neon-line w-32 mt-4" />
        <p className="text-[var(--text-1)] mt-4">
          Данная страница — это публичная оферта интернет-магазина «ЖелДорПро» по продаже железнодорожного оборудования и комплектующих.
        </p>
      </div>

      <div className="space-y-10 text-[var(--text-1)] leading-relaxed">
        <Section number="1" title="Общие положения">
          <p className="mb-3">
            <strong className="text-white">1.1.</strong> Настоящая публичная оферта является официальным предложением компании ООО «ЖЕЛДОРПРО» в адрес любого лица желающего заключить договор купли-продажи товара через сайт дистанционным образом посредством добавления товара в корзину.
          </p>
          <p className="mb-3">
            <strong className="text-white">1.2.</strong> Заказ Покупателем товара, размещенного на сайте, означает, что Покупатель согласен со всеми условиями настоящей Оферты.
          </p>
          <p>
            <strong className="text-white">1.3.</strong> Срок действия Оферты ограничен 30 календарными днями с момента оформления заказа на сайте.
          </p>
        </Section>

        <Section number="2" title="Предмет Оферты">
          <p className="mb-3">
            <strong className="text-white">2.1.</strong> Акцептом настоящей Оферты является оформление Покупателем заказа на товар путем совершения действий указанных в разделе «Как сделать заказ».
          </p>
          <p className="mb-3">
            <strong className="text-white">2.2.</strong> Продавец обязуется обработать и передать Покупателю товар на основании размещенного заказа, а Покупатель обязуется оплатить и принять товар на условиях настоящей Оферты.
          </p>
          <p>
            <strong className="text-white">2.3.</strong> Право собственности на заказанные товары переходит к Покупателю после подписания Акта получения.
          </p>
        </Section>

        <Section number="3" title="Стоимость товара">
          <p className="mb-3">
            <strong className="text-white">3.1.</strong> Цены на товар определяются Продавцом в одностороннем порядке и указываются на страницах интернет-магазина.
          </p>
          <p className="mb-3">
            <strong className="text-white">3.2.</strong> Цена товара указывается в рублях Российской Федерации и включает в себя НДС.
          </p>
        </Section>

        <Section number="4" title="Возврат товара и денежных средств">
          <p className="mb-3">
            <strong className="text-white">4.1.</strong> Возврат товара надлежащего качества возможен в срок до 14 дней с момента покупки согласно Закону о защите прав потребителей.
          </p>
          <p className="mb-3">
            <strong className="text-white">4.2.</strong> Возврат товара ненадлежащего качества возможен в срок 30 дней с момента покупки.
          </p>
          <p className="mb-3">
            <strong className="text-white">4.3.</strong> Возврат денежных средств осуществляется посредством возврата стоимости оплаченного товара на лицевой счёт Покупателя в течение 10 дней.
          </p>
        </Section>

        <Section number="5" title="Доставка товара">
          <p className="mb-3">
            <strong className="text-white">5.1.</strong> Доставка осуществляется только по территории Российской Федерации.
          </p>
          <p className="mb-3">
            <strong className="text-white">5.2.</strong> Доставка товара Покупателю осуществляется в срок от 5 до 30 дней.
          </p>
        </Section>

        <Section number="6" title="Способы оплаты">
          <p className="mb-4">
            <strong className="text-white">6.1.</strong> Оплата заказа производится безналичным расчётом на банковский счёт компании ООО «ЖЕЛДОРПРО».
          </p>
          <div className="glass-card p-5 space-y-3 text-sm mt-4">
            <Requisite label="Наименование" value='ООО «ЖЕЛДОРПРО»' />
            <Requisite label="ИНН" value="3300017628" />
            <Requisite label="КПП" value="330001001" />
            <Requisite label="ОГРН" value="1243300009512" />
            <Requisite label="Адрес" value="600017, Владимирская область, г. Владимир, ул. Гороховая, д. 15, помещ. 5.2" />
            <Requisite label="ОКПО" value="54048227" />
            <div className="border-t border-[var(--border-0)] my-3" />
            <p className="text-white font-medium text-sm">Альфа-Банк:</p>
            <Requisite label="Р/с" value="40702810932000023844" />
            <Requisite label="БИК" value="044030786" />
            <div className="border-t border-[var(--border-0)] my-3" />
            <p className="text-white font-medium text-sm">Металлинвестбанк:</p>
            <Requisite label="Р/с" value="40702810600990011385" />
            <Requisite label="БИК" value="044525176" />
          </div>
        </Section>
      </div>
    </main>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
        <span className="text-[var(--accent)] font-mono text-sm">{number}.</span>
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
      <span className="text-[var(--text-2)] text-xs uppercase tracking-wide sm:w-28 shrink-0">{label}</span>
      <span className="text-[var(--text-0)] font-mono text-xs">{value}</span>
    </div>
  );
}
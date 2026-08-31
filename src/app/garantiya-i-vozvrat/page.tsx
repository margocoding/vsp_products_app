// app/garantiya-i-vozvrat/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Гарантия и условия возврата товара",
  description: "Гарантийные обязательства и условия возврата товара в ЖелДорПро",
};

const returnableItems = [
  "Железнодорожное оборудование — Новое",
  "Комплектующие для вагонов — Новые",
  "Железнодорожные рельсы — Новые",
  "Железнодорожные шпалы — Новые",
  "Железнодорожный крепёж — Новый",
  "Изоляция и прокладки — Новые",
  "Путевой инструмент — Новый",
  "Скрепления АРС — Новые",
  "Скрепления ЖБР — Новые",
  "Стрелочные переводы — Новые",
];

const nonReturnableItems = [
  "Железнодорожное оборудование — Восстановленное, Б/У",
  "Комплектующие для вагонов — Восстановленные, Б/У",
  "Железнодорожные рельсы — Восстановленные, Б/У",
  "Железнодорожные шпалы — Восстановленные, Б/У",
  "Железнодорожный крепёж — Восстановленный, Б/У",
  "Изоляция и прокладки — Восстановленные, Б/У",
  "Путевой инструмент — Восстановленный, Б/У",
  "Скрепления АРС — Восстановленные, Б/У",
  "Скрепления ЖБР — Восстановленные, Б/У",
  "Стрелочные переводы — Восстановленные, Б/У",
];

export default function WarrantyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 t-20 md:pt-24">
      <div className="mb-12">
        <span className="section-number">// 04</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
          Гарантия и условия возврата товара
        </h1>
        <div className="neon-line w-32 mt-4" />
      </div>

      <div className="space-y-10 text-[var(--text-1)] leading-relaxed">
        <div className="glass-card p-6">
          <p>
            Наш интернет-магазин «ЖелДорПро» предоставляет официальную гарантию от производителя на всю новую реализуемую продукцию. Сроки гарантии зависят от выбранной Вами продукции, более детальную информацию Вы получите после оформления заказа от менеджера.
          </p>
        </div>

        <Section title="Сообщить о неисправности">
          <p className="mb-4">
            В случае поломки или неисправности изделия в течение гарантийного срока, сообщите нам об этом:
          </p>
          <div className="glass-card p-4 space-y-2">
            <p>
              📞 Телефон: <a href="tel:+79100982802" className="text-[var(--text-red)] hover:underline font-medium">+7 (910) 098-28-02</a>
            </p>
            <p>
              ✉️ Email: <a href="mailto:sales@zheldorpro.ru" className="text-[var(--text-red)] hover:underline font-medium">sales@zheldorpro.ru</a>
            </p>
          </div>
          <p className="mt-4">
            При обращении укажите: дату покупки, название компании и описание неисправности.
          </p>
          <p className="mt-2">
            Если на момент гарантийного обмена аналогичный товар отсутствует, покупатель имеет право приобрести любые другие товары с перерасчётом, получить деньги или осуществить обмен на аналогичный.
          </p>
        </Section>

        {/* Товары, подлежащие возврату */}
        <Section title="Категории товаров, подлежащих возврату">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {returnableItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm p-2 rounded-lg bg-[rgba(255,40,40,0.03)] border border-[rgba(255,50,50,0.1)]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Товары, НЕ подлежащие возврату */}
        <Section title="Категории товаров, не подлежащих возврату">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {nonReturnableItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm p-2 rounded-lg bg-[rgba(255,40,40,0.03)] border border-[rgba(255,50,50,0.1)]">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                <span className="text-[var(--text-2)]">{item}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Возврат товара надлежащего качества">
          <p className="mb-3">
            Согласно Закону о защите прав потребителей обмен и возврат товара возможен в срок <strong className="text-white">до 14 дней</strong> с момента покупки.
          </p>
          <p className="mb-3">
            Обязательное условие: сохранён товарный вид. Стоимость доставки оплачивается покупателем.
          </p>
          <p className="mb-3">
            Стоимость товара возвращается в течение <strong className="text-white">10 календарных дней</strong> с момента оформления возврата на расчётный счёт покупателя.
          </p>
          <div className="glass-card p-4 border-l-2 border-l-[var(--accent)] mt-4">
            <p className="text-sm">
              Для возврата товара напишите на: <a href="mailto:sales@zheldorpro.ru" className="text-[var(--text-red)] hover:underline">sales@zheldorpro.ru</a>
            </p>
          </div>
        </Section>

        <Section title="Возврат товара ненадлежащего качества">
          <p className="mb-3">
            Возврат возможен в срок <strong className="text-white">30 дней</strong> с момента покупки. Любой заводской брак или деформация товара при транспортировке может служить поводом для возврата.
          </p>
          <p className="mb-3">
            Стоимость товара возвращается в течение 10 календарных дней на расчётный счёт покупателя.
          </p>
        </Section>

        {/* Условия возврата */}
        <Section title="Возврат и обмен возможны при соблюдении условий">
          <ul className="space-y-2 ml-2">
            <Condition>Нет повреждений товара и упаковки</Condition>
            <Condition>Товар не был в употреблении</Condition>
            <Condition>Сохранён товарный вид и потребительские свойства</Condition>
            <Condition>Сохранена комплектация</Condition>
          </ul>
        </Section>

        <Section title="Возмещение стоимости доставки">
          <div className="space-y-3">
            <p>
              <strong className="text-white">Надлежащего качества:</strong> стоимость доставки не компенсируется.
            </p>
            <p>
              <strong className="text-white">Ненадлежащего качества:</strong> при условии, что недостаток возник не по вине покупателя — мы возместим стоимость доставки.
            </p>
          </div>
        </Section>

        <div className="glass-card p-6 border border-[rgba(255,50,50,0.3)]">
          <h3 className="text-white font-bold text-lg mb-3 red-glow-text">⚠ Важно</h3>
          <p className="text-[var(--text-1)] text-sm">
            Если покупатель заключал страховой договор на момент транспортировки груза, то в возврате средств будет отказано.
          </p>
        </div>

        <Section title="Возврат при обнаружении заводского брака">
          <p className="mb-4">
            Далеко не каждую проблему можно обнаружить при поверхностном осмотре. Если вы обнаружили дефект после принятия заказа, его можно вернуть. Мы обработаем ваш запрос и решим его в кратчайшие сроки.
          </p>
          <p className="mb-4">
            Если вы не уверены, что обнаруженная неисправность является браком, позвоните нашим специалистам.
          </p>
          <div className="glass-card p-4 space-y-2">
            <p className="text-white font-medium">Свяжитесь с нами:</p>
            <p>📞 <a href="tel:+79100982802" className="text-[var(--text-red)] hover:underline">+7 (910) 098-28-02</a></p>
            <p>✉️ <a href="mailto:sales@zheldorpro.ru" className="text-[var(--text-red)] hover:underline">sales@zheldorpro.ru</a></p>
          </div>
        </Section>
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

function Condition({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 p-2 rounded-lg bg-[rgba(255,40,40,0.03)]">
      <span className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0" />
      <span className="text-sm">{children}</span>
    </li>
  );
}
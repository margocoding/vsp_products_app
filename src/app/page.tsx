import type { Metadata } from 'next';
import Image from 'next/image';
import { Box, ShieldCheck, Truck, Settings } from 'lucide-react';
import CatalogShell from '@/components/CatalogShell';
import { getCatalogContext } from '@/lib/catalog-api';
import heroSleepers from '../../public/hero-sleepers.png';

export const metadata: Metadata = {
  title: { absolute: 'ЖелДорПро — материалы верхнего строения пути' },
  description: 'Материалы ВСП для строительства, ремонта и реконструкции железнодорожных путей: рельсы, шпалы, скрепления и комплектующие.',
};

const benefits = [
  { icon: Box, title: 'Широкий ассортимент', text: <>Все основные элементы ВСП<br />в одном месте</> },
  { icon: ShieldCheck, title: 'Проверенное качество', text: <>Новые, восстановленные<br />и б/у материалы</> },
  { icon: Truck, title: 'Поставки по России', text: <>Надёжная логистика<br />до объекта</> },
  { icon: Settings, title: 'Комплектация под проект', text: <>Подбор решений<br />под ваши задачи</> },
];

export default async function Home() {
  const { categories } = await getCatalogContext();

  return (
    <CatalogShell categories={categories}>
      <section className="railway-hero" aria-labelledby="home-title">
        <div className="railway-hero-copy glass-card">
          <p className="railway-eyebrow">Надёжная основа движения</p>
          <h1 id="home-title">
            <strong>Материалы <em>верхнего строения</em></strong>
            <span>железнодорожного пути</span>
          </h1>
          <div className="railway-intro">
            <p>
              Поставляем материалы ВСП для строительства, ремонта и реконструкции
              железнодорожных путей. В ассортименте представлены железнодорожные рельсы,
              деревянные и железобетонные шпалы, рельсовые скрепления, подкладки, накладки,
              болты, гайки, шайбы и другие элементы верхнего строения пути. Подбираем продукцию
              с учётом типа рельсов, конструкции пути и условий эксплуатации.
            </p>
            <p>
              Предлагаем новые, восстановленные и бывшие в употреблении материалы ВСП
              для предприятий, строительных организаций и владельцев железнодорожной
              инфраструктуры. Поможем подобрать необходимые комплектующие для текущего
              содержания, ремонта и строительства железнодорожных путей, сформировать
              комплексную поставку и организовать доставку продукции до объекта.
            </p>
          </div>
        </div>
        <div className="railway-hero-art">
          <p className="railway-caption caption-purpose">Решения<br />для строительства,<br />ремонта и реконструкции</p>
          <p className="railway-caption caption-products"><b>01</b><span>Рельсы<br />Шпалы<br />Скрепления<br />Комплектующие</span></p>
          <Image
            src={heroSleepers}
            alt="Железобетонные шпалы с рельсовыми скреплениями"
            className="railway-sleepers animate-float"
            sizes="(max-width: 1023px) 100vw, 40vw"
            priority
          />
          <svg className="railway-art-lines" viewBox="0 0 480 360" fill="none" aria-hidden="true">
            <path d="M378 26h75M383 290l47-49h38v-41l-31-35M98 343h72" />
          </svg>
          <p className="railway-caption caption-quality">Качество<br />Надёжность<br />Долгий срок службы</p>
        </div>
      </section>
      <section className="railway-benefits" aria-label="Преимущества поставки">
        {benefits.map(({ icon: Icon, title, text }) => (
          <div className="railway-benefit glass-card" key={title}>
            <span className="railway-benefit-icon"><Icon size={31} strokeWidth={1.5} /></span>
            <div><h2>{title}</h2><p>{text}</p></div>
          </div>
        ))}
      </section>
    </CatalogShell>
  );
}

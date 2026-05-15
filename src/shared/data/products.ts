import type { Product } from '@/shared/types';

const defaultImage = 'https://railstorg.ru/wp-content/uploads/shtyr-mayatnikovyj-dlya-metropolitena-pp-5.201.01.002.png';

// Helper to generate products for a category
const generateProducts = (categoryId: number, categoryName: string, count: number): Product[] => {
  const products: Product[] = [];
  const priceRanges = [
    { min: 100, max: 500 },
    { min: 500, max: 2000 },
    { min: 2000, max: 10000 },
    { min: 10000, max: 50000 }
  ];
  
  for (let i = 0; i < count; i++) {
    const priceRange = priceRanges[Math.floor(Math.random() * priceRanges.length)];
    const price = Math.floor(Math.random() * (priceRange.max - priceRange.min) + priceRange.min);
    const isUsed = Math.random() > 0.7;
    
    products.push({
      id: categoryId * 1000 + i,
      categoryId,
      name: `${categoryName} - ${isUsed ? 'Б/У' : 'Новый'} #${i + 1}`,
      description: `Высококачественный товар категории ${categoryName}. Соответствует всем ГОСТ и техническим требованиям РЖД.`,
      price,
      currency: 'RUB',
      available: Math.random() > 0.1,
      picture: defaultImage,
      delivery: Math.random() > 0.5,
      store: Math.random() > 0.3,
      used: isUsed
    });
  }
  
  return products;
};

export const products: Product[] = [
  // ЖД крепеж
  ...generateProducts(68, 'Клемма ПК', 8),
  ...generateProducts(69, 'Болт путевой М24', 6),
  ...generateProducts(70, 'Гайка путевая М24', 7),
  ...generateProducts(71, 'Шайба путевая', 5),
  ...generateProducts(72, 'Костыль костылевой КД', 6),
  
  // Рельсы и скрепления
  ...generateProducts(73, 'Рельс Р50 б/д', 5),
  ...generateProducts(74, 'Рельс Р65 б/д', 5),
  ...generateProducts(75, 'Рельс Р75 б/д', 4),
  ...generateProducts(76, 'Накладка рельсовая 2Р65', 7),
  ...generateProducts(77, 'Подкладка КП', 6),
  
  // Шпалы и брусья
  ...generateProducts(78, 'Шпала железобетонная Ш1', 5),
  ...generateProducts(79, 'Шпала деревянная I сорта', 6),
  ...generateProducts(80, 'Брус переводной', 4),
  
  // Стрелочные переводы
  ...generateProducts(81, 'Стрелка Р50 марки 1/9', 3),
  ...generateProducts(82, 'Стрелка Р65 марки 1/11', 3),
  ...generateProducts(83, 'Крестовина подвижная', 4),
  ...generateProducts(84, 'Рамный рельс', 3),
  
  // Верхнее строение пути
  ...generateProducts(85, 'Балласт щебеночный фр. 25-60', 5),
  ...generateProducts(86, 'Песок балластный', 4),
  ...generateProducts(87, 'Геотекстиль Дорнит', 5),
  
  // Сигнализация и связь
  ...generateProducts(88, 'Светофор железнодорожный СМ', 4),
  ...generateProducts(89, 'Знак путевой двухсторонний', 6),
  ...generateProducts(90, 'Щит предупреждающий', 5),
  
  // Инструмент путевой
  ...generateProducts(91, 'Ключ путевой универсальный', 7),
  ...generateProducts(92, 'Лом путевой ЛП', 5),
  ...generateProducts(93, 'Молоток путевой МП', 6),
  ...generateProducts(94, 'Ножовка для рельсов', 4),
  
  // Материалы ВСП
  ...generateProducts(95, 'Анкер противоугоновый АП', 8),
  ...generateProducts(96, 'Уголок УП', 6),
  ...generateProducts(97, 'Дюбель путевой ДПУ', 7),
  ...generateProducts(98, 'Пробка деревянная', 5),
  
  // Запчасти для локомотивов
  ...generateProducts(99, 'Колодка тормозная чугунная', 6),
  ...generateProducts(100, 'Песочница локомотивная', 4),
  ...generateProducts(101, 'Форсунка топливная', 5),
  
  // Электротехника ЖД
  ...generateProducts(102, 'Кабель сигнальный СБВГ', 5),
  ...generateProducts(103, 'Аккумулятор ЖД 90Ач', 4),
  ...generateProducts(104, 'Реле путевое НМШ', 5),
  
  // Спецтехника и оборудование
  ...generateProducts(105, 'Тележка путевая грузовая', 3),
  ...generateProducts(106, 'Дрезина мотисная', 3),
  ...generateProducts(107, 'Кран путевой КП', 2),
  
  // Additional sample products with specific names
  {
    id: 10509,
    categoryId: 38,
    name: "Штырь маятниковый для метрополитена, ПП-5.201.01.002 - новый",
    description: "Штырь маятниковый предназначен для использования в системах крепления метрополитена. Изготовлен из высокопрочной стали с антикоррозийным покрытием.",
    price: 500,
    currency: "RUB",
    available: true,
    picture: defaultImage,
    delivery: false,
    store: true
  }
];

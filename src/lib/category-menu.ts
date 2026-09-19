import type { Category } from '@/types/types';

export interface CategoryMenuItem {
  id: string;
  name: string;
  categoryId: string | null;
  icon: string;
  children: CategoryMenuItem[];
}

const normalize = (name: string) => name.toLowerCase().replace(/ё/g, 'е')
  .replace(/^cкрепления/, 'скрепления').replace(/[–—]/g, '-')
  .replace(/р[\s-]+(?=\d)/g, 'р').replace(/\s+/g, ' ').trim();

// The order and individual rail icons follow the supplied category scheme.
const railIcons: Record<string, string> = {
  'переходные рельсы': 'perehodnye-relsy',
  'рамные рельсы': 'ramnye-relsy',
  'рельсы кр': 'relsy-kr',
  'рельсы р18': 'relsy-r18',
  'рельсы р50': 'relsy-r50',
  'рельсы р65': 'relsy-r65',
  'трамвайные рельсы': 'tramvajnye-relsy',
};
const railOrder = Object.keys(railIcons);

function isRailCategory(name: string) {
  return railOrder.includes(name) || /^(рельсы\s|другие марки рельс)/.test(name);
}

function categoryIcon(name: string): string {
  if (railOrder.includes(name)) return railIcons[name];
  if (isRailCategory(name) || name === 'железнодорожные рельсы') return 'zheleznodorozhnye-relsy';
  if (name.includes('деревянные шпалы')) return 'derevyannye-shpaly';
  if (name === 'железнодорожные шпалы') return 'materialy-vsp';
  if (name.includes('шпалы')) return 'zheleznobetonnye-shpaly';
  if (name.includes('стрелочные переводы')) return 'strelochnye-perevody';
  if (name === 'скрепления арс') return 'skrepleniya-ars';
  if (name === 'скрепления жбр') return 'skrepleniya-zhbr';
  if (/изоляци|прокладки|подкладки/.test(name)) return 'zheleznodorozhnye-podkladki';
  if (name.includes('путевой инструмент')) return 'putevoj-instrument';
  if (/вагон|автосцепка|балка|колесные пары|локомотив|рама боковая|тормозной башмак/.test(name)) return 'zapchasti-dlya-vagonov';
  if (/креп|болты|гайки|шайбы|шурупы|накладки|клемма|костыль|противоугон/.test(name)) return 'zheleznodorozhnyj-krepezh';
  return 'materialy-vsp';
}

function toMenuItem(category: Category): CategoryMenuItem {
  return {
    id: category.id,
    name: category.name,
    categoryId: category.id,
    icon: categoryIcon(normalize(category.name)),
    children: (category.children ?? []).map(toMenuItem),
  };
}

interface MenuGroup {
  id: string;
  name: string;
  icon: string;
  aliases?: string[];
  children?: string[];
  matchChild?: (name: string) => boolean;
}

// Top-level sections follow the Roman numerals in the supplied scheme.
const menuGroups: MenuGroup[] = [
  {
    id: 'railway-rails', name: 'Железнодорожные рельсы', icon: 'zheleznodorozhnye-relsy',
    children: railOrder, matchChild: isRailCategory,
  },
  { id: 'concrete-sleepers', name: 'Железобетонные шпалы', icon: 'zheleznobetonnye-shpaly' },
  { id: 'wooden-sleepers', name: 'Деревянные шпалы', icon: 'derevyannye-shpaly' },
  {
    id: 'railway-switches', name: 'Стрелочные переводы', icon: 'strelochnye-perevody',
    aliases: ['Стрелочные переводы — комплектующие'],
  },
  { id: 'ars-fastenings', name: 'Скрепления АРС', icon: 'skrepleniya-ars' },
  { id: 'zhbr-fastenings', name: 'Скрепления ЖБР', icon: 'skrepleniya-zhbr' },
  {
    id: 'insulation-pads', name: 'Изоляция и прокладки', icon: 'zheleznodorozhnye-podkladki',
    children: ['Железнодорожная изоляция', 'Железнодорожные прокладки'],
  },
  {
    id: 'railway-fastenings', name: 'Железнодорожный крепеж', icon: 'zheleznodorozhnyj-krepezh',
    children: [
      'Скрепления КБ', 'ЖД болты', 'ЖД гайки', 'ЖД шайбы', 'ЖД шурупы',
      'Железнодорожные накладки', 'Железнодорожные подкладки', 'Клемма ПК', 'Костыль путевой', 'Противоугоны',
    ],
  },
  {
    id: 'track-materials', name: 'Материалы ВСП', icon: 'materialy-vsp',
    // The generic sleeper category contains wood, concrete and other products.
    children: ['Материалы ВСП — Распродажа!', 'Железнодорожные шпалы'],
  },
  { id: 'track-tools', name: 'Путевой инструмент', icon: 'putevoj-instrument' },
  {
    id: 'wagon-parts', name: 'Вагонные запчасти', icon: 'zapchasti-dlya-vagonov',
    children: [
      'Автосцепка СА-3', 'Вагонная тележка', 'Балка надрессорная', 'Рама боковая',
      'Вагонные оси', 'Колесные пары', 'Локомотивные колодки', 'Тормозной башмак',
    ],
  },
];

export function buildCategoryMenu(categories: Category[]): CategoryMenuItem[] {
  let remaining = categories.map(toMenuItem);
  const menu: CategoryMenuItem[] = [];

  for (const group of menuGroups) {
    const parentNames = [group.name, ...(group.aliases ?? [])].map(normalize);
    const childNames = (group.children ?? []).map(normalize);
    const parent = remaining.find((item) => parentNames.includes(normalize(item.name)));
    const members = remaining.filter((item) => item !== parent && (
      childNames.includes(normalize(item.name)) || group.matchChild?.(normalize(item.name))
    ));
    if (!parent && !members.length) continue;

    const children = [...(parent?.children ?? []), ...members];
    children.sort((a, b) => {
      const aIndex = childNames.indexOf(normalize(a.name));
      const bIndex = childNames.indexOf(normalize(b.name));
      return (aIndex < 0 ? childNames.length : aIndex) - (bIndex < 0 ? childNames.length : bIndex);
    });

    // Existing parents retain their own catalog link as well as their children.
    menu.push({
      id: parent?.id ?? group.id,
      categoryId: parent?.categoryId ?? null,
      name: group.name,
      icon: group.icon,
      children,
    });
    const usedIds = new Set([parent?.id, ...members.map((item) => item.id)]);
    remaining = remaining.filter((item) => !usedIds.has(item.id));
  }

  // New or unclassified API categories must remain reachable.
  return [...menu, ...remaining];
}

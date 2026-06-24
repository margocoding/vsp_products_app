export interface PublishedSite {
  id: string;
  domain: string;
}

export interface Category {
  id: string;
  name: string;
  parentId?: string | null;
  productsCount: number;
  children?: {
    id: string;
    name: string;
    productsCount: number;
  }[];
  createdAt?: string;
}

export type ProductCondition = 'NEW' | 'USED' | 'REFURBISHED' | 'RESERVED';

export interface Characteristic {
  id: string;
  title: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  price: string;
  priceUnit: string;
  image: string | null;
  categoryId?: string | null;
  publishedSitesCount: number;
  quantity: number;
  unit: string;
  condition: ProductCondition;
  characteristics: Characteristic[];
  createdAt: string;
}

export interface Stat {
  label: string;
  value: string;
  unit: string;
  hasGraph?: boolean;
}

export interface Standard {
  name: string;
}
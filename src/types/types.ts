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

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  standard?: string;
  length?: string;
  weight?: string;
  price: string;
  priceUnit: string;
  image: string;
  categoryId?: string | null;
  publishedSitesCount: number;
  quantity: number;
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
export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  standard?: string;
  length?: string;
  weight?: string;
  price: string;
  priceUnit: string;
  status: 'IN STOCK' | 'OUT OF STOCK';
  image: string;
  type: 'rail' | 'component';
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
// Category types for railway materials
export interface Category {
  id: number;
  name: string;
  children?: Category[];
}

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  available: boolean;
  picture: string;
  delivery: boolean;
  store: boolean;
  used?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

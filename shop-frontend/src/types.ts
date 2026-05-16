export interface Category {
  id: number;
  name: string;
  description?: string | null;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  categories: Category[];
  image?: string | null;
}

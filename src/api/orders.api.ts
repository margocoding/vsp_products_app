import { baseApi } from "./base.api";

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderDto {
  email: string;
  comment?: string;
  items: OrderItem[];
}

export interface Order {
  id: string;
  email: string;
  comment?: string | null;
  status: 'NEW' | 'PROCESSED' | 'CANCELLED';
  totalPrice: string;
  currency: string;
  items: {
    id: string;
    productId: string;
    name: string;
    quantity: number;
    price: string;
  }[];
  createdAt: string;
}

export const ordersApi = {
  async create(dto: CreateOrderDto): Promise<Order> {
    const { data } = await baseApi.post('/orders', dto);
    return data;
  },
};
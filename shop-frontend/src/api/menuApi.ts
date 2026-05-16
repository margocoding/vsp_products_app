import api from '../api';
import type { Category, MenuItem } from '../types';

export const menuApi = {
  // Categories
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },

  getCategory: async (categoryId: number): Promise<Category> => {
    const response = await api.get(`/categories/${categoryId}`);
    return response.data;
  },

  // Menu Items
  getMenu: async (category?: string, search?: string): Promise<MenuItem[]> => {
    const params: Record<string, string> = {};
    if (category) params.category = category;
    if (search) params.search = search;
    
    const response = await api.get('/menu', { params });
    return response.data;
  },

  getMenuItem: async (itemId: number): Promise<MenuItem> => {
    const response = await api.get(`/menu/${itemId}`);
    return response.data;
  },
};

export default menuApi;

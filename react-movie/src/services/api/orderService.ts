import axiosInstance from './axiosConfig';
import { CreateOrderRequest, UpdateOrderRequest, Order } from './types';

export const orderService = {
  createOrder: async (data: CreateOrderRequest) => {
    const response = await axiosInstance.post<Order>('/orders', data);
    return response.data;
  },

  getUserOrders: async () => {
    const response = await axiosInstance.get<Order[]>('/orders');
    return response.data;
  },

  getOrder: async (id: string) => {
    const response = await axiosInstance.get<Order>(`/orders/${id}`);
    return response.data;
  },

  updateOrderStatus: async (id: string, data: UpdateOrderRequest) => {
    const response = await axiosInstance.patch<Order>(`/orders/${id}`, data);
    return response.data;
  },

  deleteOrder: async (id: string) => {
    await axiosInstance.delete(`/orders/${id}`);
  },
}; 
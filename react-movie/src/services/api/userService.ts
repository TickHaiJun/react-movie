import axiosInstance from './axiosConfig';
import { CreateUserRequest, UpdateUserRequest, User } from './types';

export const userService = {
  createUser: async (data: CreateUserRequest) => {
    const response = await axiosInstance.post<User>('/users', data);
    return response.data;
  },

  getAllUsers: async () => {
    const response = await axiosInstance.get<User[]>('/users');
    return response.data;
  },

  getUser: async (id: string) => {
    const response = await axiosInstance.get<User>(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id: string, data: UpdateUserRequest) => {
    const response = await axiosInstance.patch<User>(`/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: string) => {
    await axiosInstance.delete(`/users/${id}`);
  },
}; 
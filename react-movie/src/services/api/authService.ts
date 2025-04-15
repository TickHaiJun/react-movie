import axiosInstance from './axiosConfig';
import { LoginRequest, LoginResponse } from './types';

export const authService = {
  login: async (data: LoginRequest) => {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', data);
    return response.data;
  },
}; 
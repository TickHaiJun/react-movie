// Auth Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

// User Types
export interface CreateUserRequest {
  username: string;
  password: string;
  email: string;
  nickname: string;
}

export interface UpdateUserRequest {
  email?: string;
  nickname?: string;
  password?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  nickname: string;
}

// Event Types
export type EventType = 'DRAMA' | 'MOVIE' | 'CONCERT';

export interface CreateEventRequest {
  title: string;
  time: string;
  location: string;
  backgroundImage?: string;
  price: number;
  type: EventType;
}

export interface Event extends CreateEventRequest {
  id: string;
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {}

// Order Types
export type PaymentMethod = 'WECHAT' | 'ALIPAY' | 'CREDIT_CARD';
export type OrderStatus = 'PENDING' | 'PAID' | 'CANCELLED' | 'COMPLETED';

export interface CreateOrderRequest {
  eventId: string;
  paymentMethod: PaymentMethod;
}

export interface UpdateOrderRequest {
  status: OrderStatus;
}

export interface Order {
  id: string;
  eventId: string;
  userId: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  updatedAt: string;
} 
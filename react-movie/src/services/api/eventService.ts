import axiosInstance from './axiosConfig';
import { CreateEventRequest, UpdateEventRequest, Event } from './types';

interface SearchParams {
  title?: string;
  type?: 'DRAMA' | 'MOVIE' | 'CONCERT' | 'all';
  page?: number;
  pageSize?: number;
}

interface SearchResponse {
  items: Event[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const eventService = {
  createEvent: async (data: CreateEventRequest) => {
    const response = await axiosInstance.post<Event>('/events', data);
    return response.data;
  },

  getAllEvents: async () => {
    const response = await axiosInstance.get<Event[]>('/events');
    return response.data;
  },

  getEvent: async (id: string) => {
    const response = await axiosInstance.get<Event>(`/events/${id}`);
    return response.data;
  },

  updateEvent: async (id: string, data: UpdateEventRequest) => {
    const response = await axiosInstance.patch<Event>(`/events/${id}`, data);
    return response.data;
  },

  deleteEvent: async (id: string) => {
    await axiosInstance.delete(`/events/${id}`);
  },
  
  searchEvents: async (params: SearchParams) => {
    const response = await axiosInstance.get<SearchResponse>('/events/search', { params });
    return response.data;
  },
}; 
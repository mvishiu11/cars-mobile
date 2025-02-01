import apiClient from '../api/apiClient';
import { Flat } from '../types';

export async function getAllFlats(): Promise<Flat[]> {
    const response = await apiClient.get('/api/flats');
    return response.data;
}

export const getFlatById = async (id: number) => {
  const response = await apiClient.get(`/api/flats/${id}`);
  return response.data;
};

export const updateFlat = async (id: number, flatData: any) => {
  const response = await apiClient.put(`/api/flats/${id}`, flatData);
  return response.data;
};
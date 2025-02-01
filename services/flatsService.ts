import apiClient from '../api/apiClient';
import { Flat } from '../types';

export async function getAllFlats(): Promise<Flat[]> {
    const response = await apiClient.get('/api/flats');
    return response.data;
}

export async function getFlatById(id: number): Promise<Flat> {
    const response = await apiClient.get(`/api/flats/${id}`);
    return response.data;
}

export async function putFlat(id: number, data: Partial<Flat>): Promise<Flat> {
    const response = await apiClient.put(`/api/flats/${id}`, data);
    return response.data;
}
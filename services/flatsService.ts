import apiClient from '../api/apiClient';
import { Flat } from '../types';

const API_PREFIX = '/flatly';

export async function getAllFlats(): Promise<Flat[]> {
    const response = await apiClient.get(API_PREFIX + '/api/flats');
    return response.data;
}

export async function getFlatById(id: number): Promise<Flat> {
    const response = await apiClient.get(API_PREFIX + `/api/flats/${id}`);
    return response.data;
}

export async function putFlat(id: number, data: Partial<Flat>): Promise<Flat> {
    const response = await apiClient.put(API_PREFIX + `/api/flats/${id}`, data);
    return response.data;
}
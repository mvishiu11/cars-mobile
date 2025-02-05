import apiClient from '../api/apiClient';
import { Flat } from '../types';

const API_PREFIX = '/flatly/api';

export async function getAllFlats(): Promise<Flat[]> {
    const response = await apiClient.get(API_PREFIX + '/flats');
    return response.data;
}

export async function getFlatById(id: number): Promise<Flat> {
    const response = await apiClient.get(API_PREFIX + `/flats/${id}`);
    return response.data;
}

export async function putFlat(id: number, data: Partial<Flat>): Promise<Flat> {
    const response = await apiClient.put(API_PREFIX + `/flats/${id}`, data);
    return response.data;
}

export async function getFlatsByUserEmail(email: string): Promise<Flat[]> {
    const response = await apiClient.get(API_PREFIX + `/bookings/active/flats?userEmail=${email}`);
    return response.data;
}
import apiClient from '../api/apiClient';
import { Flat, FlatBooking } from '../types';

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

export async function getFlatsByUserEmail(email: string): Promise<FlatBooking[]> {
    const response = await apiClient.get(API_PREFIX + `/bookings/active/flats?userEmail=${email}`);
    return response.data;
}

export async function getBookingsByUserEmail(email: string): Promise<Flat[]> {
    const response = await apiClient.get(API_PREFIX + `/bookings/active/flats?userEmail=${email}`);
    return response.data;
}

export async function postBooking(flatId: number, userEmail: string, startDate: string, endDate: string): Promise<void> {
    await apiClient.post(API_PREFIX + '/bookings', {
        flatId,
        userEmail,
        startDate,
        endDate,
        status: 'ACTIVE',
        system: 'CARLY',
    });
}

export async function deleteBooking(id: number): Promise<void> {
    await apiClient.delete(API_PREFIX + `/bookings/${id}`);
}
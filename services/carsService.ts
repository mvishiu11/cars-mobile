import apiClient from "../api/apiClient";
import { Car, Rental } from "../types";

/**
 * Pagination shape from the backend
 */
interface PageMeta {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface RentalsResponse {
  content: Rental[];
  page: PageMeta;
}

export interface CarsResponse {
    content: Car[];
    page: PageMeta;
}

/**
 * Fetches a page of rentals from the backend
 */
export async function getRentals(pageParam: number, size: number): Promise<RentalsResponse> {
  const response = await apiClient.get<RentalsResponse>("/rentals/", {
    params: {
      page: pageParam,
      size: size,
    },
  });
  return response.data;
}

/**
 * Fetches a rental by its ID from the backend
 */
export async function getRentalById(id: string): Promise<Rental> {
    const response = await apiClient.get<Rental>(`/rentals/${id}`);
    return response.data;
}

/**
 * Cancels a rental by its ID
 */
export async function cancelRental(id: string): Promise<void> {
    await apiClient.delete(`/rentals/${id}`);
}

/**
 * Fetches a page of cars from the backend
 */
export async function getCars(page = 0, size = 10): Promise<CarsResponse> {
    const response = await apiClient.get<CarsResponse>("/cars/", {
      params: { 
        page: page, 
        size: size },
    });
    return response.data;
}

/**
 * Fetches a car by its ID from the backend
 */
export async function getCarById(id: string): Promise<Car> {
    const response = await apiClient.get<Car>(`/cars/${id}`);
    return response.data;
}

/**
 * Rents a car
 */
export async function postRentCar(carId: string, startAt: string, endAt: string): Promise<Rental> {
    const response = await apiClient.post<Rental>("/rentals/", {
        carId,
        startAt,
        endAt,
    });
    return response.data;
}
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
 * GET /cars?page=X&size=Y
 * 
 * If you need pagination, accept page & size as params.
 * If you just want all cars, you can omit them for now.
 */
export async function getCars(page = 0, size = 10): Promise<CarsResponse> {
    const response = await apiClient.get<CarsResponse>("/cars", {
      params: { page, size },
    });
    return response.data;
  }
  
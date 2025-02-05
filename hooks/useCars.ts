import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getRentals, getCars, RentalsResponse, CarsResponse } from "../services/carsService";

const PAGE_SIZE = 5;

export function useInfiniteRentals() {
  return useInfiniteQuery<RentalsResponse>({
    queryKey: ["rentalsInfinite"],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      return getRentals(pageParam, PAGE_SIZE);
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPageNumber = lastPage.page.number;
      const totalPages = lastPage.page.totalPages;
      if (currentPageNumber + 1 < totalPages) {
        return currentPageNumber + 1;
      }
      return undefined; // no more pages
    },
  });
}

/**
 * A simple hook for fetching cars from /cars
 * 
 * @param page number (optional)
 * @param size number (optional)
 */
export function useCars(page = 0, size = 10) {
    return useQuery<CarsResponse, Error>({
      queryKey: ["cars", page, size],
      queryFn: () => getCars(page, size),
      // Optional: e.g. staleTime, refetchOnWindowFocus, enabled, etc.
    });
  }
import { useInfiniteQuery } from "@tanstack/react-query";
import { getRentals, getCars, RentalsResponse, CarsResponse } from "../services/carsService";

/** For RENTALS: infinite pagination */
export function useInfiniteRentals() {
  return useInfiniteQuery<RentalsResponse, Error>({
    queryKey: ["rentalsInfinite"],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      return getRentals(pageParam as number, 5);
    },
    getNextPageParam: (lastPage) => {
      const currentPageNumber = lastPage.page.number;
      const totalPages = lastPage.page.totalPages;
      if (currentPageNumber + 1 < totalPages) {
        return currentPageNumber + 1;
      }
      return undefined;
    },
  });
}

/** For CARS: infinite pagination */
export function useInfiniteCars() {
  return useInfiniteQuery<CarsResponse, Error>({
    queryKey: ["carsInfinite"],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      return getCars(pageParam as number, 10);
    },
    getNextPageParam: (lastPage) => {
      const currentPageNumber = lastPage.page.number;
      const totalPages = lastPage.page.totalPages;
      if (currentPageNumber + 1 < totalPages) {
        return currentPageNumber + 1;
      }
      return undefined;
    },
  });
}

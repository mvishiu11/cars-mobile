import { useInfiniteQuery, 
         useQuery,
         useMutation,
         useQueryClient } from "@tanstack/react-query";
import { getRentals,
         getRentalById, 
         cancelRental,
         postRentCar,
         getCars, 
         getCarById,
         getLocations,
         RentalsResponse, 
         CarsResponse } from "../services/carsService";
import { Car, Rental, LocationData } from "../types";

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

export function useRentals(page: number, size: number) {
  return useQuery<RentalsResponse, Error>({
    queryKey: ["rentals", page, size],
    queryFn: () => getRentals(page, size),
  });
}

/** For CARS: infinite pagination with filters */
export function useInfiniteCars(filters: {
  brandName?: string;
  modelName?: string;
  productionYear?: number;
  fuelType?: string;
  fuelCapacity?: number;
  seatCount?: number;
  doorCount?: number;
  dailyRate?: number;
  from?: string;
  to?: string;
  distance? : number;
  city? : string;
} = {}) {
  return useInfiniteQuery<CarsResponse, Error>({
    queryKey: ["carsInfinite", filters],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      return getCars(pageParam as number, 10, filters);
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

export function useCarById(id: string) {
    return useQuery<Car, Error>({
        queryKey: ["car", id],
        queryFn: () => getCarById(id)
    });
}

export function useRentalById(id: string) {
    return useQuery<Rental, Error>({
        queryKey: ["rental", id],
        queryFn: () => getRentalById(id)
    });
}

/**
 * Hook to cancel a rental and clear query cache
 */
export function useCancelRental() {
    const queryClient = useQueryClient();
    
    return useMutation<void, Error, string>({
      mutationFn: (id: string) => cancelRental(id),
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ["carsInfinite"] });
        queryClient.invalidateQueries({ queryKey: ["rentalsInfinite"] });
        queryClient.invalidateQueries({ queryKey: ["rentals"] });
        queryClient.invalidateQueries({ queryKey: ["rental", id] });
      }
    });
}  

export function useRent() {
  const queryClient = useQueryClient();
    
  return useMutation<Rental, Error, { carId: string, startAt: string, endAt: string }>({
    mutationFn: ({ carId, startAt, endAt }) => postRentCar(carId, startAt, endAt),
    onSuccess: (_, { carId }) => {
      queryClient.invalidateQueries({ queryKey: ["carsInfinite"] });
      queryClient.invalidateQueries({ queryKey: ["rentalsInfinite"] });
            queryClient.invalidateQueries({ queryKey: ["rentals"] });
      queryClient.invalidateQueries({ queryKey: ["car", carId] });
    }
  })
}

export function useLocations() {
  return useQuery<LocationData[], Error>({
    queryKey: ["locations"],
    queryFn: getLocations
  });
}
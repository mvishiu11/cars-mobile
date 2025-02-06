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
         RentalsResponse, 
         CarsResponse } from "../services/carsService";
import { Car, Rental } from "../types";

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
        queryClient.invalidateQueries({ queryKey: ["rentalsInfinite"] });
        queryClient.invalidateQueries({ queryKey: ["rental", id] });
      }
    });
}  

export function useRent() {
  const queryClient = useQueryClient();
    
  return useMutation<Rental, Error, { carId: string, pickupDate: string, returnDate: string }>({
    mutationFn: ({ carId, pickupDate, returnDate }) => postRentCar(carId, pickupDate, returnDate),
    onSuccess: (_, { carId }) => {
      queryClient.invalidateQueries({ queryKey: ["carsInfinite"] });
      queryClient.invalidateQueries({ queryKey: ["car", carId] });
      queryClient.invalidateQueries({ queryKey: ["rentalsInfinite"] });
    }
  })
}
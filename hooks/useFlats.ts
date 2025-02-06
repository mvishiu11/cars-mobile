import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllFlats, getFlatById, putFlat, getFlatsByUserEmail, postBooking, deleteBooking } from '../services/flatsService';
import { Flat, Booking } from '../types';

export function useFlats() {
    return useQuery<Flat[], Error>({
      queryKey: ['flats'],
      queryFn: getAllFlats,
    });
}

export function useFlat(id?: number) {
    return useQuery<Flat, Error>({
      queryKey: ['flat', id],
      queryFn: () => {
        if (!id) throw new Error('No ID provided');
        return getFlatById(id);
      },
      enabled: !!id,
    });
}
  
export function useUpdateFlat() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Flat> }) =>
      putFlat(id, data),
    onSuccess: (updatedFlat) => {
      queryClient.invalidateQueries({ queryKey: ['flats'] });
      queryClient.invalidateQueries({ queryKey: ['flat', updatedFlat.id] });
    },
  });
}

export function useRentedFlats(email: string) {
    return useQuery<Flat[], Error>({
      queryKey: ['rentedFlats', email],
      queryFn: () => getFlatsByUserEmail(email),
    });
}

export function useRentFlat() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ flatId, userEmail, startDate, endDate }: Booking) =>
        postBooking(flatId, userEmail, startDate, endDate),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['flats'] });
        queryClient.invalidateQueries({ queryKey: ['rentedFlats'] });
      },
    });
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (bookingId: number) => deleteBooking(bookingId),
    onSuccess: (_, bookingId) => {
      queryClient.invalidateQueries({ queryKey: ['flats'] });
      queryClient.invalidateQueries({ queryKey: ['flat', bookingId] });
      queryClient.invalidateQueries({ queryKey: ['rentalsInfinite'] });
    },
  });
}
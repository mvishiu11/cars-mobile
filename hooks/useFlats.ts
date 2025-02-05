import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllFlats, getFlatById, putFlat } from '../services/flatsService';
import { Flat } from '../types';

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

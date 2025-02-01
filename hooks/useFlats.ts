import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllFlats, getFlatById, updateFlat } from '../services/flatsService';
import { Flat } from '../types';

export function useFlats() {
    return useQuery<Flat[], Error>({
      queryKey: ['flats'],
      queryFn: getAllFlats,
    });
}

export function useFlat(id: number) {
    return useQuery({
        queryKey: ['flat', id], 
        queryFn: () => getFlatById(id)
    });
}

export function useUpdateFlat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateFlat(id, data),
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ['flats']
        });
    },
  });
}

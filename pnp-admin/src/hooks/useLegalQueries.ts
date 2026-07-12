import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLegalQueries, deleteLegalQuery } from '../services/legalQueries.service';
import { toast } from 'sonner';

export function useLegalQueries(search?: string) {
  return useQuery({
    queryKey: ['legal_queries', search],
    queryFn: () => getLegalQueries(search),
  });
}

export function useDeleteLegalQuery() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLegalQuery(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['legal_queries'] });
      toast.success('Legal query deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMandiPrices, addMandiPrice, deleteMandiPrice, triggerMandiScraper } from '../services/mandiPrices.service';
import type { MandiPrice } from '../services/mandiPrices.service';
import { toast } from 'sonner';

export function useMandiPrices(search?: string) {
  return useQuery({
    queryKey: ['mandi_prices', search],
    queryFn: () => getMandiPrices(search),
  });
}

export function useAddMandiPrice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (price: Omit<MandiPrice, 'id' | 'recorded_at'>) => addMandiPrice(price),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mandi_prices'] });
      toast.success('Price added');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteMandiPrice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMandiPrice(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mandi_prices'] });
      toast.success('Price deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useTriggerMandiScraper() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => triggerMandiScraper(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mandi_prices'] });
      toast.success('Mandi scraper triggered');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBloodDonors, toggleDonorAvailability, deleteBloodDonor } from '../services/bloodDonors.service';
import { toast } from 'sonner';

export function useBloodDonors(search?: string) {
  return useQuery({
    queryKey: ['blood_donors', search],
    queryFn: () => getBloodDonors(search),
  });
}

export function useToggleDonorAvailability() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, is_available }: { id: string; is_available: boolean }) =>
      toggleDonorAvailability(id, is_available),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['blood_donors'] });
      toast.success('Donor availability updated');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteBloodDonor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBloodDonor(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['blood_donors'] });
      toast.success('Blood donor deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

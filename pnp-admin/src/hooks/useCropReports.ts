import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCropReports, deleteCropReport } from '../services/cropReports.service';
import { toast } from 'sonner';

export function useCropReports(search?: string) {
  return useQuery({
    queryKey: ['crop_reports', search],
    queryFn: () => getCropReports(search),
  });
}

export function useDeleteCropReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCropReport(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['crop_reports'] });
      toast.success('Crop report deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

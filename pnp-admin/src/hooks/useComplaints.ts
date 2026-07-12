import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getComplaints, updateComplaintStatus, deleteComplaint } from '../services/complaints.service';
import { toast } from 'sonner';

export function useComplaints(search?: string) {
  return useQuery({
    queryKey: ['complaints', search],
    queryFn: () => getComplaints(search),
  });
}

export function useUpdateComplaintStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateComplaintStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['complaints'] });
      qc.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Complaint status updated');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteComplaint() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteComplaint(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['complaints'] });
      qc.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Complaint deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

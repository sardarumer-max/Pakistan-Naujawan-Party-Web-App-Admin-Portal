import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getJobs, approveJob, rejectJob, deleteJob } from '../services/jobs.service';
import { toast } from 'sonner';

export function useJobs(search?: string) {
  return useQuery({
    queryKey: ['jobs', search],
    queryFn: () => getJobs(search),
  });
}

export function useApproveJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => approveJob(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['jobs'] });
      qc.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Job approved');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useRejectJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => rejectJob(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('Job rejected');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteJob(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['jobs'] });
      qc.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Job deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

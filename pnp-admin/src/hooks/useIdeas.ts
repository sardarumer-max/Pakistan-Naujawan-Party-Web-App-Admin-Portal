import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getIdeas, approveIdea, rejectIdea, flagIdea, deleteIdea } from '../services/ideas.service';
import { toast } from 'sonner';

export function useIdeas(search?: string) {
  return useQuery({
    queryKey: ['ideas', search],
    queryFn: () => getIdeas(search),
  });
}

export function useApproveIdea() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => approveIdea(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['ideas'] });
      qc.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Idea approved');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useRejectIdea() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => rejectIdea(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['ideas'] });
      toast.success('Idea rejected');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useFlagIdea() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => flagIdea(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['ideas'] });
      toast.success('Idea flagged for review');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteIdea() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteIdea(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['ideas'] });
      qc.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Idea deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

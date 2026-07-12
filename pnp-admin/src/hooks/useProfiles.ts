import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfiles, getAdmins, updateProfile, updateRole, deleteProfile } from '../services/profiles.service';
import type { Profile } from '../services/profiles.service';
import { toast } from 'sonner';

export function useProfiles(search?: string) {
  return useQuery({
    queryKey: ['profiles', search],
    queryFn: () => getProfiles(search),
  });
}

export function useAdmins() {
  return useQuery({
    queryKey: ['admins'],
    queryFn: () => getAdmins(),
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Profile> }) =>
      updateProfile(id, updates),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['profiles'] });
      qc.invalidateQueries({ queryKey: ['admins'] });
      toast.success('Profile updated');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) => updateRole(id, role),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['profiles'] });
      qc.invalidateQueries({ queryKey: ['admins'] });
      toast.success('Role updated');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProfile(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['profiles'] });
      qc.invalidateQueries({ queryKey: ['admins'] });
      toast.success('Profile deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

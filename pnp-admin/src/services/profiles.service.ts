import { supabaseAdmin } from '../lib/supabase';

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  province: string | null;
  district: string | null;
  preferred_language: string;
  role: string;
  created_at: string;
}

export async function getProfiles(search?: string) {
  let q = supabaseAdmin.from('profiles').select('*').order('created_at', { ascending: false });
  if (search) {
    q = q.or(`full_name.ilike.%${search}%,phone.ilike.%${search}%,province.ilike.%${search}%,district.ilike.%${search}%`);
  }
  const { data, error } = await q;
  if (error) throw error;
  return data as Profile[];
}

export async function getProfileById(id: string) {
  const { data, error } = await supabaseAdmin.from('profiles').select('*').eq('id', id).single();
  if (error) throw error;
  return data as Profile;
}

export async function updateProfile(id: string, updates: Partial<Profile>) {
  const { data, error } = await supabaseAdmin.from('profiles').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data as Profile;
}

export async function updateRole(id: string, role: string) {
  return updateProfile(id, { role });
}

export async function deleteProfile(id: string) {
  const { error } = await supabaseAdmin.from('profiles').delete().eq('id', id);
  if (error) throw error;
}

export async function getAdmins() {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .in('role', ['admin', 'moderator'])
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Profile[];
}

export async function getProfileStats() {
  const { count, error } = await supabaseAdmin.from('profiles').select('*', { count: 'exact', head: true });
  if (error) throw error;
  return count ?? 0;
}

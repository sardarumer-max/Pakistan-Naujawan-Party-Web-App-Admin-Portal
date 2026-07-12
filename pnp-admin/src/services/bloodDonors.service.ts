import { supabaseAdmin } from '../lib/supabase';

export interface BloodDonor {
  id: string;
  user_id: string;
  blood_group: string;
  city: string;
  district: string | null;
  is_available: boolean;
  last_donated: string | null;
  contact_phone: string | null;
  created_at: string;
  /* joined */
  profiles?: { full_name: string | null } | null;
}

export async function getBloodDonors(search?: string) {
  let q = supabaseAdmin
    .from('blood_donors')
    .select('*, profiles(full_name)')
    .order('created_at', { ascending: false });
  if (search) {
    q = q.or(`blood_group.ilike.%${search}%,city.ilike.%${search}%,district.ilike.%${search}%`);
  }
  const { data, error } = await q;
  if (error) throw error;
  return data as BloodDonor[];
}

export async function toggleDonorAvailability(id: string, is_available: boolean) {
  const { data, error } = await supabaseAdmin
    .from('blood_donors')
    .update({ is_available })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as BloodDonor;
}

export async function deleteBloodDonor(id: string) {
  const { error } = await supabaseAdmin.from('blood_donors').delete().eq('id', id);
  if (error) throw error;
}

export async function getBloodDonorStats() {
  const { count, error } = await supabaseAdmin
    .from('blood_donors')
    .select('*', { count: 'exact', head: true })
    .eq('is_available', true);
  if (error) throw error;
  return count ?? 0;
}

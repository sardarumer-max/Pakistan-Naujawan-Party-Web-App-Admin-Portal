import { supabaseAdmin } from '../lib/supabase';

export interface Complaint {
  id: string;
  user_id: string;
  category: string;
  description_raw: string | null;
  description_formal: string | null;
  status: string;
  district: string | null;
  province: string | null;
  lat: number | null;
  lng: number | null;
  department: string | null;
  urgency: string;
  upvote_count: number;
  created_at: string;
  /* joined */
  profiles?: { full_name: string | null } | null;
}

export async function getComplaints(search?: string) {
  let q = supabaseAdmin
    .from('complaints')
    .select('*, profiles(full_name)')
    .order('created_at', { ascending: false });
  if (search) {
    q = q.or(`category.ilike.%${search}%,description_raw.ilike.%${search}%,district.ilike.%${search}%,department.ilike.%${search}%,status.ilike.%${search}%`);
  }
  const { data, error } = await q;
  if (error) throw error;
  return data as Complaint[];
}

export async function updateComplaintStatus(id: string, status: string) {
  const { data, error } = await supabaseAdmin
    .from('complaints')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Complaint;
}

export async function deleteComplaint(id: string) {
  const { error } = await supabaseAdmin.from('complaints').delete().eq('id', id);
  if (error) throw error;
}

export async function getComplaintStats() {
  const { count, error } = await supabaseAdmin.from('complaints').select('*', { count: 'exact', head: true });
  if (error) throw error;
  return count ?? 0;
}

export async function getCriticalComplaints() {
  const { data, error } = await supabaseAdmin
    .from('complaints')
    .select('*, profiles(full_name)')
    .eq('urgency', 'critical')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Complaint[];
}

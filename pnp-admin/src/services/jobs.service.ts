import { supabaseAdmin } from '../lib/supabase';

export interface Job {
  id: string;
  title: string;
  company: string | null;
  job_type: string;
  description: string | null;
  location: string | null;
  district: string | null;
  province: string | null;
  salary_range: string | null;
  deadline: string | null;
  apply_link: string | null;
  is_verified: boolean;
  ai_scam_score: number;
  ai_scam_flags: string[] | null;
  posted_by: string | null;
  created_at: string;
  /* joined */
  profiles?: { full_name: string | null } | null;
}

export async function getJobs(search?: string) {
  let q = supabaseAdmin
    .from('jobs')
    .select('*, profiles(full_name)')
    .order('created_at', { ascending: false });
  if (search) {
    q = q.or(`title.ilike.%${search}%,company.ilike.%${search}%,location.ilike.%${search}%,district.ilike.%${search}%,job_type.ilike.%${search}%`);
  }
  const { data, error } = await q;
  if (error) throw error;
  return data as Job[];
}

export async function approveJob(id: string) {
  const { data, error } = await supabaseAdmin
    .from('jobs')
    .update({ is_verified: true })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Job;
}

export async function rejectJob(id: string) {
  const { data, error } = await supabaseAdmin
    .from('jobs')
    .update({ is_verified: false })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Job;
}

export async function deleteJob(id: string) {
  const { error } = await supabaseAdmin.from('jobs').delete().eq('id', id);
  if (error) throw error;
}

export async function getJobStats() {
  const { count, error } = await supabaseAdmin
    .from('jobs')
    .select('*', { count: 'exact', head: true })
    .eq('is_verified', true);
  if (error) throw error;
  return count ?? 0;
}

export async function getPendingJobs() {
  const { data, error } = await supabaseAdmin
    .from('jobs')
    .select('*, profiles(full_name)')
    .gte('ai_scam_score', 0.4)
    .lte('ai_scam_score', 0.7)
    .order('ai_scam_score', { ascending: false });
  if (error) throw error;
  return data as Job[];
}

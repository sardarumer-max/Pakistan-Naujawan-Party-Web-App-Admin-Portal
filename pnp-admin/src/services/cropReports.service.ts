import { supabaseAdmin } from '../lib/supabase';

export interface CropReport {
  id: string;
  user_id: string;
  crop_type: string;
  photo_url: string;
  ai_disease: string | null;
  ai_cause: string | null;
  ai_treatment: string | null;
  ai_prevention: string | null;
  district: string | null;
  province: string | null;
  created_at: string;
  /* joined */
  profiles?: { full_name: string | null } | null;
}

export async function getCropReports(search?: string) {
  let q = supabaseAdmin
    .from('crop_reports')
    .select('*, profiles(full_name)')
    .order('created_at', { ascending: false });
  if (search) {
    q = q.or(`crop_type.ilike.%${search}%,ai_disease.ilike.%${search}%,district.ilike.%${search}%,province.ilike.%${search}%`);
  }
  const { data, error } = await q;
  if (error) throw error;
  return data as CropReport[];
}

export async function deleteCropReport(id: string) {
  const { error } = await supabaseAdmin.from('crop_reports').delete().eq('id', id);
  if (error) throw error;
}

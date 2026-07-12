import { supabaseAdmin } from '../lib/supabase';

export interface LegalQuery {
  id: string;
  user_id: string | null;
  question: string;
  topic: string | null;
  created_at: string;
  /* joined */
  profiles?: { full_name: string | null } | null;
}

export async function getLegalQueries(search?: string) {
  let q = supabaseAdmin
    .from('legal_queries')
    .select('*, profiles(full_name)')
    .order('created_at', { ascending: false });
  if (search) {
    q = q.or(`question.ilike.%${search}%,topic.ilike.%${search}%`);
  }
  const { data, error } = await q;
  if (error) throw error;
  return data as LegalQuery[];
}

export async function deleteLegalQuery(id: string) {
  const { error } = await supabaseAdmin.from('legal_queries').delete().eq('id', id);
  if (error) throw error;
}

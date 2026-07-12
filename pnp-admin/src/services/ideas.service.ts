import { supabaseAdmin } from '../lib/supabase';

export interface Idea {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string | null;
  province: string | null;
  vote_count: number;
  ai_quality_score: number | null;
  ai_clarity: number | null;
  ai_feasibility: number | null;
  ai_originality: number | null;
  ai_impact: number | null;
  ai_feedback: string | null;
  status: string;
  created_at: string;
  /* joined */
  profiles?: { full_name: string | null } | null;
}

export async function getIdeas(search?: string) {
  let q = supabaseAdmin
    .from('ideas')
    .select('*, profiles(full_name)')
    .order('created_at', { ascending: false });
  if (search) {
    q = q.or(`title.ilike.%${search}%,description.ilike.%${search}%,category.ilike.%${search}%,province.ilike.%${search}%,status.ilike.%${search}%`);
  }
  const { data, error } = await q;
  if (error) throw error;
  return data as Idea[];
}

export async function approveIdea(id: string) {
  const { data, error } = await supabaseAdmin
    .from('ideas')
    .update({ status: 'approved' })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Idea;
}

export async function rejectIdea(id: string) {
  const { data, error } = await supabaseAdmin
    .from('ideas')
    .update({ status: 'rejected' })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Idea;
}

export async function flagIdea(id: string) {
  const { data, error } = await supabaseAdmin
    .from('ideas')
    .update({ status: 'flagged' })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Idea;
}

export async function deleteIdea(id: string) {
  const { error } = await supabaseAdmin.from('ideas').delete().eq('id', id);
  if (error) throw error;
}

export async function getIdeaStats() {
  const { count, error } = await supabaseAdmin
    .from('ideas')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'approved');
  if (error) throw error;
  return count ?? 0;
}

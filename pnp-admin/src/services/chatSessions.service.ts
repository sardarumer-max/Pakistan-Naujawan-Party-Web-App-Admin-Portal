import { supabaseAdmin } from '../lib/supabase';

export interface ChatSession {
  id: string;
  user_id: string;
  messages: { role: string; content: string }[];
  portal_context: string | null;
  created_at: string;
  updated_at: string;
  /* joined */
  profiles?: { full_name: string | null } | null;
}

export async function getChatSessions(search?: string) {
  let q = supabaseAdmin
    .from('chat_sessions')
    .select('*, profiles(full_name)')
    .order('updated_at', { ascending: false });
  if (search) {
    q = q.or(`portal_context.ilike.%${search}%`);
  }
  const { data, error } = await q;
  if (error) throw error;
  return data as ChatSession[];
}

export async function getChatSessionById(id: string) {
  const { data, error } = await supabaseAdmin
    .from('chat_sessions')
    .select('*, profiles(full_name)')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as ChatSession;
}

export async function deleteChatSession(id: string) {
  const { error } = await supabaseAdmin.from('chat_sessions').delete().eq('id', id);
  if (error) throw error;
}

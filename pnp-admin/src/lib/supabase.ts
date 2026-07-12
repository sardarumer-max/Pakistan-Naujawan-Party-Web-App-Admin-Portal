import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem('VITE_SUPABASE_URL') || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem('VITE_SUPABASE_ANON_KEY') || '';
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || localStorage.getItem('VITE_SUPABASE_SERVICE_ROLE_KEY') || '';


/* Anon client — used for auth (login/logout/session) */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* Admin client — uses service role key, bypasses RLS for full data access */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);

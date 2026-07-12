import { supabaseAdmin } from '../lib/supabase';

export interface DashboardStats {
  total_users: number;
  total_complaints: number;
  resolved_complaints: number;
  total_ideas: number;
  approved_ideas: number;
  total_jobs: number;
  active_jobs: number;
  total_blood_donors: number;
  total_chat_sessions: number;
  total_crop_reports: number;
  total_legal_queries: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const results = await Promise.allSettled([
    supabaseAdmin.from('profiles').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('complaints').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('complaints').select('*', { count: 'exact', head: true }).eq('status', 'resolved'),
    supabaseAdmin.from('ideas').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('ideas').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
    supabaseAdmin.from('jobs').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('jobs').select('*', { count: 'exact', head: true }).eq('is_verified', true),
    supabaseAdmin.from('blood_donors').select('*', { count: 'exact', head: true }).eq('is_available', true),
    supabaseAdmin.from('chat_sessions').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('crop_reports').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('legal_queries').select('*', { count: 'exact', head: true }),
  ]);

  function extractCount(r: PromiseSettledResult<{ count: number | null; error: unknown }>): number {
    if (r.status === 'fulfilled' && !r.value.error) return r.value.count ?? 0;
    return 0;
  }

  return {
    total_users: extractCount(results[0] as PromiseSettledResult<{ count: number | null; error: unknown }>),
    total_complaints: extractCount(results[1] as PromiseSettledResult<{ count: number | null; error: unknown }>),
    resolved_complaints: extractCount(results[2] as PromiseSettledResult<{ count: number | null; error: unknown }>),
    total_ideas: extractCount(results[3] as PromiseSettledResult<{ count: number | null; error: unknown }>),
    approved_ideas: extractCount(results[4] as PromiseSettledResult<{ count: number | null; error: unknown }>),
    total_jobs: extractCount(results[5] as PromiseSettledResult<{ count: number | null; error: unknown }>),
    active_jobs: extractCount(results[6] as PromiseSettledResult<{ count: number | null; error: unknown }>),
    total_blood_donors: extractCount(results[7] as PromiseSettledResult<{ count: number | null; error: unknown }>),
    total_chat_sessions: extractCount(results[8] as PromiseSettledResult<{ count: number | null; error: unknown }>),
    total_crop_reports: extractCount(results[9] as PromiseSettledResult<{ count: number | null; error: unknown }>),
    total_legal_queries: extractCount(results[10] as PromiseSettledResult<{ count: number | null; error: unknown }>),
  };
}

export interface RecentActivity {
  id: string;
  message: string;
  module: string;
  created_at: string;
  type: string;
}

export async function getRecentActivity(): Promise<RecentActivity[]> {
  const activities: RecentActivity[] = [];

  /* Fetch recent items from multiple tables */
  const [complaints, jobs, ideas] = await Promise.allSettled([
    supabaseAdmin.from('complaints').select('id, category, district, status, created_at').order('created_at', { ascending: false }).limit(5),
    supabaseAdmin.from('jobs').select('id, title, company, is_verified, created_at').order('created_at', { ascending: false }).limit(5),
    supabaseAdmin.from('ideas').select('id, title, status, created_at').order('created_at', { ascending: false }).limit(5),
  ]);

  if (complaints.status === 'fulfilled' && complaints.value.data) {
    for (const c of complaints.value.data) {
      activities.push({
        id: c.id,
        message: `Complaint: ${c.category} in ${c.district || 'unknown'} — ${c.status}`,
        module: 'Pakistan Problems',
        created_at: c.created_at,
        type: 'complaint',
      });
    }
  }

  if (jobs.status === 'fulfilled' && jobs.value.data) {
    for (const j of jobs.value.data) {
      activities.push({
        id: j.id,
        message: `Job: ${j.title} at ${j.company || 'unknown'} — ${j.is_verified ? 'verified' : 'pending'}`,
        module: 'Rozgar',
        created_at: j.created_at,
        type: 'job',
      });
    }
  }

  if (ideas.status === 'fulfilled' && ideas.value.data) {
    for (const i of ideas.value.data) {
      activities.push({
        id: i.id,
        message: `Idea: ${i.title} — ${i.status}`,
        module: 'Naujawan Voice',
        created_at: i.created_at,
        type: 'idea',
      });
    }
  }

  /* Sort by time desc */
  activities.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return activities.slice(0, 15);
}

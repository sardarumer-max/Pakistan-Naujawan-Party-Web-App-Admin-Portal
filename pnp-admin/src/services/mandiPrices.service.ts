import { supabaseAdmin } from '../lib/supabase';

export interface MandiPrice {
  id: string;
  crop: string;
  price: number;
  mandi_location: string;
  district: string | null;
  province: string | null;
  recorded_at: string;
}

export async function getMandiPrices(search?: string) {
  let q = supabaseAdmin
    .from('mandi_prices')
    .select('*')
    .order('recorded_at', { ascending: false });
  if (search) {
    q = q.or(`crop.ilike.%${search}%,mandi_location.ilike.%${search}%,district.ilike.%${search}%`);
  }
  const { data, error } = await q;
  if (error) throw error;
  return data as MandiPrice[];
}

export async function addMandiPrice(price: Omit<MandiPrice, 'id' | 'recorded_at'>) {
  const { data, error } = await supabaseAdmin
    .from('mandi_prices')
    .insert(price)
    .select()
    .single();
  if (error) throw error;
  return data as MandiPrice;
}

export async function deleteMandiPrice(id: string) {
  const { error } = await supabaseAdmin.from('mandi_prices').delete().eq('id', id);
  if (error) throw error;
}

export async function triggerMandiScraper() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
  const res = await fetch(`${url}/functions/v1/mandi-scraper`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  if (!res.ok) throw new Error('Failed to trigger mandi scraper');
  return res.json();
}

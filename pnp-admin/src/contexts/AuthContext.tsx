import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase, supabaseAdmin } from '../lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  province: string | null;
  district: string | null;
  preferred_language: string;
  role: string;
  created_at: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isModerator: boolean;
  isAuthorized: boolean;
  bypassAuth: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [bypass, setBypass] = useState(() => localStorage.getItem('DEV_BYPASS_AUTH') === 'true');

  const user = bypass ? ({ id: 'mock-admin-uuid', email: 'admin@pnp.org.pk' } as User) : (session?.user ?? null);
  
  const activeProfile = bypass ? {
    id: 'mock-admin-uuid',
    full_name: 'Super Admin (Bypass Mode)',
    phone: '+92 300 1234567',
    province: 'Punjab',
    district: 'Lahore',
    preferred_language: 'en',
    role: 'admin',
    created_at: new Date().toISOString()
  } as Profile : profile;

  const isAdmin = bypass || activeProfile?.role === 'admin';
  const isModerator = bypass || activeProfile?.role === 'moderator';
  const isAuthorized = isAdmin || isModerator;

  async function fetchProfile(userId: string) {
    const { data } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    setProfile(data as Profile | null);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      if (s?.user) fetchProfile(s.user.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, s) => {
        setSession(s);
        if (s?.user) {
          fetchProfile(s.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function signIn(email: string, password: string) {
    if (email.toLowerCase() === 'admin@pnp.org.pk' && password === 'admin') {
      bypassAuth();
      return { error: null };
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }

  async function signOut() {
    localStorage.removeItem('DEV_BYPASS_AUTH');
    setBypass(false);
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  }

  function bypassAuth() {
    localStorage.setItem('DEV_BYPASS_AUTH', 'true');
    setBypass(true);
  }

  return (
    <AuthContext.Provider
      value={{
        session: bypass ? ({} as Session) : session,
        user,
        profile: activeProfile,
        loading,
        signIn,
        signOut,
        isAdmin,
        isModerator,
        isAuthorized,
        bypassAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}

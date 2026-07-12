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
  isLeader: boolean;   // ← Dr. Waqar exclusive flag
  bypassAuth: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ─── Hardcoded leadership credential ─────────────────────────────────────────
const LEADER_EMAIL    = 'drwaqar@pnp.org.pk';
const LEADER_PASSWORD = 'DrWaqar@PNP2024!';
// ─────────────────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [bypass,  setBypass]  = useState(() => localStorage.getItem('DEV_BYPASS_AUTH')  === 'true');
  const [leader,  setLeader]  = useState(() => localStorage.getItem('LEADER_SESSION')    === 'true');

  // ── Derived user & profile ───────────────────────────────────────────────
  const user = bypass || leader
    ? ({ id: leader ? 'leader-uuid' : 'mock-admin-uuid', email: leader ? LEADER_EMAIL : 'admin@pnp.org.pk' } as User)
    : (session?.user ?? null);

  const activeProfile = leader
    ? {
        id: 'leader-uuid',
        full_name: 'Dr. Waqar Bin Saif',
        phone: '+92 300 0000000',
        province: 'Punjab',
        district: 'Lahore',
        preferred_language: 'en',
        role: 'leader',
        created_at: new Date().toISOString(),
      } as Profile
    : bypass
    ? {
        id: 'mock-admin-uuid',
        full_name: 'Super Admin',
        phone: '+92 300 1234567',
        province: 'Punjab',
        district: 'Lahore',
        preferred_language: 'en',
        role: 'admin',
        created_at: new Date().toISOString(),
      } as Profile
    : profile;

  // ── Permission flags ─────────────────────────────────────────────────────
  const isLeader    = leader;
  const isAdmin     = isLeader || bypass || activeProfile?.role === 'admin';
  const isModerator = isAdmin  || activeProfile?.role === 'moderator';
  const isAuthorized = isAdmin || isModerator;

  // ── Supabase session bootstrap ───────────────────────────────────────────
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

  // ── Sign-in logic ────────────────────────────────────────────────────────
  async function signIn(email: string, password: string) {
    // Dr. Waqar's private leadership credentials
    if (email.toLowerCase() === LEADER_EMAIL && password === LEADER_PASSWORD) {
      localStorage.setItem('LEADER_SESSION', 'true');
      setLeader(true);
      return { error: null };
    }
    // Generic super admin bypass
    if (email.toLowerCase() === 'admin@pnp.org.pk' && password === 'admin') {
      bypassAuth();
      return { error: null };
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }

  async function signOut() {
    localStorage.removeItem('DEV_BYPASS_AUTH');
    localStorage.removeItem('LEADER_SESSION');
    setBypass(false);
    setLeader(false);
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
        session: bypass || leader ? ({} as Session) : session,
        user,
        profile: activeProfile,
        loading,
        signIn,
        signOut,
        isAdmin,
        isModerator,
        isAuthorized,
        isLeader,
        bypassAuth,
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

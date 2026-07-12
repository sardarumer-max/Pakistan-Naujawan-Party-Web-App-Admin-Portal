import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { LogIn, AlertCircle, Loader2 } from 'lucide-react';

export function Login() {
  const { session, isAuthorized, loading: authLoading, signIn, bypassAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (authLoading) {
    return (
      <div className="login-page">
        <div className="login-card">
          <Loader2 size={32} className="spin" style={{ color: 'var(--moss)' }} />
        </div>
      </div>
    );
  }

  if (session && isAuthorized) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) {
      setError(err);
    }
  }

  return (
    <div className="login-page">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="login-header">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <img src="/pnp-logo.png" alt="Pakistan Naujawan Party" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', fontWeight: 600, color: 'var(--ink)' }}>PNP Admin Portal</div>
          </div>
          <p>Sign in to the Control Room</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="login-error">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <div className="field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="admin@pnp.org.pk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
          >
            {loading ? <Loader2 size={16} className="spin" /> : <LogIn size={16} />}
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0 10px' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
            <span style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase' }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          </div>

          <button
            type="button"
            className="ghost-btn"
            onClick={bypassAuth}
            style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 8, height: 38 }}
          >
            Bypass Login (Local Dev Mode)
          </button>
        </form>

        <div className="login-footer">
          <div>Only admins and moderators can access this dashboard.</div>
          <div style={{ marginTop: 8, fontSize: 11, color: 'var(--moss)', fontWeight: 500, display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
            <div>Super Admin: <b>admin@pnp.org.pk</b> / <b>admin</b></div>
            <div>Dr. Waqar Bin Saif (Leadership): <b>drwaqar@pnp.org.pk</b> / <b>DrWaqar@PNP2024!</b></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

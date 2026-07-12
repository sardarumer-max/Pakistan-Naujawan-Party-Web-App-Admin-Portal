import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute() {
  const { session, isAuthorized, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'var(--paper)',
      }}>
        <Loader2 size={32} className="spin" style={{ color: 'var(--moss)' }} />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuthorized) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'var(--paper)',
        textAlign: 'center',
        padding: 40,
      }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", color: 'var(--clay)', fontSize: 28 }}>
          Unauthorized
        </h1>
        <p style={{ color: 'var(--text-dim)', maxWidth: 400, marginTop: 10 }}>
          Your account does not have admin or moderator access.
          Contact the super admin to request access.
        </p>
      </div>
    );
  }

  return <Outlet />;
}

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock } from 'lucide-react';

/**
 * LeaderRoute — only allows access when logged in as Dr. Waqar (isLeader).
 * Any other authenticated user sees a "restricted" screen instead.
 */
export function LeaderRoute() {
  const { session, isLeader, isAuthorized } = useAuth();
  const location = useLocation();

  // Not logged in at all → send to login
  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Logged in but NOT as leader → show restricted screen
  if (!isLeader) {
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
        gap: 16,
      }}>
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'rgba(201, 147, 44, 0.1)',
          border: '2px solid rgba(201, 147, 44, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--gold)',
        }}>
          <Lock size={32} />
        </div>
        <h1 style={{ fontFamily: "'Fraunces', serif", color: 'var(--ink)', fontSize: 26, margin: 0 }}>
          Private Access Only
        </h1>
        <p style={{ color: 'var(--text-dim)', maxWidth: 420, margin: 0, lineHeight: 1.7 }}>
          This section is restricted exclusively to <strong>Dr. Waqar Bin Saif</strong>.
          {isAuthorized && ' Your current credentials do not have access to this area.'}
        </p>
        <a href="/" style={{
          marginTop: 8,
          background: 'var(--moss)',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: 9,
          textDecoration: 'none',
          fontSize: 13,
          fontWeight: 600,
        }}>
          Return to Dashboard
        </a>
      </div>
    );
  }

  return <Outlet />;
}

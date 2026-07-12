import { NavLink } from 'react-router-dom';
import { useDashboardStats } from '../hooks/useDashboard';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  BarChart2, 
  AlertCircle, 
  Briefcase, 
  Lightbulb, 
  Sprout, 
  Users, 
  Bot, 
  ShieldAlert, 
  Terminal, 
  DollarSign, 
  Crown, 
  Settings as SettingsIcon,
  User,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { signOut, profile } = useAuth();
  const { data: stats } = useDashboardStats();

  const getCount = (id: string) => {
    if (!stats) return undefined;
    switch (id) {
      case 'complaints': return stats.total_complaints;
      case 'jobs': return stats.active_jobs;
      case 'ideas': return stats.total_ideas;
      case 'bots': return 5;
      case 'moderation': return 12;
      default: return undefined;
    }
  };

  return (
    <>
      <aside className={`side ${open ? 'show' : ''}`}>
        {/* LOGO */}
        <div className="sb-logo">
          <img src="/pnp-logo.png" alt="PNP Logo" style={{ width: '42px', height: '42px', objectFit: 'contain', borderRadius: '50%' }} />
          <div className="sb-title">
            <div className="sb-t1">ADMIN</div>
            <div className="sb-t2">Pakistan Naujawan Party</div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="nav-scroll">
          <div className="sb-section">Overview</div>
          <NavLink to="/" className={({ isActive }) => `sb-item ${isActive ? 'active' : ''}`} onClick={onClose} end>
            <div className="sb-icon"><Home size={16} /></div>
            <div className="sb-label">Dashboard</div>
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => `sb-item ${isActive ? 'active' : ''}`} onClick={onClose}>
            <div className="sb-icon"><BarChart2 size={16} /></div>
            <div className="sb-label">Analytics</div>
          </NavLink>

          <div className="sb-section">Portals</div>
          <NavLink to="/problems" className={({ isActive }) => `sb-item ${isActive ? 'active' : ''}`} onClick={onClose}>
            <div className="sb-icon"><AlertCircle size={16} /></div>
            <div className="sb-label">Complaints</div>
            {getCount('complaints') !== undefined && (
              <span className="sb-badge-count">{getCount('complaints')}</span>
            )}
          </NavLink>
          <NavLink to="/rozgar" className={({ isActive }) => `sb-item ${isActive ? 'active' : ''}`} onClick={onClose}>
            <div className="sb-icon"><Briefcase size={16} /></div>
            <div className="sb-label">Jobs / Rozgar</div>
            {getCount('jobs') !== undefined && (
              <span className="sb-badge-count">{getCount('jobs')}</span>
            )}
          </NavLink>
          <NavLink to="/voice" className={({ isActive }) => `sb-item ${isActive ? 'active' : ''}`} onClick={onClose}>
            <div className="sb-icon"><Lightbulb size={16} /></div>
            <div className="sb-label">Naujawan Ideas</div>
            {getCount('ideas') !== undefined && (
              <span className="sb-badge-count">{getCount('ideas')}</span>
            )}
          </NavLink>
          <NavLink to="/kisaan" className={({ isActive }) => `sb-item ${isActive ? 'active' : ''}`} onClick={onClose}>
            <div className="sb-icon"><Sprout size={16} /></div>
            <div className="sb-label">Kisaan Data</div>
          </NavLink>

          <div className="sb-section">Users</div>
          <NavLink to="/users" className={({ isActive }) => `sb-item ${isActive ? 'active' : ''}`} onClick={onClose}>
            <div className="sb-icon"><Users size={16} /></div>
            <div className="sb-label">All Members</div>
          </NavLink>
          <NavLink to="/bots" className={({ isActive }) => `sb-item ${isActive ? 'active' : ''}`} onClick={onClose}>
            <div className="sb-icon"><Bot size={16} /></div>
            <div className="sb-label">Bot Flags</div>
            <span className="sb-badge-count">{getCount('bots')}</span>
          </NavLink>

          <div className="sb-section">AI & Moderation</div>
          <NavLink to="/moderation" className={({ isActive }) => `sb-item ${isActive ? 'active' : ''}`} onClick={onClose}>
            <div className="sb-icon"><ShieldAlert size={16} /></div>
            <div className="sb-label">Moderation Queue</div>
            <span className="sb-badge-count">{getCount('moderation')}</span>
          </NavLink>
          <NavLink to="/ai" className={({ isActive }) => `sb-item ${isActive ? 'active' : ''}`} onClick={onClose}>
            <div className="sb-icon"><Terminal size={16} /></div>
            <div className="sb-label">AI Prompt Manager</div>
          </NavLink>
          <NavLink to="/costs" className={({ isActive }) => `sb-item ${isActive ? 'active' : ''}`} onClick={onClose}>
            <div className="sb-icon"><DollarSign size={16} /></div>
            <div className="sb-label">AI Cost Monitor</div>
          </NavLink>

          <div className="sb-section">Leadership</div>
          <NavLink to="/leadership" className={({ isActive }) => `sb-item ${isActive ? 'active' : ''}`} onClick={onClose}>
            <div className="sb-icon"><Crown size={16} /></div>
            <div className="sb-label">Dr. Waqar Panel</div>
            <span className="sb-badge-green">PRIVATE</span>
          </NavLink>

          <div className="sb-section">System</div>
          <NavLink to="/settings" className={({ isActive }) => `sb-item ${isActive ? 'active' : ''}`} onClick={onClose}>
            <div className="sb-icon"><SettingsIcon size={16} /></div>
            <div className="sb-label">Settings</div>
          </NavLink>
        </nav>

        {/* USER FOOTER */}
        <div className="sb-user" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <div className="sb-av"><User size={16} style={{ color: '#fff' }} /></div>
            <div style={{ minWidth: 0 }}>
              <div className="sb-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {profile?.full_name || 'Jahanzaib'}
              </div>
              <div className="sb-role" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textTransform: 'capitalize' }}>
                {profile?.role || 'IT Lead'}
              </div>
            </div>
          </div>
          <button 
            onClick={() => signOut()} 
            title="Log Out"
            style={{
              background: 'none', border: 'none', color: '#93a4b8', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '6px', transition: 'color 0.15s'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--clay)'}
            onMouseOut={(e) => e.currentTarget.style.color = '#93a4b8'}
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>
      <div
        className={`overlay ${open ? 'show' : ''}`}
        onClick={onClose}
      />
    </>
  );
}

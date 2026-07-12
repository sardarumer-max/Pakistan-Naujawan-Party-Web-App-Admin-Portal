import { useState, useEffect } from 'react';
import { Search, Bell, Menu, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecentActivity } from '../hooks/useDashboard';
import { useAuth } from '../contexts/AuthContext';

interface TopbarProps {
  query: string;
  onQueryChange: (q: string) => void;
  onMenuClick: () => void;
}

export function Topbar({ query, onQueryChange, onMenuClick }: TopbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, profile } = useAuth();
  const { data: activity } = useRecentActivity();
  const [lastRead, setLastRead] = useState(() => localStorage.getItem('LAST_READ_NOTIFICATIONS') || '');

  // Reset notifications counter when user visits the notifications page
  useEffect(() => {
    if (location.pathname === '/notifications') {
      const now = new Date().toISOString();
      localStorage.setItem('LAST_READ_NOTIFICATIONS', now);
      setLastRead(now);
    }
  }, [location.pathname]);

  // Only count activities created after the last read timestamp
  const unseenCount = activity 
    ? activity.filter(a => !lastRead || new Date(a.created_at) > new Date(lastRead)).length 
    : 0;

  return (
    <div className="topbar">
      <button className="menu-btn" onClick={onMenuClick}>
        <Menu size={18} />
      </button>
      <div className="search-box">
        <Search className="search-icon" size={15} />
        <input
          id="globalSearch"
          placeholder="Search this table…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      <div className="topbar-right">
        <button 
          className="badge-btn" 
          onClick={() => navigate('/notifications')}
          title="View Notifications"
        >
          <Bell size={16} />
          {unseenCount > 0 && (
            <span className="pip">{unseenCount}</span>
          )}
        </button>
        <button 
          className="badge-btn" 
          onClick={() => signOut()}
          title="Sign Out"
        >
          <LogOut size={16} />
        </button>
        <div className="who">
          <div className="av">
            {(profile?.full_name || 'Super Admin')
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div className="meta">
            <b>{profile?.full_name || 'Super Admin'}</b>
            <span style={{ textTransform: 'capitalize' }}>{profile?.role || 'Owner access'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


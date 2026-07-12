import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';

export function AppLayout() {
  const [sideOpen, setSideOpen] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <div className="app">
      <Sidebar open={sideOpen} onClose={() => setSideOpen(false)} />
      <div className="main">
        <Topbar
          query={query}
          onQueryChange={setQuery}
          onMenuClick={() => setSideOpen(true)}
        />
        <div className="content">
          <Outlet context={{ query, setQuery }} />
        </div>
      </div>
    </div>
  );
}

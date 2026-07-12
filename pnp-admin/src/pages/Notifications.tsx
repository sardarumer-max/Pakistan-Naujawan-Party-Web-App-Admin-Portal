import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DataTable } from '../components/ui/DataTable';
import { useRecentActivity } from '../hooks/useDashboard';
import { Loader2 } from 'lucide-react';

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function Notifications() {
  const { query } = useOutletContext<{ query: string }>();
  const { data: activity, isLoading } = useRecentActivity();

  const cols = ['ID', 'Message', 'Module', 'Time', 'Type'];
  const rows = (activity || []).map((a) => [
    a.id.slice(0, 8) + '…',
    a.message,
    a.module,
    timeAgo(a.created_at),
    a.type,
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="crumb">Overview</div>
      <div className="page-head">
        <div>
          <h1>Notifications</h1>
          <p>Recent system activity aggregated across all portals.</p>
        </div>
      </div>
      <div className="panel">
        <div className="panel-head">
          <h3>Activity feed</h3>
          <span className="n">{isLoading ? '…' : `${rows.length} events`}</span>
        </div>
        {isLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, gap: 10, color: 'var(--text-dim)' }}>
            <Loader2 size={20} className="spin" /> Loading…
          </div>
        ) : (
          <DataTable cols={cols} rows={rows} query={query} />
        )}
      </div>
    </motion.div>
  );
}

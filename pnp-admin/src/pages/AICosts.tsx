import { motion } from 'framer-motion';

export function AICosts() {
  const costs = [
    { portal: 'Saathi Chat', width: '75%', val: '$18.40', color: 'var(--moss)' },
    { portal: 'CV Analyzer', width: '40%', val: '$9.80', color: '#a78bfa' },
    { portal: 'Complaint Writer', width: '30%', val: '$7.20', color: 'var(--gold)' },
    { portal: 'Legal AI', width: '22%', val: '$5.40', color: '#38bdf8' },
    { portal: 'Crop Disease', width: '15%', val: '$3.80', color: '#34d399' },
    { portal: 'Moderation', width: '8%', val: '$1.80', color: '#f472b6' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="crumb">AI & Moderation</div>
      <div className="page-head">
        <div>
          <h1>AI Cost Monitor</h1>
          <p>Usage & budget tracking across all integrated AI services.</p>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card" style={{ '--sc-c': '#2f6b4f' } as React.CSSProperties}>
          <div className="sc-num">$48.20</div>
          <div className="sc-label">This Month</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#c9932c' } as React.CSSProperties}>
          <div className="sc-num">$3.20</div>
          <div className="sc-label">Today</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#2f6b4f' } as React.CSSProperties}>
          <div className="sc-num">$100</div>
          <div className="sc-label">Monthly Budget</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#a8452f' } as React.CSSProperties}>
          <div className="sc-num">48%</div>
          <div className="sc-label">Budget Used</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3>Cost by Portal / Edge Function</h3>
        </div>
        <div style={{ padding: '0 18px 14px' }}>
          {costs.map((c) => (
            <div className="cost-item" key={c.portal}>
              <div className="cost-portal">{c.portal}</div>
              <div className="cost-bar">
                <div className="cost-fill" style={{ width: c.width, background: c.color }}></div>
              </div>
              <div className="cost-val">{c.val}</div>
            </div>
          ))}
          <div style={{
            marginTop: '20px',
            padding: '12px 14px',
            background: 'rgba(47, 107, 79, 0.05)',
            border: '1px solid rgba(47, 107, 79, 0.15)',
            borderLeft: '3px solid var(--moss)',
            borderRadius: '0 8px 8px 0'
          }}>
            <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--moss)', fontWeight: 700, marginBottom: '4px' }}>
              Budget Alert Threshold
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
              Alert Jahanzaib when monthly spend exceeds <span style={{ color: 'var(--text)', fontWeight: 600 }}>$80</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

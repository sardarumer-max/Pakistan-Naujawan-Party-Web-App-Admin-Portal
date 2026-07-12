import { motion } from 'framer-motion';

export function Analytics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="crumb">Overview</div>
      <div className="page-head">
        <div>
          <h1>Analytics</h1>
          <p>Platform performance metrics and demographic activity breakdown.</p>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card" style={{ '--sc-c': '#2f6b4f' } as React.CSSProperties}>
          <div className="sc-num">48K</div>
          <div className="sc-label">Total Members</div>
          <div className="sc-change sc-up">▲ +18% this month</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#2f6b4f' } as React.CSSProperties}>
          <div className="sc-num">284K</div>
          <div className="sc-label">AI Queries Total</div>
          <div className="sc-change sc-up">▲ +42% this month</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#c9932c' } as React.CSSProperties}>
          <div className="sc-num">72%</div>
          <div className="sc-label">Complaint Resolution Rate</div>
          <div className="sc-change sc-up">▲ +8% vs last month</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#a8452f' } as React.CSSProperties}>
          <div className="sc-num">4.8★</div>
          <div className="sc-label">App Rating (avg)</div>
          <div className="sc-change sc-up">Based on 12,400 reviews</div>
        </div>
      </div>

      <div className="grid-3">
        {/* Members by Province */}
        <div className="panel">
          <div className="panel-head">
            <h3>Members by Province</h3>
          </div>
          <div style={{ padding: '0 18px 14px' }}>
            <div className="sent-item">
              <div className="sent-label">Punjab</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '58%', background: 'var(--moss)' }}></div>
              </div>
              <div className="sent-val" style={{ color: 'var(--moss)' }}>58%</div>
            </div>
            <div className="sent-item">
              <div className="sent-label">Sindh</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '24%', background: 'var(--moss)' }}></div>
              </div>
              <div className="sent-val" style={{ color: 'var(--moss)' }}>24%</div>
            </div>
            <div className="sent-item">
              <div className="sent-label">KPK</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '12%', background: 'var(--moss)' }}></div>
              </div>
              <div className="sent-val" style={{ color: 'var(--moss)' }}>12%</div>
            </div>
            <div className="sent-item">
              <div className="sent-label">Balochistan</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '6%', background: 'var(--moss)' }}></div>
              </div>
              <div className="sent-val" style={{ color: 'var(--moss)' }}>6%</div>
            </div>
          </div>
        </div>

        {/* Top Complaint Categories */}
        <div className="panel">
          <div className="panel-head">
            <h3>Top Complaint Categories</h3>
          </div>
          <div style={{ padding: '0 18px 14px' }}>
            <div className="sent-item">
              <div className="sent-label">Water</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '42%', background: '#38bdf8' }}></div>
              </div>
              <div className="sent-val" style={{ color: '#38bdf8' }}>42%</div>
            </div>
            <div className="sent-item">
              <div className="sent-label">Electric</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '28%', background: 'var(--gold)' }}></div>
              </div>
              <div className="sent-val" style={{ color: 'var(--gold)' }}>28%</div>
            </div>
            <div className="sent-item">
              <div className="sent-label">Health</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '16%', background: 'var(--clay)' }}></div>
              </div>
              <div className="sent-val" style={{ color: 'var(--clay)' }}>16%</div>
            </div>
            <div className="sent-item">
              <div className="sent-label">Roads</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '14%', background: '#fb923c' }}></div>
              </div>
              <div className="sent-val" style={{ color: '#fb923c' }}>14%</div>
            </div>
          </div>
        </div>

        {/* Most Used AI Features */}
        <div className="panel">
          <div className="panel-head">
            <h3>Most Used AI Features</h3>
          </div>
          <div style={{ padding: '0 18px 14px' }}>
            <div className="sent-item">
              <div className="sent-label">Saathi Chat</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '72%', background: 'var(--moss)' }}></div>
              </div>
              <div className="sent-val" style={{ color: 'var(--moss)' }}>72%</div>
            </div>
            <div className="sent-item">
              <div className="sent-label">Complaint AI</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '44%', background: 'var(--moss)' }}></div>
              </div>
              <div className="sent-val" style={{ color: 'var(--moss)' }}>44%</div>
            </div>
            <div className="sent-item">
              <div className="sent-label">CV Analyzer</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '31%', background: 'var(--moss)' }}></div>
              </div>
              <div className="sent-val" style={{ color: 'var(--moss)' }}>31%</div>
            </div>
            <div className="sent-item">
              <div className="sent-label">Legal AI</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '18%', background: 'var(--moss)' }}></div>
              </div>
              <div className="sent-val" style={{ color: 'var(--moss)' }}>18%</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { useDashboardStats } from '../hooks/useDashboard';
import { toast } from 'sonner';
import { 
  AlertCircle, 
  Lightbulb, 
  Bot, 
  Briefcase, 
  ShieldAlert
} from 'lucide-react';

export function Dashboard() {
  const { data: stats } = useDashboardStats();

  // Stats values (dynamic if loaded, fallback to prototype constants)
  const totalMembers = stats ? stats.total_users.toLocaleString() : '48,230';
  const complaints = stats ? stats.total_complaints.toLocaleString() : '3,284';
  const ideas = stats ? stats.total_ideas.toLocaleString() : '1,247';
  const jobs = stats ? stats.total_jobs.toLocaleString() : '892';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="crumb">Overview</div>
      <div className="page-head">
        <div>
          <h1>Dashboard</h1>
          <p>Snapshot across all sixteen PNP programs, updated live as citizens submit requests.</p>
        </div>
        <button className="primary-btn" onClick={() => toast.success('Exporting summary...')}>
          Export summary
        </button>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card" style={{ '--sc-c': '#2f6b4f' } as React.CSSProperties}>
          <div className="sc-num">{totalMembers}</div>
          <div className="sc-label">Total Members</div>
          <div className="sc-change sc-up">▲ +1,240 this week</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#a8452f' } as React.CSSProperties}>
          <div className="sc-num">{complaints}</div>
          <div className="sc-label">Complaints</div>
          <div className="sc-change sc-up">▲ +86 today</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#c9932c' } as React.CSSProperties}>
          <div className="sc-num">{ideas}</div>
          <div className="sc-label">Ideas Submitted</div>
          <div className="sc-change sc-up">▲ +23 today</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#c9932c' } as React.CSSProperties}>
          <div className="sc-num">{jobs}</div>
          <div className="sc-label">Jobs Posted</div>
          <div className="sc-change sc-dn">▼ 8 flagged scam</div>
        </div>
      </div>

      <div className="grid-2">
        {/* District Activity Map */}
        <div className="panel">
          <div className="panel-head" style={{ justifyContent: 'space-between' }}>
            <h3>District Activity Map</h3>
            <button className="primary-btn" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => toast.info('Full Map feature coming soon')}>
              Full Map →
            </button>
          </div>
          <div style={{ padding: '14px' }}>
            <div className="map-ph">
              <div className="map-grid-bg"></div>
              <div className="map-pin" style={{ left: '33%', top: '52%' }}>
                <div className="mp-dot" style={{ background: '#a8452f', borderColor: '#a8452f' }}></div>
                <div className="mp-lbl">Karachi 847</div>
              </div>
              <div className="map-pin" style={{ left: '55%', top: '28%' }}>
                <div className="mp-dot" style={{ background: '#c9932c', borderColor: '#c9932c' }}></div>
                <div className="mp-lbl">Lahore 523</div>
              </div>
              <div className="map-pin" style={{ left: '61%', top: '18%' }}>
                <div className="mp-dot" style={{ background: '#2f6b4f', borderColor: '#2f6b4f' }}></div>
                <div className="mp-lbl">ISB 312</div>
              </div>
              <div className="map-pin" style={{ left: '47%', top: '36%' }}>
                <div className="mp-dot" style={{ background: '#a8452f', borderColor: '#a8452f' }}></div>
                <div className="mp-lbl">Multan 244</div>
              </div>
              <div className="map-pin" style={{ left: '68%', top: '12%' }}>
                <div className="mp-dot" style={{ background: '#2f6b4f', borderColor: '#2f6b4f' }}></div>
                <div className="mp-lbl">Pesh. 198</div>
              </div>
              <div className="map-legend">
                <div className="ml-item">
                  <div className="ml-dot" style={{ background: '#a8452f' }}></div>
                  High activity
                </div>
                <div className="ml-item">
                  <div className="ml-dot" style={{ background: '#c9932c' }}></div>
                  Medium
                </div>
                <div className="ml-item">
                  <div className="ml-dot" style={{ background: '#2f6b4f' }}></div>
                  Low
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="panel">
          <div className="panel-head" style={{ justifyContent: 'space-between' }}>
            <h3>Live Activity Feed</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '6px', height: '6px', background: 'var(--moss)', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--moss)' }}>LIVE</span>
            </div>
          </div>
          <div style={{ padding: '0 18px 14px' }}>
            <div className="feed-item">
              <div className="feed-icon" style={{ background: 'rgba(168, 69, 47, 0.1)', border: '1px solid rgba(168, 69, 47, 0.2)', color: '#a8452f' }}>
                <AlertCircle size={15} />
              </div>
              <div className="feed-text">
                <div className="feed-title">Critical complaint — Karachi Water</div>
                <div className="feed-meta">AI classified CRITICAL · routed to WASA</div>
              </div>
              <div className="feed-time">2m ago</div>
            </div>
            <div className="feed-item">
              <div className="feed-icon" style={{ background: 'rgba(47, 107, 79, 0.1)', border: '1px solid rgba(47, 107, 79, 0.2)', color: 'var(--moss)' }}>
                <Lightbulb size={15} />
              </div>
              <div className="feed-text">
                <div className="feed-title">New idea submitted</div>
                <div className="feed-meta">AI score: 9.2/10 · Pending approval</div>
              </div>
              <div className="feed-time">5m ago</div>
            </div>
            <div className="feed-item">
              <div className="feed-icon" style={{ background: 'rgba(168, 69, 47, 0.1)', border: '1px solid rgba(168, 69, 47, 0.2)', color: '#a8452f' }}>
                <Bot size={15} />
              </div>
              <div className="feed-text">
                <div className="feed-title">Bot attack detected</div>
                <div className="feed-meta">50 accounts · same IP · voting one idea</div>
              </div>
              <div className="feed-time">12m ago</div>
            </div>
            <div className="feed-item">
              <div className="feed-icon" style={{ background: 'rgba(201, 147, 44, 0.1)', border: '1px solid rgba(201, 147, 44, 0.2)', color: 'var(--gold)' }}>
                <Briefcase size={15} />
              </div>
              <div className="feed-text">
                <div className="feed-title">Job flagged — scam score 0.87</div>
                <div className="feed-meta">AI rejected before going live</div>
              </div>
              <div className="feed-time">18m ago</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-3">
        {/* District Sentiment */}
        <div className="panel">
          <div className="panel-head">
            <h3>District Sentiment · AI</h3>
          </div>
          <div style={{ padding: '0 18px 14px' }}>
            <div className="sent-item">
              <div className="sent-label">Karachi</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '82%', background: '#a8452f' }}></div>
              </div>
              <div className="sent-val" style={{ color: '#a8452f' }}>82%</div>
            </div>
            <div className="sent-item">
              <div className="sent-label">Lahore</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '61%', background: '#c9932c' }}></div>
              </div>
              <div className="sent-val" style={{ color: '#c9932c' }}>61%</div>
            </div>
            <div className="sent-item">
              <div className="sent-label">Islamabad</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '38%', background: '#2f6b4f' }}></div>
              </div>
              <div className="sent-val" style={{ color: '#2f6b4f' }}>38%</div>
            </div>
            <div className="sent-item">
              <div className="sent-label">Peshawar</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '55%', background: '#c9932c' }}></div>
              </div>
              <div className="sent-val" style={{ color: '#c9932c' }}>55%</div>
            </div>
            <div className="sent-item">
              <div className="sent-label">Quetta</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '70%', background: '#a8452f' }}></div>
              </div>
              <div className="sent-val" style={{ color: '#a8452f' }}>70%</div>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-dim)', marginTop: '10px', textAlign: 'right' }}>
              Higher % = more negative sentiment
            </div>
          </div>
        </div>

        {/* Weekly Complaints Chart */}
        <div className="panel">
          <div className="panel-head">
            <h3>Complaints This Week</h3>
          </div>
          <div style={{ padding: '0 18px 14px' }}>
            <div className="chart-bars">
              <div className="cb" style={{ height: '30%' }}><span className="cb-lbl">Mon</span></div>
              <div className="cb" style={{ height: '55%' }}><span className="cb-lbl">Tue</span></div>
              <div className="cb" style={{ height: '42%' }}><span className="cb-lbl">Wed</span></div>
              <div className="cb" style={{ height: '78%', background: 'rgba(47, 107, 79, 0.3)', borderColor: 'var(--moss)' }}><span className="cb-lbl">Thu</span></div>
              <div className="cb" style={{ height: '65%' }}><span className="cb-lbl">Fri</span></div>
              <div className="cb" style={{ height: '88%', background: 'rgba(168, 69, 47, 0.2)', borderColor: '#a8452f' }}><span className="cb-lbl">Sat</span></div>
              <div className="cb" style={{ height: '50%' }}><span className="cb-lbl">Sun</span></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px', fontSize: '11px', color: 'var(--text-dim)' }}>
              <span>Peak: Saturday 86 reports</span>
              <span style={{ color: 'var(--moss)', fontWeight: 'bold' }}>▲ +18% vs last week</span>
            </div>
          </div>
        </div>

        {/* Pending Review Queue */}
        <div className="panel">
          <div className="panel-head">
            <h3>Pending Review</h3>
          </div>
          <div style={{ padding: '0 18px 14px' }}>
            <div className="user-row-list" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="feed-icon" style={{ background: 'rgba(168, 69, 47, 0.1)', border: '1px solid rgba(168, 69, 47, 0.2)', color: '#a8452f' }}>
                  <ShieldAlert size={15} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>Moderation Queue</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>12 items flagged by AI</div>
                </div>
              </div>
              <span className="sb-badge-count">12</span>
            </div>
            <div className="user-row-list" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="feed-icon" style={{ background: 'rgba(47, 107, 79, 0.1)', border: '1px solid rgba(47, 107, 79, 0.2)', color: 'var(--moss)' }}>
                  <Lightbulb size={15} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>Ideas Approval</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>31 pending ideas</div>
                </div>
              </div>
              <span className="sb-badge-count" style={{ background: 'rgba(47, 107, 79, 0.2)', border: '1px solid rgba(47, 107, 79, 0.3)', color: 'var(--moss)' }}>31</span>
            </div>
            <div className="user-row-list" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="feed-icon" style={{ background: 'rgba(201, 147, 44, 0.1)', border: '1px solid rgba(201, 147, 44, 0.2)', color: 'var(--gold)' }}>
                  <Briefcase size={15} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>Job Postings</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>8 awaiting verification</div>
                </div>
              </div>
              <span className="sb-badge-count" style={{ background: 'rgba(201, 147, 44, 0.2)', border: '1px solid rgba(201, 147, 44, 0.3)', color: 'var(--gold)' }}>8</span>
            </div>
            <div className="user-row-list" style={{ justifyContent: 'space-between', borderBottom: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="feed-icon" style={{ background: 'rgba(168, 69, 47, 0.1)', border: '1px solid rgba(168, 69, 47, 0.2)', color: '#a8452f' }}>
                  <Bot size={15} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>Bot Accounts</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>5 flagged accounts</div>
                </div>
              </div>
              <span className="sb-badge-count">5</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

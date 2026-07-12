import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDashboardStats } from '../hooks/useDashboard';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  AlertCircle, Lightbulb, Bot, Briefcase, ShieldAlert,
  Users, TrendingUp, Activity, Megaphone, Heart,
  Wheat, Scale, Phone, CheckCircle2, Clock, ArrowRight,
  Zap, Globe, BarChart3, RefreshCw
} from 'lucide-react';

const portals = [
  { id: 'problems', label: 'Complaints',     icon: AlertCircle, color: '#a8452f', count: '3,284', change: '+86 today',    path: '/problems' },
  { id: 'rozgar',   label: 'Jobs / Rozgar',  icon: Briefcase,   color: '#c9932c', count: '892',   change: '8 flagged',    path: '/rozgar' },
  { id: 'voice',    label: 'Naujawan Voice', icon: Megaphone,   color: '#2f6b4f', count: '1,247', change: '+23 today',    path: '/voice' },
  { id: 'saathi',   label: 'Saathi AI',      icon: Bot,         color: '#2f6b4f', count: '5,910', change: 'chats today',  path: '/saathi' },
  { id: 'kisaan',   label: 'Kisaan',         icon: Wheat,       color: '#c9932c', count: '712',   change: 'crop reports', path: '/kisaan' },
  { id: 'qaanoon',  label: 'Qaanoon',        icon: Scale,       color: '#a8452f', count: '234',   change: 'legal queries',path: '/qaanoon' },
  { id: 'saathi',   label: 'Blood Donors',   icon: Heart,       color: '#a8452f', count: '1,102', change: 'registered',   path: '/saathi' },
  { id: 'emergency',label: 'Emergency',      icon: Phone,       color: '#a8452f', count: '48',    change: 'active alerts', path: '/emergency' },
];

const systemHealth = [
  { label: 'Saathi AI Uptime',     value: 99.8,  color: '#2f6b4f' },
  { label: 'Rozgar Portal',        value: 97.2,  color: '#2f6b4f' },
  { label: 'Kisaan Data Sync',     value: 88.1,  color: '#c9932c' },
  { label: 'Bot Detection Engine', value: 95.4,  color: '#2f6b4f' },
  { label: 'Complaint Routing AI', value: 100,   color: '#2f6b4f' },
];

const recentActions = [
  { icon: AlertCircle, color: '#a8452f', title: 'Critical complaint — Karachi Water',   meta: 'AI classified CRITICAL · routed to WASA',        time: '2m' },
  { icon: Lightbulb,   color: '#2f6b4f', title: 'New idea submitted — score 9.2/10',    meta: 'Pending admin approval',                           time: '5m' },
  { icon: Bot,         color: '#a8452f', title: 'Bot cluster detected',                  meta: '50 accounts · same IP · manipulating votes',       time: '12m' },
  { icon: Briefcase,   color: '#c9932c', title: 'Scam job flagged — score 0.87',         meta: 'AI blocked before going live',                     time: '18m' },
  { icon: Users,       color: '#2f6b4f', title: '1,240 new members this week',           meta: 'Highest weekly growth so far',                     time: '1h' },
  { icon: ShieldAlert, color: '#c9932c', title: 'Moderation queue spike',                meta: '12 items flagged by content AI',                   time: '2h' },
];

const topIdeas = [
  { rank: 1, title: 'Free Hospital WiFi',           votes: '3,290', province: 'Punjab',  trend: 'up' },
  { rank: 2, title: 'AI Corruption Tracker',        votes: '2,744', province: 'Sindh',   trend: 'up' },
  { rank: 3, title: 'AI in Basic Health Units',     votes: '1,891', province: 'KPK',     trend: 'up' },
  { rank: 4, title: 'Solar Panels for Villages',    votes: '1,550', province: 'Baloch',  trend: 'stable' },
  { rank: 5, title: 'Youth IT Training Centers',    votes: '1,204', province: 'Punjab',  trend: 'up' },
];

const pendingQueue = [
  { label: 'Moderation Queue',   count: 12, color: '#a8452f', icon: ShieldAlert, path: '/moderation' },
  { label: 'Ideas Approval',     count: 31, color: '#2f6b4f', icon: Lightbulb,   path: '/voice' },
  { label: 'Job Verifications',  count: 8,  color: '#c9932c', icon: Briefcase,   path: '/rozgar' },
  { label: 'Bot Accounts',       count: 5,  color: '#a8452f', icon: Bot,         path: '/bots' },
];

const districtSentiment = [
  { city: 'Karachi',    pct: 82, color: '#a8452f' },
  { city: 'Lahore',     pct: 61, color: '#c9932c' },
  { city: 'Islamabad',  pct: 38, color: '#2f6b4f' },
  { city: 'Peshawar',   pct: 55, color: '#c9932c' },
  { city: 'Quetta',     pct: 70, color: '#a8452f' },
  { city: 'Multan',     pct: 44, color: '#c9932c' },
];

const aiInsights = [
  { label: 'Top complaint category', value: 'Water shortage · Karachi (60%)' },
  { label: 'Most voted idea',        value: 'Free Hospital WiFi · Punjab' },
  { label: 'Fastest growing portal', value: 'Saathi AI (+34% week-on-week)' },
  { label: 'Bot activity risk',      value: 'Medium · 50 accounts quarantined' },
  { label: 'Job market trend',       value: 'IT sector rising · 22% of postings' },
];

export function Dashboard() {
  const { data: stats } = useDashboardStats();
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);

  const totalMembers = stats ? stats.total_users.toLocaleString()      : '48,230';
  const complaints   = stats ? stats.total_complaints.toLocaleString() : '3,284';
  const ideas        = stats ? stats.total_ideas.toLocaleString()      : '1,247';
  const jobs         = stats ? stats.total_jobs.toLocaleString()       : '892';

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => { setRefreshing(false); toast.success('Dashboard refreshed.'); }, 1200);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      
      {/* Header */}
      <div className="crumb">Overview</div>
      <div className="page-head">
        <div>
          <h1>Control Room Dashboard</h1>
          <p>Live snapshot across all sixteen PNP programs — updated in real-time as citizens submit requests.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="ghost-btn" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw size={15} className={refreshing ? 'spin' : ''} />
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </button>
          <button className="primary-btn" onClick={() => toast.success('Exporting full dashboard report…')}>
            Export Report
          </button>
        </div>
      </div>

      {/* ── Top KPI Stats ── */}
      <div className="stats-row">
        <div className="stat-card" style={{ '--sc-c': '#2f6b4f' } as React.CSSProperties}>
          <div className="sc-num">{totalMembers}</div>
          <div className="sc-label">Registered Members</div>
          <div className="sc-change sc-up">▲ +1,240 this week</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#a8452f' } as React.CSSProperties}>
          <div className="sc-num">{complaints}</div>
          <div className="sc-label">Active Complaints</div>
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
        <div className="stat-card" style={{ '--sc-c': '#2f6b4f' } as React.CSSProperties}>
          <div className="sc-num">5,910</div>
          <div className="sc-label">Saathi AI Chats</div>
          <div className="sc-change sc-up">▲ Today</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#a8452f' } as React.CSSProperties}>
          <div className="sc-num">48</div>
          <div className="sc-label">Emergency Alerts</div>
          <div className="sc-change sc-up">▲ 3 critical</div>
        </div>
      </div>

      {/* ── Portal Overview Grid ── */}
      <div className="panel" style={{ marginBottom: '20px' }}>
        <div className="panel-head" style={{ justifyContent: 'space-between' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={16} style={{ color: 'var(--moss)' }} /> All Program Portals
          </h3>
          <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Click any portal to manage it</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', padding: '14px' }}>
          {portals.map((p, i) => (
            <button
              key={i}
              onClick={() => navigate(p.path)}
              style={{
                background: 'var(--paper)',
                border: `1px solid var(--line)`,
                borderRadius: '10px',
                padding: '14px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
              onMouseOver={e => (e.currentTarget.style.borderColor = p.color)}
              onMouseOut={e => (e.currentTarget.style.borderColor = 'var(--line)')}
            >
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${p.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.color }}>
                <p.icon size={16} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--ink)' }}>{p.label}</div>
                <div style={{ fontSize: '18px', fontFamily: "'Fraunces', serif", fontWeight: 700, color: p.color }}>{p.count}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{p.change}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Middle Row ── */}
      <div className="grid-2" style={{ marginBottom: '20px' }}>

        {/* Live Activity Feed */}
        <div className="panel">
          <div className="panel-head" style={{ justifyContent: 'space-between' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={15} /> Live Activity Feed
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--moss)', animation: 'pulse 1.5s infinite' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--moss)' }}>LIVE</span>
            </div>
          </div>
          <div style={{ padding: '0 18px 14px' }}>
            {recentActions.map((item, i) => (
              <div key={i} className="feed-item">
                <div className="feed-icon" style={{ background: `${item.color}18`, border: `1px solid ${item.color}33`, color: item.color }}>
                  <item.icon size={15} />
                </div>
                <div className="feed-text">
                  <div className="feed-title">{item.title}</div>
                  <div className="feed-meta">{item.meta}</div>
                </div>
                <div className="feed-time">{item.time} ago</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Review + AI Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Pending Queue */}
          <div className="panel">
            <div className="panel-head" style={{ justifyContent: 'space-between' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={15} /> Pending Actions
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--clay)', fontWeight: 600 }}>
                {pendingQueue.reduce((a, b) => a + b.count, 0)} total items
              </span>
            </div>
            <div style={{ padding: '0 18px 14px' }}>
              {pendingQueue.map((q, i) => (
                <div key={i} className="user-row-list" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => navigate(q.path)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="feed-icon" style={{ background: `${q.color}18`, border: `1px solid ${q.color}33`, color: q.color }}>
                      <q.icon size={15} />
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>{q.label}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="sb-badge-count" style={{ background: `${q.color}22`, border: `1px solid ${q.color}44`, color: q.color }}>{q.count}</span>
                    <ArrowRight size={13} style={{ color: 'var(--text-dim)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="panel">
            <div className="panel-head">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={15} style={{ color: 'var(--gold)' }} /> AI Insights — Today
              </h3>
            </div>
            <div style={{ padding: '10px 18px 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {aiInsights.map((ins, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingBottom: '10px', borderBottom: i < aiInsights.length - 1 ? '1px solid var(--line)' : 'none' }}>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--moss)', fontWeight: 700 }}>{ins.label}</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 500 }}>{ins.value}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div className="grid-3">

        {/* District Sentiment */}
        <div className="panel">
          <div className="panel-head" style={{ justifyContent: 'space-between' }}>
            <h3>Grievance Sentiment · AI</h3>
            <span style={{ fontSize: '10px', color: 'var(--text-dim)' }}>Higher % = more unresolved</span>
          </div>
          <div style={{ padding: '0 18px 14px' }}>
            {districtSentiment.map((d, i) => (
              <div key={i} className="sent-item">
                <div className="sent-label">{d.city}</div>
                <div className="sent-bar">
                  <div className="sent-fill" style={{ width: `${d.pct}%`, background: d.color }} />
                </div>
                <div className="sent-val" style={{ color: d.color }}>{d.pct}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Complaints Chart */}
        <div className="panel">
          <div className="panel-head" style={{ justifyContent: 'space-between' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={15} /> Complaints This Week
            </h3>
          </div>
          <div style={{ padding: '0 18px 14px' }}>
            <div className="chart-bars">
              {[
                { d: 'Mon', h: '30%' }, { d: 'Tue', h: '55%' }, { d: 'Wed', h: '42%' },
                { d: 'Thu', h: '78%', special: 'moss' }, { d: 'Fri', h: '65%' },
                { d: 'Sat', h: '88%', special: 'clay' }, { d: 'Sun', h: '50%' },
              ].map((b, i) => (
                <div key={i} className="cb" style={{
                  height: b.h,
                  background: b.special === 'clay' ? 'rgba(168,69,47,0.2)' : b.special === 'moss' ? 'rgba(47,107,79,0.3)' : undefined,
                  borderColor: b.special === 'clay' ? '#a8452f' : b.special === 'moss' ? 'var(--moss)' : undefined,
                }}>
                  <span className="cb-lbl">{b.d}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, fontSize: 11, color: 'var(--text-dim)' }}>
              <span>Peak: Saturday 86 reports</span>
              <span style={{ color: 'var(--moss)', fontWeight: 700 }}>▲ +18% vs last week</span>
            </div>
          </div>
        </div>

        {/* Top Ideas Leaderboard */}
        <div className="panel">
          <div className="panel-head" style={{ justifyContent: 'space-between' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={15} style={{ color: 'var(--moss)' }} /> Top Ideas · By Votes
            </h3>
            <button className="ghost-btn" style={{ fontSize: '11px', padding: '3px 8px' }} onClick={() => navigate('/voice')}>
              View All →
            </button>
          </div>
          <div style={{ padding: '0 18px 14px' }}>
            {topIdeas.map((idea, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 0', borderBottom: i < topIdeas.length - 1 ? '1px solid var(--line)' : 'none'
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                  background: i === 0 ? 'var(--gold)' : i === 1 ? '#bbb' : i === 2 ? '#c9832c' : 'var(--line)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, color: i < 3 ? '#fff' : 'var(--text-dim)',
                }}>
                  {idea.rank}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{idea.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{idea.province}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--moss)' }}>{idea.votes}</span>
                  {idea.trend === 'up' && <TrendingUp size={12} style={{ color: 'var(--moss)' }} />}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── System Health ── */}
      <div className="panel" style={{ marginTop: '20px' }}>
        <div className="panel-head" style={{ justifyContent: 'space-between' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={15} style={{ color: 'var(--moss)' }} /> System Health
          </h3>
          <span style={{ fontSize: '11px', color: 'var(--moss)', fontWeight: 600 }}>All systems operational</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', padding: '14px' }}>
          {systemHealth.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600 }}>
                <span>{s.label}</span>
                <span style={{ color: s.color }}>{s.value}%</span>
              </div>
              <div style={{ background: 'var(--line)', borderRadius: 99, height: 6, overflow: 'hidden' }}>
                <div style={{ width: `${s.value}%`, height: '100%', background: s.color, borderRadius: 99, transition: 'width 0.6s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
}

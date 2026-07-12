import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Crown, Newspaper, Megaphone, MessageSquare } from 'lucide-react';

export function Leadership() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="crumb">Leadership</div>
      <div className="page-head">
        <div>
          <h1>Dr. Waqar Panel</h1>
          <p>Private panel for strategic analysis and policy briefs.</p>
        </div>
      </div>

      <div style={{
        background: 'rgba(201, 147, 44, 0.08)',
        border: '1px solid rgba(201, 147, 44, 0.2)',
        borderLeft: '4px solid var(--gold)',
        padding: '12px 16px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderRadius: '0 8px 8px 0'
      }}>
        <span style={{ color: 'var(--gold)' }}><Crown size={20} /></span>
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '2px' }}>
            Leadership Access Only
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
            Visible to Dr. Waqar Bin Saif only. IT team cannot access this section.
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <div className="panel-head" style={{ justifyContent: 'space-between' }}>
            <h3>Monthly Policy Brief — AI Generated</h3>
            <button className="primary-btn" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => toast.success('Policy brief downloaded')}>Download PDF →</button>
          </div>
          <div style={{ padding: '14px' }}>
            <div style={{
              padding: '12px',
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              borderRadius: '8px',
              fontSize: '13px',
              color: 'var(--text)',
              lineHeight: '1.8',
              marginBottom: '14px'
            }}>
              <div style={{ fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--moss)', fontWeight: 700, marginBottom: '6px' }}>
                June 2025 Summary
              </div>
              Top issues this month: Water shortage (847 complaints, 60% Karachi), Electricity outages (523, Punjab), Hospital staff absence (312, KPK).<br /><br />
              Top ideas by votes: Corruption tracker (2,744 votes), AI in BHUs (1,891), Free hospital WiFi (3,290 — winner).
            </div>
            <button className="primary-btn" style={{ width: '100%' }} onClick={() => toast.info('Generating brief...')}>Generate July Brief →</button>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head" style={{ justifyContent: 'space-between' }}>
            <h3>Opposition Monitor — AI</h3>
            <button className="ghost-btn" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => toast.success('Feed refreshed')}>Refresh →</button>
          </div>
          <div style={{ padding: '0 18px 14px' }}>
            <div className="feed-item">
              <div className="feed-icon" style={{ background: 'rgba(168, 69, 47, 0.1)', border: '1px solid rgba(168, 69, 47, 0.2)', color: '#a8452f' }}>
                <Newspaper size={15} />
              </div>
              <div className="feed-text">
                <div className="feed-title">PTI attacked PNP Kisaan Portal</div>
                <div className="feed-meta">Called data "unverified" on Twitter · 2,400 engagements</div>
              </div>
              <div className="feed-time">3h ago</div>
            </div>
            <div className="feed-item">
              <div className="feed-icon" style={{ background: 'rgba(201, 147, 44, 0.1)', border: '1px solid rgba(201, 147, 44, 0.2)', color: 'var(--gold)' }}>
                <Megaphone size={15} />
              </div>
              <div className="feed-text">
                <div className="feed-title">PMLN launched competing jobs portal</div>
                <div className="feed-meta">No AI features · limited to Punjab</div>
              </div>
              <div className="feed-time">1d ago</div>
            </div>
            <div className="feed-item" style={{ borderBottom: 'none' }}>
              <div className="feed-icon" style={{ background: 'rgba(47, 107, 79, 0.1)', border: '1px solid rgba(47, 107, 79, 0.2)', color: 'var(--moss)' }}>
                <MessageSquare size={15} />
              </div>
              <div className="feed-text">
                <div className="feed-title">Trending: #PNP_Saathi viral in KPK</div>
                <div className="feed-meta">Positive sentiment · 8,200 mentions this week</div>
              </div>
              <div className="feed-time">2d ago</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

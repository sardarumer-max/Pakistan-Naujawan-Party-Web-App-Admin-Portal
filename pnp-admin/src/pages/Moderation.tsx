import { motion } from 'framer-motion';
import { toast } from 'sonner';

export function Moderation() {
  const items = [
    { content: '"[Offensive content redacted]"', type: 'Comment', reason: 'Hate speech · sectarian', confidence: '96%' },
    { content: "Complaint with politician's fake quote", type: 'Complaint', reason: 'Possible disinformation', confidence: '74%' },
    { content: '"مشتبہ ویڈیو — deepfake چیک"', type: 'Video', reason: 'AI manipulation detected', confidence: '88%' }
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
          <h1>Moderation Queue</h1>
          <p>AI-flagged content awaiting human verification.</p>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card" style={{ '--sc-c': '#a8452f' } as React.CSSProperties}>
          <div className="sc-num">12</div>
          <div className="sc-label">AI Flagged Today</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#2f6b4f' } as React.CSSProperties}>
          <div className="sc-num">284</div>
          <div className="sc-label">Auto-approved</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#c9932c' } as React.CSSProperties}>
          <div className="sc-num">3</div>
          <div className="sc-label">Deepfake Checks</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3>Content Moderation Queue</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Content</th>
              <th>Type</th>
              <th>AI Flag Reason</th>
              <th>Confidence</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td style={{ maxWidth: '200px' }}>{item.content}</td>
                <td><span className="pill pending">{item.type}</span></td>
                <td style={{ color: 'var(--clay)', fontWeight: 600 }}>{item.reason}</td>
                <td style={{ color: 'var(--clay)', fontWeight: 'bold' }}>{item.confidence}</td>
                <td>
                  <div className="row-actions">
                    <button style={{ color: 'var(--clay)', borderColor: 'var(--clay)' }} onClick={() => toast.success('Content removed')}>Remove</button>
                    <button style={{ color: 'var(--moss)', borderColor: 'var(--moss)' }} onClick={() => toast.success('Content allowed')}>Allow</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

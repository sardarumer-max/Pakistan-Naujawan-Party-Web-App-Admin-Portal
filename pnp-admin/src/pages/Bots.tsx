import { motion } from 'framer-motion';
import { toast } from 'sonner';

export function Bots() {
  const bots = [
    { name: 'bot_acc_4421', reason: 'Coordinated voting', evidence: '50 votes in 2 min · same IP as 12 others', created: 'Today 9:34am' },
    { name: 'user_new_8832', reason: 'Registration pattern', evidence: 'Account 5 of 8 created from same device in 1hr', created: 'Today 10:12am' },
    { name: 'acc_spam_0012', reason: 'Spam complaints', evidence: '14 identical complaints in 30 min', created: 'Yesterday' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="crumb">Users</div>
      <div className="page-head">
        <div>
          <h1>Bot Flags</h1>
          <p>Suspicious coordinate activity and bot flags queue.</p>
        </div>
        <button className="primary-btn" style={{ background: 'var(--clay)' }} onClick={() => toast.success('All flagged bots banned')}>
          Ban All →
        </button>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3>Flagged Bot Accounts</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Account</th>
              <th>Flag Reason</th>
              <th>Evidence</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bots.map((b) => (
              <tr key={b.name}>
                <td style={{ fontWeight: 600 }}>{b.name}</td>
                <td style={{ color: 'var(--clay)', fontWeight: 600 }}>{b.reason}</td>
                <td style={{ color: 'var(--text-dim)' }}>{b.evidence}</td>
                <td style={{ color: 'var(--text-dim)' }}>{b.created}</td>
                <td>
                  <div className="row-actions">
                    <button style={{ color: 'var(--clay)', borderColor: 'var(--clay)' }} onClick={() => toast.success(`Banned ${b.name}`)}>Ban</button>
                    <button style={{ color: 'var(--moss)', borderColor: 'var(--moss)' }} onClick={() => toast.info(`Cleared flag for ${b.name}`)}>Clear</button>
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

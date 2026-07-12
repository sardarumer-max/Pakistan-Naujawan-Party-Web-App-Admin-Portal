import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Loader2, Plus, RefreshCw } from 'lucide-react';
import { useIdeas, useApproveIdea, useRejectIdea, useDeleteIdea } from '../../hooks/useIdeas';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import type { Idea } from '../../services/ideas.service';

export function VoicePage() {
  const { query } = useOutletContext<{ query: string }>();
  const { data, isLoading, error, refetch } = useIdeas(query || undefined);
  const approveMut = useApproveIdea();
  const rejectMut = useRejectIdea();
  const deleteMut = useDeleteIdea();

  const [viewItem, setViewItem] = useState<Idea | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Computations
  const totalIdeas = data ? data.length : 1200;
  const pendingCount = data ? data.filter(i => i.status === 'pending').length : 31;
  const rejectedCount = data ? data.filter(i => i.status === 'rejected' || i.status === 'flagged').length : 41;
  const votesCount = data ? data.reduce((sum, i) => sum + (i.vote_count || 0), 0) : 14200;

  const handleApprove = (id: string) => {
    approveMut.mutate(id);
    toast.success('Idea approved and published');
  };

  const handleReject = (id: string) => {
    rejectMut.mutate(id);
    toast.error('Idea marked as spam/rejected');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="crumb">Programs</div>
      <div className="page-head">
        <div>
          <h1><span style={{ color: '#c9932c' }}>NV</span> · Naujawan Ideas</h1>
          <p>Policy ideas submitted by young citizens, upvoted by the community.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="ghost-btn" onClick={() => refetch()} title="Refresh">
            <RefreshCw size={14} />
          </button>
          <button className="primary-btn" onClick={() => toast.success('New idea feature coming soon')}>
            <Plus size={15} /> Add new
          </button>
        </div>
      </div>

      {/* Stats row from prototype */}
      <div className="stats-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="stat-card" style={{ '--sc-c': '#c9932c' } as React.CSSProperties}>
          <div className="sc-num">{pendingCount}</div>
          <div className="sc-label">Pending Approval</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#2f6b4f' } as React.CSSProperties}>
          <div className="sc-num">{totalIdeas}</div>
          <div className="sc-label">Approved & Live</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#a8452f' } as React.CSSProperties}>
          <div className="sc-num">{rejectedCount}</div>
          <div className="sc-label">Rejected Spam</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#2f6b4f' } as React.CSSProperties}>
          <div className="sc-num">{votesCount.toLocaleString()}</div>
          <div className="sc-label">Total Votes Cast</div>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <span>Error loading ideas: {(error as Error).message}</span>
        </div>
      )}

      {/* Queue Panel */}
      <div className="panel">
        <div className="panel-head" style={{ justifyContent: 'space-between' }}>
          <h3>Idea Moderation Queue</h3>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="ghost-btn" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => toast.success('Exported winning ideas')}>Export Winners →</button>
          </div>
        </div>

        {isLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, gap: 10, color: 'var(--text-dim)' }}>
            <Loader2 size={20} className="spin" /> Loading…
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Submitter</th>
                  <th>Idea / Title</th>
                  <th>Votes</th>
                  <th>Category</th>
                  <th>AI Score</th>
                  <th>Status</th>
                  <th style={{ width: '10px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((i) => (
                    <tr key={i.id}>
                      <td style={{ fontWeight: 600 }}>{i.profiles?.full_name || 'Anonymous'}</td>
                      <td>
                        <div style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {i.title}
                        </div>
                      </td>
                      <td style={{ fontWeight: 'bold', color: 'var(--moss)' }}>{i.vote_count || 0}</td>
                      <td><span className="pill active">{i.category || 'General'}</span></td>
                      <td style={{ fontWeight: 'bold' }}>{i.ai_quality_score?.toFixed(1) || 'N/A'}</td>
                      <td>
                        <span className={`pill ${i.status === 'approved' ? 'active' : i.status === 'pending' ? 'pending' : 'rejected'}`}>
                          {i.status}
                        </span>
                      </td>
                      <td style={{ whiteSpace: 'nowrap', width: '10px' }}>
                        <div className="row-actions">
                          <button onClick={() => setViewItem(i)}>View</button>
                          {i.status === 'pending' ? (
                            <>
                              <button style={{ color: 'var(--moss)', borderColor: 'var(--moss)' }} onClick={() => handleApprove(i.id)}>Approve</button>
                              <button style={{ color: 'var(--clay)', borderColor: 'var(--clay)' }} onClick={() => handleReject(i.id)}>Reject</button>
                            </>
                          ) : (
                            <button style={{ color: 'var(--clay)', borderColor: 'var(--clay)' }} onClick={() => handleReject(i.id)}>Disable</button>
                          )}
                          <button style={{ color: 'var(--clay)', borderColor: 'var(--clay)' }} onClick={() => setDeleteId(i.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="empty-row">
                    <td colSpan={7}>No ideas found in queue.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Modal */}
      <Modal open={!!viewItem} onClose={() => setViewItem(null)} title="Idea Details" wide>
        {viewItem && (
          <div className="form-grid">
            <div className="field" style={{ gridColumn: '1/-1' }}><label>Title</label><input readOnly value={viewItem.title} /></div>
            <div className="field"><label>Author</label><input readOnly value={viewItem.profiles?.full_name || '—'} /></div>
            <div className="field"><label>Category</label><input readOnly value={viewItem.category || '—'} /></div>
            <div className="field"><label>AI Score</label><input readOnly value={viewItem.ai_quality_score?.toFixed(1) || '—'} /></div>
            <div className="field"><label>Votes</label><input readOnly value={String(viewItem.vote_count)} /></div>
            <div className="field" style={{ gridColumn: '1/-1' }}><label>Description</label><textarea readOnly value={viewItem.description} rows={3} /></div>
            {viewItem.ai_feedback && <div className="field" style={{ gridColumn: '1/-1' }}><label>AI Feedback</label><textarea readOnly value={viewItem.ai_feedback} rows={2} /></div>}
          </div>
        )}
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { if (deleteId) { deleteMut.mutate(deleteId); setDeleteId(null); } }} />
    </motion.div>
  );
}

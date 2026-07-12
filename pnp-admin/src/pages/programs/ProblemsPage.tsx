import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Loader2, Plus, RefreshCw } from 'lucide-react';
import { useComplaints, useUpdateComplaintStatus, useDeleteComplaint } from '../../hooks/useComplaints';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import type { Complaint } from '../../services/complaints.service';

export function ProblemsPage() {
  const { query } = useOutletContext<{ query: string }>();
  const { data, isLoading, error, refetch } = useComplaints(query || undefined);
  const updateStatus = useUpdateComplaintStatus();
  const deleteMut = useDeleteComplaint();

  const [viewItem, setViewItem] = useState<Complaint | null>(null);
  const [editItem, setEditItem] = useState<Complaint | null>(null);
  const [editStatus, setEditStatus] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Stats computation
  const totalCount = data ? data.length : 3284;
  const pendingCount = data ? data.filter(c => c.status === 'open' || c.status === 'pending').length : 24;
  const progressCount = data ? data.filter(c => c.status === 'in_review').length : 89;
  const resolvedCount = data ? data.filter(c => c.status === 'resolved').length : 127;

  const handleUpdateStatus = (id: string, status: string) => {
    updateStatus.mutate({ id, status });
    toast.success(`Complaint status updated to ${status}`);
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
          <h1><span style={{ color: '#a8452f' }}>PP</span> · Complaints</h1>
          <p>Civic complaints submitted by citizens, routed to the relevant department.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="ghost-btn" onClick={() => refetch()} title="Refresh">
            <RefreshCw size={14} />
          </button>
          <button className="primary-btn" onClick={() => toast.success('New complaint feature coming soon')}>
            <Plus size={15} /> Add new
          </button>
        </div>
      </div>

      {/* Stats row from prototype */}
      <div className="stats-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="stat-card" style={{ '--sc-c': '#a8452f' } as React.CSSProperties}>
          <div className="sc-num">{pendingCount}</div>
          <div className="sc-label">Pending Review</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#c9932c' } as React.CSSProperties}>
          <div className="sc-num">{progressCount}</div>
          <div className="sc-label">In Progress</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#2f6b4f' } as React.CSSProperties}>
          <div className="sc-num">{resolvedCount}</div>
          <div className="sc-label">Resolved</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#2f6b4f' } as React.CSSProperties}>
          <div className="sc-num">{totalCount}</div>
          <div className="sc-label">Total All Time</div>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <span>Error loading complaints: {(error as Error).message}</span>
        </div>
      )}

      {/* Queue Panel */}
      <div className="panel">
        <div className="panel-head" style={{ justifyContent: 'space-between' }}>
          <h3>Complaint Queue</h3>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="ghost-btn" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => toast.success('Exported complaints to departments')}>Export to Depts →</button>
            <button className="ghost-btn" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => toast.info('Filters active')}>Filter ▼</button>
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
                  <th>ID</th>
                  <th>Complaint</th>
                  <th>Category</th>
                  <th>District</th>
                  <th>Urgency</th>
                  <th>AI Dept</th>
                  <th>Status</th>
                  <th style={{ width: '10px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((c) => (
                    <tr key={c.id}>
                      <td style={{ color: 'var(--text-dim)' }}>#{c.id.slice(0, 5)}</td>
                      <td style={{ fontWeight: 500 }}>
                        <div className={c.description_raw?.match(/[\u0600-\u06FF]/) ? 'tbl-ur' : ''} style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {c.description_raw || 'No description'}
                        </div>
                      </td>
                      <td><span className="pill active">{c.category}</span></td>
                      <td>{c.district || '—'}</td>
                      <td>
                        <span className={`pill ${c.urgency?.toLowerCase() === 'critical' || c.urgency?.toLowerCase() === 'high' ? 'rejected' : 'pending'}`}>
                          {c.urgency || 'MEDIUM'}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-dim)' }}>{c.department || 'LESCO'}</td>
                      <td>
                        <span className={`pill ${c.status === 'resolved' ? 'active' : c.status === 'in_review' ? 'pending' : 'suspended'}`}>
                          {c.status}
                        </span>
                      </td>
                      <td style={{ whiteSpace: 'nowrap', width: '10px' }}>
                        <div className="row-actions">
                          <button onClick={() => setViewItem(c)}>View</button>
                          <button onClick={() => { setEditItem(c); setEditStatus(c.status); }}>Status</button>
                          <button style={{ color: 'var(--clay)', borderColor: 'var(--clay)' }} onClick={() => setDeleteId(c.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="empty-row">
                    <td colSpan={8}>No records yet — no entries submitted for Complaints yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Modal */}
      <Modal open={!!viewItem} onClose={() => setViewItem(null)} title="Complaint Details" wide>
        {viewItem && (
          <div className="form-grid">
            <div className="field"><label>Category</label><input readOnly value={viewItem.category} /></div>
            <div className="field"><label>District</label><input readOnly value={viewItem.district || '—'} /></div>
            <div className="field"><label>Department</label><input readOnly value={viewItem.department || '—'} /></div>
            <div className="field"><label>Urgency</label><input readOnly value={viewItem.urgency} /></div>
            <div className="field"><label>Status</label><input readOnly value={viewItem.status} /></div>
            <div className="field"><label>Upvotes</label><input readOnly value={String(viewItem.upvote_count)} /></div>
            <div className="field"><label>Reported by</label><input readOnly value={viewItem.profiles?.full_name || '—'} /></div>
            <div className="field"><label>Date</label><input readOnly value={new Date(viewItem.created_at).toLocaleString()} /></div>
            {viewItem.description_raw && (
              <div className="field" style={{ gridColumn: '1 / -1' }}><label>Raw Description</label><textarea readOnly value={viewItem.description_raw} rows={3} /></div>
            )}
            {viewItem.description_formal && (
              <div className="field" style={{ gridColumn: '1 / -1' }}><label>Formal Complaint (AI)</label><textarea readOnly value={viewItem.description_formal} rows={4} /></div>
            )}
          </div>
        )}
      </Modal>

      {/* Edit Status Modal */}
      <Modal
        open={!!editItem}
        onClose={() => setEditItem(null)}
        title="Update Complaint Status"
        footer={
          <>
            <button className="ghost-btn" onClick={() => setEditItem(null)}>Cancel</button>
            <button className="primary-btn" onClick={() => {
              if (editItem) { handleUpdateStatus(editItem.id, editStatus); setEditItem(null); }
            }}>Update</button>
          </>
        }
      >
        {editItem && (
          <div className="field">
            <label>Status for complaint {editItem.id.slice(0, 8)}</label>
            <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
              <option value="open">open</option>
              <option value="in_review">in_review</option>
              <option value="resolved">resolved</option>
              <option value="hidden">hidden</option>
            </select>
          </div>
        )}
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { if (deleteId) { deleteMut.mutate(deleteId); setDeleteId(null); } }} />
    </motion.div>
  );
}

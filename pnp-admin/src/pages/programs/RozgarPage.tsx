import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Loader2, Plus, RefreshCw } from 'lucide-react';
import { useJobs, useApproveJob, useRejectJob, useDeleteJob } from '../../hooks/useJobs';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import type { Job } from '../../services/jobs.service';

export function RozgarPage() {
  const { query } = useOutletContext<{ query: string }>();
  const { data, isLoading, error, refetch } = useJobs(query || undefined);
  const approveMut = useApproveJob();
  const rejectMut = useRejectJob();
  const deleteMut = useDeleteJob();

  const [viewJob, setViewJob] = useState<Job | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Computations
  const totalJobs = data ? data.length : 834;
  const pendingVerify = data ? data.filter(j => !j.is_verified).length : 8;
  const flaggedScam = data ? data.filter(j => j.ai_scam_score > 0.6).length : 3;
  const verifiedCompanies = 42; // static from prototype

  const handleApprove = (id: string) => {
    approveMut.mutate(id);
    toast.success('Job approved and published');
  };

  const handleReject = (id: string) => {
    rejectMut.mutate(id);
    toast.error('Job rejected and removed');
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
          <h1><span style={{ color: '#c9932c' }}>RZ</span> · Jobs / Rozgar</h1>
          <p>Verify job listings and moderate coordinate scam flags.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="ghost-btn" onClick={() => refetch()} title="Refresh">
            <RefreshCw size={14} />
          </button>
          <button className="primary-btn" onClick={() => toast.success('New job listing feature coming soon')}>
            <Plus size={15} /> Add new
          </button>
        </div>
      </div>

      {/* Stats row from prototype */}
      <div className="stats-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="stat-card" style={{ '--sc-c': '#c9932c' } as React.CSSProperties}>
          <div className="sc-num">{pendingVerify}</div>
          <div className="sc-label">Pending Verify</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#a8452f' } as React.CSSProperties}>
          <div className="sc-num">{flaggedScam}</div>
          <div className="sc-label">AI Flagged Scam</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#2f6b4f' } as React.CSSProperties}>
          <div className="sc-num">{totalJobs}</div>
          <div className="sc-label">Live Jobs</div>
        </div>
        <div className="stat-card" style={{ '--sc-c': '#2f6b4f' } as React.CSSProperties}>
          <div className="sc-num">{verifiedCompanies}</div>
          <div className="sc-label">Companies Verified</div>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <span>Error loading jobs: {(error as Error).message}</span>
        </div>
      )}

      {/* Queue Panel */}
      <div className="panel">
        <div className="panel-head" style={{ justifyContent: 'space-between' }}>
          <h3>Job Review Queue</h3>
          <div style={{ display: 'flex', gap: 6 }}>
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
                  <th>Company</th>
                  <th>Job Title</th>
                  <th>Type</th>
                  <th>AI Scam Score</th>
                  <th>Flags</th>
                  <th>Status</th>
                  <th style={{ width: '10px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((j) => (
                    <tr key={j.id}>
                      <td style={{ fontWeight: 600 }}>{j.company || 'Unknown Co.'}</td>
                      <td>{j.title}</td>
                      <td><span className="pill active">{j.job_type}</span></td>
                      <td style={{ fontWeight: 'bold', color: j.ai_scam_score > 0.6 ? 'var(--clay)' : 'var(--text)' }}>
                        {(j.ai_scam_score * 100).toFixed(0)}%
                      </td>
                      <td style={{ fontSize: '11.5px', color: 'var(--text-dim)' }}>
                        {j.ai_scam_flags && j.ai_scam_flags.length > 0 ? j.ai_scam_flags.join(', ') : 'None'}
                      </td>
                      <td>
                        <span className={`pill ${j.is_verified ? 'active' : 'pending'}`}>
                          {j.is_verified ? 'verified' : 'pending'}
                        </span>
                      </td>
                      <td style={{ whiteSpace: 'nowrap', width: '10px' }}>
                        <div className="row-actions">
                          <button onClick={() => setViewJob(j)}>View</button>
                          {!j.is_verified ? (
                            <button style={{ color: 'var(--moss)', borderColor: 'var(--moss)' }} onClick={() => handleApprove(j.id)}>Approve</button>
                          ) : (
                            <button style={{ color: 'var(--clay)', borderColor: 'var(--clay)' }} onClick={() => handleReject(j.id)}>Reject</button>
                          )}
                          <button style={{ color: 'var(--clay)', borderColor: 'var(--clay)' }} onClick={() => setDeleteId(j.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="empty-row">
                    <td colSpan={7}>No jobs found in queue.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Modal */}
      <Modal open={!!viewJob} onClose={() => setViewJob(null)} title="Job Details" wide>
        {viewJob && (
          <div className="form-grid">
            <div className="field"><label>Title</label><input readOnly value={viewJob.title} /></div>
            <div className="field"><label>Company</label><input readOnly value={viewJob.company || '—'} /></div>
            <div className="field"><label>Type</label><input readOnly value={viewJob.job_type} /></div>
            <div className="field"><label>Location</label><input readOnly value={viewJob.location || '—'} /></div>
            <div className="field"><label>Salary</label><input readOnly value={viewJob.salary_range || '—'} /></div>
            <div className="field"><label>Deadline</label><input readOnly value={viewJob.deadline || '—'} /></div>
            <div className="field"><label>Scam Score</label><input readOnly value={(viewJob.ai_scam_score * 100).toFixed(1) + '%'} /></div>
            <div className="field"><label>Verified</label><input readOnly value={viewJob.is_verified ? 'Yes' : 'No'} /></div>
            {viewJob.ai_scam_flags && (
              <div className="field" style={{ gridColumn: '1 / -1' }}>
                <label>Scam Flags</label>
                <textarea readOnly value={viewJob.ai_scam_flags.join(', ')} rows={2} />
              </div>
            )}
            {viewJob.description && (
              <div className="field" style={{ gridColumn: '1 / -1' }}>
                <label>Description</label>
                <textarea readOnly value={viewJob.description} rows={4} />
              </div>
            )}
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => { if (deleteId) { deleteMut.mutate(deleteId); setDeleteId(null); } }}
      />
    </motion.div>
  );
}

import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PageShell } from '../components/ui/PageShell';
import { Modal } from '../components/ui/Modal';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { useAdmins, useUpdateRole, useDeleteProfile } from '../hooks/useProfiles';
import type { Profile } from '../services/profiles.service';

export function Admins() {
  const { query } = useOutletContext<{ query: string }>();
  const { data: admins, isLoading, error, refetch } = useAdmins();

  const updateRole = useUpdateRole();
  const deleteProfileMut = useDeleteProfile();

  const [viewAdmin, setViewAdmin] = useState<Profile | null>(null);
  const [editAdmin, setEditAdmin] = useState<Profile | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState('');

  // Filter by query
  const filtered = (admins || []).filter((a) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      (a.full_name || '').toLowerCase().includes(q) ||
      a.role.toLowerCase().includes(q) ||
      (a.province || '').toLowerCase().includes(q)
    );
  });

  const cols = ['ID', 'Name', 'Role', 'Province', 'Phone', 'Last Active'];
  const rows = filtered.map((a) => [
    a.id.slice(0, 8) + '…',
    a.full_name || '—',
    a.role,
    a.province || '—',
    a.phone || '—',
    new Date(a.created_at).toLocaleDateString(),
  ]);
  const rowIds = filtered.map((a) => a.id);

  return (
    <>
      <PageShell
        title="Admins"
        desc="Staff and program leads with panel access."
        actionLabel="Invite admin"
        cols={cols}
        rows={rows}
        rowIds={rowIds}
        query=""
        crumb="Overview"
        isLoading={isLoading}
        error={error as Error | null}
        onView={(_r, idx) => { if (filtered[idx]) setViewAdmin(filtered[idx]); }}
        onEdit={(_r, idx) => {
          if (filtered[idx]) {
            setEditAdmin(filtered[idx]);
            setEditRole(filtered[idx].role);
          }
        }}
        onDelete={(_r, idx) => { if (filtered[idx]) setDeleteId(filtered[idx].id); }}
        onRefresh={() => refetch()}
      />

      <Modal open={!!viewAdmin} onClose={() => setViewAdmin(null)} title="Admin Details" wide>
        {viewAdmin && (
          <div className="form-grid">
            <div className="field"><label>Name</label><input readOnly value={viewAdmin.full_name || '—'} /></div>
            <div className="field"><label>Role</label><input readOnly value={viewAdmin.role} /></div>
            <div className="field"><label>Phone</label><input readOnly value={viewAdmin.phone || '—'} /></div>
            <div className="field"><label>Province</label><input readOnly value={viewAdmin.province || '—'} /></div>
          </div>
        )}
      </Modal>

      <Modal
        open={!!editAdmin}
        onClose={() => setEditAdmin(null)}
        title="Change Admin Role"
        footer={
          <>
            <button className="ghost-btn" onClick={() => setEditAdmin(null)}>Cancel</button>
            <button className="primary-btn" onClick={() => {
              if (editAdmin) { updateRole.mutate({ id: editAdmin.id, role: editRole }); setEditAdmin(null); }
            }}>Save</button>
          </>
        }
      >
        {editAdmin && (
          <div className="field">
            <label>Role for {editAdmin.full_name || 'user'}</label>
            <select value={editRole} onChange={(e) => setEditRole(e.target.value)}>
              <option value="moderator">moderator</option>
              <option value="admin">admin</option>
              <option value="user">user (remove admin access)</option>
            </select>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => { if (deleteId) { deleteProfileMut.mutate(deleteId); setDeleteId(null); } }}
        title="Remove Admin"
        message="Are you sure you want to remove this admin?"
      />
    </>
  );
}

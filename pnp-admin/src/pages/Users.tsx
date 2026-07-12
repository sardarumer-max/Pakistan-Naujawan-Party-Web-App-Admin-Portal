import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PageShell } from '../components/ui/PageShell';
import { Modal } from '../components/ui/Modal';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { useProfiles, useUpdateRole, useDeleteProfile } from '../hooks/useProfiles';
import type { Profile } from '../services/profiles.service';

export function Users() {
  const { query } = useOutletContext<{ query: string }>();
  const { data: profiles, isLoading, error, refetch } = useProfiles(query || undefined);

  const updateRole = useUpdateRole();
  const deleteProfileMut = useDeleteProfile();

  const [viewProfile, setViewProfile] = useState<Profile | null>(null);
  const [editProfile, setEditProfile] = useState<Profile | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState('');

  const cols = ['ID', 'Name', 'Phone', 'Province', 'District', 'Role', 'Joined'];
  const rows = (profiles || []).map((p) => [
    p.id.slice(0, 8) + '…',
    p.full_name || '—',
    p.phone || '—',
    p.province || '—',
    p.district || '—',
    p.role,
    new Date(p.created_at).toLocaleDateString(),
  ]);
  const rowIds = (profiles || []).map((p) => p.id);

  function handleView(_row: string[], idx: number) {
    if (profiles?.[idx]) setViewProfile(profiles[idx]);
  }

  function handleEdit(_row: string[], idx: number) {
    if (profiles?.[idx]) {
      setEditProfile(profiles[idx]);
      setEditRole(profiles[idx].role);
    }
  }

  function handleDelete(_row: string[], idx: number) {
    if (profiles?.[idx]) setDeleteId(profiles[idx].id);
  }

  function handleBulkDelete(ids: string[]) {
    ids.forEach((id) => deleteProfileMut.mutate(id));
  }

  return (
    <>
      <PageShell
        title="Users"
        desc="People registered across the PNP platform."
        cols={cols}
        rows={rows}
        rowIds={rowIds}
        query={query}
        crumb="Overview"
        isLoading={isLoading}
        error={error as Error | null}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRefresh={() => refetch()}
        statusOptions={['user', 'admin', 'moderator']}
        bulkActions={[
          { label: 'Delete selected', onClick: handleBulkDelete, variant: 'danger' },
        ]}
      />

      {/* View modal */}
      <Modal open={!!viewProfile} onClose={() => setViewProfile(null)} title="User Details" wide>
        {viewProfile && (
          <div className="form-grid">
            <div className="field"><label>Full Name</label><input readOnly value={viewProfile.full_name || '—'} /></div>
            <div className="field"><label>Phone</label><input readOnly value={viewProfile.phone || '—'} /></div>
            <div className="field"><label>Province</label><input readOnly value={viewProfile.province || '—'} /></div>
            <div className="field"><label>District</label><input readOnly value={viewProfile.district || '—'} /></div>
            <div className="field"><label>Role</label><input readOnly value={viewProfile.role} /></div>
            <div className="field"><label>Language</label><input readOnly value={viewProfile.preferred_language} /></div>
            <div className="field"><label>Joined</label><input readOnly value={new Date(viewProfile.created_at).toLocaleString()} /></div>
            <div className="field"><label>ID</label><input readOnly value={viewProfile.id} className="mono" /></div>
          </div>
        )}
      </Modal>

      {/* Edit modal */}
      <Modal
        open={!!editProfile}
        onClose={() => setEditProfile(null)}
        title="Edit User Role"
        footer={
          <>
            <button className="ghost-btn" onClick={() => setEditProfile(null)}>Cancel</button>
            <button
              className="primary-btn"
              onClick={() => {
                if (editProfile) {
                  updateRole.mutate({ id: editProfile.id, role: editRole });
                  setEditProfile(null);
                }
              }}
            >
              Save role
            </button>
          </>
        }
      >
        {editProfile && (
          <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="field">
              <label>User: {editProfile.full_name || editProfile.id.slice(0, 8)}</label>
            </div>
            <div className="field">
              <label>Role</label>
              <select value={editRole} onChange={(e) => setEditRole(e.target.value)}>
                <option value="user">user</option>
                <option value="moderator">moderator</option>
                <option value="admin">admin</option>
              </select>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete confirm */}
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteProfileMut.mutate(deleteId);
            setDeleteId(null);
          }
        }}
        title="Delete User"
        message="Are you sure? This will permanently delete this user and all their data (complaints, ideas, etc.) due to CASCADE."
      />
    </>
  );
}

import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PageShell } from '../../components/ui/PageShell';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { useChatSessions, useDeleteChatSession } from '../../hooks/useChatSessions';
import type { ChatSession } from '../../services/chatSessions.service';

export function SaathiPage() {
  const { query } = useOutletContext<{ query: string }>();
  const { data, isLoading, error, refetch } = useChatSessions(query || undefined);
  const deleteMut = useDeleteChatSession();

  const [viewSession, setViewSession] = useState<ChatSession | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const cols = ['ID', 'User', 'Portal Context', 'Messages', 'Last Updated'];
  const rows = (data || []).map((s) => [
    s.id.slice(0, 8) + '…',
    s.profiles?.full_name || 'Anonymous',
    s.portal_context || '—',
    String(s.messages?.length || 0),
    new Date(s.updated_at).toLocaleString(),
  ]);
  const rowIds = (data || []).map((s) => s.id);

  return (
    <>
      <PageShell
        title="PNP Saathi"
        desc="Peer-support chatbot conversations for moderation."
        tag="SA"
        color="#c9932c"
        crumb="Programs"
        cols={cols}
        rows={rows}
        rowIds={rowIds}
        query={query}
        isLoading={isLoading}
        error={error as Error | null}
        onView={(_r, idx) => data?.[idx] && setViewSession(data[idx])}
        onDelete={(_r, idx) => data?.[idx] && setDeleteId(data[idx].id)}
        onRefresh={() => refetch()}
        bulkActions={[
          { label: 'Delete selected', onClick: (ids) => ids.forEach((id) => deleteMut.mutate(id)), variant: 'danger' },
        ]}
      />

      <Modal open={!!viewSession} onClose={() => setViewSession(null)} title="Chat Session" wide>
        {viewSession && (
          <div style={{ maxHeight: 400, overflow: 'auto' }}>
            {viewSession.messages?.map((m, i) => (
              <div key={i} style={{
                padding: '8px 12px',
                marginBottom: 6,
                borderRadius: 8,
                background: m.role === 'user' ? '#e4f1e8' : 'var(--paper)',
                fontSize: 13,
              }}>
                <strong style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase' }}>{m.role}</strong>
                <p style={{ margin: '4px 0 0' }}>{m.content}</p>
              </div>
            )) || <p>No messages</p>}
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => { if (deleteId) { deleteMut.mutate(deleteId); setDeleteId(null); } }}
      />
    </>
  );
}

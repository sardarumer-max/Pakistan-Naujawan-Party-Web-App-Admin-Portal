import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PageShell } from '../../components/ui/PageShell';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { useLegalQueries, useDeleteLegalQuery } from '../../hooks/useLegalQueries';

export function QaanoonPage() {
  const { query } = useOutletContext<{ query: string }>();
  const { data, isLoading, error, refetch } = useLegalQueries(query || undefined);
  const deleteMut = useDeleteLegalQuery();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const cols = ['ID', 'User', 'Topic', 'Question', 'Date'];
  const rows = (data || []).map((q) => [
    q.id.slice(0, 8) + '…', q.profiles?.full_name || 'Anonymous',
    q.topic || '—', q.question.slice(0, 80) + (q.question.length > 80 ? '…' : ''),
    new Date(q.created_at).toLocaleDateString(),
  ]);
  const rowIds = (data || []).map((q) => q.id);

  return (
    <>
      <PageShell title="Qaanoon" desc="Legal guidance requests answered by volunteer advocates." tag="QN" color="#2f6b4f" crumb="Programs"
        cols={cols} rows={rows} rowIds={rowIds} query={query} isLoading={isLoading} error={error as Error | null}
        onDelete={(_r, idx) => data?.[idx] && setDeleteId(data[idx].id)} onRefresh={() => refetch()}
        statusOptions={['fir', 'tenant', 'labor', 'women', 'consumer', 'child', 'nadra']}
      />
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { if (deleteId) { deleteMut.mutate(deleteId); setDeleteId(null); }}} />
    </>
  );
}

import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PageShell } from '../../components/ui/PageShell';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { useBloodDonors, useToggleDonorAvailability, useDeleteBloodDonor } from '../../hooks/useBloodDonors';

export function EmergencyPage() {
  const { query } = useOutletContext<{ query: string }>();
  const { data, isLoading, error, refetch } = useBloodDonors(query || undefined);
  const toggleMut = useToggleDonorAvailability();
  const deleteMut = useDeleteBloodDonor();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const cols = ['ID', 'Donor', 'Blood Group', 'City', 'Available', 'Last Donated', 'Phone'];
  const rows = (data || []).map((d) => [
    d.id.slice(0, 8) + '…', d.profiles?.full_name || '—', d.blood_group,
    d.city, d.is_available ? 'active' : 'suspended', d.last_donated || '—', d.contact_phone || '—',
  ]);
  const rowIds = (data || []).map((d) => d.id);

  return (
    <>
      <PageShell title="Emergency Network" desc="Blood donor registry and emergency response." tag="EN" color="#a8452f" crumb="Programs"
        cols={cols} rows={rows} rowIds={rowIds} query={query} isLoading={isLoading} error={error as Error | null}
        onEdit={(_r, idx) => {
          if (data?.[idx]) { const d = data[idx]; toggleMut.mutate({ id: d.id, is_available: !d.is_available }); }
        }}
        onDelete={(_r, idx) => data?.[idx] && setDeleteId(data[idx].id)} onRefresh={() => refetch()}
        statusOptions={['active', 'suspended']}
      />
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { if (deleteId) { deleteMut.mutate(deleteId); setDeleteId(null); }}} />
    </>
  );
}

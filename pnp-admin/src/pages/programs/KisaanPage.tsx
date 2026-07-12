import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Loader2, RefreshCw } from 'lucide-react';
import { useCropReports, useDeleteCropReport } from '../../hooks/useCropReports';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';

export function KisaanPage() {
  const { query } = useOutletContext<{ query: string }>();
  const { data, isLoading, refetch } = useCropReports(query || undefined);
  const deleteMut = useDeleteCropReport();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Mandi prices mockup state
  const [mandiPrices, setMandiPrices] = useState([
    { crop: 'Wheat · گندم', mandi: 'Faisalabad', price: '3,800', updated: '2h ago · Auto' },
    { crop: 'Rice · چاول', mandi: 'Lahore', price: '5,200', updated: '3h ago · Auto' },
    { crop: 'Sugarcane · گنا', mandi: 'Multan', price: '450', updated: '8h ago · Manual' }
  ]);

  const handleEditPrice = (crop: string) => {
    const newPrice = prompt(`Enter new price for ${crop}:`);
    if (newPrice) {
      setMandiPrices(prev => prev.map(m => m.crop === crop ? { ...m, price: newPrice, updated: 'Just now · Manual' } : m));
      toast.success(`Updated price for ${crop} to Rs. ${newPrice}`);
    }
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
          <h1><span style={{ color: '#2f6b4f' }}>KP</span> · Kisaan Data</h1>
          <p>Mandi prices override control and district crop disease reports tracker.</p>
        </div>
        <button className="ghost-btn" onClick={() => refetch()} title="Refresh">
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Grid 2 from prototype layout */}
      <div className="grid-2">
        {/* Mandi Prices Override */}
        <div className="panel">
          <div className="panel-head" style={{ justifyContent: 'space-between' }}>
            <h3>Mandi Prices — Manual Override</h3>
            <button className="primary-btn" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => toast.success('Mandi scraper triggered')}>Run Scraper Now →</button>
          </div>
          <div style={{ padding: '0 18px 14px' }}>
            <table>
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Mandi</th>
                  <th>Price (Rs/Maund)</th>
                  <th>Last Updated</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {mandiPrices.map((m) => (
                  <tr key={m.crop}>
                    <td style={{ fontWeight: 600 }}>{m.crop}</td>
                    <td>{m.mandi}</td>
                    <td style={{ color: 'var(--moss)', fontWeight: 'bold' }}>{m.price}</td>
                    <td style={{ color: 'var(--text-dim)' }}>{m.updated}</td>
                    <td>
                      <button className="primary-btn" style={{ fontSize: '11px', padding: '4px 8px' }} onClick={() => handleEditPrice(m.crop)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Crop Disease Reports by District */}
        <div className="panel">
          <div className="panel-head">
            <h3>Crop Disease Reports by District</h3>
          </div>
          <div style={{ padding: '0 18px 14px' }}>
            <div className="sent-item">
              <div className="sent-label">Faisalabad</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '68%', background: 'var(--clay)' }}></div>
              </div>
              <div className="sent-val" style={{ color: 'var(--clay)' }}>34</div>
            </div>
            <div className="sent-item">
              <div className="sent-label">Multan</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '44%', background: 'var(--gold)' }}></div>
              </div>
              <div className="sent-val" style={{ color: 'var(--gold)' }}>22</div>
            </div>
            <div className="sent-item">
              <div className="sent-label">Sahiwal</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '28%', background: 'var(--moss)' }}></div>
              </div>
              <div className="sent-val" style={{ color: 'var(--moss)' }}>14</div>
            </div>
            <div className="sent-item">
              <div className="sent-label">Hyderabad</div>
              <div className="sent-bar">
                <div className="sent-fill" style={{ width: '20%', background: 'var(--moss)' }}></div>
              </div>
              <div className="sent-val" style={{ color: 'var(--moss)' }}>10</div>
            </div>
          </div>
        </div>
      </div>

      {/* Database Crop Disease Reports */}
      <div className="panel" style={{ marginTop: '20px' }}>
        <div className="panel-head">
          <h3>Farmer Disease Reports (Database)</h3>
        </div>

        {isLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, gap: 10, color: 'var(--text-dim)' }}>
            <Loader2 size={20} className="spin" /> Loading…
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Farmer</th>
                <th>Crop</th>
                <th>Disease</th>
                <th>District</th>
                <th>Province</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((r) => (
                  <tr key={r.id}>
                    <td style={{ color: 'var(--text-dim)' }}>#{r.id.slice(0, 5)}</td>
                    <td style={{ fontWeight: 600 }}>{r.profiles?.full_name || 'Anonymous'}</td>
                    <td><span className="pill active">{r.crop_type}</span></td>
                    <td>{r.ai_disease || '—'}</td>
                    <td>{r.district || '—'}</td>
                    <td>{r.province || '—'}</td>
                    <td style={{ color: 'var(--text-dim)' }}>{new Date(r.created_at).toLocaleDateString()}</td>
                    <td>
                      <button style={{ color: 'var(--clay)', borderColor: 'var(--clay)' }} onClick={() => setDeleteId(r.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="empty-row">
                  <td colSpan={8}>No reports submitted yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { if (deleteId) { deleteMut.mutate(deleteId); setDeleteId(null); } }} />
    </motion.div>
  );
}

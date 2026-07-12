import { DataTable } from './DataTable';
import { Download, FileSpreadsheet, Plus, Filter, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useState } from 'react';

interface PageShellProps {
  title: string;
  desc?: string;
  cols: string[];
  rows: string[][];
  rowIds?: string[];
  actionLabel?: string;
  color?: string;
  tag?: string;
  query?: string;
  crumb?: string;
  isLoading?: boolean;
  error?: Error | null;
  onAdd?: () => void;
  onView?: (row: string[], idx: number) => void;
  onEdit?: (row: string[], idx: number) => void;
  onDelete?: (row: string[], idx: number) => void;
  onRefresh?: () => void;
  bulkActions?: { label: string; onClick: (selectedIds: string[]) => void; variant?: 'danger' | 'default' }[];
  statusOptions?: string[];
}

function exportCSV(cols: string[], rows: string[][], title: string) {
  const header = cols.join(',');
  const body = rows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
  const csv = `${header}\n${body}`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${title.toLowerCase().replace(/\s+/g, '_')}_export.csv`;
  link.click();
  URL.revokeObjectURL(url);
  toast.success(`Exported ${rows.length} records as CSV`);
}

export function PageShell({
  title,
  desc,
  cols,
  rows,
  rowIds,
  actionLabel,
  color,
  tag,
  query,
  crumb,
  isLoading,
  error,
  onAdd,
  onView,
  onEdit,
  onDelete,
  onRefresh,
  bulkActions,
  statusOptions,
}: PageShellProps) {
  const [statusFilter, setStatusFilter] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="crumb">{crumb}</div>
      <div className="page-head">
        <div>
          <h1>
            {tag ? <span style={{ color }}>{tag}</span> : null}
            {tag ? ' · ' : ''}
            {title}
          </h1>
          <p>{desc || ''}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {onRefresh && (
            <button className="ghost-btn" onClick={onRefresh} title="Refresh">
              <RefreshCw size={14} />
            </button>
          )}
          {onAdd && (
            <button className="primary-btn" onClick={onAdd}>
              <Plus size={15} />
              {actionLabel || 'Add new'}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <AlertCircle size={16} />
          <span>Error loading data: {error.message}</span>
        </div>
      )}

      <div className="panel">
        <div className="panel-head">
          <h3>{title} records</h3>
          <span className="n">
            {isLoading ? '…' : `${rows.length} total`}
          </span>
        </div>
        <div className="toolbar">
          {statusOptions && statusOptions.length > 0 ? (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <button
                className={`filter-btn ${statusFilter === '' ? 'active-filter' : ''}`}
                onClick={() => setStatusFilter('')}
              >
                All
              </button>
              {statusOptions.map((s) => (
                <button
                  key={s}
                  className={`filter-btn ${statusFilter === s ? 'active-filter' : ''}`}
                  onClick={() => setStatusFilter(statusFilter === s ? '' : s)}
                >
                  {s}
                </button>
              ))}
            </div>
          ) : (
            <button className="filter-btn">
              <Filter size={13} /> Filters
            </button>
          )}
          <div className="toolbar-actions">
            <button
              className="filter-btn"
              onClick={() => exportCSV(cols, rows, title)}
              disabled={isLoading}
            >
              <Download size={13} /> CSV
            </button>
            <button
              className="filter-btn"
              onClick={() => {
                exportCSV(cols, rows, title);
                toast.success('Excel export started');
              }}
              disabled={isLoading}
            >
              <FileSpreadsheet size={13} /> Excel
            </button>
          </div>
        </div>

        {isLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, gap: 10, color: 'var(--text-dim)' }}>
            <Loader2 size={20} className="spin" />
            Loading…
          </div>
        ) : (
          <DataTable
            cols={cols}
            rows={rows}
            rowIds={rowIds}
            emptyLabel={`no entries submitted for ${title} yet.`}
            query={query}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            bulkActions={bulkActions}
            statusFilter={statusFilter}
          />
        )}
      </div>
    </motion.div>
  );
}

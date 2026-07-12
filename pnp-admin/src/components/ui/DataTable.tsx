import { useState } from 'react';
import { StatusPill } from './StatusPill';
import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight, CheckSquare, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DataTableProps {
  cols: string[];
  rows: string[][];
  rowIds?: string[];
  query?: string;
  emptyLabel?: string;
  onView?: (row: string[], idx: number) => void;
  onEdit?: (row: string[], idx: number) => void;
  onDelete?: (row: string[], idx: number) => void;
  pageSize?: number;
  bulkActions?: { label: string; onClick: (selectedIds: string[]) => void; variant?: 'danger' | 'default' }[];
  statusFilter?: string;
}

const STATUS_REGEX = /^(active|suspended|open|closed|pending|review|approved|rejected|resolved|in_review|hidden|flagged|verified)$/i;

export function DataTable({
  cols,
  rows,
  rowIds,
  query = '',
  emptyLabel,
  onView,
  onEdit,
  onDelete,
  pageSize = 10,
  bulkActions,
  statusFilter,
}: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const q = query.trim().toLowerCase();

  // Filter by search
  let filteredRows = q
    ? rows.filter((r) => r.join(' ').toLowerCase().includes(q))
    : rows;

  // Filter by status
  if (statusFilter) {
    filteredRows = filteredRows.filter((r) =>
      r.some((cell) => cell.toLowerCase() === statusFilter.toLowerCase())
    );
  }

  // Sort
  const sortedRows = sortCol !== null
    ? [...filteredRows].sort((a, b) => {
        const valA = a[sortCol]?.toLowerCase() ?? '';
        const valB = b[sortCol]?.toLowerCase() ?? '';
        const numA = parseFloat(valA.replace(/[^0-9.-]/g, ''));
        const numB = parseFloat(valB.replace(/[^0-9.-]/g, ''));
        if (!isNaN(numA) && !isNaN(numB)) {
          return sortDir === 'asc' ? numA - numB : numB - numA;
        }
        const cmp = valA.localeCompare(valB);
        return sortDir === 'asc' ? cmp : -cmp;
      })
    : filteredRows;

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * pageSize;
  const pageRows = sortedRows.slice(startIdx, startIdx + pageSize);

  const handleSort = (colIdx: number) => {
    if (sortCol === colIdx) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortCol(colIdx);
      setSortDir('asc');
    }
    setCurrentPage(1);
  };

  const toggleRow = (ri: number) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(ri)) next.delete(ri);
      else next.add(ri);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedRows.size === pageRows.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(pageRows.map((_, i) => startIdx + i)));
    }
  };

  const getSelectedIds = (): string[] => {
    if (!rowIds) return [];
    return Array.from(selectedRows).map((i) => rowIds[i]).filter(Boolean);
  };

  // Find original index in rows[] for a row in pageRows
  const originalIndex = (row: string[]): number => {
    return rows.indexOf(row);
  };

  if (!rows.length) {
    return (
      <div className="table-wrap">
        <table>
          <tbody>
            <tr className="empty-row">
              <td colSpan={cols.length + 1}>
                No records yet — {emptyLabel || 'nothing to show here.'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      {/* Bulk action bar */}
      {bulkActions && selectedRows.size > 0 && (
        <div className="bulk-bar">
          <span>{selectedRows.size} selected</span>
          {bulkActions.map((a) => (
            <button
              key={a.label}
              className={a.variant === 'danger' ? 'danger-btn' : 'ghost-btn'}
              style={{ padding: '6px 12px', fontSize: 12 }}
              onClick={() => a.onClick(getSelectedIds())}
            >
              {a.label}
            </button>
          ))}
          <button className="ghost-btn" style={{ padding: '6px 12px', fontSize: 12 }} onClick={() => setSelectedRows(new Set())}>
            Clear
          </button>
        </div>
      )}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {bulkActions && (
                <th style={{ width: 36, padding: '10px 8px' }}>
                  <button onClick={toggleAll} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink)', display: 'flex' }}>
                    {selectedRows.size === pageRows.length && pageRows.length > 0 ? <CheckSquare size={14} /> : <Square size={14} />}
                  </button>
                </th>
              )}
              {cols.map((c, i) => (
                <th
                  key={c}
                  onClick={() => handleSort(i)}
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                >
                  {c}
                  {sortCol === i && (
                    <span style={{ marginLeft: 4, fontSize: 9 }}>
                      {sortDir === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <AnimatePresence mode="wait">
            <tbody>
              {pageRows.length === 0 ? (
                <tr className="empty-row">
                  <td colSpan={cols.length + (bulkActions ? 2 : 1)}>No rows match your search.</td>
                </tr>
              ) : (
                pageRows.map((r, ri) => {
                  const globalIdx = startIdx + ri;
                  return (
                    <motion.tr
                      key={rowIds?.[originalIndex(r)] || r[0] || ri}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.15, delay: ri * 0.02 }}
                    >
                      {bulkActions && (
                        <td style={{ width: 36, padding: '11px 8px' }}>
                          <button onClick={() => toggleRow(globalIdx)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink)', display: 'flex' }}>
                            {selectedRows.has(globalIdx) ? <CheckSquare size={14} /> : <Square size={14} />}
                          </button>
                        </td>
                      )}
                      {r.map((cell, i) => {
                        const isStatusCol = STATUS_REGEX.test(cell);
                        return (
                          <td key={i}>
                            {isStatusCol ? <StatusPill status={cell} /> : cell}
                          </td>
                        );
                      })}
                      <td className="row-actions">
                        {onView && (
                          <button onClick={() => onView(r, originalIndex(r))} title="View">
                            <Eye size={12} /> View
                          </button>
                        )}
                        {onEdit && (
                          <button onClick={() => onEdit(r, originalIndex(r))} title="Edit">
                            <Pencil size={12} /> Edit
                          </button>
                        )}
                        {onDelete && (
                          <button
                            className="delete"
                            onClick={() => onDelete(r, originalIndex(r))}
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </AnimatePresence>
        </table>
      </div>
      {sortedRows.length > pageSize && (
        <div className="pagination">
          <span>
            Showing {startIdx + 1}–{Math.min(startIdx + pageSize, sortedRows.length)} of{' '}
            {sortedRows.length}
          </span>
          <div className="pagination-btns">
            <button
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft size={13} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 2)
              .map((p, i, arr) => (
                <span key={p} style={{ display: 'contents' }}>
                  {i > 0 && arr[i - 1] !== p - 1 && <span style={{ padding: '0 4px', color: 'var(--text-dim)' }}>…</span>}
                  <button
                    className={p === safePage ? 'active-page' : ''}
                    onClick={() => setCurrentPage(p)}
                  >
                    {p}
                  </button>
                </span>
              ))}
            <button
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

import { FileQuestion } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export function EmptyState({
  title = 'No records found',
  message = 'There are no entries to display yet.',
}: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        color: 'var(--text-dim)',
        textAlign: 'center',
      }}
    >
      <FileQuestion size={40} strokeWidth={1.2} style={{ marginBottom: 14, opacity: 0.5 }} />
      <h3
        style={{
          margin: '0 0 6px',
          fontSize: 15,
          fontWeight: 600,
          color: 'var(--ink)',
          fontFamily: "'Fraunces', serif",
        }}
      >
        {title}
      </h3>
      <p style={{ margin: 0, fontSize: 13, maxWidth: 300 }}>{message}</p>
    </div>
  );
}

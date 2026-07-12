import { useOutletContext } from 'react-router-dom';
import { PageShell } from '../../components/ui/PageShell';
import { moduleMap, crumbFor } from '../../data/modules';
import type { NavItem } from '../../types';

interface ProgramPageProps {
  moduleId: string;
}

export function ProgramPage({ moduleId }: ProgramPageProps) {
  const { query } = useOutletContext<{ query: string }>();
  const m: NavItem = moduleMap[moduleId];

  if (!m || !m.cols || !m.rows) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-dim)' }}>
        Module data not found.
      </div>
    );
  }

  return (
    <PageShell
      title={m.name}
      desc={m.desc}
      cols={m.cols}
      rows={m.rows}
      color={m.color}
      tag={m.tag}
      query={query}
      crumb={crumbFor(m.name)}
    />
  );
}

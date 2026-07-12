import type { StatusType } from '../../types';

interface StatusPillProps {
  status: string;
}

const STATUS_REGEX = /^(active|suspended|open|closed|pending|review|approved|rejected|resolved)$/;

export function StatusPill({ status }: StatusPillProps) {
  const isStatus = STATUS_REGEX.test(status);
  if (!isStatus) return <>{status}</>;
  return <span className={`pill ${status as StatusType}`}>{status}</span>;
}

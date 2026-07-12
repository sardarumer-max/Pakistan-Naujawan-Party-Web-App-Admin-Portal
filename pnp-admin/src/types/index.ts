/* ── Types ── */

export interface NavItem {
  id: string;
  name: string;
  tag: string;
  color: string;
  desc?: string;
  cols?: string[];
  rows?: string[][];
  path: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface StatsCard {
  k: string;
  v: string;
  d: string;
  color: string;
  down?: boolean;
}

export interface ModuleData {
  cols: string[];
  rows: string[][];
}

export type StatusType =
  | 'active'
  | 'suspended'
  | 'open'
  | 'closed'
  | 'pending'
  | 'review'
  | 'approved'
  | 'rejected'
  | 'resolved';

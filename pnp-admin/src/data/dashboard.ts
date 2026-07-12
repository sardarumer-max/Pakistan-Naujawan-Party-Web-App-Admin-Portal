import type { StatsCard, ModuleData } from '../types';

/* ── Dashboard stats cards ── */
export const overviewCards: StatsCard[] = [
  { k: 'Users', v: '1,250', d: '+38 this week', color: '#2f6b4f' },
  { k: 'Jobs (Rozgar)', v: '340', d: '+12 this week', color: '#c9932c' },
  { k: 'Complaints', v: '52', d: '9 unresolved', color: '#a8452f', down: true },
  { k: 'Voice ideas', v: '81', d: '+6 this week', color: '#c9932c' },
  { k: 'Courses', v: '18', d: '3 closing soon', color: '#2f6b4f' },
  { k: 'Businesses', v: '45', d: '+4 this week', color: '#c9932c' },
  { k: 'Videos', v: '62', d: '5 in review', color: '#c9932c' },
  { k: 'Donations', v: '₨2.1M', d: 'this quarter', color: '#2f6b4f' },
];

/* ── Users data ── */
export const usersData: ModuleData = {
  cols: ['ID', 'Name', 'City', 'Programs used', 'Joined', 'Status'],
  rows: [
    ['U-2201', 'Ayesha Raheel', 'Lahore', 'Saathi, Voice', 'Mar 2025', 'active'],
    ['U-2198', 'Usman Tariq', 'Multan', 'Saathi', 'Feb 2025', 'active'],
    ['U-2190', 'Rubina Bibi', 'Karachi', 'Pakistan Problems', 'Jan 2025', 'active'],
    ['U-2184', 'Ghulam Rasool', 'Sahiwal', 'Kisaan Portal', 'Dec 2024', 'active'],
    ['U-2177', 'Danish Malik', 'Lahore', 'Business Hub', 'Nov 2024', 'suspended'],
    ['U-2169', 'Nazia Parveen', 'Bahawalpur', 'Kisaan Portal', 'Nov 2024', 'active'],
  ],
};

/* ── Admins data ── */
export const adminsData: ModuleData = {
  cols: ['ID', 'Name', 'Role', 'Manages', 'Last active', 'Status'],
  rows: [
    ['1', 'Super Admin', 'Owner', 'All modules', 'Just now', 'active'],
    ['2', 'Bilal Khan', 'Saathi Lead', 'PNP Saathi', '2h ago', 'active'],
    ['3', 'Sana Malik', 'Program Manager', 'Rozgar, Skill Pakistan', '1d ago', 'active'],
    ['4', 'Adv. Saima Riaz', 'Legal Lead', 'Qaanoon', '3d ago', 'active'],
    ['5', 'Zara Sheikh', 'Moderator', 'Naujawan Voice, TV', '5d ago', 'suspended'],
  ],
};

/* ── Notifications data ── */
export const notifData: ModuleData = {
  cols: ['ID', 'Message', 'Module', 'Sent', 'Status'],
  rows: [
    ['N-441', '3 new complaints need triage', 'Pakistan Problems', '10 min ago', 'open'],
    ['N-440', 'Course seats full: Digital Marketing 101', 'Skill Pakistan', '1h ago', 'closed'],
    ['N-439', 'High priority safety report filed', 'Mahfooz', '2h ago', 'open'],
    ['N-438', 'Flood warning acknowledged by 10 responders', 'Emergency Network', '4h ago', 'resolved'],
    ['N-437', 'New donation pledge recorded', 'Transparency Hub', '1d ago', 'closed'],
  ],
};

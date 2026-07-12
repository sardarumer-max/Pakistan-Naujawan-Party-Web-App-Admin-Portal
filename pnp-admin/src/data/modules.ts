import type { NavGroup, NavItem } from '../types';

/* ── Module registry — source of truth from the prototype ── */
export const groups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', name: 'Dashboard', tag: 'DB', color: '#2f6b4f', path: '/' },
      { id: 'users', name: 'Users', tag: 'US', color: '#2f6b4f', path: '/users' },
      { id: 'admins', name: 'Admins', tag: 'AD', color: '#2f6b4f', path: '/admins' },
      { id: 'notifications', name: 'Notifications', tag: 'NT', color: '#2f6b4f', path: '/notifications' },
    ],
  },
  {
    label: 'Programs',
    items: [
      {
        id: 'saathi', name: 'PNP Saathi', tag: 'SA', color: '#c9932c', path: '/saathi',
        desc: 'Peer-support helpline requests from citizens paired with a Saathi volunteer.',
        cols: ['ID', 'Citizen', 'City', 'Topic', 'Assigned Saathi', 'Status'],
        rows: [
          ['SA-1042', 'Ayesha Raheel', 'Lahore', 'Exam stress', 'Bilal Khan', 'open'],
          ['SA-1041', 'Usman Tariq', 'Multan', 'Job anxiety', 'Sana Malik', 'resolved'],
          ['SA-1039', 'Hira Zafar', 'Karachi', 'Family conflict', 'Bilal Khan', 'pending'],
          ['SA-1037', 'Fahad Iqbal', 'Peshawar', 'Loneliness', 'Zara Sheikh', 'resolved'],
          ['SA-1035', 'Mehak Noor', 'Quetta', 'Career choice', 'Sana Malik', 'open'],
        ],
      },
      {
        id: 'rozgar', name: 'Rozgar', tag: 'RZ', color: '#c9932c', path: '/rozgar',
        desc: 'Job listings and applications posted through the Rozgar employment portal.',
        cols: ['ID', 'Position', 'Employer', 'City', 'Applicants', 'Status'],
        rows: [
          ['RZ-3301', 'Data Entry Operator', 'Al-Noor Traders', 'Faisalabad', '24', 'open'],
          ['RZ-3298', 'Tailor (Male/Female)', 'Sitara Textiles', 'Lahore', '11', 'open'],
          ['RZ-3290', 'Delivery Rider', 'QuickCart', 'Karachi', '57', 'closed'],
          ['RZ-3287', 'Junior Accountant', 'Meezan Traders', 'Islamabad', '19', 'review'],
          ['RZ-3281', 'School Teacher', 'Iqra Public School', 'Multan', '8', 'open'],
          ['RZ-3277', 'Electrician', 'Bright Homes', 'Rawalpindi', '14', 'closed'],
        ],
      },
      {
        id: 'problems', name: 'Pakistan Problems', tag: 'PP', color: '#a8452f', path: '/problems',
        desc: 'Civic complaints submitted by citizens, routed to the relevant department.',
        cols: ['ID', 'Issue', 'Location', 'Category', 'Reported by', 'Status'],
        rows: [
          ['PP-8891', 'Broken streetlights', 'G-9, Islamabad', 'Infrastructure', 'M. Aslam', 'open'],
          ['PP-8887', 'Overflowing drain', 'Korangi, Karachi', 'Sanitation', 'Rubina Bibi', 'pending'],
          ['PP-8880', 'Illegal encroachment', 'Model Town, Lahore', 'Municipal', 'Anonymous', 'review'],
          ['PP-8874', 'Water shortage', 'Latifabad, Hyderabad', 'Utilities', 'Junaid Soomro', 'resolved'],
          ['PP-8869', 'Unpaved road', 'Cantt, Multan', 'Infrastructure', 'Kashif Butt', 'open'],
        ],
      },
      {
        id: 'voice', name: 'Naujawan Voice', tag: 'NV', color: '#c9932c', path: '/voice',
        desc: 'Policy ideas and opinions submitted by young citizens for review.',
        cols: ['ID', 'Title', 'Author', 'Category', 'Votes', 'Status'],
        rows: [
          ['NV-514', 'Free WiFi in public parks', 'Zoya Ahmed', 'Digital access', '312', 'review'],
          ['NV-509', 'Youth card for bus fares', 'Hamza Riaz', 'Transport', '208', 'approved'],
          ['NV-503', 'Night market safety patrols', 'Komal Yousuf', 'Safety', '145', 'open'],
          ['NV-498', 'Skill fairs in tehsils', 'Ibrahim Chaudhry', 'Education', '97', 'approved'],
        ],
      },
      {
        id: 'skill', name: 'Skill Pakistan', tag: 'SK', color: '#c9932c', path: '/skill',
        desc: 'Free and subsidised courses run through the Skill Pakistan initiative.',
        cols: ['ID', 'Course', 'Instructor', 'Seats', 'Enrolled', 'Status'],
        rows: [
          ['SK-201', 'Freelance Graphic Design', 'Nida Aziz', '40', '38', 'open'],
          ['SK-198', 'Basic Electrical Wiring', 'Rashid Mehmood', '25', '25', 'closed'],
          ['SK-194', 'Spoken English', 'Farah Yousaf', '60', '41', 'open'],
          ['SK-190', 'Mobile Repair Basics', 'Adeel Anjum', '30', '22', 'open'],
          ['SK-186', 'Digital Marketing 101', 'Nida Aziz', '50', '50', 'closed'],
        ],
      },
      {
        id: 'kisaan', name: 'Kisaan Portal', tag: 'KP', color: '#2f6b4f', path: '/kisaan',
        desc: 'Advisory requests and market listings submitted by farmers.',
        cols: ['ID', 'Farmer', 'District', 'Crop', 'Query', 'Status'],
        rows: [
          ['KP-772', 'Ghulam Rasool', 'Sahiwal', 'Wheat', 'Fertiliser advice', 'resolved'],
          ['KP-769', 'Nazia Parveen', 'Bahawalpur', 'Cotton', 'Pest outbreak', 'open'],
          ['KP-765', 'Sher Ali', 'Muzaffargarh', 'Sugarcane', 'Water quota', 'pending'],
          ['KP-760', 'Iqbal Hussain', 'Okara', 'Rice', 'Fair market price', 'resolved'],
        ],
      },
      {
        id: 'mahfooz', name: 'Mahfooz', tag: 'MF', color: '#a8452f', path: '/mahfooz',
        desc: 'Safety and harassment reports submitted through the Mahfooz protection line.',
        cols: ['ID', 'Reporter', 'City', 'Category', 'Priority', 'Status'],
        rows: [
          ['MF-330', 'Anonymous', 'Karachi', 'Workplace harassment', 'High', 'open'],
          ['MF-327', 'Anonymous', 'Lahore', 'Online abuse', 'Medium', 'review'],
          ['MF-321', 'Sadia Kamal', 'Sialkot', 'Street harassment', 'High', 'resolved'],
          ['MF-315', 'Anonymous', 'Peshawar', 'Domestic safety', 'High', 'open'],
        ],
      },
      {
        id: 'qaanoon', name: 'Qaanoon', tag: 'QN', color: '#2f6b4f', path: '/qaanoon',
        desc: 'Free legal guidance requests answered by volunteer advocates.',
        cols: ['ID', 'Citizen', 'Topic', 'Advocate', 'City', 'Status'],
        rows: [
          ['QN-441', 'Tariq Javed', 'Tenancy dispute', 'Adv. Saima Riaz', 'Lahore', 'resolved'],
          ['QN-438', 'Nasreen Akhtar', 'Inheritance', 'Adv. Bilal Farooq', 'Karachi', 'open'],
          ['QN-433', 'Waqar Younis', 'Labour rights', 'Adv. Saima Riaz', 'Faisalabad', 'pending'],
        ],
      },
      {
        id: 'emergency', name: 'Emergency Network', tag: 'EN', color: '#a8452f', path: '/emergency',
        desc: 'Live alerts broadcast to the volunteer emergency response network.',
        cols: ['ID', 'Alert', 'Location', 'Responders', 'Dispatched', 'Status'],
        rows: [
          ['EN-092', 'House fire', 'Nazimabad, Karachi', '6', '6', 'closed'],
          ['EN-091', 'Flood warning', 'Kot Addu', '14', '10', 'open'],
          ['EN-089', 'Road accident', 'Ferozepur Rd, Lahore', '4', '4', 'closed'],
          ['EN-087', 'Building collapse risk', 'Saddar, Rawalpindi', '8', '5', 'review'],
        ],
      },
      {
        id: 'business', name: 'Youth Business Hub', tag: 'YB', color: '#c9932c', path: '/business',
        desc: 'Small businesses and startups registered for mentorship and microloans.',
        cols: ['ID', 'Business', 'Founder', 'Sector', 'City', 'Status'],
        rows: [
          ['YB-160', 'Chai Point Cart', 'Danish Malik', 'Food', 'Lahore', 'approved'],
          ['YB-157', 'StitchWorks', 'Ayesha Farooq', 'Apparel', 'Karachi', 'review'],
          ['YB-153', 'GreenLeaf Produce', 'Bilal Ahsan', 'Agri-trade', 'Multan', 'approved'],
          ['YB-149', 'PixelCraft Studio', 'Hamna Tariq', 'Design', 'Islamabad', 'open'],
        ],
      },
      {
        id: 'tv', name: 'Naujawan TV', tag: 'TV', color: '#c9932c', path: '/tv',
        desc: 'Video content pending review before publishing to the Naujawan TV channel.',
        cols: ['ID', 'Title', 'Creator', 'Category', 'Views', 'Status'],
        rows: [
          ['TV-905', 'How to file a CNIC correction', 'Ali Hamza', 'Explainer', '12,400', 'open'],
          ['TV-902', 'Interview: young farmer entrepreneurs', 'Mariam Sohail', 'Interview', '8,120', 'review'],
          ['TV-897', 'Budget 101 for first jobs', 'Danyal Aziz', 'Education', '21,050', 'open'],
          ['TV-891', 'Street voices: Karachi transport', 'Mariam Sohail', 'Documentary', '5,430', 'pending'],
        ],
      },
      {
        id: 'transparency', name: 'Transparency Hub', tag: 'TH', color: '#2f6b4f', path: '/transparency',
        desc: 'Donations and public fund disbursements published for audit.',
        cols: ['ID', 'Donor / Fund', 'Purpose', 'Amount (PKR)', 'District', 'Status'],
        rows: [
          ['TH-220', 'Anonymous donor', 'Flood relief', '500,000', 'Kot Addu', 'resolved'],
          ['TH-217', 'PNP Community Fund', 'School supplies', '180,000', 'Muzaffargarh', 'open'],
          ['TH-212', 'Corporate CSR — Zafar Textiles', 'Winter blankets', '350,000', 'Quetta', 'review'],
          ['TH-208', 'Anonymous donor', 'Medical camp', '240,000', 'Larkana', 'resolved'],
        ],
      },
    ],
  },
  {
    label: 'System',
    items: [
      { id: 'settings', name: 'Settings', tag: 'ST', color: '#12253a', path: '/settings' },
    ],
  },
];

/* ── Flatten for fast lookup ── */
export const moduleMap: Record<string, NavItem> = {};
groups.forEach((g) => g.items.forEach((m) => (moduleMap[m.id] = m)));

/* ── Path → module id mapping ── */
export const pathToModuleId: Record<string, string> = {};
groups.forEach((g) => g.items.forEach((m) => (pathToModuleId[m.path] = m.id)));

/* ── Find group label for a module name ── */
export function crumbFor(name: string): string {
  return groups.find((g) => g.items.some((i) => i.name === name))?.label || '';
}

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { UserPlus, Trash2, Eye, EyeOff, Copy } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────
interface TeamMember {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  access: string;
  fixed?: boolean; // built-in accounts cannot be deleted
}

// ── Built-in fixed members (Dr. Waqar + Jahanzaib) ────────────────────────
const FIXED_MEMBERS: TeamMember[] = [
  {
    id: 'fixed-1',
    name: 'Dr. Waqar Bin Saif',
    email: 'drwaqar@pnp.org.pk',
    password: 'DrWaqar@PNP2024!',
    role: 'Leadership',
    access: 'Full + Leadership Panel',
    fixed: true,
  },
  {
    id: 'fixed-2',
    name: 'Jahanzaib',
    email: 'admin@pnp.org.pk',
    password: 'admin',
    role: 'IT Lead / Super Admin',
    access: 'Full (No Leadership Panel)',
    fixed: true,
  },
];

const ROLE_OPTIONS = ['Admin', 'Moderator', 'Analyst', 'IT Staff', 'Data Entry'];

const ROLE_ACCESS_MAP: Record<string, string> = {
  Admin:      'Full access (no leadership)',
  Moderator:  'Moderation + Complaints',
  Analyst:    'Read-only dashboards',
  'IT Staff': 'System + Settings',
  'Data Entry':'Portal data entry only',
};

const STORAGE_KEY = 'PNP_TEAM_MEMBERS';

export function Settings() {
  const [platformName, setPlatformName] = useState('Pakistan Naujawan Program');
  const [supportEmail, setSupportEmail] = useState('admin@pnp.org.pk');
  const [language, setLanguage] = useState('English');
  const [timezone, setTimezone] = useState('PKT (UTC+5)');

  // Toggle states
  const [toggles, setToggles] = useState({
    saathi: true, rozgar: true, problems: true, voice: true, kisaan: true, mahfooz: false
  });

  // Team members (custom, stored in localStorage)
  const [members, setMembers] = useState<TeamMember[]>([]);

  // Add Member modal
  const [showModal, setShowModal] = useState(false);
  const [newName,     setNewName]     = useState('');
  const [newEmail,    setNewEmail]    = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole,     setNewRole]     = useState('Moderator');
  const [showPass,    setShowPass]    = useState(false);
  const [visiblePassIds, setVisiblePassIds] = useState<Set<string>>(new Set());

  // ── Load from localStorage ─────────────────────────────────────────────
  useEffect(() => {
    const savedName = localStorage.getItem('PLATFORM_NAME');
    if (savedName) setPlatformName(savedName);
    const savedEmail = localStorage.getItem('SUPPORT_EMAIL');
    if (savedEmail) setSupportEmail(savedEmail);
    const savedLang = localStorage.getItem('DEFAULT_LANGUAGE');
    if (savedLang) setLanguage(savedLang);
    const savedTz = localStorage.getItem('TIMEZONE');
    if (savedTz) setTimezone(savedTz);
    const savedToggles = localStorage.getItem('PORTAL_TOGGLES');
    if (savedToggles) { try { setToggles(JSON.parse(savedToggles)); } catch (e) { console.error(e); } }
    const savedMembers = localStorage.getItem(STORAGE_KEY);
    if (savedMembers) { try { setMembers(JSON.parse(savedMembers)); } catch (e) { console.error(e); } }
  }, []);

  const persistMembers = (list: TeamMember[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setMembers(list);
  };

  const handleSave = () => {
    localStorage.setItem('PLATFORM_NAME', platformName);
    localStorage.setItem('SUPPORT_EMAIL', supportEmail);
    localStorage.setItem('DEFAULT_LANGUAGE', language);
    localStorage.setItem('TIMEZONE', timezone);
    localStorage.setItem('PORTAL_TOGGLES', JSON.stringify(toggles));
    toast.success('Settings saved successfully.');
  };

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem('PORTAL_TOGGLES', JSON.stringify(next));
      toast.success(`${key.toUpperCase()} ${next[key] ? 'enabled' : 'disabled'}.`);
      return next;
    });
  };

  // ── Add member ────────────────────────────────────────────────────────────
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim() || !newPassword.trim()) {
      toast.error('Please fill in all fields.');
      return;
    }
    const allEmails = [...FIXED_MEMBERS, ...members].map(m => m.email.toLowerCase());
    if (allEmails.includes(newEmail.toLowerCase())) {
      toast.error('This email is already in use.');
      return;
    }
    const member: TeamMember = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim(),
      password: newPassword.trim(),
      role: newRole,
      access: ROLE_ACCESS_MAP[newRole] ?? 'Limited access',
    };
    persistMembers([...members, member]);
    toast.success(`${member.name} added — they can now log in with their credentials.`);
    setNewName(''); setNewEmail(''); setNewPassword(''); setNewRole('Moderator');
    setShowModal(false);
  };

  // ── Remove member ─────────────────────────────────────────────────────────
  const handleRemove = (id: string) => {
    persistMembers(members.filter(m => m.id !== id));
    toast.success('Team member removed.');
  };

  // ── Copy to clipboard ─────────────────────────────────────────────────────
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => toast.success(`${label} copied!`));
  };

  // ── Toggle password visibility in table ──────────────────────────────────
  const togglePassVisibility = (id: string) => {
    setVisiblePassIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allMembers = [...FIXED_MEMBERS, ...members];

  // ── Toggle Button ──────────────────────────────────────────────────────────
  const ToggleSwitch = ({ id }: { id: keyof typeof toggles }) => (
    <button
      onClick={() => handleToggle(id)}
      style={{
        width: '38px', height: '20px', borderRadius: '10px', position: 'relative',
        cursor: 'pointer', border: '1px solid var(--line)',
        background: toggles[id] ? 'var(--moss)' : 'var(--line)', transition: 'background 0.2s'
      }}
    >
      <div style={{
        width: '14px', height: '14px', borderRadius: '50%', background: '#fff',
        position: 'absolute', top: '2px',
        left: toggles[id] ? '20px' : '2px', transition: 'left 0.2s'
      }} />
    </button>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="crumb">System</div>
      <div className="page-head">
        <div>
          <h1>Settings</h1>
          <p>Configure platform preferences, team access roles, and portal toggles.</p>
        </div>
        <button className="primary-btn" onClick={handleSave}>Save changes</button>
      </div>

      {/* ── Add Member Modal ─────────────────────────────────────────────── */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} onClick={() => setShowModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--paper-2)', borderRadius: '14px', padding: '28px',
              width: '420px', maxWidth: '95vw', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              border: '1px solid var(--line)',
            }}
          >
            <h3 style={{ margin: '0 0 6px', fontFamily: "'Fraunces', serif" }}>Add New Team Member</h3>
            <p style={{ fontSize: 13, color: 'var(--text-dim)', margin: '0 0 20px' }}>
              Set the login credentials that this person will use to access the admin portal.
            </p>
            <form onSubmit={handleAddMember} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="field">
                <label>Full Name</label>
                <input placeholder="e.g. Ali Hassan" value={newName} onChange={e => setNewName(e.target.value)} required />
              </div>
              <div className="field">
                <label>Email (Login ID)</label>
                <input type="email" placeholder="e.g. ali@pnp.org.pk" value={newEmail} onChange={e => setNewEmail(e.target.value)} required />
              </div>
              <div className="field">
                <label>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Set a strong password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                    style={{ width: '100%', paddingRight: 40 }}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{
                    position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)',
                    display: 'flex', alignItems: 'center',
                  }}>
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div className="field">
                <label>Role</label>
                <select value={newRole} onChange={e => setNewRole(e.target.value)}>
                  {ROLE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              {newRole && (
                <div style={{ fontSize: 12, color: 'var(--moss)', background: 'rgba(47,107,79,0.05)', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(47,107,79,0.1)' }}>
                  Access level: <b>{ROLE_ACCESS_MAP[newRole]}</b>
                </div>
              )}
              <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                <button type="button" className="ghost-btn" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="primary-btn" style={{ flex: 1, justifyContent: 'center' }}>
                  <UserPlus size={14} /> Add Member
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <div className="grid-2">
        {/* ── Portal Toggles ─────────────────────────────────────────────── */}
        <div className="panel">
          <div className="panel-head"><h3>Portal On/Off Switches</h3></div>
          <div style={{ padding: '0 18px 14px' }}>
            {[
              { id: 'saathi',   label: 'PNP Saathi Chatbot', sub: 'Main AI assistant' },
              { id: 'rozgar',   label: 'Rozgar Portal',      sub: 'Jobs and CV analyzer' },
              { id: 'problems', label: 'Problems Portal',    sub: 'Complaints and map' },
              { id: 'voice',    label: 'Naujawan Voice',     sub: 'Ideas and voting' },
              { id: 'kisaan',   label: 'Kisaan Portal',      sub: 'Farmer tools' },
              { id: 'mahfooz',  label: 'Mahfooz Safety',     sub: "Women's safety network" },
            ].map((item, i, arr) => (
              <div key={item.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none'
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{item.sub}</div>
                </div>
                <ToggleSwitch id={item.id as keyof typeof toggles} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Team Access Roles ──────────────────────────────────────────── */}
        <div className="panel">
          <div className="panel-head" style={{ justifyContent: 'space-between' }}>
            <h3>Team Access Roles</h3>
            <button className="primary-btn" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => setShowModal(true)}>
              <UserPlus size={13} /> Add Member
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Role</th>
                  <th>Access</th>
                  <th style={{ width: 40 }}></th>
                </tr>
              </thead>
              <tbody>
                {allMembers.map(m => (
                  <tr key={m.id}>
                    <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{m.name}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: 12 }}>{m.email}</span>
                        <button
                          title="Copy email"
                          onClick={() => copyToClipboard(m.email, 'Email')}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', padding: 2, display: 'flex' }}
                        >
                          <Copy size={11} />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: 12, fontFamily: 'monospace', letterSpacing: visiblePassIds.has(m.id) ? 0 : 2 }}>
                          {visiblePassIds.has(m.id) ? m.password : '••••••••'}
                        </span>
                        <button
                          title={visiblePassIds.has(m.id) ? 'Hide' : 'Show'}
                          onClick={() => togglePassVisibility(m.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', padding: 2, display: 'flex' }}
                        >
                          {visiblePassIds.has(m.id) ? <EyeOff size={11} /> : <Eye size={11} />}
                        </button>
                        <button
                          title="Copy password"
                          onClick={() => copyToClipboard(m.password, 'Password')}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', padding: 2, display: 'flex' }}
                        >
                          <Copy size={11} />
                        </button>
                      </div>
                    </td>
                    <td>
                      <span className="sb-badge-green" style={{ color: m.fixed ? 'var(--gold)' : 'var(--moss)', whiteSpace: 'nowrap', fontSize: 11 }}>
                        {m.role}
                      </span>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>{m.access}</td>
                    <td>
                      {!m.fixed && (
                        <button
                          title="Remove member"
                          onClick={() => handleRemove(m.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--clay)', padding: 4, display: 'flex', borderRadius: 4 }}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {members.length === 0 && (
            <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text-dim)', fontSize: 12 }}>
              No custom members added yet. Click "Add Member" to create credentials.
            </div>
          )}
        </div>
      </div>

      {/* ── General Settings ──────────────────────────────────────────────── */}
      <div className="panel" style={{ marginTop: 20 }}>
        <div className="panel-head"><h3>General Settings</h3></div>
        <div className="form-grid">
          <div className="field">
            <label>Platform name</label>
            <input value={platformName} onChange={e => setPlatformName(e.target.value)} />
          </div>
          <div className="field">
            <label>Support email</label>
            <input value={supportEmail} onChange={e => setSupportEmail(e.target.value)} />
          </div>
          <div className="field">
            <label>Default language</label>
            <select value={language} onChange={e => setLanguage(e.target.value)}>
              <option value="English">English</option>
              <option value="Urdu">Urdu</option>
            </select>
          </div>
          <div className="field">
            <label>Time zone</label>
            <select value={timezone} onChange={e => setTimezone(e.target.value)}>
              <option value="PKT (UTC+5)">PKT (UTC+5)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

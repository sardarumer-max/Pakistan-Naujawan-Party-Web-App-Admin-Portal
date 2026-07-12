import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export function Settings() {
  const [platformName, setPlatformName] = useState('Pakistan Naujawan Program');
  const [supportEmail, setSupportEmail] = useState('admin@pnp.org.pk');
  const [language, setLanguage] = useState('English');
  const [timezone, setTimezone] = useState('PKT (UTC+5)');
  
  // Toggle states
  const [toggles, setToggles] = useState({
    saathi: true,
    rozgar: true,
    problems: true,
    voice: true,
    kisaan: true,
    mahfooz: false
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedPlatformName = localStorage.getItem('PLATFORM_NAME');
    if (savedPlatformName) setPlatformName(savedPlatformName);

    const savedSupportEmail = localStorage.getItem('SUPPORT_EMAIL');
    if (savedSupportEmail) setSupportEmail(savedSupportEmail);

    const savedLanguage = localStorage.getItem('DEFAULT_LANGUAGE');
    if (savedLanguage) setLanguage(savedLanguage);

    const savedTimezone = localStorage.getItem('TIMEZONE');
    if (savedTimezone) setTimezone(savedTimezone);

    // Load toggles
    const savedToggles = localStorage.getItem('PORTAL_TOGGLES');
    if (savedToggles) {
      try {
        setToggles(JSON.parse(savedToggles));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

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
      toast.success(`${key.toUpperCase()} state toggled`);
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="crumb">System</div>
      <div className="page-head">
        <div>
          <h1>Settings</h1>
          <p>Configure platform preferences, roles, and toggles.</p>
        </div>
        <button className="primary-btn" onClick={handleSave}>
          Save changes
        </button>
      </div>

      {/* Grid 2 from prototype layout */}
      <div className="grid-2">
        {/* Portal On/Off Switches */}
        <div className="panel">
          <div className="panel-head">
            <h3>Portal On/Off Switches</h3>
          </div>
          <div style={{ padding: '0 18px 14px' }}>
            <div className="toggle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>PNP Saathi Chatbot</div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Main AI assistant</div>
              </div>
              <button 
                onClick={() => handleToggle('saathi')}
                style={{
                  width: '38px', height: '20px', borderRadius: '10px', position: 'relative', cursor: 'pointer', border: '1px solid var(--line)',
                  background: toggles.saathi ? 'var(--moss)' : 'var(--line)', transition: 'background 0.2s'
                }}
              >
                <div style={{
                  width: '14px', height: '14px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px',
                  left: toggles.saathi ? '20px' : '2px', transition: 'left 0.2s'
                }}></div>
              </button>
            </div>

            <div className="toggle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>Rozgar Portal</div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Jobs and CV analyzer</div>
              </div>
              <button 
                onClick={() => handleToggle('rozgar')}
                style={{
                  width: '38px', height: '20px', borderRadius: '10px', position: 'relative', cursor: 'pointer', border: '1px solid var(--line)',
                  background: toggles.rozgar ? 'var(--moss)' : 'var(--line)', transition: 'background 0.2s'
                }}
              >
                <div style={{
                  width: '14px', height: '14px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px',
                  left: toggles.rozgar ? '20px' : '2px', transition: 'left 0.2s'
                }}></div>
              </button>
            </div>

            <div className="toggle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>Problems Portal</div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Complaints and map</div>
              </div>
              <button 
                onClick={() => handleToggle('problems')}
                style={{
                  width: '38px', height: '20px', borderRadius: '10px', position: 'relative', cursor: 'pointer', border: '1px solid var(--line)',
                  background: toggles.problems ? 'var(--moss)' : 'var(--line)', transition: 'background 0.2s'
                }}
              >
                <div style={{
                  width: '14px', height: '14px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px',
                  left: toggles.problems ? '20px' : '2px', transition: 'left 0.2s'
                }}></div>
              </button>
            </div>

            <div className="toggle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>Naujawan Voice</div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Ideas and voting</div>
              </div>
              <button 
                onClick={() => handleToggle('voice')}
                style={{
                  width: '38px', height: '20px', borderRadius: '10px', position: 'relative', cursor: 'pointer', border: '1px solid var(--line)',
                  background: toggles.voice ? 'var(--moss)' : 'var(--line)', transition: 'background 0.2s'
                }}
              >
                <div style={{
                  width: '14px', height: '14px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px',
                  left: toggles.voice ? '20px' : '2px', transition: 'left 0.2s'
                }}></div>
              </button>
            </div>

            <div className="toggle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>Kisaan Portal</div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Farmer tools</div>
              </div>
              <button 
                onClick={() => handleToggle('kisaan')}
                style={{
                  width: '38px', height: '20px', borderRadius: '10px', position: 'relative', cursor: 'pointer', border: '1px solid var(--line)',
                  background: toggles.kisaan ? 'var(--moss)' : 'var(--line)', transition: 'background 0.2s'
                }}
              >
                <div style={{
                  width: '14px', height: '14px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px',
                  left: toggles.kisaan ? '20px' : '2px', transition: 'left 0.2s'
                }}></div>
              </button>
            </div>

            <div className="toggle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: 'none' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>Mahfooz Safety</div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Women's safety network</div>
              </div>
              <button 
                onClick={() => handleToggle('mahfooz')}
                style={{
                  width: '38px', height: '20px', borderRadius: '10px', position: 'relative', cursor: 'pointer', border: '1px solid var(--line)',
                  background: toggles.mahfooz ? 'var(--moss)' : 'var(--line)', transition: 'background 0.2s'
                }}
              >
                <div style={{
                  width: '14px', height: '14px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px',
                  left: toggles.mahfooz ? '20px' : '2px', transition: 'left 0.2s'
                }}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Team Access Roles */}
        <div className="panel">
          <div className="panel-head" style={{ justifyContent: 'space-between' }}>
            <h3>Team Access Roles</h3>
            <button className="primary-btn" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => toast.info('Adding team member')}>+ Add Member</button>
          </div>
          <div style={{ padding: '0 18px 14px' }}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Access</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>Dr. Waqar Bin Saif</td>
                  <td><span className="sb-badge-green" style={{ color: 'var(--gold)' }}>Super Admin</span></td>
                  <td style={{ color: 'var(--moss)', fontWeight: 600 }}>Full + Leadership</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Jahanzaib</td>
                  <td><span className="sb-badge-green" style={{ color: 'var(--gold)' }}>IT Lead</span></td>
                  <td style={{ color: 'var(--moss)', fontWeight: 600 }}>Full (no leadership)</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Moderator 1</td>
                  <td><span className="sb-badge-count" style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--text-dim)', border: '1px solid var(--line)' }}>Moderator</span></td>
                  <td style={{ color: 'var(--text-dim)' }}>Moderation + Complaints</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Analyst 1</td>
                  <td><span className="sb-badge-count" style={{ background: 'rgba(47, 107, 79, 0.1)', color: 'var(--moss)', border: '1px solid rgba(47, 107, 79, 0.2)' }}>Analyst</span></td>
                  <td style={{ color: 'var(--text-dim)' }}>Read-only dashboards</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <div className="panel-head">
          <h3>General Settings</h3>
        </div>
        <div className="form-grid">
          <div className="field">
            <label>Platform name</label>
            <input value={platformName} onChange={(e) => setPlatformName(e.target.value)} />
          </div>
          <div className="field">
            <label>Support email</label>
            <input value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
          </div>
          <div className="field">
            <label>Default language</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="English">English</option>
              <option value="Urdu">Urdu</option>
            </select>
          </div>
          <div className="field">
            <label>Time zone</label>
            <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
              <option value="PKT (UTC+5)">PKT (UTC+5)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { 
  Crown, 
  Newspaper, 
  Megaphone, 
  Sliders, 
  Send, 
  RefreshCw, 
  AlertTriangle
} from 'lucide-react';

export function Leadership() {
  const [activeTab, setActiveTab] = useState<'intel' | 'budget' | 'simulator' | 'broadcast'>('intel');
  
  // Simulation states
  const [saathiFund, setSaathiFund] = useState(500000);
  const [rozgarPlacement, setRozgarPlacement] = useState(72);
  const [youthEngagement, setYouthEngagement] = useState(65);
  const [simResults, setSimResults] = useState({
    voteShare: 64,
    sentiment: 'Positive',
    riskLevel: 'Low'
  });
  const [isSimulating, setIsSimulating] = useState(false);

  // Broadcast states
  const [broadcastTarget, setBroadcastTarget] = useState('All Admins');
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastContent, setBroadcastContent] = useState('');
  const [previousBroadcasts, setPreviousBroadcasts] = useState([
    {
      id: 1,
      title: 'Review Priority Level 1 Complaints',
      target: 'Moderators',
      time: '3 hours ago',
      content: 'Ensure all water crisis complaints in Karachi are forwarded within 12 hours.'
    },
    {
      id: 2,
      title: 'Voter Registration Campaign Launch',
      target: 'All Admins',
      time: '2 days ago',
      content: 'IT Lead must integrate the new voter dashboard before next week.'
    }
  ]);

  // Budget states
  const [portalBudgets, setPortalBudgets] = useState([
    { id: 'saathi', name: 'Saathi Chatbot', budget: 1200000, status: 'Approved', priority: 'High' },
    { id: 'rozgar', name: 'Rozgar Jobs', budget: 1800000, status: 'Approved', priority: 'Critical' },
    { id: 'problems', name: 'Problems & Map', budget: 950000, status: 'Pending Review', priority: 'High' },
    { id: 'voice', name: 'Naujawan Voice', budget: 600000, status: 'Approved', priority: 'Medium' },
    { id: 'kisaan', name: 'Kisaan Portal', budget: 1500000, status: 'Pending Review', priority: 'High' }
  ]);

  // Media statement generator states
  const [selectedNews, setSelectedNews] = useState<string | null>(null);
  const [generatedStatement, setGeneratedStatement] = useState('');
  const [isGeneratingStatement, setIsGeneratingStatement] = useState(false);

  // Run Simulation
  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      // Calculate hypothetical vote share based on metrics
      const baseShare = 50;
      const saathiBonus = saathiFund > 800000 ? 5 : 2;
      const placementBonus = (rozgarPlacement - 50) * 0.3;
      const engagementBonus = (youthEngagement - 50) * 0.4;
      const finalShare = Math.min(92, Math.max(35, Math.round(baseShare + saathiBonus + placementBonus + engagementBonus)));
      
      let newSentiment = 'Neutral';
      if (finalShare > 68) newSentiment = 'Highly Positive';
      else if (finalShare > 58) newSentiment = 'Positive';
      
      let newRisk = 'Low';
      if (youthEngagement < 45 || rozgarPlacement < 40) newRisk = 'High';
      else if (youthEngagement < 55) newRisk = 'Medium';

      setSimResults({
        voteShare: finalShare,
        sentiment: newSentiment,
        riskLevel: newRisk
      });
      setIsSimulating(false);
      toast.success('Campaign strategy simulation complete.');
    }, 1200);
  };

  // Broadcast Message
  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastContent) {
      toast.error('Please fill in all broadcast fields.');
      return;
    }

    const newBroadcast = {
      id: Date.now(),
      title: broadcastTitle,
      target: broadcastTarget,
      time: 'Just now',
      content: broadcastContent
    };

    setPreviousBroadcasts([newBroadcast, ...previousBroadcasts]);
    setBroadcastTitle('');
    setBroadcastContent('');
    toast.success(`Executive announcement successfully broadcast to ${broadcastTarget}.`);
  };

  // Handle Budget Changes
  const handleUpdateBudget = (id: string, amount: number) => {
    setPortalBudgets(prev => prev.map(p => p.id === id ? { ...p, budget: amount } : p));
  };

  const handleApproveBudget = (id: string) => {
    setPortalBudgets(prev => prev.map(p => p.id === id ? { ...p, status: 'Approved' } : p));
    toast.success('Budget approved.');
  };

  // Generate Media Response
  const generateResponse = (newsTitle: string) => {
    setIsGeneratingStatement(true);
    setSelectedNews(newsTitle);
    setTimeout(() => {
      setGeneratedStatement(
        `Official Statement: "The Pakistan Naujawan Party stands firm on scientific empowerment. Critics who label our Kisaan Portal data as '${
          newsTitle.includes('PTI') ? 'unverified' : 'obsolete'
        }' fail to understand our decentralized telemetry network that helps farmers double their yields. We welcome transparent audits."`
      );
      setIsGeneratingStatement(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="crumb">Executive Command</div>
      <div className="page-head">
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Dr. Waqar Bin Saif Panel
            <span style={{ fontSize: '11px', background: 'var(--gold)', color: 'var(--ink)', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
              EXECUTIVE COMMAND
            </span>
          </h1>
          <p>Strategic command center for simulations, budget authorization, and directive broadcasting.</p>
        </div>
      </div>

      <div style={{
        background: 'rgba(201, 147, 44, 0.08)',
        border: '1px solid rgba(201, 147, 44, 0.2)',
        borderLeft: '4px solid var(--gold)',
        padding: '12px 16px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderRadius: '0 8px 8px 0'
      }}>
        <span style={{ color: 'var(--gold)' }}><Crown size={20} /></span>
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '2px' }}>
            Private Leadership Sandbox
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
            This interface is only accessible via the executive credentials. All actions are securely encrypted.
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--line)', paddingBottom: '10px' }}>
        <button 
          onClick={() => setActiveTab('intel')}
          className={`filter-btn ${activeTab === 'intel' ? 'active-filter' : ''}`}
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          Strategic Intelligence
        </button>
        <button 
          onClick={() => setActiveTab('budget')}
          className={`filter-btn ${activeTab === 'budget' ? 'active-filter' : ''}`}
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          Budget Authorization
        </button>
        <button 
          onClick={() => setActiveTab('simulator')}
          className={`filter-btn ${activeTab === 'simulator' ? 'active-filter' : ''}`}
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          Campaign Strategy Simulator
        </button>
        <button 
          onClick={() => setActiveTab('broadcast')}
          className={`filter-btn ${activeTab === 'broadcast' ? 'active-filter' : ''}`}
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          Executive Directives
        </button>
      </div>

      {/* Content Tabs */}
      {activeTab === 'intel' && (
        <div className="grid-2">
          {/* Monthly Policy Brief */}
          <div className="panel">
            <div className="panel-head" style={{ justifyContent: 'space-between' }}>
              <h3>Monthly Policy Brief — AI Generated</h3>
              <button className="primary-btn" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => toast.success('Policy brief downloaded')}>Download PDF →</button>
            </div>
            <div style={{ padding: '14px' }}>
              <div style={{
                padding: '12px',
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: '8px',
                fontSize: '13px',
                color: 'var(--text)',
                lineHeight: '1.8',
                marginBottom: '14px'
              }}>
                <div style={{ fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--moss)', fontWeight: 700, marginBottom: '6px' }}>
                  June 2025 Summary
                </div>
                Top issues this month: Water shortage (847 complaints, 60% Karachi), Electricity outages (523, Punjab), Hospital staff absence (312, KPK).<br /><br />
                Top ideas by votes: Corruption tracker (2,744 votes), AI in BHUs (1,891), Free hospital WiFi (3,290 — winner).
              </div>
              <button className="primary-btn" style={{ width: '100%' }} onClick={() => toast.info('Generating brief...')}>Generate July Brief →</button>
            </div>
          </div>

          {/* Opposition Sentiment & Response Generator */}
          <div className="panel">
            <div className="panel-head" style={{ justifyContent: 'space-between' }}>
              <h3>Opposition Monitor & Media Generator</h3>
              <button className="ghost-btn" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => toast.success('Feed refreshed')}>Refresh →</button>
            </div>
            <div style={{ padding: '18px 18px 14px' }}>
              <div className="feed-item" style={{ display: 'flex', gap: '10px', paddingBottom: '12px', borderBottom: '1px solid var(--line)' }}>
                <div style={{ background: 'rgba(168, 69, 47, 0.1)', color: '#a8452f', padding: '8px', borderRadius: '6px', height: 'fit-content' }}>
                  <Newspaper size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '13px' }}>PTI attacked PNP Kisaan Portal</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Called data "unverified" on Twitter · 2,400 engagements</div>
                  <button className="ghost-btn" style={{ fontSize: '10px', padding: '2px 8px', marginTop: '6px' }} onClick={() => generateResponse('PTI attacked PNP Kisaan Portal')}>
                    Generate Response Statement
                  </button>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>3h ago</div>
              </div>

              <div className="feed-item" style={{ display: 'flex', gap: '10px', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
                <div style={{ background: 'rgba(201, 147, 44, 0.1)', color: 'var(--gold)', padding: '8px', borderRadius: '6px', height: 'fit-content' }}>
                  <Megaphone size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '13px' }}>PMLN launched competing jobs portal</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>No AI features · limited to Punjab</div>
                  <button className="ghost-btn" style={{ fontSize: '10px', padding: '2px 8px', marginTop: '6px' }} onClick={() => generateResponse('PMLN launched competing jobs portal')}>
                    Generate Response Statement
                  </button>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>1d ago</div>
              </div>

              {selectedNews && (
                <div style={{ marginTop: '14px', padding: '12px', background: 'rgba(47, 107, 79, 0.05)', border: '1px solid rgba(47, 107, 79, 0.1)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--moss)', fontWeight: 600, marginBottom: '4px' }}>Generated Response Brief:</div>
                  {isGeneratingStatement ? (
                    <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Drafting statement...</div>
                  ) : (
                    <>
                      <div style={{ fontSize: '12px', fontStyle: 'italic', color: 'var(--text)' }}>{generatedStatement}</div>
                      <button className="primary-btn" style={{ fontSize: '10px', padding: '4px 10px', marginTop: '8px' }} onClick={() => toast.success('Statement copied to clipboard')}>
                        Copy Statement
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'budget' && (
        <div className="panel">
          <div className="panel-head">
            <h3>Portal Budget Authorization</h3>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Portal / System</th>
                  <th>Priority</th>
                  <th>Current Funding (PKR)</th>
                  <th>Status</th>
                  <th style={{ width: '10px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {portalBudgets.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 600 }}>{p.name}</td>
                    <td>
                      <span className={`pill ${p.priority === 'Critical' ? 'rejected' : p.priority === 'High' ? 'pending' : 'active'}`}>
                        {p.priority}
                      </span>
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={p.budget} 
                        onChange={(e) => handleUpdateBudget(p.id, parseInt(e.target.value) || 0)}
                        style={{ padding: '4px 8px', width: '140px', borderRadius: '4px', border: '1px solid var(--line)', fontSize: '13px' }}
                      />
                    </td>
                    <td>
                      <span className={`pill ${p.status === 'Approved' ? 'active' : 'pending'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <div className="row-actions">
                        {p.status !== 'Approved' && (
                          <button 
                            className="primary-btn" 
                            style={{ fontSize: '11px', padding: '3px 8px', background: 'var(--moss)' }}
                            onClick={() => handleApproveBudget(p.id)}
                          >
                            Approve
                          </button>
                        )}
                        <button 
                          className="ghost-btn" 
                          style={{ fontSize: '11px', padding: '3px 8px' }}
                          onClick={() => toast.success('Budget saved successfully.')}
                        >
                          Save
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'simulator' && (
        <div className="grid-2">
          {/* Controls */}
          <div className="panel">
            <div className="panel-head">
              <h3>Simulation Controls</h3>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="field">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
                  <label>Saathi Chatbot AI Budget (PKR)</label>
                  <span>{saathiFund.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="200000" 
                  max="2000000" 
                  step="50000" 
                  value={saathiFund} 
                  onChange={(e) => setSaathiFund(parseInt(e.target.value))} 
                />
              </div>

              <div className="field">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
                  <label>Target Job Placement Success Rate</label>
                  <span>{rozgarPlacement}%</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="95" 
                  value={rozgarPlacement} 
                  onChange={(e) => setRozgarPlacement(parseInt(e.target.value))} 
                />
              </div>

              <div className="field">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
                  <label>Youth Outreach Campaign Strength</label>
                  <span>{youthEngagement}%</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="100" 
                  value={youthEngagement} 
                  onChange={(e) => setYouthEngagement(parseInt(e.target.value))} 
                />
              </div>

              <button 
                className="primary-btn" 
                style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                onClick={handleRunSimulation}
                disabled={isSimulating}
              >
                {isSimulating ? (
                  <>
                    <RefreshCw size={16} className="spin" />
                    Running Strategy Simulation...
                  </>
                ) : (
                  <>
                    <Sliders size={16} />
                    Run Campaign Strategy Simulation
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="panel-head">
              <h3>Simulation Projections</h3>
            </div>
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ background: 'var(--paper)', padding: '16px', borderRadius: '8px', border: '1px solid var(--line)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 600 }}>Projected Youth Vote</div>
                  <div style={{ fontSize: '32px', fontFamily: "'Fraunces', serif", fontWeight: 'bold', color: 'var(--moss)', marginTop: '6px' }}>
                    {simResults.voteShare}%
                  </div>
                </div>

                <div style={{ background: 'var(--paper)', padding: '16px', borderRadius: '8px', border: '1px solid var(--line)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 600 }}>Predicted Sentiment</div>
                  <div style={{ fontSize: '20px', fontFamily: "'Fraunces', serif", fontWeight: 'bold', color: 'var(--gold)', marginTop: '14px' }}>
                    {simResults.sentiment}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(168, 69, 47, 0.05)', border: '1px solid rgba(168, 69, 47, 0.1)', padding: '12px', borderRadius: '8px' }}>
                <AlertTriangle size={18} style={{ color: 'var(--clay)' }} />
                <div style={{ fontSize: '12px' }}>
                  <b>Political Risk Assessment:</b> Strategy indicates a <b>{simResults.riskLevel}</b> volatility level. Opposition counter-campaign threshold is manageable.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'broadcast' && (
        <div className="grid-2">
          {/* Send Directive */}
          <div className="panel">
            <div className="panel-head">
              <h3>Issue Executive Directive</h3>
            </div>
            <form onSubmit={handleBroadcast} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="field">
                <label>Target Group</label>
                <select value={broadcastTarget} onChange={(e) => setBroadcastTarget(e.target.value)}>
                  <option value="All Admins">All Admins</option>
                  <option value="Moderators">Moderators Only</option>
                  <option value="IT Lead & Staff">IT Lead & Staff</option>
                </select>
              </div>

              <div className="field">
                <label>Directive Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Prioritize Rozgar Portal Verification" 
                  value={broadcastTitle} 
                  onChange={(e) => setBroadcastTitle(e.target.value)} 
                  required
                />
              </div>

              <div className="field">
                <label>Directive Details / Orders</label>
                <textarea 
                  rows={4} 
                  placeholder="Type the instructions here..." 
                  value={broadcastContent} 
                  onChange={(e) => setBroadcastContent(e.target.value)} 
                  required
                  style={{ resize: 'none' }}
                />
              </div>

              <button type="submit" className="primary-btn" style={{ justifyContent: 'center' }}>
                <Send size={15} />
                Broadcast Announcement
              </button>
            </form>
          </div>

          {/* Past Broadcasts */}
          <div className="panel">
            <div className="panel-head">
              <h3>Active Directives Log</h3>
            </div>
            <div style={{ padding: '18px 18px 14px' }}>
              {previousBroadcasts.map((b) => (
                <div key={b.id} style={{ paddingBottom: '14px', marginBottom: '14px', borderBottom: '1px solid var(--line)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: '13.5px', color: 'var(--ink)' }}>{b.title}</h4>
                    <span style={{ fontSize: '10px', background: 'rgba(0,0,0,0.05)', padding: '2px 8px', borderRadius: '10px', color: 'var(--text-dim)' }}>
                      {b.target}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text)', marginTop: '6px' }}>{b.content}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px' }}>{b.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

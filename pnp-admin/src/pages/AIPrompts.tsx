import { motion } from 'framer-motion';
import { toast } from 'sonner';

export function AIPrompts() {
  const handleSave = (title: string) => {
    toast.success(`${title} updated successfully`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="crumb">AI & Moderation</div>
      <div className="page-head">
        <div>
          <h1>AI Prompt Manager</h1>
          <p>Configure instructions and system prompts for the edge LLM functions.</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <div className="panel-head" style={{ justifyContent: 'space-between' }}>
            <h3>Saathi Chatbot Prompt</h3>
            <button className="primary-btn" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => handleSave('Saathi Chatbot Prompt')}>Save Changes</button>
          </div>
          <div style={{ padding: '14px' }}>
            <div className="prompt-box" contentEditable="true" suppressContentEditableWarning>
              You are PNP Saathi, the official AI assistant of Pakistan Naujawan Party. Help citizens with jobs, farming, complaints, legal rights. Always reply in the same language the user writes in. Be warm, simple, and concise — max 4-5 sentences.
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <button className="primary-btn" style={{ flex: 1, fontSize: '12px' }} onClick={() => toast.info('Response testing started')}>Test Response →</button>
              <button className="ghost-btn" style={{ flex: 1, fontSize: '12px' }} onClick={() => toast.success('Reset to default')}>Reset Default</button>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head" style={{ justifyContent: 'space-between' }}>
            <h3>Complaint Writer Prompt</h3>
            <button className="primary-btn" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => handleSave('Complaint Writer Prompt')}>Save Changes</button>
          </div>
          <div style={{ padding: '14px' }}>
            <div className="prompt-box" contentEditable="true" suppressContentEditableWarning>
              Convert casual citizen complaints into formal Urdu government letters. Include: complaint number, date, specific demand, relevant law reference. Address to the correct department. Keep tone respectful but firm.
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <button className="primary-btn" style={{ flex: 1, fontSize: '12px' }} onClick={() => toast.info('Response testing started')}>Test Response →</button>
              <button className="ghost-btn" style={{ flex: 1, fontSize: '12px' }} onClick={() => toast.success('Reset to default')}>Reset Default</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <div className="panel-head" style={{ justifyContent: 'space-between' }}>
            <h3>Legal AI Prompt</h3>
            <button className="primary-btn" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => handleSave('Legal AI Prompt')}>Save Changes</button>
          </div>
          <div style={{ padding: '14px' }}>
            <div className="prompt-box" contentEditable="true" suppressContentEditableWarning>
              Answer Pakistani legal questions in plain Urdu. Reference actual laws (CrPC, PPC, labor laws). Give practical next steps. Never give advice beyond your knowledge — say so honestly.
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head" style={{ justifyContent: 'space-between' }}>
            <h3>Crop Disease AI Prompt</h3>
            <button className="primary-btn" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => handleSave('Crop Disease AI Prompt')}>Save Changes</button>
          </div>
          <div style={{ padding: '14px' }}>
            <div className="prompt-box" contentEditable="true" suppressContentEditableWarning>
              Analyze crop disease photos. Identify disease name, cause, treatment using locally available solutions in Pakistan. Write in plain Urdu. Always recommend consulting local agricultural officer for serious cases.
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

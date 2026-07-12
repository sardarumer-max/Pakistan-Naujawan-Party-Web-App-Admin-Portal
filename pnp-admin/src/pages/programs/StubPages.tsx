import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';

interface StubPortalProps {
  title: string;
  tag: string;
  color: string;
  desc: string;
  tableName: string;
}

export function StubPortalPage({ title, tag, color, desc, tableName }: StubPortalProps) {
  useOutletContext();
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="crumb">Programs</div>
      <div className="page-head">
        <div>
          <h1><span style={{ color }}>{tag}</span> · {title}</h1>
          <p>{desc}</p>
        </div>
      </div>
      <div className="panel">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 24px', color: 'var(--text-dim)', textAlign: 'center' }}>
          <Database size={40} strokeWidth={1.2} style={{ marginBottom: 14, opacity: 0.5 }} />
          <h3 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 600, color: 'var(--ink)', fontFamily: "'Fraunces', serif" }}>
            Table not configured
          </h3>
          <p style={{ margin: 0, fontSize: 13, maxWidth: 400 }}>
            The <code style={{ background: 'var(--paper)', padding: '2px 6px', borderRadius: 4 }}>{tableName}</code> table
            is not in the database schema yet. Once it's created in Supabase, this portal will automatically display live data.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* Specific stub pages */
export function SkillPage() {
  return <StubPortalPage title="Skill Pakistan" tag="SK" color="#c9932c" desc="Free and subsidised courses run through the Skill Pakistan initiative." tableName="courses" />;
}
export function MahfoozPage() {
  return <StubPortalPage title="Mahfooz" tag="MF" color="#a8452f" desc="Safety and harassment reports submitted through the Mahfooz protection line." tableName="safety_reports" />;
}
export function BusinessPage() {
  return <StubPortalPage title="Youth Business Hub" tag="YB" color="#c9932c" desc="Small businesses registered for mentorship and microloans." tableName="businesses" />;
}
export function TVPage() {
  return <StubPortalPage title="Naujawan TV" tag="TV" color="#c9932c" desc="Video content pending review before publishing." tableName="videos" />;
}
export function TransparencyPage() {
  return <StubPortalPage title="Transparency Hub" tag="TH" color="#2f6b4f" desc="Donations and public fund disbursements published for audit." tableName="transparency_reports" />;
}

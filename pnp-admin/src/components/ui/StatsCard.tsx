import type { StatsCard as StatsCardType } from '../../types';
import { motion } from 'framer-motion';

interface StatsCardProps {
  card: StatsCardType;
  index: number;
}

export function StatsCard({ card, index }: StatsCardProps) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: 'easeOut' }}
    >
      <div className="k">
        <span className="sw" style={{ background: card.color }} />
        {card.k}
      </div>
      <div className="v">{card.v}</div>
      <div className={`d ${card.down ? 'down' : ''}`}>{card.d}</div>
    </motion.div>
  );
}

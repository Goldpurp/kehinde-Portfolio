
import React from 'react';
import { motion } from 'framer-motion';

const itemReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const SectionHeader = ({ id, label, title, desc, centered = false }: { id?: string, label: string, title: React.ReactNode, desc?: string, centered?: boolean }) => (
  <motion.div variants={itemReveal} className={`mb-[clamp(2.5rem,8vh,5rem)] ${centered ? 'text-center mx-auto' : ''}`}>
    <div className={`flex items-center gap-3 text-[#808000] font-mono text-[clamp(0.65rem,1.5vw,0.8rem)] mb-4 ${centered ? 'justify-center' : ''}`}>
      {id && <span className="opacity-50">{id}.</span>}
      <div className="h-px w-8 bg-[#808000]/30" />
      <span className="tracking-[0.4em] uppercase font-black">{label}</span>
    </div>
    <h2 className="text-[clamp(1.85rem,6vw,4rem)] font-black text-white leading-[1.05] mb-6 tracking-tight italic">{title}</h2>
    {desc && <p className="text-white/50 text-[clamp(0.95rem,2vw,1.25rem)] max-w-3xl leading-relaxed font-medium italic">{desc}</p>}
  </motion.div>
);

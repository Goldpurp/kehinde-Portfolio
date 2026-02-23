
import React from 'react';
import { motion } from 'framer-motion';

export const SkillProgressBar = ({ name, level, label }: { name: string, level: number, label?: string }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-end">
      <div className="space-y-1">
        <span className="text-[clamp(0.6rem,1.5vw,0.7rem)] font-black uppercase tracking-[0.3em] text-white/20 italic">Competency</span>
        <h4 className="text-[clamp(1.125rem,2.5vw,1.5rem)] font-black text-white italic tracking-tight leading-none">{name}</h4>
      </div>
      <div className="text-right">
        <span className="text-[clamp(1.25rem,3.5vw,1.75rem)] font-black text-[#808000] italic leading-none">{label || `${level}%`}</span>
      </div>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="h-full bg-[#808000] relative z-10"
      />
      <div className="absolute inset-0 bg-white/5" />
    </div>
  </div>
);

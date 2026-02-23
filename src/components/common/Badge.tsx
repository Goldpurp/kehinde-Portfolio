
import React from 'react';

export const Badge = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
  <span className={`px-3 py-1 bg-[#808000]/10 rounded-lg text-[clamp(0.6rem,1.5vw,0.7rem)] font-black uppercase tracking-[0.2em] text-[#808000] border border-[#808000]/20 ${className}`}>
    {children}
  </span>
);

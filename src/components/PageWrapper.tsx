
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export const PageWrapper = ({ children, title, subtitle, number }: { children: React.ReactNode, title: string, subtitle?: string, number?: string }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#050505] pt-[clamp(6rem,15vh,12rem)] pb-20 px-[clamp(1rem,5vw,8rem)] relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-[#808000]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-[#808000]/3 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-[140rem] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-[clamp(3rem,8vh,6rem)] gap-8">
          <div className="space-y-6 max-w-4xl">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-4 text-[#808000]"
            >
              {number && <span className="text-xs font-mono font-black tracking-[0.5em]">{number}</span>}
              <div className="h-px w-12 bg-[#808000]/30" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em]">Perspective</span>
            </motion.div>
            <motion.h1 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.75rem,12vw,12rem)] font-black text-white italic leading-[0.8] tracking-[-0.05em]"
            >
              {title}
            </motion.h1>
          </div>
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:max-w-md"
            >
              <p className="text-[clamp(1.125rem,2.5vw,1.5rem)] text-white/40 font-medium italic leading-relaxed border-l-2 border-[#808000]/20 pl-6 md:pl-8">
                {subtitle}
              </p>
            </motion.div>
          )}
        </div>
        {children}
      </div>
    </motion.div>
  );
};

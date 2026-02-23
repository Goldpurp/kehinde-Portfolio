
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const Section = ({ children, id, className = "" }: { children?: React.ReactNode, id?: string, className?: string }) => {
  const sectionReveal = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1], staggerChildren: 0.1 } 
    }
  }), []);

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionReveal}
      className={`py-[clamp(3rem,10vh,12rem)] px-[clamp(1rem,5vw,8rem)] max-w-[140rem] mx-auto ${className}`}
    >
      {children}
    </motion.section>
  );
};

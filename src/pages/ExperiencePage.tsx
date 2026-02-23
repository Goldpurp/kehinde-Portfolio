
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IconArrowUpRight } from '@tabler/icons-react';
import { PageWrapper } from '../components/PageWrapper';
import { portfolioConfig } from '../store/portfolioData';

export const ExperiencePage = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper title="The Journey" subtitle="A professional timeline documenting the evolution of skills, responsibilities, and impact." number="04">
      <div className="space-y-12">
        {portfolioConfig.experience.map((exp, i) => (
          <motion.div 
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 md:p-16 bg-white/5 rounded-[3rem] md:rounded-[5rem] border border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 group hover:bg-white/[0.07] transition-all relative overflow-hidden cursor-pointer"
            onClick={() => navigate(`/experience/${exp.id}`)}
          >
            <div className="lg:col-span-3 space-y-4 md:space-y-6">
              <div className="text-4xl md:text-6xl font-black text-white/5 italic group-hover:text-[#808000]/20 transition-colors">0{i + 1}</div>
              <div className="space-y-2">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#808000]">{exp.period}</div>
                <h3 className="text-2xl md:text-4xl font-black text-white italic tracking-tighter">{exp.company}</h3>
              </div>
            </div>
            <div className="lg:col-span-9 space-y-6 md:space-y-8">
              <div className="flex justify-between items-start">
                <h4 className="text-[clamp(1.25rem,4vw,2.5rem)] font-black text-white italic tracking-tight">{exp.title}</h4>
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#808000] group-hover:border-[#808000] transition-all">
                  <IconArrowUpRight size={24} className="group-hover:text-white transition-colors" />
                </div>
              </div>
              <p className="text-white/50 text-[clamp(1rem,2.5vw,1.5rem)] leading-relaxed italic font-light max-w-4xl">{exp.desc}</p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {exp.tags.map(t => (
                  <span key={t} className="px-4 py-2 md:px-6 md:py-3 bg-white/5 rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/30 border border-white/5 group-hover:border-[#808000]/30 transition-all">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
};

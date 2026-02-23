
import React from 'react';
import { motion } from 'framer-motion';
import { IconLayout, IconServer, IconDatabase, IconSparkles, IconBolt, IconActivity } from '@tabler/icons-react';
import { PageWrapper } from '../components/PageWrapper';
import { SkillProgressBar } from '../components/common/SkillProgressBar';

export const SkillsPage = () => (
  <PageWrapper title="The Arsenal" subtitle="A comprehensive breakdown of technical competencies, architectural patterns, and modern workflows." number="03">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
      {[
        { 
          t: "Frontend", 
          d: "Building immersive, high-performance interfaces with a focus on motion and accessibility.",
          i: <IconLayout size={48} />, 
          s: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Redux", "Zustand", "Vite"] 
        },
        { 
          t: "Backend", 
          d: "Architecting robust, scalable server-side solutions using modern enterprise patterns.",
          i: <IconServer size={48} />, 
          s: ["C#", ".NET Core", "ASP.NET Web API", "Entity Framework", "Clean Architecture", "Node.js", "Express", "REST"] 
        },
        { 
          t: "Infrastructure", 
          d: "Managing data integrity and deployment pipelines for seamless product delivery.",
          i: <IconDatabase size={48} />, 
          s: ["PostgreSQL", "SQL Server", "Docker", "Git", "GitHub Actions", "Azure", "Redis", "Dapper"] 
        }
      ].map((cat, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="p-8 md:p-16 bg-white/5 rounded-[3rem] md:rounded-[4rem] border border-white/5 space-y-8 md:space-y-12 group hover:bg-white/[0.07] transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#808000]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="w-20 h-20 md:w-24 md:h-24 bg-white/5 rounded-3xl flex items-center justify-center text-[#808000] group-hover:bg-[#808000] group-hover:text-white transition-all shadow-inner">
            {cat.i}
          </div>
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter">{cat.t}</h3>
            <p className="text-white/40 text-base md:text-lg leading-relaxed italic">{cat.d}</p>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {cat.s.map(s => (
              <span key={s} className="px-4 py-2 md:px-6 md:py-3 bg-white/5 rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/30 border border-white/5 hover:border-[#808000]/30 hover:text-white transition-all">{s}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
    
    <div className="mt-20 md:mt-32 space-y-12 md:space-y-16">
      <div className="flex items-center gap-6">
        <div className="h-px w-12 md:w-20 bg-[#808000]" />
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-black text-white italic tracking-tighter">Core Proficiency</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
        <SkillProgressBar name="React & Ecosystem" level={95} />
        <SkillProgressBar name=".NET Core / C#" level={90} />
        <SkillProgressBar name="System Architecture" level={85} />
        <SkillProgressBar name="Database Design" level={88} />
        <SkillProgressBar name="AI-Assisted Workflow" level={98} />
        <SkillProgressBar name="Cloud Deployment" level={82} />
      </div>
    </div>

    <div className="mt-20 md:mt-32 p-10 md:p-20 bg-white/5 rounded-[3rem] md:rounded-[5rem] border border-white/5 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#808000]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
        <div className="space-y-6 md:space-y-8">
          <div className="flex items-center gap-4 text-[#808000]">
            <IconSparkles size={32} />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em]">Future-Proofing</span>
          </div>
          <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-black text-white italic leading-none tracking-tighter">AI-Augmented <br />Development</h2>
          <p className="text-white/40 text-[clamp(1rem,2vw,1.25rem)] leading-relaxed italic">
            I integrate Large Language Models into my daily workflow to optimize code quality, automate repetitive tasks, and accelerate the delivery of complex features.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {[
            { t: "Rapid Scaffolding", d: "Using AI to generate boilerplate and initial structures.", i: <IconBolt /> },
            { t: "Code Optimization", d: "Leveraging LLMs for refactoring and performance tuning.", i: <IconActivity /> },
            { t: "Technical Research", d: "Accelerating the discovery of new patterns and libraries.", i: <IconDatabase /> }
          ].map((item, i) => (
            <div key={i} className="flex gap-6 p-6 md:p-8 bg-white/5 rounded-3xl border border-white/5 group/item hover:bg-white/10 transition-all">
              <div className="text-[#808000]">{item.i}</div>
              <div>
                <div className="text-white font-black italic uppercase tracking-widest text-sm md:text-base mb-1">{item.t}</div>
                <div className="text-white/30 text-xs md:text-sm">{item.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PageWrapper>
);

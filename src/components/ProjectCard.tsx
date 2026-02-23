
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IconFolder, IconCode, IconExternalLink, IconArrowRight } from '@tabler/icons-react';

const itemReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const ProjectCard = ({ repo }: { repo: any, key?: React.Key }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      variants={itemReveal}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col group transition-all hover:bg-[#808000]/5 h-full relative z-10 cursor-pointer"
      onClick={() => navigate(`/project/${repo.name}`)}
    >
      <div className="flex justify-between items-start mb-6 md:mb-8">
        <div className="text-[#808000]"><IconFolder size={32} /></div>
        <div className="flex gap-4 text-white/20 group-hover:text-white/40 transition-colors">
          <motion.a whileHover={{ scale: 1.2, color: '#808000' }} href={repo.html_url} target="_blank" onClick={e => e.stopPropagation()}><IconCode size={20} /></motion.a>
          <motion.a whileHover={{ scale: 1.2, color: '#808000' }} href={repo.homepage || repo.html_url} target="_blank" onClick={e => e.stopPropagation()}><IconExternalLink size={20} /></motion.a>
        </div>
      </div>
      
      <h3 className="text-[clamp(1.125rem,2.5vw,1.5rem)] font-bold text-white mb-3 md:mb-4 italic tracking-tight">{repo.name}</h3>
      <p className="text-white/50 text-[clamp(0.75rem,1.5vw,0.875rem)] leading-relaxed mb-6 md:mb-10 transition-colors group-hover:text-white/60 line-clamp-3">
        {repo.description || "A comprehensive implementation focused on scalable architecture, automated testing, and modern cloud deployment standards."}
      </p>

      <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
        {(repo.topics?.length > 0 ? repo.topics : ["Project", "Development", "Software"]).slice(0, 3).map((tag: string) => (
          <span key={tag} className="px-2 py-0.5 bg-white/5 text-white/40 text-[9px] font-bold rounded uppercase tracking-wider">{tag}</span>
        ))}
      </div>

      <div className="mt-auto pt-6 flex justify-between items-center border-t border-white/5">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-medium text-white/30 uppercase tracking-widest font-mono">
          <span>{repo.language || "Code"}</span>
          {repo.stargazers_count > 0 && <span>★ {repo.stargazers_count}</span>}
        </div>
        <button className="text-[10px] font-black uppercase tracking-widest text-[#808000] flex items-center gap-1 group/btn">
          Details <IconArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

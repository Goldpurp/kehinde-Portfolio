
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IconChevronRight, IconBriefcase } from '@tabler/icons-react';
import { portfolioConfig } from '../store/portfolioData';

export const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const exp = portfolioConfig.experience.find(e => e.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!exp) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Experience not found</div>;

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      <div className="h-[40vh] md:h-[60vh] relative overflow-hidden flex items-end pb-12 md:pb-20 px-[clamp(1rem,5vw,8rem)]">
        <div className="absolute inset-0 bg-[#808000]/5 blur-[150px] translate-y-1/2" />
        <div className="max-w-[140rem] mx-auto w-full relative z-10">
          <button onClick={() => navigate(-1)} className="group flex items-center gap-4 text-[#808000] font-black uppercase tracking-[0.4em] text-[10px] mb-8 md:mb-12 hover:opacity-70 transition-all">
            <IconChevronRight className="rotate-180 group-hover:-translate-x-2 transition-transform" size={16} /> Back to Journey
          </button>
          <div className="space-y-6 md:space-y-8">
            <div className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 italic">{exp.period} // {exp.company}</div>
            <h1 className="text-[clamp(2rem,8vw,10rem)] font-black text-white italic leading-[0.9] tracking-tighter">{exp.title}</h1>
          </div>
        </div>
      </div>

      <div className="px-[clamp(1rem,5vw,8rem)] pb-20 md:pb-40">
        <div className="max-w-[140rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          <div className="lg:col-span-8 space-y-16 md:space-y-24">
            <section className="space-y-8 md:space-y-12">
              <div className="flex items-center gap-6">
                <div className="h-px w-12 md:w-20 bg-[#808000]" />
                <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-black text-white italic tracking-tighter">The Role</h2>
              </div>
              <p className="text-white/60 text-[clamp(1.25rem,3vw,2rem)] leading-relaxed font-light italic">
                {exp.desc}
              </p>
            </section>

            <section className="space-y-8 md:space-y-12">
              <div className="flex items-center gap-6">
                <div className="h-px w-12 md:w-20 bg-[#808000]" />
                <h2 className="text-2xl md:text-4xl font-black text-white italic tracking-tighter">Core Impact</h2>
              </div>
              <div className="grid grid-cols-1 gap-6 md:gap-8">
                {[
                  "Architected and implemented critical backend services using .NET Core and C#.",
                  "Collaborated with cross-functional teams to translate complex requirements into technical solutions.",
                  "Optimized frontend performance through advanced React patterns and efficient state management.",
                  "Mentored junior developers and participated in rigorous code review processes."
                ].map((impact, i) => (
                  <div key={i} className="flex items-start gap-6 md:gap-8 p-8 md:p-10 bg-white/5 rounded-[2rem] md:rounded-[3rem] border border-white/5 group hover:border-[#808000]/30 transition-all">
                    <div className="text-3xl md:text-4xl font-black text-[#808000]/20 italic group-hover:text-[#808000] transition-colors">0{i + 1}</div>
                    <p className="text-white/50 text-lg md:text-xl leading-relaxed italic font-medium">{impact}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-12">
            <div className="p-8 md:p-12 bg-white/5 rounded-[3rem] md:rounded-[4rem] border border-white/5 space-y-8 md:space-y-12 sticky top-32">
              <div className="space-y-6 md:space-y-8">
                <h3 className="text-xl md:text-2xl font-black text-white italic">Technical Stack</h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {exp.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 md:px-6 md:py-3 bg-white/5 rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/30 border border-white/5">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="pt-10 md:pt-12 border-t border-white/5">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-6 italic">Organization</div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center text-[#808000] shadow-inner"><IconBriefcase size={32} /></div>
                  <div>
                    <div className="text-white font-black italic text-lg md:text-xl">{exp.company}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Lagos, Nigeria</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

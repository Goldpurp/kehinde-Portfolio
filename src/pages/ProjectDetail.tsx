
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IconChevronRight, IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import { fetchRepoDetail } from '../store/portfolioData';

export const ProjectDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [repo, setRepo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (name) {
      fetchRepoDetail(name).then(data => {
        setRepo(data);
        setLoading(false);
      });
    }
  }, [name]);

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><div className="w-12 h-12 border-4 border-[#808000] border-t-transparent rounded-full animate-spin" /></div>;
  if (!repo) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Project not found</div>;

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Hero Header */}
      <div className="h-[50vh] md:h-[70vh] relative overflow-hidden flex items-end pb-12 md:pb-20 px-[clamp(1rem,5vw,8rem)]">
        <div className="absolute inset-0 bg-[#808000]/10 blur-[150px] -translate-y-1/2" />
        <div className="max-w-[140rem] mx-auto w-full relative z-10">
          <button onClick={() => navigate(-1)} className="group flex items-center gap-4 text-[#808000] font-black uppercase tracking-[0.4em] text-[10px] mb-8 md:mb-12 hover:opacity-70 transition-all">
            <IconChevronRight className="rotate-180 group-hover:-translate-x-2 transition-transform" size={16} /> Back to Archive
          </button>
          <div className="space-y-6 md:space-y-8">
            <div className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 italic">Case Study // {repo.language || "System"}</div>
            <h1 className="text-[clamp(2.5rem,8vw,12rem)] font-black text-white italic leading-[0.8] tracking-[-0.05em]">{repo.name}</h1>
          </div>
        </div>
      </div>

      <div className="px-[clamp(1rem,5vw,8rem)] pb-20 md:pb-40">
        <div className="max-w-[140rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          <div className="lg:col-span-8 space-y-20 md:space-y-32">
            <section className="space-y-8 md:space-y-12">
              <div className="flex items-center gap-6">
                <div className="h-px w-12 md:w-20 bg-[#808000]" />
                <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-black text-white italic tracking-tighter">The Brief</h2>
              </div>
              <p className="text-white/60 text-[clamp(1.25rem,3vw,2rem)] leading-relaxed font-light italic">
                {repo.description || "A comprehensive implementation focused on scalable architecture, automated testing, and modern cloud deployment standards."}
              </p>
            </section>

            <section className="space-y-8 md:space-y-12">
              <div className="flex items-center gap-6">
                <div className="h-px w-12 md:w-20 bg-[#808000]" />
                <h2 className="text-2xl md:text-4xl font-black text-white italic tracking-tighter">Technical Execution</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {[
                  { t: "Architecture", d: "Built with a focus on modularity and separation of concerns using modern design patterns." },
                  { t: "Performance", d: "Optimized for high-concurrency and low-latency response times across all endpoints." },
                  { t: "Security", d: "Implemented strict authentication and authorization protocols to ensure data integrity." },
                  { t: "Scalability", d: "Designed to handle horizontal scaling with ease through stateless service architecture." }
                ].map((item, i) => (
                  <div key={i} className="p-8 md:p-12 bg-white/5 rounded-[2rem] md:rounded-[3rem] border border-white/5 space-y-4">
                    <h4 className="text-white font-black italic text-lg md:text-xl">{item.t}</h4>
                    <p className="text-white/40 text-xs md:text-sm leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-12">
            <div className="p-8 md:p-12 bg-white/5 rounded-[3rem] md:rounded-[4rem] border border-white/5 space-y-8 md:space-y-12 sticky top-32">
              <div className="space-y-6 md:space-y-8">
                <h3 className="text-xl md:text-2xl font-black text-white italic">Artifact Details</h3>
                <div className="space-y-4 md:space-y-6">
                  {[
                    { l: "Language", v: repo.language || "N/A" },
                    { l: "Stars", v: repo.stargazers_count },
                    { l: "Forks", v: repo.forks_count },
                    { l: "License", v: repo.license?.name || "None" },
                    { l: "Status", v: "Production Ready" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{item.l}</span>
                      <span className="text-white font-bold italic text-sm md:text-base">{item.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <a href={repo.html_url} target="_blank" className="w-full py-4 md:py-6 bg-[#808000] rounded-2xl md:rounded-3xl text-white font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-4 shadow-2xl shadow-[#808000]/20 hover:opacity-90 transition-all italic">
                  <IconBrandGithub size={20} /> View Source
                </a>
                {repo.homepage && (
                  <a href={repo.homepage} target="_blank" className="w-full py-4 md:py-6 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl text-white/80 font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-4 hover:bg-white/10 transition-all italic">
                    <IconExternalLink size={20} /> Live Deployment
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

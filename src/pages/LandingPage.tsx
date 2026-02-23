
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  IconTerminal2, 
  IconCheck, 
  IconDownload, 
  IconCode, 
  IconHistory, 
  IconRocket, 
  IconBriefcase, 
  IconBrandReact, 
  IconBrandTypescript, 
  IconCpu, 
  IconDatabase, 
  IconLayout, 
  IconSparkles, 
  IconServer, 
  IconBolt, 
  IconActivity, 
  IconArrowRight, 
  IconChevronRight, 
  IconArrowUpRight, 
  IconMail, 
  IconMapPin, 
  IconBrandGithub, 
  IconBrandLinkedin, 
  IconBrandTwitter, 
  IconSend,
  IconFolder 
} from '@tabler/icons-react';
import { portfolioConfig, fetchRepos } from '../store/portfolioData';
import { Badge } from '../components/common/Badge';
import { Section } from '../components/common/Section';
import { SectionHeader } from '../components/common/SectionHeader';
import { SkillProgressBar } from '../components/common/SkillProgressBar';
import { ProjectCard } from '../components/ProjectCard';

const itemReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const LandingPage = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All Projects');
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchRepos().then(data => {
      setRepos(data.slice(0, 6));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filteredRepos = useMemo(() => {
    if (filter === 'All Projects') return repos;
    if (filter === 'Full Stack') return repos.filter(r => r.language === 'C#' || r.language === 'TypeScript');
    if (filter === 'Frontend') return repos.filter(r => r.language === 'TypeScript' || r.language === 'JavaScript' || r.language === 'CSS');
    if (filter === '.NET / C#') return repos.filter(r => r.language === 'C#');
    return repos;
  }, [repos, filter]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
        {/* HERO SECTION */}
        <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-[60vw] h-[60vw] bg-[#808000]/10 blur-[150px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-[40vw] h-[40vw] bg-[#808000]/5 blur-[120px] rounded-full" />
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#808000 1px, transparent 1px), linear-gradient(90deg, #808000 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>

          <div className="w-full px-[clamp(1rem,5vw,8rem)] max-w-[180rem] mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              
              {/* Left Content */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 space-y-12 text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-4 px-5 py-2.5 bg-[#808000]/10 border border-[#808000]/20 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#808000] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#808000]"></span>
                  </span>
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#808000]">Open for Freelance Projects</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black text-white leading-[0.85] tracking-[-0.06em] italic uppercase">
                    Engineering <br />
                    <span className="text-[#808000]">Digital</span> <br />
                    Excellence.
                  </h1>
                  <p className="text-[clamp(1rem,2vw,1.25rem)] text-white/40 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium italic border-l-2 border-[#808000]/20 pl-6">
                    I build high-performance, scalable web applications that bridge the gap between complex logic and intuitive design.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-8">
                  <button 
                    onClick={() => navigateTo('/contact')} 
                    className="group relative px-8 py-4.5 bg-[#808000] rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-3xl shadow-[#808000]/40 transition-all hover:scale-105 active:scale-95 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-3">Hire Me Now <IconArrowRight size={18} /></span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                  <button 
                    onClick={() => scrollTo('projects')} 
                    className="px-8 py-4.5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-white/80 hover:bg-white/10 transition-all active:scale-95 flex items-center gap-3"
                  >
                    View Portfolio <IconFolder size={18} />
                  </button>
                </div>

                <div className="pt-12 grid grid-cols-3 gap-8 border-t border-white/5 max-w-md mx-auto lg:mx-0">
                  {[
                    { l: "Success Rate", v: "100%" },
                    { l: "Projects", v: "25+" },
                    { l: "Experience", v: "4y+" }
                  ].map(stat => (
                    <div key={stat.l} className="space-y-1">
                      <div className="text-xl md:text-2xl font-black text-white italic">{stat.v}</div>
                      <div className="text-[9px] font-black uppercase tracking-widest text-white/20">{stat.l}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Visual - Interactive Terminal */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 hidden lg:block perspective-1000"
              >
                <div className="relative group">
                  {/* Decorative Glow */}
                  <div className="absolute -inset-4 bg-[#808000]/20 blur-3xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-4xl shadow-black/50 relative">
                    {/* Terminal Header */}
                    <div className="bg-white/5 px-8 py-5 flex items-center justify-between border-b border-white/5">
                      <div className="flex gap-2.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="flex items-center gap-2 text-[9px] font-mono text-white/30 uppercase tracking-[0.4em] font-black">
                        <IconTerminal2 size={12} /> RAZAQ_ENGINE_V4.0
                      </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-10 font-mono text-sm space-y-6 min-h-[400px]">
                      <div className="flex gap-4">
                        <span className="text-[#808000] font-bold">➜</span>
                        <span className="text-white/80">initialize_freelance_session --mode=expert</span>
                      </div>
                      <div className="space-y-2">
                        <div className="text-white/40 italic">// Loading core competencies...</div>
                        <div className="flex items-center gap-3">
                          <div className="h-1 w-32 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="h-full bg-[#808000]"
                            />
                          </div>
                          <span className="text-[#808000] text-[10px] font-bold uppercase">Ready</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="text-[#808000] font-bold mb-1">Frontend</div>
                          <div className="text-[10px] text-white/40 uppercase tracking-widest">React / Next.js</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="text-[#808000] font-bold mb-1">Backend</div>
                          <div className="text-[10px] text-white/40 uppercase tracking-widest">.NET / C#</div>
                        </div>
                      </div>
                      <div className="pt-6 space-y-4">
                        <div className="text-white/60 leading-relaxed">
                          <span className="text-[#808000]">const</span> availability = <span className="text-white">"IMMEDIATE"</span>;
                        </div>
                        <div className="text-white/60 leading-relaxed">
                          <span className="text-[#808000]">const</span> quality = <span className="text-white">"UNCOMPROMISED"</span>;
                        </div>
                        <motion.div 
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="w-2 h-5 bg-[#808000]"
                        />
                      </div>
                    </div>

                    {/* Terminal Footer */}
                    <div className="bg-white/5 px-8 py-4 flex items-center justify-between border-t border-white/5 text-[9px] font-mono text-white/20 uppercase tracking-widest">
                      <div>Status: Available</div>
                      <div className="flex items-center gap-2"><IconActivity size={12} /> 60 FPS</div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <Section id="about">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7 space-y-12">
              <SectionHeader label="Discover" title="About Me" />
              <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row gap-10 md:gap-12 items-start relative overflow-hidden group">
                <div className="w-40 h-48 md:w-48 md:h-56 bg-[#808000]/10 rounded-[2.5rem] flex-shrink-0 overflow-hidden shadow-2xl relative">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600" alt="Kehinde" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute bottom-4 right-4 bg-[#808000] rounded-full p-1.5 shadow-lg border-2 border-[#050505]"><IconCheck size={12} stroke={4} /></div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-[clamp(1.5rem,4vw,2.5rem)] font-black text-white italic leading-tight">Bridging Frontend <br />& Backend</h3>
                  <p className="text-white/60 leading-relaxed font-medium text-[clamp(1rem,2vw,1.125rem)]">
                    I am a <span className="text-[#808000] font-bold">Software Developer</span> with practical experience across front-end and back-end roles. I specialize in building user-focused interfaces and implementing robust backend logic.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <button className="px-6 py-3 bg-[#808000] rounded-xl text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2.5 shadow-xl shadow-[#808000]/20 hover:opacity-90 transition-all"><IconDownload size={18} /> Resume</button>
                    <button onClick={() => window.open(`https://github.com/${portfolioConfig.githubUsername}`)} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white flex items-center gap-2.5 transition-all"><IconCode size={18} /> GitHub</button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {l: "EXPERIENCE", v: "4+ Years", i: <IconHistory />}, 
                  {l: "PROJECTS", v: "15+", i: <IconRocket />}, 
                  {l: "VERSATILITY", v: "Full-Stack", i: <IconBriefcase />}
                ].map(s => (
                  <div key={s.l} className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] text-center space-y-4 group hover:bg-[#808000]/5 transition-all">
                    <div className="mx-auto w-12 h-12 bg-[#808000]/10 rounded-xl flex items-center justify-center text-[#808000] group-hover:bg-[#808000] group-hover:text-white transition-all shadow-inner">{s.i}</div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">{s.l}</div>
                    <div className="text-[clamp(1.5rem,3vw,2.25rem)] font-black text-white italic">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-5 space-y-12">
               <h3 className="text-xl md:text-2xl font-black text-white italic">Technical Arsenal</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                 {[
                   {n: "React", s: "Frontend UI", i: <IconBrandReact />},
                   {n: "TypeScript", s: "Type Safety", i: <IconBrandTypescript />},
                   {n: "C#", s: "Backend Logic", i: <IconTerminal2 />},
                   {n: ".NET", s: "Framework", i: <IconCpu />},
                   {n: "Tailwind CSS", s: "Styling", i: <IconLayout />},
                   {n: "PostgreSQL", s: "Data Storage", i: <IconDatabase />}
                 ].map(item => (
                   <div key={item.n} className="bg-white/5 border border-white/5 rounded-2xl p-6 flex items-center gap-6 group hover:border-[#808000]/40 transition-all">
                     <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#808000] group-hover:bg-[#808000] group-hover:text-white transition-all shadow-inner">{item.i}</div>
                     <div>
                        <div className="text-lg font-black text-white italic leading-tight">{item.n}</div>
                        <div className="text-[10px] text-white/40 font-black uppercase tracking-widest">{item.s}</div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </Section>

        {/* PROJECTS SECTION */}
        <Section id="projects">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10">
            <SectionHeader label="Portfolio" title="Some Things I've Built" desc="A curated collection of full-stack web applications and robust .NET core libraries." />
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
              {['All Projects', 'Full Stack', 'Frontend', '.NET / C#'].map(f => (
                <button 
                  key={f} 
                  onClick={() => setFilter(f)} 
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${filter === f ? 'bg-[#808000]/10 border-[#808000]/50 text-[#808000] shadow-xl shadow-[#808000]/5' : 'border-white/5 text-white/40 hover:text-white'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? Array(6).fill(0).map((_, i) => <div key={i} className="h-96 bg-white/5 rounded-3xl animate-pulse" />) : filteredRepos.map(repo => <ProjectCard key={repo.id} repo={repo} />)}
          </div>

          <div className="mt-16 flex justify-center">
            <button onClick={() => navigateTo('/projects')} className="px-10 py-5 border border-[#808000]/50 text-[#808000] rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#808000]/5 transition-all flex items-center gap-4 italic">
              View Full Project Archive <IconArrowRight size={20} />
            </button>
          </div>
        </Section>

        {/* EXPERIENCE SECTION */}
        <Section id="experience">
          <SectionHeader label="Career Path" title={<>Professional <span className="text-[#808000]">Experience</span></>} desc="A timeline of my journey as a full-stack engineer, building scalable solutions across various industries." />
          <div className="relative space-y-12 md:space-y-16">
            <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-white/5 hidden md:block" />
            
            {portfolioConfig.experience.map((exp, idx) => (
              <motion.div 
                key={exp.id} 
                variants={itemReveal}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-[#050505] border border-white/10 rounded-full items-center justify-center text-[#808000] z-10 shadow-xl">
                  {idx === 0 ? <IconChevronRight size={20} className="rotate-270" /> : idx === 1 ? <IconHistory size={20} /> : <IconBriefcase size={20} />}
                </div>
                
                <div 
                  className={`w-full md:w-[45%] bg-white/5 border border-white/5 rounded-[2.5rem] p-8 md:p-12 space-y-6 group hover:bg-[#808000]/5 transition-all cursor-pointer ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                  onClick={() => navigate(`/experience/${exp.id}`)}
                >
                  <div className="space-y-3">
                    <div className={`flex items-center gap-3 ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
                       <Badge className="bg-[#808000]/5">{exp.period}</Badge>
                    </div>
                    <h3 className="text-[clamp(1.25rem,3vw,2rem)] font-black text-white italic tracking-tight">{exp.title}</h3>
                    <div className={`text-[#808000] font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
                       {exp.company} <IconArrowUpRight size={14} />
                    </div>
                  </div>
                  <p className="text-white/50 text-[clamp(0.875rem,2vw,1rem)] leading-relaxed italic">{exp.desc}</p>
                </div>
                
                <div className={`hidden md:block w-[45%] ${idx % 2 === 0 ? 'text-left' : 'text-right'}`}>
                   <div className="text-[clamp(1.5rem,3vw,2rem)] font-black text-white italic">{exp.period}</div>
                   <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Journey Milestone</div>
                </div>
              </motion.div>
            ))}
            
            <div className="flex justify-center pt-12 relative z-20">
               <button className="px-10 py-6 bg-white/5 border border-white/10 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] text-white italic flex items-center gap-4 hover:border-[#808000]/50 transition-all group shadow-2xl">
                 <IconDownload size={22} className="text-[#808000] group-hover:scale-110 transition-transform" /> Download Resume
               </button>
            </div>
          </div>
        </Section>

        {/* CONTACT SECTION */}
        <Section id="contact">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-start">
            <div className="space-y-12">
               <SectionHeader label="Open to opportunities" title={<>Ready to build <br /><span className="text-[#808000]">the future?</span></>} desc="Specializing in C#, React, and scalable web solutions. Whether you have a project in mind or just want to chat tech, my inbox is open." />
               
               <div className="space-y-6">
                 <div className="flex items-center gap-8 bg-white/5 border border-white/5 p-8 rounded-[2.5rem] group hover:border-[#808000]/50 transition-all cursor-pointer">
                    <div className="w-16 h-16 bg-[#808000]/10 rounded-2xl flex items-center justify-center text-[#808000] group-hover:bg-[#808000] group-hover:text-white transition-all shadow-xl"><IconMail size={28} /></div>
                    <div>
                       <div className="text-[10px] font-black uppercase text-white/40 mb-1 tracking-widest">Email Me</div>
                       <div className="text-white font-bold text-lg md:text-xl italic tracking-tight break-all">{portfolioConfig.email}</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-8 bg-white/5 border border-white/5 p-8 rounded-[2.5rem] group hover:border-[#808000]/50 transition-all">
                    <div className="w-16 h-16 bg-[#808000]/10 rounded-2xl flex items-center justify-center text-[#808000] shadow-xl"><IconMapPin size={28} /></div>
                    <div>
                       <div className="text-[10px] font-black uppercase text-white/40 mb-1 tracking-widest">Location</div>
                       <div className="text-white font-bold text-lg md:text-xl italic tracking-tight">{portfolioConfig.location}</div>
                    </div>
                 </div>
              </div>
            </div>

            <motion.div variants={itemReveal} className="bg-white/5 border border-white/5 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <h3 className="text-[clamp(1.5rem,4vw,2.5rem)] font-black text-white italic mb-4 leading-tight">Send a message</h3>
              <p className="text-white/50 mb-10 text-[clamp(0.875rem,2vw,1rem)]">I usually respond within 24 hours.</p>
              
              <form className="space-y-8 relative z-10" onSubmit={e => { e.preventDefault(); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-4 italic">Name</label>
                      <input type="text" placeholder="John Doe" className="w-full bg-[#050505]/50 border border-white/5 rounded-2xl py-4 px-6 text-white focus:border-[#808000] outline-none transition-all placeholder:text-white/10 font-bold italic text-[clamp(0.875rem,2vw,1rem)]" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-4 italic">Email</label>
                      <input type="email" placeholder="john@example.com" className="w-full bg-[#050505]/50 border border-white/5 rounded-2xl py-4 px-6 text-white focus:border-[#808000] outline-none transition-all placeholder:text-white/10 font-bold italic text-[clamp(0.875rem,2vw,1rem)]" />
                   </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-4 italic">Message</label>
                  <textarea placeholder="Tell me about your project..." className="w-full bg-[#050505]/50 border border-white/5 rounded-[2rem] p-6 text-white focus:border-[#808000] outline-none transition-all min-h-[150px] resize-none placeholder:text-white/10 font-bold italic text-[clamp(0.875rem,2vw,1rem)]" />
                </div>
                <button className="w-full py-6 bg-[#808000] rounded-[2rem] text-[10px] font-black uppercase tracking-[0.5em] text-white italic flex items-center justify-center gap-4 shadow-3xl shadow-[#808000]/30 active:scale-[0.98] transition-all hover:opacity-90">
                   Send Message <IconSend size={22} />
                </button>
              </form>
            </motion.div>
          </div>
        </Section>
    </>
  );
};

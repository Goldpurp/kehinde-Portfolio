
import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useNavigate, 
  useLocation, 
  useParams 
} from 'react-router-dom';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useSpring, 
  Variants
} from 'framer-motion';
import { 
  IconBrandGithub, 
  IconBrandLinkedin, 
  IconBrandTwitter, 
  IconMail, 
  IconExternalLink, 
  IconCode, 
  IconTerminal2, 
  IconCpu, 
  IconSend, 
  IconChevronRight, 
  IconArrowRight, 
  IconDownload, 
  IconCheck, 
  IconFolder, 
  IconMapPin, 
  IconRocket, 
  IconBrandReact, 
  IconBrandTypescript, 
  IconBrandAzure, 
  IconDatabase, 
  IconHistory, 
  IconSparkles, 
  IconBolt, 
  IconCommand, 
  IconDeviceDesktop, 
  IconServer, 
  IconMenu2, 
  IconX, 
  IconBriefcase, 
  IconArrowUpRight,
  IconBrandGraphql,
  IconDatabaseImport,
  IconLayout,
  IconBrandDocker,
  IconActivity
} from '@tabler/icons-react';

// --- CONFIGURATION ---
const portfolioConfig = {
  name: "Kehinde Razaq",
  role: "Software Developer",
  bio: "Software developer with practical experience across front-end and back-end roles. Experienced in building user-focused interfaces, implementing backend logic, and supporting products from development to launch.",
  githubUsername: "kehinderazaq", 
  location: "Lagos, Nigeria",
  email: "kehinderazaq03@gmail.com",
  socials: {
    github: "https://github.com/kehinderazaq",
    linkedin: "https://linkedin.com/in/kehinderazaq",
    twitter: "https://twitter.com/kehinderazaq",
  },
  experience: [
    {
      id: "konvato-intern",
      title: "Backend Engineering Intern",
      company: "Konvato (Startup)",
      period: "10/25 - Present",
      desc: "Working with backend and full-stack engineers to bring the product to life. Assisting in building backend logic and APIs using C# and .NET.",
      tags: ["C#", ".NET", "API", "Backend"]
    },
    {
      id: "fanful-junior",
      title: "Junior Developer",
      company: "Fanful",
      period: "08/24 - 05/25",
      desc: "Built and maintained front-end features in collaboration with the engineering team. Translated product requirements into functional and user-friendly interfaces.",
      tags: ["React", "TypeScript", "UI/UX", "Code Review"]
    },
    {
      id: "weddn-frontend",
      title: "Front-End Developer",
      company: "Weddn (Startup)",
      period: "10/24 - 12/24",
      desc: "Designed and built user-facing interfaces in collaboration with a small engineering team. Implemented responsive layouts and front-end functionality.",
      tags: ["React", "Responsive Design", "Frontend"]
    },
    {
      id: "fanful-intern",
      title: "Software Development Intern",
      company: "Fanful",
      period: "03/23 - 08/23",
      desc: "Assisted in building UI components and supporting feature development. Worked with shared codebases and version control systems.",
      tags: ["UI Components", "Git", "Collaboration"]
    },
    {
      id: "altschool-junior",
      title: "Junior Front-End Engineer",
      company: "AltSchool Africa",
      period: "08/21 - 01/23",
      desc: "Built responsive UI components and improved user experience. Collaborated on team projects and participated in code reviews.",
      tags: ["React", "JavaScript", "CSS", "Teamwork"]
    }
  ]
};

// --- ANIMATION VARIANTS ---
const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1], staggerChildren: 0.1 } 
  }
};

const itemReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// --- COMPONENTS ---

// Fix: Make children optional to resolve TS mismatch in some environments
const Badge = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
  <span className={`px-3 py-1 bg-[#808000]/10 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-[#808000] border border-[#808000]/20 ${className}`}>
    {children}
  </span>
);

const SectionHeader = ({ id, label, title, desc, centered = false }: { id?: string, label: string, title: React.ReactNode, desc?: string, centered?: boolean }) => (
  <motion.div variants={itemReveal} className={`mb-[clamp(2rem,5vh,4rem)] ${centered ? 'text-center mx-auto' : ''}`}>
    <div className={`flex items-center gap-3 text-[#808000] font-mono text-[clamp(0.65rem,0.1vw+0.6rem,0.75rem)] mb-4 ${centered ? 'justify-center' : ''}`}>
      {id && <span className="opacity-50">{id}.</span>}
      <div className="h-px w-8 bg-[#808000]/30" />
      <span className="tracking-[0.4em] uppercase font-black">{label}</span>
    </div>
    <h2 className="text-[clamp(1.5rem,2.5vw+1rem,2.75rem)] font-black text-white leading-[1.1] mb-6">{title}</h2>
    {desc && <p className="text-white/50 text-[clamp(0.95rem,0.2vw+0.85rem,1.125rem)] max-w-3xl leading-relaxed">{desc}</p>}
  </motion.div>
);

const SkillProgressBar = ({ name, level, label }: { name: string, level: number, label?: string }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center text-sm">
      <span className="font-bold text-white">{name}</span>
      <span className="text-[#808000] font-black">{label || `${level}%`}</span>
    </div>
    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="h-full bg-[#808000] shadow-[0_0_12px_rgba(128,128,0,0.4)]"
      />
    </div>
  </div>
);

// Fix: Add key to props definition to resolve strict assignment errors in JSX mapping
const ProjectCard = ({ repo }: { repo: any; key?: React.Key }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      variants={itemReveal}
      className={`bg-white/5 border border-olive/10 rounded-2xl p-8 flex flex-col group transition-all hover:bg-olive/5 h-full relative z-10`}
      onClick={() => navigate(`/project/${repo.name}`)}
    >
      <div className="flex justify-between items-start mb-8">
        <div className="text-[#808000]"><IconFolder size={32} /></div>
        <div className="flex gap-4 text-white/20 group-hover:text-white/40 transition-colors">
          <motion.a whileHover={{ scale: 1.2, color: '#808000' }} href={repo.html_url} target="_blank" onClick={e => e.stopPropagation()}><IconCode size={20} /></motion.a>
          <motion.a whileHover={{ scale: 1.2, color: '#808000' }} href={repo.html_url} target="_blank" onClick={e => e.stopPropagation()}><IconExternalLink size={20} /></motion.a>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-4 italic tracking-tight">{repo.name}</h3>
      <p className={`text-white/50 text-sm leading-relaxed mb-10 transition-colors group-hover:text-white/60 line-clamp-3`}>
        {repo.description || "A comprehensive implementation focused on scalable architecture, automated testing, and modern cloud deployment standards."}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
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

// --- DETAIL PAGES ---

const ProjectDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [repo, setRepo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`https://api.github.com/repos/${portfolioConfig.githubUsername}/${name}`)
      .then(res => res.json())
      .then(data => {
        setRepo(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [name]);

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><div className="w-12 h-12 border-4 border-[#808000] border-t-transparent rounded-full animate-spin" /></div>;
  if (!repo) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Project not found</div>;

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-[clamp(1.5rem,6vw,12rem)]">
      <div className="max-w-5xl mx-auto space-y-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#808000] font-black uppercase tracking-widest text-xs hover:opacity-70 transition-all">
          <IconChevronRight className="rotate-180" size={16} /> Back
        </button>
        
        <div className="space-y-6">
          <Badge>Project Case Study</Badge>
          <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-black text-white italic leading-none tracking-tighter">{repo.name}</h1>
          <p className="text-xl text-white/60 leading-relaxed max-w-3xl">{repo.description || "Detailed overview of the project architecture and implementation."}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white/5 border border-olive/10 rounded-[2.5rem] p-10 space-y-6">
              <h2 className="text-2xl font-black text-white italic">Overview</h2>
              <p className="text-white/50 leading-relaxed">
                This project represents a significant milestone in building scalable {repo.language} applications. 
                Focused on performance, maintainability, and user experience, it leverages modern development patterns.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                {repo.topics?.map((topic: string) => (
                  <span key={topic} className="px-4 py-2 bg-[#808000]/10 text-[#808000] text-[10px] font-black uppercase tracking-widest rounded-lg border border-[#808000]/20">{topic}</span>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-olive/10 rounded-[2.5rem] p-10 space-y-6">
              <h2 className="text-2xl font-black text-white italic">Key Features</h2>
              <ul className="space-y-4">
                {[
                  "Responsive and fluid UI/UX design",
                  "Optimized performance and lazy loading",
                  "Comprehensive API integration",
                  "Automated CI/CD workflows"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-4 text-white/50">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#808000] flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 border border-olive/10 rounded-[2.5rem] p-8 space-y-6">
              <h3 className="text-lg font-black text-white italic">Project Info</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/30 uppercase font-black tracking-widest text-[10px]">Language</span>
                  <span className="text-white font-bold">{repo.language || "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/30 uppercase font-black tracking-widest text-[10px]">Stars</span>
                  <span className="text-white font-bold">{repo.stargazers_count}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/30 uppercase font-black tracking-widest text-[10px]">Forks</span>
                  <span className="text-white font-bold">{repo.forks_count}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/30 uppercase font-black tracking-widest text-[10px]">License</span>
                  <span className="text-white font-bold">{repo.license?.name || "None"}</span>
                </div>
              </div>
              <div className="pt-6 space-y-3">
                <a href={repo.html_url} target="_blank" className="w-full py-4 bg-[#808000] rounded-xl text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 shadow-xl shadow-[#808000]/20 hover:opacity-90 transition-all">
                  <IconBrandGithub size={18} /> View Source
                </a>
                {repo.homepage && (
                  <a href={repo.homepage} target="_blank" className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-white/80 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                    <IconExternalLink size={18} /> Live Demo
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

const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const exp = portfolioConfig.experience.find(e => e.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!exp) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Experience not found</div>;

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-[clamp(1.5rem,6vw,12rem)]">
      <div className="max-w-4xl mx-auto space-y-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#808000] font-black uppercase tracking-widest text-xs hover:opacity-70 transition-all">
          <IconChevronRight className="rotate-180" size={16} /> Back
        </button>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Badge>{exp.period}</Badge>
            <span className="text-[#808000] font-black uppercase tracking-[0.3em] text-[10px]">{exp.company}</span>
          </div>
          <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-black text-white italic leading-none tracking-tighter">{exp.title}</h1>
        </div>

        <div className="bg-white/5 border border-olive/10 rounded-[3rem] p-10 md:p-16 space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white italic">Role Description</h2>
            <p className="text-xl text-white/50 leading-relaxed italic">{exp.desc}</p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white italic">Core Responsibilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Collaborating with cross-functional teams",
                "Implementing scalable architecture patterns",
                "Optimizing frontend performance",
                "Maintaining high code quality standards"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="w-8 h-8 bg-[#808000]/10 rounded-lg flex items-center justify-center text-[#808000]"><IconCheck size={16} /></div>
                  <span className="text-sm text-white/60 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white italic">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {exp.tags.map(tag => (
                <span key={tag} className="px-6 py-3 bg-white/5 text-white/40 text-xs font-black uppercase tracking-widest rounded-xl border border-white/5">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SECTION COMPONENT ---
const Section = ({ children, id, className = "" }: { children?: React.ReactNode, id?: string, className?: string }) => {
  const { sectionReveal } = useMemo(() => ({
    sectionReveal: {
      hidden: { opacity: 0, y: 30 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1], staggerChildren: 0.1 } 
      }
    }
  }), []);

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionReveal}
      className={`py-[clamp(4rem,12vh,15rem)] px-[clamp(1.5rem,6vw,12rem)] max-w-[180rem] mx-auto ${className}`}
    >
      {children}
    </motion.section>
  );
};

// --- LAYOUT COMPONENT ---
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation to standalone pages
  const navigateTo = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white/80 font-sans selection:bg-[#808000]/40 overflow-x-hidden">
      {/* MOBILE SCROLL PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#808000] z-[120] origin-left sm:hidden" 
        style={{ scaleX }} 
      />

      {/* NAVBAR */}
      <nav className={`fixed top-0 inset-x-0 h-[clamp(4rem,8vh,6rem)] z-[100] transition-all duration-300 ${scrolled ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/5' : ''}`}>
        <div className="w-full max-w-[180rem] px-[clamp(1.5rem,6vw,12rem)] mx-auto flex justify-between items-center h-full">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('/')}>
            <div className="w-[clamp(2.5rem,3vw,3.5rem)] h-[clamp(2.5rem,3vw,3.5rem)] bg-[#808000] rounded-lg flex items-center justify-center text-white shadow-lg shadow-[#808000]/20 group-hover:rotate-12 transition-transform">
              <IconTerminal2 size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-[clamp(1rem,1.2vw,1.5rem)] font-black tracking-tight text-white uppercase italic leading-none">DevPortfolio</span>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-[clamp(1.5rem,3vw,4rem)]">
            {['About', 'Projects', 'Skills', 'Experience', 'Contact'].map(item => (
              <button 
                key={item} 
                onClick={() => navigateTo(`/${item.toLowerCase()}`)} 
                className={`text-[clamp(0.7rem,0.1vw+0.65rem,0.8rem)] font-bold uppercase tracking-[0.2em] transition-all ${location.pathname === `/${item.toLowerCase()}` ? 'text-[#808000]' : 'text-white/40 hover:text-white'}`}
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => navigateTo('/contact')}
              className="px-[clamp(1.5rem,2vw,2.5rem)] py-[clamp(0.6rem,1vh,1rem)] bg-[#808000] rounded-lg text-[clamp(0.7rem,0.1vw+0.65rem,0.8rem)] font-black uppercase tracking-widest text-white shadow-xl shadow-[#808000]/20 hover:opacity-90 transition-all active:scale-95"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white bg-white/5 p-2 rounded-xl border border-white/10 active:scale-95 transition-all">
            <AnimatePresence mode="wait">
              {isMenuOpen ? <motion.div key="x" initial={{rotate:-90}} animate={{rotate:0}}><IconX /></motion.div> : <motion.div key="m" initial={{rotate:90}} animate={{rotate:0}}><IconMenu2 /></motion.div>}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[90] bg-[#050505] pt-32 px-12 lg:hidden flex flex-col gap-10"
          >
            {['About', 'Projects', 'Skills', 'Experience', 'Contact'].map((item, i) => (
              <motion.button 
                key={item} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigateTo(`/${item.toLowerCase()}`)}
                className={`text-4xl font-black italic text-left uppercase tracking-tighter ${location.pathname === `/${item.toLowerCase()}` ? 'text-[#808000]' : 'text-white'}`}
              >
                {item}
              </motion.button>
            ))}
            <div className="mt-auto pb-12 flex gap-8">
              {[
                { icon: IconBrandGithub, url: portfolioConfig.socials.github },
                { icon: IconBrandLinkedin, url: portfolioConfig.socials.linkedin },
                { icon: IconMail, url: `mailto:${portfolioConfig.email}` }
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  whileHover={{ scale: 1.2, color: '#808000' }}
                  className="text-white/40 transition-colors"
                >
                  <item.icon size={32} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>

      {/* BACK TO TOP BUTTON */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[110] w-12 h-12 bg-[#808000] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#808000]/40 hover:opacity-90 transition-all active:scale-90"
          >
            <IconArrowUpRight className="-rotate-45" size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="py-[clamp(4rem,10vh,8rem)] border-t border-white/5 bg-[#050505] relative overflow-hidden">
        <div className="max-w-[180rem] mx-auto px-[clamp(1.5rem,6vw,12rem)] flex flex-col items-center gap-12">
           <div className="flex gap-10">
              {[
                { Icon: IconBrandGithub, url: portfolioConfig.socials.github },
                { Icon: IconBrandLinkedin, url: portfolioConfig.socials.linkedin },
                { Icon: IconBrandTwitter, url: portfolioConfig.socials.twitter }
              ].map((item, i) => (
                <motion.a 
                  key={i} 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.25, color: '#808000' }}
                  className="text-white/20 transition-colors"
                >
                  <item.Icon size={32} />
                </motion.a>
              ))}
           </div>
           <div className="text-center space-y-4">
              <p className="text-[clamp(0.6rem,0.1vw+0.55rem,0.75rem)] font-mono text-white/30 uppercase tracking-[0.6em] font-black italic">Designed & Built by Kehinde Razaq.</p>
              <p className="text-[clamp(0.55rem,0.1vw+0.5rem,0.65rem)] font-mono text-white/10 uppercase tracking-[0.4em] font-black italic">Powered by React, .NET & Tailwind.</p>
           </div>
           <div className="w-20 h-px bg-white/5" />
           <p className="text-[clamp(0.55rem,0.1vw+0.5rem,0.65rem)] text-white/10 uppercase tracking-[0.3em] font-black">© 2024 DEV_LABS STUDIO</p>
        </div>
      </footer>
    </div>
  );
};

// --- STANDALONE PAGES ---

const PageWrapper = ({ children, title, subtitle, number }: { children: React.ReactNode, title: string, subtitle?: string, number?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen bg-[#050505] pt-[clamp(6rem,15vh,12rem)] pb-20 px-[clamp(1.5rem,6vw,12rem)] relative overflow-hidden"
  >
    {/* Decorative Background Elements */}
    <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-[#808000]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-[#808000]/3 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
    
    <div className="max-w-[140rem] mx-auto relative z-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-[clamp(4rem,10vh,8rem)] gap-10">
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
            className="text-[clamp(3.5rem,10vw,12rem)] font-black text-white italic leading-[0.85] tracking-[-0.04em]"
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
            <p className="text-[clamp(1.125rem,1.5vw,1.5rem)] text-white/40 font-medium italic leading-relaxed border-l-2 border-[#808000]/20 pl-8">
              {subtitle}
            </p>
          </motion.div>
        )}
      </div>
      {children}
    </div>
  </motion.div>
);

const AboutPage = () => (
  <PageWrapper title="The Narrative" subtitle="An exploration of technical precision, creative intuition, and the journey of a developer." number="01">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
      <div className="lg:col-span-5 space-y-12">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="aspect-[3/4] bg-white/5 rounded-[3rem] overflow-hidden border border-white/5 relative group"
        >
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200" alt="Kehinde" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-10 left-10 right-10">
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#808000] mb-2">Current Status</div>
            <div className="text-white font-bold italic text-xl">Engineering at Konvato</div>
          </div>
        </motion.div>
        
        <div className="p-12 bg-white/5 rounded-[3rem] border border-white/5 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10"><IconSparkles size={64} /></div>
          <h3 className="text-2xl font-black text-white italic mb-8">The Philosophy</h3>
          <p className="text-white/40 leading-relaxed text-lg italic font-medium">
            "I believe in the beauty of invisible architecture. The best code is that which feels natural, performs flawlessly, and disappears into the user experience."
          </p>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-24 py-10">
        <section className="space-y-10">
          <div className="flex items-center gap-6">
            <span className="text-4xl font-black text-[#808000] italic">01.</span>
            <h2 className="text-5xl font-black text-white italic tracking-tight">The Origin</h2>
          </div>
          <p className="text-white/60 text-2xl leading-relaxed font-light">
            My journey began with a fascination for how logic could manifest as visual reality. From the early days of AltSchool Africa to building scalable systems at Fanful, I've treated every line of code as a brushstroke in a larger digital canvas.
          </p>
        </section>

        <section className="space-y-10">
          <div className="flex items-center gap-6">
            <span className="text-4xl font-black text-[#808000] italic">02.</span>
            <h2 className="text-5xl font-black text-white italic tracking-tight">The Craft</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { t: "Precision Engineering", d: "Focusing on the micro-interactions that define the macro experience." },
              { t: "Scalable Logic", d: "Building backend systems that grow with the user base without friction." },
              { t: "AI Integration", d: "Leveraging the latest in LLMs to accelerate the development lifecycle." },
              { t: "Visual Intuition", d: "Ensuring that every technical decision serves the aesthetic goal." }
            ].map((item, i) => (
              <div key={i} className="space-y-4 p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-[#808000]/30 transition-all group">
                <h4 className="text-white font-black italic text-xl group-hover:text-[#808000] transition-colors">{item.t}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <div className="flex items-center gap-6">
            <span className="text-4xl font-black text-[#808000] italic">03.</span>
            <h2 className="text-5xl font-black text-white italic tracking-tight">The Vision</h2>
          </div>
          <p className="text-white/60 text-2xl leading-relaxed font-light">
            I'm currently focused on the intersection of .NET backend stability and React frontend fluidity. My goal is to build products that don't just work, but inspire.
          </p>
          <div className="pt-10">
            <button className="group flex items-center gap-6 text-white/40 hover:text-white transition-all">
              <span className="text-xs font-black uppercase tracking-[0.5em]">View Full Resume</span>
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#808000] group-hover:border-[#808000] transition-all">
                <IconArrowUpRight size={24} className="group-hover:text-white transition-colors" />
              </div>
            </button>
          </div>
        </section>
      </div>
    </div>
  </PageWrapper>
);

const ProjectsPage = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.github.com/users/${portfolioConfig.githubUsername}/repos?sort=updated&per_page=20`)
      .then(res => res.json())
      .then(data => {
        setRepos(Array.isArray(data) ? data.filter((r: any) => !r.fork) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <PageWrapper title="The Archive" subtitle="A curated collection of digital artifacts, open-source contributions, and experimental builds." number="02">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {loading ? (
          Array(6).fill(0).map((_, i) => <div key={i} className="aspect-video bg-white/5 rounded-[3rem] animate-pulse" />)
        ) : (
          repos.map((repo, i) => (
            <motion.div 
              key={repo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
              onClick={() => navigate(`/project/${repo.name}`)}
            >
              <div className="aspect-video bg-white/5 rounded-[3rem] border border-white/5 overflow-hidden relative mb-8 transition-all group-hover:border-[#808000]/30">
                <div className="absolute inset-0 bg-gradient-to-br from-[#808000]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                  <div className="w-20 h-20 bg-white text-[#050505] rounded-full flex items-center justify-center font-black uppercase tracking-widest text-[10px]">View</div>
                </div>
                <div className="absolute top-10 left-10">
                  <IconFolder size={48} className="text-white/10 group-hover:text-[#808000] transition-colors" />
                </div>
              </div>
              <div className="flex justify-between items-end px-4">
                <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#808000]">{repo.language || "System"}</div>
                  <h3 className="text-4xl font-black text-white italic tracking-tighter group-hover:translate-x-2 transition-transform">{repo.name}</h3>
                </div>
                <div className="text-white/20 font-mono text-xs group-hover:text-white transition-colors">
                  {new Date(repo.updated_at).getFullYear()}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </PageWrapper>
  );
};

const SkillsPage = () => (
  <PageWrapper title="The Arsenal" subtitle="A comprehensive breakdown of technical competencies, architectural patterns, and modern workflows." number="03">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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
          className="p-16 bg-white/5 rounded-[4rem] border border-white/5 space-y-12 group hover:bg-white/[0.07] transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#808000]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center text-[#808000] group-hover:bg-[#808000] group-hover:text-white transition-all shadow-inner">
            {cat.i}
          </div>
          <div className="space-y-6">
            <h3 className="text-4xl font-black text-white italic tracking-tighter">{cat.t}</h3>
            <p className="text-white/40 text-lg leading-relaxed italic">{cat.d}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {cat.s.map(s => (
              <span key={s} className="px-6 py-3 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/30 border border-white/5 hover:border-[#808000]/30 hover:text-white transition-all">{s}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
    
    <div className="mt-32 p-20 bg-white/5 rounded-[5rem] border border-white/5 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#808000]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <div className="space-y-8">
          <div className="flex items-center gap-4 text-[#808000]">
            <IconSparkles size={32} />
            <span className="text-xs font-black uppercase tracking-[0.5em]">Future-Proofing</span>
          </div>
          <h2 className="text-6xl font-black text-white italic leading-none tracking-tighter">AI-Driven <br />Productivity</h2>
          <p className="text-white/40 text-xl leading-relaxed italic">
            I integrate advanced AI models into my development lifecycle, from automated testing to rapid UI prototyping, ensuring maximum velocity without compromising on code quality.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {[
            { l: "Velocity", v: "2x" },
            { l: "Code Quality", v: "High" },
            { l: "Iteration", v: "Rapid" },
            { l: "Innovation", v: "Constant" }
          ].map((stat, i) => (
            <div key={i} className="p-10 bg-white/5 rounded-[3rem] border border-white/5 text-center space-y-2">
              <div className="text-4xl font-black text-white italic">{stat.v}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/20">{stat.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PageWrapper>
);

const ExperiencePage = () => (
  <PageWrapper title="The Journey" subtitle="A professional timeline documenting the evolution of skills, responsibilities, and impact." number="04">
    <div className="space-y-12">
      {portfolioConfig.experience.map((exp, i) => (
        <motion.div 
          key={exp.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="p-16 bg-white/5 rounded-[5rem] border border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-16 group hover:bg-white/[0.07] transition-all relative overflow-hidden"
          onClick={() => window.location.href = `/experience/${exp.id}`}
        >
          <div className="lg:col-span-3 space-y-6">
            <div className="text-6xl font-black text-white/5 italic group-hover:text-[#808000]/20 transition-colors">0{i + 1}</div>
            <div className="space-y-2">
              <span className="text-[#808000] font-black uppercase tracking-[0.4em] text-xs">{exp.period}</span>
              <h4 className="text-white/40 font-black uppercase tracking-widest text-xs italic">{exp.company}</h4>
            </div>
          </div>
          <div className="lg:col-span-9 space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <h3 className="text-5xl font-black text-white italic leading-none tracking-tighter">{exp.title}</h3>
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#808000] group-hover:border-[#808000] transition-all">
                <IconArrowUpRight size={24} className="group-hover:text-white transition-colors" />
              </div>
            </div>
            <p className="text-white/50 text-2xl leading-relaxed italic font-light max-w-4xl">{exp.desc}</p>
            <div className="flex flex-wrap gap-3">
              {exp.tags.map(t => (
                <span key={t} className="px-6 py-3 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/30 border border-white/5 group-hover:border-[#808000]/30 transition-all">{t}</span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </PageWrapper>
);

const ContactPage = () => (
  <PageWrapper title="The Connection" subtitle="Initiating a dialogue for potential collaboration, technical consultation, or creative partnership." number="05">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
      <div className="lg:col-span-5 space-y-12">
        <div className="p-16 bg-white/5 rounded-[5rem] border border-white/5 space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#808000]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <h3 className="text-4xl font-black text-white italic tracking-tighter">Direct Channels</h3>
          <div className="space-y-10">
            <div className="flex items-center gap-8 group cursor-pointer">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-[#808000] group-hover:bg-[#808000] group-hover:text-white transition-all shadow-inner"><IconMail size={32} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-1">Email</p>
                <p className="text-white font-bold text-2xl italic tracking-tight">{portfolioConfig.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-8 group">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-[#808000] shadow-inner"><IconMapPin size={32} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-1">Location</p>
                <p className="text-white font-bold text-2xl italic tracking-tight">{portfolioConfig.location}</p>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex gap-6">
            {[
              { Icon: IconBrandGithub, url: portfolioConfig.socials.github },
              { Icon: IconBrandLinkedin, url: portfolioConfig.socials.linkedin },
              { Icon: IconBrandTwitter, url: portfolioConfig.socials.twitter }
            ].map((item, i) => (
              <a key={i} href={item.url} target="_blank" className="w-16 h-16 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-white/20 hover:text-[#808000] hover:border-[#808000] transition-all">
                <item.Icon size={28} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 p-16 bg-white/5 rounded-[5rem] border border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#808000]/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
        <form className="space-y-12 relative z-10" onSubmit={e => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 ml-6 italic">Identity</label>
              <input type="text" className="w-full bg-white/5 border border-white/5 rounded-3xl p-8 text-white outline-none focus:border-[#808000]/50 transition-all italic font-bold text-xl" placeholder="Full Name" />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 ml-6 italic">Endpoint</label>
              <input type="email" className="w-full bg-white/5 border border-white/5 rounded-3xl p-8 text-white outline-none focus:border-[#808000]/50 transition-all italic font-bold text-xl" placeholder="Email Address" />
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 ml-6 italic">Message Body</label>
            <textarea className="w-full bg-white/5 border border-white/5 rounded-[3rem] p-10 text-white outline-none focus:border-[#808000]/50 transition-all italic font-bold text-xl min-h-[250px] resize-none" placeholder="Describe your vision..." />
          </div>
          <button className="group w-full py-10 bg-[#808000] rounded-[3rem] text-white font-black uppercase tracking-[0.6em] italic shadow-3xl shadow-[#808000]/20 hover:opacity-90 transition-all flex items-center justify-center gap-6">
            Transmit Message <IconSend size={28} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  </PageWrapper>
);

// --- LANDING PAGE ---
const LandingPage = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All Projects');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.github.com/users/${portfolioConfig.githubUsername}/repos?sort=updated&per_page=12`)
      .then(res => res.json())
      .then(data => {
        setRepos(Array.isArray(data) ? data.filter((r: any) => !r.fork).slice(0, 6) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
        <section className="min-h-screen flex items-center pt-[clamp(4rem,10vh,8rem)] px-[clamp(1.5rem,6vw,12rem)] max-w-[180rem] mx-auto">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,8vw,10rem)] items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-[clamp(1.5rem,4vh,3rem)] text-center lg:text-left"
            >
              <Badge className="bg-[#808000]/10 py-2 px-4">Available for hire</Badge>
              <h1 className="text-[clamp(2rem,4vw+1rem,3.75rem)] font-black text-white leading-[1.1] tracking-tighter italic">
                Building <span className="text-[#808000]">Robust</span> Solutions <br />
                <span className="text-white/50 font-medium tracking-normal">with Precision.</span>
              </h1>
              <p className="text-[clamp(1rem,0.3vw+0.9rem,1.25rem)] text-white/60 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                {portfolioConfig.bio}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button onClick={() => scrollTo('projects')} className="px-[clamp(2rem,3vw,4rem)] py-[clamp(1rem,2vh,1.5rem)] bg-[#808000] rounded-2xl text-[clamp(0.7rem,0.1vw+0.65rem,0.85rem)] font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-[#808000]/30 hover:opacity-90 transition-all active:scale-95">Explore Work</button>
                <button onClick={() => scrollTo('about')} className="px-[clamp(2rem,3vw,4rem)] py-[clamp(1rem,2vh,1.5rem)] bg-white/5 border border-white/10 rounded-2xl text-[clamp(0.7rem,0.1vw+0.65rem,0.85rem)] font-black uppercase tracking-[0.2em] text-white/80 hover:bg-white/10 transition-all active:scale-95">About Me</button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="hidden lg:block relative group"
            >
              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl shadow-[#808000]/10 relative p-3">
                 <div className="bg-white/5 px-8 py-5 flex items-center justify-between border-b border-white/5 rounded-t-[3rem]">
                    <div className="flex gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-white/20 animate-pulse" />
                      <div className="w-3 h-3 rounded-full bg-white/20 animate-pulse delay-75" />
                      <div className="w-3 h-3 rounded-full bg-white/20 animate-pulse delay-150" />
                    </div>
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.5em] font-black">STABILITY_OK</div>
                  </div>
                  <div className="aspect-[4/5] relative rounded-b-[3rem] overflow-hidden bg-[#050505]">
                    <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200" alt="Code" className="w-full h-full object-cover grayscale opacity-20 group-hover:opacity-50 transition-all duration-1000" />
                  </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <Section id="about">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7 space-y-12">
              <SectionHeader label="Discover" title="About Me" />
              <div className="bg-white/5 border border-olive/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row gap-12 items-start relative overflow-hidden group">
                <div className="w-48 h-56 bg-olive/10 rounded-[2.5rem] flex-shrink-0 overflow-hidden shadow-2xl relative">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600" alt="Kehinde" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute bottom-4 right-4 bg-[#808000] rounded-full p-1.5 shadow-lg border-2 border-[#050505]"><IconCheck size={12} stroke={4} /></div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-black text-white italic leading-tight">Bridging Frontend <br />& Backend</h3>
                  <p className="text-white/60 leading-relaxed font-medium text-[clamp(1rem,0.5vw+0.875rem,1.125rem)]">
                    I am a <span className="text-[#808000] font-bold">Software Developer</span> with practical experience across front-end and back-end roles. I specialize in building user-focused interfaces and implementing robust backend logic.
                  </p>
                  <p className="text-white/60 leading-relaxed font-medium text-[clamp(1rem,0.5vw+0.875rem,1.125rem)]">
                    My background includes working in startup and collaborative environments, where I've learned to support products from initial development to successful launch. I leverage AI-assisted development techniques to maximize productivity and ensure high code quality.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <button className="px-8 py-3.5 bg-[#808000] rounded-xl text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2.5 shadow-xl shadow-[#808000]/20 hover:opacity-90 transition-all"><IconDownload size={18} /> Download Resume</button>
                    <button className="px-8 py-3.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white flex items-center gap-2.5 transition-all"><IconCode size={18} /> View GitHub</button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {l: "EXPERIENCE", v: "4+ Years", i: <IconHistory />}, 
                  {l: "PROJECTS", v: "15+", i: <IconRocket />}, 
                  {l: "VERSATILITY", v: "Full-Stack", i: <IconBriefcase />}
                ].map(s => (
                  <div key={s.l} className="bg-white/5 border border-olive/10 p-[clamp(1.5rem,4vw,3rem)] rounded-[2.5rem] text-center space-y-4 group hover:bg-olive/5 transition-all">
                    <div className="mx-auto w-12 h-12 bg-[#808000]/10 rounded-xl flex items-center justify-center text-[#808000] group-hover:bg-[#808000] group-hover:text-white transition-all shadow-inner">{s.i}</div>
                    <div className="text-[clamp(0.6rem,0.1vw+0.55rem,0.7rem)] font-black uppercase tracking-[0.3em] text-white/40">{s.l}</div>
                    <div className="text-[clamp(1.5rem,2.5vw,2.5rem)] font-black text-white italic">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-5 space-y-12">
               <h3 className="text-2xl font-black text-white italic">Technical Arsenal</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                 {[
                   {n: "React", s: "Frontend UI", i: <IconBrandReact />},
                   {n: "TypeScript", s: "Type Safety", i: <IconBrandTypescript />},
                   {n: "C#", s: "Backend Logic", i: <IconTerminal2 />},
                   {n: ".NET", s: "Framework", i: <IconCpu />},
                   {n: "Tailwind CSS", s: "Styling", i: <IconLayout />},
                   {n: "PostgreSQL", s: "Data Storage", i: <IconDatabase />},
                   {n: "Git", s: "Version Control", i: <IconCode />},
                   {n: "Figma", s: "Design", i: <IconLayout />}
                 ].map(item => (
                   <div key={item.n} className="bg-white/5 border border-olive/10 rounded-2xl p-6 flex items-center gap-6 group hover:border-[#808000]/40 transition-all">
                     <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#808000] group-hover:bg-[#808000] group-hover:text-white transition-all shadow-inner">{item.i}</div>
                     <div>
                        <div className="text-lg font-black text-white italic leading-tight">{item.n}</div>
                        <div className="text-[10px] text-white/40 font-black uppercase tracking-widest">{item.s}</div>
                     </div>
                   </div>
                 ))}
               </div>
               
               <div className="bg-white/5 border border-olive/10 rounded-[2rem] p-8 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#808000]/10 rounded-xl flex items-center justify-center text-[#808000]"><IconSparkles size={20} /></div>
                    <h4 className="text-lg font-black text-white italic">AI-Assisted Workflow</h4>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">Integrating GitHub Copilot and ChatGPT into the development lifecycle to increase velocity while maintaining strict code quality reviews.</p>
               </div>
            </div>
          </div>
        </Section>

        {/* SKILLS SECTION */}
        <Section id="skills">
          <SectionHeader label="Expertise" title={<>Technical Skills <span className="text-white/40 italic">& Workflow</span></>} desc="A comprehensive overview of my technical stack, from high-performance backend systems to responsive frontend interfaces, powered by modern AI-driven productivity workflows." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Frontend Card */}
            <motion.div variants={itemReveal} className="bg-white/5 border border-olive/10 rounded-[2.5rem] p-[clamp(1.5rem,4vw,3.5rem)] space-y-10 group hover:border-[#808000]/40 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-[clamp(3.5rem,5vw,4.5rem)] h-[clamp(3.5rem,5vw,4.5rem)] bg-white/10 rounded-2xl flex items-center justify-center text-white group-hover:bg-[#808000] transition-colors shadow-inner">
                  <IconLayout size={32} stroke={1.5} />
                </div>
                <div>
                  <h3 className="text-[clamp(1.25rem,2vw,1.75rem)] font-black text-white italic">Frontend</h3>
                  <p className="text-white/50 text-[clamp(0.75rem,0.1vw+0.7rem,0.875rem)] font-medium">React ecosystem & Modern UI</p>
                </div>
              </div>
              <div className="space-y-8">
                <SkillProgressBar name="React / TypeScript" level={90} />
                <SkillProgressBar name="Tailwind CSS / Chakra UI" level={95} />
              </div>
              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                {["HTML5", "CSS3", "JavaScript", "Styled Components", "Figma"].map(t => (
                  <span key={t} className="px-4 py-2 bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-widest rounded-lg border border-white/5">{t}</span>
                ))}
              </div>
            </motion.div>

            {/* Backend Card */}
            <motion.div variants={itemReveal} className="bg-white/5 border border-olive/10 rounded-[2.5rem] p-[clamp(1.5rem,4vw,3.5rem)] space-y-10 group hover:border-[#808000]/40 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-[clamp(3.5rem,5vw,4.5rem)] h-[clamp(3.5rem,5vw,4.5rem)] bg-white/10 rounded-2xl flex items-center justify-center text-white group-hover:bg-[#808000] transition-colors shadow-inner">
                  <IconServer size={32} stroke={1.5} />
                </div>
                <div>
                  <h3 className="text-[clamp(1.25rem,2vw,1.75rem)] font-black text-white italic">Backend</h3>
                  <p className="text-white/50 text-[clamp(0.75rem,0.1vw+0.7rem,0.875rem)] font-medium">Scalable Architecture</p>
                </div>
              </div>
              <div className="space-y-8">
                <SkillProgressBar name="C# / .NET" level={85} />
                <SkillProgressBar name="RESTful APIs" level={90} />
              </div>
              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                {["ASP.NET", "Entity Framework", "Clean Architecture", "PostgreSQL"].map(t => (
                  <span key={t} className="px-4 py-2 bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-widest rounded-lg border border-white/5">{t}</span>
                ))}
              </div>
            </motion.div>

            {/* Databases Card */}
            <motion.div variants={itemReveal} className="bg-white/5 border border-olive/10 rounded-[2.5rem] p-[clamp(1.5rem,4vw,3.5rem)] space-y-10 group hover:border-[#808000]/40 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-[clamp(3.5rem,5vw,4.5rem)] h-[clamp(3.5rem,5vw,4.5rem)] bg-white/10 rounded-2xl flex items-center justify-center text-white group-hover:bg-[#808000] transition-colors shadow-inner">
                  <IconDatabase size={32} stroke={1.5} />
                </div>
                <div>
                  <h3 className="text-[clamp(1.25rem,2vw,1.75rem)] font-black text-white italic">Databases</h3>
                  <p className="text-white/50 text-[clamp(0.75rem,0.1vw+0.7rem,0.875rem)] font-medium">Data Modeling & Optimization</p>
                </div>
              </div>
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <IconServer size={20} className="text-[#808000]/50" />
                  <div className="flex-1"><SkillProgressBar name="SQL Server / T-SQL" level={85} /></div>
                </div>
                <div className="flex items-center gap-4">
                  <IconActivity size={20} className="text-[#808000]/50" />
                  <div className="flex-1"><SkillProgressBar name="PostgreSQL" level={80} /></div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                {["Entity Framework", "Redis", "NoSQL", "Dapper"].map(t => (
                  <span key={t} className="px-4 py-2 bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-widest rounded-lg border border-white/5">{t}</span>
                ))}
              </div>
            </motion.div>

            {/* Workflow & AI Card */}
            <motion.div variants={itemReveal} className="bg-white/5 border border-olive/10 rounded-[2.5rem] p-[clamp(1.5rem,4vw,3.5rem)] space-y-10 group hover:border-[#808000]/40 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-[clamp(3.5rem,5vw,4.5rem)] h-[clamp(3.5rem,5vw,4.5rem)] bg-white/10 rounded-2xl flex items-center justify-center text-white group-hover:bg-[#808000] transition-colors shadow-inner">
                  <IconSparkles size={32} stroke={1.5} />
                </div>
                <div>
                  <h3 className="text-[clamp(1.25rem,2vw,1.75rem)] font-black text-white italic">Workflow & AI</h3>
                  <p className="text-white/50 text-[clamp(0.75rem,0.1vw+0.7rem,0.875rem)] font-medium">Next-Gen Productivity</p>
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-white/50 text-sm leading-relaxed">Leveraging AI to accelerate development cycles, scaffold boilerplate, and optimize code quality.</p>
                <div className="space-y-4">
                  <div className="flex gap-5 p-6 bg-white/5 rounded-2xl border border-white/5 group/sub hover:bg-white/10 transition-all">
                    <IconBolt size={24} className="text-[#808000]" />
                    <div>
                      <div className="text-sm font-black text-white uppercase tracking-widest italic">Rapid Prototyping</div>
                      <div className="text-[10px] text-white/40 font-medium">Prompt-driven UI scaffolding & iteration</div>
                    </div>
                  </div>
                  <div className="flex gap-5 p-6 bg-white/5 rounded-2xl border border-white/5 group/sub hover:bg-white/10 transition-all">
                    <IconActivity size={24} className="text-[#808000]" />
                    <div>
                      <div className="text-sm font-black text-white uppercase tracking-widest italic">AI-Assisted Coding</div>
                      <div className="text-[10px] text-white/40 font-medium">Copilot & LLM integration for heavy lifting</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                {["CI/CD", "Docker", "GitHub Actions"].map(t => (
                  <div key={t} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#808000]" />
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="mt-16 flex justify-center">
            <button className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all flex items-center gap-3">
              View full technical resume <IconArrowRight size={18} />
            </button>
          </div>
        </Section>

        {/* PROJECTS SECTION */}
        <Section id="projects">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10">
            <SectionHeader id="02" label="Portfolio" title="Some Things I've Built" desc="A curated collection of full-stack web applications and robust .NET core libraries." />
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
              {['All Projects', 'Full Stack', 'Frontend', '.NET / C#'].map(f => (
                <button 
                  key={f} 
                  onClick={() => setFilter(f)} 
                  className={`whitespace-nowrap px-[clamp(1.5rem,2vw,2.5rem)] py-2.5 rounded-full text-[clamp(0.6rem,0.1vw+0.55rem,0.7rem)] font-black uppercase tracking-widest border transition-all ${filter === f ? 'bg-[#808000]/10 border-[#808000]/50 text-[#808000] shadow-xl shadow-[#808000]/5' : 'border-white/5 text-white/40 hover:text-white'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? Array(6).fill(0).map((_, i) => <div key={i} className="h-96 bg-white/5 rounded-3xl animate-pulse" />) : filteredRepos.map(repo => <ProjectCard key={repo.id} repo={repo} />)}
          </div>

          <div className="mt-20 flex justify-center">
            <button className="px-12 py-5 border border-[#808000]/50 text-[#808000] rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#808000]/5 transition-all flex items-center gap-4 italic">
              View Full Project Archive <IconArrowRight size={20} />
            </button>
          </div>
        </Section>

        {/* EXPERIENCE SECTION */}
        <Section id="experience">
          <SectionHeader label="Career Path" title={<>Professional <span className="text-[#808000]">Experience</span></>} desc="A timeline of my journey as a full-stack engineer, building scalable solutions across various industries." />
          <div className="relative space-y-16">
            <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-white/5 hidden md:block" />
            
            {portfolioConfig.experience.map((exp, idx) => (
              <motion.div 
                key={exp.title} 
                variants={itemReveal}
                className={`relative flex flex-col md:flex-row items-center gap-[clamp(2rem,5vw,6rem)] ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-[#050505] border border-white/10 rounded-full items-center justify-center text-[#808000] z-10 shadow-xl">
                  {idx === 0 ? <IconChevronRight size={20} className="rotate-270" /> : idx === 1 ? <IconHistory size={20} /> : <IconBriefcase size={20} />}
                </div>
                
                {/* Content card */}
                <div 
                  className={`w-full md:w-[45%] bg-white/5 border border-olive/10 rounded-[2.5rem] p-[clamp(1.5rem,4vw,3rem)] space-y-6 group hover:bg-olive/5 transition-all cursor-pointer ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                  onClick={() => navigate(`/experience/${exp.id}`)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 md:justify-end">
                       <Badge className="bg-[#808000]/5">{exp.period}</Badge>
                    </div>
                    <h3 className="text-[clamp(1.25rem,2vw,2rem)] font-black text-white italic tracking-tight">{exp.title}</h3>
                    <div className="text-[#808000] font-bold uppercase tracking-widest text-[clamp(0.6rem,0.1vw+0.55rem,0.75rem)] flex items-center gap-2 md:justify-end">
                       {exp.company} <IconArrowUpRight size={14} />
                    </div>
                  </div>
                  <p className="text-white/50 text-[clamp(0.875rem,0.2vw+0.8rem,1rem)] leading-relaxed italic">{exp.desc}</p>
                  <div className={`flex flex-wrap gap-2 ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
                    {exp.tags.map(t => <span key={t} className="px-3 py-1.5 bg-white/5 rounded-lg text-[clamp(0.55rem,0.1vw+0.5rem,0.65rem)] font-black text-white/40 uppercase tracking-widest">{t}</span>)}
                  </div>
                </div>
                
                {/* Visual indicator (Period text) for large screens on the opposite side */}
                <div className={`hidden md:block w-[45%] ${idx % 2 === 0 ? 'text-left' : 'text-right'}`}>
                   <div className="text-[clamp(1.25rem,2vw,2rem)] font-black text-white italic">{exp.period.split('-')[0]} - {exp.period.split('-')[1] || 'Present'}</div>
                   <div className="text-[clamp(0.6rem,0.1vw+0.55rem,0.7rem)] font-black uppercase tracking-[0.4em] text-white/20">Duration Breakdown</div>
                </div>
              </motion.div>
            ))}
            
            <div className="flex justify-center pt-20 relative z-20">
               <button className="px-14 py-6 bg-white/5 border border-white/10 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.4em] text-white italic flex items-center gap-4 hover:border-[#808000]/50 transition-all group shadow-2xl">
                 <IconDownload size={22} className="text-[#808000] group-hover:scale-110 transition-transform" /> Download Full Resume
               </button>
            </div>
          </div>
        </Section>

        {/* CONTACT SECTION */}
        <Section id="contact">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-12">
               <SectionHeader label="Open to opportunities" title={<>Ready to build <br /><span className="text-[#808000]">the future?</span></>} desc="Specializing in C#, React, and scalable web solutions. Whether you have a project in mind or just want to chat tech, my inbox is open." />
               
               <div className="space-y-6">
                 <div className="flex items-center gap-8 bg-white/5 border border-olive/20 p-[clamp(1.5rem,3vw,3rem)] rounded-[2.5rem] group hover:border-[#808000]/50 transition-all cursor-pointer">
                    <div className="w-[clamp(3rem,4vw,4rem)] h-[clamp(3rem,4vw,4rem)] bg-[#808000]/10 rounded-2xl flex items-center justify-center text-[#808000] group-hover:bg-[#808000] group-hover:text-white transition-all shadow-xl"><IconMail size={28} /></div>
                    <div>
                       <div className="text-[clamp(0.6rem,0.1vw+0.55rem,0.7rem)] font-black uppercase text-white/40 mb-1 tracking-widest">Email Me</div>
                       <div className="text-white font-bold text-[clamp(1rem,1.5vw,1.5rem)] italic tracking-tight">{portfolioConfig.email}</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-8 bg-white/5 border border-olive/20 p-[clamp(1.5rem,3vw,3rem)] rounded-[2.5rem] group hover:border-[#808000]/50 transition-all">
                    <div className="w-[clamp(3rem,4vw,4rem)] h-[clamp(3rem,4vw,4rem)] bg-[#808000]/10 rounded-2xl flex items-center justify-center text-[#808000] shadow-xl"><IconMapPin size={28} /></div>
                    <div>
                       <div className="text-[clamp(0.6rem,0.1vw+0.55rem,0.7rem)] font-black uppercase text-white/40 mb-1 tracking-widest">Location</div>
                       <div className="text-white font-bold text-[clamp(1rem,1.5vw,1.5rem)] italic tracking-tight">{portfolioConfig.location}</div>
                    </div>
                 </div>
              </div>
               
               <div className="space-y-8 pt-8">
                 <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 italic">CONNECT_STATION</div>
                 <div className="flex gap-6">
                    {[
                      { Icon: IconBrandGithub, url: portfolioConfig.socials.github },
                      { Icon: IconBrandLinkedin, url: portfolioConfig.socials.linkedin },
                      { Icon: IconBrandTwitter, url: portfolioConfig.socials.twitter }
                    ].map((item, i) => (
                      <motion.a 
                        key={i} 
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, y: -5, color: '#808000' }}
                        className="w-14 h-14 bg-white/5 border border-olive/20 rounded-2xl flex items-center justify-center text-white/40 transition-all shadow-xl"
                      >
                        <item.Icon size={28} />
                      </motion.a>
                    ))}
                 </div>
               </div>
            </div>

            <motion.div variants={itemReveal} className="bg-white/5 border border-white/5 rounded-[3rem] p-[clamp(2rem,6vw,5rem)] shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-black text-white italic mb-4 leading-tight">Send a message</h3>
              <p className="text-white/50 mb-12 text-[clamp(0.8rem,0.1vw+0.75rem,1rem)]">I usually respond within 24 hours.</p>
              
              <form className="space-y-10 relative z-10" onSubmit={e => { e.preventDefault(); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-[clamp(0.6rem,0.1vw+0.55rem,0.7rem)] font-black uppercase tracking-[0.3em] text-white/20 ml-4 italic">Name</label>
                      <div className="relative">
                        <IconActivity size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" />
                        <input type="text" placeholder="John Doe" className="w-full bg-[#050505]/50 border border-white/5 rounded-2xl py-[clamp(1rem,2vh,1.5rem)] pl-14 pr-8 text-white focus:border-[#808000] outline-none transition-all placeholder:text-white/10 font-bold italic text-[clamp(0.875rem,0.2vw+0.8rem,1.125rem)]" />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[clamp(0.6rem,0.1vw+0.55rem,0.7rem)] font-black uppercase tracking-[0.3em] text-white/20 ml-4 italic">Email</label>
                      <div className="relative">
                        <IconMail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" />
                        <input type="email" placeholder="john@example.com" className="w-full bg-[#050505]/50 border border-white/5 rounded-2xl py-[clamp(1rem,2vh,1.5rem)] pl-14 pr-8 text-white focus:border-[#808000] outline-none transition-all placeholder:text-white/10 font-bold italic text-[clamp(0.875rem,0.2vw+0.8rem,1.125rem)]" />
                      </div>
                   </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[clamp(0.6rem,0.1vw+0.55rem,0.7rem)] font-black uppercase tracking-[0.3em] text-white/20 ml-4 italic">Subject</label>
                  <div className="relative">
                    <IconLayout size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" />
                    <input type="text" placeholder="Project collaboration" className="w-full bg-[#050505]/50 border border-white/5 rounded-2xl py-[clamp(1rem,2vh,1.5rem)] pl-14 pr-8 text-white focus:border-[#808000] outline-none transition-all placeholder:text-white/10 font-bold italic text-[clamp(0.875rem,0.2vw+0.8rem,1.125rem)]" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[clamp(0.6rem,0.1vw+0.55rem,0.7rem)] font-black uppercase tracking-[0.3em] text-white/20 ml-4 italic">Message</label>
                  <textarea placeholder="Tell me about your project..." className="w-full bg-[#050505]/50 border border-white/5 rounded-[2rem] p-8 text-white focus:border-[#808000] outline-none transition-all min-h-[200px] resize-none placeholder:text-white/10 font-bold italic text-[clamp(0.875rem,0.2vw+0.8rem,1.125rem)]" />
                </div>
                <button className="w-full py-[clamp(1.25rem,3vh,2rem)] bg-[#808000] rounded-[2rem] text-[clamp(0.7rem,0.1vw+0.65rem,0.85rem)] font-black uppercase tracking-[0.5em] text-white italic flex items-center justify-center gap-4 shadow-3xl shadow-[#808000]/30 active:scale-[0.98] transition-all hover:opacity-90">
                   Send Message <IconSend size={22} />
                </button>
              </form>
            </motion.div>
          </div>
        </Section>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/project/:name" element={<ProjectDetail />} />
          <Route path="/experience/:id" element={<ExperienceDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

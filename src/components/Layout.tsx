
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  IconTerminal2, 
  IconX, 
  IconMenu2, 
  IconBrandGithub, 
  IconBrandLinkedin, 
  IconBrandTwitter, 
  IconMail, 
  IconArrowUpRight 
} from '@tabler/icons-react';
import { portfolioConfig } from '../store/portfolioData';

export const Layout = ({ children }: { children: React.ReactNode }) => {
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
        <div className="w-full max-w-[180rem] px-[clamp(1rem,5vw,8rem)] mx-auto flex justify-between items-center h-full">
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
                className={`text-[clamp(0.7rem,1vw,0.8rem)] font-bold uppercase tracking-[0.2em] transition-all ${location.pathname === `/${item.toLowerCase()}` ? 'text-[#808000]' : 'text-white/40 hover:text-white'}`}
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => navigateTo('/contact')}
              className="px-[clamp(1.5rem,2vw,2.5rem)] py-[clamp(0.6rem,1vh,1rem)] bg-[#808000] rounded-lg text-[clamp(0.7rem,1vw,0.8rem)] font-black uppercase tracking-widest text-white shadow-xl shadow-[#808000]/20 hover:opacity-90 transition-all active:scale-95"
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
            className="fixed inset-0 z-[90] bg-[#050505] pt-32 px-8 lg:hidden flex flex-col gap-8"
          >
            {['About', 'Projects', 'Skills', 'Experience', 'Contact'].map((item, i) => (
              <motion.button 
                key={item} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigateTo(`/${item.toLowerCase()}`)}
                className={`text-[clamp(2rem,8vw,4rem)] font-black italic text-left uppercase tracking-tighter ${location.pathname === `/${item.toLowerCase()}` ? 'text-[#808000]' : 'text-white'}`}
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
      <footer className="py-[clamp(3rem,8vh,6rem)] border-t border-white/5 bg-[#050505] relative overflow-hidden">
        <div className="max-w-[180rem] mx-auto px-[clamp(1rem,5vw,8rem)] flex flex-col items-center gap-10">
           <div className="flex gap-8">
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
              <p className="text-[clamp(0.6rem,2vw,0.75rem)] font-mono text-white/30 uppercase tracking-[0.6em] font-black italic">Designed & Built by Kehinde Razaq.</p>
              <p className="text-[clamp(0.55rem,1.5vw,0.65rem)] font-mono text-white/10 uppercase tracking-[0.4em] font-black italic">Powered by React, .NET & Tailwind.</p>
           </div>
           <div className="w-20 h-px bg-white/5" />
           <p className="text-[clamp(0.55rem,1.5vw,0.65rem)] text-white/10 uppercase tracking-[0.3em] font-black">© 2024 DEV_LABS STUDIO</p>
        </div>
      </footer>
    </div>
  );
};

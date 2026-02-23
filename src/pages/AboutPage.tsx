
import React from 'react';
import { motion } from 'framer-motion';
import { IconSparkles, IconArrowUpRight } from '@tabler/icons-react';
import { PageWrapper } from '../components/PageWrapper';

export const AboutPage = () => (
  <PageWrapper title="The Narrative" subtitle="An exploration of technical precision, creative intuition, and the journey of a developer." number="01">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
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
        
        <div className="p-8 md:p-12 bg-white/5 rounded-[3rem] border border-white/5 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10"><IconSparkles size={64} /></div>
          <h3 className="text-xl md:text-2xl font-black text-white italic mb-6 md:mb-8">The Philosophy</h3>
          <p className="text-white/40 leading-relaxed text-base md:text-lg italic font-medium">
            "I believe in the beauty of invisible architecture. The best code is that which feels natural, performs flawlessly, and disappears into the user experience."
          </p>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-16 md:space-y-24 py-10">
        <section className="space-y-8 md:space-y-10">
          <div className="flex items-center gap-6">
            <span className="text-3xl md:text-4xl font-black text-[#808000] italic">01.</span>
            <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] font-black text-white italic tracking-tight leading-none">The Origin</h2>
          </div>
          <p className="text-white/60 text-[clamp(1.125rem,2.5vw,1.75rem)] leading-relaxed font-light italic">
            My journey began with a fascination for how logic could manifest as visual reality. From the early days of AltSchool Africa to building scalable systems at Fanful, I've treated every line of code as a brushstroke in a larger digital canvas.
          </p>
        </section>

        <section className="space-y-8 md:space-y-10">
          <div className="flex items-center gap-6">
            <span className="text-3xl md:text-4xl font-black text-[#808000] italic">02.</span>
            <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] font-black text-white italic tracking-tight leading-none">The Craft</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              { t: "Precision Engineering", d: "Focusing on the micro-interactions that define the macro experience." },
              { t: "Scalable Logic", d: "Building backend systems that grow with the user base without friction." },
              { t: "AI Integration", d: "Leveraging the latest in LLMs to accelerate the development lifecycle." },
              { t: "Visual Intuition", d: "Ensuring that every technical decision serves the aesthetic goal." }
            ].map((item, i) => (
              <div key={i} className="space-y-4 p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-[#808000]/30 transition-all group">
                <h4 className="text-white font-black italic text-lg md:text-xl group-hover:text-[#808000] transition-colors">{item.t}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8 md:space-y-10">
          <div className="flex items-center gap-6">
            <span className="text-3xl md:text-4xl font-black text-[#808000] italic">03.</span>
            <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] font-black text-white italic tracking-tight leading-none">The Vision</h2>
          </div>
          <p className="text-white/60 text-[clamp(1.125rem,2.5vw,1.75rem)] leading-relaxed font-light italic">
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

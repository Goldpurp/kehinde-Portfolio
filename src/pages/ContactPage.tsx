
import React from 'react';
import { IconMail, IconMapPin, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconSend } from '@tabler/icons-react';
import { PageWrapper } from '../components/PageWrapper';
import { portfolioConfig } from '../store/portfolioData';

export const ContactPage = () => (
  <PageWrapper title="The Connection" subtitle="Initiating a dialogue for potential collaboration, technical consultation, or creative partnership." number="05">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
      <div className="lg:col-span-5 space-y-12">
        <div className="p-8 md:p-16 bg-white/5 rounded-[3rem] md:rounded-[5rem] border border-white/5 space-y-10 md:space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#808000]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <h3 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter">Direct Channels</h3>
          <div className="space-y-8 md:space-y-10">
            <div className="flex items-center gap-6 md:gap-8 group cursor-pointer">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-3xl flex items-center justify-center text-[#808000] group-hover:bg-[#808000] group-hover:text-white transition-all shadow-inner"><IconMail size={32} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-1">Email</p>
                <p className="text-white font-bold text-[clamp(1rem,2.5vw,1.5rem)] italic tracking-tight break-all">{portfolioConfig.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 md:gap-8 group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-3xl flex items-center justify-center text-[#808000] shadow-inner"><IconMapPin size={32} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-1">Location</p>
                <p className="text-white font-bold text-[clamp(1rem,2.5vw,1.5rem)] italic tracking-tight">{portfolioConfig.location}</p>
              </div>
            </div>
          </div>
          
          <div className="pt-10 md:pt-12 border-t border-white/5 flex gap-4 md:gap-6">
            {[
              { Icon: IconBrandGithub, url: portfolioConfig.socials.github },
              { Icon: IconBrandLinkedin, url: portfolioConfig.socials.linkedin },
              { Icon: IconBrandTwitter, url: portfolioConfig.socials.twitter }
            ].map((item, i) => (
              <a key={i} href={item.url} target="_blank" className="w-14 h-14 md:w-16 md:h-16 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-white/20 hover:text-[#808000] hover:border-[#808000] transition-all">
                <item.Icon size={28} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 p-8 md:p-16 bg-white/5 rounded-[3rem] md:rounded-[5rem] border border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#808000]/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
        <form className="space-y-8 md:space-y-12 relative z-10" onSubmit={e => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 ml-6 italic">Identity</label>
              <input type="text" className="w-full bg-white/5 border border-white/5 rounded-3xl p-6 md:p-8 text-white outline-none focus:border-[#808000]/50 transition-all italic font-bold text-lg md:text-xl" placeholder="Full Name" />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 ml-6 italic">Endpoint</label>
              <input type="email" className="w-full bg-white/5 border border-white/5 rounded-3xl p-6 md:p-8 text-white outline-none focus:border-[#808000]/50 transition-all italic font-bold text-lg md:text-xl" placeholder="Email Address" />
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 ml-6 italic">Message Body</label>
            <textarea className="w-full bg-white/5 border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 text-white outline-none focus:border-[#808000]/50 transition-all italic font-bold text-lg md:text-xl min-h-[200px] md:min-h-[250px] resize-none" placeholder="Describe your vision..." />
          </div>
          <button className="group w-full py-8 md:py-10 bg-[#808000] rounded-[2rem] md:rounded-[3rem] text-white font-black uppercase tracking-[0.4em] md:tracking-[0.6em] italic shadow-3xl shadow-[#808000]/20 hover:opacity-90 transition-all flex items-center justify-center gap-4 md:gap-6">
            Transmit Message <IconSend size={28} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  </PageWrapper>
);

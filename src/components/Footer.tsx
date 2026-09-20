import { motion } from 'motion/react';
import { Mail, Phone, Clock, Zap, ArrowRight, Github, Linkedin, Twitter, MessageSquare, Briefcase } from 'lucide-react';
import MetaWaveLogo from './MetaWaveLogo';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
  onPreload?: (sectionId: string) => void;
}

export function Footer({ onNavClick, onPreload }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerCols = [
    {
      title: 'Company',
      links: [
        { label: 'Stewardship', id: 'about' },
        { label: 'Global Network & Partnerships', id: 'global-network' },
        { label: 'Technology Stack', id: 'tech-stack' },
        { label: 'Why Choose Us', id: 'why-metawave' },
        { label: 'Executive Team', id: 'executive-team' },
        { label: 'Enterprise Process', id: 'process' },
        { label: 'Careers & Hiring', id: 'careers' },
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Custom Software Development', id: 'custom-software-development' },
        { label: 'AI & Machine Learning', id: 'ai-machine-learning' },
        { label: 'Cloud Infrastructure', id: 'cloud-solutions' },
        { label: 'Mobile App Development', id: 'mobile-development' },
        { label: 'UI/UX Design Studio', id: 'ui-ux-design' },
        { label: 'Explore Capabilities →', id: 'capabilities' },
      ]
    },
    {
      title: 'Solutions',
      links: [
        { label: 'CRM Development', id: 'crm-development' },
        { label: 'ERP Systems', id: 'erp-development' },
        { label: 'FinTech Platforms', id: 'solutions' },
        { label: 'Healthcare Portals', id: 'solutions' },
        { label: 'Property Portals', id: 'solutions' },
        { label: 'Solutions Store (Shop)', id: 'shop' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Engineering Blog', id: 'blog' },
        { label: 'FAQs & Knowledgebase', id: 'faqs' },
        { label: 'Technical Audits', id: 'contact' },
        { label: 'Platform Status', id: 'home' },
        { label: 'Support SLA', id: 'faqs' },
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 border-t border-slate-800/80 pt-16 sm:pt-20 pb-28 lg:pb-12 relative overflow-hidden">
      
      {/* Background glowing gradients */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.05),transparent_40%)]" />
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.03),transparent_40%)]" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Links Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 pb-16">
          
          {/* Brand Col spanning 2 slots */}
          <div className="lg:col-span-2 space-y-5 text-left">
            <button
              onClick={() => onNavClick('home')}
              className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-600 to-emerald-800 p-[1.5px] shadow-sm">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <MetaWaveLogo size={24} />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-0.5">
                  <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                    MetaWave Innovations
                  </span>
                  <span className="font-sans font-light text-[7px] text-slate-400 tracking-wider uppercase leading-none ml-0.5">
                    LTD
                  </span>
                </div>
                {/* Beautiful, thin teal/emerald horizontal divider line as in the logo image */}
                <div className="h-[1.1px] bg-gradient-to-r from-emerald-500 via-[#326E45] to-teal-600 w-full mt-1 mb-0.5 rounded-full opacity-70" />
                <span className="block text-[7px] font-mono tracking-[0.16em] text-emerald-450 uppercase leading-none font-bold">
                  GLOBAL TECH PARTNERS
                </span>
              </div>
            </button>

            <p className="text-xs text-slate-400 leading-relaxed font-normal max-w-sm">
              Global systems engineering firm automating business workflows, training large neural model parameters, and deploying secure software solutions to enterprises worldwide.
            </p>

            {/* Social pills & Careers CTA button */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <div className="flex items-center gap-1.5">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800/80 hover:border-emerald-500/20 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-all shadow-xs cursor-pointer" aria-label="MetaWave GitHub Link">
                  <Github size={14} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800/80 hover:border-emerald-500/20 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-all shadow-xs cursor-pointer" aria-label="MetaWave LinkedIn Link">
                  <Linkedin size={14} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800/80 hover:border-emerald-500/20 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-all shadow-xs cursor-pointer" aria-label="MetaWave Twitter Link">
                  <Twitter size={14} />
                </a>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800/80 hover:border-emerald-500/20 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-all shadow-xs cursor-pointer" aria-label="MetaWave Support Messenger Link">
                  <MessageSquare size={14} />
                </a>
              </div>

              {/* Careers CTA Button */}
              <button
                onClick={() => onNavClick('careers')}
                onMouseEnter={() => onPreload?.('careers')}
                onFocus={() => onPreload?.('careers')}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/15 to-teal-500/15 hover:from-emerald-500/25 hover:to-teal-500/25 border border-emerald-500/30 text-emerald-300 hover:text-white text-xs font-mono font-bold transition-all cursor-pointer group shadow-xs active:scale-95"
                id="footer-careers-button"
              >
                <Briefcase size={13} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Careers</span>
                <span className="px-1.5 py-0.5 bg-emerald-500 text-slate-950 text-[8.5px] font-black rounded uppercase tracking-wider">Hiring</span>
              </button>
            </div>
          </div>

          {/* Nav groups */}
          {footerCols.map((col, idx) => (
            <div key={idx} className="space-y-4 text-left">
              <span className="block text-[10px] font-mono font-black tracking-widest text-emerald-400 uppercase">
                {col.title}
              </span>
              <ul className="space-y-2.5">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <button
                      onClick={() => onNavClick(link.id)}
                      onMouseEnter={() => onPreload?.(link.id)}
                      onFocus={() => onPreload?.(link.id)}
                      className={`text-xs transition-colors text-left font-normal cursor-pointer focus:outline-none flex items-center gap-1.5 ${
                        link.id === 'careers'
                          ? 'text-emerald-400 font-bold hover:text-emerald-300'
                          : link.label.includes('Explore All Services')
                          ? 'text-emerald-400/90 font-semibold hover:text-emerald-300 pt-1'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.id === 'careers' && (
                        <span className="text-[8px] font-mono font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded uppercase">
                          Hiring
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Lower Regulatory & copyright row */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
          <div>
            © {currentYear} MetaWave Innovations (Private) Limited. All Rights Reserved.
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); onNavClick('/privacy-policy'); }} className="hover:text-slate-300 transition-colors cursor-pointer">PRIVACY DIRECTIVE</a>
            <span className="text-slate-800">|</span>
            <a href="/terms-and-conditions" onClick={(e) => { e.preventDefault(); onNavClick('/terms-and-conditions'); }} className="hover:text-slate-300 transition-colors cursor-pointer">SECURITY PROTOCOLS</a>
            <span className="text-slate-800">|</span>
            <button onClick={() => onNavClick('tech-stack')} className="hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer focus:outline-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>SLA NODE GREEN: 99.998% UPTIME</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

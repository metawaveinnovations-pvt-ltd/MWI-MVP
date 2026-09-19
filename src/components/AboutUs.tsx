import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, Globe, CheckCircle2, Scale, Users, 
  ArrowRight, ChevronRight, TrendingUp, FileCheck, Clock, Lock, MapPin
} from 'lucide-react';
import { TeamSection } from './TeamSection';
import mwiCorporateHero from '../assets/images/mwi_corporate_about_hero_1785871621144.jpg';
import mwiHeadquartersOffice from '../assets/images/mwi_headquarters_office_1782517553314.jpg';

interface AboutUsProps {
  onNavigate?: (pageOrSection: string) => void;
}

export function AboutUs({ onNavigate }: AboutUsProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(2026);

  const handleNav = (target: string) => {
    if (onNavigate) {
      onNavigate(target);
    } else {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Core Value Pillars
  const coreValues = [
    {
      title: 'Engineering Craft',
      description: 'Rigorous architectural standards, typed codebases, and zero-compromise security protocols.',
      icon: ShieldCheck
    },
    {
      title: 'Corporate Governance',
      description: 'SECP incorporation, ISO-aligned operations, bulletproof NDAs, and 100% client IP transfer.',
      icon: Scale
    },
    {
      title: 'SLA Accountability',
      description: 'Guaranteed delivery schedules with a proven 99.4% on-time deployment track record globally.',
      icon: Clock
    },
    {
      title: 'Strategic Partnership',
      description: 'Long-term commitment to client success with dedicated executive technical stewardship.',
      icon: Users
    }
  ];

  // Timeline Milestones
  const companyMilestones = [
    {
      year: 2020,
      title: 'Corporate Foundation',
      location: 'Islamabad HQ',
      headline: 'Incorporated under SECP Companies Act 2017',
      description: 'MetaWave Innovations (Private) Limited was established as an enterprise software R&D hub in Islamabad, forming core engineering capabilities and signing its initial corporate clients.',
      highlights: ['SECP Corporate Charter', 'Core Engineering Lab Established', 'First Enterprise Contracts Signed']
    },
    {
      year: 2022,
      title: 'Global Expansion',
      location: 'UK, UAE & North America',
      headline: 'International Service Delivery',
      description: 'Expanded delivery corridors across EMEA and North America, delivering high-performance cloud microservices, ERP integrations, and enterprise mobile platforms.',
      highlights: ['UK & UAE Business Corridors', '50+ High-Impact Deployments', 'Enterprise-Grade Security Standards']
    },
    {
      year: 2024,
      title: 'Applied AI & Cloud Scaling',
      location: 'Global Market',
      headline: 'Enterprise AI & Vector Automation',
      description: 'Integrated advanced LLM pipelines, custom RAG search engines, and automated workflows into core enterprise offerings, establishing dedicated AI research capabilities.',
      highlights: ['Gemini LLM Integrations', 'Sub-50ms Inference Architectures', '150+ Total Delivered Systems']
    },
    {
      year: 2026,
      title: 'Autonomous Enterprise Systems',
      location: '15+ International Corridors',
      headline: 'Agentic Workflows & Cloud Sovereignty',
      description: 'Pioneering autonomous multi-agent software engineering, sovereign cloud infrastructure, and mission-critical digital transformation for global enterprises.',
      highlights: ['Multi-Agent AI Frameworks', '250+ Global Software Projects', '100% Client Code Sovereignty']
    }
  ];

  // Operational Quality Metrics
  const qualityStats = [
    { label: 'Delivered Projects', value: '250+', detail: 'Enterprise platforms & systems' },
    { label: 'On-Time SLA Rate', value: '99.4%', detail: 'Strict delivery schedules' },
    { label: 'Global Presence', value: '15+', detail: 'Active international markets' },
    { label: 'Client IP Transfer', value: '100%', detail: 'Full legal ownership guaranteed' }
  ];

  return (
    <div id="about" className="min-h-screen bg-[#FAFCFB] text-slate-800 font-sans antialiased">
      
      {/* ------------------------------------------------------------------- */}
      {/* 1. EDITORIAL EXECUTIVE HERO SECTION                                  */}
      {/* ------------------------------------------------------------------- */}
      <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/80 bg-gradient-to-b from-white via-[#F4F8F5]/60 to-[#FAFCFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Corporate Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-200/80 bg-white shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#326E45]" />
              <span className="text-[11px] font-semibold tracking-widest text-slate-700 uppercase">
                METAWAVE INNOVATIONS • GLOBAL CORPORATE PROFILE
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-slate-900 leading-[1.12]">
              Architecting High-Impact Digital Software for <span className="text-[#326E45]">Global Enterprises</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              MetaWave Innovations (Private) Limited is a premier software technology company. We build mission-critical web applications, cloud microservices, and AI solutions with uncompromising engineering rigor.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleNav('contact')}
                className="px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              >
                <span>Schedule Executive Consultation</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleNav('solutions')}
                className="px-7 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-sm shadow-2xs transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <span>Our Capabilities</span>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            </div>
          </div>

          {/* Hero Feature Presentation Canvas */}
          <div className="mt-12 lg:mt-16 relative">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-3 sm:p-4 shadow-xl overflow-hidden">
              <div className="relative h-64 sm:h-96 lg:h-[420px] rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={mwiCorporateHero}
                  alt="MetaWave Executive Office Headquarters & R&D Hub"
                  width={1200}
                  height={600}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  // @ts-ignore
                  fetchPriority="high"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = mwiHeadquartersOffice;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                
                {/* Embedded Corporate Identity Badge */}
                <div className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                  <div className="space-y-1 max-w-xl">
                    <span className="text-[11px] font-semibold tracking-widest text-emerald-400 uppercase">
                      CORPORATE HEADQUARTERS & R&D HUB
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                      MetaWave Innovations (Private) Limited
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-normal">
                      Incorporated under the SECP Companies Act 2017 • Enterprise-Grade Security Standards
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-white">
                    <MapPin size={14} className="text-emerald-400" />
                    <span>Islamabad, Pakistan • Global Corridors</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Impact Stats Strip */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {qualityStats.map((stat, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-2xs text-left"
                >
                  <div className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-[#326E45] mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-500 font-normal mt-1">
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 2. CORPORATE FOUNDATION & GOVERNANCE                                 */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-3xl border border-slate-200 bg-[#FAFCFB] p-3 shadow-md overflow-hidden">
                <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-900">
                  <img
                    src={mwiHeadquartersOffice}
                    alt="MetaWave Corporate Center"
                    width={800}
                    height={500}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = mwiCorporateHero;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                      CORPORATE INTEGRITY
                    </span>
                    <div className="text-sm font-bold font-display">Structured Governance & Client Trust</div>
                    <p className="text-xs text-slate-300 font-normal">
                      Full IP code transfer, strict non-disclosure compliance, and transparent reporting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-left">
              
              <div className="space-y-2">
                <span className="text-xs font-semibold tracking-widest text-[#326E45] uppercase">
                  OUR FOUNDATION
                </span>
                <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 tracking-tight leading-tight">
                  Built on Integrity, Corporate Governance, and Engineering Craft
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                MetaWave Innovations (Private) Limited was established with a clear mandate: to elevate custom software development into an exact, high-value corporate discipline. Operating under the SECP Companies Act 2017, we serve clients globally by pairing deep technical architecture with corporate accountability.
              </p>

              {/* Core Corporate Mandates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAFCFB] border border-slate-200/90 space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs font-display">
                    <FileCheck size={16} className="text-[#326E45]" />
                    <span>SECP Incorporated Entity</span>
                  </div>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed">
                    Legally registered corporation with audited financial statements and formal board oversight.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAFCFB] border border-slate-200/90 space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs font-display">
                    <Lock size={16} className="text-emerald-600" />
                    <span>100% IP Code Sovereignty</span>
                  </div>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed">
                    Complete, unencumbered assignment of all source code, patents, and assets to the client.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>



      {/* ------------------------------------------------------------------- */}
      {/* 4. COMPANY EVOLUTION & MILESTONES (OUR JOURNEY OF SUSTAINED GROWTH) */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 border-b border-slate-200/80 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700 shadow-2xs">
              <TrendingUp size={13} className="text-[#326E45]" />
              <span className="text-[11px] font-semibold tracking-widest uppercase">
                CORPORATE TIMELINE & IMPACT
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
              Our Journey of Sustained Growth
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal max-w-xl mx-auto leading-relaxed">
              From our incorporation under SECP in 2020 to expanding cross-border delivery across 15+ international markets.
            </p>
          </div>

          {/* Interactive Timeline Navigation Stepper */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="relative flex items-center justify-between">
              
              {/* Connecting Progress Line */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
              
              {companyMilestones.map((m) => {
                const isSelected = selectedMilestone === m.year;
                return (
                  <button
                    key={m.year}
                    onClick={() => setSelectedMilestone(m.year)}
                    className="relative z-10 flex flex-col items-center group cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-display font-black text-sm transition-all duration-300 border ${
                      isSelected 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-110' 
                        : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400 hover:bg-slate-50 shadow-2xs'
                    }`}>
                      {m.year}
                    </div>

                    <div className={`text-xs font-bold mt-2 transition-colors ${
                      isSelected ? 'text-[#326E45]' : 'text-slate-500 group-hover:text-slate-800'
                    }`}>
                      {m.title}
                    </div>

                    <div className="text-[10px] text-slate-400 font-medium">
                      {m.location}
                    </div>
                  </button>
                );
              })}

            </div>
          </div>

          {/* Active Milestone Highlight Card */}
          <div className="max-w-4xl mx-auto mb-16">
            {companyMilestones.map((m) => {
              if (m.year !== selectedMilestone) return null;
              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#FAFCFB] border-2 border-slate-200 p-8 sm:p-10 rounded-3xl shadow-sm space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#326E45]">
                        <MapPin size={14} />
                        <span>{m.location}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900">{m.headline}</h3>
                    </div>
                    <div className="px-4 py-2 rounded-2xl bg-white border border-slate-200 text-3xl font-display font-black text-slate-900 text-center sm:text-right shrink-0 shadow-2xs">
                      {m.year}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {m.description}
                  </p>

                  <div className="space-y-2 pt-1">
                    <div className="text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                      KEY ERA ACHIEVEMENTS:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {m.highlights.map((h, idx) => (
                        <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 font-semibold flex items-center gap-2.5 shadow-2xs">
                          <CheckCircle2 size={15} className="text-[#326E45] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* All Eras Full Horizon Grid (Complete View) */}
          <div className="max-w-6xl mx-auto pt-6 border-t border-slate-200/80">
            <div className="text-center mb-8">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase block">
                FULL HISTORICAL CHRONOLOGY (2020 — 2026+)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {companyMilestones.map((m) => (
                <div 
                  key={m.year}
                  onClick={() => setSelectedMilestone(m.year)}
                  className={`p-5 rounded-2xl border transition-all duration-300 text-left cursor-pointer space-y-3 ${
                    selectedMilestone === m.year
                      ? 'bg-white border-[#326E45] shadow-md ring-1 ring-[#326E45]/20'
                      : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-white shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-display font-black text-slate-900">{m.year}</span>
                    <span className="text-[10px] font-mono font-bold text-[#326E45] bg-emerald-50 px-2 py-0.5 rounded">
                      {m.title}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-normal line-clamp-3 leading-relaxed">
                    {m.description}
                  </p>

                  <div className="pt-1 text-[11px] font-semibold text-slate-800 flex items-center gap-1">
                    <span>View Era Milestone</span>
                    <ChevronRight size={12} className="text-[#326E45]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 5. EXECUTIVE LEADERSHIP TEAM (SYNCHRONIZED TEAM SECTION)            */}
      {/* ------------------------------------------------------------------- */}
      <TeamSection />

      {/* ------------------------------------------------------------------- */}
      {/* 6. GLOBAL CTA & TECHNICAL CONSULTATION                               */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-emerald-400 text-xs font-semibold">
                <Globe size={14} />
                <span>GLOBAL PARTNERSHIP OPPORTUNITIES</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
                Ready to Build Your Enterprise Platform?
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                Schedule a technical consultation with MetaWave Innovations engineering architects to discuss custom web applications, multi-agent AI systems, or cloud microservices.
              </p>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => handleNav('contact')}
                  className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all duration-300 flex items-center gap-2 cursor-pointer group"
                >
                  <span>Schedule Technical Consultation</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default AboutUs;

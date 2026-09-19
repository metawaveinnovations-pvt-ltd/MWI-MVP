import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  TrendingUp, 
  Award, 
  Sparkles, 
  Layers, 
  Globe, 
  CheckCircle2, 
  Handshake, 
  Eye, 
  Zap, 
  ArrowRight,
  X,
  Calendar,
  ChevronRight
} from 'lucide-react';

interface Differentiator {
  title: string;
  desc: string;
  badge: string;
  icon: any;
  metric: string;
  deliverables?: string[];
  clientOutcome?: string;
}

export function WhyChooseUs() {
  const [selectedDiff, setSelectedDiff] = useState<Differentiator | null>(null);

  const differentiators: Differentiator[] = [
    { 
      title: 'Business-Focused Strategy & ROI', 
      desc: 'We build software that directly supports your business goals, increases revenue, and delivers a clear return on your investment.', 
      badge: 'Measurable Value',
      metric: 'Results Driven',
      icon: TrendingUp,
      clientOutcome: 'Direct commercial alignment ensuring every engineered feature ties back to measurable revenue growth or operating efficiency.',
      deliverables: ['Financial ROI modeling', 'KPI roadmap & milestones', 'Business telemetry integration']
    },
    { 
      title: 'Enterprise-Grade Quality', 
      desc: 'We build secure, stable, and reliable software designed to handle heavy workloads without downtime.', 
      badge: 'High Reliability',
      metric: 'Built to Scale',
      icon: Award,
      clientOutcome: 'Mission-critical architectural stability engineered to eliminate single points of failure across enterprise scale.',
      deliverables: ['99.9% uptime architecture', 'Fault-tolerant clusters', 'End-to-end type safety']
    },
    { 
      title: 'Smart AI & Automation', 
      desc: 'We integrate smart AI tools and automated workflows to save time, reduce repetitive tasks, and speed up operations.', 
      badge: 'Next-Gen Tech',
      metric: 'Smart Workflows',
      icon: Sparkles,
      clientOutcome: 'Intelligent automation pipelines and custom generative AI models that drastically reduce manual operating costs.',
      deliverables: ['Custom LLM integrations', 'Automated document processing', 'Predictive business telemetry']
    },
    { 
      title: 'Scalable Cloud Systems', 
      desc: 'We set up fast and secure cloud infrastructure that smoothly handles growing traffic and peak user demand.', 
      badge: 'Cloud Native',
      metric: 'High Uptime',
      icon: Layers,
      clientOutcome: 'Elastic multi-region infrastructure that auto-scales dynamically during seasonal spikes and exponential user growth.',
      deliverables: ['Auto-scaling Kubernetes nodes', 'Distributed edge caching', 'Zero-downtime deployments']
    },
    { 
      title: 'Global Delivery & Teamwork', 
      desc: 'Our skilled engineering team in Pakistan works closely with clients worldwide to deliver projects on schedule.', 
      badge: 'Always Connected',
      metric: 'Global Reach',
      icon: Globe,
      clientOutcome: 'Seamless 24/7 global sprint execution bridging EMEA, GCC, and APAC timezones with complete transparency.',
      deliverables: ['Overlapping sprint communication', 'Daily asynchronous standups', 'Dedicated delivery management']
    },
    { 
      title: 'Thorough Testing & Security', 
      desc: 'Every feature undergoes rigorous testing and security checks before launch to ensure flawless performance.', 
      badge: 'Tested & Proven',
      metric: 'Zero Compromise',
      icon: CheckCircle2,
      clientOutcome: 'Defense-in-depth security verification preventing vulnerabilities before code reaches production environments.',
      deliverables: ['Automated regression test suites', 'OWASP vulnerability scans', 'Role-based access audits']
    },
    { 
      title: 'Long-Term Tech Partnership', 
      desc: 'We support you well after launch, keeping your systems updated, fast, and optimized as your business grows.', 
      badge: 'Ongoing Support',
      metric: 'Long-Term Growth',
      icon: Handshake,
      clientOutcome: 'Continuous lifecycle partnership providing proactive monitoring, regular tech debt remediation, and ongoing enhancements.',
      deliverables: ['SLA-guaranteed response times', 'Continuous security patching', 'Quarterly roadmap reviews']
    },
    { 
      title: 'Clear & Transparent Progress', 
      desc: 'Stay informed at every step with live progress updates, clear milestones, and direct communication.', 
      badge: 'Total Visibility',
      metric: 'Clear Reporting',
      icon: Eye,
      clientOutcome: 'Full real-time visibility into Git branches, project Kanban boards, and executive status summaries without ambiguity.',
      deliverables: ['Live customer staging environments', 'Direct Slack/Discord bridge', 'Weekly executive milestone reviews']
    },
    { 
      title: 'Fast Agile Delivery', 
      desc: 'We work in quick, focused development sprints to deliver working, market-ready features in weeks instead of months.', 
      badge: 'Quick Turnaround',
      metric: 'Fast to Market',
      icon: Zap,
      clientOutcome: 'Rapid two-week iteration loops that bring functional MVPs and enterprise feature releases quickly to your customers.',
      deliverables: ['Bi-weekly sprint demos', 'Continuous deployment pipelines', 'Rapid market validation']
    }
  ];

  const handleContactClick = () => {
    setSelectedDiff(null);
    const target = document.getElementById('contact') || document.getElementById('booking') || document.getElementById('services');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="why-metawave" className="pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 bg-mwi-base border-b border-mwi-shade-10/40 relative overflow-hidden">
      
      {/* Background soft color blurs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[12%] left-[-8%] w-[520px] h-[520px] rounded-full bg-[#326E45]/[0.03] blur-[130px]" />
        <div className="absolute bottom-[12%] right-[-8%] w-[520px] h-[520px] rounded-full bg-[#245032]/[0.03] blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="w-[990px] max-w-full mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#326E45]/20 bg-[#326E45]/5 shadow-2xs">
            <HelpCircle size={13} className="text-[#326E45]" />
            <span className="text-[11px] font-sans font-bold tracking-wider text-[#2F6547] uppercase">
              The MetaWave Advantage
            </span>
          </div>
          <h2 className="w-[990px] max-w-full mx-auto text-center text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">
            <span className="block">A Better Way to</span>
            <span className="block bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1E293B] bg-clip-text text-transparent">Build Great Software</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            We combine clear business thinking with modern engineering to deliver fast, secure, and reliable software that helps your business grow.
          </p>
        </div>

        {/* 9 Corporate Differentiators Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-6xl mx-auto">
          {differentiators.map((diff, dIdx) => {
            const DiffIcon = diff.icon;
            const indexStr = String(dIdx + 1).padStart(2, '0');

            return (
              <motion.div 
                key={diff.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: dIdx * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedDiff(diff)}
                className="group relative p-7 rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xs shadow-xs hover:border-[#326E45]/60 hover:shadow-xl hover:shadow-[#326E45]/[0.08] transition-all duration-300 text-left flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Luminous top accent line with gradient glow on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#326E45]/20 via-[#326E45] to-[#245032]/20 opacity-0 group-hover:opacity-100 group-hover:from-[#245032] group-hover:via-[#326E45] group-hover:to-emerald-400 transition-all duration-300" />
                
                {/* Soft ambient radial highlight in corner on hover */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-radial from-[#326E45]/15 via-emerald-500/8 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Subtle card interior gradient highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#326E45]/[0.025] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  {/* Card Header with Highlighted Icon, Number Watermark & Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Highlighted Icon Box with Glow Ring */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 via-emerald-100/50 to-white border border-emerald-200/70 flex items-center justify-center text-[#326E45] shadow-xs group-hover:bg-gradient-to-br group-hover:from-[#326E45] group-hover:to-[#245032] group-hover:text-white group-hover:border-[#326E45] group-hover:shadow-md group-hover:shadow-[#326E45]/25 group-hover:scale-105 transition-all duration-300 shrink-0">
                        <DiffIcon size={22} strokeWidth={2.2} />
                      </div>

                      {/* Number Tag */}
                      <span className="font-mono text-[11px] font-bold tracking-wider text-slate-300 group-hover:text-[#326E45] transition-colors">
                        {indexStr}
                      </span>
                    </div>
                    
                    {/* Highlighted Category Badge with Indicator Dot */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-sans font-semibold tracking-wide text-[#2F6547] bg-[#326E45]/8 border border-[#326E45]/20 group-hover:bg-[#326E45]/15 group-hover:border-[#326E45]/35 transition-all shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#326E45] shadow-[0_0_6px_rgba(50,110,69,0.5)] group-hover:scale-125 transition-transform" />
                      <span>{diff.badge}</span>
                    </div>
                  </div>

                  {/* Headings & Descriptions */}
                  <div className="space-y-2.5">
                    <h3 className="text-lg font-display font-bold text-slate-900 tracking-tight group-hover:text-[#326E45] transition-colors leading-snug">
                      {diff.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {diff.desc}
                    </p>
                  </div>

                  {/* Creative Key Advantage Highlight Strip */}
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50/85 border border-slate-100 group-hover:bg-[#326E45]/[0.05] group-hover:border-[#326E45]/20 transition-all duration-300">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
                      <Sparkles size={12} className="text-[#326E45] shrink-0" />
                      <span>Core Advantage</span>
                    </div>
                    <span className="text-[11.5px] font-bold text-slate-900 group-hover:text-[#326E45] tracking-tight transition-colors">
                      {diff.metric}
                    </span>
                  </div>
                </div>

                {/* Card Footer with Highlighted Interactive CTA */}
                <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-slate-500 group-hover:text-slate-800 transition-colors">
                    <CheckCircle2 size={13} className="text-[#326E45] shrink-0" />
                    <span>Enterprise Verified</span>
                  </span>
                  
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100/90 group-hover:bg-[#326E45] text-slate-700 group-hover:text-white text-xs font-semibold shadow-2xs group-hover:shadow-xs group-hover:translate-x-0.5 transition-all duration-200">
                    <span>Learn More</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Interactive Advantage Quick Detail Modal */}
      <AnimatePresence>
        {selectedDiff && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-left"
            >
              {/* Modal Top Ambient Bar */}
              <div className="h-1.5 bg-gradient-to-r from-[#245032] via-[#326E45] to-emerald-400" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedDiff(null)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Close dialog"
              >
                <X size={18} />
              </button>

              <div className="p-6 sm:p-8 space-y-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#326E45] text-white flex items-center justify-center shadow-md shadow-[#326E45]/20 shrink-0">
                    {(() => {
                      const IconComp = selectedDiff.icon;
                      return <IconComp size={24} />;
                    })()}
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-[#2F6547] bg-[#326E45]/10 border border-[#326E45]/20 mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#326E45]" />
                      <span>{selectedDiff.badge}</span>
                    </div>
                    <h3 className="text-xl font-display font-extrabold text-slate-900 tracking-tight">
                      {selectedDiff.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {selectedDiff.desc}
                </p>

                {/* Client Impact Box */}
                {selectedDiff.clientOutcome && (
                  <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1.5">
                    <span className="text-[11px] font-bold text-[#245032] uppercase tracking-wider block flex items-center gap-1.5">
                      <Sparkles size={13} className="text-[#326E45]" />
                      Enterprise Business Impact
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {selectedDiff.clientOutcome}
                    </p>
                  </div>
                )}

                {/* Key Deliverables */}
                {selectedDiff.deliverables && (
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-slate-900 tracking-tight uppercase">
                      What We Deliver
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {selectedDiff.deliverables.map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800 flex items-center gap-2">
                          <CheckCircle2 size={13} className="text-[#326E45] shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Footer Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                    <Sparkles size={13} className="text-[#326E45]" />
                    Advantage: <strong className="text-slate-900">{selectedDiff.metric}</strong>
                  </span>

                  <button
                    onClick={handleContactClick}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#326E45] hover:bg-[#245032] text-white text-xs font-bold shadow-sm shadow-[#326E45]/20 hover:shadow-md transition-all cursor-pointer"
                  >
                    <span>Discuss With Leadership</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}


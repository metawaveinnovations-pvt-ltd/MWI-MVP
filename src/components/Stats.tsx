import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Briefcase, 
  CheckCircle2, 
  Layers, 
  Globe2, 
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface StatItem {
  id: string;
  metricIndex: string;
  value: string;
  number: number;
  suffix: string;
  label: string;
  description: string;
  badge: string;
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
}

export function Stats() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const impactMetrics: StatItem[] = [
    {
      id: 'projects-delivered',
      metricIndex: 'METRIC 01',
      value: '150+',
      number: 150,
      suffix: '+',
      label: 'Projects Delivered',
      badge: 'DELIVERED',
      description: 'Custom digital platforms and business systems.',
      icon: Briefcase
    },
    {
      id: 'delivery-scope',
      metricIndex: 'METRIC 02',
      value: '98%',
      number: 98,
      suffix: '%',
      label: 'Delivery Within Scope',
      badge: 'SLA ACCURACY',
      description: 'Projects delivered against agreed scope.',
      icon: CheckCircle2
    },
    {
      id: 'industries-served',
      metricIndex: 'METRIC 03',
      value: '12+',
      number: 12,
      suffix: '+',
      label: 'Industries Served',
      badge: 'CROSS-SECTOR',
      description: 'Technology across diverse business domains.',
      icon: Layers
    },
    {
      id: 'global-markets',
      metricIndex: 'METRIC 04',
      value: '4+',
      number: 4,
      suffix: '+',
      label: 'Global Markets Served',
      badge: 'INTERNATIONAL',
      description: 'International delivery and collaboration.',
      icon: Globe2
    },
    {
      id: 'ip-ownership',
      metricIndex: 'METRIC 05',
      value: '100%',
      number: 100,
      suffix: '%',
      label: 'IP Ownership',
      badge: 'CLIENT-OWNED',
      description: 'Client-owned source code and project IP.',
      icon: ShieldCheck
    }
  ];

  return (
    <section 
      id="impact-stats"
      className="py-8 sm:py-10 lg:py-12 bg-gradient-to-b from-mwi-tint-40/60 via-white to-mwi-tint-40/60 border-y border-slate-200/80 relative overflow-hidden select-none" 
      ref={containerRef}
    >
      {/* Dynamic Background Grid Pattern & Subtle Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(#326E45 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px'
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[180px] rounded-full bg-[#326E45]/[0.035] blur-[80px]" />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact, High-Hierarchy Header Lockup */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-7 gap-4 pb-4 border-b border-slate-200/80">
          <div className="space-y-1.5 max-w-xl">
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#326E45]/10 border border-[#326E45]/20">
              <span className="h-1.5 w-1.5 rounded-full bg-[#326E45]" />
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#326E45]">
                COMPANY IMPACT & VALUE GENERATION
              </span>
            </div>

            {/* Main Heading */}
            <h2 
              className="text-lg sm:text-xl md:text-2xl font-['Syne',sans-serif] font-[800] tracking-tight text-slate-900 leading-snug"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Built For <span className="text-[#326E45]">Measurable Impact</span>
            </h2>

            {/* Supporting Tagline Directly Underneath Heading */}
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal pt-0.5">
              A snapshot of the experience, scale, and measurable impact behind our work.
            </p>
          </div>

          {/* Opposite/Right Side: Bespoke Floating Interactive Community Token */}
          <div className="shrink-0 pt-2 sm:pt-0 w-full sm:w-auto">
            <a
              href="https://chat.whatsapp.com/BDJZPKYjG5p8Fb5yOZt3qr"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('click')}
              onMouseEnter={() => playSound('hover')}
              id="impact-join-community-cta"
              className="group relative flex items-center gap-3.5 sm:gap-4 p-2.5 sm:p-3 pr-3.5 sm:pr-4 rounded-2xl bg-white hover:bg-emerald-50/30 text-slate-900 border border-slate-200/90 hover:border-emerald-500/60 shadow-[0_8px_30px_-6px_rgba(15,23,42,0.07)] hover:shadow-[0_16px_40px_-8px_rgba(37,211,102,0.22)] hover:-translate-y-0.5 transition-all duration-300 select-none cursor-pointer w-full sm:w-auto overflow-hidden"
            >
              {/* Subtle ambient light wash on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* WhatsApp Kinetic Medallion with Resonance Ring */}
              <div className="relative shrink-0">
                {/* Expanding resonance wave on hover */}
                <div className="absolute -inset-1 rounded-2xl border border-[#25D366]/40 opacity-0 group-hover:opacity-100 group-hover:scale-115 transition-all duration-500 pointer-events-none" />
                
                <div className="relative w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-2xl bg-gradient-to-br from-[#25D366] via-[#20BA56] to-[#128C7E] flex items-center justify-center text-white shadow-[0_6px_20px_rgba(37,211,102,0.35)] group-hover:shadow-[0_8px_24px_rgba(37,211,102,0.5)] group-hover:scale-105 transition-all duration-300">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="translate-x-[0.5px]"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>

                  {/* Active Beacon Pulse */}
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366] ring-2 ring-white" />
                  </span>
                </div>
              </div>

              {/* Central Typographic Lockup */}
              <div className="flex flex-col text-left min-w-0 pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] sm:text-[10.5px] font-mono font-bold tracking-wider uppercase text-[#326E45] leading-none">
                    WhatsApp Community
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                
                <span 
                  className="text-[15px] sm:text-[17px] font-['Syne',sans-serif] font-[800] text-slate-900 group-hover:text-[#205737] tracking-tight leading-snug mt-0.5 transition-colors"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Join Community
                </span>

                {/* Refined Supporting Visual Cue: Peer Exchange */}
                <div className="flex items-center gap-1.5 mt-0.5">
                  {/* Subtle member preview dots */}
                  <div className="flex -space-x-1 items-center shrink-0">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#326E45] ring-1 ring-white" />
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 ring-1 ring-white" />
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-400 ring-1 ring-white" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 group-hover:text-slate-700 transition-colors truncate">
                    Direct founder & engineering exchange
                  </span>
                </div>
              </div>

              {/* Kinetic Action Satellite Indicator */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-50 group-hover:bg-[#205737] border border-slate-200/90 group-hover:border-[#205737] text-slate-600 group-hover:text-white flex items-center justify-center transition-all duration-300 ml-auto shrink-0 shadow-2xs group-hover:scale-105 group-hover:rotate-45">
                <ArrowUpRight size={16} strokeWidth={2.2} className="transition-transform" />
              </div>
            </a>
          </div>
        </div>

        {/* 5-Column Compact Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5 lg:gap-4">
          {impactMetrics.map((stat, idx) => (
            <CompactStatCard
              key={stat.id}
              stat={stat}
              index={idx}
              startTrigger={isInView}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Compact Stat Card Component with Mouse Spotlighting & Smooth Counter
// -----------------------------------------------------------------------------
interface CompactStatCardProps {
  stat: StatItem;
  index: number;
  startTrigger: boolean;
}

function CompactStatCard({ 
  stat, 
  index, 
  startTrigger 
}: CompactStatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [counter, setCounter] = useState(0);

  // Smooth Counter Animation
  useEffect(() => {
    if (!startTrigger) return;

    let start = 0;
    const end = stat.number;
    const duration = 900 + index * 70;
    const startTime = performance.now();

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * end);

      setCounter(current);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCounter(end);
      }
    };

    const animFrame = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animFrame);
  }, [startTrigger, stat.number, index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const CardIcon = stat.icon;

  return (
    <motion.div
      ref={cardRef}
      id={`impact-card-${stat.id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={startTrigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => playSound('hover')}
      className="group relative rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-xs p-3.5 sm:p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-[#326E45]/40 overflow-hidden flex flex-col justify-between last:col-span-2 sm:last:col-span-1 lg:last:col-span-1"
    >
      {/* Dynamic Cursor Spotlight Sheen */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(130px circle at ${mousePos.x}px ${mousePos.y}px, rgba(50, 110, 69, 0.08), transparent 70%)`
        }}
      />

      {/* Top Accent Line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-[#326E45] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      {/* Top Row: Icon & Metric Tag */}
      <div className="flex items-center justify-between mb-2 relative z-10">
        <div className="w-7 h-7 rounded-lg bg-[#326E45]/10 text-[#326E45] flex items-center justify-center group-hover:bg-[#326E45] group-hover:text-white transition-all duration-200 shadow-2xs">
          <CardIcon size={14} />
        </div>
        <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 group-hover:text-[#326E45] transition-colors uppercase">
          {stat.metricIndex}
        </span>
      </div>

      {/* Center Numerical Metric (Strongest Visual Element) */}
      <div className="relative z-10 my-0.5">
        <div className="flex items-baseline">
          <span 
            className="text-2xl sm:text-[26px] font-['Syne',sans-serif] font-[800] tracking-tight text-slate-900 leading-none group-hover:text-[#326E45] transition-colors"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {counter === 0 ? stat.number : counter}
          </span>
          <span className="text-base sm:text-lg font-['Syne',sans-serif] font-bold text-[#326E45] ml-0.5">
            {stat.suffix}
          </span>
        </div>

        {/* Clear Label */}
        <h3 className="text-[12px] font-bold text-slate-900 tracking-tight mt-1 leading-snug truncate">
          {stat.label}
        </h3>

        {/* Subtle, Secondary Short Description */}
        <p className="text-[10px] sm:text-[10.5px] text-slate-500 mt-0.5 font-normal leading-tight line-clamp-2">
          {stat.description}
        </p>
      </div>

      {/* Bottom Factual Tag */}
      <div className="pt-2 mt-2 border-t border-slate-100/90 flex items-center justify-between relative z-10">
        <span className="text-[8.5px] font-mono text-[#326E45] font-semibold tracking-wider flex items-center gap-0.5">
          {stat.badge}
          <ArrowUpRight size={9} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </span>
        <span className="text-[8px] font-mono text-slate-400 font-medium">
          VERIFIED
        </span>
      </div>
    </motion.div>
  );
}


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  ShieldCheck, 
  Zap, 
  Server, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Check, 
  Building,
  FileCheck,
  RefreshCw,
  Sliders,
  ExternalLink,
  ChevronRight,
  Code2,
  Sparkles,
  Layers,
  Award
} from 'lucide-react';
import { playSound } from '../../utils/audio';

interface EnterpriseProjectsTabProps {
  onNavigate?: (sectionId: string) => void;
  onSelectProjectTab?: (tab: string) => void;
}

export const EnterpriseProjectsTab: React.FC<EnterpriseProjectsTabProps> = ({ 
  onNavigate,
  onSelectProjectTab
}) => {
  const [selectedRegion, setSelectedRegion] = useState<number>(0);

  const REGIONS = [
    {
      country: 'United Kingdom',
      badge: '42 Commercial Systems',
      headline: 'Regulated Healthcare & Commercial Portals',
      description: 'Mission-critical care home networks, clinical patient record platforms, and high-volume commercial portals designed for national compliance.',
      stat: '99.99%',
      statLabel: 'Verified Uptime SLA',
      compliance: 'NHS DSPT & UK GDPR Article 9 Compliant',
      highlights: ['AES-256 Resident Records', 'NHS Care Home Portal', 'High-Traffic E-Commerce'],
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80'
    },
    {
      country: 'North America',
      badge: '58 Commercial Systems',
      headline: 'FinTech & High-Throughput PropTech SaaS',
      description: 'Institutional asset valuation platforms, automated multi-tenant escrow settlement engines, and distributed enterprise cloud infrastructure.',
      stat: '<120ms',
      statLabel: 'Average Edge Latency',
      compliance: 'SOC 2 Type II Readiness & PCI-DSS L1',
      highlights: ['$12B+ Asset Valuation', 'Multi-Tenant Escrow', 'Automated Reconciliation'],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80'
    },
    {
      country: 'Middle East & Asia',
      badge: '50+ Commercial Systems',
      headline: 'IoT Fleet Telemetry & Supply Chain ERP',
      description: 'Nationwide distribution networks, high-concurrency commercial retail clusters, and continuous real-time vehicle dispatch platforms.',
      stat: '50,000+',
      statLabel: 'Daily Active Trips',
      compliance: 'High-Concurrency Cluster Architecture',
      highlights: ['Sub-50ms Telemetry Stream', 'Offline Driver Sync', 'Dynamic Depot Balancing'],
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80'
    }
  ];

  const CAPABILITIES = [
    {
      icon: Server,
      title: 'Scalable Microservices',
      subtitle: 'Stateless Containerized Clusters',
      description: 'Engineered with automated load-balancing and intelligent edge caching to sustain unpredictable global traffic surges with zero degradation.',
      metrics: [
        { label: 'Throughput', value: '10k+ Req/s' },
        { label: 'Edge Latency', value: '<150ms' },
        { label: 'Deployment', value: 'Zero-Downtime' }
      ]
    },
    {
      icon: ShieldCheck,
      title: '100% IP Ownership',
      subtitle: 'Full Client Code Assignment',
      description: 'Zero proprietary vendor lock-in. Complete source repositories, infrastructure-as-code scripts, and architectural guides transfer directly upon release.',
      metrics: [
        { label: 'Licensing', value: 'Full Handover' },
        { label: 'CI/CD Pipelines', value: 'Included' },
        { label: 'Documentation', value: 'Team Ready' }
      ]
    },
    {
      icon: RefreshCw,
      title: 'Active Redundancy',
      subtitle: 'Multi-Region High Availability',
      description: 'Resilient stateful architectures with automated health probes, point-in-time state recovery, and rapid failover redirection.',
      metrics: [
        { label: 'Availability', value: '99.99% SLA' },
        { label: 'Recovery Point', value: '<60 Seconds' },
        { label: 'Recovery Time', value: '<15 Minutes' }
      ]
    }
  ];

  return (
    <div className="space-y-12 animate-fade-in text-slate-900">
      {/* 1. DISTINCTIVE ASYMMETRIC EDITORIAL HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-50/90 via-white to-emerald-50/20 border border-slate-200/80 p-6 sm:p-10 lg:p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/[0.05] rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#326E45]" />
                Enterprise Production Matrix
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-xs font-medium text-[#326E45]">
                12 Sovereign Nations
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-slate-900 leading-[1.12]">
              Architected for continental reach and{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#326E45] via-teal-700 to-emerald-700">
                uncompromising reliability.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              Over 150 enterprise web platforms, mobile backbones, and custom ERP systems deployed with active multi-region availability and complete client source code ownership.
            </p>

            {/* Quick Proof Points */}
            <div className="pt-2 flex flex-wrap items-center gap-6 sm:gap-8 border-t border-slate-200/70 text-slate-700">
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-display text-slate-900 block">150+</span>
                <span className="text-xs font-medium text-slate-500">Shipped Deployments</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-display text-[#326E45] block">99.99%</span>
                <span className="text-xs font-medium text-slate-500">Uptime SLA Guarantee</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-display text-teal-700 block">100%</span>
                <span className="text-xs font-medium text-slate-500">IP Transfer to Client</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100 group aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&auto=format&fit=crop&q=80" 
                alt="Global Enterprise Architectural Scale" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-medium text-white self-start mb-2">
                  <ShieldCheck size={13} className="text-emerald-300" />
                  <span>Tier-4 Cloud Infrastructure</span>
                </div>
                <p className="text-xs text-white/90 font-normal leading-relaxed">
                  Zero critical CVEs across all client production releases, verified by automated security gates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REGIONAL DELIVERY MATRIX: MAGAZINE SPREAD WITH INTERACTIVE SELECTOR */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#326E45] uppercase tracking-wider">
              International Reach
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              Regional Operations & Compliance Profiles
            </h2>
          </div>

          {/* Segmented Controller */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 self-start sm:self-auto">
            {REGIONS.map((r, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  playSound('nav');
                  setSelectedRegion(idx);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedRegion === idx
                    ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r.country}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Regional Spotlight Spread */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRegion}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-[#326E45] text-xs font-semibold">
                  {REGIONS[selectedRegion].badge}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  {REGIONS[selectedRegion].compliance}
                </span>
              </div>

              <h3 className="text-2xl font-bold font-display text-slate-900">
                {REGIONS[selectedRegion].headline}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {REGIONS[selectedRegion].description}
              </p>

              {/* Tag Highlights */}
              <div className="flex flex-wrap gap-2 pt-2">
                {REGIONS[selectedRegion].highlights.map((item, i) => (
                  <span 
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700"
                  >
                    <CheckCircle2 size={13} className="text-[#326E45]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Region Visual & Stat Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[16/10] relative shadow-2xs">
                <img 
                  src={REGIONS[selectedRegion].image}
                  alt={REGIONS[selectedRegion].country}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-medium text-white px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-sm border border-white/20">
                    {REGIONS[selectedRegion].country} Production Fleet
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Key Operating Metric</span>
                  <span className="text-2xl font-bold font-display text-[#326E45]">
                    {REGIONS[selectedRegion].stat}
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-700 text-right max-w-[140px]">
                  {REGIONS[selectedRegion].statLabel}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 3. CORE ARCHITECTURAL COMMITMENTS: 3 REFINED EDITORIAL PILLARS */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#326E45] uppercase tracking-wider">
            Engineering Foundations
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
            Enterprise Architecture Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div 
                key={idx}
                className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6 hover:border-[#326E45]/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#326E45] flex items-center justify-center border border-emerald-100">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-900">
                      {cap.title}
                    </h3>
                    <span className="text-xs font-medium text-[#326E45]">
                      {cap.subtitle}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  {cap.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">{m.label}</span>
                      <span className="font-semibold text-slate-900">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SLA & PRODUCTION ASSURANCE LEDGER */}
      <section className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#326E45] uppercase tracking-wider">
              Operational Standards
            </span>
            <h3 className="text-xl font-bold font-display text-slate-900">
              Production SLA Benchmarks
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <ShieldCheck size={14} className="text-[#326E45]" />
            Continuous Verification
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              metric: 'Edge Latency',
              value: '<150ms',
              standard: 'Industry standard: 600ms',
              desc: 'Sub-second response globally via Cloudflare edge routing.'
            },
            {
              metric: 'Cluster Uptime',
              value: '99.99%',
              standard: 'Industry standard: 99.5%',
              desc: 'Redundant active-active nodes with automated health check.'
            },
            {
              metric: 'Disaster Recovery',
              value: '<60s',
              standard: 'Industry standard: 24h',
              desc: 'Rapid snapshot rollback ensuring continuity of operations.'
            },
            {
              metric: 'Client Code Rights',
              value: '100%',
              standard: 'Industry standard: Vendor Lock-in',
              desc: 'Direct repository transfer and full IP assignment.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                {item.metric}
              </span>
              <div className="text-2xl font-bold font-display text-[#326E45]">
                {item.value}
              </div>
              <span className="text-[11px] font-medium text-slate-400 block">
                {item.standard}
              </span>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

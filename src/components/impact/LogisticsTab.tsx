import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Activity,
  Gauge,
  WifiOff,
  Boxes,
  Compass,
  Building,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { playSound } from '../../utils/audio';

interface LogisticsTabProps {
  onNavigate?: (sectionId: string) => void;
  onOpenModal?: (caseStudyId: string) => void;
}

export const LogisticsTab: React.FC<LogisticsTabProps> = ({ onNavigate, onOpenModal }) => {
  const [activeFleetView, setActiveFleetView] = useState<'telemetry' | 'route' | 'depot'>('telemetry');

  const FLEET_VIEWS = {
    telemetry: {
      title: 'Real-Time Vehicle Ingress & Sensor Brokerage',
      badge: '<50ms Telemetry Stream',
      tagline: 'Continuous Asset Visibility',
      description: 'Ingests sub-second GPS coordinates, engine diagnostics, fuel consumption metrics, and cabin temperature from hundreds of distributed vehicles simultaneously.',
      icon: Activity,
      points: [
        'High-frequency MQTT broker ingestion handling 15,000+ messages/sec',
        'Automatic geo-fence trigger detection for automated warehouse arrivals',
        'Real-time temperature logging for cold-chain compliance guarantees'
      ],
      telemetryItems: [
        { label: 'Active Fleet Vehicles', value: '420 Units', status: 'Online' },
        { label: 'Ingress Throughput', value: '15.2k Msg/s', status: 'Optimal' },
        { label: 'Average Packet Latency', value: '38ms', status: 'Sub-second' }
      ]
    },
    route: {
      title: 'Dynamic Graph Route Optimization & Recalculation',
      badge: '+32% Fuel Efficiency',
      tagline: 'Algorithmic Dispatch Efficiency',
      description: 'Calculates optimal delivery stop sequences considering live urban traffic, vehicle weight constraints, and customer delivery time windows.',
      icon: Navigation,
      points: [
        'Sub-second route re-optimization when unexpected roadblocks occur',
        'Dynamic payload balancing prevents vehicle overloads across depots',
        'Turn-by-turn navigation dispatched instantly to driver mobile apps'
      ],
      telemetryItems: [
        { label: 'Route Solve Time', value: '<1.2s', status: 'Instant' },
        { label: 'Mileage Saved Monthly', value: '48,000 km', status: 'Verified' },
        { label: 'On-Time Window Rate', value: '98.8%', status: 'Surpassed' }
      ]
    },
    depot: {
      title: 'Offline-First Driver App & Proof-of-Delivery Sync',
      badge: 'Zero Delivery Disputes',
      tagline: 'Reliable Field Execution',
      description: 'Mobile applications maintain full barcode scanning, digital signature capture, and customer invoice generation even in rural zones with zero cellular signal.',
      icon: WifiOff,
      points: [
        'Local SQLite synchronization ensures zero data loss during dead zones',
        'Encrypted digital signatures and photographic delivery proof stored securely',
        'Automated background upload immediately upon cellular signal reconnection'
      ],
      telemetryItems: [
        { label: 'Dispute Rate', value: '0.02%', status: 'Industry Leading' },
        { label: 'Offline Sync Speed', value: '<500ms', status: 'Atomic' },
        { label: 'Invoices Generated Daily', value: '50,000+', status: 'Automated' }
      ]
    }
  };

  const currentView = FLEET_VIEWS[activeFleetView];
  const CurrentIcon = currentView.icon;

  return (
    <div className="space-y-12 animate-fade-in text-slate-900">
      {/* 1. EDITORIAL LOGISTICS HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-50/90 via-white to-emerald-50/25 border border-slate-200/80 p-6 sm:p-10 lg:p-12">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/[0.04] rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#326E45]" />
                Fleet Telemetry & Logistics ERP
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-xs font-medium text-[#326E45]">
                50,000+ Daily Fleet Deliveries
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-slate-900 leading-[1.12]">
              Real-time dispatch and{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#326E45] via-teal-700 to-emerald-700">
                high-throughput logistics infrastructure.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              Powering regional supply chain networks with sub-50ms IoT vehicle tracking, dynamic route graph solvers, and offline-first mobile delivery applications.
            </p>

            {/* Fleet Metrics Ledger */}
            <div className="pt-2 flex flex-wrap items-center gap-6 sm:gap-8 border-t border-slate-200/70 text-slate-700">
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-display text-slate-900 block">50,000+</span>
                <span className="text-xs font-medium text-slate-500">Daily Fleet Runs</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-display text-[#326E45] block">+32%</span>
                <span className="text-xs font-medium text-slate-500">Fuel Optimization</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-display text-teal-700 block">&lt;1.2s</span>
                <span className="text-xs font-medium text-slate-500">Route Recalculation</span>
              </div>
            </div>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100 group aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&auto=format&fit=crop&q=80" 
                alt="Commercial Fleet Operations and Supply Chain Logistics" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-medium text-white self-start mb-2">
                  <ShieldCheck size={13} className="text-emerald-300" />
                  <span>Sub-Second Telemetry Synchronization</span>
                </div>
                <p className="text-xs text-white/90 font-normal leading-relaxed">
                  Real-time GPS tracking and proof-of-delivery sign-offs across high-density regional distribution routes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE FLEET DISPATCH CONSOLE */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#326E45] uppercase tracking-wider">
              Fleet Operations Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              Fleet Dispatch & Route Optimization Console
            </h2>
          </div>

          {/* Switcher Controls */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 self-start sm:self-auto">
            <button
              onClick={() => {
                playSound('click');
                setActiveFleetView('telemetry');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeFleetView === 'telemetry'
                  ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              IoT Ingress
            </button>
            <button
              onClick={() => {
                playSound('click');
                setActiveFleetView('route');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeFleetView === 'route'
                  ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Route Graph
            </button>
            <button
              onClick={() => {
                playSound('click');
                setActiveFleetView('depot');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeFleetView === 'depot'
                  ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Driver Offline
            </button>
          </div>
        </div>

        {/* Selected View Details (LIGHT & BRIGHT - NO DARK CONTAINERS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/70 text-[#326E45] text-xs font-semibold">
                  {currentView.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">• {currentView.tagline}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                {currentView.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {currentView.description}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {currentView.points.map((pt, pIdx) => (
                <div key={pIdx} className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/60 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-emerald-100 text-[#326E45] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={13} />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {pt}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Live Dispatch Monitor Card (Light & Bright Corporate Style) */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-mono font-bold text-[#326E45] uppercase tracking-wider">
                Live Dispatch State
              </span>
              <CurrentIcon size={18} className="text-[#326E45]" />
            </div>

            <div className="space-y-3">
              {currentView.telemetryItems.map((item, iIdx) => (
                <div key={iIdx} className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">{item.label}</span>
                    <span className="text-[11px] text-[#326E45] font-semibold">{item.status}</span>
                  </div>
                  <span className="text-base font-bold font-display text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 text-xs text-slate-600 space-y-1">
              <span className="font-semibold text-slate-800 block">Failover Cluster Guarantee</span>
              <p className="text-[11.5px] leading-relaxed">
                Telemetry broker connected via redundant bidirectional sockets with zero-packet-drop failover.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CASE STUDY: SHAFAAF WATER LOGISTICS ERP */}
      <section className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#326E45] uppercase tracking-wider">
              Featured Case Study
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              Shafaaf Mineral Water Distribution Logistics ERP
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-xs font-semibold text-[#326E45] self-start sm:self-auto">
            Live Production
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 aspect-[16/11] bg-slate-100 relative group shadow-2xs">
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80" 
              alt="Shafaaf Water Distribution ERP" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-medium text-white px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-sm border border-white/20">
                50,000+ DELIVERIES • ROUTE OPTIMIZATION & PROOF OF DELIVERY
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900">
                Nationwide Commercial Water Distribution, Vehicle Stock & Mobile Invoicing
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Engineered a mission-critical distribution ERP system coordinating high-volume regional delivery fleets. Integrated mobile driver apps for offline barcode scanning, digital proof-of-delivery receipts, and dynamic vehicle load balancing against central warehouse inventory.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-center">
                <span className="text-[10px] font-mono font-semibold text-slate-400 block uppercase">Daily Trips</span>
                <span className="text-xl sm:text-2xl font-bold font-display text-[#326E45]">50,000+</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-center">
                <span className="text-[10px] font-mono font-semibold text-slate-400 block uppercase">Fuel Saved</span>
                <span className="text-xl sm:text-2xl font-bold font-display text-[#326E45]">+32%</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-center">
                <span className="text-[10px] font-mono font-semibold text-slate-400 block uppercase">Dispute Rate</span>
                <span className="text-xl sm:text-2xl font-bold font-display text-teal-700">0.02%</span>
              </div>
            </div>

            {/* Triggers */}
            <div className="pt-3">
              {onOpenModal && (
                <button
                  onClick={() => {
                    playSound('click');
                    onOpenModal('shafaaf-water-erp');
                  }}
                  className="px-5 py-2.5 bg-[#326E45] hover:bg-[#285737] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <span>View Complete Case Study</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. SUPPLY CHAIN RELIABILITY GUARANTEE */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'Sub-Second Sync', subtitle: 'Atomic synchronization upon network reconnection', icon: RefreshCw },
          { title: 'Active Clusters', subtitle: 'Zero single points of failure across brokers', icon: Activity },
          { title: 'Geo-Drift Filtering', subtitle: 'Dead-reckoning algorithm filters false GPS jumps', icon: Compass },
          { title: 'Cryptographic POD', subtitle: 'Immutable digital signatures and photo verification', icon: ShieldCheck }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-2 hover:border-[#326E45]/40 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#326E45] flex items-center justify-center border border-emerald-100/60">
                <Icon size={16} />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-display">
                {item.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed font-normal">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

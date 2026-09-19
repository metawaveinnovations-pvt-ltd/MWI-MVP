import React from 'react';
import { motion } from 'motion/react';
import { 
  Folder, 
  Globe, 
  Heart, 
  DollarSign, 
  GraduationCap, 
  Truck, 
  Sparkles,
  Layers
} from 'lucide-react';
import { playSound } from '../../utils/audio';

export type ImpactTabId = 
  | 'portfolio' 
  | 'enterprise-projects' 
  | 'healthtech-case-studies' 
  | 'fintech-proptech-outcomes' 
  | 'edtech-learning-impact' 
  | 'supply-chain-logistics';

export interface ImpactSubNavProps {
  activeTab: ImpactTabId;
  onSelectTab: (tabId: ImpactTabId) => void;
}

export const IMPACT_TABS: {
  id: ImpactTabId;
  label: string;
  badge: string;
  metric: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}[] = [
  {
    id: 'portfolio',
    label: 'Global Portfolio',
    badge: '14+ Systems',
    metric: 'Production Ready',
    icon: Folder,
  },
  {
    id: 'enterprise-projects',
    label: '150+ Shipped Projects',
    badge: '12 Nations',
    metric: '<150ms TTFB',
    icon: Globe,
  },
  {
    id: 'healthtech-case-studies',
    label: 'HealthTech & EHR',
    badge: '2.5M+ Records',
    metric: '99.99% Uptime',
    icon: Heart,
  },
  {
    id: 'fintech-proptech-outcomes',
    label: 'FinTech & PropTech',
    badge: '$12B+ Assets',
    metric: 'PCI-DSS L1',
    icon: DollarSign,
  },
  {
    id: 'edtech-learning-impact',
    label: 'EdTech & Learning',
    badge: '85k+ Students',
    metric: 'LMS Cores',
    icon: GraduationCap,
  },
  {
    id: 'supply-chain-logistics',
    label: 'Supply Chain & Logistics',
    badge: '50k+ Trips',
    metric: 'IoT Sync',
    icon: Truck,
  },
];

export const ImpactSubNav: React.FC<ImpactSubNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <div className="w-full bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-2 sm:p-2.5 shadow-sm shadow-slate-150">
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between px-2 pb-2 mb-1.5 border-b border-slate-100 text-[10.5px]">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
          </span>
          <span className="font-semibold text-slate-900 tracking-wide">
            Enterprise Impact & Sector Portfolio
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-[#326E45] font-medium hidden sm:inline">
            Verified Production Deployments
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 font-mono text-[9.5px]">
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/70 font-semibold text-emerald-800">
            6 Specialized Sectors
          </span>
        </div>
      </div>

      {/* Tab Selector Buttons */}
      <div 
        className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none no-scrollbar"
        role="tablist"
        aria-label="Impact Sub-tabs"
      >
        {IMPACT_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                playSound('nav');
                onSelectTab(tab.id);
              }}
              className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-[13px] font-semibold transition-all duration-200 shrink-0 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#326E45] ${
                isActive
                  ? 'bg-[#326E45] text-white shadow-sm shadow-[#326E45]/20'
                  : 'bg-slate-50/80 hover:bg-slate-100/90 text-slate-700 hover:text-slate-900 border border-slate-200/70 hover:border-slate-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-white text-[#326E45] border border-[#326E45]/15 shadow-2xs'
                }`}
              >
                <Icon size={13} />
              </div>

              <div className="flex flex-col text-left leading-tight">
                <span className="truncate whitespace-nowrap">{tab.label}</span>
                <span
                  className={`text-[9.5px] font-mono tracking-tight font-medium ${
                    isActive ? 'text-emerald-100' : 'text-slate-400'
                  }`}
                >
                  {tab.badge}
                </span>
              </div>

              {isActive && (
                <motion.span 
                  layoutId="activeTabPill"
                  className="w-1.5 h-1.5 rounded-full bg-emerald-300 shrink-0 ml-1 shadow-xs"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

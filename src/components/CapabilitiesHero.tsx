import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Terminal, 
  ArrowRight, 
  Radio, 
  Sliders, 
  Sparkles,
  Zap,
  Layers,
  ChevronRight,
  ExternalLink,
  Code2,
  Cloud,
  Palette,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { CAPABILITIES_DATA, CapabilityGroup } from '../data/capabilitiesData';
import { playSound } from '../utils/audio';

interface CapabilitiesHeroProps {
  activeGroupId: string;
  onSelectGroup: (groupId: string) => void;
  onNavigate?: (route: string) => void;
}

// Enterprise Strategic Objectives for quick-matching
interface ObjectiveScenario {
  id: string;
  label: string;
  targetGroupId: string;
  subserviceName: string;
  slaTarget: string;
  rationale: string;
}

const STRATEGIC_OBJECTIVES: ObjectiveScenario[] = [
  {
    id: 'scale-infra',
    label: 'Scale Infrastructure to 10M+ Users',
    targetGroupId: 'cloud-data-infrastructure',
    subserviceName: 'DevOps & CI/CD Pipelines',
    slaTarget: '99.99% Uptime Guarantee',
    rationale: 'Zero-downtime blue/green deployments, auto-scaling Kubernetes clusters, and sub-100ms multi-region routing.'
  },
  {
    id: 'deploy-agents',
    label: 'Deploy Autonomous LLM & AI Agents',
    targetGroupId: 'ai-automation-smart-systems',
    subserviceName: 'Custom AI Agents & Copilots',
    slaTarget: 'Sub-300ms Inference Latency',
    rationale: 'Enterprise RAG architectures, local vector indexing, and zero-data-leakage governance framework.'
  },
  {
    id: 'mission-critical-apps',
    label: 'Build High-Performance Web & Mobile Apps',
    targetGroupId: 'software-engineering',
    subserviceName: 'Custom Web Applications',
    slaTarget: '100% Type-Safe & 99.4% Test Coverage',
    rationale: 'React 19, TypeScript, Next.js / Vite architectures optimized for Core Web Vitals and transactional security.'
  },
  {
    id: 'design-system',
    label: 'Unify Enterprise Design System',
    targetGroupId: 'design-creative',
    subserviceName: 'UI/UX & Product Design',
    slaTarget: '+44% User Retention',
    rationale: 'Figma token architecture, WCAG 2.1 AAA accessibility, and synchronized design-to-code pipelines.'
  },
  {
    id: 'accelerate-revenue',
    label: 'Scale Organic Inbound & SEO Pipeline',
    targetGroupId: 'growth-marketing-digital-strategy',
    subserviceName: 'Technical SEO & Programmatic Pages',
    slaTarget: '4.8x Pipeline Growth',
    rationale: 'Semantic schema injection, headless CMS integrations, and programmatic landing page generation.'
  }
];

export const CapabilitiesHero: React.FC<CapabilitiesHeroProps> = ({
  activeGroupId,
  onSelectGroup,
  onNavigate
}) => {
  const [viewMode, setViewMode] = useState<'topology' | 'matrix'>('topology');
  const [activeObjectiveId, setActiveObjectiveId] = useState<string>('scale-infra');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const activeGroup = CAPABILITIES_DATA.find(g => g.id === activeGroupId) || CAPABILITIES_DATA[0];
  const activeObjective = STRATEGIC_OBJECTIVES.find(o => o.id === activeObjectiveId) || STRATEGIC_OBJECTIVES[0];

  const handleGroupClick = (groupId: string) => {
    playSound('nav');
    if (onNavigate) {
      onNavigate(groupId);
    } else {
      onSelectGroup(groupId);
    }
  };

  const handleObjectiveClick = (objective: ObjectiveScenario) => {
    playSound('toggle');
    setActiveObjectiveId(objective.id);
    if (onNavigate) {
      onNavigate(objective.targetGroupId);
    } else {
      onSelectGroup(objective.targetGroupId);
    }
  };

  // Node positions in the SVG topology (relative to 600x420 viewBox)
  const nodeCoordinates: Record<string, { x: number; y: number; label: string; icon: any }> = {
    'design-creative': { x: 120, y: 110, label: '01 Design', icon: Palette },
    'software-engineering': { x: 480, y: 110, label: '02 Engineering', icon: Code2 },
    'cloud-data-infrastructure': { x: 120, y: 310, label: '03 Cloud Substrate', icon: Cloud },
    'ai-automation-smart-systems': { x: 480, y: 310, label: '04 AI & Agents', icon: Sparkles },
    'growth-marketing-digital-strategy': { x: 300, y: 360, label: '05 Growth Engine', icon: TrendingUp },
  };

  const centerCoord = { x: 300, y: 200 };

  return (
    <section className="relative w-full overflow-hidden bg-[#FAFBFD] border-b border-slate-200/90 pt-8 pb-14 md:pt-12 md:pb-20">
      {/* Precision Blueprint Coordinate Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, #326E45 1px, transparent 0),
            linear-gradient(to right, #0F172A 1px, transparent 1px),
            linear-gradient(to bottom, #0F172A 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px, 96px 96px, 96px 96px',
        }}
      />

      {/* Ambient Radial Vignette */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#326E45]/[0.035] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/[0.025] rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SYSTEM TELEMETRY STRIP */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 sm:pb-8 border-b border-slate-200/80 mb-8 sm:mb-12 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-slate-500">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white border border-slate-200/90 shadow-3xs">
              <span className="w-2 h-2 rounded-full bg-[#326E45] animate-pulse" />
              <span className="text-[11px] font-bold text-slate-800 tracking-wide">
                CAPABILITIES ENGINE v4.2
              </span>
            </div>
            <span className="hidden md:inline text-slate-300">/</span>
            <div className="flex items-center gap-1.5 text-[11px]">
              <ShieldCheck size={13} className="text-[#326E45]" />
              <span className="text-slate-700 font-semibold">SOC2 & ISO 27001 AUDITED</span>
            </div>
            <span className="hidden md:inline text-slate-300">/</span>
            <div className="flex items-center gap-1.5 text-[11px]">
              <Radio size={13} className="text-[#326E45]" />
              <span className="text-slate-600 font-medium">5 CLUSTERS // 30 PRACTICES</span>
            </div>
          </div>

          {/* Interactive Layout View Switcher */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200/90 shadow-3xs self-end sm:self-auto">
            <button
              onClick={() => {
                playSound('click');
                setViewMode('topology');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'topology'
                  ? 'bg-[#326E45] text-white shadow-3xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Radio size={12} />
              <span>Interactive Topology</span>
            </button>
            <button
              onClick={() => {
                playSound('click');
                setViewMode('matrix');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-[#326E45] text-white shadow-3xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sliders size={12} />
              <span>SLA Architecture Matrix</span>
            </button>
          </div>
        </div>

        {/* HERO MAIN BODY: ASYMMETRIC COMMAND DECK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: THE EDITORIAL ARCHITECTURAL MASTHEAD (7 COLS) */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6">
            
            {/* Index Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#326E45]">
              <Sparkles size={13} className="text-[#326E45]" />
              <span className="font-mono text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest">
                ARCHITECTURAL CAPABILITY MATRIX
              </span>
            </div>

            {/* Sculptural Display Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-[1.08]">
                Architecting Enterprise Sovereignty.
                <span className="block mt-1 bg-gradient-to-r from-[#326E45] via-emerald-600 to-teal-700 bg-clip-text text-transparent">
                  From Atomic Code to Distributed Intelligence.
                </span>
              </h1>
              
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl pt-1">
                MetaWave organizes high-stakes digital transformation into five synchronized disciplines 
                and thirty battle-tested production practices. Every capability is governed by rigorous 
                contractual SLAs, automated CI gates, and zero-trust engineering standards.
              </p>
            </div>

            {/* 3 Precision Mathematical Metric Blocks */}
            <div className="grid grid-cols-3 gap-3 p-3 bg-white rounded-2xl border border-slate-200/90 shadow-3xs">
              <div className="px-3 py-2 border-r border-slate-100">
                <span className="block text-[10px] font-mono font-bold text-slate-600 uppercase tracking-wider">
                  DISCIPLINES
                </span>
                <span className="text-xl sm:text-2xl font-mono font-black text-slate-900">
                  05 <span className="text-xs text-[#326E45] font-sans font-bold">CORE</span>
                </span>
                <span className="block text-[10px] text-slate-600 font-sans mt-0.5">
                  Synchronized matrix
                </span>
              </div>

              <div className="px-3 py-2 border-r border-slate-100">
                <span className="block text-[10px] font-mono font-bold text-slate-600 uppercase tracking-wider">
                  PRACTICES
                </span>
                <span className="text-xl sm:text-2xl font-mono font-black text-slate-900">
                  30 <span className="text-xs text-[#326E45] font-sans font-bold">TOTAL</span>
                </span>
                <span className="block text-[10px] text-slate-600 font-sans mt-0.5">
                  Production ready
                </span>
              </div>

              <div className="px-3 py-2">
                <span className="block text-[10px] font-mono font-bold text-slate-600 uppercase tracking-wider">
                  SLA BENCHMARK
                </span>
                <span className="text-xl sm:text-2xl font-mono font-black text-[#326E45]">
                  99.99%
                </span>
                <span className="block text-[10px] text-slate-600 font-sans mt-0.5">
                  Contractual guarantee
                </span>
              </div>
            </div>

            {/* RARE COMPONENT: "ENTERPRISE STRATEGIC OBJECTIVE MATCHER" */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-3xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest flex items-center gap-1.5">
                  <Zap size={12} className="text-[#326E45]" />
                  STRATEGIC OBJECTIVE MATCHER:
                </span>
                <span className="text-[10px] font-mono text-slate-600">
                  Click to route capability
                </span>
              </div>

              {/* Pill Selectors */}
              <div className="flex flex-wrap gap-1.5">
                {STRATEGIC_OBJECTIVES.map((obj) => {
                  const isSelected = activeObjectiveId === obj.id;
                  return (
                    <button
                      key={obj.id}
                      onClick={() => handleObjectiveClick(obj)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'bg-[#326E45] text-white shadow-3xs scale-[1.02]'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                      }`}
                    >
                      {obj.label}
                    </button>
                  );
                })}
              </div>

              {/* Active Objective Architectural Rationale Card */}
              <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 space-y-1.5 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono font-bold text-[#326E45] text-[11px]">
                    TARGET DISCIPLINE: {CAPABILITIES_DATA.find(g => g.id === activeObjective.targetGroupId)?.title}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-100/70 text-[#326E45] font-bold">
                    {activeObjective.slaTarget}
                  </span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed font-normal">
                  {activeObjective.rationale}
                </p>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => {
                  playSound('click');
                  const el = document.getElementById('capability-subservices-explorer');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-[#326E45] hover:bg-[#285737] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md shadow-[#326E45]/20 active:scale-95"
              >
                <span>Explore Current Discipline</span>
                <ChevronRight size={14} />
              </button>

              <button
                onClick={() => {
                  playSound('click');
                  if (onNavigate) onNavigate('contact');
                }}
                className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-300/80 transition-all cursor-pointer flex items-center gap-2 shadow-3xs"
              >
                <span>Request Scoping Call</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: THE RARE KINETIC TOPOLOGY & TELEMETRY HUD (5-6 COLS) */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="relative bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-5 sm:p-6">
              
              {/* Header inside HUD */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#326E45]" />
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                    {viewMode === 'topology' ? 'TOPOLOGY HUD' : 'SLA MATRIX HUD'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-600">
                  NODE: {activeGroup.id.toUpperCase()}
                </span>
              </div>

              {/* VIEW MODE 1: INTERACTIVE SVG KINETIC BLUEPRINT TOPOLOGY */}
              {viewMode === 'topology' && (
                <div className="relative w-full aspect-[4/3] max-h-[380px] bg-slate-900 rounded-2xl p-2 sm:p-4 overflow-hidden border border-slate-800">
                  
                  {/* Blueprint Coordinate Crosshairs */}
                  <div className="absolute top-2 left-2 text-[8px] font-mono text-slate-600">
                    + [X:001 Y:001]
                  </div>
                  <div className="absolute top-2 right-2 text-[8px] font-mono text-slate-600">
                    + [X:600 Y:001]
                  </div>
                  <div className="absolute bottom-2 left-2 text-[8px] font-mono text-slate-600">
                    LATENCY: 12ms // BUFFER: 100%
                  </div>
                  <div className="absolute bottom-2 right-2 text-[8px] font-mono text-emerald-400">
                    NODE STATUS: OPTIMAL
                  </div>

                  {/* SVG Canvas with Network Lines & Animated Data Pulses */}
                  <svg 
                    viewBox="0 0 600 420" 
                    className="w-full h-full"
                    style={{ filter: 'drop-shadow(0 0 20px rgba(50, 110, 69, 0.15))' }}
                  >
                    <defs>
                      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#326E45" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
                      </linearGradient>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Circuit Connection Lines from Center Node to Outer Nodes */}
                    {Object.entries(nodeCoordinates).map(([id, coord]) => {
                      const isActive = activeGroupId === id;
                      const isHovered = hoveredNodeId === id;
                      return (
                        <g key={`trace-${id}`}>
                          {/* Background Rail */}
                          <line
                            x1={centerCoord.x}
                            y1={centerCoord.y}
                            x2={coord.x}
                            y2={coord.y}
                            stroke={isActive || isHovered ? '#326E45' : '#1E293B'}
                            strokeWidth={isActive || isHovered ? 2.5 : 1.2}
                            strokeDasharray={isActive ? 'none' : '4 4'}
                            className="transition-colors duration-300"
                          />

                          {/* Pulsing Animated Signal Packet along active lines */}
                          {isActive && (
                            <circle r="3.5" fill="#34D399" filter="url(#glow)">
                              <animateMotion
                                path={`M ${centerCoord.x} ${centerCoord.y} L ${coord.x} ${coord.y}`}
                                dur="2.2s"
                                repeatCount="indefinite"
                              />
                            </circle>
                          )}
                        </g>
                      );
                    })}

                    {/* CENTER GATEWAY NODE */}
                    <g transform={`translate(${centerCoord.x}, ${centerCoord.y})`}>
                      <circle r="32" fill="#0A0F1C" stroke="#326E45" strokeWidth="2.5" />
                      <circle r="22" fill="#0E1527" stroke="#34D399" strokeWidth="1" strokeDasharray="3 3">
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="0"
                          to="360"
                          dur="20s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <text
                        textAnchor="middle"
                        dy="3"
                        fill="#FFFFFF"
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight="bold"
                        letterSpacing="0.05em"
                      >
                        METAWAVE
                      </text>
                      <text
                        textAnchor="middle"
                        dy="13"
                        fill="#34D399"
                        fontSize="6"
                        fontFamily="monospace"
                      >
                        CORE
                      </text>
                    </g>

                    {/* 5 DISCIPLINE NODES */}
                    {Object.entries(nodeCoordinates).map(([id, coord]) => {
                      const isActive = activeGroupId === id;
                      const isHovered = hoveredNodeId === id;
                      const group = CAPABILITIES_DATA.find(g => g.id === id);
                      if (!group) return null;

                      return (
                        <g 
                          key={`node-${id}`} 
                          transform={`translate(${coord.x}, ${coord.y})`}
                          className="cursor-pointer transition-transform duration-200"
                          onClick={() => handleGroupClick(id)}
                          onMouseEnter={() => setHoveredNodeId(id)}
                          onMouseLeave={() => setHoveredNodeId(null)}
                        >
                          {/* Outer pulse indicator for active node */}
                          {isActive && (
                            <circle 
                              r="26" 
                              fill="none" 
                              stroke="#326E45" 
                              strokeWidth="1.5" 
                              opacity="0.6"
                            >
                              <animate
                                attributeName="r"
                                values="24;32;24"
                                dur="2.5s"
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="opacity"
                                values="0.8;0.1;0.8"
                                dur="2.5s"
                                repeatCount="indefinite"
                              />
                            </circle>
                          )}

                          {/* Node circle */}
                          <circle
                            r="20"
                            fill={isActive ? '#326E45' : '#0F172A'}
                            stroke={isActive ? '#34D399' : '#334155'}
                            strokeWidth={isActive ? 2 : 1.5}
                          />

                          {/* Discipline Index Number */}
                          <text
                            textAnchor="middle"
                            dy="4"
                            fill="#FFFFFF"
                            fontSize="11"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            {group.number}
                          </text>

                          {/* Node Label underneath */}
                          <text
                            textAnchor="middle"
                            dy="32"
                            fill={isActive ? '#34D399' : '#94A3B8'}
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight={isActive ? 'bold' : 'normal'}
                          >
                            {coord.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Active Node Live Telemetry Overlay Bar */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md rounded-xl p-2.5 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <span className="px-1.5 py-0.5 rounded bg-[#326E45] text-white font-mono text-[9px] font-bold">
                        ACTIVE
                      </span>
                      <span className="font-bold text-white font-sans text-xs truncate">
                        {activeGroup.title}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-400 font-bold shrink-0">
                      {activeGroup.statVal}
                    </span>
                  </div>
                </div>
              )}

              {/* VIEW MODE 2: SLA ARCHITECTURE SPECIFICATION MATRIX */}
              {viewMode === 'matrix' && (
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {CAPABILITIES_DATA.map((group) => {
                    const isSelected = activeGroupId === group.id;
                    const GroupIcon = group.icon;
                    return (
                      <div
                        key={group.id}
                        onClick={() => handleGroupClick(group.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50/70 border-emerald-300 shadow-3xs'
                            : 'bg-white hover:bg-slate-50 border-slate-200/80'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-bold ${
                              isSelected ? 'bg-[#326E45] text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {group.number}
                            </span>
                            <span className="text-xs font-bold text-slate-900 font-sans">
                              {group.title}
                            </span>
                          </div>
                          <span className="font-mono text-[10px] font-bold text-[#326E45]">
                            {group.statVal}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {group.tagline}
                        </p>
                        <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 text-[10px] font-mono text-slate-600">
                          <span>6 Production Practices</span>
                          <span className="text-[#326E45] font-semibold">{group.statLabel}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ACTIVE DISCIPLINE QUICK SUMMARY PANEL */}
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                      ACTIVE CLUSTER:
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {activeGroup.number} — {activeGroup.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#326E45]">
                    {activeGroup.subservices.length} Specialized Practices
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {activeGroup.subservices.map((sub, idx) => (
                    <span 
                      key={sub.id}
                      className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/80 text-[10px] font-mono text-slate-600 font-medium"
                    >
                      {idx + 1}. {sub.name}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => {
                      playSound('click');
                      if (onNavigate) onNavigate(activeGroup.targetRoute);
                    }}
                    className="text-xs font-mono font-bold text-[#326E45] hover:text-[#20462c] inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View Dedicated {activeGroup.title} Page</span>
                    <ExternalLink size={12} />
                  </button>

                  <span className="text-[10px] font-mono text-slate-600">
                    SLA: {activeGroup.statVal}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INTEGRATED DISCIPLINE SWITCHER TAPE (5 ANCHOR BUTTONS) */}
        <div id="capability-subservices-explorer" className="mt-12 sm:mt-16 pt-8 border-t border-slate-200/80">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              SELECT CLUSTER TO EXPLORE PRODUCTION PRACTICES:
            </span>
            <span className="text-xs font-mono text-slate-600">
              5 of 5 active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {CAPABILITIES_DATA.map((group) => {
              const Icon = group.icon;
              const isActive = activeGroupId === group.id;
              return (
                <button
                  key={group.id}
                  onClick={() => handleGroupClick(group.id)}
                  className={`text-left p-4 rounded-2xl transition-all duration-200 cursor-pointer relative flex flex-col justify-between group focus-visible:ring-2 focus-visible:ring-[#326E45] focus-visible:outline-none ${
                    isActive 
                      ? 'bg-white border-2 border-[#326E45] shadow-md shadow-[#326E45]/10' 
                      : 'bg-white hover:bg-slate-50 border border-slate-200/90 shadow-3xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded tracking-wider ${
                      isActive ? 'bg-[#326E45] text-white' : 'bg-slate-100 text-slate-600 group-hover:text-slate-900'
                    }`}>
                      {group.number}
                    </span>
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-transform duration-200 ${
                      isActive ? 'bg-emerald-50 text-[#326E45] scale-110' : 'text-slate-400 group-hover:text-slate-700'
                    }`}>
                      <Icon size={16} />
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-xs font-bold font-sans transition-colors leading-tight mb-1 ${
                      isActive ? 'text-[#326E45]' : 'text-slate-800 group-hover:text-slate-950'
                    }`}>
                      {group.title}
                    </h3>
                    <p className="text-[10px] text-slate-500 line-clamp-1 leading-snug">
                      {group.tagline}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] font-mono text-slate-600">
                    <span>6 Practices</span>
                    <span className={isActive ? 'text-[#326E45] font-bold' : ''}>{group.statVal}</span>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeHeroDisciplineTab"
                      className="absolute -bottom-1 left-6 right-6 h-1 bg-[#326E45] rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

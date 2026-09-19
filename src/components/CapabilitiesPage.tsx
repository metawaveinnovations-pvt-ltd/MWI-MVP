import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  Search, 
  ShieldCheck, 
  Layers, 
  Activity,
  Terminal,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { 
  CAPABILITIES_DATA, 
  ALL_CAPABILITY_SUBSERVICES, 
  CapabilityGroup, 
  SubServiceItem 
} from '../data/capabilitiesData';
import { CapabilitiesHero } from './CapabilitiesHero';

interface CapabilitiesPageProps {
  onNavigate?: (pathOrId: string) => void;
  initialTab?: string;
  initialSub?: string;
}

export function CapabilitiesPage({ onNavigate, initialTab, initialSub }: CapabilitiesPageProps) {
  // Parse query params if present in window.location.search
  const getInitialState = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') || initialTab;
      const subParam = params.get('sub') || initialSub;
      
      const foundGroup = CAPABILITIES_DATA.find(g => g.id === tabParam) || CAPABILITIES_DATA[0];
      const foundSub = foundGroup.subservices.find(s => s.id === subParam || s.slug === subParam) || foundGroup.subservices[0];
      
      return { groupId: foundGroup.id, subId: foundSub.id };
    }
    return { groupId: CAPABILITIES_DATA[0].id, subId: CAPABILITIES_DATA[0].subservices[0].id };
  };

  const initial = getInitialState();
  const [activeGroupId, setActiveGroupId] = useState<string>(initial.groupId);
  const [activeSubId, setActiveSubId] = useState<string>(initial.subId);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  // Update URL search params cleanly without full page refresh
  const updateUrlParams = (groupId: string, subId: string) => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', groupId);
      url.searchParams.set('sub', subId);
      window.history.replaceState(null, '', url.toString());
    }
  };

  const handleGroupSelect = (groupId: string) => {
    if (onNavigate) {
      onNavigate(groupId);
    } else {
      setActiveGroupId(groupId);
      const group = CAPABILITIES_DATA.find(g => g.id === groupId) || CAPABILITIES_DATA[0];
      const defaultSub = group.subservices[0].id;
      setActiveSubId(defaultSub);
      updateUrlParams(groupId, defaultSub);
    }
  };

  const handleSubSelect = (subId: string) => {
    if (onNavigate) {
      const sub = currentGroup.subservices.find(s => s.id === subId);
      const practiceSlug = sub ? (sub.slug || sub.id) : subId;
      onNavigate(`${activeGroupId}?practice=${practiceSlug}`);
    } else {
      setActiveSubId(subId);
      updateUrlParams(activeGroupId, subId);
    }
  };

  const currentGroup: CapabilityGroup = CAPABILITIES_DATA.find(g => g.id === activeGroupId) || CAPABILITIES_DATA[0];
  const currentSub: SubServiceItem = currentGroup.subservices.find(s => s.id === activeSubId) || currentGroup.subservices[0];
  const CurrentIcon = currentGroup.icon;

  // Filtered subservices for the directory section
  const filteredSubservices = ALL_CAPABILITY_SUBSERVICES.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedFilter === 'ALL') return matchesSearch;
    const parentGroup = CAPABILITIES_DATA.find(g => g.subservices.some(s => s.id === item.id));
    return matchesSearch && parentGroup?.id === selectedFilter;
  });

  return (
    <div className="w-full bg-[#FAFBFD] text-slate-900 selection:bg-emerald-500/10">
      {/* MODERN NEW RARE LAYOUT & DESIGN PATTERN HERO SECTION */}
      <CapabilitiesHero
        activeGroupId={activeGroupId}
        onSelectGroup={handleGroupSelect}
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* SECTION 3: ACTIVE CAPABILITY SHOWCASE & SUBTABS */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-16">
          {/* Header of Active Capability */}
          <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white relative overflow-hidden">
            {/* Ambient Hero Image Background */}
            {currentGroup.heroImage && (
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-luminosity overflow-hidden">
                <img 
                  src={currentGroup.heroImage} 
                  alt={currentGroup.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/70" />
              </div>
            )}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#326E45]/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#326E45]/40 border border-[#326E45]/60 text-emerald-300 font-mono text-[10px] font-bold tracking-wider uppercase">
                    CAPABILITY {currentGroup.number}
                  </span>
                  <span className="text-slate-400 font-mono text-xs">|</span>
                  <span className="text-emerald-400/90 font-mono text-xs font-semibold">
                    6 Specialized Practices
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#326E45]/30 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0">
                    <CurrentIcon size={20} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white">
                    {currentGroup.number} — {currentGroup.title}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {currentGroup.tagline}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed font-normal pt-1">
                  {currentGroup.overview}
                </p>
              </div>

              <div className="flex flex-row md:flex-col items-start md:items-end justify-between gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl text-left md:text-right">
                  <span className="block text-[9px] font-mono tracking-wider text-emerald-300 uppercase font-bold">
                    {currentGroup.statLabel}
                  </span>
                  <span className="text-base sm:text-lg font-mono font-bold text-white">
                    {currentGroup.statVal}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => onNavigate && onNavigate(currentGroup.id)}
                    className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                    title={`View dedicated ${currentGroup.title} page`}
                  >
                    <span>Full Domain Page</span>
                    <ExternalLink size={12} className="text-emerald-300" />
                  </button>

                  <button
                    onClick={() => onNavigate && onNavigate('contact')}
                    className="px-4 py-2.5 bg-[#326E45] hover:bg-[#285737] text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-[#326E45]/20 active:scale-95"
                  >
                    <span>Request Scoping</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SUBTABS BAR: 6 Subservices of current capability */}
          <div className="border-b border-slate-200 bg-slate-50/70 p-2 sm:p-3 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2 min-w-max">
              {currentGroup.subservices.map((sub, idx) => {
                const isSubActive = activeSubId === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => handleSubSelect(sub.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-sans font-bold transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none whitespace-nowrap ${
                      isSubActive
                        ? 'bg-white border border-[#326E45] text-[#326E45] shadow-xs'
                        : 'bg-transparent hover:bg-white/70 text-slate-600 border border-transparent hover:border-slate-200'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono font-bold ${
                      isSubActive ? 'bg-[#326E45] text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {idx + 1}
                    </span>
                    <span>{sub.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SUB-PAGE DEEP DIVE VIEW FOR ACTIVE SUBSERVICE */}
          <div className="p-6 sm:p-8 lg:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSub.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left: Overview, Deliverables & Specifications */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Practice Visual Showcase Card */}
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 group shadow-xs">
                    <div className="relative h-48 sm:h-56 w-full bg-slate-900 overflow-hidden">
                      <img 
                        src={currentSub.image || currentGroup.heroImage}
                        alt={currentSub.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                      
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          MWI Enterprise Practice
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3 text-white">
                        <div>
                          <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider block">
                            Domain Capability • {currentGroup.number}
                          </span>
                          <span className="text-sm sm:text-base font-display font-bold">
                            {currentSub.name}
                          </span>
                        </div>
                        <div className="bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl text-right shrink-0">
                          <span className="text-[9px] font-mono text-slate-300 block">SLA Target</span>
                          <span className="text-xs font-mono font-bold text-emerald-300">{currentSub.metrics.value}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-[#326E45] bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                        PRACTICE SPECIFICATION
                      </span>
                      <span className="text-slate-400 font-mono text-xs">•</span>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {currentGroup.number}.{currentGroup.subservices.findIndex(s => s.id === currentSub.id) + 1}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
                      {currentSub.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#326E45] leading-normal">
                      {currentSub.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-1">
                      {currentSub.desc}
                    </p>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-3">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                      VERIFIED ENTERPRISE DELIVERABLES:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentSub.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                          <CheckCircle2 size={14} className="text-[#326E45] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Production Tech Stack */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                      PRODUCTION TECH STACK & TOOLS:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentSub.techStack.map((tech, tIdx) => (
                        <span 
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-250 text-slate-700 text-xs font-mono font-semibold shadow-3xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Performance Metric & Action Box */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Metric Card */}
                  <div className="p-5 rounded-2xl bg-emerald-550/5 border border-emerald-200/80 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-[#326E45] uppercase tracking-wider block">
                      ENGINEERING SLA BENCHMARK
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-mono font-bold text-slate-900">
                        {currentSub.metrics.value}
                      </span>
                      <span className="text-xs text-slate-500 font-sans">
                        ({currentSub.metrics.label})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-normal leading-relaxed pt-1">
                      Targeted benchmark guaranteed through contractual Service Level Agreements (SLAs) and automated CI performance gates.
                    </p>
                  </div>

                  {/* Interactive Action Card */}
                  <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 border border-slate-800">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                        READY TO DEPLOY?
                      </span>
                      <h4 className="text-base font-bold text-white">
                        Engage {currentSub.name} Team
                      </h4>
                      <p className="text-xs text-slate-400 leading-normal">
                        Receive a comprehensive architectural breakdown, deliverable roadmap, and NDA-guaranteed pricing estimate.
                      </p>
                    </div>

                    <div className="space-y-2 pt-1">
                      <button
                        onClick={() => {
                          if (onNavigate) {
                            onNavigate(`${activeGroupId}?practice=${currentSub.slug || currentSub.id}`);
                          }
                        }}
                        className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-[#326E45] font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                      >
                        <span>Open Dedicated Practice Page</span>
                        <ExternalLink size={13} />
                      </button>

                      <button
                        onClick={() => onNavigate && onNavigate('contact')}
                        className="w-full py-2.5 bg-[#326E45] hover:bg-[#285737] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-[#326E45]/30 active:scale-95"
                      >
                        <span>Schedule 1-on-1 Consultation</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Other 5 Subservices in this Capability */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-2">
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      ALL PRACTICES IN {currentGroup.title}:
                    </span>
                    <div className="space-y-1">
                      {currentGroup.subservices.map((s, idx) => (
                        <button
                          key={s.id}
                          onClick={() => handleSubSelect(s.id)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                            s.id === currentSub.id
                              ? 'bg-[#326E45]/10 text-[#326E45] font-bold'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span className="truncate">{idx + 1}. {s.name}</span>
                          <ChevronRight size={12} className={s.id === currentSub.id ? 'text-[#326E45]' : 'text-slate-300'} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* SECTION 4: COMPLETE 30 PRACTICES SEARCH & MATRIX DIRECTORY */}
        <div className="border-t border-slate-200/80 pt-16 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-100 bg-white shadow-xs">
                <Layers size={13} className="text-[#326E45]" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
                  MASTER DIRECTORY
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
                All 30 Production Practices & Capabilities
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl font-normal">
                Search across all 30 engineering, design, cloud, AI, and marketing practices to find the exact capability you require.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
              <button
                onClick={() => setSelectedFilter('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                  selectedFilter === 'ALL'
                    ? 'bg-[#326E45] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                All 30
              </button>
              {CAPABILITIES_DATA.map(g => (
                <button
                  key={g.id}
                  onClick={() => setSelectedFilter(g.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                    selectedFilter === g.id
                      ? 'bg-[#326E45] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {g.number} {g.shortTitle}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative max-w-md">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by practice name, tech stack, or outcome..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-sans text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#326E45] focus:ring-1 focus:ring-[#326E45] shadow-3xs"
            />
          </div>

          {/* Grid of 30 Subservices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubservices.map((sub) => {
              const parent = CAPABILITIES_DATA.find(g => g.subservices.some(s => s.id === sub.id));
              return (
                <div
                  key={sub.id}
                  onClick={() => {
                    if (parent) {
                      if (onNavigate) {
                        onNavigate(`${parent.id}?practice=${sub.slug || sub.id}`);
                      } else {
                        setActiveGroupId(parent.id);
                        setActiveSubId(sub.id);
                        updateUrlParams(parent.id, sub.id);
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }
                    }
                  }}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#326E45]/50 hover:shadow-md transition-all duration-300 text-left group cursor-pointer flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-3">
                    {/* Visual Card Image */}
                    <div className="relative h-28 w-full overflow-hidden rounded-xl bg-slate-100">
                      <img 
                        src={sub.image || parent?.heroImage}
                        alt={sub.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-white/90 backdrop-blur-xs text-[9.5px] font-mono font-bold text-slate-800">
                        {parent?.number}
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#326E45] text-white text-[9.5px] font-mono font-bold">
                        {sub.metrics.value}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase tracking-wider truncate max-w-[200px]">
                          {parent?.shortTitle}
                        </span>
                      </div>

                      <h4 className="text-sm font-display font-bold text-slate-900 group-hover:text-[#326E45] transition-colors leading-snug">
                        {sub.name}
                      </h4>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                        {sub.desc}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1">
                      {sub.techStack.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-150">
                          {t}
                        </span>
                      ))}
                      {sub.techStack.length > 3 && (
                        <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-slate-50 text-slate-400">
                          +{sub.techStack.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px] font-semibold text-[#326E45]">
                      <span>Inspect Practice Subtab</span>
                      <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

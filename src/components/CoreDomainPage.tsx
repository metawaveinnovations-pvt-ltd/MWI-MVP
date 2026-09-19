import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Check, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  ShieldCheck, 
  CheckCircle2, 
  Award,
  Users,
  Compass,
  Zap,
  ArrowUpRight,
  LayoutGrid,
  Layers
} from 'lucide-react';
import { 
  CAPABILITIES_DATA, 
  CapabilityGroup, 
  SubServiceItem 
} from '../data/capabilitiesData';

import mwiDesignStudio from '../assets/images/mwi_design_studio_1789229863254.jpg';
import mwiEngineeringHub from '../assets/images/mwi_engineering_hub_1789229879555.jpg';
import mwiCloudDevOps from '../assets/images/mwi_cloud_devops_1789229894493.jpg';
import mwiAiAutomation from '../assets/images/mwi_ai_automation_1789229908663.jpg';
import mwiGrowthAnalytics from '../assets/images/mwi_growth_analytics_1789229922314.jpg';

interface CoreDomainPageProps {
  domainId: string;
  initialPracticeSlug?: string;
  onNavigate?: (pathOrId: string) => void;
}

// Curated high-res imagery tailored to each domain and practice
interface DomainMedia {
  heroImage: string;
  heroBadge: string;
  practiceImages: Record<string, string>;
  approachPillars: {
    title: string;
    desc: string;
    icon: typeof Compass;
  }[];
}

const DOMAIN_MEDIA: Record<string, DomainMedia> = {
  'design-creative': {
    heroImage: mwiDesignStudio,
    heroBadge: 'Human-Centered Experience Design',
    practiceImages: {
      'web-digital-experience-design': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      'ui-ux-design-prototyping': 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
      'brand-identity-graphic-design': 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
      'motion-graphics-video-production': 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
      'social-campaign-creative': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
      'marketing-promotional-content': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    },
    approachPillars: [
      { title: 'User-First Discovery', desc: 'Understanding customer behavior and journey touchpoints before designing a single pixel.', icon: Compass },
      { title: 'Systematic Design Systems', desc: 'Reusable components and brand tokens for flawless consistency across all digital touchpoints.', icon: Award },
      { title: 'Measurable Engagement', desc: 'Every layout and interaction is crafted to maximize user delight, clarity, and conversion.', icon: Zap }
    ]
  },
  'software-engineering': {
    heroImage: mwiEngineeringHub,
    heroBadge: 'Modern Enterprise Products & Platforms',
    practiceImages: {
      'website-web-development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      'web-application-development': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'mobile-application-development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
      'custom-software-development': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      'full-stack-api-engineering': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      'enterprise-systems-platform-development': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    },
    approachPillars: [
      { title: 'Clean Architecture', desc: 'Maintainable, modular codebases designed to evolve smoothly with your business goals.', icon: Compass },
      { title: 'Speed & Reliability', desc: 'Optimized performance for ultra-fast loading speeds and responsive user interactions.', icon: Zap },
      { title: 'Complete Ownership', desc: '100% intellectual property ownership with full source code transfer and zero vendor lock-in.', icon: ShieldCheck }
    ]
  },
  'cloud-data-infrastructure': {
    heroImage: mwiCloudDevOps,
    heroBadge: 'Secure Cloud & Scalable Systems',
    practiceImages: {
      'cloud-infrastructure-deployment': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      'server-hosting-system-architecture': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
      'database-design-management': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
      'data-integration-api-infrastructure': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
      'security-backup-reliability': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
      'performance-infrastructure-optimization': 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
    },
    approachPillars: [
      { title: '99.99% Availability', desc: 'Resilient multi-zone architectures ensuring uninterrupted service for your customers.', icon: Zap },
      { title: 'Enterprise Security', desc: 'Proactive data protection, automated daily backups, and stringent compliance standards.', icon: ShieldCheck },
      { title: 'Cost-Optimized Scale', desc: 'Infrastructure that scales automatically during peak traffic without inflating operational budgets.', icon: Award }
    ]
  },
  'ai-automation-smart-systems': {
    heroImage: mwiAiAutomation,
    heroBadge: 'Intelligent Automation & AI Solutions',
    practiceImages: {
      'ai-solutions-intelligent-applications': 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
      'ai-agents-workflow-systems': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'business-process-automation': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'ai-integration-custom-ai-workflows': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
      'smart-recommendation-decision-systems': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'ai-powered-customer-business-solutions': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    },
    approachPillars: [
      { title: 'Practical AI Utility', desc: 'AI built for tangible business outcomes, replacing tedious manual tasks with intelligent workflows.', icon: Zap },
      { title: 'Confidential Data Privacy', desc: 'Private models and secure vector storage keeping your intellectual property protected.', icon: ShieldCheck },
      { title: 'Seamless Human Handoff', desc: 'Autonomous intelligence working alongside your team with clear oversight and control.', icon: Users }
    ]
  },
  'growth-marketing-digital-strategy': {
    heroImage: mwiGrowthAnalytics,
    heroBadge: 'Sustainable Revenue & Brand Visibility',
    practiceImages: {
      'seo-search-visibility': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'social-media-digital-marketing': 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80',
      'paid-advertising-campaign-management': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
      'content-strategy-audience-growth': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
      'analytics-cro-performance-intelligence': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'business-growth-strategic-partnerships': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    },
    approachPillars: [
      { title: 'Data-Driven Growth', desc: 'Real-time analytics and audience segmentation guiding every marketing and search decision.', icon: Compass },
      { title: 'High-Intent Acquisition', desc: 'Attracting decision-makers through organic search dominance and focused paid campaigns.', icon: Zap },
      { title: 'Conversion Focus', desc: 'Continuous testing and optimization turning casual visitors into long-term loyal clients.', icon: Award }
    ]
  }
};

export function CoreDomainPage({ domainId, initialPracticeSlug, onNavigate }: CoreDomainPageProps) {
  // Find current domain or fallback to first
  const currentDomain: CapabilityGroup = useMemo(() => {
    return CAPABILITIES_DATA.find(g => g.id === domainId) || CAPABILITIES_DATA[0];
  }, [domainId]);

  const media = DOMAIN_MEDIA[currentDomain.id] || DOMAIN_MEDIA['design-creative'];

  // Handle Practice selection
  const [activePracticeSlug, setActivePracticeSlug] = useState<string>(() => {
    if (initialPracticeSlug) {
      const match = currentDomain.subservices.find(s => s.id === initialPracticeSlug || s.slug === initialPracticeSlug);
      if (match) return match.slug;
    }
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const practiceParam = params.get('practice') || params.get('sub');
      if (practiceParam) {
        const match = currentDomain.subservices.find(s => s.id === practiceParam || s.slug === practiceParam);
        if (match) return match.slug;
      }
    }
    return currentDomain.subservices[0]?.slug || '';
  });

  // Keep practice updated when domainId changes
  useEffect(() => {
    if (!currentDomain.subservices.some(s => s.slug === activePracticeSlug)) {
      setActivePracticeSlug(currentDomain.subservices[0]?.slug || '');
    }
  }, [currentDomain, activePracticeSlug]);

  // Active practice object
  const activePractice: SubServiceItem = useMemo(() => {
    return currentDomain.subservices.find(s => s.slug === activePracticeSlug) || currentDomain.subservices[0];
  }, [currentDomain, activePracticeSlug]);

  const activePracticeIdx = useMemo(() => {
    return currentDomain.subservices.findIndex(s => s.slug === activePracticeSlug);
  }, [currentDomain, activePracticeSlug]);

  // Active practice picture
  const practiceImage = activePractice?.image || media.practiceImages[activePractice?.slug] || media.heroImage;

  // Other domains for cross-linking
  const otherDomains = useMemo(() => {
    return CAPABILITIES_DATA.filter(g => g.id !== currentDomain.id);
  }, [currentDomain]);

  // View mode for the 6 services: 'spotlight' (split master-detail) vs 'grid' (bento cards)
  const [serviceViewMode, setServiceViewMode] = useState<'spotlight' | 'grid'>('spotlight');

  const handleSelectPractice = (slug: string) => {
    setActivePracticeSlug(slug);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('practice', slug);
      window.history.replaceState(null, '', url.toString());
    }
  };

  const handlePrevPractice = () => {
    const total = currentDomain.subservices.length;
    const prevIdx = (activePracticeIdx - 1 + total) % total;
    handleSelectPractice(currentDomain.subservices[prevIdx].slug);
  };

  const handleNextPractice = () => {
    const total = currentDomain.subservices.length;
    const nextIdx = (activePracticeIdx + 1) % total;
    handleSelectPractice(currentDomain.subservices[nextIdx].slug);
  };

  const handleNavigate = (pathOrId: string) => {
    if (onNavigate) {
      onNavigate(pathOrId);
    } else if (typeof window !== 'undefined') {
      window.location.href = pathOrId.startsWith('/') ? pathOrId : `/${pathOrId}`;
    }
  };

  const cleanDomainTitle = currentDomain.title.replace(/^\d+\s*—\s*/, '');

  return (
    <div className="w-full bg-[#fcfdfd] text-slate-900 pb-20">
      {/* 1. BREADCRUMB NAVIGATION */}
      <section className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-[72px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-3 text-xs">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-slate-500 text-xs">
            <button 
              onClick={() => handleNavigate('home')}
              className="hover:text-[#326E45] font-medium transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight size={13} className="text-slate-300" />
            <button 
              onClick={() => handleNavigate('capabilities')}
              className="hover:text-[#326E45] font-medium transition-colors cursor-pointer"
            >
              Capabilities
            </button>
            <ChevronRight size={13} className="text-slate-300" />
            <span className="text-slate-900 font-semibold">
              {cleanDomainTitle}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-slate-600">6 Core Specializations</span>
          </div>
        </div>
      </section>

      {/* 2. ELEGANT HERO SECTION WITH REALISTIC VISUAL */}
      <section className="relative pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-200/70 overflow-hidden bg-gradient-to-b from-white to-slate-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#326E45] border border-emerald-200/80">
                <Sparkles size={13} className="text-[#326E45]" />
                <span>Domain {currentDomain.number} — {media.heroBadge}</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18]">
                  {cleanDomainTitle}
                </h1>
                <p className="text-lg sm:text-xl font-medium text-[#326E45]">
                  {currentDomain.tagline}
                </p>
              </div>

              <p className="text-base text-slate-600 leading-relaxed font-normal max-w-2xl">
                {currentDomain.overview}
              </p>

              {/* High-Level Value Highlights */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
                  <span className="block text-2xl font-bold text-slate-900 tracking-tight">06</span>
                  <span className="text-xs text-slate-500 font-medium">Specialized Services</span>
                </div>
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
                  <span className="block text-2xl font-bold text-[#326E45] tracking-tight">{currentDomain.statVal || '+44%'}</span>
                  <span className="text-xs text-slate-500 font-medium">{currentDomain.statLabel || 'Measurable Impact'}</span>
                </div>
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
                  <span className="block text-2xl font-bold text-slate-900 tracking-tight">100%</span>
                  <span className="text-xs text-slate-500 font-medium">IP Code Ownership</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#specializations"
                  className="px-6 py-3 bg-[#326E45] hover:bg-[#285737] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95 duration-200"
                >
                  <span>Explore Services</span>
                  <ArrowRight size={14} />
                </a>
                <button
                  onClick={() => handleNavigate('contact')}
                  className="px-6 py-3 bg-white border border-slate-200 hover:border-[#326E45]/40 text-slate-800 hover:text-[#326E45] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-2xs duration-200"
                >
                  <span>Speak With Our Team</span>
                </button>
              </div>
            </div>

            {/* Right Visual Image Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-100 group">
                <img 
                  src={media.heroImage} 
                  alt={cleanDomainTitle}
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 lg:h-[440px] object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
                
                {/* Floating bottom badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-slate-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-[#326E45] uppercase tracking-wider block">
                        Enterprise Grade Delivery
                      </span>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">
                        {cleanDomainTitle}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-[#326E45] text-xs font-bold rounded-lg">
                      {currentDomain.statVal || 'Active'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. THE 6 SPECIALIZED SERVICES — MODERN INTERACTIVE SPOTLIGHT & BENTO FLOW */}
      <section id="specializations" className="py-16 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with View Controller */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-semibold text-[#326E45] bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                Domain 0{currentDomain.number} Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                Our 6 Specialized Services
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Explore our full capabilities suite. Select any service to inspect concrete deliverables, verified outcomes, and real-world application.
              </p>
            </div>

            {/* Layout Toggle Pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-end">
              <button
                onClick={() => setServiceViewMode('spotlight')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  serviceViewMode === 'spotlight'
                    ? 'bg-white text-[#326E45] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Interactive Spotlight View"
              >
                <Layers size={14} />
                <span>Interactive Spotlight</span>
              </button>
              <button
                onClick={() => setServiceViewMode('grid')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  serviceViewMode === 'grid'
                    ? 'bg-white text-[#326E45] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="All 6 Cards Grid"
              >
                <LayoutGrid size={14} />
                <span>Visual Bento Grid</span>
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: INTERACTIVE SPOTLIGHT (REPLACES TABS) */}
          {serviceViewMode === 'spotlight' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: The 6 Service Navigators (Master Cards) */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between pb-1 px-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Service Directory (06)
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Click to inspect
                  </span>
                </div>

                {currentDomain.subservices.map((practice, idx) => {
                  const isSelected = practice.slug === activePracticeSlug;
                  const cleanName = practice.name.replace(/^\d+\s*—\s*/, '');
                  return (
                    <div
                      key={practice.id}
                      onClick={() => handleSelectPractice(practice.slug)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer group relative ${
                        isSelected
                          ? 'bg-[#326E45] text-white border-[#326E45] shadow-md ring-2 ring-[#326E45]/20 scale-[1.01]'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-[#326E45]/40 hover:bg-slate-50/80 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-[#326E45]'
                          }`}>
                            0{idx + 1}
                          </span>
                          <div>
                            <h3 className={`text-sm font-bold leading-tight ${
                              isSelected ? 'text-white' : 'text-slate-900 group-hover:text-[#326E45]'
                            }`}>
                              {cleanName}
                            </h3>
                            <p className={`text-xs mt-0.5 line-clamp-1 ${
                              isSelected ? 'text-emerald-100' : 'text-slate-500'
                            }`}>
                              {practice.tagline}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-emerald-50 text-[#326E45] border border-emerald-200/60'
                          }`}>
                            {practice.metrics.value}
                          </span>
                          <ArrowRight 
                            size={14} 
                            className={`transition-transform duration-200 ${
                              isSelected ? 'text-white translate-x-0.5' : 'text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5'
                            }`} 
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Sticky Dynamic Visual Stage */}
              <div className="lg:col-span-7 lg:sticky lg:top-28">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePractice.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col"
                  >
                    {/* Top Visual Photography Banner */}
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                      <img 
                        src={practiceImage} 
                        alt={activePractice.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                      
                      {/* Floating Outcome Glass Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-white/60 shadow-md flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-slate-800">
                          {activePractice.metrics.label}: <span className="text-[#326E45]">{activePractice.metrics.value}</span>
                        </span>
                      </div>

                      {/* Header Title inside banner */}
                      <div className="absolute bottom-4 left-5 right-5 text-white">
                        <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider block mb-1">
                          Service 0{activePracticeIdx + 1} of 06
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                          {activePractice.name.replace(/^\d+\s*—\s*/, '')}
                        </h3>
                      </div>
                    </div>

                    {/* Bottom Details Content */}
                    <div className="p-6 sm:p-8 space-y-6">
                      
                      {/* Narrative & Tagline */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-[#326E45]">
                          {activePractice.tagline}
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed font-normal">
                          {activePractice.desc}
                        </p>
                      </div>

                      {/* Deliverables Checklist */}
                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                          <CheckCircle2 size={15} className="text-[#326E45]" />
                          Key Tangible Deliverables:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {activePractice.deliverables.map((item, idx) => (
                            <div 
                              key={idx}
                              className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-start gap-2.5"
                            >
                              <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#326E45] shrink-0 flex items-center justify-center mt-0.5">
                                <Check size={11} strokeWidth={2.5} />
                              </span>
                              <span className="text-xs font-medium text-slate-800 leading-snug">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer Actions & Stepper Controls */}
                      <div className="pt-4 border-t border-slate-150 flex flex-wrap items-center justify-between gap-4">
                        <button
                          onClick={() => handleNavigate('contact')}
                          className="px-5 py-2.5 bg-[#326E45] hover:bg-[#285737] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95 duration-200"
                        >
                          <span>Inquire About This Service</span>
                          <ArrowRight size={13} />
                        </button>

                        {/* Prev / Next Stepper */}
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                          <button
                            onClick={handlePrevPractice}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                            title="Previous Service"
                          >
                            <ChevronLeft size={15} />
                          </button>
                          <span className="px-1 text-slate-700 font-bold">
                            0{activePracticeIdx + 1} / 06
                          </span>
                          <button
                            onClick={handleNextPractice}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                            title="Next Service"
                          >
                            <ChevronRight size={15} />
                          </button>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          )}

          {/* VIEW MODE 2: BENTO GRID (ALL 6 SERVICES WITH VISUALS) */}
          {serviceViewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentDomain.subservices.map((practice, idx) => {
                const cleanName = practice.name.replace(/^\d+\s*—\s*/, '');
                const pImg = practice.image || media.practiceImages[practice.slug] || media.heroImage;
                return (
                  <div
                    key={practice.id}
                    className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md hover:border-[#326E45]/40 transition-all duration-300 flex flex-col group"
                  >
                    {/* Top Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <img 
                        src={pImg} 
                        alt={cleanName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                      
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-xs font-bold text-slate-900 shadow-xs">
                        0{idx + 1}
                      </div>

                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-500/90 text-white text-xs font-bold shadow-xs">
                        {practice.metrics.value}
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <h3 className="text-base font-bold leading-tight drop-shadow-xs">
                          {cleanName}
                        </h3>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <p className="text-xs font-semibold text-[#326E45]">
                          {practice.tagline}
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                          {practice.desc}
                        </p>

                        {/* Deliverables preview */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Key Deliverables:
                          </span>
                          {practice.deliverables.slice(0, 3).map((d, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-1.5 text-xs text-slate-700">
                              <Check size={12} className="text-[#326E45] shrink-0" strokeWidth={2.5} />
                              <span className="truncate">{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => {
                            handleSelectPractice(practice.slug);
                            setServiceViewMode('spotlight');
                          }}
                          className="text-xs font-bold text-[#326E45] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Detailed Spotlight</span>
                          <ArrowRight size={12} />
                        </button>
                        <button
                          onClick={() => handleNavigate('contact')}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-[#326E45] hover:text-white text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          Inquire
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* 4. OUR STRATEGIC APPROACH (3 IMPACTFUL PILLARS) */}
      <section className="py-14 lg:py-18 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-10 space-y-2">
            <span className="text-xs font-semibold text-[#326E45] bg-white border border-emerald-200/80 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              How We Work
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Designed for Speed, Quality & Impact
            </h2>
            <p className="text-sm text-slate-600">
              Our proven engagement model eliminates guesswork, delivering high quality at every phase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {media.approachPillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-3 shadow-2xs hover:border-[#326E45]/40 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#326E45]">
                    <PillarIcon size={18} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. STREAMLINED EXECUTIVE CALL TO ACTION */}
      <section className="py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0f172a] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#326E45]/25 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-300 border border-white/15">
                <Sparkles size={13} />
                <span>Next Steps</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                Ready to elevate your {cleanDomainTitle.toLowerCase()}?
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Connect with our team to discuss your goals, explore custom options, and receive a clear proposal with timeline estimates.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleNavigate('contact')}
                  className="px-6 py-3 bg-[#326E45] hover:bg-[#285737] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 duration-200"
                >
                  <span>Schedule a Call</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => handleNavigate('capabilities')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer duration-200"
                >
                  <span>View All Capabilities</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPACT OTHER DOMAINS SWITCHER */}
      <section className="py-10 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Explore Other Core Domains
            </span>
            <button
              onClick={() => handleNavigate('capabilities')}
              className="text-xs font-semibold text-[#326E45] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>All 5 Domains</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {otherDomains.map((domain) => {
              const OIcon = domain.icon;
              const oTitle = domain.title.replace(/^\d+\s*—\s*/, '');
              return (
                <button
                  key={domain.id}
                  onClick={() => handleNavigate(domain.id)}
                  className="text-left p-4 rounded-2xl border border-slate-200/90 hover:border-[#326E45]/50 hover:bg-slate-50 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400">
                        Domain {domain.number}
                      </span>
                      <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#326E45] group-hover:text-white transition-colors">
                        <OIcon size={12} />
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#326E45] transition-colors leading-snug">
                      {oTitle}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {domain.tagline}
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[#326E45]">
                    <span>Explore</span>
                    <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

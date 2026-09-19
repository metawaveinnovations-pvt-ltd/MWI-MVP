import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  X, 
  Building2, 
  Activity, 
  ArrowRight, 
  Globe, 
  Search, 
  Code, 
  Gauge, 
  Bot, 
  Layers,
  FileText,
  Check,
  Award,
  Zap,
  Cpu,
  Smartphone,
  Trophy,
  Cloud,
  Image as ImageIcon,
  ChevronDown,
  HelpCircle,
  SlidersHorizontal,
  Compass,
  Star,
  Quote,
  ExternalLink,
  MapPin,
  TrendingUp,
  Lock,
  Server,
  CheckCircle,
  Briefcase,
  Laptop,
  Users,
  BarChart3
} from 'lucide-react';
import { playSound } from '../utils/audio';
import { ImpactSubNav, ImpactTabId } from './impact/ImpactSubNav';
import { EnterpriseProjectsTab } from './impact/EnterpriseProjectsTab';
import { HealthTechTab } from './impact/HealthTechTab';
import { FinTechTab } from './impact/FinTechTab';
import { EdTechTab } from './impact/EdTechTab';
import { LogisticsTab } from './impact/LogisticsTab';

// ----------------------------------------------------------------------
// TYPES & CATEGORIES
// ----------------------------------------------------------------------

export type CategoryFilter = 
  | 'All Works'
  | 'Enterprise Solutions'
  | 'AI Solutions'
  | 'SaaS Products'
  | 'Web Applications'
  | 'Mobile Applications'
  | 'Cloud Solutions'
  | 'Client Success Stories'
  | 'Product Engineering';

export type IndustryFilter = 
  | 'All Industries'
  | 'Healthcare'
  | 'FinTech'
  | 'Education'
  | 'Real Estate'
  | 'Logistics'
  | 'Retail'
  | 'Manufacturing'
  | 'Hospitality'
  | 'Government'
  | 'E-Commerce'
  | 'AI & Automation';

export interface PortfolioProject {
  id: string;
  title: string;
  category: CategoryFilter;
  industry: IndustryFilter;
  clientType: string;
  status: string;
  bannerImg: string;
  galleryImgs: string[];
  badgeTag: string;
  liveUrl?: string;
  
  // Executive summaries
  overview: string;
  problemStatement: string;
  solutionProvided: string;
  
  // Key Features & Value
  coreFeatures: string[];
  techStack: string[];
  businessOutcomes: string[];
  deliverables: string[];
  clientRequirements: string[];
  businessValueMetric: string;

  // Rich Case Study Details
  caseStudy?: {
    challenge: string;
    approach: string;
    keyInnovations: string[];
    results: string[];
  };
}

export interface PortfolioShowcaseProps {
  onNavigate?: (sectionId: string) => void;
  currentPath?: string;
  initialTab?: ImpactTabId;
}

// ----------------------------------------------------------------------
// DATASET: CLIENT-FRIENDLY ENTERPRISE PORTFOLIO SHOWCASE
// ----------------------------------------------------------------------

import { PORTFOLIO_PROJECTS } from '../data/portfolioProjects';


// ----------------------------------------------------------------------
// ENTERPRISE VALUE METRICS & PROOF PILLARS
// ----------------------------------------------------------------------
const ENTERPRISE_VALUE_METRICS = [
  {
    title: 'Production-Proven Scale',
    description: '14+ bespoke enterprise systems running live commercial operations with verified uptime.',
    icon: Building2,
    badge: '14+ Live Deployments',
    metric: '100% Production',
    highlight: 'Zero prototypes, real commercial platforms'
  },
  {
    title: 'Global Multi-Region Reach',
    description: 'Cloud architectures deployed across UK, US, and Pakistan with localized compliance & low latency.',
    icon: Globe,
    badge: 'UK • US • PK',
    metric: '3 Continents',
    highlight: 'Low-latency multi-region edge routing'
  },
  {
    title: 'Modern Agile Stack',
    description: 'TypeScript, React 18, Laravel, Python, and Dockerized microservices built with zero tech debt.',
    icon: Code,
    badge: 'Modern Native',
    metric: 'Full-Stack Agile',
    highlight: 'Clean modular code & automated CI/CD'
  },
  {
    title: 'Domain-Specific AI & RAG',
    description: 'Production agentic workflows, document intelligence, semantic vector search, and LLM automation.',
    icon: Bot,
    badge: 'GenAI & RAG',
    metric: 'Intelligent Edge',
    highlight: 'Custom vector embeddings & smart telemetry'
  },
  {
    title: 'Zero-Trust Security & IP Handover',
    description: '100% source code ownership and IP transfer to clients with bank-grade encryption and NDAs.',
    icon: ShieldCheck,
    badge: '100% Client IP',
    metric: 'Zero-Trust Vault',
    highlight: 'Complete IP assignment & security audit'
  },
  {
    title: 'Sub-Second Performance SLA',
    description: 'Edge-cached delivery, indexed relational databases, and 99.98% mission-critical uptime.',
    icon: Gauge,
    badge: 'Sub-Second SLA',
    metric: '<180ms Latency',
    highlight: '99.98% high availability uptime'
  }
];

// ----------------------------------------------------------------------
// SUBTLE 3D & GLASSMORPHIC PORTFOLIO CARD COMPONENT
// Strict Requirements:
// 1. By default: Display high-quality project image with overlaid category badge with icon.
// 2. On hover: Reveal essential details (Title, category badge with icon, short 1-2 line description, impact metric, & 1 action button) with smooth glassmorphism.
// ----------------------------------------------------------------------

const getCategoryIconComponent = (catOrBadge: string) => {
  const str = catOrBadge.toLowerCase();
  if (str.includes('ai') || str.includes('auto') || str.includes('genai') || str.includes('intelligence') || str.includes('ml')) {
    return Sparkles;
  }
  if (str.includes('cloud') || str.includes('aws') || str.includes('devops') || str.includes('infrastructure')) {
    return Cloud;
  }
  if (str.includes('mobile') || str.includes('ios') || str.includes('android') || str.includes('app')) {
    return Smartphone;
  }
  if (str.includes('saas') || str.includes('platform') || str.includes('scale')) {
    return Zap;
  }
  if (str.includes('web') || str.includes('portal')) {
    return Globe;
  }
  if (str.includes('enterprise') || str.includes('corporate') || str.includes('fintech')) {
    return Building2;
  }
  if (str.includes('product') || str.includes('code') || str.includes('engineering')) {
    return Code;
  }
  if (str.includes('client') || str.includes('success') || str.includes('trophy') || str.includes('story')) {
    return Trophy;
  }
  return Layers;
};

interface PortfolioCardProps {
  project: PortfolioProject;
  onOpenModal: (project: PortfolioProject) => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ project, onOpenModal }) => {
  const CategoryIcon = getCategoryIconComponent(project.badgeTag || project.category);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className="w-full"
    >
      <div
        onClick={() => onOpenModal(project)}
        onMouseEnter={() => playSound('hover')}
        className="group relative bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer select-none w-full h-auto lg:min-h-[415px] lg:h-[415px] lg:hover:h-auto"
      >
        {/* -------------------------------------------------------------------- */}
        {/* HIGH-QUALITY PROJECT IMAGE                                           */}
        {/* Clean: ONLY the title in top-left, no other overlays, text, or badges */}
        {/* On desktop: full card height at rest, smooth shrink to top on hover  */}
        {/* On mobile/tablet: fixed aspect height with details always visible    */}
        {/* -------------------------------------------------------------------- */}
        <div className="relative w-full overflow-hidden bg-slate-100 h-[200px] sm:h-[220px] lg:h-[415px] lg:group-hover:h-[140px] xl:group-hover:h-[145px] transition-all duration-400 ease-out shrink-0">
          <img 
            src={project.bannerImg} 
            alt={project.title}
            width={600}
            height={400}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop';
            }}
          />

          {/* ONLY the title in the top-left corner */}
          <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 z-10 max-w-[88%] pointer-events-none">
            <span className="inline-block px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/85 text-slate-900 font-bold font-display text-xs sm:text-sm shadow-2xs leading-snug break-words">
              {project.title}
            </span>
          </div>
        </div>

        {/* -------------------------------------------------------------------- */}
        {/* DETAILS SECTION (Inside the card itself, NOT an overlay on the image)*/}
        {/* On desktop: Smoothly reveals inside the lower portion of the card    */}
        {/* On mobile/tablet: Always visible without relying on hover interaction*/}
        {/* -------------------------------------------------------------------- */}
        <div className="flex-1 min-h-0 bg-white p-3.5 sm:p-4.5 flex flex-col justify-between border-t border-slate-100 transition-opacity duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 gap-2.5">
          {/* Top Section: Category Badges & System Status */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-100 pb-2">
              <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                <span className="inline-flex items-center gap-1 text-[10.5px] font-mono font-semibold text-[#326E45] bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full whitespace-nowrap">
                  <CategoryIcon size={11} className="text-[#326E45] shrink-0" />
                  <span>{project.category}</span>
                </span>
                <span className="text-[10.5px] font-mono font-medium text-slate-600 bg-slate-100 border border-slate-200/70 px-2 py-0.5 rounded-md whitespace-nowrap">
                  {project.industry}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#326E45] shrink-0" />
                <span className="hidden sm:inline">Verified System</span>
              </div>
            </div>

            {/* Concise Scannable Overview */}
            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-normal">
              {project.overview}
            </p>

            {/* Key Verified Metric */}
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-[10.5px] font-mono text-slate-500 uppercase tracking-wider shrink-0">
                <TrendingUp size={12} className="text-[#326E45] shrink-0" />
                <span>Verified Impact</span>
              </div>
              <span className="text-xs font-bold text-[#326E45] font-display text-right truncate">
                {project.businessValueMetric}
              </span>
            </div>
          </div>

          {/* Action Row: Sleek Corporate CTAs */}
          <div className="pt-2 flex items-center gap-2 border-t border-slate-100 shrink-0 mt-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(project);
              }}
              className={`py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-xl bg-[#326E45] hover:bg-[#285737] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer group/btn ${
                project.liveUrl ? 'flex-1 min-w-0' : 'w-full'
              }`}
            >
              <span className="truncate">Explore Case Study</span>
              <ArrowUpRight size={13} className="shrink-0 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="py-2 sm:py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200/90 font-medium text-xs flex items-center justify-center gap-1 transition-all cursor-pointer shrink-0 shadow-xs"
                title={`Open Live System: ${project.liveUrl}`}
              >
                <span>Live Site</span>
                <ExternalLink size={12} className="text-[#326E45] shrink-0" />
              </a>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ onNavigate, currentPath, initialTab }) => {
  const parseTabFromPath = (path?: string): ImpactTabId => {
    let checkPath = path;
    if (!checkPath && typeof window !== 'undefined') {
      checkPath = window.location.pathname + window.location.search;
    }
    if (!checkPath) return initialTab || 'portfolio';
    
    if (checkPath.includes('enterprise-projects') || checkPath.includes('150-shipped-projects')) return 'enterprise-projects';
    if (checkPath.includes('healthtech-case-studies') || checkPath.includes('healthtech') || checkPath.includes('ehr')) return 'healthtech-case-studies';
    if (checkPath.includes('fintech-proptech-outcomes') || checkPath.includes('fintech') || checkPath.includes('proptech')) return 'fintech-proptech-outcomes';
    if (checkPath.includes('edtech-learning-impact') || checkPath.includes('edtech') || checkPath.includes('learning')) return 'edtech-learning-impact';
    if (checkPath.includes('supply-chain-logistics') || checkPath.includes('logistics') || checkPath.includes('supply-chain')) return 'supply-chain-logistics';
    return 'portfolio';
  };

  const [activeTab, setActiveTab] = useState<ImpactTabId>(() => parseTabFromPath(currentPath));

  useEffect(() => {
    const detected = parseTabFromPath(currentPath);
    setActiveTab(detected);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPath]);

  const handleTabChange = (tabId: ImpactTabId) => {
    setActiveTab(tabId);
    if (onNavigate) {
      onNavigate(`impact?tab=${tabId}`);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All Works');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryFilter>('All Industries');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'title' | 'newest'>('featured');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);
  const [modalActiveTab, setModalActiveTab] = useState<'overview' | 'features' | 'tech' | 'caseStudy'>('overview');
  const [modalGalleryIndex, setModalGalleryIndex] = useState(0);
  const [heroSpotlightIndex, setHeroSpotlightIndex] = useState(0);

  // Curated spotlight projects showcasing real-world MetaWave success
  const heroFeaturedProjects = useMemo(() => {
    const ids = ['wood-world-crm-erp', 'cloud-host-shop', 'pro-care-homes-uk', 'travelio-pk', 'daybreak-weekly-uk'];
    const list = ids.map(id => PORTFOLIO_PROJECTS.find(p => p.id === id)).filter(Boolean) as PortfolioProject[];
    return list.length > 0 ? list : PORTFOLIO_PROJECTS.slice(0, 5);
  }, []);

  const activeSpotlight = heroFeaturedProjects[heroSpotlightIndex] || heroFeaturedProjects[0];

  const categories: CategoryFilter[] = [
    'All Works',
    'Enterprise Solutions',
    'AI Solutions',
    'SaaS Products',
    'Web Applications',
    'Mobile Applications',
    'Cloud Solutions',
    'Client Success Stories',
    'Product Engineering'
  ];

  const industries: IndustryFilter[] = [
    'All Industries',
    'Healthcare',
    'FinTech',
    'Education',
    'Real Estate',
    'Logistics',
    'Retail',
    'Manufacturing',
    'Hospitality',
    'Government',
    'E-Commerce',
    'AI & Automation'
  ];

  const PORTFOLIO_FAQS = [
    {
      q: 'How does MetaWave manage intellectual property, source code, & data confidentiality?',
      a: 'All custom software, proprietary algorithms, and enterprise digital solutions developed by MetaWave are transferred 100% to the client under clear contractual IP assignment agreements. We execute strict enterprise Non-Disclosure Agreements (NDAs) prior to any architectural review.'
    },
    {
      q: 'What enterprise compliance and security standards are engineered into client builds?',
      a: 'We implement enterprise-grade security controls, encrypted enclaves, strict data governance, end-to-end OAuth2/SAML SSO, and zero-trust API architecture tailored to client industry regulations.'
    },
    {
      q: 'Can MetaWave integrate custom AI models and LLMs into our existing software stack?',
      a: 'Yes. We specialize in retrofitting legacy architectures with agentic AI workflows, retrieval-augmented generation (RAG) vector pipelines, and custom fine-tuned GenAI engines through secure, high-throughput microservices.'
    },
    {
      q: 'What is MetaWave’s typical engagement model and delivery timeline?',
      a: 'We offer agile co-engineering squads and fixed-scope delivery milestones. Typical MVP platforms deploy within 6 to 10 weeks, while full enterprise digital transformations follow structured multi-phase release sprints.'
    }
  ];

  // Category Counts & Icons Mapping
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Works': PORTFOLIO_PROJECTS.length };
    PORTFOLIO_PROJECTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const getCategoryIcon = (cat: CategoryFilter) => {
    switch (cat) {
      case 'All Works': return Layers;
      case 'Enterprise Solutions': return Building2;
      case 'AI Solutions': return Sparkles;
      case 'SaaS Products': return Zap;
      case 'Web Applications': return Globe;
      case 'Mobile Applications': return Smartphone;
      case 'Cloud Solutions': return Cloud;
      case 'Client Success Stories': return Trophy;
      case 'Product Engineering': return Code;
      default: return Layers;
    }
  };

  // Filtering & Sorting Logic
  const filteredProjects = useMemo(() => {
    let result = PORTFOLIO_PROJECTS.filter((project) => {
      const matchCategory = selectedCategory === 'All Works' || project.category === selectedCategory;
      const matchIndustry = selectedIndustry === 'All Industries' || project.industry === selectedIndustry;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        project.title.toLowerCase().includes(q) ||
        project.overview.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        project.industry.toLowerCase().includes(q) ||
        project.techStack.some(t => t.toLowerCase().includes(q));

      return matchCategory && matchIndustry && matchSearch;
    });

    if (sortBy === 'title') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'newest') {
      result = [...result].reverse();
    }

    return result;
  }, [selectedCategory, selectedIndustry, searchQuery, sortBy]);

  // Related Modal Projects
  const relatedModalProjects = useMemo(() => {
    if (!activeModalProject) return [];
    return PORTFOLIO_PROJECTS.filter(
      p => p.id !== activeModalProject.id && 
      (p.category === activeModalProject.category || p.industry === activeModalProject.industry)
    ).slice(0, 2);
  }, [activeModalProject]);

  const handleOpenModal = (project: PortfolioProject) => {
    playSound('click');
    setActiveModalProject(project);
    setModalActiveTab('overview');
    setModalGalleryIndex(0);
  };

  const handleCloseModal = () => {
    playSound('click');
    setActiveModalProject(null);
  };

  const handleCtaClick = (section: string) => {
    playSound('click');
    if (onNavigate) {
      onNavigate(section);
    } else {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div id="work" className="bg-slate-50 min-h-screen text-slate-900 pt-4 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-emerald-500/20 selection:text-emerald-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* SUB-NAVIGATION BAR FOR IMPACT DOMAINS */}
        <ImpactSubNav activeTab={activeTab} onSelectTab={handleTabChange} />

        {/* ---------------------------------------------------------------------- */}
        {/* TAB 1: ALL WORKS / GLOBAL PORTFOLIO SHOWCASE */}
        {/* ---------------------------------------------------------------------- */}
        {activeTab === 'portfolio' && (
          <div className="space-y-12 animate-fade-in">
        {/* ---------------------------------------------------------------------- */}
        {/* SECTION 1: GLOBAL PORTFOLIO SHOWCASE HERO (MODERN EDITORIAL CORPORATE) */}
        {/* ---------------------------------------------------------------------- */}
        <section className="relative pt-2 pb-6 space-y-10">
          {/* Subtle architectural ambient background elements */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-gradient-to-b from-emerald-500/[0.04] to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-1/3 left-0 w-[400px] h-[300px] bg-gradient-to-r from-teal-500/[0.03] to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Top Editorial Eyebrow & Global Compliance Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/70 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#326E45]" />
              <span className="text-[11.5px] font-mono font-bold text-slate-800 tracking-wider uppercase">
                METAWAVE INNOVATIONS
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11.5px] font-mono font-medium text-[#326E45] tracking-wide">
                GLOBAL PORTFOLIO & PRODUCTION PROVEN SYSTEMS
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
              <span className="hidden sm:inline-flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#326E45]" />
                14+ Commercial Deployments
              </span>
              <span className="hidden md:inline text-slate-300">•</span>
              <span className="hidden md:inline-flex items-center gap-1.5">
                <Globe size={13} className="text-teal-600" />
                UK • US • Pakistan
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50/80 px-2.5 py-0.5 rounded-full border border-emerald-200/60 font-semibold">
                <ShieldCheck size={13} className="text-[#326E45]" />
                100% Client IP Ownership
              </span>
            </div>
          </div>

          {/* Main Asymmetric Grid: Editorial Narrative vs. Flagship Case Spotlight */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Heading, Value Proposition & Search Controls (Col 7) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.12] font-display"
                >
                  Proven Digital Systems.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#326E45] via-teal-700 to-emerald-700">
                    Engineered for Continental Scale.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 }}
                  className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal"
                >
                  Explore MetaWave Innovations&apos; verified track record of real-world enterprise deployments. From nationwide timber manufacturing ERPs and UK residential care networks to high-frequency publishing and multi-tier cloud infrastructure, discover architectures engineered for resilience, speed, and business growth.
                </motion.p>
              </div>

              {/* Refined Horizontal Ledger (Clean Hairline Metric Strip, Zero Boxed Cards) */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-4 border-y border-slate-200/70"
              >
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-display flex items-baseline gap-0.5">
                    <span>14</span><span className="text-[#326E45] text-xl">+</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800">Live Systems</div>
                  <div className="text-[11px] text-slate-400">Commercial runtime</div>
                </div>
                <div className="space-y-1 sm:border-l sm:border-slate-200/70 sm:pl-6">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-display flex items-baseline gap-0.5">
                    <span>3</span><span className="text-teal-600 text-sm font-mono ml-1">Reg</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800">Global Markets</div>
                  <div className="text-[11px] text-slate-400">UK, US, PK compliance</div>
                </div>
                <div className="space-y-1 sm:border-l sm:border-slate-200/70 sm:pl-6">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-display flex items-baseline gap-0.5">
                    <span>99.98</span><span className="text-[#326E45] text-xl">%</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800">Uptime SLA</div>
                  <div className="text-[11px] text-slate-400">Mission-critical tier</div>
                </div>
                <div className="space-y-1 sm:border-l sm:border-slate-200/70 sm:pl-6">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-display flex items-baseline gap-0.5">
                    <span>100</span><span className="text-teal-600 text-xl">%</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800">Client IP Transfer</div>
                  <div className="text-[11px] text-slate-400">Full source ownership</div>
                </div>
              </motion.div>

              {/* Integrated Editorial Search & Filter Bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.16 }}
                className="space-y-3"
              >
                {/* Search Input */}
                <div className="relative flex items-center group">
                  <Search size={17} className="absolute left-4 text-slate-400 group-focus-within:text-[#326E45] transition-colors pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search systems by industry, client, tech stack (e.g., ERP, Healthcare, Laravel, Cloud)..."
                    className="w-full pl-11 pr-28 py-3 rounded-2xl bg-white hover:border-slate-300 focus:border-[#326E45] border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#326E45]/15 shadow-2xs transition-all"
                  />
                  <div className="absolute right-3 flex items-center gap-1.5">
                    {searchQuery ? (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer transition-colors"
                        title="Clear search"
                      >
                        <X size={14} />
                      </button>
                    ) : null}
                    <span className="text-[10.5px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600">
                      {filteredProjects.length} found
                    </span>
                  </div>
                </div>

                {/* Quick Sector Filter Shortcuts */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                  <span className="font-medium text-slate-600 flex items-center gap-1 text-[11.5px]">
                    <Compass size={13} className="text-[#326E45]" />
                    Sectors:
                  </span>
                  {[
                    { label: 'All Works', cat: 'All Works' },
                    { label: 'Enterprise ERP', cat: 'Enterprise Solutions' },
                    { label: 'AI Solutions', cat: 'AI Solutions' },
                    { label: 'SaaS Platforms', cat: 'SaaS Products' },
                    { label: 'Cloud Systems', cat: 'Cloud Solutions' },
                    { label: 'Mobile Apps', cat: 'Mobile Applications' }
                  ].map((filterItem) => (
                    <button
                      key={filterItem.cat}
                      onClick={() => {
                        playSound('click');
                        setSelectedCategory(filterItem.cat as CategoryFilter);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        selectedCategory === filterItem.cat
                          ? 'bg-[#326E45] text-white font-semibold shadow-2xs'
                          : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/80'
                      }`}
                    >
                      {filterItem.label}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => {
                    playSound('click');
                    const gridEl = document.getElementById('portfolio-grid');
                    if (gridEl) {
                      gridEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#326E45] hover:bg-[#285737] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer group"
                >
                  <span>Explore 14 Verified Case Studies</span>
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => handleCtaClick('contact')}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-medium text-xs sm:text-sm flex items-center gap-2 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
                >
                  <Briefcase size={14} className="text-[#326E45]" />
                  <span>Request Architectural Consultation</span>
                </button>
              </div>

            </div>

            {/* Right Column: Refined Editorial Case Spotlight (Col 5) */}
            <div className="lg:col-span-5 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-3xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4"
              >
                {/* Header with Project Switcher */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#326E45]" />
                    <span className="text-[11px] font-mono font-bold tracking-wider text-[#326E45] uppercase">
                      FLAGSHIP CASE STUDY
                    </span>
                  </div>
                  <span className="text-[10.5px] font-mono text-slate-400">
                    {heroSpotlightIndex + 1} of {heroFeaturedProjects.length}
                  </span>
                </div>

                {/* Minimalist Switcher Strip */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                  {heroFeaturedProjects.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        playSound('click');
                        setHeroSpotlightIndex(idx);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
                        heroSpotlightIndex === idx
                          ? 'bg-[#326E45] text-white shadow-2xs font-semibold'
                          : 'bg-slate-100/80 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                    >
                      {p.title.split(' ')[0]}
                    </button>
                  ))}
                </div>

                {/* Image Frame with Editorial Presentation */}
                <div className="relative h-52 rounded-2xl overflow-hidden border border-slate-200/70 group">
                  <img
                    src={activeSpotlight.bannerImg}
                    alt={activeSpotlight.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[10.5px] font-mono font-semibold text-emerald-800 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full shadow-2xs">
                      {activeSpotlight.badgeTag}
                    </span>
                    <span className="text-[10.5px] font-mono text-slate-700 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-2xs">
                      {activeSpotlight.industry}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-xs font-mono text-emerald-300 block">{activeSpotlight.clientType}</span>
                    <h3 className="text-lg font-bold font-display leading-tight">{activeSpotlight.title}</h3>
                  </div>
                </div>

                {/* Outcome & Brief Overview */}
                <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/60 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400 uppercase tracking-wider text-[10.5px]">Verified Outcome</span>
                    <span className="font-mono font-bold text-[#326E45] flex items-center gap-1">
                      <TrendingUp size={12} />
                      {activeSpotlight.businessValueMetric}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                    {activeSpotlight.overview}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleOpenModal(activeSpotlight)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                  >
                    <span>Read Architecture Case Study</span>
                    <ArrowUpRight size={13} />
                  </button>
                  {activeSpotlight.liveUrl && (
                    <a
                      href={activeSpotlight.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/90 font-medium text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      title="Visit Live Platform"
                    >
                      <span>Live Site</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* ---------------------------------------------------------------------- */}
        {/* SECTION 2: ENTERPRISE VALUE DRIVERS / PROOF PILLARS MATRIX */}
        {/* ---------------------------------------------------------------------- */}
        <section className="space-y-6">
          {/* Section 2 Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-emerald-700 uppercase">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>ENGINEERING RIGOR & DELIVERY GUARANTEES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
                Why Global Enterprises Choose MetaWave Innovations
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl">
                Every client solution is backed by non-negotiable architectural standards, multi-region high availability, and 100% intellectual property transfer.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs shrink-0">
              <span className="font-bold text-emerald-700">6 Core Commitments</span> • Zero Compromise
            </div>
          </div>

          {/* 6 Value Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {ENTERPRISE_VALUE_METRICS.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="bg-white border border-slate-200/90 hover:border-emerald-500/60 rounded-2xl p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-2xs">
                        <Icon size={18} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50/80 border border-emerald-200/80 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {metric.badge}
                      </span>
                    </div>

                    {/* Metric Headline & Title */}
                    <div>
                      <div className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-wide">
                        {metric.metric}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mt-0.5">
                        {metric.title}
                      </h3>
                    </div>

                    {/* Concise Descriptive Paragraph */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {metric.description}
                    </p>
                  </div>

                  {/* Bottom Highlight Feature Tag */}
                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700">
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      {metric.highlight}
                    </span>
                    <ArrowUpRight size={13} className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ---------------------------------------------------------------------- */}
        {/* FILTERING CONTROLS - REFINED, MINIMAL & PREMIUM                         */}
        {/* ---------------------------------------------------------------------- */}
        <section id="portfolio-filter-section" className="space-y-3 pt-1">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-xs space-y-3">
            {/* Primary Category Filter Bar */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div 
                className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none no-scrollbar w-full"
                role="tablist"
                aria-label="Filter portfolio by category"
              >
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  const count = categoryCounts[cat] || 0;
                  const Icon = getCategoryIcon(cat);

                  return (
                    <button
                      key={cat}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => {
                        playSound('click');
                        setSelectedCategory(cat);
                      }}
                      className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 select-none ${
                        isActive
                          ? 'bg-[#326E45] text-white shadow-xs font-semibold'
                          : 'bg-slate-100/75 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent hover:border-slate-200/70'
                      }`}
                    >
                      <Icon size={13} className={isActive ? 'text-white' : 'text-slate-500'} />
                      <span>{cat}</span>
                      <span
                        className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-white text-slate-500 border border-slate-200/70'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Secondary Controls Bar: Industry, Quick Search, Count, Sort, Reset */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              {/* Left Group: Industry Dropdown & Search */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Industry Filter Dropdown */}
                <div className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl px-3 py-1.5 transition-colors">
                  <Building2 size={13} className="text-slate-500" />
                  <span className="text-slate-500 font-medium">Industry:</span>
                  <select
                    id="portfolio-industry-select"
                    aria-label="Filter by industry"
                    value={selectedIndustry}
                    onChange={(e) => {
                      playSound('click');
                      setSelectedIndustry(e.target.value as any);
                    }}
                    className="bg-transparent text-slate-800 font-semibold text-xs focus:outline-none cursor-pointer pr-1"
                  >
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Inline Search Bar */}
                <div className="relative flex items-center min-w-[180px] sm:min-w-[220px]">
                  <Search size={13} className="absolute left-2.5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search projects..."
                    className="w-full pl-8 pr-7 py-1.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200/80 focus:border-[#326E45] focus:ring-1 focus:ring-[#326E45]/20 rounded-xl text-xs text-slate-800 placeholder-slate-400 transition-all outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                      title="Clear search"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* Right Group: Count, Sort Dropdown & Reset Action */}
              <div className="flex items-center justify-between md:justify-end gap-3 pt-1 md:pt-0 border-t md:border-t-0 border-slate-100">
                {/* Result count */}
                <span className="text-slate-500 font-medium">
                  Showing <strong className="text-slate-900 font-bold">{filteredProjects.length}</strong> {filteredProjects.length === 1 ? 'project' : 'projects'}
                </span>

                {/* Sort selector */}
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 py-1.5">
                  <SlidersHorizontal size={12} className="text-slate-500" />
                  <span className="text-slate-500 font-medium hidden sm:inline">Sort:</span>
                  <select
                    id="portfolio-sort-select"
                    aria-label="Sort projects"
                    value={sortBy}
                    onChange={(e) => {
                      playSound('click');
                      setSortBy(e.target.value as any);
                    }}
                    className="bg-transparent text-slate-800 font-semibold text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="title">Alphabetical (A-Z)</option>
                    <option value="newest">Latest Added</option>
                  </select>
                </div>

                {/* Reset Filters button */}
                {(selectedCategory !== 'All Works' || selectedIndustry !== 'All Industries' || searchQuery) && (
                  <button
                    onClick={() => {
                      playSound('click');
                      setSelectedCategory('All Works');
                      setSelectedIndustry('All Industries');
                      setSearchQuery('');
                      setSortBy('featured');
                    }}
                    className="inline-flex items-center gap-1 text-[#326E45] hover:text-emerald-800 font-semibold hover:underline cursor-pointer transition-colors"
                  >
                    <X size={13} />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------------- */}
        {/* PORTFOLIO GRID: MINIMAL DEFAULT CARDS + ESSENTIAL HOVER REVEAL          */}
        {/* ---------------------------------------------------------------------- */}
        <section id="portfolio-grid">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No matching projects found</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Try selecting a different category or clearing your search filters to explore MetaWave's full enterprise portfolio.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All Works');
                  setSelectedIndustry('All Industries');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                Show All Showcase Works
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <PortfolioCard
                    key={project.id}
                    project={project}
                    onOpenModal={handleOpenModal}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* ---------------------------------------------------------------------- */}
        {/* CLIENT SUCCESS STORIES & VERIFIED TESTIMONIALS */}
        {/* ---------------------------------------------------------------------- */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold uppercase mb-2">
                <Quote size={13} className="text-emerald-600" />
                <span>Executive Feedback</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
                Client Success & Leadership Endorsements
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Hear directly from technical executives and healthcare leaders who transformed their digital capabilities with MetaWave's engineered platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "MetaWave engineered our post-quantum security gateway in record time with zero disruption to active API pipelines. Their team's technical rigor and compliance execution are outstanding.",
                author: "Dr. Marcus Vance",
                role: "Chief Information Security Officer",
                company: "Global Cyber Security Alliances",
                metric: "Zero-Trust Architecture"
              },
              {
                quote: "The secure GenAI clinical assistant engineered by MetaWave reduced physician shift handover documentation times by 40%. It is now mission-critical infrastructure for our hospital network.",
                author: "Elena Rostova, MD",
                role: "VP of Digital Healthcare Operations",
                company: "Apex Health Networks",
                metric: "40% Handover Time Saved"
              },
              {
                quote: "MetaWave's predictive freight dispatch algorithm delivered a 28% reduction in fuel overhead during peak Q4 logistics operations while routing over 10,000 active drivers real-time.",
                author: "Julian Thorne",
                role: "Director of Enterprise Logistics Technology",
                company: "OmniLogistics Corp",
                metric: "28% Reduced Fuel Expenses"
              }
            ].map((test, tIdx) => (
              <motion.div
                key={tIdx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: tIdx * 0.1 }}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                      {test.metric}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{test.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-900 text-emerald-400 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                    {test.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{test.author}</h4>
                    <p className="text-[11px] text-slate-500 font-medium">{test.role}</p>
                    <p className="text-[10px] text-emerald-700 font-mono">{test.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------------- */}
        {/* FREQUENTLY ASKED QUESTIONS (PORTFOLIO FAQS) */}
        {/* ---------------------------------------------------------------------- */}
        <section className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[#326E45] text-xs font-mono font-bold uppercase">
                <HelpCircle size={14} />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-bold text-slate-900 font-display tracking-tight">
                Portfolio & Engagement FAQ
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-sm font-normal">
              Answers to common enterprise questions regarding source code ownership, security compliance, and engagement delivery models.
            </p>
          </div>

          <div className="space-y-3">
            {PORTFOLIO_FAQS.map((faq, fIdx) => {
              const isOpen = openFaqIdx === fIdx;
              return (
                <div
                  key={fIdx}
                  className="bg-slate-50/70 hover:bg-slate-50 border border-slate-200/70 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => {
                      playSound('click');
                      setOpenFaqIdx(isOpen ? null : fIdx);
                    }}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2">
                      <span className="text-[#326E45] font-mono text-xs">0{fIdx + 1}.</span>
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#326E45]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 font-normal"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------------------------------------------------------------------- */}
        {/* BOTTOM GLOBAL CALL TO ACTION */}
        {/* ---------------------------------------------------------------------- */}
        <section className="bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 text-slate-900 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xs border border-slate-200/80">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#326E45] text-xs font-mono font-semibold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Partner With MetaWave Innovations</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight font-display text-slate-900">
              Ready to Engineer Next-Generation Digital Solutions for Your Enterprise?
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Our engineering team collaborates with market leaders to design, build, and deploy high-impact software, custom AI models, and scalable cloud platforms.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => handleCtaClick('contact')}
                className="px-6 py-3.5 rounded-2xl bg-[#326E45] hover:bg-[#285737] text-white font-semibold text-sm transition-all shadow-md shadow-[#326E45]/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Schedule Executive Consultation</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => handleCtaClick('services')}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm transition-all cursor-pointer shadow-xs"
              >
                <span>Explore Enterprise Services</span>
              </button>
            </div>
          </div>
        </section>
        </div>
        )}

        {/* ---------------------------------------------------------------------- */}
        {/* TAB 2: 150+ SHIPPED ENTERPRISE PROJECTS */}
        {/* ---------------------------------------------------------------------- */}
        {activeTab === 'enterprise-projects' && (
          <EnterpriseProjectsTab onNavigate={onNavigate} onSelectProjectTab={handleTabChange} />
        )}

        {/* ---------------------------------------------------------------------- */}
        {/* TAB 3: HEALTHTECH & CLINICAL EHR SYSTEMS */}
        {/* ---------------------------------------------------------------------- */}
        {activeTab === 'healthtech-case-studies' && (
          <HealthTechTab 
            onNavigate={onNavigate} 
            onOpenModal={(id) => {
              const p = PORTFOLIO_PROJECTS.find(x => x.id === id);
              if (p) handleOpenModal(p);
            }} 
          />
        )}

        {/* ---------------------------------------------------------------------- */}
        {/* TAB 4: FINTECH, BANKING & PROPTECH SYSTEMS */}
        {/* ---------------------------------------------------------------------- */}
        {activeTab === 'fintech-proptech-outcomes' && (
          <FinTechTab 
            onNavigate={onNavigate} 
            onOpenModal={(id) => {
              const p = PORTFOLIO_PROJECTS.find(x => x.id === id);
              if (p) handleOpenModal(p);
            }} 
          />
        )}

        {/* ---------------------------------------------------------------------- */}
        {/* TAB 5: EDTECH & LMS PLATFORMS */}
        {/* ---------------------------------------------------------------------- */}
        {activeTab === 'edtech-learning-impact' && (
          <EdTechTab 
            onNavigate={onNavigate} 
            onOpenModal={(id) => {
              const p = PORTFOLIO_PROJECTS.find(x => x.id === id);
              if (p) handleOpenModal(p);
            }} 
          />
        )}

        {/* ---------------------------------------------------------------------- */}
        {/* TAB 6: GLOBAL SUPPLY CHAIN & LOGISTICS */}
        {/* ---------------------------------------------------------------------- */}
        {activeTab === 'supply-chain-logistics' && (
          <LogisticsTab 
            onNavigate={onNavigate} 
            onOpenModal={(id) => {
              const p = PORTFOLIO_PROJECTS.find(x => x.id === id);
              if (p) handleOpenModal(p);
            }} 
          />
        )}

      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* COMPREHENSIVE INTERACTIVE PROJECT SHOWCASE MODAL */}
      {/* ---------------------------------------------------------------------- */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            {/* Modal Dialog Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl border border-slate-200 z-10 text-slate-900 my-auto"
            >
              {/* Modal Banner & Gallery Section */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
                <img 
                  src={activeModalProject.galleryImgs[modalGalleryIndex] || activeModalProject.bannerImg} 
                  alt={activeModalProject.title}
                  width={900}
                  height={320}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-90 transition-all duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Top Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer z-20"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                {/* Gallery Thumbnail Selector Floating on Banner */}
                {activeModalProject.galleryImgs.length > 1 && (
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
                    <span className="text-[10px] font-mono font-bold text-slate-300 px-2 flex items-center gap-1">
                      <ImageIcon size={12} className="text-emerald-400" />
                      <span>Gallery ({modalGalleryIndex + 1}/{activeModalProject.galleryImgs.length})</span>
                    </span>
                    {activeModalProject.galleryImgs.map((imgUrl, gIdx) => (
                      <button
                        key={gIdx}
                        onClick={() => {
                          playSound('click');
                          setModalGalleryIndex(gIdx);
                        }}
                        className={`w-7 h-7 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                          modalGalleryIndex === gIdx 
                            ? 'border-emerald-400 scale-110 shadow-sm' 
                            : 'border-white/30 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={imgUrl} alt={`Thumbnail ${gIdx}`} width={28} height={28} loading="lazy" decoding="async" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Banner Content */}
                <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white z-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-emerald-600 text-white shadow-xs">
                      {activeModalProject.badgeTag}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-white/20 text-white backdrop-blur-md">
                      {activeModalProject.industry}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold backdrop-blur-md ${
                      activeModalProject.status.toLowerCase().includes('under process')
                        ? 'bg-amber-500/30 text-amber-300 border border-amber-500/40'
                        : 'text-emerald-400 bg-slate-900/80'
                    }`}>
                      {activeModalProject.status}
                    </span>
                    {activeModalProject.liveUrl && (
                      <a
                        href={activeModalProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-md ml-auto"
                      >
                        <span>Visit Live Site</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight font-display">
                    {activeModalProject.title}
                  </h2>
                  
                  <div className="text-xs text-slate-300 font-mono">
                    Client: <strong className="text-white">{activeModalProject.clientType}</strong>
                  </div>
                </div>
              </div>

              {/* Modal Navigation Tabs */}
              <div className="px-6 sm:px-8 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-20 backdrop-blur-md">
                <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto py-3 no-scrollbar">
                  {[
                    { id: 'overview', label: 'Overview & Impact', icon: FileText },
                    { id: 'features', label: 'Core Features', icon: Layers },
                    { id: 'tech', label: 'Tech & Architecture', icon: Cpu },
                    { id: 'caseStudy', label: 'Case Study & Results', icon: Award }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = modalActiveTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          playSound('click');
                          setModalActiveTab(tab.id as any);
                        }}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                          isActive 
                            ? 'bg-slate-900 text-white shadow-xs' 
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                        }`}
                      >
                        <Icon size={14} className={isActive ? 'text-emerald-400' : 'text-slate-400'} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Modal Tab Content */}
              <div className="p-6 sm:p-8">
                
                {/* TAB 1: OVERVIEW & IMPACT */}
                {modalActiveTab === 'overview' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    {/* Executive Overview */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Executive Overview</h3>
                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                        {activeModalProject.overview}
                      </p>
                    </div>

                    {/* Validated Outcome Highlight Box */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-mono font-bold uppercase text-emerald-800">
                          Validated Business Impact
                        </div>
                        <div className="text-xl font-black text-emerald-950 font-display mt-0.5">
                          {activeModalProject.businessValueMetric}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          handleCloseModal();
                          handleCtaClick('contact');
                        }}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
                      >
                        <span>Request Similar Solution</span>
                        <ArrowUpRight size={14} />
                      </button>
                    </div>

                    {/* Problem vs Solution Side-by-Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl space-y-2">
                        <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                          <Activity size={15} />
                          <span>The Challenge</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {activeModalProject.problemStatement}
                        </p>
                      </div>

                      <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl space-y-2">
                        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                          <CheckCircle2 size={15} />
                          <span>Solution Engineered</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {activeModalProject.solutionProvided}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: CORE FEATURES */}
                {modalActiveTab === 'features' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div>
                      <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Key Functional Modules & System Features</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {activeModalProject.coreFeatures.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-3 bg-slate-50 border border-slate-200/80 p-4 rounded-xl text-xs sm:text-sm text-slate-800 font-medium leading-snug">
                            <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Core Deliverables Provided</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {activeModalProject.deliverables.map((deliv, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
                            <Check size={14} className="text-emerald-600" />
                            <span>{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: TECH & ARCHITECTURE */}
                {modalActiveTab === 'tech' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div>
                      <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Technology Stack & Tools</h3>
                      <div className="flex flex-wrap gap-2">
                        {activeModalProject.techStack.map((tech, tIdx) => (
                          <span key={tIdx} className="px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-bold flex items-center gap-1.5">
                            <Code size={13} className="text-emerald-600" />
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Client & Compliance Standards Satisfied</h3>
                      <div className="space-y-2">
                        {activeModalProject.clientRequirements.map((req, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-700 font-medium">
                            <ShieldCheck size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 4: CASE STUDY & RESULTS */}
                {modalActiveTab === 'caseStudy' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    {activeModalProject.caseStudy ? (
                      <div className="space-y-5">
                        <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4">
                          <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs uppercase">
                            <Sparkles size={15} />
                            <span>Strategic Engineering Approach</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {activeModalProject.caseStudy.approach}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Key Technological Innovations</h4>
                          <div className="space-y-2">
                            {activeModalProject.caseStudy.keyInnovations.map((inn, iIdx) => (
                              <div key={iIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 font-medium">
                                <Zap size={16} className="text-amber-500 shrink-0 mt-0.5" />
                                <span>{inn}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Quantifiable Business Results</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {activeModalProject.caseStudy.results.map((res, rIdx) => (
                              <div key={rIdx} className="bg-emerald-50 border border-emerald-200/80 p-4 rounded-xl text-center space-y-1">
                                <Award size={18} className="text-emerald-600 mx-auto" />
                                <p className="text-xs text-emerald-950 font-bold leading-snug">{res}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-slate-500 text-sm">Full case study documentation available upon request.</div>
                    )}
                  </motion.div>
                )}

                {/* RELATED PROJECTS RECOMMENDATIONS */}
                {relatedModalProjects.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                        <Compass size={14} className="text-emerald-600" />
                        <span>Related Enterprise Solutions</span>
                      </h4>
                      <span className="text-[11px] text-slate-500">Explore similar builds</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {relatedModalProjects.map((relProj) => (
                        <div
                          key={relProj.id}
                          onClick={() => {
                            playSound('click');
                            setActiveModalProject(relProj);
                            setModalGalleryIndex(0);
                            setModalActiveTab('overview');
                          }}
                          className="group bg-slate-50 border border-slate-200/80 hover:border-emerald-400 p-3.5 rounded-2xl cursor-pointer transition-all flex items-center gap-3"
                        >
                          <img
                            src={relProj.bannerImg}
                            alt={relProj.title}
                            width={56}
                            height={56}
                            loading="lazy"
                            decoding="async"
                            className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop';
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <span className="text-[9px] font-mono font-bold uppercase text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md inline-block mb-1">
                              {relProj.category}
                            </span>
                            <h5 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                              {relProj.title}
                            </h5>
                            <p className="text-[10px] text-slate-500 truncate mt-0.5">
                              {relProj.clientType}
                            </p>
                          </div>
                          <ArrowUpRight size={16} className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Footer CTA Bar */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={handleCloseModal}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Close Showcase
                  </button>

                  <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
                    {activeModalProject.liveUrl && (
                      <a
                        href={activeModalProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Visit Live Platform</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                    <button
                      onClick={() => {
                        handleCloseModal();
                        handleCtaClick('contact');
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Schedule Executive Meeting</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

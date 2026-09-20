import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Search, 
  ChevronDown, 
  Globe, 
  Check, 
  Sparkles,
  TrendingUp,
  LineChart,
  Users,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Layers,
  Cpu,
  Grid,
  Command,
  Sun,
  Home,
  Terminal,
  Folder,
  ChevronRight,
  Sparkle,
  Newspaper,
  Volume2,
  VolumeX,
  ShoppingBag
} from 'lucide-react';
import MetaWaveLogo from './MetaWaveLogo';
import { isSoundEnabled, setSoundEnabled, playSound } from '../utils/audio';
import { 
  CAPABILITIES_ITEMS, 
  OFFERINGS_ITEMS, 
  IMPACT_ITEMS, 
  BLOG_ITEMS,
  DropdownItem 
} from '../data/navigationData';

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  onPreload?: (sectionId: string) => void;
  activeSection: string;
  isBannerOpen?: boolean;
}

// Magnetic Wrapper Component for high-fidelity visual cursor interactions
function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 220, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

// Concrete solutions from User Attachment Pic 2
const PICTURE_SOLUTIONS = [
  { 
    name: 'POS and Billing System', 
    desc: 'Fast billing, sales reports & payment integration.', 
    icon: Cpu,
    targetId: 'solutions',
    highlights: ['20ms Multi-lane invoice creation', 'Dual-Offline synchronization backup', 'Native thermal printing compatible'],
    useCase: 'Best for Retail & Supermarkets',
    statLabel: 'BILLING VELOCITY',
    statVal: '99.98% uptime',
    brief: 'Our POS and Billing System handles concurrent multi-register lanes easily. It features continuous off-line state queuing, so your cashier transactions never stop even during networking drops. Automatic nightly reports compile locally then push to centralized cloud dashboards instantly.'
  },
  { 
    name: 'Educational and Department System', 
    desc: 'Smart management for modern educational institutions.', 
    icon: Layers,
    targetId: 'solutions',
    highlights: ['Automated visual study roster sheets', 'Parent SMS updates dispatch triggers', 'Cross-department secure access credentials'],
    useCase: 'Best for Colleges & Academies',
    statLabel: 'ADMIN EFFICIENCY',
    statVal: 'Save 35hrs/week',
    brief: 'Manage student records, enrollment classes, parent relations, grading boards, and student rosters seamlessly. It contains a beautiful interactive timeline scheduler to help build balanced course schedules without conflicting resource reservations.'
  },
  { 
    name: 'Restaurant Management System', 
    desc: 'Simplify restaurant operations and daily management.', 
    icon: Activity,
    targetId: 'solutions',
    highlights: ['Microsecond kitchen dispatcher logs', 'Visual multi-floor dining tables layout', 'Instant customer checkout splitter'],
    useCase: 'Best for Cafes & Restaurants',
    statLabel: 'KITCHEN SPEED',
    statVal: '12% faster turnover',
    brief: 'Connect your waiters, cashiers, kitchen staff, and management on an integrated platform. Includes visual tables floor-plan design editor, instant split-bill math tools, online food delivery channels sync, and direct kitchen display triggers.'
  },
  { 
    name: 'AI Powered Business Analytics', 
    desc: 'Turn business data into smart decisions with adaptive reporting portals.', 
    icon: LineChart,
    targetId: 'ai-machine-learning',
    highlights: ['Dynamic trend prediction loops', 'Fraudulent transaction signal rules', 'Custom PDF spreadsheet builder'],
    useCase: 'Best for SaaS & FinTech',
    statLabel: 'FORECASTER LIFT',
    statVal: '4.2x better ROI',
    brief: 'An elegant AI-powered telemetry reporting portal that reads multiple data databases or offline csv sheets. Generates direct trend forecasting charts, notifies anomalies immediately, and outputs professional grade cards about enterprise health indices.'
  },
  { 
    name: 'Business & Warehouse Management', 
    desc: 'Manage inventory and warehouse operations efficiently with automated ledgers.', 
    icon: ShieldCheck,
    targetId: 'enterprise-systems',
    highlights: ['Suppliers auto-restocking thresholds', 'Hardware barcode scan protocols', 'Double-entry audit trial ledger'],
    useCase: 'Best for Logistical Nodes',
    statLabel: 'STOCK ACCURACY',
    statVal: '99.9% precise logs',
    brief: 'Maintain an absolute digital ledger tracking products, ingredients, products batches, and warehouse locations. Program automated vendor purchase ordering when items hit critical thresholds, preventing stockout emergencies and logistical bottlenecks.'
  }
];

// Concrete services from User Attachment Pic 1
const PICTURE_SERVICES = [
  { 
    name: 'Website Design & Development', 
    desc: 'High-performance websites built for branding, growth, and online presence.', 
    icon: Globe,
    targetId: 'web-development',
    highlights: ['100/100 Google Lighthouse audit scores', 'Self-owned custom CMS configurations', 'Structured metadata schemas for search indexing'],
    useCase: 'Handcrafted React & Next.js',
    statLabel: 'SPEED SCORE',
    statVal: '0.4s load latency',
    brief: 'We build beautiful and lightning-fast websites using modern web development practices. Our products highlight clean layout spacing, pristine typography, smooth framer keyframe entries, and state-of-the-art page transition routes.'
  },
  { 
    name: 'Mobile App Development', 
    desc: 'Scalable mobile solutions designed for performance and engagement.', 
    icon: Cpu,
    targetId: 'mobile-development',
    highlights: ['Perfect native 60 FPS transitions', 'Cross-platform single-base programming', 'Direct Apple & Google Play verification'],
    useCase: 'Hybrid Flutter & React Native',
    statLabel: 'PROD RELIABILITY',
    statVal: '99.9% Crash-Free',
    brief: 'Our mobile engineers craft flawless native applications for touch targets on both iOS and Android. With offline-resilient local sync, automatic background push telemetry, and clean modular structures, your application remains robust anywhere.'
  },
  { 
    name: 'UI/UX & Brand Experience Design', 
    desc: 'Modern design systems focused on usability and strong user experience.', 
    icon: Sparkles,
    targetId: 'ui-ux-design',
    highlights: ['Structured layout component wireframes', 'Responsive high fidelity visual guides', 'Cohesive typography & color matching systems'],
    useCase: 'Branding & Figma guidelines',
    statLabel: 'ENGAGEMENT LIFT',
    statVal: '+44% retention rate',
    brief: 'We sculpt elegant visual assets, customized balance grids, specific color pairings, and interactive prototypes. Every design is focused on strong ergonomic readability, keeping your brand modern, trustworthy, and visually irresistible.'
  },
  { 
    name: 'Digital Growth Strategy & Marketing', 
    desc: 'Accelerating brands through masterclass strategic digital marketing loops.', 
    icon: TrendingUp,
    targetId: 'digital-marketing',
    highlights: ['Data-driven target retargeting tracking', 'Surgical campaign optimization systems', 'Transparent weekly leads metrics reports'],
    useCase: 'SEO, PPC & Funnel Building',
    statLabel: 'LEAD ACQUISITION',
    statVal: '+180% growth scale',
    brief: 'We align modern data marketing paths to target high-intent customer accounts. We structure perfect conversion funnels and lead generation templates to optimize marketing budgets and grow organic, compounding traffic channels.'
  },
  { 
    name: 'SEO & Performance Optimization', 
    desc: 'Optimized speed solutions to improve organic ranking, latency, and site visibility.', 
    icon: Activity,
    targetId: 'seo-services',
    highlights: ['Green Core Web Vitals audit pass', 'High authority key-phrase structuring', 'Rich Google local results schema indexing'],
    useCase: 'Speed & page index authority',
    statLabel: 'CONVERSION GAIN',
    statVal: '+28% customer signups',
    brief: 'We rebuild sluggish landing platforms to reduce server response lag and client-side page load bottlenecks. This drastically drops bounce rates, pushes search ranking results higher, and secures a competitive edge on digital search results.'
  }
];

export function Navbar({ onNavClick, onPreload, activeSection, isBannerOpen = true }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategoryFilter, setSearchCategoryFilter] = useState<'ALL' | 'CAPABILITIES' | 'OFFERINGS' | 'IMPACT' | 'BLOG' | 'EXECUTIVE'>('ALL');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [soundEnabled, setSoundEnabledState] = useState(isSoundEnabled());

  // Accordion open/close states for mobile drawer
  const [mobileCapabilitiesOpen, setMobileCapabilitiesOpen] = useState(false);
  const [mobileOfferingsOpen, setMobileOfferingsOpen] = useState(false);
  const [mobileImpactOpen, setMobileImpactOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);

  // Screen width monitoring for robust vector logo proportional scaling
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const logoSize = (() => {
    if (windowWidth < 380) return 34;
    if (windowWidth < 480) return 38;
    if (windowWidth < 768) return 42;
    if (windowWidth < 1024) return 46;
    if (windowWidth < 1280) return 48;
    return 54;
  })();

  useEffect(() => {
    const handleSoundChange = () => {
      setSoundEnabledState(isSoundEnabled());
    };
    window.addEventListener('mwi_sound_changed', handleSoundChange);
    return () => window.removeEventListener('mwi_sound_changed', handleSoundChange);
  }, []);

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    if (nextVal) {
      playSound('toggle');
    }
  };
  
  const [activeCapabilityIdx, setActiveCapabilityIdx] = useState(0);
  const [activeOfferingIdx, setActiveOfferingIdx] = useState(0);
  const [activeImpactIdx, setActiveImpactIdx] = useState(0);
  const [activeBlogIdx, setActiveBlogIdx] = useState(0);

  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    window.dispatchEvent(new CustomEvent('mwi_mobile_menu_state', { detail: { open: mobileMenuOpen } }));
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleOpenMenu = () => setMobileMenuOpen(true);
    const handleCloseMenu = () => setMobileMenuOpen(false);
    const handleOpenSearchEvent = () => setSearchOpen(true);

    window.addEventListener('mwi_open_mobile_menu', handleOpenMenu);
    window.addEventListener('mwi_close_mobile_menu', handleCloseMenu);
    window.addEventListener('mwi_open_search', handleOpenSearchEvent);

    return () => {
      window.removeEventListener('mwi_open_mobile_menu', handleOpenMenu);
      window.removeEventListener('mwi_close_mobile_menu', handleCloseMenu);
      window.removeEventListener('mwi_open_search', handleOpenSearchEvent);
    };
  }, []);

  const handleMouseEnterMenu = (menu: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveMenu(menu);
    onPreload?.(menu);
  };

  const handleMouseLeaveMenu = () => {
    closeTimerRef.current = window.setTimeout(() => {
      setActiveMenu(null);
    }, 280);
  };

  const handleNavActions = (targetId: string) => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
    onPreload?.(targetId);
    onNavClick(targetId);
  };

  const navModules = [
    { id: 'home', label: 'HOME', icon: Home, type: 'link' as const, targetId: 'home', className: 'flex' },
    { id: 'capabilities', label: 'CAPABILITIES', icon: Sparkles, type: 'dropdown' as const, targetId: 'capabilities', className: 'flex' },
    { id: 'offerings', label: 'OFFERINGS', icon: Cpu, type: 'dropdown' as const, targetId: 'solutions', className: 'flex' },
    { id: 'impact', label: 'IMPACT', icon: Folder, type: 'dropdown' as const, targetId: 'portfolio', className: 'flex' },
    { id: 'blog', label: 'BLOG', icon: Newspaper, type: 'link' as const, targetId: 'blog', className: 'flex' }
  ];

  const getActiveModuleId = () => {
    if (activeMenu) return activeMenu;
    
    const raw = (activeSection || '').trim().toLowerCase();
    let clean = raw.startsWith('#') ? raw.slice(1) : raw;
    if (clean.endsWith('/') && clean.length > 1) {
      clean = clean.slice(0, -1);
    }

    if (!clean || clean === '/' || clean === 'home') {
      return 'home';
    }

    if (
      clean === 'capabilities' ||
      clean === '/capabilities' ||
      clean.includes('web-development') ||
      clean.includes('mobile-development') ||
      clean.includes('custom-software') ||
      clean.includes('full-stack') ||
      clean.includes('ui-ux') ||
      clean.includes('cloud') ||
      clean.includes('ai-') ||
      clean.includes('automation') ||
      clean.includes('seo') ||
      clean.includes('ecommerce') ||
      clean.includes('crm-development') ||
      clean.includes('erp-development') ||
      clean.includes('api-') ||
      clean.includes('enterprise-systems') ||
      clean.includes('consulting') ||
      clean.includes('digital-marketing') ||
      clean.includes('tech-stack')
    ) {
      return 'capabilities';
    }

    if (
      clean === 'offerings' ||
      clean === '/offerings' ||
      clean === 'solutions' ||
      clean === '/solutions' ||
      clean === 'shop' ||
      clean === '/shop' ||
      clean.includes('solutions/') ||
      clean.includes('products')
    ) {
      return 'offerings';
    }

    if (
      clean === 'impact' ||
      clean === '/impact' ||
      clean === 'portfolio' ||
      clean === '/portfolio' ||
      clean.includes('endeavors') ||
      clean.includes('work') ||
      clean.includes('case-studies')
    ) {
      return 'impact';
    }

    if (
      clean === 'blog' ||
      clean === '/blog' ||
      clean.startsWith('blog/') ||
      clean.startsWith('/blog') ||
      clean.startsWith('blog-post-') ||
      clean.includes('publications')
    ) {
      return 'blog';
    }

    return null;
  };

  const activeModuleId = getActiveModuleId();

  const searchableEntries = [
    ...CAPABILITIES_ITEMS.map(item => ({
      name: item.name,
      text: item.desc + ' ' + (item.brief || '') + ' ' + (item.highlights?.join(', ') || ''),
      id: item.targetId || 'capabilities',
      category: 'CAPABILITIES' as const,
      badge: item.useCase || 'Engineering',
      statLabel: item.statLabel || 'CAPABILITY',
      statVal: item.number || '01'
    })),
    ...CAPABILITIES_ITEMS.flatMap(group => 
      (group.subservices || []).map(sub => ({
        name: sub.name,
        text: sub.tagline + ' ' + (sub.desc || '') + ' ' + (sub.techStack?.join(' ') || ''),
        id: sub.targetRoute || group.targetId || 'capabilities',
        category: 'CAPABILITIES' as const,
        badge: group.shortTitle || 'Practice',
        statLabel: (typeof sub.metrics === 'object' ? sub.metrics?.label : 'METRIC') || 'METRIC',
        statVal: (typeof sub.metrics === 'object' ? sub.metrics?.value : sub.metrics) || 'Verified'
      }))
    ),
    ...OFFERINGS_ITEMS.map(item => ({
      name: item.name,
      text: item.desc + ' ' + (item.brief || '') + ' ' + (item.highlights?.join(', ') || ''),
      id: item.targetId || 'solutions',
      category: 'OFFERINGS' as const,
      badge: item.badge || item.useCase || 'Product Solution',
      statLabel: item.statLabel || 'METRIC',
      statVal: item.statVal || 'Active'
    })),
    ...IMPACT_ITEMS.map(item => ({
      name: item.name,
      text: item.desc + ' ' + (item.brief || '') + ' ' + (item.highlights?.join(', ') || ''),
      id: item.targetId || 'portfolio',
      category: 'IMPACT' as const,
      badge: item.useCase || 'Case Outcome',
      statLabel: item.statLabel || 'DELIVERED',
      statVal: item.statVal || 'Verified'
    })),
    ...BLOG_ITEMS.map(item => ({
      name: item.name,
      text: item.desc + ' ' + (item.brief || '') + ' ' + (item.highlights?.join(', ') || ''),
      id: item.targetId || 'blog',
      category: 'BLOG' as const,
      badge: item.useCase || 'Publication',
      statLabel: item.statLabel || 'READ TIME',
      statVal: item.statVal || '5 Min'
    })),
    {
      name: 'Schedule NDA Architecture Consultation',
      text: 'Direct 1-on-1 consultation with a MetaWave Solutions Architect for bespoke technical scoping, security compliance & NDA evaluation.',
      id: 'contact',
      category: 'EXECUTIVE' as const,
      badge: 'Priority Ingress',
      statLabel: 'SLA RESPONSE',
      statVal: '< 2 Hours'
    },
    {
      name: 'ISO 27001 & SOC-2 Type II Security Standard',
      text: 'Zero-trust network isolation, encrypted patient & financial data rails, automated daily backups, and 100% IP code transfer.',
      id: 'about',
      category: 'EXECUTIVE' as const,
      badge: 'Security Guarantee',
      statLabel: 'COMPLIANCE',
      statVal: 'SOC-2 Type II'
    },
    {
      name: 'Production Tech Stack Matrix',
      text: 'React 19, Next.js 15, Node.js, Python, Gemini 1.5, AWS, PostgreSQL, Docker & Kubernetes.',
      id: 'tech-stack',
      category: 'CAPABILITIES' as const,
      badge: 'Certified Stack',
      statLabel: 'VERSIONS',
      statVal: '20+ Mastered'
    },
    {
      name: 'Global Tech Network & Strategic Partnerships',
      text: 'Global command operations across Karachi HQ, London, Saudi Arabia & France with AWS, GCP, Azure, NVIDIA, Oracle & SAP alliances.',
      id: 'global-network',
      category: 'EXECUTIVE' as const,
      badge: 'Global Network',
      statLabel: 'GLOBAL HUBS',
      statVal: '4 Command Hubs'
    },
    {
      name: 'Careers & Global Engineering Roles',
      text: 'Explore open senior engineering, AI research, and cloud infrastructure positions at MetaWave Innovations.',
      id: 'careers',
      category: 'EXECUTIVE' as const,
      badge: 'Global Talent',
      statLabel: 'OPEN ROLES',
      statVal: '6 Active Roles'
    }
  ];

  const searchResults = searchableEntries.filter(entry => {
    const matchesCategory = searchCategoryFilter === 'ALL' || entry.category === searchCategoryFilter;
    if (!matchesCategory) return false;
    if (searchQuery.trim().length === 0) return true;
    const query = searchQuery.toLowerCase();
    const haystack = (entry.name + ' ' + entry.text + ' ' + entry.category + ' ' + (entry.badge || '')).toLowerCase();
    return haystack.includes(query);
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery, searchCategoryFilter, searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const handleSearchKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < searchResults.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : searchResults.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (searchResults[selectedIndex]) {
          const item = searchResults[selectedIndex];
          setSearchOpen(false);
          setSearchQuery('');
          handleNavActions(item.id);
        }
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleSearchKeyDown);
    return () => window.removeEventListener('keydown', handleSearchKeyDown);
  }, [searchOpen, selectedIndex, searchResults]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-[500ms] ${
          isBannerOpen
            ? isScrolled 
              ? 'top-[6px] sm:top-[8px] h-[58px] sm:h-[64px]' 
              : 'top-[44px] sm:top-[50px] md:top-[58px] h-[72px] sm:h-[80px]'
            : isScrolled
              ? 'top-[6px] sm:top-[8px] h-[58px] sm:h-[64px]'
              : 'top-[8px] sm:top-[12px] md:top-[16px] h-[72px] sm:h-[80px]'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div
          className={`w-[98%] xl:w-[96%] max-w-8xl h-full flex items-center justify-between transition-all duration-[500ms] pointer-events-auto ${
            isScrolled
              ? 'px-2.5 xs:px-3.5 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-[20px] sm:rounded-[22px] bg-white/95 backdrop-blur-[24px] border border-slate-200 shadow-[0_12px_32px_-8px_rgba(15,23,42,0.08)] scale-[1.00]'
              : 'px-3 xs:px-4.5 sm:px-5.5 md:px-6 py-2.5 sm:py-3.5 rounded-[22px] sm:rounded-[28px] bg-white/90 backdrop-blur-[20px] border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] hover:border-slate-300'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {/* LEFT ZONE: BRAND CORE LAUNCHER WITH NESTED LOGO */}
          <button
            onClick={() => handleNavActions('home')}
            className="flex items-center gap-1 sm:gap-2 sm:gap-2.5 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:rounded-xl cursor-pointer shrink-0"
            id="brand-core-launcher"
            aria-label="MetaWave Innovations Home"
          >
            <div className="w-[34px] h-[34px] xs:w-[38px] xs:h-[38px] sm:w-[42px] sm:h-[42px] md:w-[46px] md:h-[46px] lg:w-[48px] lg:h-[48px] xl:w-[54px] xl:h-[54px] flex items-center justify-center shrink-0">
              <MetaWaveLogo size={logoSize} className="transition-transform duration-300 group-hover:scale-[1.03] active:scale-95" />
            </div>

            <div className="flex flex-col text-left justify-center pl-0.5 select-none">
              <div className="flex items-baseline gap-0.5 sm:gap-1">
                <span className="font-display font-bold text-[clamp(11.5px,1.2vw+8px,16px)] text-slate-900 tracking-tight leading-none block">
                  MetaWave Innovations
                </span>
                <span className="font-sans font-light text-[clamp(6px,0.4vw+5px,8px)] text-slate-400 tracking-wider uppercase leading-none">
                  LTD
                </span>
              </div>
              
              <div className="h-[1px] sm:h-[1.5px] bg-gradient-to-r from-emerald-500 via-[#326E45] to-teal-600 w-full mt-1 sm:mt-1.5 mb-0.5 sm:mb-1 rounded-full opacity-90" />
              
              <span className="block text-[clamp(6.5px,0.5vw+5px,8px)] font-mono tracking-[0.14em] sm:tracking-[0.18em] text-slate-500 font-bold uppercase leading-none">
                GLOBAL TECH PARTNERS
              </span>
            </div>
          </button>

          {/* CENTER ZONE: PILL NAVIGATION GRID */}
          <nav 
            className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 bg-slate-100/70 border border-slate-200/60 rounded-full p-1.5 relative shadow-inner"
            onMouseLeave={() => setHoveredItem(null)}
            aria-label="Primary Navigation"
          >
            {navModules.map((module) => {
              const IconComponent = module.icon;
              const isDropdown = module.type === 'dropdown';
              const isActive = activeModuleId === module.id;
              const isHovered = hoveredItem === module.id;

              return (
                <button
                  key={module.id}
                  onMouseEnter={() => {
                    setHoveredItem(module.id);
                    if (isDropdown) handleMouseEnterMenu(module.id as any);
                  }}
                  onMouseLeave={() => {
                    if (isDropdown) handleMouseLeaveMenu();
                  }}
                  onClick={(e) => {
                    if (module.id === 'impact') {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveMenu(activeMenu === 'impact' ? null : 'impact');
                      return;
                    }
                    handleNavActions(module.targetId || module.id);
                  }}
                  className={`relative flex items-center gap-1.5 xl:gap-2 px-3 xl:px-4 py-1.5 xl:py-2 rounded-full transition-all duration-300 select-none text-[11px] xl:text-[12px] 2xl:text-[12.5px] font-mono font-bold tracking-wider uppercase leading-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none cursor-pointer ${module.className} ${
                    isActive ? 'text-[#326E45] font-black' : 'text-slate-600 hover:text-slate-950 hover:font-extrabold'
                  }`}
                  aria-haspopup={isDropdown ? 'true' : undefined}
                  aria-expanded={isDropdown ? activeMenu === module.id : undefined}
                >
                  {/* Active background fluid tracker bubble */}
                  {isActive && (
                    <motion.div
                      layoutId="activeModuleBackgroundIndicator"
                      className="absolute inset-0 rounded-full -z-10 bg-white border border-[#326E45]/30 shadow-[0_2px_8px_rgba(50,110,69,0.12)]"
                      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                    />
                  )}

                  {/* Hover capsule spotlight effect */}
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="hoverHighlight"
                      className="absolute inset-0 bg-white/70 rounded-full -z-10 border border-slate-200/50"
                      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                    />
                  )}

                  <IconComponent size={13} className={isActive ? 'text-[#326E45]' : 'text-slate-400'} />
                  
                  <span>{module.label}</span>

                  {isDropdown && (
                    <ChevronDown size={11} className={`text-slate-400 transition-transform duration-300 ${activeMenu === module.id ? 'rotate-180' : ''}`} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT ZONE: ACTIONS & COMPLIANCE TELEMETRIES */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0 font-sans">
            {/* Search Trigger */}
            <button
               onClick={() => setSearchOpen(true)}
               className="flex items-center gap-1.5 px-2.5 py-1.5 xl:px-3 xl:py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 rounded-full transition-all cursor-pointer shadow-2xs group active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none"
               aria-label="Open Command Search"
               title="Global Command Palette (⌘K)"
            >
              <Search size={12} className="text-slate-400 group-hover:text-[#326E45] transition-colors" />
              <span className="hidden xl:inline text-[9px] xl:text-[10px] font-bold tracking-tight pr-1 text-slate-400 group-hover:text-slate-600 font-mono">⌘K</span>
            </button>

            {/* Tactile Audio Toggle */}
            <button
               onClick={handleToggleSound}
               className={`flex items-center justify-center p-1.5 xl:p-2 rounded-full border transition-all cursor-pointer shadow-2xs active:scale-95 group focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none ${
                 soundEnabled 
                   ? 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200/60 text-[#326E45]' 
                   : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-450 hover:text-slate-650'
               }`}
               aria-label="Toggle Audio Feedback"
               aria-pressed={soundEnabled}
               title={soundEnabled ? "Mute Audio Feedback" : "Unmute Audio Feedback"}
            >
              {soundEnabled ? (
                <Volume2 size={13} className="animate-pulse" />
              ) : (
                <VolumeX size={13} />
              )}
            </button>

            <Magnetic>
              <button
                onClick={() => onNavClick('contact')}
                className="relative px-4 py-2 xl:px-5 xl:py-2.5 rounded-full text-[11px] xl:text-[12px] font-mono font-bold tracking-wider uppercase text-white bg-[#326E45] hover:bg-[#285737] active:scale-95 transition-all duration-300 shadow-[0_4px_14px_rgba(50,110,69,0.22)] hover:shadow-[0_6px_20px_rgba(50,110,69,0.32)] flex items-center gap-1.5 group cursor-pointer overflow-hidden focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none"
                id="magnetic-nav-launcher"
              >
                <span className="absolute inset-y-0 left-0 w-12 bg-white/15 -skew-x-[25deg] -translate-x-full group-hover:translate-x-[450%] transition-transform duration-[1200ms] pointer-events-none" />
                <span>LET’S TALK</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Magnetic>
          </div>

          {/* MOBILE ACTIONS CLUSTER (TABLET & MOBILE) */}
          <div className="flex lg:hidden items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Mobile Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-center w-9 h-9 xs:w-10 xs:h-10 rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:text-[#326E45] hover:bg-slate-100 transition-all cursor-pointer active:scale-90 shadow-2xs focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none"
              aria-label="Open Command Search"
              title="Search (⌘K)"
            >
              <Search size={14} />
            </button>

            {/* Mobile Tactile Audio Toggle */}
            <button
              onClick={handleToggleSound}
              className={`flex items-center justify-center w-9 h-9 xs:w-10 xs:h-10 rounded-full border transition-all cursor-pointer active:scale-90 shadow-2xs focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none ${
                soundEnabled
                  ? 'bg-emerald-50 border-emerald-200 text-[#326E45]'
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
              aria-label="Toggle Audio Feedback"
              aria-pressed={soundEnabled}
              title={soundEnabled ? "Mute Audio Feedback" : "Unmute Audio Feedback"}
            >
              {soundEnabled ? (
                <Volume2 size={14} className="animate-pulse" />
              ) : (
                <VolumeX size={14} />
              )}
            </button>

            {/* Hub Drawer Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center justify-center gap-1.5 px-2.5 xs:px-3 py-1.5 xs:py-2 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:text-[#326E45] hover:bg-slate-100 transition-all font-sans font-bold text-[11px] select-none cursor-pointer active:scale-95 shadow-2xs min-h-[36px] xs:min-h-[40px] focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none group"
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <Grid size={13} className="text-[#326E45] transition-transform duration-300 group-hover:rotate-12" />
              <span className="hidden xs:inline">Hub</span>
            </button>
          </div>
        </div>

        {/* DROPDOWN MEGA-MENUS PANELS SYSTEMS */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => { if (closeTimerRef.current) clearTimeout(closeTimerRef.current); }}
              onMouseLeave={() => { setActiveMenu(null); }}
              className="absolute top-full left-[1%] right-[1%] max-w-8xl mx-auto rounded-[24px] border border-slate-250 bg-white/95 backdrop-blur-[32px] p-6 shadow-[0_22px_55px_-12px_rgba(15,23,42,0.1)] pointer-events-auto z-40 outline-none"
            >
              {/* CAPABILITIES MEGA DROPDOWN */}
              {activeMenu === 'capabilities' && (() => {
                const currentCap = CAPABILITIES_ITEMS[activeCapabilityIdx] || CAPABILITIES_ITEMS[0];
                const CapIcon = currentCap.icon;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Left Grid */}
                    <div className="col-span-12 md:col-span-7 lg:col-span-8 space-y-4">
                      <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                        <span className="text-[10px] font-mono font-black text-[#326E45] uppercase tracking-wider">
                          5 Core Domains & 30 Specialized Practices
                        </span>
                        <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded uppercase leading-none font-bold">
                          Full Spectrum
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {CAPABILITIES_ITEMS.map((item, idx) => {
                          const Icon = item.icon;
                          const isHoveredActive = activeCapabilityIdx === idx;
                          const cleanName = item.name.replace(/^\d+\s*—\s*/, '');
                          return (
                            <button
                              key={idx}
                              onClick={() => handleNavActions(item.targetId || 'capabilities')}
                              onMouseEnter={() => setActiveCapabilityIdx(idx)}
                              className={`text-left group flex gap-3.5 p-3 rounded-2xl border transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none ${
                                idx === 4 ? 'lg:col-span-2' : ''
                              } ${
                                isHoveredActive
                                  ? 'bg-white border-[#326E45] shadow-sm ring-2 ring-[#326E45]/10'
                                  : 'border-dashed border-slate-150 bg-slate-50/50 hover:bg-white hover:border-solid hover:border-[#326E45]/40 hover:shadow-xs'
                              }`}
                            >
                              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                                isHoveredActive 
                                  ? 'bg-[#326E45] border-[#326E45] text-white scale-105' 
                                  : 'bg-slate-50 border-[#326E45]/15 text-[#326E45] group-hover:scale-105'
                              }`}>
                                <Icon size={15} />
                              </div>
                              <div className="space-y-0.5 min-w-0 flex-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className={`block text-xs font-bold transition-colors leading-tight truncate ${
                                    isHoveredActive ? 'text-[#326E45]' : 'text-slate-800'
                                  }`}>
                                    {cleanName}
                                  </span>
                                  <span className="text-[8px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1 rounded">
                                    {item.number || `0${idx + 1}`}
                                  </span>
                                  <span className="text-[8px] font-mono font-bold text-slate-400 bg-slate-100 px-1 rounded ml-auto">
                                    6 Practices
                                  </span>
                                </div>
                                <span className="block text-[10.5px] text-slate-500 font-normal leading-tight line-clamp-1">
                                  {item.desc}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Preview Card */}
                    <div className="col-span-12 md:col-span-5 lg:col-span-4 bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between overflow-hidden relative min-h-[300px]">
                      <div className="absolute top-[-30px] right-[-30px] w-48 h-48 bg-emerald-550/[0.04] rounded-full blur-2xl pointer-events-none" />
                      
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeCapabilityIdx}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="space-y-4 flex flex-col h-full justify-between"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono font-extrabold text-[#326E45] bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md uppercase tracking-wider leading-none">
                                {currentCap.useCase}
                              </span>
                              <span className="text-[8px] font-mono font-extrabold text-slate-400 tracking-wider">
                                DOMAIN_SPEC
                              </span>
                            </div>

                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2 text-slate-950">
                                <div className="w-5 h-5 rounded-md bg-[#326E45]/15 flex items-center justify-center text-[#326E45]">
                                  <CapIcon size={12} />
                                </div>
                                <h4 className="text-[12.5px] font-sans font-black tracking-tight">
                                  {currentCap.name.replace(/^\d+\s*—\s*/, '')}
                                </h4>
                              </div>
                              <p className="text-[10.5px] leading-relaxed text-slate-600 font-normal">
                                {currentCap.brief}
                              </p>
                            </div>

                            {currentCap.highlights && (
                              <div className="space-y-2 bg-white/80 border border-slate-150 rounded-xl p-3 shadow-2xs">
                                <span className="text-[8px] font-mono font-bold tracking-widest text-[#326E45]/80 uppercase block">
                                  Included Practices:
                                </span>
                                <div className="space-y-1.5">
                                  {currentCap.highlights.slice(0, 4).map((highlight, hIdx) => (
                                    <div key={hIdx} className="flex items-start gap-1.5 text-[9.5px]">
                                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-550/10 text-[#326E45] shrink-0 flex items-center justify-center mt-0.5">
                                        <Check size={8} strokeWidth={3} />
                                      </span>
                                      <span className="text-slate-600 font-semibold">{highlight}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="pt-2 flex flex-col gap-2">
                            <button
                              onClick={() => handleNavActions(currentCap.targetId || 'capabilities')}
                              className="w-full py-2 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-[#326E45] rounded-xl text-[9px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 duration-200"
                            >
                              <span>Explore {currentCap.shortTitle || currentCap.name.replace(/^\d+\s*—\s*/, '')} Hub</span>
                              <ArrowRight size={10} />
                            </button>
                            <button
                              onClick={() => handleNavActions('capabilities')}
                              className="w-full py-2 bg-slate-900 border border-transparent hover:border-[#326E45]/30 hover:bg-slate-850 text-white rounded-xl text-[9px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:shadow-[0_4px_12px_rgba(50,110,69,0.1)] active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none duration-200"
                            >
                              <span>View All 30 Capabilities Directory</span>
                              <ArrowRight size={10} />
                            </button>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })()}

              {/* OFFERINGS MEGA DROPDOWN */}
              {activeMenu === 'offerings' && (() => {
                const currentOffering = OFFERINGS_ITEMS[activeOfferingIdx] || OFFERINGS_ITEMS[0];
                const OffIcon = currentOffering.icon;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Left Grid */}
                    <div className="col-span-12 md:col-span-7 lg:col-span-8 space-y-4">
                      <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                        <span className="text-[10px] font-mono font-black text-[#326E45] uppercase tracking-wider">
                          Offerings, Products & Enterprise Solutions
                        </span>
                        <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded uppercase leading-none font-bold">
                          Pre-Engineered Assets
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {OFFERINGS_ITEMS.map((item, idx) => {
                          const Icon = item.icon;
                          const isHoveredActive = activeOfferingIdx === idx;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleNavActions(item.targetId || 'solutions')}
                              onMouseEnter={() => setActiveOfferingIdx(idx)}
                              className={`text-left group flex gap-3.5 p-3 rounded-2xl border transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none ${
                                isHoveredActive
                                  ? 'bg-white border-[#326E45] shadow-sm ring-2 ring-[#326E45]/10'
                                  : 'border-dashed border-slate-150 bg-slate-50/50 hover:bg-white hover:border-solid hover:border-[#326E45]/40 hover:shadow-xs'
                              }`}
                            >
                              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                                isHoveredActive 
                                  ? 'bg-[#326E45] border-[#326E45] text-white scale-105' 
                                  : 'bg-slate-50 border-[#326E45]/15 text-[#326E45] group-hover:scale-105'
                              }`}>
                                <Icon size={15} />
                              </div>
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5">
                                  <span className={`block text-xs font-bold transition-colors leading-tight ${
                                    isHoveredActive ? 'text-[#326E45]' : 'text-slate-800'
                                  }`}>
                                    {item.name}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[8px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1 rounded">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <span className="block text-[10.5px] text-slate-500 font-normal leading-tight">
                                  {item.desc}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Preview Card */}
                    <div className="col-span-12 md:col-span-5 lg:col-span-4 bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between overflow-hidden relative min-h-[300px]">
                      <div className="absolute top-[-30px] right-[-30px] w-48 h-48 bg-emerald-550/[0.04] rounded-full blur-2xl pointer-events-none" />
                      
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeOfferingIdx}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="space-y-4 flex flex-col h-full justify-between"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono font-extrabold text-[#326E45] bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md uppercase tracking-wider leading-none">
                                {currentOffering.useCase}
                              </span>
                              <span className="text-[8px] font-mono font-extrabold text-slate-400 tracking-wider">
                                OFFERING_HUB
                              </span>
                            </div>

                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2 text-slate-950">
                                <div className="w-5 h-5 rounded-md bg-[#326E45]/15 flex items-center justify-center text-[#326E45]">
                                  <OffIcon size={12} />
                                </div>
                                <h4 className="text-[12.5px] font-sans font-black tracking-tight">
                                  {currentOffering.name}
                                </h4>
                              </div>
                              <p className="text-[10.5px] leading-relaxed text-slate-600 font-normal">
                                {currentOffering.brief}
                              </p>
                            </div>

                            {currentOffering.highlights && (
                              <div className="space-y-2 bg-white/80 border border-slate-150 rounded-xl p-3 shadow-2xs">
                                <span className="text-[8px] font-mono font-bold tracking-widest text-[#326E45]/80 uppercase block">
                                  Key Capabilities:
                                </span>
                                <div className="space-y-1.5">
                                  {currentOffering.highlights.map((highlight, hIdx) => (
                                    <div key={hIdx} className="flex items-start gap-1.5 text-[9.5px]">
                                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-550/10 text-[#326E45] shrink-0 flex items-center justify-center mt-0.5">
                                        <Check size={8} strokeWidth={3} />
                                      </span>
                                      <span className="text-slate-600 font-semibold">{highlight}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="pt-2 flex flex-col gap-2">
                            <button
                              onClick={() => handleNavActions('solutions')}
                              className="w-full py-2 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-[#326E45] rounded-xl text-[9px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 duration-200"
                            >
                              <span>Browse Enterprise Solutions</span>
                              <ArrowRight size={10} />
                            </button>
                            <button
                              onClick={() => handleNavActions('shop')}
                              className="w-full py-2 bg-slate-900 border border-transparent hover:border-[#326E45]/30 hover:bg-slate-850 text-white rounded-xl text-[9px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:shadow-[0_4px_12px_rgba(50,110,69,0.1)] active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none duration-200"
                            >
                              <span>Visit Products & Solutions Store</span>
                              <ArrowRight size={10} />
                            </button>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })()}

              {/* IMPACT MEGA DROPDOWN */}
              {activeMenu === 'impact' && (() => {
                const currentImpact = IMPACT_ITEMS[activeImpactIdx] || IMPACT_ITEMS[0];
                const ImpIcon = currentImpact.icon;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Left Grid */}
                    <div className="col-span-12 md:col-span-7 lg:col-span-8 space-y-4">
                      <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                        <span className="text-[10px] font-mono font-black text-[#326E45] uppercase tracking-wider">
                          Client Impact, Portfolio & Proven Accomplishments
                        </span>
                        <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded uppercase leading-none font-bold">
                          150+ Delivered Systems
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {IMPACT_ITEMS.map((item, idx) => {
                          const Icon = item.icon;
                          const isHoveredActive = activeImpactIdx === idx;
                          const targetNav = item.targetId || `impact?tab=${item.tabId}`;
                          const isSubTabActive = (activeSection || '').includes(item.tabId || '') || 
                            ((activeSection === 'portfolio' || activeSection === 'impact' || activeSection === '/impact') && item.tabId === 'portfolio');
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                handleNavActions(targetNav);
                                setActiveMenu(null);
                              }}
                              onMouseEnter={() => setActiveImpactIdx(idx)}
                              className={`text-left group flex gap-3.5 p-3 rounded-2xl border transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none ${
                                isHoveredActive
                                  ? 'bg-white border-[#326E45] shadow-sm ring-2 ring-[#326E45]/10'
                                  : isSubTabActive
                                  ? 'bg-emerald-50/80 border-[#326E45] shadow-xs ring-1 ring-[#326E45]/20'
                                  : 'border-dashed border-slate-150 bg-slate-50/50 hover:bg-white hover:border-solid hover:border-[#326E45]/40 hover:shadow-xs'
                              }`}
                            >
                              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                                isHoveredActive 
                                  ? 'bg-[#326E45] border-[#326E45] text-white scale-105' 
                                  : isSubTabActive
                                  ? 'bg-[#326E45] border-[#326E45] text-white'
                                  : 'bg-slate-50 border-[#326E45]/15 text-[#326E45] group-hover:scale-105'
                              }`}>
                                <Icon size={15} />
                              </div>
                              <div className="space-y-0.5 flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1.5">
                                  <span className={`block text-xs font-bold transition-colors leading-tight truncate ${
                                    isHoveredActive || isSubTabActive ? 'text-[#326E45]' : 'text-slate-800'
                                  }`}>
                                    {item.name}
                                  </span>
                                  {isSubTabActive && (
                                    <span className="text-[8px] font-mono font-bold text-white bg-[#326E45] px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
                                      Active
                                    </span>
                                  )}
                                </div>
                                <span className="block text-[10.5px] text-slate-500 font-normal leading-tight line-clamp-1">
                                  {item.desc}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Preview Card */}
                    <div className="col-span-12 md:col-span-5 lg:col-span-4 bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between overflow-hidden relative min-h-[300px]">
                      <div className="absolute top-[-30px] right-[-30px] w-48 h-48 bg-emerald-550/[0.04] rounded-full blur-2xl pointer-events-none" />
                      
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeImpactIdx}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="space-y-4 flex flex-col h-full justify-between"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono font-extrabold text-[#326E45] bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md uppercase tracking-wider leading-none">
                                {currentImpact.useCase}
                              </span>
                              <span className="text-[8px] font-mono font-extrabold text-slate-400 tracking-wider">
                                IMPACT_RECORD
                              </span>
                            </div>

                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2 text-slate-950">
                                <div className="w-5 h-5 rounded-md bg-[#326E45]/15 flex items-center justify-center text-[#326E45]">
                                  <ImpIcon size={12} />
                                </div>
                                <h4 className="text-[12.5px] font-sans font-black tracking-tight">
                                  {currentImpact.name}
                                </h4>
                              </div>
                              <p className="text-[10.5px] leading-relaxed text-slate-600 font-normal">
                                {currentImpact.brief}
                              </p>
                            </div>

                            {currentImpact.highlights && (
                              <div className="space-y-2 bg-white/80 border border-slate-150 rounded-xl p-3 shadow-2xs">
                                <span className="text-[8px] font-mono font-bold tracking-widest text-[#326E45]/80 uppercase block">
                                  Measured Metrics:
                                </span>
                                <div className="space-y-1.5">
                                  {currentImpact.highlights.map((highlight, hIdx) => (
                                    <div key={hIdx} className="flex items-start gap-1.5 text-[9.5px]">
                                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-550/10 text-[#326E45] shrink-0 flex items-center justify-center mt-0.5">
                                        <Check size={8} strokeWidth={3} />
                                      </span>
                                      <span className="text-slate-600 font-semibold">{highlight}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="pt-2">
                            <button
                              onClick={() => {
                                handleNavActions(currentImpact.targetId || `impact?tab=${currentImpact.tabId}`);
                                setActiveMenu(null);
                              }}
                              className="w-full py-2.5 bg-[#326E45] hover:bg-[#285737] text-white rounded-xl text-[9px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-[#326E45]/20 active:scale-95 duration-200"
                            >
                              <span>Explore {currentImpact.name}</span>
                              <ArrowRight size={10} />
                            </button>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })()}

              {/* BLOG MEGA DROPDOWN */}
              {activeMenu === 'blog' && (() => {
                const currentBlog = BLOG_ITEMS[activeBlogIdx] || BLOG_ITEMS[0];
                const BlogIcon = currentBlog.icon;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Left Grid */}
                    <div className="col-span-12 md:col-span-7 lg:col-span-8 space-y-4">
                      <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                        <span className="text-[10px] font-mono font-black text-[#326E45] uppercase tracking-wider">
                          Engineering Publications, Insights & Industry Perspectives
                        </span>
                        <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded uppercase leading-none font-bold">
                          Engineering Knowledge Hub
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {BLOG_ITEMS.map((item, idx) => {
                          const Icon = item.icon;
                          const isHoveredActive = activeBlogIdx === idx;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleNavActions(item.targetId || 'blog')}
                              onMouseEnter={() => setActiveBlogIdx(idx)}
                              className={`text-left group flex gap-3.5 p-3 rounded-2xl border transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none ${
                                isHoveredActive
                                  ? 'bg-white border-[#326E45] shadow-sm ring-2 ring-[#326E45]/10'
                                  : 'border-dashed border-slate-150 bg-slate-50/50 hover:bg-white hover:border-solid hover:border-[#326E45]/40 hover:shadow-xs'
                              }`}
                            >
                              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                                isHoveredActive 
                                  ? 'bg-[#326E45] border-[#326E45] text-white scale-105' 
                                  : 'bg-slate-50 border-[#326E45]/15 text-[#326E45] group-hover:scale-105'
                              }`}>
                                <Icon size={15} />
                              </div>
                              <div className="space-y-0.5">
                                <span className={`block text-xs font-bold transition-colors leading-tight ${
                                  isHoveredActive ? 'text-[#326E45]' : 'text-slate-800'
                                }`}>
                                  {item.name}
                                </span>
                                <span className="block text-[10.5px] text-slate-500 font-normal leading-tight">
                                  {item.desc}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Preview Card */}
                    <div className="col-span-12 md:col-span-5 lg:col-span-4 bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between overflow-hidden relative min-h-[300px]">
                      <div className="absolute top-[-30px] right-[-30px] w-48 h-48 bg-emerald-550/[0.04] rounded-full blur-2xl pointer-events-none" />
                      
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeBlogIdx}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="space-y-4 flex flex-col h-full justify-between"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono font-extrabold text-[#326E45] bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md uppercase tracking-wider leading-none">
                                {currentBlog.useCase}
                              </span>
                              <span className="text-[8px] font-mono font-extrabold text-slate-400 tracking-wider">
                                BLOG_ARTICLE
                              </span>
                            </div>

                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2 text-slate-950">
                                <div className="w-5 h-5 rounded-md bg-[#326E45]/15 flex items-center justify-center text-[#326E45]">
                                  <BlogIcon size={12} />
                                </div>
                                <h4 className="text-[12.5px] font-sans font-black tracking-tight">
                                  {currentBlog.name}
                                </h4>
                              </div>
                              <p className="text-[10.5px] leading-relaxed text-slate-600 font-normal">
                                {currentBlog.brief}
                              </p>
                            </div>

                            {currentBlog.highlights && (
                              <div className="space-y-2 bg-white/80 border border-slate-150 rounded-xl p-3 shadow-2xs">
                                <span className="text-[8px] font-mono font-bold tracking-widest text-[#326E45]/80 uppercase block">
                                  Article Topics:
                                </span>
                                <div className="space-y-1.5">
                                  {currentBlog.highlights.map((highlight, hIdx) => (
                                    <div key={hIdx} className="flex items-start gap-1.5 text-[9.5px]">
                                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-550/10 text-[#326E45] shrink-0 flex items-center justify-center mt-0.5">
                                        <Check size={8} strokeWidth={3} />
                                      </span>
                                      <span className="text-slate-600 font-semibold">{highlight}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="pt-2">
                            <button
                              onClick={() => handleNavActions('blog')}
                              className="w-full py-2.5 bg-[#326E45] hover:bg-[#285737] text-white rounded-xl text-[9px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-[#326E45]/20 active:scale-95 duration-200"
                            >
                              <span>Read All Technical Publications</span>
                              <ArrowRight size={10} />
                            </button>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MOBILE TRIGGER SYSTEM DASHBOARD SIDE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden flex justify-end" role="dialog" aria-modal="true" aria-label="Navigation Menu">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-md"
            />

            {/* Slide-In Container sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] h-full bg-white shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-slate-100 pointer-events-auto"
            >
              <div className="flex flex-col flex-1">
                {/* Visual Sheet Pull Indicator */}
                <div className="w-10 h-1 rounded-full bg-slate-200 mx-auto -mt-2 mb-3.5 shrink-0" aria-hidden="true" />

                {/* Header of Mobile Menu */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#326E45] to-[#1E293B] p-[1.5px] flex items-center justify-center text-white font-bold text-sm">
                      M
                    </div>
                    <div>
                      <span className="font-sans font-extrabold text-[13px] text-slate-900 leading-none block">MetaWave</span>
                      <span className="block text-[7px] font-mono tracking-widest text-[#326E45] font-black uppercase mt-0.5 ml-0.5">Innovations</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70"
                    aria-label="Close menu"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Mobile Search Button */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 bg-slate-50 hover:bg-slate-100/85 border border-slate-200/80 text-slate-500 hover:text-slate-800 rounded-xl transition-all cursor-pointer shadow-3xs text-left min-h-[44px] mb-4 focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none"
                  aria-label="Open global search palette"
                >
                  <Search size={14} className="text-slate-450" />
                  <span className="text-xs text-slate-400 font-medium font-sans">Search capabilities, offerings...</span>
                </button>

                {/* Mobile Navigation List with Accordions */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pl-1 pr-1 shrink-0">
                    <span className="block text-[8px] font-mono tracking-widest text-slate-400 font-extrabold uppercase">Navigation Sectors</span>
                    
                    {/* Mobile Sound toggle */}
                    <button
                      onClick={handleToggleSound}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-mono font-bold uppercase transition-all shadow-3xs active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none ${
                        soundEnabled
                          ? 'bg-emerald-50 border-emerald-200/60 text-[#326E45]'
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700'
                      }`}
                      aria-pressed={soundEnabled}
                      aria-label="Toggle sound feedback"
                    >
                      {soundEnabled ? (
                        <>
                          <Volume2 size={11} className="animate-pulse" />
                          <span>Sound: On</span>
                        </>
                      ) : (
                        <>
                          <VolumeX size={11} />
                          <span>Sound: Off</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="space-y-1.5">
                    {navModules.map((item) => {
                      const Icon = item.icon;
                      const isDropdown = item.type === 'dropdown';
                      const isOpen = 
                        item.id === 'capabilities' ? mobileCapabilitiesOpen :
                        item.id === 'offerings' ? mobileOfferingsOpen :
                        item.id === 'impact' ? mobileImpactOpen :
                        item.id === 'blog' ? mobileBlogOpen : false;

                      const toggleOpen = () => {
                        if (item.id === 'capabilities') setMobileCapabilitiesOpen(!mobileCapabilitiesOpen);
                        if (item.id === 'offerings') setMobileOfferingsOpen(!mobileOfferingsOpen);
                        if (item.id === 'impact') setMobileImpactOpen(!mobileImpactOpen);
                        if (item.id === 'blog') setMobileBlogOpen(!mobileBlogOpen);
                      };
                      const isActive = activeModuleId === item.id;

                      const itemsForAccordion = 
                        item.id === 'capabilities' ? CAPABILITIES_ITEMS :
                        item.id === 'offerings' ? OFFERINGS_ITEMS :
                        item.id === 'impact' ? IMPACT_ITEMS :
                        item.id === 'blog' ? BLOG_ITEMS : [];

                      return (
                        <div key={item.id} className="border-b border-slate-100/70 pb-1.5">
                          <button
                            onClick={() => {
                              if (isDropdown) {
                                toggleOpen();
                              } else {
                                handleNavActions(item.targetId || item.id);
                              }
                            }}
                            className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl transition-all font-sans text-sm font-bold min-h-[44px] cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none ${
                              isActive 
                                ? 'bg-[#326E45]/5 text-[#326E45]' 
                                : 'text-slate-700 hover:text-[#326E45] hover:bg-slate-50'
                            }`}
                            aria-expanded={isDropdown ? isOpen : undefined}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                isActive ? 'bg-[#326E45]/10 text-[#326E45]' : 'bg-slate-100 text-slate-500'
                              }`}>
                                <Icon size={14} />
                              </div>
                              <span>{item.label}</span>
                            </div>
                            {isDropdown && (
                              <ChevronDown 
                                size={14} 
                                className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                              />
                            )}
                          </button>

                          {/* Accordion List */}
                          <AnimatePresence initial={false}>
                            {isDropdown && isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="overflow-hidden pl-3 pr-1 mt-1 space-y-1 bg-slate-50/50 rounded-xl"
                              >
                                {item.id !== 'impact' && (
                                  <button
                                    onClick={() => handleNavActions(item.targetId || item.id)}
                                    className="w-full text-left p-2 rounded-lg bg-[#326E45]/10 hover:bg-[#326E45]/20 text-[#326E45] transition-all flex items-center justify-between font-bold text-xs cursor-pointer min-h-[40px] my-1"
                                  >
                                    <span>Explore All {item.label} →</span>
                                  </button>
                                )}
                                {itemsForAccordion.map((subItem, sIdx) => {
                                  const SubIcon = subItem.icon;
                                  return (
                                    <button
                                      key={sIdx}
                                      onClick={() => {
                                        handleNavActions(subItem.targetId || item.targetId || item.id);
                                      }}
                                      className="w-full text-left p-2.5 rounded-lg hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all flex items-start gap-3 min-h-[44px] cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none"
                                    >
                                      <div className="w-6 h-6 rounded-md bg-[#326E45]/10 text-[#326E45] flex items-center justify-center mt-0.5 shrink-0">
                                        <SubIcon size={11} />
                                      </div>
                                      <div className="space-y-0.5">
                                        <div className="flex items-center gap-1.5">
                                          {subItem.number && (
                                            <span className="text-[8px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1 rounded">
                                              {subItem.number}
                                            </span>
                                          )}
                                          <span className="block text-[11.5px] font-bold text-slate-800 leading-tight">
                                            {subItem.name.replace(/^\d+\s*—\s*/, '')}
                                          </span>
                                        </div>
                                        <span className="block text-[10px] text-slate-400 font-normal leading-tight">{subItem.desc}</span>
                                      </div>
                                    </button>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-6 border-t border-slate-100 mt-6 space-y-3 shrink-0">
                <button
                  onClick={() => handleNavActions('contact')}
                  className="w-full py-3.5 rounded-xl text-[11px] font-mono font-extrabold tracking-wider uppercase text-white bg-[#326E45] hover:bg-[#285737] flex items-center justify-center gap-2 shadow-md shadow-[#326E45]/20 min-h-[46px] cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none active:scale-[0.98] transition-all"
                >
                  <span>LET’S TALK</span>
                  <ArrowRight size={13} />
                </button>
                <div className="text-center text-[8.5px] font-mono text-slate-400 tracking-wider">
                  © 2026 METAWAVE • ALL SYSTEMS COMPLIANT
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ENTERPRISE COMMAND PALETTE SEARCH OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-slate-950/95 backdrop-blur-2xl flex flex-col justify-start pt-12 sm:pt-20 px-4 sm:px-6 overflow-y-auto pb-12"
            role="dialog"
            aria-modal="true"
            aria-label="Command Search Palette"
          >
            {/* Accessible Touch-friendly Close Button */}
            <button
              onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-90 min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:outline-none"
              aria-label="Close search"
            >
              <X size={18} />
            </button>

            <div className="w-full max-w-4xl mx-auto space-y-5 font-sans text-left">
              {/* Top Header Label */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[9.5px] font-mono font-bold tracking-[0.2em] text-[#326E45] bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase">
                    <Command size={11} className="text-emerald-400" />
                    <span>MetaWave Executive Command Palette</span>
                  </span>
                  <span className="hidden sm:inline text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                    • ISO 27001 & SOC-2 Indexing
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-500 hidden sm:flex items-center gap-2">
                  <span>Press <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/10 rounded text-slate-300">ESC</kbd> to exit</span>
                </div>
              </div>

              {/* Input Area */}
              <div className="relative bg-white/5 border border-white/10 focus-within:border-[#326E45] focus-within:ring-2 focus-within:ring-[#326E45]/20 rounded-2xl p-3 sm:p-4 transition-all flex items-center gap-3">
                <Search size={22} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search capabilities, POS, AI analytics, CRM, case studies, SLA..."
                  className="w-full bg-transparent border-none text-white font-sans font-bold text-base sm:text-xl placeholder-slate-500 focus:ring-0 focus:outline-none"
                />
                {searchQuery.length > 0 && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-[10px] font-mono font-bold text-slate-400 hover:text-white uppercase transition-colors px-2.5 py-1 bg-white/10 hover:bg-white/15 rounded-lg focus-visible:ring-2 focus-visible:ring-emerald-500/70 shrink-0"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {[
                  { id: 'ALL', label: 'All Nodes' },
                  { id: 'CAPABILITIES', label: 'Capabilities' },
                  { id: 'OFFERINGS', label: 'Offerings & Products' },
                  { id: 'IMPACT', label: 'Impact & Case Studies' },
                  { id: 'BLOG', label: 'Publications' },
                  { id: 'EXECUTIVE', label: 'Executive Direct' }
                ].map((cat) => {
                  const isActive = searchCategoryFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSearchCategoryFilter(cat.id as any)}
                      className={`px-3 py-1.5 rounded-xl text-[10.5px] font-mono font-bold tracking-wide transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-[#326E45] text-white border-[#326E45] shadow-md shadow-[#326E45]/20'
                          : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white hover:border-white/15 hover:font-extrabold'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Main Grid: Search Results + Executive Fast-Track Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
                {/* Search Results List */}
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider px-1">
                    <span>Identified Nodes ({searchResults.length})</span>
                    <span className="text-emerald-400">Use ↑↓ Arrow Keys to Navigate</span>
                  </div>

                  {searchResults.length === 0 ? (
                    <div className="py-12 px-6 rounded-2xl border border-white/5 bg-white/5 text-center space-y-2">
                      <p className="text-sm font-bold text-slate-300">No matching system nodes found</p>
                      <p className="text-xs text-slate-500">Try adjusting your keywords or select "All Nodes" above.</p>
                      <button
                        onClick={() => { setSearchQuery(''); setSearchCategoryFilter('ALL'); }}
                        className="mt-3 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer"
                      >
                        Reset Search Filters
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1.5 custom-scrollbar">
                      {searchResults.map((res, index) => {
                        const isSelected = selectedIndex === index;
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery('');
                              handleNavActions(res.id);
                            }}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${
                              isSelected
                                ? 'bg-white/10 border-[#326E45] shadow-lg shadow-[#326E45]/15 ring-2 ring-[#326E45]/20'
                                : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/15'
                            }`}
                          >
                            <div className="space-y-1 pr-3 flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`text-sm font-bold transition-colors truncate ${
                                  isSelected ? 'text-emerald-400' : 'text-white group-hover:text-emerald-300'
                                }`}>
                                  {res.name}
                                </span>
                                {res.badge && (
                                  <span className="text-[8px] font-mono font-bold tracking-wider uppercase text-emerald-300 bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 rounded-md shrink-0">
                                    {res.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                                {res.text}
                              </p>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 ml-2">
                              {res.statLabel && (
                                <div className="text-right hidden sm:block">
                                  <span className="block text-[7.5px] font-mono text-slate-500 uppercase tracking-widest">{res.statLabel}</span>
                                  <span className="block text-[10px] font-mono font-extrabold text-slate-300">{res.statVal}</span>
                                </div>
                              )}
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform ${
                                isSelected ? 'bg-[#326E45] text-white scale-110' : 'bg-white/10 text-slate-400 group-hover:text-white'
                              }`}>
                                <ArrowRight size={14} className={isSelected ? 'translate-x-0.5' : ''} />
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right Executive Fast-Track Card */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-2xl p-5 space-y-4 relative overflow-hidden">
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono font-extrabold text-emerald-400 bg-emerald-500/15 border border-emerald-500/20 px-2.5 py-1 rounded-md uppercase tracking-wider inline-block">
                        Enterprise Fast Track
                      </span>
                      <h4 className="text-base font-bold text-white tracking-tight leading-snug">
                        Need an Immediate Architecture Review or NDA Scoping Proposal?
                      </h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                        Speak directly 1-on-1 with a MetaWave Executive Solutions Architect to evaluate your custom technical requirements.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                        handleNavActions('contact');
                      }}
                      className="w-full py-3 bg-[#326E45] hover:bg-[#285737] text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#326E45]/30 cursor-pointer active:scale-95 transition-all"
                    >
                      <span>Talk with an Executive Architect</span>
                      <ArrowRight size={13} />
                    </button>

                    <div className="pt-2 border-t border-white/10 space-y-2 text-[9.5px] font-mono text-slate-400">
                      <div className="flex items-center gap-2">
                        <Check size={11} className="text-emerald-400" />
                        <span>ISO 27001 & SOC-2 Type II Compliant</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={11} className="text-emerald-400" />
                        <span>99.99% Production Uptime SLA Guarantee</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={11} className="text-emerald-400" />
                        <span>100% Intellectual Property Code Ownership</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Keyboard Shortcut Legend Footer */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/10 rounded text-slate-300">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/10 rounded text-slate-300">↓</kbd>
                    <span className="ml-0.5">Navigate Nodes</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/10 rounded text-slate-300">↵</kbd>
                    <span className="ml-0.5">Select Node</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/10 rounded text-slate-300">ESC</kbd>
                    <span className="ml-0.5">Close Palette</span>
                  </span>
                </div>
                <div className="text-slate-500 uppercase tracking-widest text-[9px]">
                  METAWAVE COMMAND INDEX v2.4
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

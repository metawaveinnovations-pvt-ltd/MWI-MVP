import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TechPartnerRobotIcon } from './TechPartnerRobotIcon';
import { 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  Cpu, 
  Bot,
  BrainCircuit,
  Layers, 
  BarChart3, 
  Cloud, 
  Smartphone, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Activity,
  DollarSign,
  Clock,
  UserCheck,
  Target,
  MessageSquare,
  Mail,
  Package,
  Barcode,
  Truck,
  Utensils,
  Calendar,
  Flame,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Globe,
  BookOpen,
  ShoppingBag,
  CreditCard,
  HeartPulse,
  GraduationCap,
  Building,
  Zap,
  Server,
  Database,
  Lock
} from 'lucide-react';

interface HeroProps {
  onCtaclick: (sectionId: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

const headlinePrimaryVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

const headlineSecondaryVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.14,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

// 12 Solutions structured into 3 slides (4 per slide)
interface SolutionCardData {
  id: string;
  num: string;
  badge: string;
  icon: any;
  title: string;
  features: Array<{ icon: any; label: string }>;
  extraFeatures: Array<{ icon: any; label: string }>;
  blogSlug: string;
  ctaText: string;
}

const SLIDES_DATA: SolutionCardData[][] = [
  // SLIDE 1 (Cards 01 - 04)
  [
    {
      id: 'hrms',
      num: '01',
      badge: 'TALENT OPERATIONS',
      icon: Users,
      title: 'HRMS Solution',
      features: [
        { icon: UserCheck, label: 'Attendances management' },
        { icon: Users, label: 'Staff Management' }
      ],
      extraFeatures: [
        { icon: DollarSign, label: 'Accounts management' },
        { icon: Layers, label: 'Projects Management' },
        { icon: ShieldCheck, label: 'Role Management (Founder, Admin, Staff, Special Clients)' }
      ],
      blogSlug: 'hrms',
      ctaText: 'Optimize'
    },
    {
      id: 'crm',
      num: '02',
      badge: 'COMMERCIAL VELOCITY',
      icon: Target,
      title: 'CRM Solution',
      features: [
        { icon: Target, label: 'Lead Scoring Intelligence' },
        { icon: TrendingUp, label: 'Pipeline Deal Flow' }
      ],
      extraFeatures: [
        { icon: Mail, label: 'Email Campaigns Hub' },
        { icon: BarChart3, label: 'Funnels & Metrics Tracker' },
        { icon: Users, label: 'Client Accounts Manager' }
      ],
      blogSlug: 'crm',
      ctaText: 'Accelerate'
    },
    {
      id: 'warehouse',
      num: '03',
      badge: 'RESOURCES LOGISTICS',
      icon: Package,
      title: 'Warehouse & Inventory',
      features: [
        { icon: Activity, label: 'Stock Threshold Alerts' },
        { icon: Barcode, label: 'Barcode Scan System' }
      ],
      extraFeatures: [
        { icon: Truck, label: 'Supplier Collaboration Hub' },
        { icon: Package, label: 'Real-time Inventory Track' },
        { icon: Layers, label: 'Logistics & Fleet Logs' }
      ],
      blogSlug: 'warehouse',
      ctaText: 'Scale Smart'
    },
    {
      id: 'restaurant',
      num: '04',
      badge: 'HOSPITALITY COGNITION',
      icon: Utensils,
      title: 'Restaurant System',
      features: [
        { icon: Cpu, label: 'Sub-second POS Terminal' },
        { icon: Calendar, label: 'Table Seats Booking' }
      ],
      extraFeatures: [
        { icon: Flame, label: 'Kitchen Orders Router' },
        { icon: Utensils, label: 'Dining Operations Coordinator' },
        { icon: UserCheck, label: 'Guest Check & Audit' }
      ],
      blogSlug: 'restaurant',
      ctaText: 'Deploy POS'
    }
  ],
  // SLIDE 2 (Cards 05 - 08)
  [
    {
      id: 'ai-hub',
      num: '05',
      badge: 'COGNITIVE AUTOMATION',
      icon: Cpu,
      title: 'AI & Machine Learning Hub',
      features: [
        { icon: Zap, label: 'LLM Agent Workflows' },
        { icon: BarChart3, label: 'Predictive Analytics Engine' }
      ],
      extraFeatures: [
        { icon: Database, label: 'Neural Data Pipeline' },
        { icon: Smartphone, label: 'Speech & Vision Processing' },
        { icon: ShieldCheck, label: 'Automated QA & Guardrails' }
      ],
      blogSlug: 'ai-ml',
      ctaText: 'Automate'
    },
    {
      id: 'ecommerce',
      num: '06',
      badge: 'OMNICHANNEL RETAIL',
      icon: ShoppingBag,
      title: 'E-Commerce Platform',
      features: [
        { icon: Package, label: 'Multi-Vendor Catalog' },
        { icon: CreditCard, label: 'Instant Checkout Engine' }
      ],
      extraFeatures: [
        { icon: TrendingUp, label: 'Dynamic Pricing AI' },
        { icon: Layers, label: 'Inventory Sync API' },
        { icon: Users, label: 'Customer Loyalty Engine' }
      ],
      blogSlug: 'ecommerce',
      ctaText: 'Launch Store'
    },
    {
      id: 'fintech',
      num: '07',
      badge: 'FINANCIAL ARCHITECTURE',
      icon: CreditCard,
      title: 'Fintech Payment Gateway',
      features: [
        { icon: DollarSign, label: 'Multi-Currency Settlement' },
        { icon: ShieldCheck, label: 'Anti-Fraud Guard AI' }
      ],
      extraFeatures: [
        { icon: Lock, label: 'PCI-DSS Compliance Vault' },
        { icon: Layers, label: 'Automated Escrow Engine' },
        { icon: Activity, label: 'Real-time Ledger Audit' }
      ],
      blogSlug: 'fintech',
      ctaText: 'Secure Pay'
    },
    {
      id: 'healthcare',
      num: '08',
      badge: 'PATIENT CARE SYSTEMS',
      icon: HeartPulse,
      title: 'Healthcare & Telehealth',
      features: [
        { icon: ShieldCheck, label: 'Secure Electronic Health Records' },
        { icon: Users, label: 'Video Consultation Hub' }
      ],
      extraFeatures: [
        { icon: Activity, label: 'Remote Patient Vitals' },
        { icon: Mail, label: 'Prescription Router' },
        { icon: Layers, label: 'Lab Integrations Portal' }
      ],
      blogSlug: 'healthcare',
      ctaText: 'Modernize'
    }
  ],
  // SLIDE 3 (Cards 09 - 12)
  [
    {
      id: 'devops',
      num: '09',
      badge: 'RESILIENT INFRASTRUCTURE',
      icon: Server,
      title: 'Cloud & DevOps Infra',
      features: [
        { icon: Cloud, label: 'Multi-Region Kubernetes' },
        { icon: Zap, label: 'Zero-Downtime CI/CD' }
      ],
      extraFeatures: [
        { icon: Layers, label: 'Infrastructure as Code' },
        { icon: TrendingUp, label: 'Auto-Scaling Policy Rules' },
        { icon: ShieldCheck, label: 'Distributed DDoS Shield' }
      ],
      blogSlug: 'cloud-devops',
      ctaText: 'Deploy Cloud'
    },
    {
      id: 'telematics',
      num: '10',
      badge: 'SUPPLY CHAIN LOGISTICS',
      icon: Truck,
      title: 'Fleet & Logistics Telematics',
      features: [
        { icon: Target, label: 'Real-Time GPS Tracking' },
        { icon: Activity, label: 'Driver Behavior Analytics' }
      ],
      extraFeatures: [
        { icon: BarChart3, label: 'Route Optimization AI' },
        { icon: DollarSign, label: 'Fuel Cost Monitoring' },
        { icon: Package, label: 'Cargo Temperature Sensors' }
      ],
      blogSlug: 'telematics',
      ctaText: 'Track Fleet'
    },
    {
      id: 'edtech',
      num: '11',
      badge: 'KNOWLEDGE & LEARNING',
      icon: GraduationCap,
      title: 'EduTech LMS Platform',
      features: [
        { icon: Users, label: 'Virtual Classroom Portal' },
        { icon: BarChart3, label: 'Student Analytics Dashboard' }
      ],
      extraFeatures: [
        { icon: Cpu, label: 'Automated Grading Engine' },
        { icon: CheckCircle, label: 'Certificate Generator' },
        { icon: Zap, label: 'Adaptive Testing AI' }
      ],
      blogSlug: 'edtech',
      ctaText: 'Empower Edu'
    },
    {
      id: 'proptech',
      num: '12',
      badge: 'PROPTECH PLATFORM',
      icon: Building,
      title: 'Real Estate & Property Hub',
      features: [
        { icon: Layers, label: 'Virtual 3D Property Tours' },
        { icon: Users, label: 'Lease & Tenant Manager' }
      ],
      extraFeatures: [
        { icon: DollarSign, label: 'Automated Rent Collection' },
        { icon: Activity, label: 'Maintenance Ticket Hub' },
        { icon: TrendingUp, label: 'Yield ROI Calculator' }
      ],
      blogSlug: 'proptech',
      ctaText: 'Manage Assets'
    }
  ]
];

export function Hero({ onCtaclick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      handleNextSlide();
    } else if (diff < -45) {
      handlePrevSlide();
    }
    setTouchStartX(null);
  };

  // Auto slide timer reset whenever card expanded or slide changes
  useEffect(() => {
    if (expandedCardId) {
      const timer = setTimeout(() => {
        setExpandedCardId(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [expandedCardId]);

  const handleNextSlide = () => {
    setSlideDirection(1);
    setCurrentSlide((prev) => (prev + 1) % SLIDES_DATA.length);
  };

  const handlePrevSlide = () => {
    setSlideDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + SLIDES_DATA.length) % SLIDES_DATA.length);
  };

  const currentCards = SLIDES_DATA[currentSlide];

  return (
    <section id="home" className="relative min-h-[75vh] lg:min-h-[82vh] pt-20 sm:pt-28 md:pt-32 lg:pt-24 pb-12 sm:pb-20 lg:pb-28 flex items-center bg-mwi-base overflow-hidden">
      
      {/* Decorative premium background lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 bg-gradient-to-b from-mwi-tint-80 via-mwi-tint-40 to-mwi-base">
        <div className="absolute top-[5%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#397A56]/[0.025] blur-[140px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/[0.02] blur-[120px]" />
        <div className="absolute top-[30%] left-[45%] w-[400px] h-[400px] rounded-full bg-teal-500/[0.015] blur-[100px]" />

        <div 
          className="absolute inset-0 opacity-[0.4]" 
          style={{
            backgroundImage: `radial-gradient(#E2E8F0 1.2px, transparent 1.2px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="max-w-7xl xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center lg:-translate-y-3 xl:-translate-y-4">
        
        {/* Left Interactive Content Info */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 xl:col-span-6 space-y-5 sm:space-y-6 lg:space-y-7 text-left w-full max-w-2xl lg:max-w-none mt-0 lg:-mt-4"
        >
          
          {/* Unified Heading & Signature Lockup (Enterprise Tech Partner Hierarchy) */}
          <div id="hero-robot-container" className="relative flex flex-col items-start w-full gap-3 sm:gap-3.5">
            {/* 3D Smart Systems & Engineering Hero Robot Patrol System */}
            <div className="absolute inset-0 pointer-events-none z-30 overflow-visible">
              <TechPartnerRobotIcon />
            </div>

            {/* Flagship Enterprise Solution Badge: Smart Systems */}
            <motion.div
              id="hero-smart-systems-badge"
              variants={itemVariants}
              className="relative inline-flex items-center justify-center px-5 sm:px-7 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-emerald-100/90 via-emerald-50/70 to-white/95 backdrop-blur-md border border-emerald-300/90 shadow-xs hover:border-emerald-400 hover:shadow-sm transition-all duration-300 group self-start mt-16 sm:mt-18 md:mt-20 lg:mt-14"
            >
              {/* SMART SYSTEMS Title */}
              <span 
                className="font-['Syne',sans-serif] font-[800] text-[14.5px] sm:text-[17.5px] tracking-[0.06em] uppercase text-slate-900 leading-none select-none"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                SMART SYSTEMS
              </span>
            </motion.div>

            {/* Main Heading - ENGINEERING Growth */}
            <h1 className="w-full flex flex-col tracking-tight space-y-0.5 sm:space-y-1 text-left mt-0.5 relative">
              {/* ENGINEERING */}
              <motion.span 
                id="hero-engineering-span"
                variants={headlinePrimaryVariants}
                className="inline-block font-['Syne',sans-serif] font-[800] text-[clamp(2.05rem,6.2vw,46px)] sm:text-[44px] md:text-[50px] lg:text-[55.738px] leading-[1.02] tracking-[-0.035em] text-slate-900 uppercase mb-[4px] w-fit max-w-full relative"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                ENGINEERING
              </motion.span>

              {/* Growth */}
              <motion.span 
                variants={headlineSecondaryVariants}
                className="block font-['Syne',sans-serif] font-[800] text-[clamp(2.05rem,6.2vw,2.5rem)] sm:text-[2.6rem] md:text-[3.1rem] lg:text-[clamp(3.2rem,4.3vw,4.15rem)] leading-[1.02] tracking-[-0.035em]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <span className="relative inline-block bg-gradient-to-r from-[#205737] via-[#2F6547] to-[#1E293B] bg-clip-text text-transparent transition-all duration-500 hover:brightness-110">
                  Growth
                  <span className="absolute -bottom-0.5 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#2F6547]/85 via-[#397A56]/60 to-transparent rounded-full pointer-events-none" />
                </span>
              </motion.span>
            </h1>
          </div>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-[17px] text-slate-600 font-normal leading-relaxed max-w-xl pt-0.5 sm:pt-1"
          >
            MetaWave Innovations engineers scalable software, automation, and growth solutions that transform complex business challenges into practical, high-impact digital systems built for flexibility, performance, and long-term growth.
          </motion.p>

          {/* Action Callouts */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2 w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.025, translateY: -1 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onCtaclick('contact')}
              className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs font-bold tracking-wider text-white bg-gradient-to-r from-[#397A56] to-[#1E293B] hover:brightness-105 transition-all duration-300 shadow-lg shadow-[#397A56]/15 flex items-center justify-center gap-2 group cursor-pointer w-full sm:w-auto"
              id="hero-primary-cta"
            >
              <span>Schedule Consultation</span>
              <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.025, translateY: -1 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onCtaclick('solutions')}
              className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs font-bold tracking-wider text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              id="hero-secondary-cta"
            >
              <span>Explore Solutions</span>
            </motion.button>
          </motion.div>

          {/* Core Trust Statistics Tagline */}
          <motion.div
            variants={itemVariants}
            className="pt-5 sm:pt-6 border-t border-slate-100 grid grid-cols-3 sm:flex sm:flex-wrap justify-between sm:justify-start items-start sm:items-center text-left gap-2 sm:gap-x-10 gap-y-4 w-full"
          >
            <div className="flex flex-col items-start min-w-0 transition-all duration-300">
              <span className="block text-lg sm:text-2xl font-display font-bold text-[#326E45] leading-tight">150+</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-0.5 font-bold leading-tight">Enterprise Projects</span>
            </div>
            <div className="flex flex-col items-start min-w-0 transition-all duration-300">
              <span className="block text-lg sm:text-2xl font-display font-bold text-[#326E45] leading-tight">98%</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-0.5 font-bold leading-tight">Delivery Success</span>
            </div>
            <div className="flex flex-col items-start min-w-0 transition-all duration-300">
              <span className="block text-lg sm:text-2xl font-display font-bold text-[#326E45] leading-tight">12+</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-0.5 font-bold leading-tight">Industries Served</span>
            </div>
          </motion.div>

        </motion.div>

        {/* Right Side - Slideable Bento Carousel */}
        <div 
          className="lg:col-span-6 xl:col-span-6 w-full relative z-10 flex flex-col space-y-3 mt-4 sm:mt-6 lg:mt-0"
        >
          
          {/* Top Right Slide Navigation Controls */}
          <div className="flex items-center justify-between sm:justify-end w-full px-1 sm:pr-0.5 pt-1 sm:pt-2 mb-1">
            <div className="sm:hidden flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Package {currentSlide + 1} of 3</span>
            </div>
            <div className="flex items-center justify-between w-28 sm:w-25 gap-1.5">
              <button
                onClick={handlePrevSlide}
                className="flex-1 py-1.5 min-h-[36px] flex items-center justify-center rounded-lg bg-white/90 hover:bg-emerald-50 hover:text-[#397A56] text-slate-600 transition-all border border-slate-200/80 hover:border-emerald-300 cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                title="Previous solutions"
                aria-label="Previous solutions"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNextSlide}
                className="flex-1 py-1.5 min-h-[36px] flex items-center justify-center rounded-lg bg-white/90 hover:bg-emerald-50 hover:text-[#397A56] text-slate-600 transition-all border border-slate-200/80 hover:border-emerald-300 cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                title="Next solutions"
                aria-label="Next solutions"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Slideable Grid Container (Main 4 Solutions Cards) */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative overflow-hidden min-h-0 sm:min-h-[500px] lg:min-h-[520px] w-full p-0.5 sm:p-2"
          >
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={currentSlide}
                custom={slideDirection}
                initial={{ opacity: 0, x: slideDirection > 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDirection > 0 ? -40 : 40 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-start w-full"
              >
                {/* Column 1 - Left Column of Staggered Cards (Cards 0 & 1 of current slide) */}
                <div className="space-y-4 sm:space-y-5 flex flex-col justify-start">
                  {[currentCards[0], currentCards[1]].map((card) => {
                    const CardIcon = card.icon;
                    const isExpanded = expandedCardId === card.id;

                    return (
                      <div
                        key={card.id}
                        className="group relative rounded-xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/50 p-3.5 xs:p-4 sm:p-4.5 flex flex-col justify-between hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-sm h-full"
                      >
                        {/* Numbering Watermark */}
                        <div className="absolute top-1 right-2 text-5xl font-display font-black text-emerald-500/[0.04] select-none pointer-events-none group-hover:text-emerald-500/[0.08] transition-colors duration-300">
                          {card.num}
                        </div>

                        <div>
                          {/* Badge Row */}
                          <div className="flex items-center justify-between">
                            <span className="inline-block text-[8.5px] font-mono font-black tracking-wider text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded">
                              {card.badge}
                            </span>
                            <CardIcon size={36} className="p-1.5 sm:p-2 sm:size-[38px] rounded-xl text-emerald-700 bg-emerald-100 border border-emerald-300 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-200 group-hover:border-emerald-400 group-hover:text-emerald-800 shrink-0" />
                          </div>

                          {/* Title */}
                          <h3 className="text-sm font-display font-black text-slate-900 group-hover:text-[#397A56] transition-colors mt-2 break-words">
                            {card.title}
                          </h3>

                          {/* Feature List */}
                          <div className="flex flex-col gap-2 mt-3.5 sm:mt-4">
                            {card.features.map((feat, fIdx) => {
                              const FeatIcon = feat.icon;
                              return (
                                <span key={fIdx} className="flex items-center gap-2.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                                  <FeatIcon size={12} className="text-[#397A56] shrink-0" />
                                  <span className="leading-snug break-words">{feat.label}</span>
                                </span>
                              );
                            })}

                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="flex flex-col gap-2 overflow-hidden"
                                >
                                  {card.extraFeatures.map((efeat, efIdx) => {
                                    const EFeatIcon = efeat.icon;
                                    return (
                                      <span key={efIdx} className="flex items-center gap-2.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                                        <EFeatIcon size={12} className="text-[#397A56] shrink-0" />
                                        <span className="leading-snug break-words">{efeat.label}</span>
                                      </span>
                                    );
                                  })}
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Toggle Button */}
                            <div className="flex flex-col gap-1.5 mt-1 self-start">
                              <button
                                onClick={() => setExpandedCardId(isExpanded ? null : card.id)}
                                className="py-1 px-2.5 rounded-lg text-[10px] font-black tracking-wider text-[#397A56] bg-emerald-50/60 hover:bg-emerald-100/80 hover:text-[#2F6547] border border-emerald-100/50 transition-all duration-200 flex items-center gap-1 cursor-pointer"
                              >
                                <span>{isExpanded ? 'See less' : `+ See ${card.extraFeatures.length} more`}</span>
                                {isExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                              </button>
                              <AnimatePresence>
                                {isExpanded && (
                                  <div className="w-16 bg-emerald-100/40 h-0.5 rounded-full overflow-hidden">
                                    <motion.div
                                      key={`${card.id}-timer`}
                                      initial={{ width: "100%" }}
                                      animate={{ width: "0%" }}
                                      exit={{ opacity: 0 }}
                                      transition={{ duration: 10, ease: "linear" }}
                                      className="bg-[#397A56] h-full"
                                    />
                                  </div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>

                        {/* Bottom CTA Row */}
                        <div className="mt-4 sm:mt-5 pt-3 sm:pt-3.5 border-t border-slate-100/80 flex items-center justify-between gap-2 sm:gap-3">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <button 
                              onClick={() => onCtaclick(`blog/${card.blogSlug}`)} 
                              title="MetaWave Engineering Blog"
                              aria-label="MetaWave Engineering Blog"
                              className="p-2 min-h-[34px] min-w-[34px] rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 text-emerald-600 hover:text-emerald-850 transition-all duration-200 hover:scale-105 inline-flex items-center justify-center cursor-pointer shadow-sm shadow-emerald-100/50"
                            >
                              <Globe size={15} className="shrink-0" />
                            </button>
                            <button 
                              onClick={() => onCtaclick('blog')} 
                              title="Engineering Blog Index"
                              aria-label="Engineering Blog Index"
                              className="p-2 min-h-[34px] min-w-[34px] rounded-lg bg-orange-50 hover:bg-orange-100 border border-orange-300/80 text-orange-600 hover:text-orange-850 transition-all duration-200 hover:scale-105 inline-flex items-center justify-center cursor-pointer shadow-sm shadow-orange-100/50"
                            >
                              <BookOpen size={15} className="shrink-0" />
                            </button>
                          </div>

                          <button
                            onClick={() => onCtaclick('contact')}
                            className="h-[34px] px-3 sm:px-3.5 rounded-lg text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#397A56] bg-emerald-50 hover:bg-[#397A56] hover:text-white border border-emerald-300/80 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ml-auto sm:ml-0 shadow-sm shadow-emerald-100/50 hover:scale-105"
                          >
                            <span>{card.ctaText}</span>
                            <ArrowRight size={11} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Column 2 - Right Column of Staggered Cards (Cards 2 & 3 of current slide, staggered downwards) */}
                <div className="space-y-4 sm:space-y-5 flex flex-col justify-start sm:mt-8">
                  {[currentCards[2], currentCards[3]].map((card) => {
                    const CardIcon = card.icon;
                    const isExpanded = expandedCardId === card.id;

                    return (
                      <div
                        key={card.id}
                        className="group relative rounded-xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/50 p-3.5 xs:p-4 sm:p-4.5 flex flex-col justify-between hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-sm h-full"
                      >
                        {/* Numbering Watermark */}
                        <div className="absolute top-1 right-2 text-5xl font-display font-black text-emerald-500/[0.04] select-none pointer-events-none group-hover:text-emerald-500/[0.08] transition-colors duration-300">
                          {card.num}
                        </div>

                        <div>
                          {/* Badge Row */}
                          <div className="flex items-center justify-between">
                            <span className="inline-block text-[8.5px] font-mono font-black tracking-wider text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded">
                              {card.badge}
                            </span>
                            <CardIcon size={36} className="p-1.5 sm:p-2 sm:size-[38px] rounded-xl text-emerald-700 bg-emerald-100 border border-emerald-300 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-200 group-hover:border-emerald-400 group-hover:text-emerald-800 shrink-0" />
                          </div>

                          {/* Title */}
                          <h3 className="text-sm font-display font-black text-slate-900 group-hover:text-[#397A56] transition-colors mt-2 break-words">
                            {card.title}
                          </h3>

                          {/* Feature List */}
                          <div className="flex flex-col gap-2 mt-3.5 sm:mt-4">
                            {card.features.map((feat, fIdx) => {
                              const FeatIcon = feat.icon;
                              return (
                                <span key={fIdx} className="flex items-center gap-2.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                                  <FeatIcon size={12} className="text-[#397A56] shrink-0" />
                                  <span className="leading-snug break-words">{feat.label}</span>
                                </span>
                              );
                            })}

                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="flex flex-col gap-2 overflow-hidden"
                                >
                                  {card.extraFeatures.map((efeat, efIdx) => {
                                    const EFeatIcon = efeat.icon;
                                    return (
                                      <span key={efIdx} className="flex items-center gap-2.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-[10.5px] font-bold text-slate-800 bg-slate-50/95 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-900 transition-all duration-255 shadow-sm/5">
                                        <EFeatIcon size={12} className="text-[#397A56] shrink-0" />
                                        <span className="leading-snug break-words">{efeat.label}</span>
                                      </span>
                                    );
                                  })}
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Toggle Button */}
                            <div className="flex flex-col gap-1.5 mt-1 self-start">
                              <button
                                onClick={() => setExpandedCardId(isExpanded ? null : card.id)}
                                className="py-1 px-2.5 rounded-lg text-[10px] font-black tracking-wider text-[#397A56] bg-emerald-50/60 hover:bg-emerald-100/80 hover:text-[#2F6547] border border-emerald-100/50 transition-all duration-200 flex items-center gap-1 cursor-pointer"
                              >
                                <span>{isExpanded ? 'See less' : `+ See ${card.extraFeatures.length} more`}</span>
                                {isExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                              </button>
                              <AnimatePresence>
                                {isExpanded && (
                                  <div className="w-16 bg-emerald-100/40 h-0.5 rounded-full overflow-hidden">
                                    <motion.div
                                      key={`${card.id}-timer`}
                                      initial={{ width: "100%" }}
                                      animate={{ width: "0%" }}
                                      exit={{ opacity: 0 }}
                                      transition={{ duration: 10, ease: "linear" }}
                                      className="bg-[#397A56] h-full"
                                    />
                                  </div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>

                        {/* Bottom CTA Row */}
                        <div className="mt-4 sm:mt-5 pt-3 sm:pt-3.5 border-t border-slate-100/80 flex items-center justify-between gap-2 sm:gap-3">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <button 
                              onClick={() => onCtaclick(`blog/${card.blogSlug}`)} 
                              title="MetaWave Engineering Blog"
                              aria-label="MetaWave Engineering Blog"
                              className="p-2 min-h-[34px] min-w-[34px] rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 text-emerald-600 hover:text-emerald-850 transition-all duration-200 hover:scale-105 inline-flex items-center justify-center cursor-pointer shadow-sm shadow-emerald-100/50"
                            >
                              <Globe size={15} className="shrink-0" />
                            </button>
                            <button 
                              onClick={() => onCtaclick('blog')} 
                              title="Engineering Blog Index"
                              aria-label="Engineering Blog Index"
                              className="p-2 min-h-[34px] min-w-[34px] rounded-lg bg-orange-50 hover:bg-orange-100 border border-orange-300/80 text-orange-600 hover:text-orange-850 transition-all duration-200 hover:scale-105 inline-flex items-center justify-center cursor-pointer shadow-sm shadow-orange-100/50"
                            >
                              <BookOpen size={15} className="shrink-0" />
                            </button>
                          </div>

                          <button
                            onClick={() => onCtaclick('contact')}
                            className="h-[34px] px-3 sm:px-3.5 rounded-lg text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#397A56] bg-emerald-50 hover:bg-[#397A56] hover:text-white border border-emerald-300/80 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ml-auto sm:ml-0 shadow-sm shadow-emerald-100/50 hover:scale-105"
                          >
                            <span>{card.ctaText}</span>
                            <ArrowRight size={11} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

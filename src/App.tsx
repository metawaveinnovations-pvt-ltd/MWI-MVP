import React, { useState, useEffect, lazy, Suspense, Component } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// SEO Manager & Core Layout Components
import { SEOManager } from './components/SEOManager';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustMarquee } from './components/TrustMarquee';
import { Stats } from './components/Stats';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TechnologyStack } from './components/TechnologyStack';
import { CtaSection } from './components/CtaSection';
import { TeamSection } from './components/TeamSection';
import { GlobalNetworkSection } from './components/GlobalNetworkSection';
import { Footer } from './components/Footer';
import { playSound } from './utils/audio';

// Preloadable Lazy Loading Strategy for instantaneous route transitions with self-healing retry
function retryImport<T>(factory: () => Promise<T>, retriesLeft = 3, interval = 600): Promise<T> {
  return new Promise((resolve, reject) => {
    factory()
      .then(resolve)
      .catch((error) => {
        if (retriesLeft <= 0) {
          reject(error);
          return;
        }
        setTimeout(() => {
          retryImport(factory, retriesLeft - 1, interval * 1.5).then(resolve, reject);
        }, interval);
      });
  });
}

function lazyWithPreload<T extends React.ComponentType<any>>(
  factory: () => Promise<any>
) {
  let loadedModule: any = null;
  let loadPromise: Promise<any> | null = null;

  const load = () => {
    if (loadedModule) return Promise.resolve(loadedModule);
    if (!loadPromise) {
      loadPromise = retryImport(factory)
        .then((module) => {
          loadedModule = module;
          return module;
        })
        .catch((err) => {
          loadPromise = null; // Clear failed promise to allow future retries
          throw err;
        });
    }
    return loadPromise;
  };

  const LazyComponent = lazy(() => {
    if (loadedModule) {
      return Promise.resolve(
        'default' in loadedModule ? loadedModule : { default: loadedModule }
      );
    }
    return load().then((module) =>
      'default' in module ? module : { default: module }
    );
  });

  (LazyComponent as any).preload = load;

  return LazyComponent as React.LazyExoticComponent<T> & { preload: () => Promise<any> };
}

// Resilient Error Boundary for dynamically imported modules
interface RouteErrorBoundaryProps {
  children: React.ReactNode;
  onReset?: () => void;
}

interface RouteErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class RouteErrorBoundary extends Component<RouteErrorBoundaryProps, RouteErrorBoundaryState> {
  constructor(props: RouteErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): RouteErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Route dynamic load error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mb-4 text-2xl font-bold">
            !
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Module Loading Notice</h2>
          <p className="text-sm text-slate-600 max-w-md mb-6 leading-relaxed">
            The requested module is updating or temporarily delayed. Click below to reload the view.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={this.handleRetry}
              className="px-5 py-2.5 bg-[#326E45] hover:bg-[#20462c] text-white text-sm font-semibold rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Retry Loading
            </button>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/';
              }}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-all cursor-pointer"
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Lazy-loaded secondary route components with instant preloading capability
const LegalModal = lazyWithPreload(() => import('./components/LegalModal').then(m => ({ default: m.LegalModal })));
const CapabilitiesPage = lazyWithPreload(() => import('./components/CapabilitiesPage').then(m => ({ default: m.CapabilitiesPage })));
const CoreDomainPage = lazyWithPreload(() => import('./components/CoreDomainPage').then(m => ({ default: m.CoreDomainPage })));
const FeaturedSolutions = lazyWithPreload(() => import('./components/FeaturedSolutions').then(m => ({ default: m.FeaturedSolutions })));
const PortfolioShowcase = lazyWithPreload(() => import('./components/PortfolioShowcase').then(m => ({ default: m.PortfolioShowcase })));
const Insights = lazyWithPreload(() => import('./components/Insights').then(m => ({ default: m.Insights })));
const DevelopmentProcess = lazyWithPreload(() => import('./components/DevelopmentProcess').then(m => ({ default: m.DevelopmentProcess })));
const WebDevelopment = lazyWithPreload(() => import('./components/WebDevelopment').then(m => ({ default: m.WebDevelopment })));
const MobileDevelopment = lazyWithPreload(() => import('./components/MobileDevelopment').then(m => ({ default: m.MobileDevelopment })));
const CustomSoftwareDevelopment = lazyWithPreload(() => import('./components/CustomSoftwareDevelopment').then(m => ({ default: m.CustomSoftwareDevelopment })));
const FullStackDevelopment = lazyWithPreload(() => import('./components/FullStackDevelopment').then(m => ({ default: m.FullStackDevelopment })));
const UiUxDesign = lazyWithPreload(() => import('./components/UiUxDesign').then(m => ({ default: m.UiUxDesign })));
const CloudSolutions = lazyWithPreload(() => import('./components/CloudSolutions').then(m => ({ default: m.CloudSolutions })));
const AiMachineLearning = lazyWithPreload(() => import('./components/AiMachineLearning').then(m => ({ default: m.AiMachineLearning })));
const BusinessAutomation = lazyWithPreload(() => import('./components/BusinessAutomation').then(m => ({ default: m.BusinessAutomation })));
const DigitalMarketing = lazyWithPreload(() => import('./components/DigitalMarketing').then(m => ({ default: m.DigitalMarketing })));
const SeoServices = lazyWithPreload(() => import('./components/SeoServices').then(m => ({ default: m.SeoServices })));
const EcommerceDevelopment = lazyWithPreload(() => import('./components/EcommerceDevelopment').then(m => ({ default: m.EcommerceDevelopment })));
const CrmDevelopment = lazyWithPreload(() => import('./components/CrmDevelopment').then(m => ({ default: m.CrmDevelopment })));
const ErpDevelopment = lazyWithPreload(() => import('./components/ErpDevelopment').then(m => ({ default: m.ErpDevelopment })));
const ApiDevelopmentIntegrations = lazyWithPreload(() => import('./components/ApiDevelopmentIntegrations').then(m => ({ default: m.ApiDevelopmentIntegrations })));
const EnterpriseSystems = lazyWithPreload(() => import('./components/EnterpriseSystems').then(m => ({ default: m.EnterpriseSystems })));
const TechnicalConsulting = lazyWithPreload(() => import('./components/TechnicalConsulting').then(m => ({ default: m.TechnicalConsulting })));
const AiAutomationConsulting = lazyWithPreload(() => import('./components/AiAutomationConsulting').then(m => ({ default: m.AiAutomationConsulting })));
const GlobalPresence = lazyWithPreload(() => import('./components/GlobalPresence').then(m => ({ default: m.GlobalPresence })));
const Testimonials = lazyWithPreload(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const Industries = lazyWithPreload(() => import('./components/Industries').then(m => ({ default: m.Industries })));
const AboutUs = lazyWithPreload(() => import('./components/AboutUs').then(m => ({ default: m.AboutUs })));
const Careers = lazyWithPreload(() => import('./components/Careers').then(m => ({ default: m.Careers })));
const ContactUs = lazyWithPreload(() => import('./components/ContactUs').then(m => ({ default: m.ContactUs })));
const Blog = lazyWithPreload(() => import('./components/Blog').then(m => ({ default: m.Blog })));
const Shop = lazyWithPreload(() => import('./components/Shop').then(m => ({ default: m.Shop })));
const Faqs = lazyWithPreload(() => import('./components/Faqs').then(m => ({ default: m.Faqs })));
const AdminPanel = lazyWithPreload(() => import('./components/AdminPanel').then(m => ({ default: m.AdminPanel })));

const routePreloaders: Record<string, () => Promise<any>> = {
  capabilities: CapabilitiesPage.preload,
  'design-creative': CoreDomainPage.preload,
  'software-engineering': CoreDomainPage.preload,
  'cloud-data-infrastructure': CoreDomainPage.preload,
  'ai-automation-smart-systems': CoreDomainPage.preload,
  'growth-marketing-digital-strategy': CoreDomainPage.preload,
  about: AboutUs.preload,
  solutions: FeaturedSolutions.preload,
  portfolio: PortfolioShowcase.preload,
  contact: ContactUs.preload,
  blog: Blog.preload,
  shop: Shop.preload,
  faqs: Faqs.preload,
  careers: Careers.preload,
  'web-development': WebDevelopment.preload,
  'mobile-development': MobileDevelopment.preload,
  'custom-software-development': CustomSoftwareDevelopment.preload,
  'full-stack-development': FullStackDevelopment.preload,
  'ui-ux-design': UiUxDesign.preload,
  'cloud-solutions': CloudSolutions.preload,
  'ai-machine-learning': AiMachineLearning.preload,
  'business-automation': BusinessAutomation.preload,
  'digital-marketing': DigitalMarketing.preload,
  'seo-services': SeoServices.preload,
  'ecommerce-development': EcommerceDevelopment.preload,
  'crm-development': CrmDevelopment.preload,
  'erp-development': ErpDevelopment.preload,
  'api-development-integrations': ApiDevelopmentIntegrations.preload,
  'enterprise-systems': EnterpriseSystems.preload,
  'technical-consulting': TechnicalConsulting.preload,
  'ai-automation-consulting': AiAutomationConsulting.preload,
  'tech-stack': () => Promise.resolve(),
};

// Icons for general layout
import { ArrowUp } from 'lucide-react';

// Self-contained Spotlight component to prevent re-rendering the whole page on mousemove
const SpotlightBackground = React.memo(() => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
        const target = e.target as HTMLElement | null;
        if (target) {
          const interactive = target.closest(
            'a, button, [role="button"], input[type="button"], input[type="submit"], select, option, [class*="cursor-pointer"]'
          );
          setIsHovering(!!interactive);
        } else {
          setIsHovering(false);
        }
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none -z-10 rounded-full transition-[width,height,background-color] duration-500 ease-out hidden md:block"
        style={{
          width: isHovering ? '550px' : '400px',
          height: isHovering ? '550px' : '400px',
          backgroundColor: isHovering ? 'rgba(20, 184, 166, 0.045)' : 'rgba(20, 184, 166, 0.02)',
          filter: 'blur(100px)',
          transform: `translate3d(${mousePos.x - (isHovering ? 275 : 200)}px, ${mousePos.y - (isHovering ? 275 : 200)}px, 0)`,
          willChange: 'transform',
        }}
      />
      <div
        className="fixed pointer-events-none -z-10 rounded-full transition-[width,height,background-color] duration-300 ease-out hidden md:block"
        style={{
          width: isHovering ? '200px' : '120px',
          height: isHovering ? '200px' : '120px',
          backgroundColor: isHovering ? 'rgba(16, 185, 129, 0.06)' : 'rgba(16, 185, 129, 0.015)',
          filter: 'blur(50px)',
          transform: `translate3d(${mousePos.x - (isHovering ? 100 : 60)}px, ${mousePos.y - (isHovering ? 100 : 60)}px, 0)`,
          willChange: 'transform',
        }}
      />
    </>
  );
});

// Non-disruptive, sleek loading indicator without layout shifts
const SleekLoadingFallback = () => (
  <div className="w-full relative py-8 flex flex-col items-center justify-center min-h-[300px]">
    <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#326E45]/15 overflow-hidden">
      <div className="h-full bg-[#326E45] w-1/3 animate-[shimmer_1.2s_infinite_linear]" />
    </div>
    <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-2xs text-xs font-mono font-semibold text-slate-700">
      <div className="w-3.5 h-3.5 border-2 border-[#326E45] border-t-transparent rounded-full animate-spin" />
      <span>Loading Module...</span>
    </div>
  </div>
);

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(true);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'cookie' | 'faqs' | null>(null);

  const resolveRoute = (rawPathOrId: string): { page: string; path: string; modal?: 'privacy' | 'terms' | 'cookie' | null; sectionId?: string } => {
    if (!rawPathOrId) return { page: 'home', path: '/' };

    let clean = rawPathOrId.trim();
    if (clean.startsWith('#')) clean = clean.substring(1);
    if (clean.startsWith('/')) clean = clean.substring(1);
    clean = clean.toLowerCase();

    if (!clean || clean === 'home') return { page: 'home', path: '/' };

    // Modals
    if (['privacy', 'privacy-policy'].includes(clean)) {
      return { page: 'home', path: '/privacy-policy', modal: 'privacy' };
    }
    if (['terms', 'terms-and-conditions', 'security-protocols'].includes(clean)) {
      return { page: 'home', path: '/terms-and-conditions', modal: 'terms' };
    }
    if (['cookie', 'cookie-policy'].includes(clean)) {
      return { page: 'home', path: '/cookie-policy', modal: 'cookie' };
    }

    // Section anchors mapped to specific sub-pages / sections
    if (['trustees'].includes(clean)) {
      return { page: 'home', path: '/', sectionId: 'trustees' };
    }
    if (['why-metawave', 'why-choose-us'].includes(clean)) {
      return { page: 'home', path: '/', sectionId: 'why-metawave' };
    }
    if (['executive-team', 'team'].includes(clean)) {
      return { page: 'home', path: '/', sectionId: 'executive-team' };
    }
    if (['global-network', 'network', 'global-ecosystem-matrix'].includes(clean)) {
      return { page: 'home', path: '/', sectionId: 'global-network' };
    }
    if (['process', 'development-process'].includes(clean)) {
      return { page: 'capabilities', path: '/capabilities', sectionId: 'process' };
    }
    // 5 Core Engineering Domains - Dedicated Pages
    if (clean.startsWith('design-creative') || clean === 'capabilities/design-creative') {
      const qIndex = rawPathOrId.indexOf('?');
      const queryString = qIndex !== -1 ? rawPathOrId.substring(qIndex) : '';
      return { page: 'design-creative', path: `/design-creative${queryString}` };
    }
    if (clean.startsWith('software-engineering') || clean === 'capabilities/software-engineering' || clean.startsWith('development-engineering') || clean === 'capabilities/development-engineering') {
      const qIndex = rawPathOrId.indexOf('?');
      const queryString = qIndex !== -1 ? rawPathOrId.substring(qIndex) : '';
      return { page: 'software-engineering', path: `/software-engineering${queryString}` };
    }
    if (clean.startsWith('cloud-data-infrastructure') || clean === 'capabilities/cloud-data-infrastructure' || clean.startsWith('cloud-infrastructure') || clean === 'capabilities/cloud-infrastructure') {
      const qIndex = rawPathOrId.indexOf('?');
      const queryString = qIndex !== -1 ? rawPathOrId.substring(qIndex) : '';
      return { page: 'cloud-data-infrastructure', path: `/cloud-data-infrastructure${queryString}` };
    }
    if (clean.startsWith('ai-automation-smart-systems') || clean === 'capabilities/ai-automation-smart-systems' || (clean.startsWith('ai-automation') && !clean.includes('consulting'))) {
      const qIndex = rawPathOrId.indexOf('?');
      const queryString = qIndex !== -1 ? rawPathOrId.substring(qIndex) : '';
      return { page: 'ai-automation-smart-systems', path: `/ai-automation-smart-systems${queryString}` };
    }
    if (clean.startsWith('growth-marketing-digital-strategy') || clean === 'capabilities/growth-marketing-digital-strategy' || clean.startsWith('growth-marketing') || clean === 'capabilities/digital-marketing') {
      const qIndex = rawPathOrId.indexOf('?');
      const queryString = qIndex !== -1 ? rawPathOrId.substring(qIndex) : '';
      return { page: 'growth-marketing-digital-strategy', path: `/growth-marketing-digital-strategy${queryString}` };
    }

    if (clean.startsWith('capabilities') || ['capabilities', 'expertise', 'automation-capabilities'].includes(clean)) {
      const qIndex = rawPathOrId.indexOf('?');
      const queryString = qIndex !== -1 ? rawPathOrId.substring(qIndex) : '';
      if (queryString.includes('tab=design-creative')) {
        return { page: 'design-creative', path: `/design-creative${queryString.replace('tab=design-creative&', '').replace('tab=design-creative', '').replace('sub=', 'practice=')}` };
      }
      if (queryString.includes('tab=software-engineering')) {
        return { page: 'software-engineering', path: `/software-engineering${queryString.replace('tab=software-engineering&', '').replace('tab=software-engineering', '').replace('sub=', 'practice=')}` };
      }
      if (queryString.includes('tab=cloud-data-infrastructure')) {
        return { page: 'cloud-data-infrastructure', path: `/cloud-data-infrastructure${queryString.replace('tab=cloud-data-infrastructure&', '').replace('tab=cloud-data-infrastructure', '').replace('sub=', 'practice=')}` };
      }
      if (queryString.includes('tab=ai-automation-smart-systems')) {
        return { page: 'ai-automation-smart-systems', path: `/ai-automation-smart-systems${queryString.replace('tab=ai-automation-smart-systems&', '').replace('tab=ai-automation-smart-systems', '').replace('sub=', 'practice=')}` };
      }
      if (queryString.includes('tab=growth-marketing-digital-strategy')) {
        return { page: 'growth-marketing-digital-strategy', path: `/growth-marketing-digital-strategy${queryString.replace('tab=growth-marketing-digital-strategy&', '').replace('tab=growth-marketing-digital-strategy', '').replace('sub=', 'practice=')}` };
      }
      return { page: 'capabilities', path: `/capabilities${queryString}` };
    }

    // 30 Specialized Practices Deep-linking to dedicated Core Domain pages
    // Domain 1: Design & Creative
    if (['web-digital-experience-design', 'web-design'].includes(clean)) {
      return { page: 'design-creative', path: '/design-creative?practice=web-digital-experience-design' };
    }
    if (['ui-ux-design-prototyping'].includes(clean)) {
      return { page: 'design-creative', path: '/design-creative?practice=ui-ux-design-prototyping' };
    }
    if (['brand-identity-graphic-design', 'branding', 'graphic-design'].includes(clean)) {
      return { page: 'design-creative', path: '/design-creative?practice=brand-identity-graphic-design' };
    }
    if (['motion-graphics-video-production', 'motion-graphics', 'video-production'].includes(clean)) {
      return { page: 'design-creative', path: '/design-creative?practice=motion-graphics-video-production' };
    }
    if (['social-campaign-creative', 'social-creative', 'campaign-creative'].includes(clean)) {
      return { page: 'design-creative', path: '/design-creative?practice=social-campaign-creative' };
    }
    if (['marketing-promotional-content', 'promotional-content'].includes(clean)) {
      return { page: 'design-creative', path: '/design-creative?practice=marketing-promotional-content' };
    }

    // Domain 2: Software Engineering
    if (['website-web-development'].includes(clean)) {
      return { page: 'software-engineering', path: '/software-engineering?practice=website-web-development' };
    }
    if (['web-application-development'].includes(clean)) {
      return { page: 'software-engineering', path: '/software-engineering?practice=web-application-development' };
    }
    if (['mobile-application-development'].includes(clean)) {
      return { page: 'software-engineering', path: '/software-engineering?practice=mobile-application-development' };
    }
    if (['custom-software-development-practice'].includes(clean)) {
      return { page: 'software-engineering', path: '/software-engineering?practice=custom-software-development' };
    }
    if (['full-stack-api-engineering'].includes(clean)) {
      return { page: 'software-engineering', path: '/software-engineering?practice=full-stack-api-engineering' };
    }
    if (['enterprise-systems-platform-development'].includes(clean)) {
      return { page: 'software-engineering', path: '/software-engineering?practice=enterprise-systems-platform-development' };
    }

    // Domain 3: Cloud, Data & Infrastructure
    if (['cloud-infrastructure-deployment'].includes(clean)) {
      return { page: 'cloud-data-infrastructure', path: '/cloud-data-infrastructure?practice=cloud-infrastructure-deployment' };
    }
    if (['server-hosting-system-architecture'].includes(clean)) {
      return { page: 'cloud-data-infrastructure', path: '/cloud-data-infrastructure?practice=server-hosting-system-architecture' };
    }
    if (['database-design-management'].includes(clean)) {
      return { page: 'cloud-data-infrastructure', path: '/cloud-data-infrastructure?practice=database-design-management' };
    }
    if (['data-integration-api-infrastructure'].includes(clean)) {
      return { page: 'cloud-data-infrastructure', path: '/cloud-data-infrastructure?practice=data-integration-api-infrastructure' };
    }
    if (['security-backup-reliability'].includes(clean)) {
      return { page: 'cloud-data-infrastructure', path: '/cloud-data-infrastructure?practice=security-backup-reliability' };
    }
    if (['performance-infrastructure-optimization'].includes(clean)) {
      return { page: 'cloud-data-infrastructure', path: '/cloud-data-infrastructure?practice=performance-infrastructure-optimization' };
    }

    // Domain 4: AI, Automation & Smart Systems
    if (['ai-solutions-intelligent-applications'].includes(clean)) {
      return { page: 'ai-automation-smart-systems', path: '/ai-automation-smart-systems?practice=ai-solutions-intelligent-applications' };
    }
    if (['ai-agents-workflow-systems'].includes(clean)) {
      return { page: 'ai-automation-smart-systems', path: '/ai-automation-smart-systems?practice=ai-agents-workflow-systems' };
    }
    if (['business-process-automation-practice'].includes(clean)) {
      return { page: 'ai-automation-smart-systems', path: '/ai-automation-smart-systems?practice=business-process-automation' };
    }
    if (['ai-integration-custom-ai-workflows'].includes(clean)) {
      return { page: 'ai-automation-smart-systems', path: '/ai-automation-smart-systems?practice=ai-integration-custom-ai-workflows' };
    }
    if (['smart-recommendation-decision-systems'].includes(clean)) {
      return { page: 'ai-automation-smart-systems', path: '/ai-automation-smart-systems?practice=smart-recommendation-decision-systems' };
    }
    if (['ai-powered-customer-business-solutions'].includes(clean)) {
      return { page: 'ai-automation-smart-systems', path: '/ai-automation-smart-systems?practice=ai-powered-customer-business-solutions' };
    }

    // Domain 5: Growth Marketing & Digital Strategy
    if (['seo-search-visibility'].includes(clean)) {
      return { page: 'growth-marketing-digital-strategy', path: '/growth-marketing-digital-strategy?practice=seo-search-visibility' };
    }
    if (['social-media-digital-marketing'].includes(clean)) {
      return { page: 'growth-marketing-digital-strategy', path: '/growth-marketing-digital-strategy?practice=social-media-digital-marketing' };
    }
    if (['paid-advertising-campaign-management'].includes(clean)) {
      return { page: 'growth-marketing-digital-strategy', path: '/growth-marketing-digital-strategy?practice=paid-advertising-campaign-management' };
    }
    if (['content-strategy-audience-growth'].includes(clean)) {
      return { page: 'growth-marketing-digital-strategy', path: '/growth-marketing-digital-strategy?practice=content-strategy-audience-growth' };
    }
    if (['analytics-cro-performance-intelligence'].includes(clean)) {
      return { page: 'growth-marketing-digital-strategy', path: '/growth-marketing-digital-strategy?practice=analytics-cro-performance-intelligence' };
    }
    if (['business-growth-strategic-partnerships'].includes(clean)) {
      return { page: 'growth-marketing-digital-strategy', path: '/growth-marketing-digital-strategy?practice=business-growth-strategic-partnerships' };
    }
    if (['offerings', 'solutions-offerings', 'products-offerings'].includes(clean)) {
      return { page: 'solutions', path: '/offerings' };
    }
    // Impact and its dedicated sub-tabs
    if (clean.startsWith('impact') || clean.startsWith('portfolio')) {
      const qIndex = rawPathOrId.indexOf('?');
      const queryString = qIndex !== -1 ? rawPathOrId.substring(qIndex) : '';
      return { page: 'portfolio', path: `/impact${queryString}` };
    }
    if (['enterprise-projects', 'shipped-projects', '150-shipped-projects'].includes(clean)) {
      return { page: 'portfolio', path: '/impact?tab=enterprise-projects' };
    }
    if (['healthtech-case-studies', 'healthtech', 'ehr-case-studies'].includes(clean)) {
      return { page: 'portfolio', path: '/impact?tab=healthtech-case-studies' };
    }
    if (['fintech-proptech-outcomes', 'fintech', 'proptech'].includes(clean)) {
      return { page: 'portfolio', path: '/impact?tab=fintech-proptech-outcomes' };
    }
    if (['edtech-learning-impact', 'edtech', 'learning-impact'].includes(clean)) {
      return { page: 'portfolio', path: '/impact?tab=edtech-learning-impact' };
    }
    if (['supply-chain-logistics', 'logistics', 'supply-chain'].includes(clean)) {
      return { page: 'portfolio', path: '/impact?tab=supply-chain-logistics' };
    }
    if (['client-outcomes', 'case-studies'].includes(clean)) {
      return { page: 'portfolio', path: '/impact' };
    }
    if (['openings', 'jobs'].includes(clean)) {
      return { page: 'careers', path: '/careers', sectionId: 'openings' };
    }
    if (['testimonials'].includes(clean)) {
      return { page: 'about', path: '/about', sectionId: 'testimonials' };
    }
    if (['global-presence'].includes(clean)) {
      return { page: 'about', path: '/about', sectionId: 'global-presence' };
    }

    // Core pages
    if (['about', 'stewardship', 'certifications', 'certifications-compliance'].includes(clean)) {
      return { page: 'about', path: '/about' };
    }
    if (['services', 'industries'].includes(clean)) {
      return { page: 'home', path: '/' };
    }
    if (['solutions', 'solutions-stack'].includes(clean)) {
      return { page: 'solutions', path: '/solutions' };
    }
    if (['shop', 'products-shop'].includes(clean)) {
      return { page: 'shop', path: '/shop' };
    }
    if (['careers', 'career', 'jobs', 'openings', 'hiring', 'join-us', 'work-with-us'].includes(clean)) {
      return { page: 'careers', path: '/careers' };
    }
    if (['portfolio', 'endeavors', 'insights', 'work'].includes(clean)) {
      return { page: 'portfolio', path: '/impact' };
    }
    if (['contact', 'ingress'].includes(clean)) {
      return { page: 'contact', path: '/contact' };
    }
    if (['admin'].includes(clean)) {
      return { page: 'admin', path: '/admin' };
    }
    if (['faqs', 'faq', 'frequently-asked-questions', 'knowledgebase'].includes(clean)) {
      return { page: 'faqs', path: '/faqs' };
    }
    if (['tech-stack', 'technology-stack', 'techstack', 'stack', 'ecosystem'].includes(clean)) {
      return { page: 'tech-stack', path: '/tech-stack' };
    }

    // Individual services
    if (['web-development', 'web-dev', 'webdevelopment', 'custom-web-development'].includes(clean)) {
      return { page: 'web-development', path: '/web-development' };
    }
    if (['mobile-development', 'mobile-app-development', 'mobile-app', 'mobile-apps', 'mobile'].includes(clean)) {
      return { page: 'mobile-development', path: '/mobile-development' };
    }
    if (['custom-software-development', 'custom-software', 'customsoftware', 'custom-software-dev', 'software-development', 'software'].includes(clean)) {
      return { page: 'custom-software-development', path: '/custom-software-development' };
    }
    if (['full-stack-development', 'full-stack', 'fullstack', 'fullstack-development', 'full-stack-dev', 'fullstack-dev'].includes(clean)) {
      return { page: 'full-stack-development', path: '/full-stack-development' };
    }
    if (['ui-ux-design', 'ui-ux', 'uiux', 'ui-design', 'ux-design', 'product-design', 'design-systems', 'design'].includes(clean)) {
      return { page: 'ui-ux-design', path: '/ui-ux-design' };
    }
    if (['cloud-solutions', 'cloud', 'cloud-architecture', 'cloud-services', 'devops', 'kubernetes', 'aws', 'gcp', 'azure'].includes(clean)) {
      return { page: 'cloud-solutions', path: '/cloud-solutions' };
    }
    if (['ai-machine-learning', 'ai-ml', 'ai-intelligence', 'machine-learning', 'ai', 'ml', 'generative-ai', 'rag', 'llm'].includes(clean)) {
      return { page: 'ai-machine-learning', path: '/ai-machine-learning' };
    }
    if (['business-automation', 'automation', 'workflow-automation', 'rpa', 'process-automation', 'bpm', 'integration-automation', 'workflow'].includes(clean)) {
      return { page: 'business-automation', path: '/business-automation' };
    }
    if (['seo-services', 'seo', 'search-engine-optimization', 'technical-seo', 'local-seo', 'programmatic-seo', 'geo'].includes(clean)) {
      return { page: 'seo-services', path: '/seo-services' };
    }
    if (['ecommerce-development', 'ecommerce', 'e-commerce', 'online-store', 'headless-commerce', 'shopify-plus', 'b2b-commerce', 'shopping-cart'].includes(clean)) {
      return { page: 'ecommerce-development', path: '/ecommerce-development' };
    }
    if (['crm-development', 'crm', 'crm-solutions', 'customer-relationship-management', 'salesforce', 'hubspot', 'custom-crm', 'sales-pipeline'].includes(clean)) {
      return { page: 'crm-development', path: '/crm-development' };
    }
    if (['erp-development', 'erp', 'erp-solutions', 'enterprise-resource-planning', 'sap', 'netsuite', 'odoo', 'custom-erp', 'inventory-management'].includes(clean)) {
      return { page: 'erp-development', path: '/erp-development' };
    }
    if (['api-development-integrations', 'api-development', 'api-integration', 'api-integrations', 'rest-api', 'graphql-api', 'microservices', 'webhook-integration', 'api-gateways'].includes(clean)) {
      return { page: 'api-development-integrations', path: '/api-development-integrations' };
    }
    if (['enterprise-systems', 'enterprise-system', 'enterprise', 'enterprise-software', 'enterprise-architecture', 'legacy-modernization'].includes(clean)) {
      return { page: 'enterprise-systems', path: '/enterprise-systems' };
    }
    if (['technical-consulting', 'consulting', 'technical-advisory', 'fractional-cto', 'code-audit', 'finops', 'due-diligence'].includes(clean)) {
      return { page: 'technical-consulting', path: '/technical-consulting' };
    }
    if (['ai-automation-consulting', 'ai-automation', 'ai-consulting', 'automation-consulting', 'ai-advisory', 'ai-automation-advisory'].includes(clean)) {
      return { page: 'ai-automation-consulting', path: '/ai-automation-consulting' };
    }
    if (['digital-marketing', 'marketing', 'ppc', 'growth-marketing', 'performance-marketing', 'cro', 'ad-campaigns'].includes(clean)) {
      return { page: 'digital-marketing', path: '/digital-marketing' };
    }

    // Location pages
    if (['software-development-company-pakistan', 'software-development-company-uk', 'software-development-company-uae', 'software-development-company-saudi-arabia', 'software-development-company-usa'].includes(clean)) {
      return { page: 'about', path: `/${clean}` };
    }

    // Blog pages
    if (['blog', 'blog-posts', 'publications'].includes(clean)) {
      return { page: 'blog', path: '/blog' };
    }
    if (clean.startsWith('blog/')) {
      const slug = clean.replace('blog/', '');
      return { page: 'blog', path: `/blog/${slug}` };
    }
    if (clean.startsWith('blog-post-')) {
      const slug = clean.replace('blog-post-', '');
      return { page: 'blog', path: `/blog/${slug}` };
    }

    // Section anchors
    if (['trustees', 'why-metawave', 'stats', 'why-choose-us', 'executive-team', 'team', 'global-network', 'network', 'global-ecosystem-matrix'].includes(clean)) {
      return { page: 'home', path: '/' };
    }

    return { page: 'home', path: '/' };
  };

  const getInitialRoute = () => {
    if (window.location.hash) {
      return resolveRoute(window.location.hash.replace('#', ''));
    }
    return resolveRoute(window.location.pathname + window.location.search);
  };

  const initialRoute = getInitialRoute();

  const [activePage, setActivePage] = useState(initialRoute.page);
  const [activeSection, setActiveSection] = useState(initialRoute.path);
  const [currentPath, setCurrentPath] = useState(initialRoute.path);

  // Helper to scroll to section smoothly or to top
  const scrollToTargetSection = (sectionId?: string) => {
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const topOffset = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 90);
          window.scrollTo({ top: topOffset, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // If initial load had a hash, redirect it seamlessly to clean path
  useEffect(() => {
    if (window.location.hash) {
      const resolved = resolveRoute(window.location.hash.replace('#', ''));
      window.history.replaceState(null, '', resolved.path);
      setActivePage(resolved.page);
      setActiveSection(resolved.path);
      setCurrentPath(resolved.path);
      if (resolved.modal) {
        setLegalModalType(resolved.modal);
      }
      scrollToTargetSection(resolved.sectionId);
    } else if (initialRoute.modal) {
      setLegalModalType(initialRoute.modal);
    }
  }, []);

  // Preloading helper for instant route component fetching
  const handlePreload = (targetIdOrPath: string) => {
    const resolved = resolveRoute(targetIdOrPath);
    if (resolved.modal) {
      LegalModal.preload();
    }
    if (routePreloaders[resolved.page]) {
      routePreloaders[resolved.page]();
    }
  };

  // Idle background preloading of route components after initial page render
  useEffect(() => {
    const idlePreload = () => {
      // Stage 1: Primary pages
      AboutUs.preload();
      ContactUs.preload();
      Blog.preload();
      WebDevelopment.preload();
      MobileDevelopment.preload();
      CustomSoftwareDevelopment.preload();
      FeaturedSolutions.preload();

      // Stage 2: Secondary pages
      setTimeout(() => {
        Object.values(routePreloaders).forEach((preloadFn) => {
          try {
            preloadFn();
          } catch (e) {
            // Ignore preloader catch
          }
        });
      }, 1200);
    };

    if ('requestIdleCallback' in window) {
      const handle = (window as any).requestIdleCallback(idlePreload, { timeout: 1000 });
      return () => (window as any).cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(idlePreload, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  // Global tactile click audio feedback interceptor
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input[type="button"], input[type="submit"], select, option, input[type="text"], input[type="email"], textarea, .cursor-pointer, [class*="cursor-pointer"]'
        );
        if (interactive) {
          const override = interactive.getAttribute('data-sound');
          if (override) {
            playSound(override as any);
            return;
          }
          if (
            interactive.closest('[aria-label*="Sound"]') || 
            interactive.closest('[title*="Sound"]') || 
            interactive.closest('[aria-label*="Audio"]') || 
            interactive.closest('[title*="Audio"]')
          ) {
            return;
          }
          if (
            interactive.closest('nav') || 
            interactive.closest('[class*="Navbar"]') || 
            interactive.closest('[id*="nav"]') || 
            interactive.closest('[class*="nav-"]')
          ) {
            playSound('nav');
            return;
          }
          if (
            interactive.closest('#capabilities') || 
            interactive.closest('[class*="services"]') || 
            interactive.closest('[id*="services"]')
          ) {
            playSound('service');
            return;
          }
          const tagName = interactive.tagName.toLowerCase();
          if (tagName === 'input' || tagName === 'textarea' || tagName === 'select' || tagName === 'option') {
            playSound('form_input');
            return;
          }
          playSound('click');
        }
      }
    };
    window.addEventListener('click', handleGlobalClick, { capture: true });
    return () => window.removeEventListener('click', handleGlobalClick, { capture: true });
  }, []);

  // Monitor scroll height
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for browser back / forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const resolved = resolveRoute(window.location.pathname + window.location.search);
      setActivePage(resolved.page);
      setActiveSection(resolved.path);
      setCurrentPath(resolved.path);
      if (resolved.modal) {
        setLegalModalType(resolved.modal);
      } else {
        setLegalModalType(null);
      }
      scrollToTargetSection(resolved.sectionId);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Ultimate routing handler with clean HTML5 History URLs
  const handleNavigatePageOrSection = (targetIdOrPath: string) => {
    handlePreload(targetIdOrPath);
    const resolved = resolveRoute(targetIdOrPath);
    
    if (resolved.modal) {
      setLegalModalType(resolved.modal);
    } else {
      setLegalModalType(null);
    }

    setActivePage(resolved.page);
    setActiveSection(resolved.path);
    setCurrentPath(resolved.path);

    if ((window.location.pathname + window.location.search) !== resolved.path) {
      window.history.pushState(null, '', resolved.path);
    }

    scrollToTargetSection(resolved.sectionId);
  };

  if (activePage === 'admin') {
    return (
      <AdminPanel onExit={() => handleNavigatePageOrSection('home')} />
    );
  }

  return (
    <div className="min-h-screen bg-mwi-base text-slate-800 flex flex-col font-sans relative selection:bg-teal-600/10 selection:text-slate-900">
      
      {/* Dynamic SEO Manager injection for title, meta tags, and JSON-LD schema */}
      <SEOManager currentPath={currentPath} />

      {/* Skip to Main Content Link for Keyboard & Screen Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none font-medium text-sm transition-all"
      >
        Skip to main content
      </a>

      {/* Legal & Policy Modals */}
      <Suspense fallback={null}>
        <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />
      </Suspense>

      {/* 1. Dynamic Spotlight Radial Light (Self-contained RAF component) */}
      <SpotlightBackground />

      {/* 2. Sticky Glassmorphic Navbar & Announcement Banner */}
      <AnimatePresence>
        {isBannerOpen && (
          <motion.div
            initial={false}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden z-[60] relative"
          >
            <AnnouncementBanner 
              onCtaclick={handleNavigatePageOrSection} 
              onClose={() => setIsBannerOpen(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar 
        onNavClick={handleNavigatePageOrSection} 
        onPreload={handlePreload}
        activeSection={activeSection} 
        isBannerOpen={isBannerOpen} 
      />

      {/* 3. Main Multi-Page stage */}
      <main id="main-content" className="flex-grow">
        <RouteErrorBoundary onReset={() => setActivePage('home')}>
          <Suspense fallback={<SleekLoadingFallback />}>
            <AnimatePresence mode="sync">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
            {activePage === 'home' && (
              <div className="animate-fade-in">
                <Hero onCtaclick={handleNavigatePageOrSection} />
                <div id="trustees">
                  <TrustMarquee />
                </div>
                <Stats />
                <WhyChooseUs />
                <GlobalNetworkSection />
                <TechnologyStack onNavigate={handleNavigatePageOrSection} />
                <TeamSection />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'about' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <AboutUs onNavigate={handleNavigatePageOrSection} />
                <GlobalPresence />
                <Testimonials />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'solutions' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <FeaturedSolutions onCtaclick={handleNavigatePageOrSection} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'shop' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <Shop onNavigate={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'capabilities' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <CapabilitiesPage onNavigate={handleNavigatePageOrSection} />
                <DevelopmentProcess />
                <Industries onNavigate={handleNavigatePageOrSection} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'design-creative' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <CoreDomainPage domainId="design-creative" onNavigate={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'software-engineering' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <CoreDomainPage domainId="software-engineering" onNavigate={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'cloud-data-infrastructure' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <CoreDomainPage domainId="cloud-data-infrastructure" onNavigate={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'ai-automation-smart-systems' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <CoreDomainPage domainId="ai-automation-smart-systems" onNavigate={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'growth-marketing-digital-strategy' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <CoreDomainPage domainId="growth-marketing-digital-strategy" onNavigate={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'web-development' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <WebDevelopment onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'mobile-development' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <MobileDevelopment onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'custom-software-development' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <CustomSoftwareDevelopment onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'full-stack-development' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <FullStackDevelopment onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'ui-ux-design' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <UiUxDesign onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'cloud-solutions' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <CloudSolutions onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'ai-machine-learning' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <AiMachineLearning onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'business-automation' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <BusinessAutomation onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'digital-marketing' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <DigitalMarketing onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'seo-services' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <SeoServices onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'ecommerce-development' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <EcommerceDevelopment onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'crm-development' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <CrmDevelopment onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'erp-development' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <ErpDevelopment onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'api-development-integrations' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <ApiDevelopmentIntegrations onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'enterprise-systems' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <EnterpriseSystems onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'technical-consulting' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <TechnicalConsulting onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'ai-automation-consulting' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <AiAutomationConsulting onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'careers' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <Careers onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'portfolio' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <PortfolioShowcase currentPath={currentPath} onNavigate={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'contact' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <ContactUs />
              </div>
            )}

            {activePage === 'blog' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <Blog activeSection={activeSection} onNavigate={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'faqs' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <Faqs onNavigate={handleNavigatePageOrSection} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'tech-stack' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <TechnologyStack onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        </Suspense>
        </RouteErrorBoundary>
      </main>

      {/* 4. Multi-column corporate footer */}
      <Footer onNavClick={handleNavigatePageOrSection} onPreload={handlePreload} />

      {/* Scroll to Top Dynamic backlink */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 p-3 rounded-xl bg-[#326E45] hover:bg-[#20462c] text-white font-bold shadow-md hover:shadow-lg z-40 transition-all cursor-pointer border border-[#326E45]/10"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}

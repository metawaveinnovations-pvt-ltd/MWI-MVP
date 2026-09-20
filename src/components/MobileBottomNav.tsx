import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  Layers, 
  Cpu, 
  TrendingUp, 
  Grid,
  Search,
  MessageSquare
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface MobileBottomNavProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
  onOpenMenu?: () => void;
}

export function MobileBottomNav({
  activeSection,
  onNavClick,
  onOpenMenu
}: MobileBottomNavProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleDrawerState = (e: any) => {
      if (typeof e.detail?.open === 'boolean') {
        setIsDrawerOpen(e.detail.open);
      }
    };
    window.addEventListener('mwi_mobile_menu_state', handleDrawerState);
    return () => window.removeEventListener('mwi_mobile_menu_state', handleDrawerState);
  }, []);

  const getNormalizedActive = () => {
    const raw = (activeSection || '').trim().toLowerCase();
    const clean = raw.startsWith('#') ? raw.slice(1) : raw;

    if (!clean || clean === '/' || clean === 'home') return 'home';
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
      return 'solutions';
    }

    if (
      clean === 'impact' ||
      clean === '/impact' ||
      clean === 'portfolio' ||
      clean === '/portfolio' ||
      clean.includes('case-studies')
    ) {
      return 'impact';
    }

    if (clean === 'contact' || clean === '/contact') {
      return 'contact';
    }

    return null;
  };

  const activeTab = getNormalizedActive();

  const handleTabClick = (tabId: string, navTarget?: string) => {
    playSound('click');
    if (tabId === 'menu') {
      if (onOpenMenu) {
        onOpenMenu();
      } else {
        window.dispatchEvent(new CustomEvent('mwi_open_mobile_menu'));
      }
      return;
    }

    if (navTarget) {
      onNavClick(navTarget);
    }
  };

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      target: 'home',
      badge: null
    },
    {
      id: 'capabilities',
      label: 'Capabilities',
      icon: Layers,
      target: 'capabilities',
      badge: '5'
    },
    {
      id: 'solutions',
      label: 'Solutions',
      icon: Cpu,
      target: 'solutions',
      badge: null
    },
    {
      id: 'impact',
      label: 'Impact',
      icon: TrendingUp,
      target: 'portfolio',
      badge: '150+'
    },
    {
      id: 'menu',
      label: 'Hub',
      icon: Grid,
      target: undefined,
      badge: null
    }
  ];

  return (
    <nav
      id="mobile-bottom-app-dock"
      aria-label="Mobile Navigation Dock"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden px-3 sm:px-6 pb-[max(0.6rem,env(safe-area-inset-bottom,0px))] pt-1.5 pointer-events-none transition-all duration-300"
    >
      <div className="max-w-md mx-auto bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_-4px_24px_rgba(15,23,42,0.08),0_12px_32px_rgba(15,23,42,0.12)] rounded-[22px] px-1.5 sm:px-2 py-1.5 flex items-center justify-between pointer-events-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === 'menu' ? isDrawerOpen : activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, tab.target)}
              className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl transition-all duration-200 select-none min-h-[46px] min-w-[48px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 active:scale-90 group ${
                isActive
                  ? 'text-[#326E45]'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active Indicator Capsule */}
              {isActive && (
                <motion.div
                  layoutId="mobileBottomNavActivePill"
                  className="absolute inset-0 rounded-xl bg-emerald-500/10 border border-emerald-500/20 -z-10"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}

              {/* Icon Container with Badge */}
              <div className="relative flex items-center justify-center">
                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.3 : 1.9}
                  className={`transition-transform duration-200 ${
                    isActive ? 'scale-105' : 'group-hover:scale-105'
                  }`}
                />
                {tab.badge && !isActive && (
                  <span className="absolute -top-1 -right-2 text-[7.5px] font-mono font-black text-emerald-700 bg-emerald-100/90 px-1 py-0.2 rounded-full leading-none border border-emerald-300/60 shadow-2xs">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[9.5px] font-mono tracking-tight uppercase leading-none mt-1 transition-all ${
                  isActive ? 'font-black text-[#326E45]' : 'font-semibold text-slate-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

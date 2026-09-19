import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Globe, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Mail, 
  X,
  Sparkles
} from 'lucide-react';

interface AnnouncementBannerProps {
  onCtaclick: (sectionId: string) => void;
  onClose: () => void;
}

export function AnnouncementBanner({ onCtaclick, onClose }: AnnouncementBannerProps) {
  const [tick, setTick] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [userLocation, setUserLocation] = useState<string>('Detecting location...');

  // Live User Location Detection Logic
  useEffect(() => {
    let isMounted = true;

    async function detectLocation() {
      // 1. Initial immediate detection using Browser Timezone
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz) {
          const parts = tz.split('/');
          const city = parts[parts.length - 1].replace(/_/g, ' ');
          if (city && isMounted) {
            setUserLocation(`${city}`);
          }
        }
      } catch (err) {
        // Graceful fallback
      }

      // 2. Asynchronous API detection for precise City + Country code
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const response = await fetch('https://ipapi.co/json/', { signal: controller.signal });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data && (data.city || data.country_code)) {
            const city = data.city || '';
            const country = data.country_code || data.country_name || '';
            const locString = city && country ? `${city}, ${country}` : city || country;
            if (locString && isMounted) {
              setUserLocation(locString);
            }
          }
        }
      } catch (e) {
        // Keep initial timezone detection fallback
      }
    }

    detectLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  // Dynamic status bar messages targeting MetaWave Innovations ideology & mission
  const activeMissions = [
    "MetaWave Innovations • Shaping Global Technological Dimensions",
    "Where Innovation Meets Development • 140+ Global Client Nodes",
    "Umbrella Tech Partner • Custom SLA-Grade Enterprise Infrastructures",
    "Pioneering POS, ERP, and AI Analytics Suites Worldwide",
    "99.9% High Availability Sandbox Environment Online"
  ];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeMissionMessage = activeMissions[tick % activeMissions.length];

  return (
    <div
      className="w-full h-[46px] sm:h-[50px] bg-[#183a22] text-slate-100 border-b border-[#326E45]/50 relative flex items-center select-none font-sans z-[60] shadow-sm overflow-hidden"
      id="announcement-banner"
    >
      {/* Visual background pattern accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#14321d] via-[#2a5c39] to-[#14321d] opacity-95" />
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

      <div className="w-[96%] xl:w-[92%] max-w-7xl mx-auto flex items-center justify-between relative h-full gap-2 sm:gap-4">
        
        {/* ========================================================= */}
        {/* ON LEFT: Live Detected User Location                      */}
        {/* ========================================================= */}
        <div className="flex items-center gap-2 shrink-0 max-w-[32%] sm:max-w-[30%] lg:max-w-[28%] overflow-hidden">
          <div className="relative flex items-center justify-center w-6 h-6 rounded-md bg-emerald-950/70 border border-emerald-400/35 text-emerald-300 shrink-0">
            <MapPin size={12} className="text-emerald-400 animate-bounce" style={{ animationDuration: '2.5s' }} />
          </div>

          <div className="flex flex-col justify-center min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[8.5px] sm:text-[9.5px] font-mono font-bold uppercase tracking-wider text-emerald-300/90 whitespace-nowrap">
                LIVE LOCATION
              </span>
            </div>
            <span 
              className="text-[10px] sm:text-[11.5px] font-bold text-white tracking-tight whitespace-nowrap overflow-hidden text-ellipsis leading-tight"
              title={`Detected User Location: ${userLocation}`}
            >
              {userLocation}
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CENTER: Active Announcements Stream                       */}
        {/* ========================================================= */}
        <div 
          className="flex-1 flex items-center justify-center px-1 sm:px-2 max-w-[40%] sm:max-w-[46%] lg:max-w-[50%] overflow-hidden cursor-help"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          title="Pause Announcement Stream"
        >
          <div className="flex items-center justify-center gap-2 max-w-full text-center">
            <Sparkles size={12} className="text-emerald-400 hidden lg:block shrink-0" />
            <AnimatePresence mode="wait">
              <motion.p
                key={tick}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="text-[10px] sm:text-[12px] font-bold text-emerald-50 whitespace-nowrap overflow-hidden text-ellipsis leading-none tracking-tight"
              >
                {activeMissionMessage}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ON RIGHT: Social Connections & Close                      */}
        {/* ========================================================= */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 justify-end max-w-[28%] sm:max-w-[25%]">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg bg-white/10 border border-white/20 hover:border-emerald-300 hover:bg-emerald-600/50 text-emerald-100 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-2xs"
              title="LinkedIn"
            >
              <Linkedin size={12} />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg bg-white/10 border border-white/20 hover:border-emerald-300 hover:bg-emerald-600/50 text-emerald-100 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-2xs"
              title="Facebook"
            >
              <Facebook size={12} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg bg-white/10 border border-white/20 hover:border-emerald-300 hover:bg-emerald-600/50 text-emerald-100 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-2xs"
              title="Instagram"
            >
              <Instagram size={12} />
            </a>

            <a
              href="mailto:metawave.innovations@gmail.com"
              className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg bg-white/15 border border-white/25 hover:border-emerald-300 hover:bg-emerald-600/50 text-emerald-100 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-2xs"
              title="Email Us"
            >
              <Mail size={12} />
            </a>
          </div>

          <div className="w-[1px] h-3.5 bg-white/20 hidden sm:block" />

          {/* CLOSE BANNER BUTTON */}
          <button
            onClick={onClose}
            className="w-6.5 h-6.5 rounded-lg bg-white/10 hover:bg-white/25 border border-white/20 hover:border-white text-emerald-100 hover:text-white flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-90"
            aria-label="Close Top Banner"
            title="Dismiss top banner"
          >
            <X size={12} />
          </button>
        </div>

      </div>
    </div>
  );
}


import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, CheckCircle2, 
  Building2, MapPin, Play, Pause, Award, Sparkles, UserCheck
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  flag: string;
  avatar: string;
  categoryLabel: string;
  review: string;
  keyOutcome: string;
  outcomeLabel: string;
  rating: number;
  initials: string;
  badge: string;
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [progressKey, setProgressKey] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 'arthur-sterling',
      name: 'Dr. Arthur Sterling',
      role: 'Chief Medical Solutions Director',
      company: 'Aegis Healthcare Providers',
      location: 'Boston, MA, USA',
      flag: '🇺🇸',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      categoryLabel: 'Healthcare & Medical Systems',
      review: 'MetaWave Innovations transformed our patient admissions ecosystem with remarkable empathy and precision. Their engineering reduced patient check-in wait times by 40% while earning unanimous praise from our clinical team.',
      keyOutcome: '40% Faster Wait Times',
      outcomeLabel: 'Patient Admissions Efficiency',
      rating: 5,
      initials: 'AS',
      badge: 'Verified Enterprise Partner'
    },
    {
      id: 'sarah-jenkins',
      name: 'Sarah Jenkins',
      role: 'SVP of Global Asset Strategy',
      company: 'Prism Real Estate Group',
      location: 'London, United Kingdom',
      flag: '🇬🇧',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      categoryLabel: 'Commercial Real Estate',
      review: 'Working with MetaWave felt like a seamless extension of our executive leadership. They brought total clarity to our digital transformation, launching our tenant portal 3.2x faster than expected with zero friction.',
      keyOutcome: '3.2x Accelerated Launch',
      outcomeLabel: 'Time-to-Market Velocity',
      rating: 5,
      initials: 'SJ',
      badge: 'Strategic Client'
    },
    {
      id: 'marcus-vance',
      name: 'Marcus Vance',
      role: 'VP of Commercial Operations',
      company: 'Aura Retail Commerce',
      location: 'Singapore',
      flag: '🇸🇬',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      categoryLabel: 'Global E-Commerce',
      review: 'Our mobile commerce platform underwent a complete revival under MetaWave’s guidance. Cart drop-offs decreased by 22% in month one alone. Their dedication to our business vision was truly outstanding.',
      keyOutcome: '22% Sales Lift',
      outcomeLabel: 'Cart Conversion Growth',
      rating: 5,
      initials: 'MV',
      badge: 'Long-term Client'
    },
    {
      id: 'elena-rostova',
      name: 'Elena Rostova',
      role: 'Director of Operations & Fleet',
      company: 'NordTech Logistics',
      location: 'Berlin, Germany',
      flag: '🇩🇪',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      categoryLabel: 'Freight & Supply Chain',
      review: 'Navigating peak logistics across Europe requires flawless system uptime. MetaWave engineered a portal maintaining 99.999% reliability across 12 transit corridors. Their commitment to client trust is unmatched.',
      keyOutcome: '99.999% Uptime SLA',
      outcomeLabel: 'Fleet Reliability',
      rating: 5,
      initials: 'ER',
      badge: 'Verified Enterprise Partner'
    },
    {
      id: 'tariq-mansoor',
      name: 'Tariq Al-Mansoor',
      role: 'Head of Financial Services',
      company: 'Gulf Horizon Capital',
      location: 'Dubai, UAE',
      flag: '🇦🇪',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      categoryLabel: 'FinTech & Capital Systems',
      review: 'MetaWave delivered a secure cross-border settlement system processing over $50M daily. Their strict adherence to compliance standards and consultative guidance gave us complete confidence.',
      keyOutcome: '$50M+ Daily Volume',
      outcomeLabel: 'Settlement Security',
      rating: 5,
      initials: 'TM',
      badge: 'Enterprise Trust Partner'
    },
    {
      id: 'david-chen',
      name: 'David Chen',
      role: 'CTO & Co-Founder',
      company: 'Quantum Cloud AI',
      location: 'Sydney, Australia',
      flag: '🇦🇺',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
      categoryLabel: 'Cloud & AI Innovation',
      review: 'The team at MetaWave combines deep technical acumen with strategic clarity. They optimized our AI pipelines, reducing processing delays by 60% while maintaining absolute system stability.',
      keyOutcome: '60% Faster Data Flow',
      outcomeLabel: 'AI Optimization',
      rating: 5,
      initials: 'DC',
      badge: 'Verified Enterprise Partner'
    }
  ];

  // Auto-play timer (5.5 seconds interval)
  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const timer = setInterval(() => {
      setDirection('right');
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setProgressKey((prev) => prev + 1);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPlaying, isHovered, testimonials.length]);

  const handleNext = () => {
    setDirection('right');
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setProgressKey((prev) => prev + 1);
  };

  const handlePrev = () => {
    setDirection('left');
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setProgressKey((prev) => prev + 1);
  };

  const handleSelect = (idx: number) => {
    setDirection(idx > activeIndex ? 'right' : 'left');
    setActiveIndex(idx);
    setProgressKey((prev) => prev + 1);
  };

  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-14 sm:py-20 bg-[#FAFBFB] border-b border-slate-200/80 relative overflow-hidden text-left">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-emerald-500/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-200/90 bg-emerald-50/90 text-[#326E45] shadow-2xs">
              <UserCheck size={13} className="text-[#326E45]" />
              <span className="text-[10px] font-semibold tracking-widest uppercase">
                EXECUTIVE TRUST & PROOF
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Endorsed by Global Industry Leaders
            </h2>
          </div>

          {/* Aggregate Rating & Controls */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
              <div className="flex text-amber-400">
                <Star size={14} className="fill-amber-400" />
              </div>
              <span>5.0 / 5.0 Trust Score</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-bold">250+ Clients</span>
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
              title={isPlaying ? "Pause rotation" : "Play rotation"}
            >
              {isPlaying ? <Pause size={14} className="text-emerald-700" /> : <Play size={14} className="text-emerald-700" />}
            </button>
          </div>
        </div>

        {/* Executive Profile Selector Bar with Progress Indicator */}
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {testimonials.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(idx)}
                className={`p-2.5 rounded-2xl border transition-all duration-200 text-left flex items-center gap-2.5 cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500/50'
                    : 'bg-white text-slate-700 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 shadow-2xs'
                }`}
              >
                <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-slate-200 relative bg-slate-100">
                  <div className="absolute inset-0 bg-slate-800 text-white font-mono font-bold text-[10px] flex items-center justify-center">
                    {item.initials}
                  </div>
                  <img
                    src={item.avatar}
                    alt={item.name}
                    width={36}
                    height={36}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold font-display truncate leading-snug">
                    {item.name.split(' ')[item.name.split(' ').length - 1]}
                  </div>
                  <div className={`text-[10px] truncate ${isActive ? 'text-emerald-300' : 'text-slate-500'}`}>
                    {item.company.split(' ')[0]}
                  </div>
                </div>

                {isActive && (
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-emerald-400" />
                )}

                {/* Smooth rotation progress bar for active item */}
                {isActive && isPlaying && !isHovered && (
                  <motion.div
                    key={`bar-${progressKey}`}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5.5, ease: 'linear' }}
                    className="absolute bottom-0 left-0 h-0.5 bg-emerald-400 opacity-90"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* MAIN EXECUTIVE SPOTLIGHT DISPLAY SURFACE                                  */}
        {/* ========================================================================= */}
        <div 
          className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Top Progress Line across spotlight surface */}
          {isPlaying && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden">
              <motion.div
                key={`top-progress-${progressKey}-${isHovered}`}
                initial={{ width: isHovered ? '100%' : '0%' }}
                animate={{ width: isHovered ? '100%' : '100%' }}
                transition={{ duration: isHovered ? 0 : 5.5, ease: 'linear' }}
                className={`h-full ${isHovered ? 'bg-amber-400 opacity-70' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`}
              />
            </div>
          )}

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={{
                initial: (dir: 'left' | 'right') => ({
                  opacity: 0,
                  x: dir === 'right' ? 24 : -24,
                }),
                animate: {
                  opacity: 1,
                  x: 0,
                },
                exit: (dir: 'left' | 'right') => ({
                  opacity: 0,
                  x: dir === 'right' ? -24 : 24,
                }),
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] as const }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Quote Narrative & Category */}
              <div className="lg:col-span-8 space-y-5">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                      {current.categoryLabel}
                    </span>
                    {isHovered && isPlaying && (
                      <span className="text-[10px] font-mono text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-medium">
                        Paused on Hover
                      </span>
                    )}
                  </div>
                  <Quote size={32} className="text-emerald-600/20" />
                </div>

                <blockquote className="text-lg sm:text-xl lg:text-2xl text-slate-900 font-serif leading-relaxed italic">
                  "{current.review}"
                </blockquote>

                {/* Outcome Highlight Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/90 text-[#326E45] text-xs font-bold">
                  <Sparkles size={14} className="text-[#326E45]" />
                  <span>{current.outcomeLabel}:</span>
                  <span className="font-extrabold">{current.keyOutcome}</span>
                </div>

              </div>

              {/* Right Column: Executive Profile Card */}
              <div className="lg:col-span-4 bg-slate-50/90 border border-slate-200/80 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative shadow-2xs">
                      <div className="absolute inset-0 bg-slate-900 text-white font-mono font-bold text-sm flex items-center justify-center">
                        {current.initials}
                      </div>
                      <img 
                        src={current.avatar} 
                        alt={current.name}
                        width={56}
                        height={56}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full ring-2 ring-white">
                      <CheckCircle2 size={12} />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-display font-bold text-slate-900 truncate">
                        {current.name}
                      </h3>
                      <span className="text-sm shrink-0">{current.flag}</span>
                    </div>

                    <p className="text-xs font-semibold text-slate-600 truncate">
                      {current.role}
                    </p>

                    <div className="flex items-center gap-1 text-xs font-bold text-[#326E45] pt-0.5 truncate">
                      <Building2 size={12} />
                      <span className="truncate">{current.company}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1 text-slate-600">
                    <MapPin size={12} className="text-slate-400" />
                    <span className="font-medium truncate">{current.location}</span>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-emerald-100/80 text-emerald-800 font-semibold text-[10px]">
                    {current.badge}
                  </span>
                </div>

                {/* Arrow Navigation Buttons */}
                <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {activeIndex + 1} / {testimonials.length}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors flex items-center justify-center shadow-2xs cursor-pointer"
                      aria-label="Previous story"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors flex items-center justify-center shadow-2xs cursor-pointer"
                      aria-label="Next story"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

          {/* Compact Trust Metrics Footer Strip */}
          <div className="mt-8 pt-6 border-t border-slate-150 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs font-medium text-slate-600">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck size={14} className="text-[#326E45]" />
              <span><strong>99.8%</strong> Client Retention</span>
            </div>
            <div className="flex items-center justify-center gap-2 border-l border-slate-150 sm:border-l">
              <Award size={14} className="text-[#326E45]" />
              <span><strong>250+</strong> Deployed Systems</span>
            </div>
            <div className="flex items-center justify-center gap-2 border-l border-slate-150">
              <CheckCircle2 size={14} className="text-[#326E45]" />
              <span><strong>15+</strong> Global Markets</span>
            </div>
            <div className="flex items-center justify-center gap-2 border-l border-slate-150">
              <Star size={14} className="text-amber-500 fill-amber-500" />
              <span><strong>100%</strong> Verified Feedback</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TechLogo } from './TechLogos';
import { 
  Code2, 
  Server, 
  Database, 
  CloudLightning, 
  BrainCircuit, 
  Smartphone,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  Lock,
  Boxes,
  Zap
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface TechnologyStackProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

interface TechBadge {
  id: string;
  name: string;
  role: string;
}

interface CategoryGroup {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
  accentColor: string;
  items: TechBadge[];
}

const PRINCIPLES = [
  {
    title: 'FUTURE-READY ARCHITECTURE',
    desc: 'Engineered to effortlessly scale as your business grows',
    icon: Cpu
  },
  {
    title: 'BANK-GRADE SECURITY',
    desc: 'Zero-compromise protection at every layer of your stack',
    icon: ShieldCheck
  },
  {
    title: 'RAPID MARKET DELIVERY',
    desc: 'Ship faster with battle-tested, high-performance tech',
    icon: Zap
  },
  {
    title: '100% CODE & IP OWNERSHIP',
    desc: 'Zero vendor lock-in — complete ownership from day one',
    icon: Lock
  }
];

const CATEGORIES: CategoryGroup[] = [
  {
    id: 'frontend',
    title: 'FRONTEND',
    icon: Code2,
    accentColor: '#38BDF8',
    items: [
      { id: 'react', name: 'React', role: 'Interactive UI' },
      { id: 'nextjs', name: 'Next.js', role: 'Production Web Apps' },
      { id: 'typescript', name: 'TypeScript', role: 'Type Safety' }
    ]
  },
  {
    id: 'backend',
    title: 'BACKEND',
    icon: Server,
    accentColor: '#339933',
    items: [
      { id: 'nodejs', name: 'Node.js', role: 'High Concurrency' },
      { id: 'python', name: 'Python', role: 'Services & APIs' },
      { id: 'golang', name: 'Go', role: 'High Performance' }
    ]
  },
  {
    id: 'database',
    title: 'DATA & STORAGE',
    icon: Database,
    accentColor: '#336791',
    items: [
      { id: 'postgres', name: 'PostgreSQL', role: 'Relational Database' },
      { id: 'redis', name: 'Redis', role: 'In-Memory Cache' }
    ]
  },
  {
    id: 'cloud',
    title: 'CLOUD & INFRASTRUCTURE',
    icon: CloudLightning,
    accentColor: '#FF9900',
    items: [
      { id: 'aws', name: 'AWS', role: 'Cloud Infrastructure' },
      { id: 'docker', name: 'Docker', role: 'Containers' },
      { id: 'kubernetes', name: 'Kubernetes', role: 'Orchestration' }
    ]
  },
  {
    id: 'ai',
    title: 'AI & AUTOMATION',
    icon: BrainCircuit,
    accentColor: '#10A37F',
    items: [
      { id: 'openai', name: 'OpenAI', role: 'Language Models' },
      { id: 'gemini', name: 'Gemini', role: 'Multimodal AI' },
      { id: 'rag', name: 'RAG', role: 'Enterprise Knowledge' },
      { id: 'vectordb', name: 'Vector Databases', role: 'Semantic Retrieval' }
    ]
  },
  {
    id: 'mobile',
    title: 'MOBILE',
    icon: Smartphone,
    accentColor: '#54C5F8',
    items: [
      { id: 'flutter', name: 'Flutter', role: 'Cross-Platform' },
      { id: 'react-native', name: 'React Native', role: 'Native Performance' }
    ]
  }
];

export function TechnologyStack({ onNavigate }: TechnologyStackProps) {
  const [activeCategory, setActiveCategory] = useState<string>('frontend');

  const visibleCategories = CATEGORIES.filter(c => c.id === activeCategory);

  return (
    <section 
      id="tech-stack" 
      className="py-12 sm:py-14 lg:py-16 bg-white border-b border-slate-200/80 text-slate-900 relative overflow-hidden select-none"
    >
      {/* Background Soft Subtle Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(#326E45 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px'
          }}
        />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#326E45]/[0.025] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Section Header Lockup */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#326E45]/10 border border-[#326E45]/20 mb-3 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#326E45]" />
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#326E45]">
              TECHNOLOGY & ENGINEERING
            </span>
          </div>

          {/* Main Heading */}
          <h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-['Syne',sans-serif] font-[800] tracking-tight text-slate-900 leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Built With <span className="text-[#326E45]">Proven Technology</span>
          </h2>
        </div>

        {/* 2. 4 Strategic Technology Principles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto mb-8">
          {PRINCIPLES.map((principle, idx) => {
            const Icon = principle.icon;
            return (
              <div 
                key={idx}
                className="bg-white/85 border border-slate-200/90 rounded-xl p-3.5 sm:p-4 flex items-start gap-3 transition-all hover:bg-white hover:border-[#326E45]/40 hover:shadow-xs group shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#326E45]/10 text-[#326E45] flex items-center justify-center shrink-0 group-hover:bg-[#326E45] group-hover:text-white transition-colors duration-200">
                  <Icon size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[11.5px] sm:text-[12px] font-bold text-slate-900 tracking-tight font-mono uppercase truncate group-hover:text-[#326E45] transition-colors">
                    {principle.title}
                  </h3>
                  <p className="text-[11px] sm:text-[11.5px] text-slate-600 mt-0.5 leading-snug">
                    {principle.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Category Filter Navigation (Minimal & Elegant) */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-6 sm:mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playSound('toggle');
                setActiveCategory(cat.id);
              }}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#326E45] text-white shadow-2xs'
                  : 'bg-slate-100/90 hover:bg-slate-200/80 text-slate-600'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* 4. Technology Ecosystem Category Display */}
        <div className="max-w-4xl lg:max-w-5xl mx-auto mb-8 sm:mb-10">
          {visibleCategories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <div 
                key={category.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 transition-all duration-200 hover:border-[#326E45]/40 hover:shadow-sm flex flex-col justify-between"
              >
                {/* Chosen Category Heading Centered Up on Them */}
                <div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2.5 pb-3.5 mb-4 border-b border-slate-100 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-[#326E45]/10 text-[#326E45] flex items-center justify-center">
                        <CategoryIcon size={14} />
                      </div>
                      <span className="text-xs sm:text-sm font-mono font-bold tracking-wider text-slate-900 uppercase">
                        {category.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                      {category.items.length} TECHNOLOGIES
                    </span>
                  </div>

                  {/* Technology Items List (1 Row Multiple Columns) */}
                  <div className={`grid ${
                    category.items.length === 2
                      ? 'grid-cols-1 sm:grid-cols-2 max-w-xl'
                      : category.items.length === 3
                        ? 'grid-cols-1 sm:grid-cols-3 max-w-3xl'
                        : category.items.length === 4
                          ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl'
                          : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 max-w-5xl'
                  } gap-3 sm:gap-4 mx-auto w-full`}>
                    {category.items.map((tech) => (
                      <div 
                        key={tech.id}
                        className="flex flex-col items-center text-center p-3.5 sm:p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:border-[#326E45]/40 hover:shadow-xs transition-all duration-150 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 p-2 flex items-center justify-center shrink-0 shadow-3xs group-hover:border-[#326E45]/40 group-hover:scale-105 transition-all duration-200 mb-2.5">
                          <TechLogo id={tech.id} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight group-hover:text-[#326E45] transition-colors truncate w-full">
                          {tech.name}
                        </div>
                        <div className="text-[10.5px] sm:text-[11px] text-slate-500 font-normal truncate w-full mt-0.5">
                          {tech.role}
                        </div>

                        <span className="text-[9px] font-mono text-slate-400 group-hover:text-[#326E45] transition-colors font-medium mt-2 px-2 py-0.5 rounded bg-slate-100/90 border border-slate-200/40">
                          ENTERPRISE
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* 5. Clear, Single CTA */}
        <div className="text-center">
          <button
            onClick={() => {
              playSound('click');
              if (onNavigate) {
                onNavigate('services');
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#326E45] hover:bg-[#275736] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xs hover:shadow-md cursor-pointer group"
          >
            <span>Explore Technology Stack</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}

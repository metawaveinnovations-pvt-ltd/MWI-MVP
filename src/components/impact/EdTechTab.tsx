import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Users, 
  Zap, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Award,
  Clock,
  ExternalLink,
  Laptop,
  Check,
  Building,
  School,
  Sparkles
} from 'lucide-react';
import { playSound } from '../../utils/audio';

interface EdTechTabProps {
  onNavigate?: (sectionId: string) => void;
  onOpenModal?: (caseStudyId: string) => void;
}

export const EdTechTab: React.FC<EdTechTabProps> = ({ onNavigate, onOpenModal }) => {
  const [activeSubsystem, setActiveSubsystem] = useState<'proctoring' | 'campus' | 'telemetry'>('proctoring');

  const SUBSYSTEMS = {
    proctoring: {
      title: 'Anti-Cheat Digital Proctoring Matrix',
      badge: 'Zero Exploits Recorded',
      tagline: 'High-Integrity Online Examination',
      description: 'Browser lockdown enforcement, real-time focus tracking, and algorithmic question permutation designed to prevent unauthorized collaboration during high-stakes university and certification testing.',
      icon: ShieldCheck,
      features: [
        { title: 'Dynamic Question Shuffling', desc: 'Randomized question pools and variable numerical constants per student session.' },
        { title: 'Focus Deviation Telemetry', desc: 'Instant event logging if test-taker unfocuses the browser window or opens unauthorized tools.' },
        { title: 'Automated Instant Grading', desc: 'Sub-second grading pipeline with automated statistical curve analysis and immediate result posting.' }
      ],
      metrics: [
        { label: 'Total Exams Proctored', value: '2.4M+' },
        { label: 'Tamper Detection Latency', value: '<50ms' },
        { label: 'False Positive Rate', value: '0.001%' }
      ]
    },
    campus: {
      title: 'Multi-Branch Campus Timetabling & Fee Automation',
      badge: '14 Connected Campuses',
      tagline: 'Operational Academic Coordination',
      description: 'Automated conflict-free classroom scheduling, staff workload balancing, and multi-currency tuition fee collection with real-time banking reconciliation.',
      icon: School,
      features: [
        { title: 'Conflict-Free Timetable Solver', desc: 'Constraint-satisfaction algorithms eliminate overlapping room allocations and instructor double-booking.' },
        { title: 'Automated Tuition Invoicing', desc: 'Scheduled recurring payments with bank direct debit integration and automated late-fee calculation.' },
        { title: 'Centralized Faculty Hub', desc: 'Unified grade book, attendance recording, and syllabus milestone tracking across departments.' }
      ],
      metrics: [
        { label: 'Scheduling Conflict Rate', value: '0.00%' },
        { label: 'Fee Collection Speed', value: '+38% Faster' },
        { label: 'Branch Synchronization', value: 'Instant T+0' }
      ]
    },
    telemetry: {
      title: 'Parent & Guardian Student Telemetry Ingress',
      badge: 'Instant SMS & Push Alerts',
      tagline: 'Transparent Student Progress',
      description: 'Automated SMS delivery when attendance is recorded, periodic report card publication, and secure parent portal access with real-time academic analytics.',
      icon: Users,
      features: [
        { title: 'Immediate Absence Notifications', desc: 'Automated SMS dispatch to parent mobile devices within 60 seconds of roll-call completion.' },
        { title: 'Digital Gradebook Access', desc: 'Progressive web portal allowing guardians to review examination performance and teacher notes.' },
        { title: 'Direct Educator Messaging', desc: 'Secure communication channel between parents and academic counselors with full audit history.' }
      ],
      metrics: [
        { label: 'Alert Dispatch Latency', value: '<60 Seconds' },
        { label: 'Parent Engagement Rate', value: '94.2%' },
        { label: 'Monthly Messages Sent', value: '1.2M+' }
      ]
    }
  };

  const current = SUBSYSTEMS[activeSubsystem];
  const CurrentIcon = current.icon;

  return (
    <div className="space-y-12 animate-fade-in text-slate-900">
      {/* 1. EDITORIAL EDTECH HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-50/90 via-white to-emerald-50/25 border border-slate-200/80 p-6 sm:p-10 lg:p-12">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/[0.04] rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#326E45]" />
                Academic Platforms & Examination Networks
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-xs font-medium text-[#326E45]">
                85,000+ Enrolled Students
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-slate-900 leading-[1.12]">
              Academic platforms built for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#326E45] via-teal-700 to-emerald-700">
                high concurrency and examination trust.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              Empowering academies and educational institutions with scalable LMS backbones, anti-cheat proctoring matrices, and automated student progress analytics.
            </p>

            {/* Academic Highlights Ledger */}
            <div className="pt-2 flex flex-wrap items-center gap-6 sm:gap-8 border-t border-slate-200/70 text-slate-700">
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-display text-slate-900 block">85,000+</span>
                <span className="text-xs font-medium text-slate-500">Active Students</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-display text-[#326E45] block">2.4M+</span>
                <span className="text-xs font-medium text-slate-500">Proctored Exams</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-display text-teal-700 block">&lt;200ms</span>
                <span className="text-xs font-medium text-slate-500">Answer Ingress Latency</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100 group aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80" 
                alt="Institutional EdTech & Academic LMS" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-medium text-white self-start mb-2">
                  <ShieldCheck size={13} className="text-emerald-300" />
                  <span>Zero-Exploit Proctoring Engine</span>
                </div>
                <p className="text-xs text-white/90 font-normal leading-relaxed">
                  Verified against 10,000 concurrent candidate submissions with zero message queue dropouts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE ARCHITECTURAL SUBSYSTEM EXPLORER */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#326E45] uppercase tracking-wider">
              Educational Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              Core Platform Subsystems Breakdown
            </h2>
          </div>

          {/* Switcher Buttons */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 self-start sm:self-auto">
            <button
              onClick={() => {
                playSound('click');
                setActiveSubsystem('proctoring');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeSubsystem === 'proctoring'
                  ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Proctoring Matrix
            </button>
            <button
              onClick={() => {
                playSound('click');
                setActiveSubsystem('campus');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeSubsystem === 'campus'
                  ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Campus Hub
            </button>
            <button
              onClick={() => {
                playSound('click');
                setActiveSubsystem('telemetry');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeSubsystem === 'telemetry'
                  ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Parent Telemetry
            </button>
          </div>
        </div>

        {/* Selected Subsystem Detail Spread (LIGHT & BRIGHT - NO DARK BOXES) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/70 text-[#326E45] text-xs font-semibold">
                  {current.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">• {current.tagline}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                {current.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {current.description}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {current.features.map((feat, fIdx) => (
                <div key={fIdx} className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/60 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-emerald-100 text-[#326E45] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={13} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900">{feat.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-0.5 font-normal">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Verified Benchmarks Card (Light & Bright Corporate Card) */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-mono font-bold text-[#326E45] uppercase tracking-wider">
                Audited Performance
              </span>
              <CurrentIcon size={18} className="text-[#326E45]" />
            </div>

            <div className="space-y-3">
              {current.metrics.map((met, mIdx) => (
                <div key={mIdx} className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-medium">{met.label}</span>
                  <span className="text-base font-bold font-display text-[#326E45]">{met.value}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 text-xs text-slate-600 space-y-1">
              <span className="font-semibold text-slate-800 block">Stress Testing Baseline</span>
              <p className="text-[11.5px] leading-relaxed">
                Tested against simulated spikes of 10,000 concurrent students submitting proctored answers with zero packet drops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CASE STUDY: COMPREHENSIVE LMS */}
      <section className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#326E45] uppercase tracking-wider">
              Featured Case Study
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              Education Management System & Comprehensive LMS
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-xs font-semibold text-[#326E45] self-start sm:self-auto">
            Live Production
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 aspect-[16/11] bg-slate-100 relative group shadow-2xs">
            <img 
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80" 
              alt="Education Management System" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-medium text-white px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-sm border border-white/20">
                85,000+ STUDENTS • ZERO-DELAY EXAMINATION ENGINE
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900">
                End-to-End Academic Timetabling, Testing Portals & Automated Parent Alerts
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Engineered an institutional-grade education management platform serving multi-branch academies. Unified student enrollment records, fee collections, conflict-free timetable scheduling, anti-cheat proctored examination modules, and instant attendance alerts for guardians.
              </p>
            </div>

            {/* Outcome Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-center">
                <span className="text-[10px] font-mono font-semibold text-slate-400 block uppercase">Student Scale</span>
                <span className="text-xl sm:text-2xl font-bold font-display text-[#326E45]">85,000+</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-center">
                <span className="text-[10px] font-mono font-semibold text-slate-400 block uppercase">Grading Latency</span>
                <span className="text-xl sm:text-2xl font-bold font-display text-[#326E45]">0s Delay</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-center">
                <span className="text-[10px] font-mono font-semibold text-slate-400 block uppercase">Exam Integrity</span>
                <span className="text-xl sm:text-2xl font-bold font-display text-teal-700">0 Exploits</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-3">
              {onOpenModal && (
                <button
                  onClick={() => {
                    playSound('click');
                    onOpenModal('education-management-system');
                  }}
                  className="px-5 py-2.5 bg-[#326E45] hover:bg-[#285737] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <span>View Complete Case Study</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

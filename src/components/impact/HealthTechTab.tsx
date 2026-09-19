import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  ShieldCheck, 
  Activity, 
  Lock, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  Clock,
  Database,
  Building,
  FileCheck,
  Bell,
  Stethoscope,
  Sparkles
} from 'lucide-react';
import { playSound } from '../../utils/audio';

interface HealthTechTabProps {
  onNavigate?: (sectionId: string) => void;
  onOpenModal?: (caseStudyId: string) => void;
}

export const HealthTechTab: React.FC<HealthTechTabProps> = ({ onNavigate, onOpenModal }) => {
  const [activeClinicalTab, setActiveClinicalTab] = useState<'privacy' | 'telemetry' | 'interop'>('privacy');

  const CLINICAL_PILLARS = {
    privacy: {
      title: 'Zero-Knowledge Resident Privacy & AES-256 Encryption',
      tagline: 'Patient Confidentiality Standards',
      desc: 'Resident medical records, daily care notes, and medication plans are encrypted end-to-end with granular role-based access control, preventing unauthorized exposure across staff shifts.',
      points: [
        'Granular role-based staff permissions (Carer, Senior Nurse, Manager)',
        'Full immutable audit log for every record view or edit',
        'Cryptographic separation of sensitive medical notes'
      ],
      badge: 'Zero Data Breach Record'
    },
    telemetry: {
      title: 'Real-Time Nurse Call Triage & Alert Escalation',
      tagline: 'Rapid Emergency Response',
      desc: 'Bedside call bells, motion sensors, and critical vital deviations trigger sub-second multi-channel notifications directly to assigned on-duty nurse handheld devices.',
      points: [
        'Average push alert delivery under 300 milliseconds',
        'Automated escalation to on-call supervisor if unacknowledged in 90 seconds',
        'Continuous offline fallback with local cache synchronization'
      ],
      badge: '<300ms Alert Dispatch'
    },
    interop: {
      title: 'Standardized Healthcare Interoperability',
      tagline: 'Connected Care Networks',
      desc: 'Structured clinical schemas enable seamless, secure data interchange with NHS hospital trusts, primary care general practitioners, and laboratory services.',
      points: [
        'Support for standardized clinical schemas and eMAR protocols',
        'Secure external GP handover and discharge summary processing',
        'Automated pharmacy prescription ordering integration'
      ],
      badge: 'NHS Care Portal Integration'
    }
  };

  const currentPillar = CLINICAL_PILLARS[activeClinicalTab];

  return (
    <div className="space-y-12 animate-fade-in text-slate-900">
      {/* 1. EDITORIAL HEALTHTECH HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-50/90 via-white to-emerald-50/25 border border-slate-200/80 p-6 sm:p-10 lg:p-12">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-emerald-500/[0.04] rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#326E45]" />
                Clinical HealthTech & Care EHR
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-xs font-medium text-[#326E45]">
                NHS DSPT & HIPAA Attested
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-slate-900 leading-[1.12]">
              Clinical care platforms with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#326E45] via-teal-700 to-emerald-700">
                zero margin for error.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              From UK residential care home portals to high-concurrency electronic health record systems, we engineer resilient clinical software designed for patient safety and regulatory peace of mind.
            </p>

            {/* Clinical Highlights Band */}
            <div className="pt-2 flex flex-wrap items-center gap-6 sm:gap-8 border-t border-slate-200/70 text-slate-700">
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-display text-slate-900 block">2.5M+</span>
                <span className="text-xs font-medium text-slate-500">Secured Patient Records</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-display text-[#326E45] block">100%</span>
                <span className="text-xs font-medium text-slate-500">Medication Accuracy</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-display text-teal-700 block">&lt;300ms</span>
                <span className="text-xs font-medium text-slate-500">Emergency Alert Triage</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100 group aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&auto=format&fit=crop&q=80" 
                alt="Clinical Digital Healthcare Systems" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-medium text-white self-start mb-2">
                  <Heart size={13} className="text-emerald-300" />
                  <span>Residential Care & Ward Operations</span>
                </div>
                <p className="text-xs text-white/90 font-normal leading-relaxed">
                  Trusted across 42 UK residential care homes for daily shift handovers and medical charting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CLINICAL ARCHITECTURE & PATIENT SAFETY FRAMEWORK */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#326E45] uppercase tracking-wider">
              Care Quality Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              Clinical Architecture & Operational Safety
            </h2>
          </div>

          {/* Interactive Switcher */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 self-start sm:self-auto">
            <button
              onClick={() => {
                playSound('click');
                setActiveClinicalTab('privacy');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeClinicalTab === 'privacy'
                  ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Data Privacy
            </button>
            <button
              onClick={() => {
                playSound('click');
                setActiveClinicalTab('telemetry');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeClinicalTab === 'telemetry'
                  ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Nurse Call Alerts
            </button>
            <button
              onClick={() => {
                playSound('click');
                setActiveClinicalTab('interop');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeClinicalTab === 'interop'
                  ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Interoperability
            </button>
          </div>
        </div>

        {/* Dynamic Detail Card + Ward Station Monitor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Pillar Detail */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/70 text-[#326E45] text-xs font-semibold">
                  {currentPillar.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">• {currentPillar.tagline}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                {currentPillar.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {currentPillar.desc}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {currentPillar.points.map((pt, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/60 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-emerald-100 text-[#326E45] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={13} />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {pt}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Live Clinical Ward Status Board (Light & Bright) */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wide">
                  Clinical Care Station
                </span>
              </div>
              <span className="text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-md">
                Active Ward Sync
              </span>
            </div>

            {/* Operational Indicators */}
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Resident Bed Telemetry</span>
                  <span className="font-bold text-slate-900">500+ Active Beds</span>
                </div>
                <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#326E45] h-full rounded-full w-full" />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Capacity: 100% Online</span>
                  <span>Zero Packet Loss</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">eMAR Medication Administration</span>
                  <span className="font-bold text-[#326E45]">100% Verification</span>
                </div>
                <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full w-full" />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Zero Dispense Errors</span>
                  <span>Barcode Scanned</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Emergency Call Escalation</span>
                  <span className="font-bold text-teal-700">280ms Average</span>
                </div>
                <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full w-[94%]" />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Target: &lt;500ms</span>
                  <span>Push Delivery</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 text-xs text-slate-600 space-y-1">
              <span className="font-semibold text-slate-800 block">Offline Continuity Guarantee</span>
              <p className="text-[11.5px] leading-relaxed">
                Carers retain full access to chart notes and medication schedules even during intermittent building Wi-Fi outages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CASE STUDY: PRO CARE HOMES UK */}
      <section className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#326E45] uppercase tracking-wider">
              Featured Case Study
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              Pro Care Homes UK Healthcare Web Portal
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-xs font-semibold text-[#326E45] self-start sm:self-auto">
            Live Production
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 aspect-[16/11] bg-slate-100 relative group shadow-2xs">
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80" 
              alt="Pro Care Homes UK" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-medium text-white px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-sm border border-white/20">
                PRO CARE HOMES UK • 100% REGULATORY AUDITED
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900">
                Automating Resident Care Records & Medical Shift Compliance
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Engineered a comprehensive care management web application for UK residential care facilities. Unified patient care logs, medication administration records (eMAR), staff rota scheduling, and emergency triage alerts into a single zero-latency platform.
              </p>
            </div>

            {/* Outcome Metric Cards */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-center">
                <span className="text-[10px] font-mono font-semibold text-slate-400 block uppercase">Admin Time Saved</span>
                <span className="text-xl sm:text-2xl font-bold font-display text-[#326E45]">35h/Wk</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-center">
                <span className="text-[10px] font-mono font-semibold text-slate-400 block uppercase">Medication Audit</span>
                <span className="text-xl sm:text-2xl font-bold font-display text-[#326E45]">100%</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-center">
                <span className="text-[10px] font-mono font-semibold text-slate-400 block uppercase">Uptime SLA</span>
                <span className="text-xl sm:text-2xl font-bold font-display text-teal-700">99.99%</span>
              </div>
            </div>

            {/* Action Triggers */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              {onOpenModal && (
                <button
                  onClick={() => {
                    playSound('click');
                    onOpenModal('pro-care-homes-uk');
                  }}
                  className="px-5 py-2.5 bg-[#326E45] hover:bg-[#285737] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <span>View Complete Case Study</span>
                  <ArrowRight size={14} />
                </button>
              )}
              <a
                href="https://procarehomes.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <span>Live Portal</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HEALTHCARE REGULATORY STANDARDS STRIP */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'NHS DSPT Standard', subtitle: 'Exceeds UK healthcare security criteria', icon: ShieldCheck },
          { title: 'HIPAA Compliant', subtitle: 'Encrypted at rest & in transit (AES-256)', icon: Lock },
          { title: 'ISO 27001 Readiness', subtitle: 'Continuous threat monitoring & audit trails', icon: FileCheck },
          { title: 'GDPR Article 9', subtitle: 'Special category medical data safeguards', icon: CheckCircle2 }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-2 hover:border-[#326E45]/40 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#326E45] flex items-center justify-center border border-emerald-100/60">
                <Icon size={16} />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-display">
                {item.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed font-normal">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

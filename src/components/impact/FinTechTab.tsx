import React from 'react';
import { 
  DollarSign, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  Scale,
  FileCheck,
  TrendingUp,
  Database,
  Layers,
  Sparkles
} from 'lucide-react';
import { playSound } from '../../utils/audio';

interface FinTechTabProps {
  onNavigate?: (sectionId: string) => void;
  onOpenModal?: (caseStudyId: string) => void;
}

export const FinTechTab: React.FC<FinTechTabProps> = ({ onNavigate, onOpenModal }) => {
  return (
    <div className="space-y-12 animate-fade-in text-slate-900">
      {/* 1. EDITORIAL FINTECH HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-50/90 via-white to-emerald-50/25 border border-slate-200/80 p-6 sm:p-10 lg:p-12">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/[0.04] rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#326E45]" />
                Institutional FinTech & PropTech
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-xs font-medium text-[#326E45]">
                $12B+ Asset Valuation Pipeline
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-slate-900 leading-[1.12]">
              High-security financial backbones and{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#326E45] via-teal-700 to-emerald-700">
                commercial asset platforms.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              Engineered for multi-billion commercial property portfolios, microsecond transaction reconciliation, PCI-DSS Level 1 compliance, and automated multi-tenant escrow settlement.
            </p>

            {/* Financial Ledger Highlights */}
            <div className="pt-2 flex flex-wrap items-center gap-6 sm:gap-8 border-t border-slate-200/70 text-slate-700">
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-display text-slate-900 block">$12B+</span>
                <span className="text-xs font-medium text-slate-500">Managed Portfolio Assets</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-display text-[#326E45] block">&lt;15ms</span>
                <span className="text-xs font-medium text-slate-500">Transaction Finality</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-display text-teal-700 block">100%</span>
                <span className="text-xs font-medium text-slate-500">Ledger Balance Integrity</span>
              </div>
            </div>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100 group aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&auto=format&fit=crop&q=80" 
                alt="Institutional FinTech and PropTech Platforms" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-medium text-white self-start mb-2">
                  <ShieldCheck size={13} className="text-emerald-300" />
                  <span>PCI-DSS Level 1 Hardware Tokenized</span>
                </div>
                <p className="text-xs text-white/90 font-normal leading-relaxed">
                  Real-time multi-tenant rent splits and automated escrow disbursement with zero discrepancies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DUAL FINANCIAL ENGINEERING PILLARS */}
      <section className="space-y-6">
        <div className="space-y-1 border-b border-slate-200 pb-4">
          <span className="text-xs font-mono font-bold text-[#326E45] uppercase tracking-wider">
            Commercial Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
            Core Financial Engine & Enterprise PropTech
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Pillar 1: Double-Entry Ledger & Multi-Party Escrow */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#326E45] flex items-center justify-center border border-emerald-100">
                    <Database size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-900">
                      Idempotent Double-Entry Ledger
                    </h3>
                    <span className="text-xs font-medium text-[#326E45]">
                      ACID Balance Guarantee
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/70">
                  Zero Drift
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Eliminates double-spend vulnerabilities and reconciliation anomalies through strict database serialization, cryptographic balance verification, and immutable transaction journals.
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between text-xs">
                  <span className="text-slate-700 font-medium">Automated Multi-Tenant Rent Split</span>
                  <span className="font-semibold text-slate-900">Instant T+0</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between text-xs">
                  <span className="text-slate-700 font-medium">Key Vault Cryptographic Storage</span>
                  <span className="font-semibold text-[#326E45]">Zero-Knowledge</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between text-xs">
                  <span className="text-slate-700 font-medium">Anti-Fraud Transaction Scoring</span>
                  <span className="font-semibold text-slate-900">&lt;10ms Audit</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium text-emerald-800">
                <CheckCircle2 size={13} className="text-[#326E45]" />
                Automated financial statement generation
              </span>
              <span className="font-medium text-slate-500">PostgreSQL • Stripe • Adyen</span>
            </div>
          </div>

          {/* Pillar 2: ProStatesLtd Flagship PropTech Platform Spotlight */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#326E45] flex items-center justify-center border border-emerald-100">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-900">
                      ProStatesLtd Enterprise PropTech
                    </h3>
                    <span className="text-xs font-medium text-[#326E45]">
                      Flagship Commercial Deployment
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/70">
                  Live SaaS
                </span>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[16/8] bg-slate-100 relative group shadow-2xs">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80" 
                  alt="ProStatesLtd Real Estate Platform" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-medium text-white px-2.5 py-0.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20">
                    $12B+ COMMERCIAL ASSETS • T+0 SETTLEMENT
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Commercial property valuation, rent reconciliation, and tenant portal. Reduced arrears by 42% while automating legal lease agreements and maintenance ticketing.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {onOpenModal && (
                  <button
                    onClick={() => {
                      playSound('click');
                      onOpenModal('prostatesltd-real-estate');
                    }}
                    className="px-4 py-2 bg-[#326E45] hover:bg-[#285737] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <span>Examine Architecture</span>
                    <ArrowRight size={13} />
                  </button>
                )}
                <a
                  href="https://prostatesltd.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <span>Live Portal</span>
                  <ExternalLink size={13} />
                </a>
              </div>
              <span className="text-xs font-bold text-[#326E45] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                -42% Arrears Reduced
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. REGULATORY COMPLIANCE & CAPITAL ASSURANCE */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#326E45] uppercase tracking-wider">
            Risk & Governance
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
            Institutional Safeguards & Audit Readiness
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-3 hover:border-[#326E45]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#326E45] flex items-center justify-center border border-emerald-100">
              <Scale size={18} />
            </div>
            <h3 className="text-base font-bold font-display text-slate-900">
              AML & Sanctions Screening
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Automated screening against global OFAC and PEP sanctions lists prior to transaction execution and bank disbursement.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-3 hover:border-[#326E45]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#326E45] flex items-center justify-center border border-emerald-100">
              <Lock size={18} />
            </div>
            <h3 className="text-base font-bold font-display text-slate-900">
              Multi-Tenant Data Isolation
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Row-level security policies guarantee complete cryptographic separation between different enterprise customer portfolios.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-3 hover:border-[#326E45]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#326E45] flex items-center justify-center border border-emerald-100">
              <FileCheck size={18} />
            </div>
            <h3 className="text-base font-bold font-display text-slate-900">
              Immutable Audit Logs
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Every balance modification generates an append-only event hash ensuring full audit readiness for corporate filings and regulatory reviews.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

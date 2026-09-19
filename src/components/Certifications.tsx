import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, FileText, CheckCircle, Scale, Lock, ExternalLink, Link, AlertCircle, HelpCircle, HardDrive, Cpu, ChevronRight, CheckCircle2 } from 'lucide-react';

export function Certifications() {
  const [activeGovernanceMenu, setActiveGovernanceMenu] = useState<string>('secp');

  const complianceSections = [
    {
      id: 'secp',
      title: 'SECP Registration',
      subtitle: 'CORPORATE IDENTIFICATION',
      tag: 'SECP VETTED & ACTIVE',
      desc: 'MetaWave Innovations (Private) Limited is a fully registered private limited entity under the Securities and Exchange Commission of Pakistan (SECP). We operate in strict compliance with all administrative and corporate directives.',
      provisions: [
        'Registered body status, operating with complete corporate standing',
        'Official memorandum and articles of association on file',
        'Corporate verification available upon formal onboarding request',
        'Transparent shareholding structure satisfying international standards'
      ],
      legalRef: 'SECP Filing Status: Vetted & Active'
    },
    {
      id: 'compliance',
      title: 'Companies Act 2017 Compliance',
      subtitle: 'REGULATORY FRAMEWORK',
      tag: 'COMPANIES ACT 2017',
      desc: 'We satisfy all obligations outlined in the Companies Act 2017, conducting routine executive audit tracking and filing quarterly financial balances with the appropriate administrative bureaus.',
      provisions: [
        'Annual general meetings (AGM) held in accordance with legal timelines',
        'Strict statutory register maintenance and record tracking',
        'Corporate directors adhere to duty of care and ethical code',
        'Corporate documents available during onboarding and due diligence'
      ],
      legalRef: 'Companies Act 2017: Fully Compliant'
    },
    {
      id: 'tax',
      title: 'Tax Compliance & Filings',
      subtitle: 'FISCAL STANDING',
      tag: 'FBR TAX REGISTERED',
      desc: 'We maintain impeccable standing with state revenue authorities, including the Federal Board of Revenue (FBR) and regional revenue bodies, operating in full compliance with all relevant tax directives.',
      provisions: [
        'Active corporate taxpayer status with verified filings',
        'Strict compliance with sales tax rules on consulting service outputs',
        'Quarterly FBR withholding returns processed on schedule',
        'Corporate tax documents available for audit during partner onboard'
      ],
      legalRef: 'Tax Filings: Current & Disclosed'
    },
    {
      id: 'gdpr',
      title: 'Client Confidentiality & NDA',
      subtitle: 'ZERO-TRUST PARADIGM',
      tag: 'GDPR & IP SOVEREIGN',
      desc: 'Our client relations operate under absolute NDA protections. We incorporate GDPR frameworks and PCI-DSS compliance models as our standard data protection code of conduct.',
      provisions: [
        'Legally-binding intellectual property (IP) assignment contracts',
        'Secure multi-region air-gapping for sensitive codebase access',
        'Strict GDPR user right-to-be-forgotten software pipelines',
        'Complete confidentiality protocols for all corporate transactions'
      ],
      legalRef: 'Data Status: Zero-Leak Policy'
    },
    {
      id: 'qa',
      title: 'QA Framework & Risk Control',
      subtitle: 'SYSTEM RECOVERIES',
      tag: '99.99% PASS GUARANTEE',
      desc: 'Quality is a governance matter. Our standardized QA practices protect against deployment errors, while our complete Business Continuity models keep operations safe.',
      provisions: [
        'Mandatory ESLint, static types, and automated unit testing steps',
        'Disaster recovery plans with hot-swapping backups',
        'Strategic risk assessments matching corporate liability parameters',
        'Continuous performance and speed stress check milestones'
      ],
      legalRef: 'QA Audit: 99.99% Build Pass Guarantee'
    }
  ];

  const activeSec = complianceSections.find(s => s.id === activeGovernanceMenu) || complianceSections[0];

  return (
    <section id="certifications-compliance" className="py-20 sm:py-24 bg-[#FAFCFB] border-b border-slate-200/80 relative overflow-hidden text-left">
      {/* Background Visual Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-[#326E45] shadow-2xs">
            <Scale size={13} className="text-[#326E45]" />
            <span className="text-[11px] font-semibold tracking-widest uppercase">
              INSTITUTIONAL TRUST & COMPLIANCE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-slate-900 leading-tight">
            Corporate Compliance & Governance
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
            MetaWave Innovations is built on institutional trust. We operate under rigid legal frameworks, active SECP registration, clear tax policies, and bulletproof confidentiality agreements.
          </p>
        </div>

        {/* Security Alert & Non-Disclosure Protocol Banner */}
        <div className="mb-12 max-w-5xl mx-auto p-5 bg-slate-900 border border-slate-800 text-white rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
              <Shield size={20} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-display text-white">Security & Confidentiality Protocol Compliance</span>
                <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded uppercase">
                  VERIFIED DISCLOSURE
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal max-w-3xl">
                In strict adherence to international safety policies and privacy standards, <strong className="text-white font-semibold">we never publish sensitive documents, registration serials, tax IDs, or private records online.</strong> Full registration archives and legal verifications are readily shared with authorized partners during onboard reviews and due diligence assessments.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Governance Tab Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto mb-16">
          
          {/* Left Column Menu Selector */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="text-[10px] font-mono font-bold text-slate-400 tracking-widest pl-1 uppercase mb-2">
              GOVERNANCE DIRECTORY
            </div>
            {complianceSections.map((sec) => {
              const isActive = activeGovernanceMenu === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveGovernanceMenu(sec.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-white border-[#326E45] shadow-md ring-1 ring-[#326E45]/20'
                      : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      isActive ? 'bg-emerald-50 text-[#326E45]' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <FileText size={16} />
                    </div>
                    <div>
                      <h3 className={`text-xs font-bold font-display ${
                        isActive ? 'text-slate-900' : 'text-slate-700'
                      }`}>
                        {sec.title}
                      </h3>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                        {sec.tag}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={14} className={isActive ? 'text-[#326E45]' : 'text-slate-300'} />
                </button>
              );
            })}
          </div>

          {/* Right Column Active Panel Display */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGovernanceMenu}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
              >
                
                {/* Panel Title & Header */}
                <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#326E45] uppercase">
                      {activeSec.subtitle}
                    </span>
                    <h3 className="text-xl font-display font-black text-slate-900">
                      {activeSec.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase self-start sm:self-auto">
                    {activeSec.tag}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {activeSec.desc}
                </p>

                {/* Provision List Checklist */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase block">
                    STATUTORY CONSTRAINTS & COMPLIANCE CLAUSES:
                  </span>
                  
                  <div className="grid grid-cols-1 gap-2.5">
                    {activeSec.provisions.map((provision, pIdx) => (
                      <div key={pIdx} className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-800">
                        <span className="w-4 h-4 rounded-full bg-emerald-100 text-[#326E45] shrink-0 flex items-center justify-center mt-0.5">
                          <CheckCircle2 size={12} strokeWidth={2.5} />
                        </span>
                        <span className="font-medium leading-relaxed">{provision}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Regulatory Status Footer */}
                <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px]">
                  <div className="flex items-center gap-2">
                    <Lock size={12} className="text-emerald-400" />
                    <span className="text-slate-400 font-medium">STATUS REFERENCE:</span>
                    <span className="text-white font-bold">{activeSec.legalRef}</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>AUDITED & SECURE</span>
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Verification Portals Call To Action Card */}
        <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 max-w-md">
            <h4 className="text-base font-display font-black text-slate-900 flex items-center gap-2">
              <Link size={16} className="text-[#326E45]" />
              <span>Official Government Portal Verifications</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Our legal structures are completely auditable. You can verify our active status directly on the national electronic services portals under the Companies Act guidelines.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <a 
              href="https://eservices.secp.gov.pk/eServices/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-2xs active:scale-95 duration-200"
            >
              <span>SECP eServices Portal</span>
              <ExternalLink size={12} className="text-emerald-400" />
            </a>

            <a 
              href="https://irservices.fbr.gov.pk/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-2xs active:scale-95 duration-200"
            >
              <span>FBR Tax Portal</span>
              <ExternalLink size={12} className="text-emerald-400" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

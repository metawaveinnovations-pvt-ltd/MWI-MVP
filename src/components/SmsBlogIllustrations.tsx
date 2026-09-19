import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  CreditCard, 
  GraduationCap, 
  BarChart3, 
  Clock, 
  ShieldCheck, 
  Smartphone, 
  Bell, 
  FileText, 
  Sparkles, 
  TrendingUp,
  Cpu,
  ArrowRight,
  Database,
  Lock,
  Activity
} from 'lucide-react';

// 1. Hero School Management System Dashboard Vector Illustration
export function SmsHeroIllustration() {
  return (
    <div className="w-full bg-[#0F172A] rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-800 shadow-2xl text-left relative overflow-hidden select-none font-sans">
      {/* Background ambient glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

      {/* Top Window Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono font-bold text-slate-400 pl-2 border-l border-slate-800">
            MetaWave SMS Cloud Engine v4.2 • Live Portal
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            INSTITUTION ONLINE
          </span>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 relative z-10">
        
        {/* Metric Cards (Left / Top) */}
        <div className="md:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
              <span>Total Students</span>
              <Users size={14} className="text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">2,850</div>
            <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp size={10} /> +12% this academic year
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
              <span>Attendance Rate</span>
              <CheckCircle2 size={14} className="text-teal-400" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">98.4%</div>
            <div className="text-[10px] font-mono text-teal-400 flex items-center gap-1 mt-1">
              <Activity size={10} /> Biometric Verified
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
              <span>Fee Collection</span>
              <CreditCard size={14} className="text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">$184.2K</div>
            <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-1">
              <CheckCircle2 size={10} /> 99.2% reconciled
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
              <span>Active Staff</span>
              <GraduationCap size={14} className="text-purple-400" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">142</div>
            <div className="text-[10px] font-mono text-purple-400 flex items-center gap-1 mt-1">
              <Sparkles size={10} /> 100% portal adoption
            </div>
          </div>
        </div>

        {/* Central Analytics Mockup Chart */}
        <div className="md:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-xs font-bold text-slate-200">Tuition Recovery & Attendance Correlation</h4>
              <p className="text-[10px] text-slate-400">Real-time academic telemetry across 12 departments</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              AI Powered Analytics
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-32 flex items-end justify-between gap-2 pt-2 px-2">
            {[
              { month: 'Jan', fee: '85%', att: '96%' },
              { month: 'Feb', fee: '88%', att: '97%' },
              { month: 'Mar', fee: '92%', att: '98%' },
              { month: 'Apr', fee: '95%', att: '95%' },
              { month: 'May', fee: '91%', att: '99%' },
              { month: 'Jun', fee: '98%', att: '98.4%' },
            ].map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1 h-24">
                  <div 
                    style={{ height: item.fee }} 
                    className="w-1/2 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm transition-all group-hover:brightness-125" 
                  />
                  <div 
                    style={{ height: item.att }} 
                    className="w-1/2 bg-gradient-to-t from-teal-700 to-teal-500 rounded-t-sm transition-all group-hover:brightness-125" 
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-400">{item.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Tuition Collection Rate
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-teal-500" /> Biometric Attendance
              </span>
            </div>
            <span className="text-slate-500">Updated 2m ago</span>
          </div>
        </div>

        {/* Live Event Stream Sidebar */}
        <div className="md:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Bell size={12} className="text-amber-400" /> Live Feed
            </span>
            <span className="text-[9px] font-mono text-slate-500">Real-time</span>
          </div>

          <div className="space-y-2.5 text-left text-[11px]">
            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-start gap-2">
              <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-200 font-semibold leading-tight">Gradebook Published</p>
                <p className="text-[10px] text-slate-400">Grade 10 Physics • 142 Parents Notified</p>
              </div>
            </div>

            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-start gap-2">
              <CreditCard size={13} className="text-teal-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-200 font-semibold leading-tight">1LINK Payment Cleared</p>
                <p className="text-[10px] text-slate-400">Student ID #4092 • Fee Voucher #9812</p>
              </div>
            </div>

            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-start gap-2">
              <Smartphone size={13} className="text-purple-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-200 font-semibold leading-tight">Parent Portal Sync</p>
                <p className="text-[10px] text-slate-400">98.2% mobile active on iOS & Android</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// 2. Attendance & Biometric Workflow Diagram
export function AttendanceWorkflowIllustration() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 text-left my-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="text-emerald-700" size={18} />
          <h4 className="text-sm font-bold text-slate-900">Biometric & QR Attendance Verification Pipeline</h4>
        </div>
        <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">
          Zero-Lag Automated Loop
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs flex flex-col items-center justify-between space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <p className="text-xs font-bold text-slate-800">Scan at Gate</p>
          <p className="text-[10.5px] text-slate-500 leading-tight">Biometric turnstile or mobile QR badge scan</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs flex flex-col items-center justify-between space-y-2">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <p className="text-xs font-bold text-slate-800">Cloud Authentication</p>
          <p className="text-[10.5px] text-slate-500 leading-tight">Encrypted validation via MetaWave Edge Proxy (&lt;50ms)</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs flex flex-col items-center justify-between space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <p className="text-xs font-bold text-slate-800">Instant Parent SMS</p>
          <p className="text-[10.5px] text-slate-500 leading-tight">Automated SMS & push alert sent to family app</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs flex flex-col items-center justify-between space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm">
            4
          </div>
          <p className="text-xs font-bold text-slate-800">Teacher Sync</p>
          <p className="text-[10.5px] text-slate-500 leading-tight">Classroom register automatically populated</p>
        </div>
      </div>
    </div>
  );
}

// 3. Financial Reconciliation Diagram
export function FinancialWorkflowIllustration() {
  return (
    <div className="w-full bg-emerald-900/90 text-white rounded-2xl p-5 sm:p-6 text-left my-6 border border-emerald-800 shadow-lg space-y-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between border-b border-emerald-800 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <CreditCard size={18} className="text-emerald-400" />
          <h4 className="text-sm font-bold text-white">Automated Tuition Reconciliation Architecture</h4>
        </div>
        <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 px-2 py-0.5 rounded">
          Bank & Gateway Connected
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10 text-xs">
        <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-xl p-4 space-y-1.5">
          <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Phase 1: Digital Vouchers</div>
          <div className="font-bold text-white">Automated Fee Generation</div>
          <p className="text-emerald-200/80 text-[11px] leading-relaxed">
            System generates QR-coded vouchers per student with itemized tuition, transport, and lab fees.
          </p>
        </div>

        <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-xl p-4 space-y-1.5">
          <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Phase 2: Multi-Channel Pay</div>
          <div className="font-bold text-white">1LINK / Cards / JazzCash</div>
          <p className="text-emerald-200/80 text-[11px] leading-relaxed">
            Parents pay seamlessly via online banking, mobile wallets, credit cards, or over-the-counter OTC.
          </p>
        </div>

        <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-xl p-4 space-y-1.5">
          <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Phase 3: Zero-Touch Ledger</div>
          <div className="font-bold text-white">Instant Ledger Reconciliation</div>
          <p className="text-emerald-200/80 text-[11px] leading-relaxed">
            Bank webhook instantly updates student balance, marks voucher paid, and emails tax receipt.
          </p>
        </div>
      </div>
    </div>
  );
}

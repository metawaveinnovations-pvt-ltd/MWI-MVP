import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MetaWaveLogo from './MetaWaveLogo';
import { 
  Sparkles, 
  Mail, 
  Linkedin, 
  Copy, 
  Check, 
  Globe, 
  Users2, 
  ShieldCheck, 
  Cpu, 
  Compass, 
  PhoneCall, 
  Users, 
  ArrowRight,
  ExternalLink,
  BookOpen,
  Briefcase,
  Award,
  X
} from 'lucide-react';
import { LucideIcon } from './LucideIcon';

interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  desc: string;
}

interface ExpertiseItem {
  subject: string;
  score: number;
}

interface TeamMember {
  name: string;
  initials: string;
  roles: string[];
  email: string;
  badge: string;
  focus: string;
  color: string;
  bgGradient: string;
  tagline: string;
  skills: string[];
  bio: string;
  expertise: ExpertiseItem[];
  experience: ExperienceItem[];
  education: string;
  linkedin: string;
  cvUrl?: string;
  portfolioUrl?: string;
}

const ecosystemNodes = [
  {
    title: "Global Technology Network",
    short: "Global Network",
    icon: "Globe",
    tagline: "Borderless technical reach, local compliance.",
    desc: "Deploy highly optimized specialized clusters across EMEA, APAC, and North America. Ensure absolute timezone alignment and seamless local data sovereignty under strict SLA frameworks.",
    nodesCount: "120+ Active Nodes",
    leadTime: "Instant Provisioning",
    metrics: [
      { label: "Active Hubs", value: "24" },
      { label: "Connections", value: "3,500+" },
      { label: "Compliance SLA", value: "99.98%" }
    ],
    coordinates: [
      { cx: "25%", cy: "35%", label: "EMEA Region" },
      { cx: "75%", cy: "40%", label: "APAC Core" },
      { cx: "45%", cy: "70%", label: "LATAM Node" }
    ]
  },
  {
    title: "AI & Automation Specialists",
    short: "AI & Automation",
    icon: "Sparkles",
    tagline: "Intelligent pipelines & modern cognitive reasoning.",
    desc: "Leverage advanced custom integrations with Gemini, OpenAI, and Claude AI. Fine-tuned agent workflows and high-performance vector databases engineered directly into your enterprise stack.",
    nodesCount: "80+ Specialized Models",
    leadTime: "Rapid Deployment",
    metrics: [
      { label: "LLM Pipelines", value: "150+" },
      { label: "Accuracy Rate", value: "99.4%" },
      { label: "Latency Target", value: "<150ms" }
    ],
    coordinates: [
      { cx: "50%", cy: "45%", label: "Cognitive Router" },
      { cx: "30%", cy: "60%", label: "Vector Pipeline" },
      { cx: "70%", cy: "30%", label: "Model Weights" }
    ]
  },
  {
    title: "Digital Innovation Experts",
    short: "Digital Innovation",
    icon: "Cpu",
    tagline: "High-velocity systems driving rapid product maturity.",
    desc: "Accelerate your concept-to-market lifecycle. We co-create advanced technical proofs-of-concept, scalable software architectures, and automated digital properties that capture market share.",
    nodesCount: "450+ Active Sprints",
    leadTime: "7-Day Prototypes",
    metrics: [
      { label: "POC Delivered", value: "120+" },
      { label: "Efficiency Boost", value: "3.2x" },
      { label: "Success Ratio", value: "98.5%" }
    ],
    coordinates: [
      { cx: "40%", cy: "30%", label: "Blueprint Node" },
      { cx: "60%", cy: "70%", label: "IP Core Layer" }
    ]
  },
  {
    title: "Enterprise Solution Partners",
    short: "Enterprise Partners",
    icon: "ShieldCheck",
    tagline: "Ironclad operational compliance and secure alignment.",
    desc: "Maintain rigorous enterprise security standards, business continuity, and risk assurance. Advanced encryption protocols and zero-trust security architectures engineered natively.",
    nodesCount: "100% Certified Standard",
    leadTime: "Continuous Audits",
    metrics: [
      { label: "Compliances Managed", value: "8+" },
      { label: "Threat Sentinel", value: "Active" },
      { label: "Data Integrity", value: "100%" }
    ],
    coordinates: [
      { cx: "50%", cy: "20%", label: "Sovereign HSM" },
      { cx: "20%", cy: "50%", label: "Secured Audit" },
      { cx: "80%", cy: "65%", label: "Threat Radar" }
    ]
  },
  {
    title: "Product & Experience Designers",
    short: "Product & UX",
    icon: "Compass",
    tagline: "Visually arresting layouts and high-retention touchpoints.",
    desc: "Unite elite UI/UX designers and interaction engineers. We architect responsive layouts, intuitive design systems, and rich typography structures focused on maximizing client retention.",
    nodesCount: "10,000+ Components",
    leadTime: "Figma to Code",
    metrics: [
      { label: "UX Satisfaction", value: "4.9/5" },
      { label: "Interaction Speed", value: "60fps" },
      { label: "User Retention", value: "+24%" }
    ],
    coordinates: [
      { cx: "30%", cy: "65%", label: "Interface Mesh" },
      { cx: "70%", cy: "35%", label: "Typography Unit" }
    ]
  },
  {
    title: "24/7 Client Support",
    short: "24/7 Support",
    icon: "PhoneCall",
    tagline: "Always-on communication tunnels with rapid resolution SLAs.",
    desc: "Secure end-to-end encrypted service desks always active across every hemisphere. Seamless follow-the-sun ticketing and dedicated coordinators handling your critical needs.",
    nodesCount: "24/7 Coverage",
    leadTime: "15-Min Critical SLA",
    metrics: [
      { label: "Hemispheres Active", value: "All" },
      { label: "Average Response", value: "4.5m" },
      { label: "SLA Adherence", value: "100%" }
    ],
    coordinates: [
      { cx: "35%", cy: "45%", label: "APAC Support" },
      { cx: "65%", cy: "55%", label: "EMEA Center" },
      { cx: "50%", cy: "80%", label: "US Hotline" }
    ]
  }
];

export function TeamSection() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [selectedLeader, setSelectedLeader] = useState<TeamMember | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // Interactive SVG detailed vector world map represents company reach with geographic accuracy

  // Esc key closes the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedLeader(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const coreLeaders: TeamMember[] = [
    {
      name: "Ali Hassan Chand",
      initials: "AHC",
      roles: ["Founder", "Managing Director", "International Business & Growth Leadership"],
      email: "leadership@metawaveinnovations.com",
      badge: "FOUNDER & MANAGING DIRECTOR",
      focus: "Directs long-term corporate governance, executive partnerships, and international business growth leadership across global markets.",
      color: "text-[#326E45] bg-[#326E45]/5 border-[#326E45]/20",
      bgGradient: "from-emerald-600 via-[#326E45] to-emerald-800",
      tagline: "Steering international business and growth leadership.",
      skills: ["Strategic Governance", "Enterprise Partnerships", "Venture Growth"],
      bio: "Ali Hassan Chand is the Founder and Managing Director of MetaWave Innovations, spearheading International Business & Growth Leadership. Over his decade-long career, he has successfully directed and scaled enterprise application architectures, oversaw secure multi-cloud integrations, and forged deep strategic alliances across APAC, Europe, and the Middle East.",
      expertise: [
        { subject: "Enterprise Architecture & Governance", score: 98 },
        { subject: "Venture Scaling & Growth Systems", score: 95 },
        { subject: "Deep Tech Integration (AI/ML)", score: 92 },
        { subject: "Multi-Cloud Security & Standards", score: 96 }
      ],
      experience: [
        { period: "2024 - Present", title: "Founder & Managing Director", company: "MetaWave Innovations Pvt Ltd", desc: "Leading international business, growth leadership, and governing strategic corporate alliances." },
        { period: "2021 - 2024", title: "Lead Systems Architect", company: "Apex Digital Holdings", desc: "Architected enterprise core banking pipelines handling millions of transactions daily." },
        { period: "2018 - 2021", title: "Principal Software Engineer", company: "NextGen Software Labs", desc: "Built modern Web2/Web3 bridges and high-density state machines." }
      ],
      education: "B.S. in Computer Science - Advanced Systems Engineering Track",
      linkedin: "https://linkedin.com/in/ali-hassan-chand-metawave",
      cvUrl: "https://ahc-cv.vercel.app/",
      portfolioUrl: "https://hassan-cv-nine.vercel.app/"
    },
    {
      name: "Muntaha Sheikh",
      initials: "MS",
      roles: ["Chief Executive Officer (CEO)", "Co-Founder & Chief Technical Officer (CTO)", "System Developer and Project Management"],
      email: "muntaha@metawaveinnovations.com",
      badge: "CEO, CO-FOUNDER & CTO",
      focus: "Chief Executive Officer & Chief Technical Officer directing system development, project management, and global engineering execution.",
      color: "text-[#326E45] bg-[#326E45]/5 border-[#326E45]/20",
      bgGradient: "from-emerald-600 via-[#326E45] to-emerald-800",
      tagline: "Engineering scalable systems and steering technological excellence.",
      skills: ["Executive Strategy", "System Development", "Project Management"],
      bio: "Muntaha Sheikh is the Chief Executive Officer (CEO), Co-Founder, and Chief Technical Officer (CTO) of MetaWave Innovations. Specializing in system development and project management, she leads the engineering squads with automated test protocols, resilient microservices, and unified cross-platform mobile architectures.",
      expertise: [
        { subject: "Executive Strategy & Project Management", score: 98 },
        { subject: "High-Density System Development", score: 97 },
        { subject: "Cross-Platform Mobile Ecosystems", score: 95 },
        { subject: "DevOps & Continuous Integration", score: 93 }
      ],
      experience: [
        { period: "2024 - Present", title: "Chief Executive Officer (CEO) & CTO", company: "MetaWave Innovations Pvt Ltd", desc: "Directing executive operations, system developer pipelines, and end-to-end project management across MWI products." },
        { period: "2021 - 2024", title: "Senior Full-Stack Engineer", company: "CloudScale Software Co", desc: "Designed, audited, and deployed secure APIs supporting over 2.5M concurrent active clients." },
        { period: "2018 - 2021", title: "Mobile UI Specialist", company: "Frictionless App Studio", desc: "Engineered ultra-responsive layouts utilizing gesture handlers and shared element transitions." }
      ],
      education: "B.E. in Software Engineering - Advanced Computing & Database Systems",
      linkedin: "https://linkedin.com/in/muntaha-sheikh-metawave"
    },
    {
      name: "Abdul Ahad Arain",
      initials: "AAA",
      roles: ["Co-Founder", "System Designer & Lead IT Engineer"],
      email: "ahad@metawaveinnovations.com",
      badge: "CO-FOUNDER & SYSTEM DESIGNER",
      focus: "Supervises system design, lead IT engineering, and scalable user-centric architectures across MWI platforms.",
      color: "text-[#326E45] bg-[#326E45]/5 border-[#326E45]/20",
      bgGradient: "from-emerald-600 via-[#326E45] to-emerald-800",
      tagline: "Bridging complex system architecture with human-centric interfaces.",
      skills: ["System Design", "Lead IT Engineering", "UI/UX Architecture"],
      bio: "Abdul Ahad Arain is a Co-Founder, System Designer, and Lead IT Engineer at MetaWave Innovations. He transforms complex engineering requirements into robust system blueprints, maintaining design system standards, lead IT engineering practices, and optimized digital performance.",
      expertise: [
        { subject: "System Design & UI/UX Architecture", score: 98 },
        { subject: "Lead IT Engineering & Systems", score: 96 },
        { subject: "Design Systems & Token Architecture", score: 95 },
        { subject: "Performance Audits & Web Vitals", score: 94 }
      ],
      experience: [
        { period: "2024 - Present", title: "Co-Founder, System Designer & Lead IT Engineer", company: "MetaWave Innovations Pvt Ltd", desc: "Governing system design standards, IT engineering frameworks, and high-performance digital products." },
        { period: "2022 - 2024", title: "Senior UI Designer", company: "Vertex Interactive Labs", desc: "Crafted interactive financial dashboards, visual analytics suites, and spatial UX canvases." },
        { period: "2020 - 2022", title: "Creative Front-End Developer", company: "PixelCraft Agency", desc: "Developed highly award-winning promotional websites, custom shaders, and responsive UI kits." }
      ],
      education: "Bachelor of Design (B.Des) - Interactive Media & Human-Computer Interaction",
      linkedin: "https://linkedin.com/in/abdul-ahad-arain-metawave"
    },
    {
      name: "Suhail Siyal",
      initials: "SS",
      roles: ["Partner", "Director of Marketing & Business Growth"],
      email: "suhail.md@metawaveinnovations.com",
      badge: "PARTNER & DIRECTOR OF MARKETING",
      focus: "Manages international corporate client relationships, brand capitalization, and global market positioning.",
      color: "text-[#326E45] bg-[#326E45]/5 border-[#326E45]/20",
      bgGradient: "from-emerald-600 via-[#326E45] to-emerald-800",
      tagline: "Catalyzing scalable commercial architectures and business growth.",
      skills: ["Global Scale", "Brand Capitalization", "Client Stewardship"],
      bio: "Suhail Siyal is a Partner and Director of Marketing & Business Growth at MetaWave Innovations. He specializes in enterprise lead generation, SaaS monetization pipelines, and complex client retention strategies, helping tech startups transform into industry powerhouses.",
      expertise: [
        { subject: "Brand Capitalization & Equity", score: 96 },
        { subject: "International Market Strategy", score: 94 },
        { subject: "Enterprise Client Stewardship", score: 98 },
        { subject: "Digital Conversion Funnels", score: 95 }
      ],
      experience: [
        { period: "2024 - Present", title: "Partner & Director of Marketing & Business Growth", company: "MetaWave Innovations Pvt Ltd", desc: "Governing client satisfaction, brand capital, and global commercial growth outreach." },
        { period: "2022 - 2024", title: "VP of Business Development", company: "Synergy Global Marketing", desc: "Acquired and managed Fortune 500 client relationships across EMEA region." },
        { period: "2019 - 2022", title: "Senior Growth Lead", company: "ByteForce Media Group", desc: "Scaled inbound user acquisitions by 350% within consecutive fiscal quarters." }
      ],
      education: "Master of Business Administration (MBA) - Strategic Growth & Marketing",
      linkedin: "https://linkedin.com/in/suhail-siyal-metawave"
    }
  ];

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2000);
  };

  return (
    <section id="executive-team" className="py-16 sm:py-20 lg:py-24 bg-mwi-base border-b border-mwi-shade-10/40 relative overflow-hidden">
      
      {/* Decorative Grid Line System */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:16px_28px] pointer-events-none" />
      <div className="absolute -top-32 left-1/4 w-[350px] h-[350px] bg-[#326E45]/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[400px] h-[400px] bg-emerald-500/[0.015] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#326E45]/20 bg-[#326E45]/5 shadow-2xs">
            <Sparkles size={12} className="text-[#326E45]" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#2F6547] uppercase">
              EXECUTIVE BOARD & ARCHITECTS
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            <span className="block w-max max-w-full mx-auto whitespace-nowrap">
              The Master Assembly of
            </span>
            <span className="block bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1E293B] bg-clip-text text-transparent">
              Elite Leadership
            </span>
          </h2>
        </div>

        {/* Master Team Grid (4 Members) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 mb-16">
          {coreLeaders.map((member) => (
            <motion.div
              key={member.name}
              onClick={() => setSelectedLeader(member)}
              whileHover={{ y: -8, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="group relative bg-white border border-slate-200/90 rounded-3xl shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] hover:border-[#326E45]/40 hover:shadow-[0_24px_50px_-12px_rgba(50,110,69,0.18),0_4px_16px_rgba(15,23,42,0.04)] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer text-left ring-1 ring-black/[0.02] hover:ring-[#326E45]/20 p-6 sm:p-7"
            >
              {/* Official card top accent reflector */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#326E45] via-emerald-500 to-[#245032] opacity-80 group-hover:h-1.5 group-hover:opacity-100 transition-all duration-300" />
              {/* Subtle ambient corner illumination */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#326E45]/[0.05] group-hover:bg-[#326E45]/[0.12] rounded-full blur-3xl pointer-events-none transition-colors duration-500" />
              
              <div className="space-y-5 relative z-10">
                {/* Top Row: Avatar Monogram + Quick Executive Connectors */}
                <div className="flex items-start justify-between gap-3">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 via-[#326E45] to-emerald-800 p-0.5 shadow-md shadow-[#326E45]/15 group-hover:shadow-lg group-hover:shadow-[#326E45]/25 group-hover:scale-105 transition-all duration-300">
                      <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center relative overflow-hidden group-hover:bg-emerald-50/30 transition-colors">
                        <div className="absolute inset-0 bg-[radial-gradient(#326E45_1px,transparent_1px)] [background-size:6px_6px] opacity-10" />
                        <span className="text-lg font-display font-extrabold tracking-tight text-slate-900 group-hover:text-[#326E45] relative z-10 transition-colors">
                          {member.initials}
                        </span>
                      </div>
                    </div>
                    {/* Live executive availability presence dot */}
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5" title="Active Board Member">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#326E45] border-2 border-white shadow-xs"></span>
                    </span>
                  </div>
                  
                  {/* Subtle, refined quick actions & verification badge */}
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[8.5px] font-mono font-bold tracking-wider uppercase border border-[#326E45]/20 bg-[#326E45]/5 text-[#326E45] shadow-3xs">
                      {member.badge}
                    </span>
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-50 hover:bg-[#0077b5]/10 text-slate-400 hover:text-[#0077b5] border border-slate-200/70 transition-all hover:scale-105 active:scale-95"
                        title="LinkedIn Profile"
                      >
                        <Linkedin size={12} />
                      </a>
                      <button
                        onClick={() => handleCopyEmail(member.email)}
                        className="p-1.5 rounded-lg bg-slate-50 hover:bg-[#326E45]/10 text-slate-400 hover:text-[#326E45] border border-slate-200/70 transition-all hover:scale-105 active:scale-95 relative"
                        title="Copy Official Direct Email"
                      >
                        {copiedEmail === member.email ? (
                          <Check size={12} className="text-[#326E45]" />
                        ) : (
                          <Mail size={12} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Executive Identity details */}
                <div className="space-y-1.5 text-left">
                  <h3 className="text-xl font-display font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-[#326E45] transition-colors">
                    {member.name}
                  </h3>
                  
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-bold text-[#326E45] leading-snug">
                      {member.roles[0]}
                    </p>
                    {member.roles.length > 1 && (
                      <p className="text-[11.5px] font-medium text-slate-500 leading-snug line-clamp-1">
                        {member.roles.slice(1).join(' • ')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Calm, distinguished executive signature quote */}
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-[12px] text-slate-600 font-medium italic leading-relaxed line-clamp-2">
                    "{member.tagline}"
                  </p>
                </div>
              </div>

              {/* Clear, Smooth & Prominent Interactive CTA: View Executive Dossier */}
              <div className="pt-5 mt-3 relative z-10">
                <div className="w-full py-2.5 px-4 rounded-xl bg-slate-50/90 group-hover:bg-[#326E45] border border-slate-200/80 group-hover:border-[#326E45] text-slate-700 group-hover:text-white transition-all duration-300 flex items-center justify-between text-[12px] font-semibold shadow-2xs">
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={13} className="text-[#326E45] group-hover:text-white transition-colors" />
                    <span>View Executive Dossier</span>
                  </span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300 text-slate-400 group-hover:text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>



      {/* Immersive Executive Profile Detail Dialog Modal */}
      <AnimatePresence>
        {selectedLeader && (
          <>
            {/* Dark blur overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLeader(null)}
              className="fixed inset-0 bg-slate-955/80 backdrop-blur-md z-50 cursor-zoom-out"
            />

            {/* Scrollable container for modal centering */}
            <div className="fixed inset-0 z-55 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-none">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="relative bg-white max-w-4xl w-full rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row text-left pointer-events-auto max-h-[90vh] md:max-h-[85vh] select-none"
              >
                
                {/* Left Visual Column - Identity Card (Full representation of profile) */}
                <div className="md:w-2/5 bg-gradient-to-b from-[#0A0F1C] via-[#0E1527] to-[#122b1a] text-white p-8 flex flex-col justify-between relative overflow-hidden shrink-0">
                  
                  {/* Subtle decorative grid overlay inside visual column */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:12px_12px] opacity-30" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />

                  <div className="relative z-10 space-y-6">
                    {/* Badge & Monogram block */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-[9px] font-mono font-bold tracking-widest uppercase">
                        {selectedLeader.badge}
                      </span>
                      <span className="text-2xl font-mono font-black tracking-tighter opacity-70">
                        {selectedLeader.initials}
                      </span>
                    </div>

                    {/* Avatar with customized gradient ring */}
                    <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-md p-1.5 shadow-xl border border-white/15">
                      <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center overflow-hidden relative">
                        <div className="absolute inset-0 bg-[radial-gradient(#326E45_1.5px,transparent_1.5px)] [background-size:8px_8px] opacity-15" />
                        <span className="text-2xl font-display font-black text-slate-900 relative z-10">
                          {selectedLeader.initials}
                        </span>
                      </div>
                    </div>

                    {/* Identity Titles */}
                    <div className="space-y-2">
                      <h3 className="text-2xl font-display font-extrabold tracking-tight">
                        {selectedLeader.name}
                      </h3>
                      <div className="space-y-1">
                        {selectedLeader.roles.map((role, idx) => (
                          <div key={idx} className="text-[12.5px] font-medium text-white/80 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            {role}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Academics & Secured Pipeline Connection in footer */}
                  <div className="relative z-10 mt-8 pt-6 border-t border-white/10 space-y-4">
                    {/* Education */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/50 tracking-wider uppercase font-bold">
                        <BookOpen size={11} className="text-emerald-400" />
                        <span>Academic Dossier</span>
                      </div>
                      <p className="text-[11.5px] leading-relaxed text-white/90 font-medium">
                        {selectedLeader.education}
                      </p>
                    </div>

                    {/* Quick Mail to Executive with click callback */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[9px] font-mono text-white/50 tracking-wider uppercase font-bold">
                        Direct Secure Routing
                      </div>
                      <a 
                        href={`mailto:${selectedLeader.email}`}
                        className="text-[11.5px] font-mono font-bold text-emerald-300 hover:text-emerald-200 transition-colors flex items-center gap-1"
                      >
                        <Mail size={11} />
                        <span className="underline truncate">{selectedLeader.email}</span>
                      </a>
                    </div>
                  </div>

                </div>

                {/* Right Interactive Column - Technical Dossier, Timeline & Philosophy */}
                <div className="flex-1 p-6 sm:p-8 md:p-10 overflow-y-auto flex flex-col justify-between relative max-h-[90vh] md:max-h-full">
                  
                  {/* Close absolute node button */}
                  <button
                    onClick={() => setSelectedLeader(null)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                    title="Close Dossier"
                  >
                    <X size={18} />
                  </button>

                  <div className="space-y-6">
                    {/* Dossier tag */}
                    <div className="space-y-1">
                      <div className="text-[9.5px] font-mono font-extrabold tracking-widest text-slate-400 uppercase">
                        EXECUTIVE DOSSIER AND PROFESSIONAL PORTFOLIO
                      </div>
                      <h4 className="text-xl sm:text-2xl font-display font-extrabold tracking-tight text-slate-900">
                        Strategic Capabilities
                      </h4>
                    </div>

                    {/* Philosophy Quote block */}
                    <div className="bg-slate-50 border-l-4 border-[#326E45] p-4 rounded-r-2xl">
                      <p className="text-[12.5px] text-slate-600 italic font-medium leading-relaxed">
                        "{selectedLeader.tagline}"
                      </p>
                    </div>

                    {/* Deep-dive Biography */}
                    <div className="space-y-2">
                      <h5 className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                        EXECUTIVE SUMMARY & INFLUENCE
                      </h5>
                      <p className="text-[12.5px] sm:text-[13px] text-slate-500 leading-relaxed font-normal">
                        {selectedLeader.bio}
                      </p>
                    </div>

                    {/* Technical / Strategic Expertise Progress Gauges */}
                    <div className="space-y-4 pt-1">
                      <h5 className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                        VETTED EXPERTISE METRICS
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedLeader.expertise.map((exp, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-[11.5px] font-bold text-slate-700">
                              <span>{exp.subject}</span>
                              <span className="font-mono text-[#326E45]">{exp.score}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${exp.score}%` }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="h-full bg-gradient-to-r from-[#326E45] to-emerald-500 rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Career Milestones Timeline */}
                    <div className="space-y-4 pt-2">
                      <h5 className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                        CAREER MILESTONES & REPUTATION TIMELINE
                      </h5>
                      <div className="space-y-4 border-l-2 border-slate-100 pl-4 ml-2">
                        {selectedLeader.experience.map((exp, idx) => (
                          <div key={idx} className="relative space-y-1">
                            {/* timeline circle node */}
                            <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-[#326E45] ring-4 ring-white" />
                            
                            <div className="flex flex-wrap items-baseline justify-between gap-1.5">
                              <span className="text-[12px] font-extrabold text-[#326E45] font-mono">
                                {exp.period}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                {exp.company}
                              </span>
                            </div>
                            <h6 className="text-[12.5px] font-extrabold text-slate-800">
                              {exp.title}
                            </h6>
                            <p className="text-[11.5px] text-slate-500 leading-relaxed">
                              {exp.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Actions footer */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* LinkedIn button */}
                      <a
                        href={selectedLeader.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0077b5] text-white text-xs font-semibold rounded-xl hover:bg-[#006294] transition-all cursor-pointer shadow-3xs hover:shadow-md"
                      >
                        <Linkedin size={13} />
                        <span>LinkedIn</span>
                        <ExternalLink size={11} />
                      </a>

                      {selectedLeader.cvUrl && (
                        <a
                          href={selectedLeader.cvUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#326E45] text-white text-xs font-semibold rounded-xl hover:bg-[#275736] transition-all cursor-pointer shadow-3xs hover:shadow-md"
                        >
                          <span>Verified CV</span>
                          <ExternalLink size={11} />
                        </a>
                      )}

                      {selectedLeader.portfolioUrl && (
                        <a
                          href={selectedLeader.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 text-slate-100 hover:text-white text-xs font-semibold rounded-xl hover:bg-slate-700 transition-all cursor-pointer shadow-3xs hover:shadow-md"
                        >
                          <span>Portfolio Dossier</span>
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </div>

                    {/* Copy dossier notification */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const dossierText = `${selectedLeader.name} - ${selectedLeader.roles.join(', ')}\nEmail: ${selectedLeader.email}\nEducation: ${selectedLeader.education}\nBio: ${selectedLeader.bio}`;
                          navigator.clipboard.writeText(dossierText);
                          setCopiedEmail(selectedLeader.name);
                          setTimeout(() => setCopiedEmail(null), 2000);
                        }}
                        className="px-3.5 py-2 bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-[11px] font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        {copiedEmail === selectedLeader.name ? (
                          <>
                            <Check size={12} className="text-[#326E45]" />
                            <span className="text-[#326E45]">Dossier Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copy Full Dossier</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setSelectedLeader(null)}
                        className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
                      >
                        Close Profile
                      </button>
                    </div>

                  </div>

                </div>

              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

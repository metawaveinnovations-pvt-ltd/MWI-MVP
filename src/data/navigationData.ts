import { 
  Code, 
  Cpu, 
  Cloud, 
  Database,
  Terminal,
  Activity,
  Building,
  GraduationCap,
  Sparkles,
  Search,
  CheckCircle,
  Globe,
  Settings,
  ShieldAlert,
  Users,
  Briefcase,
  HelpCircle,
  TrendingUp,
  LineChart,
  HardDrive,
  Network,
  Lock,
  Heart,
  Store,
  Factory,
  Building2,
  Truck,
  DollarSign,
  Layers,
  Grid,
  Folder,
  Newspaper,
  Palette,
  Code2
} from 'lucide-react';

export interface DropdownSubItem {
  name: string;
  desc?: string;
  targetId: string;
  badge?: string;
  tagline?: string;
  techStack?: string[];
  targetRoute?: string;
  metrics?: { label: string; value: string } | string;
}

export interface DropdownItem {
  name: string;
  desc: string;
  icon: any;
  href?: string;
  targetId?: string;
  badge?: string;
  highlights?: string[];
  useCase?: string;
  statLabel?: string;
  statVal?: string;
  brief?: string;
  number?: string;
  shortTitle?: string;
  tabId?: string;
  subservices?: DropdownSubItem[];
}

export interface MegaCategory {
  title: string;
  items: DropdownItem[];
}

export const CAPABILITIES_ITEMS: DropdownItem[] = [
  {
    name: '01 — Design & Creative',
    desc: 'Digital experiences, brand systems & visual communication',
    icon: Palette,
    targetId: 'design-creative',
    number: '01',
    useCase: 'Visual & Brand Systems',
    statLabel: 'RETENTION LIFT',
    statVal: '+44% User Retention',
    brief: 'Digital experiences, cohesive brand systems, and high-impact visual communication that elevate enterprise trust.',
    highlights: [
      'Web & Digital Experience Design',
      'UI/UX Design & Prototyping',
      'Brand Identity & Graphic Design',
      'Motion Graphics & Video Production',
      'Social & Campaign Creative',
      'Marketing & Promotional Content'
    ],
    subservices: [
      { name: 'Web & Digital Experience Design', targetId: 'design-creative?practice=web-digital-experience-design' },
      { name: 'UI/UX Design & Prototyping', targetId: 'design-creative?practice=ui-ux-design-prototyping' },
      { name: 'Brand Identity & Graphic Design', targetId: 'design-creative?practice=brand-identity-graphic-design' },
      { name: 'Motion Graphics & Video Production', targetId: 'design-creative?practice=motion-graphics-video-production' },
      { name: 'Social & Campaign Creative', targetId: 'design-creative?practice=social-campaign-creative' },
      { name: 'Marketing & Promotional Content', targetId: 'design-creative?practice=marketing-promotional-content' }
    ]
  },
  {
    name: '02 — Software Engineering',
    desc: 'Custom software, digital products & enterprise platforms',
    icon: Code2,
    targetId: 'software-engineering',
    number: '02',
    useCase: 'Core Full-Stack & Platforms',
    statLabel: 'THROUGHPUT',
    statVal: '100k+ req/sec',
    brief: 'Custom software, digital products, and high-throughput enterprise platforms engineered for mission-critical scale.',
    highlights: [
      'Website & Web Development',
      'Web Application Development',
      'Mobile Application Development',
      'Custom Software Development',
      'Full-Stack & API Engineering',
      'Enterprise Systems & Platform Development'
    ],
    subservices: [
      { name: 'Website & Web Development', targetId: 'software-engineering?practice=website-web-development' },
      { name: 'Web Application Development', targetId: 'software-engineering?practice=web-application-development' },
      { name: 'Mobile Application Development', targetId: 'software-engineering?practice=mobile-application-development' },
      { name: 'Custom Software Development', targetId: 'software-engineering?practice=custom-software-development' },
      { name: 'Full-Stack & API Engineering', targetId: 'software-engineering?practice=full-stack-api-engineering' },
      { name: 'Enterprise Systems & Platform Development', targetId: 'software-engineering?practice=enterprise-systems-platform-development' }
    ]
  },
  {
    name: '03 — Cloud, Data & Infrastructure',
    desc: 'Scalable infrastructure, connected systems & reliable technology',
    icon: Cloud,
    targetId: 'cloud-data-infrastructure',
    number: '03',
    useCase: 'DevOps, Data & Multi-Cloud',
    statLabel: 'AVAILABILITY',
    statVal: '99.99% Uptime SLA',
    brief: 'Scalable multi-cloud infrastructure, connected databases, zero-trust security, and continuous uptime optimization.',
    highlights: [
      'Cloud Infrastructure & Deployment',
      'Server, Hosting & System Architecture',
      'Database Design & Management',
      'Data Integration & API Infrastructure',
      'Security, Backup & Reliability',
      'Performance & Infrastructure Optimization'
    ],
    subservices: [
      { name: 'Cloud Infrastructure & Deployment', targetId: 'cloud-data-infrastructure?practice=cloud-infrastructure-deployment' },
      { name: 'Server, Hosting & System Architecture', targetId: 'cloud-data-infrastructure?practice=server-hosting-system-architecture' },
      { name: 'Database Design & Management', targetId: 'cloud-data-infrastructure?practice=database-design-management' },
      { name: 'Data Integration & API Infrastructure', targetId: 'cloud-data-infrastructure?practice=data-integration-api-infrastructure' },
      { name: 'Security, Backup & Reliability', targetId: 'cloud-data-infrastructure?practice=security-backup-reliability' },
      { name: 'Performance & Infrastructure Optimization', targetId: 'cloud-data-infrastructure?practice=performance-infrastructure-optimization' }
    ]
  },
  {
    name: '04 — AI, Automation & Smart Systems',
    desc: 'Intelligent technology, business automation & operational efficiency',
    icon: Sparkles,
    targetId: 'ai-automation-smart-systems',
    number: '04',
    useCase: 'Agentic AI & Smart Automation',
    statLabel: 'ACCURACY',
    statVal: '99.4% Precision',
    brief: 'Intelligent technology, autonomous AI agents, business process automation (RPA), and smart decision engines.',
    highlights: [
      'AI Solutions & Intelligent Applications',
      'AI Agents & Workflow Systems',
      'Business Process Automation',
      'AI Integration & Custom AI Workflows',
      'Smart Recommendation & Decision Systems',
      'AI-Powered Customer & Business Solutions'
    ],
    subservices: [
      { name: 'AI Solutions & Intelligent Applications', targetId: 'ai-automation-smart-systems?practice=ai-solutions-intelligent-applications' },
      { name: 'AI Agents & Workflow Systems', targetId: 'ai-automation-smart-systems?practice=ai-agents-workflow-systems' },
      { name: 'Business Process Automation', targetId: 'ai-automation-smart-systems?practice=business-process-automation' },
      { name: 'AI Integration & Custom AI Workflows', targetId: 'ai-automation-smart-systems?practice=ai-integration-custom-ai-workflows' },
      { name: 'Smart Recommendation & Decision Systems', targetId: 'ai-automation-smart-systems?practice=smart-recommendation-decision-systems' },
      { name: 'AI-Powered Customer & Business Solutions', targetId: 'ai-automation-smart-systems?practice=ai-powered-customer-business-solutions' }
    ]
  },
  {
    name: '05 — Growth, Marketing & Digital Strategy',
    desc: 'Digital visibility, customer acquisition & sustainable growth',
    icon: TrendingUp,
    targetId: 'growth-marketing-digital-strategy',
    number: '05',
    useCase: 'SEO, Acquisition & Partnerships',
    statLabel: 'TRAFFIC SCALE',
    statVal: '3.8x Organic Growth',
    brief: 'Digital visibility, enterprise search indexing, high-ROI paid media, CRO analytics, and strategic growth partnerships.',
    highlights: [
      'SEO & Search Visibility',
      'Social Media & Digital Marketing',
      'Paid Advertising & Campaign Management',
      'Content Strategy & Audience Growth',
      'Analytics, CRO & Performance Intelligence',
      'Business Growth & Strategic Partnerships'
    ],
    subservices: [
      { name: 'SEO & Search Visibility', targetId: 'growth-marketing-digital-strategy?practice=seo-search-visibility' },
      { name: 'Social Media & Digital Marketing', targetId: 'growth-marketing-digital-strategy?practice=social-media-digital-marketing' },
      { name: 'Paid Advertising & Campaign Management', targetId: 'growth-marketing-digital-strategy?practice=paid-advertising-campaign-management' },
      { name: 'Content Strategy & Audience Growth', targetId: 'growth-marketing-digital-strategy?practice=content-strategy-audience-growth' },
      { name: 'Analytics, CRO & Performance Intelligence', targetId: 'growth-marketing-digital-strategy?practice=analytics-cro-performance-intelligence' },
      { name: 'Business Growth & Strategic Partnerships', targetId: 'growth-marketing-digital-strategy?practice=business-growth-strategic-partnerships' }
    ]
  }
];

export const OFFERINGS_ITEMS: DropdownItem[] = [
  {
    name: 'MetaCRM Platform',
    desc: 'Intelligent high-velocity sales tracker & AI lead outreach.',
    icon: Users,
    targetId: 'shop',
    badge: 'Sales & CRM',
    highlights: ['Automated Lead Scoring Engine', 'Omnichannel Communication Hub', 'Real-time Predictive Forecasts'],
    useCase: 'Sales & Customer Pipeline',
    statLabel: 'CONVERSION RATE',
    statVal: '42% Lead Increase',
    brief: 'Intelligent customer relationship management platform pairing automated AI deal scoring with omnichannel lead pipelines.'
  },
  {
    name: 'MetaERP Operations Hub',
    desc: 'Unifies multi-national ledgers, inventory & automated payroll.',
    icon: Building2,
    targetId: 'shop',
    badge: 'ERP & Accounting',
    highlights: ['Real-time Cost Ledger Accounting', 'Automated Supply Chain Loops', 'Tax & Multi-Currency API'],
    useCase: 'Enterprise Operations',
    statLabel: 'COST REDUCTION',
    statVal: '30% Expense Cut',
    brief: 'Centralized resource management matrix connecting inventory schedules, double-entry accounting ledgers, and global payroll.'
  },
  {
    name: 'MetaProperty Asset Manager',
    desc: 'Connect portfolio owners, leasing cycles & property maps.',
    icon: Building,
    targetId: 'shop',
    badge: 'PropTech Solution',
    highlights: ['Interactive Property Maps', 'Automated SLA Invoicing Engine', 'Tenant & Booking Portal'],
    useCase: 'Real Estate & Facilities',
    statLabel: 'MANAGED ASSETS',
    statVal: '$12B Asset Base',
    brief: 'Complete digital management engine for commercial and residential real estate portfolios, automating leasing and tenant workflows.'
  },
  {
    name: 'MetaCare Clinical Telemetry',
    desc: 'Encrypted portal mapping clinical feeds & patient histories.',
    icon: Activity,
    targetId: 'shop',
    badge: 'HealthTech Suite',
    highlights: ['HIPAA Compliant Data Guard', 'L-1 Live Telemetry Feeds', 'Automated RX Dispatch System'],
    useCase: 'Clinical & Healthcare',
    statLabel: 'SYSTEM RELIABILITY',
    statVal: '99.99% Node Uptime',
    brief: 'Secure clinical portal connecting patient telemetry, appointment queues, doctor consults, and electronic health records.'
  },
  {
    name: 'POS & Retail Billing System',
    desc: 'Multi-lane invoice creation, offline sync & thermal printing.',
    icon: Cpu,
    targetId: 'solutions',
    badge: 'Retail Platform',
    highlights: ['20ms Multi-lane Invoice Engine', 'Dual Offline Sync Backup', 'Thermal Printer Compatibility'],
    useCase: 'Retail & Supermarkets',
    statLabel: 'BILLING VELOCITY',
    statVal: '99.98% Uptime SLA',
    brief: 'High-speed point of sale system with offline state queuing, inventory tracking, and instant daily sales reporting.'
  },
  {
    name: 'AI Business Analytics Portal',
    desc: 'Predictive reporting portal with adaptive visual charts.',
    icon: LineChart,
    targetId: 'solutions',
    badge: 'BI & Analytics',
    highlights: ['Dynamic Trend Forecasting Loops', 'Anomaly & Fraud Signal Rules', 'Custom PDF Executive Reports'],
    useCase: 'Executive Intelligence',
    statLabel: 'ANALYTICS ROI',
    statVal: '4.2x Better Insights',
    brief: 'Interactive AI-powered business intelligence portal that connects database sources to generate proactive forecast charts.'
  },
  {
    name: 'Business & Warehouse Logistics',
    desc: 'Barcode scan protocols, double-entry ledgers & auto-restock.',
    icon: ShieldAlert,
    targetId: 'solutions',
    badge: 'SCM & Warehouse',
    highlights: ['Supplier Auto-Restock Triggers', 'Hardware Barcode Scanning', 'Audit Trail Ledger System'],
    useCase: 'Logistics & Warehousing',
    statLabel: 'STOCK ACCURACY',
    statVal: '99.9% Precise Logs',
    brief: 'Inventory and warehouse management platform featuring automated vendor ordering thresholds and hardware scanner integrations.'
  },
  {
    name: 'MetaLearn & MetaHR Platforms',
    desc: 'LMS proctored exams & global talent management suites.',
    icon: GraduationCap,
    targetId: 'shop',
    badge: 'LMS & Talent',
    highlights: ['Proctored Online Exam Engine', 'Global Payroll Rails', 'SCORM Compatible Learning'],
    useCase: 'Education & Workforce',
    statLabel: 'ACTIVE USERS',
    statVal: '85k+ Certified',
    brief: 'Enterprise learning management systems and global HR platforms designed for rapid onboarding and employee evaluations.'
  }
];

export const IMPACT_ITEMS: DropdownItem[] = [
  {
    name: 'Global Engineering Portfolio',
    desc: 'Explore live enterprise applications & client outcomes.',
    icon: Folder,
    targetId: 'impact?tab=portfolio',
    tabId: 'portfolio',
    highlights: ['Bespoke web & mobile systems', 'High-traffic SaaS applications', 'Multi-tenant cloud platforms'],
    useCase: 'Featured Engineering Showcase',
    statLabel: 'DELIVERED PROJECTS',
    statVal: '150+ Shipped',
    brief: 'Explore our portfolio of over 150 successfully delivered custom software projects across 12 countries.'
  },
  {
    name: '150+ Shipped Enterprise Projects',
    desc: 'Sub-150ms TTFB portals & 60 FPS mobile applications.',
    icon: Globe,
    targetId: 'impact?tab=enterprise-projects',
    tabId: 'enterprise-projects',
    highlights: ['12 Countries Served', 'Zero Critical Vulnerabilities', 'Continuous Deployment Stacks'],
    useCase: 'Proven Track Record',
    statLabel: 'GLOBAL REACH',
    statVal: '12 Nations',
    brief: 'Delivered high-availability custom systems for healthcare networks, financial institutions, property firms, and startups.'
  },
  {
    name: 'HealthTech & EHR Case Studies',
    desc: 'L-1 clinical telemetry feeds with 99.99% node uptime.',
    icon: Heart,
    targetId: 'impact?tab=healthtech-case-studies',
    tabId: 'healthtech-case-studies',
    highlights: ['Encrypted Patient Telemetry', 'Sub-second Data Pipelines', 'ISO Security Certified'],
    useCase: 'Healthcare Case Study',
    statLabel: 'PATIENT RECORDS',
    statVal: '2.5M+ Secured',
    brief: 'Engineered mission-critical medical record systems and telemedicine portals that protect patient privacy and streamline care.'
  },
  {
    name: 'FinTech & PropTech Outcomes',
    desc: '$12B property asset platform & microsecond ledger cores.',
    icon: DollarSign,
    targetId: 'impact?tab=fintech-proptech-outcomes',
    tabId: 'fintech-proptech-outcomes',
    highlights: ['PCI-DSS Compliant Payments', 'Microsecond Transaction Logs', '$12B Real Estate Managed'],
    useCase: 'Finance & Real Estate',
    statLabel: 'ASSETS MANAGED',
    statVal: '$12 Billion+',
    brief: 'Built high-security financial cores, automated transaction ledgers, and property monetization platforms.'
  },
  {
    name: 'EdTech & Learning Impact',
    desc: 'Scalable LMS platforms serving 85k+ certified users.',
    icon: GraduationCap,
    targetId: 'impact?tab=edtech-learning-impact',
    tabId: 'edtech-learning-impact',
    highlights: ['Automated Grading Matrices', 'Interactive Roster Timelines', 'Anti-Cheat Exam Guards'],
    useCase: 'Education Case Study',
    statLabel: 'CERTIFIED USERS',
    statVal: '85k+ Students',
    brief: 'Empowered academies and global institutions with interactive study portals and automated examination engines.'
  },
  {
    name: 'Supply Chain & Logistics Matrix',
    desc: 'Automated IoT logistics tracking & SLA fleet hubs.',
    icon: Truck,
    targetId: 'impact?tab=supply-chain-logistics',
    tabId: 'supply-chain-logistics',
    highlights: ['SLA-Backed Path Finding', 'IoT Fleet Sensor Sync', 'Real-time Route Optimization'],
    useCase: 'Logistics & Fleet',
    statLabel: 'FLEET LOGS',
    statVal: '50k+ Daily Trips',
    brief: 'Optimized global fleet operations and warehouse supply chains with real-time GPS telemetry and automated dispatch.'
  }
];

export const BLOG_ITEMS: DropdownItem[] = [
  {
    name: 'Systems Architecture & Cloud Insights',
    desc: 'Serverless database scaling, microservices & high-availability.',
    icon: Newspaper,
    targetId: 'blog',
    highlights: ['Sub-150ms TTFB Next.js Architecture', 'Serverless Database Query Benchmarks', 'Monolith to Microservice Migration'],
    useCase: 'Cloud Architecture',
    statLabel: 'READING TIME',
    statVal: '6 Min Read',
    brief: 'In-depth engineering breakdown on designing sub-150ms web architectures and serverless database connection pooling.'
  },
  {
    name: 'Generative AI & LLM Optimization',
    desc: 'Token optimization, vector search indexing & agentic loops.',
    icon: Sparkles,
    targetId: 'blog',
    highlights: ['RAG vs Fine-Tuning Benchmarks', 'Gemini API Latency Optimization', 'Autonomous Multi-Agent Systems'],
    useCase: 'AI & Machine Learning',
    statLabel: 'READING TIME',
    statVal: '8 Min Read',
    brief: 'Practical guide to optimizing token usage, structuring vector retrieval pipelines, and building resilient AI agent loops.'
  },
  {
    name: 'Modern Frontend & React 19 Trends',
    desc: 'Fluid motion keyframes, design systems & web speed.',
    icon: Code,
    targetId: 'blog',
    highlights: ['React 19 Server Components', 'Framer Keyframe Performance', 'Atomic Design Token Scaling'],
    useCase: 'Frontend Engineering',
    statLabel: 'READING TIME',
    statVal: '5 Min Read',
    brief: 'Best practices for creating butter-smooth 60 FPS web interfaces using React 19, Tailwind CSS, and Framer Motion.'
  },
  {
    name: 'Cybersecurity & FinTech Perspectives',
    desc: 'Zero-trust protocols, PCI-DSS compliance & encrypted data.',
    icon: ShieldAlert,
    targetId: 'blog',
    highlights: ['Zero-Trust Security Models', 'PCI-DSS Payment Gateway Audits', 'HIPAA Healthcare Data Encryption'],
    useCase: 'Security & Compliance',
    statLabel: 'READING TIME',
    statVal: '7 Min Read',
    brief: 'Essential security guidelines for engineering compliant, audit-ready financial and medical software systems.'
  }
];

export const SOLUTIONS_DATA: MegaCategory[] = [
  {
    title: 'Software Solutions',
    items: [
      { name: 'Custom Software', desc: 'Bespoke high performance systems tailored for scale.', icon: Code },
      { name: 'Enterprise Systems', desc: 'Compliant service architectures for robust operations.', icon: Terminal },
      { name: 'SaaS Development', desc: 'Multi-tenant cloud platforms built with modern stacks.', icon: Settings },
      { name: 'API Integration', desc: 'Unified API orchestrations with secure token guards.', icon: Network },
    ]
  },
  {
    title: 'AI Solutions',
    items: [
      { name: 'AI Automation', desc: 'Repetitive process removal via smart model loops.', icon: Cpu },
      { name: 'Machine Learning', desc: 'Custom predictive model deployments on live feeds.', icon: Sparkles },
      { name: 'Business Intelligence', desc: 'Interactive dashboards powered by enterprise data.', icon: LineChart },
      { name: 'Predictive Analytics', desc: 'Proactive strategy planning using statistical models.', icon: TrendingUp },
    ]
  },
  {
    title: 'Cloud Services',
    items: [
      { name: 'Cloud Migration', desc: 'Safe transitioning of workflows to premium backends.', icon: Cloud },
      { name: 'DevOps', desc: 'Constant integration delivery pipelines with automated testing.', icon: HardDrive },
      { name: 'Infrastructure', desc: 'Provisioned auto-scaling server clusters on AWS & Google Cloud.', icon: Database },
      { name: 'Security', desc: 'Military grade encryption standards, advanced security practices, and privacy controls.', icon: Lock },
    ]
  },
  {
    title: 'Business Platforms',
    items: [
      { name: 'CRM Systems', desc: 'Comprehensive customer pipelines and retention workflows.', icon: Users },
      { name: 'ERP Systems', desc: 'Unified resource management, material and capital planning.', icon: Building2 },
      { name: 'Property Platforms', desc: 'Asset monetization engines, booking engines & tenant CRM.', icon: Building },
      { name: 'Healthcare Systems', desc: 'Secure patient telemetry databases and EHR systems.', icon: Activity },
    ]
  }
];

export const INDUSTRIES_DATA = [
  { name: 'Healthcare', desc: 'Secure EHR integrations & clinical smart applications.', icon: Heart, tag: 'HealthTech' },
  { name: 'Real Estate', desc: 'Premium property transaction tech & tenant management.', icon: Building, tag: 'PropTech' },
  { name: 'Education', desc: 'LMS systems with automatic grading integrations.', icon: GraduationCap, tag: 'EdTech' },
  { name: 'Finance', desc: 'PCI compliant payment processors & wealth automation.', icon: DollarSign, tag: 'FinTech' },
  { name: 'Retail', desc: 'Ominchannel inventory trackers & custom POS systems.', icon: Store, tag: 'eCom' },
  { name: 'Manufacturing', desc: 'Industrial logistics tracking & smart IoT protocols.', icon: Factory, tag: 'SCM' },
  { name: 'Government', desc: 'High compliance public directories & citizen portals.', icon: ShieldAlert, tag: 'GovTech' },
  { name: 'Logistics', desc: 'SLA-backed path finding and fleet telemetry hubs.', icon: Truck, tag: 'Fleet' },
];

export const PRODUCTS_DATA = [
  {
    id: 'metacrm',
    name: 'MetaCRM',
    badge: 'Enterprise Pipelines',
    desc: 'Intelligent high-velocity sales tracker matching client leads with automatic AI outreach workflows.',
    features: ['Automated Lead Scoring', 'Omnichannel Inbox', 'Interactive Forecasts'],
    color: 'from-emerald-50 to-[#326E45]/5',
    borderColor: 'border-[#326E45]/15',
    iconColor: 'text-[#20462c]',
    stat: '42% CR Increase'
  },
  {
    id: 'metaerp',
    name: 'MetaERP',
    badge: 'Operations Hub',
    desc: 'Unifies multi-national ledgers, materials tracking, supply chain dependencies, and automatic payroll.',
    features: ['Real-time Cost Ledger', 'Automated SCM Loop', 'Tax Compliance API'],
    color: 'from-teal-50/40 to-[#326E45]/10',
    borderColor: 'border-teal-100',
    iconColor: 'text-[#20462c]',
    stat: '30% Cost Cut'
  },
  {
    id: 'metaproperty',
    name: 'MetaProperty',
    badge: 'Asset Management',
    desc: 'Connect portfolio owners, facility managers, and digital leasing cycles in a highly visual layout.',
    features: ['Smart Interactive Maps', 'Auto SLA Invoicing', 'Unified Booking Engine'],
    color: 'from-slate-50 to-[#326E45]/5',
    borderColor: 'border-[#326E45]/10',
    iconColor: 'text-slate-700',
    stat: '$12B Asset Managed'
  },
  {
    id: 'metacare',
    name: 'MetaCare',
    badge: 'Clinical Telemetry',
    desc: 'Secure portal mapping direct clinical feeds, doctor consult queues, and patient history indexes seamlessly.',
    features: ['Encrypted Data Guard', 'L-1 Telemetry Feeds', 'Automated RX Dispatch'],
    color: 'from-emerald-50 to-teal-50/30',
    borderColor: 'border-emerald-100',
    iconColor: 'text-emerald-600',
    stat: '99.99% Node Uptime'
  },
  {
    id: 'metahr',
    name: 'MetaHR',
    badge: 'Talent Suite',
    desc: 'Transform onboarding, employee dynamic evaluation timelines, and benefit allocations inside one place.',
    features: ['Global Payroll Rails', 'AI Evaluation Logic', 'Structured LMS modules'],
    color: 'from-amber-50 to-orange-50/25',
    borderColor: 'border-amber-100',
    iconColor: 'text-amber-600',
    stat: '4.8x Onboarding Speed'
  },
  {
    id: 'metalearn',
    name: 'MetaLearn',
    badge: 'Interactive LMS',
    desc: 'Deliver scalable knowledge systems equipped with automated grading matrices and interactive certification.',
    features: ['Smart Proctored Exams', 'Live Progress Analytics', 'Visual SCORM support'],
    color: 'from-rose-50 to-red-50/10',
    borderColor: 'border-rose-100',
    iconColor: 'text-rose-600',
    stat: '85k Certified Users'
  }
];

export const COMPANY_DATA = [
  { name: 'About Us', desc: 'Read our dynamic transformation origin and guiding values.', icon: CheckCircle, link: 'about' },
  { name: 'Leadership', desc: 'Vanguard managers with cumulative decades of cloud scaling expertise.', icon: Users, link: 'about' },
  { name: 'Technology Stack', desc: 'Our production-ready ecosystems engineered for performance and security.', icon: Cpu, link: 'tech-stack' },
  { name: 'Careers', desc: 'Join our world class remote digital platform team.', icon: Briefcase, link: 'contact', badge: 'We are hiring!' },
  { name: 'Partnerships', desc: 'System integrators and strategic consultants global alliances.', icon: Globe, link: 'contact' },
  { name: 'FAQs & Knowledgebase', desc: 'Answers to software development, pricing, security, and SLAs.', icon: HelpCircle, link: 'faqs' },
];

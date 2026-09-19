import { 
  Palette, 
  Code2, 
  Cloud, 
  Sparkles, 
  TrendingUp,
  Globe,
  Layout,
  Layers,
  Film,
  Share2,
  Megaphone,
  Monitor,
  AppWindow,
  Smartphone,
  Terminal,
  Server,
  Building2,
  HardDrive,
  Database,
  Network,
  ShieldCheck,
  Gauge,
  BrainCircuit,
  Bot,
  Cpu,
  Workflow,
  Compass,
  Headphones,
  Search,
  MessageSquare,
  DollarSign,
  FileText,
  LineChart,
  Handshake
} from 'lucide-react';

import mwiDesignStudio from '../assets/images/mwi_design_studio_1789229863254.jpg';
import mwiEngineeringHub from '../assets/images/mwi_engineering_hub_1789229879555.jpg';
import mwiCloudDevOps from '../assets/images/mwi_cloud_devops_1789229894493.jpg';
import mwiAiAutomation from '../assets/images/mwi_ai_automation_1789229908663.jpg';
import mwiGrowthAnalytics from '../assets/images/mwi_growth_analytics_1789229922314.jpg';

export interface SubServiceItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  desc: string;
  deliverables: string[];
  techStack: string[];
  metrics: { label: string; value: string };
  targetRoute: string;
  image: string;
}

export interface CapabilityGroup {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  icon: any;
  overview: string;
  statLabel: string;
  statVal: string;
  highlights: string[];
  targetRoute: string;
  heroImage: string;
  subservices: SubServiceItem[];
}

export const CAPABILITIES_DATA: CapabilityGroup[] = [
  {
    id: 'design-creative',
    number: '01',
    title: 'Design & Creative',
    shortTitle: 'Design & Creative',
    tagline: 'Digital experiences, brand systems & visual communication',
    icon: Palette,
    targetRoute: 'ui-ux-design',
    heroImage: mwiDesignStudio,
    statLabel: 'USER RETENTION',
    statVal: '+44% Engagement',
    highlights: [
      'Atomic design systems & tokenized components',
      'WCAG 2.1 AA accessibility compliance',
      'Interactive Figma prototypes & usability testing'
    ],
    overview: 'We craft human-centric digital experiences, cohesive brand systems, and engaging visual media that build lasting corporate trust and delight global audiences.',
    subservices: [
      {
        id: 'web-digital-experience-design',
        name: 'Web & Digital Experience Design',
        slug: 'web-digital-experience-design',
        tagline: 'Immersive digital journeys crafted for conversion and modern brand prestige.',
        desc: 'Interactive digital experience architecture blending responsive aesthetics, frictionless navigation hierarchies, and high-performance front-end craftsmanship.',
        deliverables: ['Responsive Web Frameworks', 'Interactive Micro-Experiences', 'Information Architecture Maps', 'Desktop & Mobile Viewport Grids'],
        techStack: ['Figma', 'Motion/React', 'Tailwind CSS', 'CSS Variables', 'Spline 3D'],
        metrics: { label: 'BOUNCE REDUCTION', value: '-38% Bounce Rate' },
        targetRoute: 'ui-ux-design',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'ui-ux-design-prototyping',
        name: 'UI/UX Design & Prototyping',
        slug: 'ui-ux-design-prototyping',
        tagline: 'Figma prototypes, validated user journeys, and pixel-perfect design systems.',
        desc: 'User research, wireframing, interactive prototyping, and usability validation tailored to eliminate operational friction across complex web and mobile apps.',
        deliverables: ['Clickable High-Fidelity Prototypes', 'User Journey Maps', 'Usability Testing Reports', 'Figma Design System Libraries'],
        techStack: ['Figma', 'FigJam', 'Protopie', 'Maze Usability', 'Storybook'],
        metrics: { label: 'TASK SPEED', value: '2.4x Faster Tasks' },
        targetRoute: 'ui-ux-design',
        image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'brand-identity-graphic-design',
        name: 'Brand Identity & Graphic Design',
        slug: 'brand-identity-graphic-design',
        tagline: 'Iconic brand identities, visual stylebooks, and scalable design languages.',
        desc: 'Comprehensive visual identity programs: logo marks, typographical hierarchy, color harmony, corporate stationery, and digital brand styleguides.',
        deliverables: ['Brand Guidelines & Stylebooks', 'Scalable Vector Iconography', 'Corporate Stationery & Typography', 'Digital Brand Assets'],
        techStack: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Glyphs'],
        metrics: { label: 'BRAND RECOGNITION', value: '98% Cohesion' },
        targetRoute: 'ui-ux-design',
        image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'motion-graphics-video-production',
        name: 'Motion Graphics & Video Production',
        slug: 'motion-graphics-video-production',
        tagline: 'High-impact product videos, 3D motion choreography, and brand reels.',
        desc: 'Dynamic motion graphics, animated UI product walkthroughs, kinetic typography, and high-production video editing engineered to capture investor and customer attention.',
        deliverables: ['Product Demo Videos', 'Lottie / JSON Micro-Animations', 'Kinetic Explainer Reels', '3D Motion Brand Sequences'],
        techStack: ['After Effects', 'Premiere Pro', 'Blender', 'LottieFiles', 'Cinema 4D'],
        metrics: { label: 'ENGAGEMENT LIFT', value: '3.2x Video Retention' },
        targetRoute: 'ui-ux-design',
        image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'social-campaign-creative',
        name: 'Social & Campaign Creative',
        slug: 'social-campaign-creative',
        tagline: 'Scroll-stopping multi-channel campaign creative built to convert.',
        desc: 'Data-informed creative assets for LinkedIn, Meta, Google, and X campaigns. Optimized aspect ratios, high-contrast visual hooks, and continuous multivariate testing.',
        deliverables: ['Multi-Platform Ad Creatives', 'Carousel Infographics', 'Social Brand Templates', 'A/B Creative Test Variations'],
        techStack: ['Figma', 'Photoshop', 'Canva Enterprise', 'Motion Stills'],
        metrics: { label: 'CTR INCREASE', value: '+62% Click-Through' },
        targetRoute: 'digital-marketing',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'marketing-promotional-content',
        name: 'Marketing & Promotional Content',
        slug: 'marketing-promotional-content',
        tagline: 'Enterprise pitch decks, technical whitepapers, and sales enablement decks.',
        desc: 'Strategic promotional decks, technical product one-pagers, case study PDFs, and sales collateral designed to accelerate enterprise deal closures.',
        deliverables: ['Executive Keynote & Pitch Decks', 'Technical Whitepaper Layouts', 'Customer Success Case Studies', 'Sales One-Pagers & Factsheets'],
        techStack: ['Figma', 'Adobe InDesign', 'Google Slides', 'Keynote'],
        metrics: { label: 'WIN RATE LIFT', value: '+34% Pitch Wins' },
        targetRoute: 'digital-marketing',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    id: 'software-engineering',
    number: '02',
    title: 'Software Engineering',
    shortTitle: 'Software Engineering',
    tagline: 'Custom software, digital products & enterprise platforms',
    icon: Code2,
    targetRoute: 'custom-software-development',
    heroImage: mwiEngineeringHub,
    statLabel: 'THROUGHPUT',
    statVal: '100k+ req/sec',
    highlights: [
      'Sub-150ms TTFB edge-rendered web applications',
      'Native 60 FPS iOS & Android cross-platform suites',
      'Zero-downtime database migrations & microservice buses'
    ],
    overview: 'End-to-end full-stack engineering, resilient distributed backends, and responsive multi-platform applications designed for enterprise velocity and reliability.',
    subservices: [
      {
        id: 'website-web-development',
        name: 'Website & Web Development',
        slug: 'website-web-development',
        tagline: 'Lightning-fast marketing sites, corporate portals, and edge-cached CMS architectures.',
        desc: 'Static and hybrid web platforms built on React 19, Next.js 15, and Tailwind CSS. Engineered to achieve 100/100 Google Lighthouse benchmarks and instant load times.',
        deliverables: ['Server-Side Rendered (SSR) Websites', 'Headless CMS Integration', 'Edge CDN Global Caching', 'SEO & Core Web Vitals Audits'],
        techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Vercel / Cloudflare'],
        metrics: { label: 'LIGHTHOUSE', value: '100/100 Score' },
        targetRoute: 'web-development',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'web-application-development',
        name: 'Web Application Development',
        slug: 'web-application-development',
        tagline: 'Complex SaaS portals, dynamic business dashboards, and client web apps.',
        desc: 'Single-page and multi-tenant web applications with reactive client states, real-time WebSocket feeds, granular role-based permissions, and end-to-end type safety.',
        deliverables: ['Multi-Tenant SaaS Architectures', 'Interactive Analytics Dashboards', 'Granular RBAC Security Layers', 'Real-Time WebSockets'],
        techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'TanStack Query'],
        metrics: { label: 'UPTIME SLA', value: '99.99% Uptime' },
        targetRoute: 'full-stack-development',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'mobile-application-development',
        name: 'Mobile Application Development',
        slug: 'mobile-application-development',
        tagline: 'Fluid cross-platform iOS and Android apps powered by Flutter and React Native.',
        desc: 'Native-feel mobile apps with offline-first local storage, automated push notifications, biometric authentication, and Apple App Store / Google Play compliance.',
        deliverables: ['Cross-Platform Flutter & Dart Apps', 'React Native Bridgeless Apps', 'Offline SQLite Sync Engines', 'App Store & Play Store Publishing'],
        techStack: ['Flutter', 'Dart', 'React Native', 'Swift', 'Kotlin', 'Firebase FCM'],
        metrics: { label: 'CRASH-FREE', value: '99.9% Sessions' },
        targetRoute: 'mobile-development',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'custom-software-development',
        name: 'Custom Software Development',
        slug: 'custom-software-development',
        tagline: 'Bespoke corporate engines tailored strictly to proprietary business logic.',
        desc: 'Tailor-made software ecosystems designed to replace off-the-shelf software compromises with scalable, high-throughput custom platforms and automated workflows.',
        deliverables: ['Proprietary Business Logic Modules', 'Modular Monoliths & Microservices', 'Custom Automation Engines', 'IP Ownership Transfer'],
        techStack: ['Node.js', 'Go', 'Python', 'PostgreSQL', 'Docker'],
        metrics: { label: 'PROCESS SPEED', value: '4.5x Efficiency' },
        targetRoute: 'custom-software-development',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'full-stack-api-engineering',
        name: 'Full-Stack & API Engineering',
        slug: 'full-stack-api-engineering',
        tagline: 'High-throughput REST, gRPC, and GraphQL APIs with strict schema validation.',
        desc: 'Rigid API gateways, asynchronous worker queues, distributed Redis caches, and resilient backend microservices powering scalable multi-client operations.',
        deliverables: ['OpenAPI / Swagger Documented APIs', 'High-Speed gRPC & REST Gateways', 'Asynchronous BullMQ Job Queues', 'Distributed Redis Caches'],
        techStack: ['Node.js', 'TypeScript', 'gRPC', 'GraphQL', 'Redis', 'PostgreSQL'],
        metrics: { label: 'API LATENCY', value: '<45ms Average' },
        targetRoute: 'api-development-integrations',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'enterprise-systems-platform-development',
        name: 'Enterprise Systems & Platform Development',
        slug: 'enterprise-systems-platform-development',
        tagline: 'Mission-critical core backbones, ERP engines, and legacy system modernization.',
        desc: 'Architecting resilient enterprise software platforms, decoupling legacy monoliths via the Strangler Fig pattern, and unifying cross-departmental operations.',
        deliverables: ['Custom ERP & Core Operations Hubs', 'Legacy Modernization Blueprints', 'Distributed Event Buses (Kafka)', 'Zero-Downtime Migration Plans'],
        techStack: ['Go', 'Java / Spring', 'Apache Kafka', 'PostgreSQL', 'Kubernetes'],
        metrics: { label: 'SCALE LIMIT', value: '1M+ Concurrent' },
        targetRoute: 'enterprise-systems',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    id: 'cloud-data-infrastructure',
    number: '03',
    title: 'Cloud, Data & Infrastructure',
    shortTitle: 'Cloud & Infrastructure',
    tagline: 'Scalable infrastructure, connected systems & reliable technology',
    icon: Cloud,
    targetRoute: 'cloud-solutions',
    heroImage: mwiCloudDevOps,
    statLabel: 'AVAILABILITY',
    statVal: '99.99% Uptime',
    highlights: [
      'Multi-region AWS & Google Cloud high-availability architectures',
      'Terraform Infrastructure-as-Code (IaC) with zero configuration drift',
      'Automated disaster recovery, multi-tenant database partitioning & FinOps'
    ],
    overview: 'Scalable cloud infrastructure, resilient databases, zero-trust security postures, and continuous CI/CD pipelines engineered to safeguard enterprise data.',
    subservices: [
      {
        id: 'cloud-infrastructure-deployment',
        name: 'Cloud Infrastructure & Deployment',
        slug: 'cloud-infrastructure-deployment',
        tagline: 'Multi-cloud Kubernetes, VPC networking, and global load balancing.',
        desc: 'Designing and deploying multi-region architectures on AWS, GCP, and Azure with auto-scaling container clusters, load balancers, and global CDN distribution.',
        deliverables: ['Multi-Cloud VPC Network Topologies', 'Production Kubernetes (EKS / GKE)', 'Global Anycast Load Balancing', 'Automated Failover Protocols'],
        techStack: ['AWS', 'Google Cloud (GCP)', 'Kubernetes', 'Docker', 'Cloudflare'],
        metrics: { label: 'GLOBAL LATENCY', value: '<80ms Worldwide' },
        targetRoute: 'cloud-solutions',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'server-hosting-system-architecture',
        name: 'Server, Hosting & System Architecture',
        slug: 'server-hosting-system-architecture',
        tagline: 'High-availability server infrastructure, bare metal, and edge runtimes.',
        desc: 'Optimized compute architecture, serverless execution layers, Nginx reverse proxy tuning, and dedicated hosting configurations tailored for extreme peak traffic.',
        deliverables: ['Server Capacity & Sizing Blueprints', 'Reverse Proxy & Ingress Configurations', 'Edge Computing & Serverless Runtimes', 'Server Hardening Specifications'],
        techStack: ['Linux / Ubuntu', 'Nginx', 'Caddy', 'AWS Lambda', 'Cloudflare Workers'],
        metrics: { label: 'COST REDUCTION', value: '-32% Cloud Bill' },
        targetRoute: 'cloud-solutions',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'database-design-management',
        name: 'Database Design & Management',
        slug: 'database-design-management',
        tagline: 'Relational, NoSQL, and vector database architectures tuned for query speed.',
        desc: 'Database schema normalization, indexing optimizations, connection pooling, read replicas, and vector embedding stores for performant, reliable data querying.',
        deliverables: ['Normalized Schema ERD Diagrams', 'Query Optimization & Indexing Plans', 'Read Replica & Sharding Architecture', 'Automated Continuous Backups'],
        techStack: ['PostgreSQL', 'Supabase', 'MongoDB', 'Redis', 'Pinecone', 'pgvector'],
        metrics: { label: 'QUERY SPEED', value: '12x Faster Queries' },
        targetRoute: 'cloud-solutions',
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'data-integration-api-infrastructure',
        name: 'Data Integration & API Infrastructure',
        slug: 'data-integration-api-infrastructure',
        tagline: 'Seamless middleware pipelines connecting third-party CRMs, ERPs, and APIs.',
        desc: 'Unifying isolated enterprise systems through bi-directional data pipelines, webhook consumers, ETL transformation pipelines, and fault-tolerant queue retries.',
        deliverables: ['Enterprise ETL / ELT Data Pipelines', 'Webhook Ingestion & Validation Engines', 'CRM & ERP Synchronization Connectors', 'Data Cleansing & Transformation Rules'],
        techStack: ['Node.js', 'Apache Kafka', 'RabbitMQ', 'Stripe API', 'Salesforce API'],
        metrics: { label: 'SYNC RELIABILITY', value: '99.999% Sync Rate' },
        targetRoute: 'api-development-integrations',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'security-backup-reliability',
        name: 'Security, Backup & Reliability',
        slug: 'security-backup-reliability',
        tagline: 'Zero-Trust network security, automated daily backups, and DDoS mitigation.',
        desc: 'Comprehensive enterprise security hardening: SSL/TLS termination, automated point-in-time recovery backups, vulnerability scanning, and SOC2/ISO compliance readiness.',
        deliverables: ['Zero-Trust IAM Access Policies', 'Point-In-Time Backup (PITR) Engines', 'WAF Rules & DDoS Shielding', 'Security & Penetration Test Audits'],
        techStack: ['Cloudflare WAF', 'AWS IAM', 'Vault', 'Trivy', 'SonarQube'],
        metrics: { label: 'RECOVERY RTO', value: '<15min Recovery' },
        targetRoute: 'cloud-solutions',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'performance-infrastructure-optimization',
        name: 'Performance & Infrastructure Optimization',
        slug: 'performance-infrastructure-optimization',
        tagline: 'Eliminating resource bottlenecks, lowering latency, and reducing cloud spend.',
        desc: 'In-depth APM telemetry profiling, cloud resource right-sizing, database cache eviction strategies, and FinOps audits to minimize costs without sacrificing throughput.',
        deliverables: ['FinOps Cloud Cost Optimization Audits', 'APM Bottleneck Profiling Reports', 'Redis Micro-Caching Architecture', 'Load & Stress Testing Benchmarks'],
        techStack: ['Datadog', 'Prometheus', 'Grafana', 'k6 Load Testing', 'AWS Cost Explorer'],
        metrics: { label: 'THROUGHPUT LIFT', value: '+300% Capacity' },
        targetRoute: 'cloud-solutions',
        image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    id: 'ai-automation-smart-systems',
    number: '04',
    title: 'AI, Automation & Smart Systems',
    shortTitle: 'AI & Smart Systems',
    tagline: 'Intelligent technology, business automation & operational efficiency',
    icon: Sparkles,
    targetRoute: 'ai-machine-learning',
    heroImage: mwiAiAutomation,
    statLabel: 'ACCURACY',
    statVal: '99.4% Precision',
    highlights: [
      'Autonomous multi-agent task execution and tool-calling loops',
      'Proprietary RAG knowledge bases with hybrid vector search',
      'Robotic Process Automation (RPA) eliminating routine clerical workflows'
    ],
    overview: 'Deploy intelligent machine learning architectures, autonomous AI agents, document processing RPA, and cognitive recommendation engines to supercharge operational productivity.',
    subservices: [
      {
        id: 'ai-solutions-intelligent-applications',
        name: 'AI Solutions & Intelligent Applications',
        slug: 'ai-solutions-intelligent-applications',
        tagline: 'Custom generative AI platforms, semantic search, and domain-specific models.',
        desc: 'Developing production-ready AI applications powered by Gemini 2.5, OpenAI, and open-source models with strict hallucination guards and token budget management.',
        deliverables: ['Enterprise AI Application Architecture', 'Domain-Specific Prompt Engineering', 'Guardrails & Hallucination Filters', 'Token Budget Optimization Systems'],
        techStack: ['Google GenAI SDK (Gemini)', 'LangChain', 'Python', 'FastAPI', 'Next.js'],
        metrics: { label: 'PRODUCTIVITY', value: '4.8x Output Speed' },
        targetRoute: 'ai-machine-learning',
        image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'ai-agents-workflow-systems',
        name: 'AI Agents & Workflow Systems',
        slug: 'ai-agents-workflow-systems',
        tagline: 'Autonomous agents that plan, execute multi-step tools, and self-correct.',
        desc: 'Building autonomous AI agent swarms capable of reading spreadsheets, executing API requests, resolving complex customer tickets, and filing reports autonomously.',
        deliverables: ['Multi-Agent Collaboration Loops', 'Deterministic Function-Calling Engines', 'Automated Human-in-the-Loop Escalations', 'Step-by-Step Execution Logs'],
        techStack: ['CrewAI', 'LangGraph', 'Python', 'Node.js', 'Redis'],
        metrics: { label: 'TICKET AUTO-RESOLVE', value: '74% Autonomous' },
        targetRoute: 'ai-machine-learning',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'business-process-automation',
        name: 'Business Process Automation',
        slug: 'business-process-automation',
        tagline: 'Robotic process automation (RPA), OCR parsing, and paperless business operations.',
        desc: 'Eliminating repetitive human data entry through intelligent PDF invoice parsing, automated contract indexing, and cross-system data reconciliation bots.',
        deliverables: ['Intelligent OCR Document Scanners', 'Automated Invoicing & Ledger Bots', 'Paperless Approval Workflows', 'Error Exception Handling Dashboards'],
        techStack: ['Python', 'Tesseract OCR', 'Node.js', 'Zapier Enterprise', 'PostgreSQL'],
        metrics: { label: 'HOURS SAVED', value: '120+ hrs/month' },
        targetRoute: 'business-automation',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'ai-integration-custom-ai-workflows',
        name: 'AI Integration & Custom AI Workflows',
        slug: 'ai-integration-custom-ai-workflows',
        tagline: 'Injecting AI superpowers directly into your existing CRM, ERP, and databases.',
        desc: 'Bridging internal databases with secure LLMs using Retrieval-Augmented Generation (RAG) and private vector embeddings, keeping all corporate IP 100% confidential.',
        deliverables: ['Enterprise RAG Search Pipelines', 'Vector Embedding Indexing (Pinecone/pgvector)', 'Private On-Prem LLM Deployments', 'GDPR & Privacy Compliance Seals'],
        techStack: ['Pinecone', 'pgvector', 'Ollama', 'FastAPI', 'Google Cloud Vertex AI'],
        metrics: { label: 'DATA PRIVACY', value: '100% Confidential' },
        targetRoute: 'ai-machine-learning',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'smart-recommendation-decision-systems',
        name: 'Smart Recommendation & Decision Systems',
        slug: 'smart-recommendation-decision-systems',
        tagline: 'Predictive algorithms, dynamic pricing, and hyper-personalized user feeds.',
        desc: 'Predictive analytics engines analyzing behavioral telemetry to forecast inventory requirements, recommend tailored products, and detect anomalous churn signals.',
        deliverables: ['Collaborative Filtering Recommendation Engines', 'Dynamic Pricing & Margin Optimization', 'Customer Churn Predictors', 'Anomaly Detection Telemetry'],
        techStack: ['Scikit-Learn', 'PyTorch', 'Pandas', 'PostgreSQL', 'FastAPI'],
        metrics: { label: 'CONVERSION UPLIFT', value: '+28% Basket Size' },
        targetRoute: 'ai-machine-learning',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'ai-powered-customer-business-solutions',
        name: 'AI-Powered Customer & Business Solutions',
        slug: 'ai-powered-customer-business-solutions',
        tagline: 'Conversational support copilots, voice bots, and automated executive briefs.',
        desc: 'Deploying round-the-clock conversational intelligence with empathetic context recall, multi-lingual translations, and seamless live human agent handoff.',
        deliverables: ['Multilingual Customer Copilots', 'Executive Daily Intelligence Briefs', 'Sentiment & Intent Classification', 'Live Agent Escalation Routing'],
        techStack: ['Gemini 2.5 Flash', 'WebSockets', 'React', 'Node.js', 'Twilio'],
        metrics: { label: 'RESPONSE TIME', value: '<2s Resolution' },
        targetRoute: 'ai-automation-consulting',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    id: 'growth-marketing-digital-strategy',
    number: '05',
    title: 'Growth, Marketing & Digital Strategy',
    shortTitle: 'Growth & Strategy',
    tagline: 'Digital visibility, customer acquisition & sustainable growth',
    icon: TrendingUp,
    targetRoute: 'digital-marketing',
    heroImage: mwiGrowthAnalytics,
    statLabel: 'TRAFFIC SCALE',
    statVal: '3.8x Organic Reach',
    highlights: [
      'Technical SEO audits, programmatic indexing & Core Web Vitals',
      'High-ROI paid acquisition campaigns across Google, Meta & LinkedIn',
      'Full-funnel CRO optimization, data analytics & strategic growth alliances'
    ],
    overview: 'Drive predictable, high-margin revenue through technical SEO dominance, performance marketing loops, high-intent funnel conversion, and strategic growth partnerships.',
    subservices: [
      {
        id: 'seo-search-visibility',
        name: 'SEO & Search Visibility',
        slug: 'seo-search-visibility',
        tagline: 'Programmatic SEO, schema architecture, and top-tier organic Google rankings.',
        desc: 'Technical SEO audits, site speed optimization, rich snippet JSON-LD schemas, and programmatic landing page architectures that scale organic enterprise inbound pipeline.',
        deliverables: ['Technical SEO Health Audits', 'Structured Schema (JSON-LD) Markups', 'Programmatic Long-Tail Indexing Engines', 'Keyword Gap & Content Roadmap'],
        techStack: ['Google Search Console', 'Ahrefs', 'Semrush', 'Screaming Frog', 'Next.js'],
        metrics: { label: 'ORGANIC GROWTH', value: '3.8x Search Clicks' },
        targetRoute: 'seo-services',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'social-media-digital-marketing',
        name: 'Social Media & Digital Marketing',
        slug: 'social-media-digital-marketing',
        tagline: 'Multi-channel B2B authority building, executive positioning, and community reach.',
        desc: 'Targeted organic social distribution across LinkedIn and industry channels that turns corporate thought leadership into steady, high-ticket business inquiries.',
        deliverables: ['Executive Thought Leadership Content', 'Weekly Content Calendars & Carousels', 'Audience Growth & Engagement Loops', 'B2B Social Analytics Dashboards'],
        techStack: ['LinkedIn Campaign Manager', 'Buffer', 'Canva', 'Notion', 'Google Analytics 4'],
        metrics: { label: 'FOLLOWER REACH', value: '+140% Impressions' },
        targetRoute: 'digital-marketing',
        image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'paid-advertising-campaign-management',
        name: 'Paid Advertising & Campaign Management',
        slug: 'paid-advertising-campaign-management',
        tagline: 'High-converting Google Search, LinkedIn Ads, and Meta retargeting funnels.',
        desc: 'Data-driven paid media execution designed to maximize Return On Ad Spend (ROAS). Granular audience targeting, negative keyword sculpting, and dynamic retargeting.',
        deliverables: ['Google Ads Search & Display Campaigns', 'LinkedIn B2B Account-Based Marketing (ABM)', 'Meta Retargeting Funnel Architectures', 'Weekly ROAS & CAC Reporting'],
        techStack: ['Google Ads', 'Meta Ads Manager', 'LinkedIn Ads', 'Google Tag Manager'],
        metrics: { label: 'ROAS MULTIPLIER', value: '4.2x Avg ROAS' },
        targetRoute: 'digital-marketing',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'content-strategy-audience-growth',
        name: 'Content Strategy & Audience Growth',
        slug: 'content-strategy-audience-growth',
        tagline: 'Authoritative industry whitepapers, SEO blog posts, and newsletter funnels.',
        desc: 'Editorial content strategies engineered for subject-matter authority. High-retention technical articles, subscriber lead magnets, and automated email nurturing sequences.',
        deliverables: ['Technical Pillar Guides & Whitepapers', 'High-Converting Email Nurture Sequences', 'Audience Segmentation Strategies', 'Editorial Style & Tone Guides'],
        techStack: ['Substack', 'Mailchimp', 'HubSpot', 'Ghost', 'Markdown'],
        metrics: { label: 'NEWSLETTER OPEN', value: '46% Open Rate' },
        targetRoute: 'digital-marketing',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'analytics-cro-performance-intelligence',
        name: 'Analytics, CRO & Performance Intelligence',
        slug: 'analytics-cro-performance-intelligence',
        tagline: 'Server-side GA4 telemetry, funnel drop-off diagnostics, and multivariate testing.',
        desc: 'Rigorous conversion rate optimization (CRO), heat-map telemetry, form drop-off elimination, and server-side tracking pipelines that squeeze maximum revenue from existing traffic.',
        deliverables: ['Server-Side GA4 Event Instrumentation', 'Hotjar Heatmap & Session Recordings', 'A/B Landing Page Test Deployments', 'Executive Revenue Attribution Reports'],
        techStack: ['Google Analytics 4', 'Server GTM', 'Hotjar', 'Mixpanel', 'BigQuery'],
        metrics: { label: 'CONVERSION LIFT', value: '+31% Checkout CVR' },
        targetRoute: 'seo-services',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'business-growth-strategic-partnerships',
        name: 'Business Growth & Strategic Partnerships',
        slug: 'business-growth-strategic-partnerships',
        tagline: 'Ecosystem alliances, technology co-selling, and cross-border expansion.',
        desc: 'Forging high-value joint ventures, enterprise vendor partnerships, and digital distribution alliances across the UK, UAE, Saudi Arabia, Pakistan, and the USA.',
        deliverables: ['Alliance Partner Vetting Frameworks', 'Co-Marketing & Cross-Selling Playbooks', 'Joint Venture Structuring Advisory', 'Global Ecosystem Introductions'],
        techStack: ['PartnerStack', 'HubSpot PRM', 'LinkedIn Sales Navigator', 'Notion'],
        metrics: { label: 'PARTNER REVENUE', value: '+45% New Deals' },
        targetRoute: 'technical-consulting',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  }
];

// Flat list of all 30 subservices for quick search and lookup
export const ALL_CAPABILITY_SUBSERVICES: SubServiceItem[] = CAPABILITIES_DATA.flatMap(
  group => group.subservices
);

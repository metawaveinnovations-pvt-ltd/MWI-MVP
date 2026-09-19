import { Service, Solution, PortfolioItem, Testimonial, ProcessStep, TechCategory } from './types';

export const stats = [
  { value: '2024', label: 'Founded Year', description: 'Technology & digital solutions company' },
  { value: '15+', label: 'Verified Deployments', description: 'Enterprise software, ERPs, SaaS & web platforms' },
  { value: '99.4%', label: 'On-Time SLA Delivery', description: 'Disciplined agile engineering sprints' },
  { value: '100%', label: 'Client IP Transfer', description: 'Full legal ownership & NDA-guaranteed protection' },
];

export const services: Service[] = [
  {
    id: 's1',
    icon: 'Palette',
    title: 'Web & Digital Experience Design',
    description: 'Bespoke UI/UX design, interactive prototyping, atomic design systems, and responsive digital interfaces crafted for user retention and brand prestige.'
  },
  {
    id: 's2',
    icon: 'Layers',
    title: 'Brand Identity & Graphic Design',
    description: 'Cohesive visual identity systems, motion graphics, campaign creative, and marketing assets that establish distinct corporate presence.'
  },
  {
    id: 's3',
    icon: 'Globe',
    title: 'Website & Web Development',
    description: 'High-performance, ultra-responsive modern web applications engineered with Next.js, React, Tailwind CSS, and optimized for sub-second load speeds.'
  },
  {
    id: 's4',
    icon: 'Cpu',
    title: 'Full-Stack & Custom Software Engineering',
    description: 'Full-cycle enterprise software development, robust server-side architectures (Laravel, PHP, Node.js, Python), and secure RESTful API integrations.'
  },
  {
    id: 's5',
    icon: 'Building2',
    title: 'Enterprise Systems, CRM & ERP Platforms',
    description: 'Tailored enterprise resource planning and CRM software unifying inventory telemetry, supply chains, accounting ledgers, and sales pipelines.'
  },
  {
    id: 's6',
    icon: 'Smartphone',
    title: 'Mobile Application Development',
    description: 'Cross-platform mobile applications for iOS and Android, leveraging Flutter and React Native with offline caching and native performance.'
  },
  {
    id: 's7',
    icon: 'Cloud',
    title: 'Cloud Infrastructure & Server Architecture',
    description: 'Scalable multi-tenant cloud hosting architectures, server deployments, automated hosting provisioning, Docker containerization, and zero-downtime setups.'
  },
  {
    id: 's8',
    icon: 'Database',
    title: 'Database Design, Management & Optimization',
    description: 'Relational and NoSQL database architecture (MySQL, PostgreSQL, Oracle), schema mappings, high-speed query optimization, and data integrity audits.'
  },
  {
    id: 's9',
    icon: 'BrainCircuit',
    title: 'AI Solutions & Intelligent Applications',
    description: 'Applied AI pipelines, smart recommendation systems, custom LLM integrations, and cognitive automation embedded directly into business workflows.'
  },
  {
    id: 's10',
    icon: 'Zap',
    title: 'Business Process Automation',
    description: 'Drastically reduce systemic operational overhead by replacing manual data tracking with automated background jobs, event triggers, and notifications.'
  },
  {
    id: 's11',
    icon: 'Search',
    title: 'SEO, Search Visibility & Digital Marketing',
    description: 'Technical SEO audits, search visibility optimization, paid advertising campaign management, and content strategy driving qualified organic traffic.'
  },
  {
    id: 's12',
    icon: 'LineChart',
    title: 'Analytics, CRO & Growth Strategy',
    description: 'Conversion rate optimization (CRO), user journey analytics, performance intelligence, and strategic technology consulting for sustainable business growth.'
  }
];

export const solutions: Solution[] = [
  {
    id: 'sol1',
    title: 'Wood World CRM & ERP',
    subtitle: 'ENTERPRISE MANUFACTURING & RETAIL',
    description: 'Comprehensive furniture brand management ERP and CRM ecosystem engineered from scratch to unify corporate operations, supply logistics, and multi-showroom sales.',
    features: [
      'Automated real-time inventory telemetry & stock level triggers',
      'Unified multi-showroom sales pipeline & customer relationship CRM',
      'Dynamic procurement tracking & supplier order management',
      'Automated invoice generation & financial reporting balance sheets'
    ],
    benefits: [
      'Slashed systemic operational overhead by eliminating manual paper logs',
      'Minimized data redundancy across warehouse, manufacturing, and retail',
      'Provided executive management with real-time operational transparency'
    ],
    ctaText: 'Explore ERP & CRM Architecture',
    imageAlt: 'Wood World ERP & CRM System Dashboard',
    imageTheme: 'blue'
  },
  {
    id: 'sol2',
    title: 'Restaurant Management & POS System',
    subtitle: 'HOSPITALITY & DINING OPERATIONS',
    description: 'Point-of-Sale (POS) and operations suite built for high-volume dining establishments, powering live table management, kitchen display systems (KDS), and billing.',
    features: [
      'High-speed touch POS terminal with split-second order entry',
      'Real-time Kitchen Display System (KDS) with live preparation timers',
      'Dynamic floor table layout management and reservation queues',
      'Daily sales analytics, inventory depletion tracking, and cash reconciliation'
    ],
    benefits: [
      'Reduced average order-to-kitchen transmission latency to milliseconds',
      'Eliminated dining billing discrepancies and lost order tickets',
      'Enhanced customer turnover speed during peak dining rush hours'
    ],
    ctaText: 'View Restaurant Management Tech',
    imageAlt: 'Restaurant Management System POS and KDS Interface',
    imageTheme: 'purple'
  },
  {
    id: 'sol3',
    title: 'Education Management System & LMS',
    subtitle: 'ACADEMIC & CAMPUS AUTOMATION',
    description: 'All-in-one cloud management platform for schools, colleges, and educational institutes, centralizing student lifecycle, biometric attendance, and fee collection.',
    features: [
      'High-speed biometric and QR gate attendance with automated SMS alerts to parents',
      'Automated student fee voucher generation, 1LINK/online payment reconciliation',
      'Comprehensive digital gradebooks, examination marks, and watermarked report cards',
      'Dedicated parent and teacher portals with real-time homework & progress updates'
    ],
    benefits: [
      'Reduced administrative overhead by 85% by eliminating physical paper registers',
      'Accelerated fee collection and minimized cash leakages with automated accounting',
      'Increased parent engagement and institutional transparency across campuses'
    ],
    ctaText: 'Explore Education System',
    imageAlt: 'Education Management System Campus Dashboard',
    imageTheme: 'cyan'
  },
  {
    id: 'sol4',
    title: 'Cloud Host Shop Infrastructure',
    subtitle: 'MULTI-TENANT HOSTING ARCHITECTURE',
    description: 'Core backend application infrastructure, automated hosting provisioning systems, and transaction APIs engineered for multi-tenant cloud hosting scalability.',
    features: [
      'Automated server and cPanel provisioning via secure transaction APIs',
      'Multi-tenant cloud architecture engineered for high availability and zero downtime',
      'Domain registration lifecycle management and DNS record routing',
      'Real-time server telemetry, automated resource monitoring, and load tracking'
    ],
    benefits: [
      'Flawless script execution and high backend reliability under heavy platform usage',
      'Zero-touch automated customer onboarding and hosting package activation',
      'Scalable hosting infrastructure capable of expanding to thousands of domains'
    ],
    ctaText: 'Review Cloud Infrastructure',
    imageAlt: 'Cloud Host Shop Server Management Architecture',
    imageTheme: 'indigo'
  },
  {
    id: 'sol5',
    title: 'AsanCar Automotive Marketplace',
    subtitle: 'HIGH-EFFICIENCY DIGITAL MARKETPLACE',
    description: 'Automotive marketplace platform engineered for rapid database query speeds, comprehensive device responsiveness, and maximizing visitor-to-lead conversions.',
    features: [
      'Sub-150ms vehicle listing search with multi-parameter faceted filtering',
      'Lightweight client-side rendering mechanics boosting page speed stats',
      'High-conversion dealer contact prompts and buyer inquiry forms',
      'Structured vehicle data schemas with high-resolution image optimization'
    ],
    benefits: [
      'Maximized organic search rankings through clean technical SEO architecture',
      'Delivered fluid, seamless browsing experience across all mobile viewports',
      'Significantly boosted conversion rates from casual visitors to qualified vehicle leads'
    ],
    ctaText: 'View Automotive Platform',
    imageAlt: 'AsanCar Automotive Marketplace Interface',
    imageTheme: 'cyan'
  },
  {
    id: 'sol6',
    title: 'Pro Care Homes UK Healthcare Portal',
    subtitle: 'HEALTHCARE SECTOR DIGITAL PRESENCE',
    description: 'Conversion-oriented web portal tailored for the international UK healthcare and residential care sector, prioritizing data security, layout hierarchy, and compliance.',
    features: [
      'Clear care home service hierarchy for elderly and specialist nursing care',
      'GDPR-aligned family inquiry forms with secure dispatch pipelines',
      'Accessibility-focused UI design compliant with international readability standards',
      'Mobile-optimized care home facility tour showcases and service breakdowns'
    ],
    benefits: [
      'Elevated trust and brand prestige for healthcare facilities in the UK',
      'Streamlined prospective resident inquiry intake for care home administration',
      'Ensured robust compliance and data confidentiality for sensitive family inquiries'
    ],
    ctaText: 'Explore Healthcare Web Tech',
    imageAlt: 'Pro Care Homes UK Healthcare Portal Layout',
    imageTheme: 'indigo'
  },
  {
    id: 'sol7',
    title: 'DayBreak Weekly Digital News Portal',
    subtitle: 'UK DIGITAL JOURNALISM & MEDIA',
    description: 'High-traffic digital journalism and news publication platform designed for the UK market, delivering rapid article distribution and optimized editorial workflows.',
    features: [
      'Modern digital publication layout engineered for high reader engagement',
      'Sub-second article page delivery with edge caching and image optimization',
      'Categorized editorial news sections with trending article algorithms',
      'SEO-structured article markup for immediate Google News indexation'
    ],
    benefits: [
      'Handles heavy concurrent readership traffic during breaking news cycles with zero lag',
      'Maximized reader dwell time with frictionless reading experience',
      'Empowers journalists with streamlined content publishing workflows'
    ],
    ctaText: 'See Media Platform',
    imageAlt: 'DayBreak Weekly Digital News Layout',
    imageTheme: 'purple'
  },
  {
    id: 'sol8',
    title: 'NutriBake & Shafaaf Platforms',
    subtitle: 'NUTRITION & DISTRIBUTION LOGISTICS',
    description: 'Digital solutions spanning specialized health & bakery commerce (NutriBake — Under Process) and pure mineral water distribution logistics (Shafaaf).',
    features: [
      'NutriBake (.lab / .pk): Specialized health nutrition & artisanal bakery digital platform (Under Process)',
      'Shafaaf: Water bottle subscription delivery tracking, customer route dispatch & bottle returns ledger',
      'Automated customer reordering schedules and recurring billing automation',
      'Real-time delivery fulfillment telemetry for logistics drivers'
    ],
    benefits: [
      'NutriBake: Engineered brand positioning for functional nutrition and healthy bakery products',
      'Shafaaf: Replaced manual paper delivery manifests with transparent digital routing',
      'Minimized product delivery loss and automated customer billing cycles'
    ],
    ctaText: 'View Specialized Solutions',
    imageAlt: 'NutriBake and Logistics System Preview',
    imageTheme: 'blue'
  }
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Wood World CRM & ERP',
    category: 'Enterprise Solutions',
    industry: 'Manufacturing',
    techStack: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'REST APIs'],
    overview: 'Architected and built a comprehensive furniture brand management ERP and CRM ecosystem completely from scratch to unify corporate operations, inventory telemetry, and sales pipelines.',
    results: [
      'Slashed systemic operational overhead by eliminating manual spreadsheets',
      'Automated real-time inventory telemetry across manufacturing and retail showrooms',
      'Replaced legacy tracking with optimized, single-pane software automation'
    ],
    imageTheme: 'blue',
    liveUrl: 'https://woodworld.pk',
    status: 'Production Live'
  },
  {
    id: 'p2',
    title: 'Cloud Host Shop',
    category: 'Cloud Solutions',
    industry: 'Cloud Hosting',
    techStack: ['PHP', 'MySQL', 'cPanel API', 'Linux', 'Server Architecture'],
    overview: 'Engineered core backend application infrastructure and optimized cloud hosting platform structures for multi-tenant scalability, automated provisioning, and transaction APIs.',
    results: [
      'Programmed secure automated provisioning systems and payment transaction APIs',
      'Ensured high backend reliability and flawless script execution under active usage',
      'Optimized multi-tenant hosting architectures for zero-downtime operations'
    ],
    imageTheme: 'indigo',
    liveUrl: 'https://cloudhostshop.com',
    status: 'Production Live'
  },
  {
    id: 'p3',
    title: 'AsanCar Webpage',
    category: 'Web Applications',
    industry: 'Automotive',
    techStack: ['React', 'JavaScript', 'Tailwind CSS', 'REST APIs', 'Node.js'],
    overview: 'Developed a high-efficiency automotive marketplace platform engineered for rapid database query speeds, comprehensive device responsiveness, and visitor-to-lead conversion.',
    results: [
      'Sub-150ms query response speeds across extensive vehicle inventory listings',
      'Clean client-side rendering mechanics boosting Google Lighthouse performance stats',
      'Streamlined buyer-to-dealer inquiry flows maximizing lead acquisition'
    ],
    imageTheme: 'cyan',
    liveUrl: 'https://asancars.co',
    status: 'Production Live'
  },
  {
    id: 'p4',
    title: 'Pro Care Homes UK',
    category: 'Web Applications',
    industry: 'Healthcare',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'GDPR Enclave'],
    overview: 'Built and launched a highly polished, conversion-oriented web portal tailored for the international UK healthcare sector, prioritizing data security and layout hierarchy.',
    results: [
      'Established authoritative digital presence for UK residential elderly care homes',
      'Implemented secure, GDPR-compliant inquiry dispatch for prospective residents',
      'Delivered WCAG-compliant accessibility and intuitive mobile navigation'
    ],
    imageTheme: 'indigo',
    liveUrl: 'https://procarehomes.co.uk',
    status: 'Production Live'
  },
  {
    id: 'p5',
    title: 'Travelio.pk',
    category: 'Web Applications',
    industry: 'Travel & Tourism',
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'REST APIs'],
    overview: 'Modern online travel agency and tour booking platform in Pakistan, offering curated travel packages, destination guides, and seamless booking reservation inquiries.',
    results: [
      'Fast-loading visual tour catalog with interactive itinerary breakdowns',
      'Mobile-first responsive design tailored for travelers on cellular connections',
      'Integrated direct booking inquiry pipelines connecting travelers with tour operators'
    ],
    imageTheme: 'blue',
    liveUrl: 'https://travelio.pk',
    status: 'Production Live'
  },
  {
    id: 'p6',
    title: 'DayBreak Weekly UK',
    category: 'Web Applications',
    industry: 'Media & Publishing',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Edge CDN'],
    overview: 'Digital news publication and investigative journalism platform serving the UK market with high-volume article publishing, trending news feeds, and reader engagement tools.',
    results: [
      'Sub-second article page load speeds across UK and international readers',
      'Optimized editorial layout promoting prolonged reader dwell times',
      'Clean metadata schemas for Google News and search engine indexation'
    ],
    imageTheme: 'purple',
    liveUrl: 'https://daybreakweekly.co.uk',
    status: 'Production Live'
  },
  {
    id: 'p7',
    title: 'Top Discounts UK',
    category: 'Web Applications',
    industry: 'E-Commerce',
    techStack: ['React', 'Node.js', 'Tailwind CSS', 'REST APIs'],
    overview: 'High-volume UK deals, retailer discount vouchers, and promo code aggregation platform designed for frictionless coupon discovery and shopper savings.',
    results: [
      'Instant coupon code search with real-time store category filtering',
      'Optimized affiliate click-through routing and tracking telemetry',
      'Lightweight front-end architecture handling heavy promotional shopper traffic'
    ],
    imageTheme: 'purple',
    liveUrl: 'https://topdiscounts.co.uk',
    status: 'Production Live'
  },
  {
    id: 'p8',
    title: 'Bhopali Delights & BBQ Kolachi',
    category: 'Web Applications',
    industry: 'Hospitality',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'PHP'],
    overview: 'Managed end-to-end digital presence, visual performance, and fast media loading for renowned authentic culinary dining brands Bhopali Delights and BBQ Kolachi.',
    results: [
      'High-resolution visual menu presentations with lightning-fast mobile loading',
      'Zero-downtime server setups ensuring 24/7 menu and location accessibility',
      'Direct order and reservation contact channels boosting dining patronage'
    ],
    imageTheme: 'cyan',
    liveUrl: 'https://bhopalidelights.com',
    status: 'Production Live'
  },
  {
    id: 'p9',
    title: 'Education Management System (SMS & LMS)',
    category: 'Enterprise Solutions',
    industry: 'Education',
    techStack: ['React', 'Node.js', 'MySQL', 'Biometric APIs', '1LINK Gateway'],
    overview: 'Comprehensive campus management platform unifying student admissions, biometric attendance, itemized fee invoicing, examination gradebooks, and parent portals.',
    results: [
      '85% reduction in administrative paperwork overhead across campus departments',
      'Sub-50ms biometric turnstile gate verification with automated parent SMS alerts',
      'Zero-touch fee reconciliation eliminating manual bank voucher audits'
    ],
    imageTheme: 'cyan',
    status: 'Production Live'
  },
  {
    id: 'p10',
    title: 'Restaurant Management System & POS',
    category: 'Enterprise Solutions',
    industry: 'Hospitality',
    techStack: ['React', 'Node.js', 'Express', 'MySQL', 'WebSocket'],
    overview: 'Complete Point-of-Sale (POS), Real-Time Kitchen Display System (KDS), table reservation manager, and inventory depletion software engineered for high-volume restaurants.',
    results: [
      'Real-time order ticket transmission to kitchen screens in under 100ms',
      'Automated ingredient depletion tracking aligned with daily dish sales',
      'Multi-terminal billing with split-bill and customer loyalty support'
    ],
    imageTheme: 'purple',
    status: 'Production Live'
  },
  {
    id: 'p11',
    title: 'Shafaaf Water Distribution Logistics',
    category: 'SaaS Products',
    industry: 'Logistics',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Mapping APIs'],
    overview: 'Pure mineral water distribution, bottle asset tracking, customer delivery routing, and recurring billing subscription management software.',
    results: [
      'Optimized daily delivery driver routing, saving fuel and transit time',
      'Accurate returnable bottle asset tracking preventing container loss',
      'Automated recurring billing and digital invoice delivery for corporate clients'
    ],
    imageTheme: 'blue',
    status: 'Production Live'
  },
  {
    id: 'p12',
    title: 'NutriBake Platform',
    category: 'Product Engineering',
    industry: 'Food & Nutrition',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'E-Commerce Core'],
    overview: 'Specialized health, functional nutrition, and artisanal bakery platform under active R&D and digital development (.lab / .pk).',
    results: [
      'Active brand research, formulation cataloging, and digital storefront architecture',
      'Multi-domain deployment strategy spanning nutribake.pk and research lab portal',
      'Engineered for dietary transparency, ingredient certifications, and direct delivery'
    ],
    imageTheme: 'emerald',
    liveUrl: 'https://nutribake.pk',
    status: 'Under Process (R&D & Active Platform Engineering)'
  }
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Discovery & Strategy',
    description: 'We align deeply with your strategic company objectives, audit current technological roadblocks, and define the absolute ideal engineering outcome.'
  },
  {
    step: 2,
    title: 'Research & Planning',
    description: 'Laying down robust system schematics, prioritizing features, drafting strict API data flows, and establishing precise development timelines.'
  },
  {
    step: 3,
    title: 'UI/UX Design',
    description: 'Drafting high-fidelity, visually stunning interactive mockups reflecting modern luxury typography, spatial balance, and fluid wireframe user-paths.'
  },
  {
    step: 4,
    title: 'Development',
    description: 'Writing clean, beautifully modular, typed, and unit-tested codebases. Engineered with optimized build tooling and military-grade security baselines.'
  },
  {
    step: 5,
    title: 'Testing & QA',
    description: 'Subjecting the software to rigorous security penetration audits, structural edge-case tests, performance benchmarks, and user-acceptance validation.'
  },
  {
    step: 6,
    title: 'Deployment',
    description: 'Deploying the code smoothly into stable cloud host containers, ensuring multi-region fallback redundancy, self-healing setups, and optimal performance.'
  },
  {
    step: 7,
    title: 'Support & Growth',
    description: 'Continuously optimizing query speed, releasing high-value feature updates, and scaling server boundaries to align with your ongoing corporate growth.'
  }
];

export const comparisonData = {
  columns: ['Performance & Standard', 'MetaWave Innovations', 'Traditional Agencies'],
  rows: [
    { metric: 'Avg. Delivery Speed', metawave: '4-8 Weeks (via Agile & Automated Workflows)', traditional: '6-12 Months (Snail-paced processes & communication)' },
    { metric: 'Team Allocation', metawave: '100% Dedicated Elite Senior Technical Leaders', traditional: 'Overbooked Generalists swapped out post-sales' },
    { metric: 'AI & Automation Strategy', metawave: 'Native AI-assisted engineering & automated workflows included', traditional: 'Tack-on secondary plugins with premium markups' },
    { metric: 'System Architecture', metawave: 'Scalable cloud-native, serverless, microservices framework', traditional: 'Monolithic template-built stacks with high technical debt' },
    { metric: 'Security & Compliance', metawave: 'Strict enterprise baseline encryption & audit-trail logs', traditional: 'Treated as a secondary thought, low defensive scanning' },
    { metric: 'Long-Term Support', metawave: '24/7 proactive maintenance & immediate scaling assistance', traditional: 'Hourly retainers or single handover with limited bug support' },
    { metric: 'Business Impact Focus', metawave: 'Metrics-driven development focused on actual growth stats', traditional: 'Pure visual handoff focusing purely on design aesthetics' },
    { metric: 'Transparency', metawave: 'Real-time collaborative Slack channels & direct code repository access', traditional: 'Bi-weekly opaque update emails and slow ticket queues' }
  ]
};

export const techStack: TechCategory[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: 'Atom' },
      { name: 'Next.js', icon: 'Code2' },
      { name: 'Vue', icon: 'Compass' },
      { name: 'Angular', icon: 'Shield' }
    ]
  },
  {
    category: 'Backend',
    items: [
      { name: 'Laravel', icon: 'Layers' },
      { name: 'Node.js', icon: 'Cpu' },
      { name: 'Express', icon: 'Terminal' },
      { name: 'Python', icon: 'Braces' }
    ]
  },
  {
    category: 'Mobile',
    items: [
      { name: 'Flutter', icon: 'Smartphone' },
      { name: 'React Native', icon: 'Smartphone' }
    ]
  },
  {
    category: 'Cloud',
    items: [
      { name: 'AWS', icon: 'Cloud' },
      { name: 'Azure', icon: 'CloudLightning' },
      { name: 'Google Cloud', icon: 'Globe2' }
    ]
  },
  {
    category: 'Database',
    items: [
      { name: 'MySQL', icon: 'Database' },
      { name: 'PostgreSQL', icon: 'Database' },
      { name: 'MongoDB', icon: 'HardDrive' }
    ]
  },
  {
    category: 'DevOps',
    items: [
      { name: 'Docker', icon: 'Server' },
      { name: 'Kubernetes', icon: 'Workflow' },
      { name: 'CI/CD Pipelines', icon: 'GitMerge' }
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Chief Technology Officer',
    company: 'Vanguard Health Systems',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
    review: "MetaWave Innovations transformed our legacy electronic patient records system into an absolute masterpiece. Their engineering team is elite, delivering our secure telemedicine module weeks ahead of schedule. The code quality is immaculate.",
    rating: 5
  },
  {
    id: 't2',
    name: 'Marcus Thorne',
    role: 'VP of Digital Product',
    company: 'Apex Trading Corp',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    review: "The business intelligence dashboard created by MetaWave processes billions of streaming transactions seamlessly. Their standard of visual hierarchy and microsecond query response times feels like absolute magic. A phenomenal partner.",
    rating: 5
  },
  {
    id: 't3',
    name: 'Elena Rostova',
    role: 'Founder & CEO',
    company: 'Aura Luxury Group',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    review: "Our visual identity, localized high-contrast storefront, and automated warehousing backend were launched flawlessly. Working with MetaWave felt like having a co-founder with infinite technological wisdom. Our checkouts surged immediately.",
    rating: 5
  },
  {
    id: 't4',
    name: 'David Chen',
    role: 'Director of Operations',
    company: 'Logix Global Logistics',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    review: "Route optimization algorithms and real-time transit telemetry built by MetaWave cut down our fleet fuel expenses by a solid 18%. Their transparent communication and active support are second to none in this industry.",
    rating: 5
  }
];

export const industries = [
  { name: 'Healthcare', icon: 'HeartPulse', count: '24 Projects' },
  { name: 'Real Estate', icon: 'Building', count: '18 Projects' },
  { name: 'Education', icon: 'GraduationCap', count: '12 Projects' },
  { name: 'Finance', icon: 'Coins', count: '20 Projects' },
  { name: 'Retail', icon: 'ShoppingBag', count: '15 Projects' },
  { name: 'Manufacturing', icon: 'Factory', count: '8 Projects' },
  { name: 'Logistics', icon: 'Truck', count: '11 Projects' },
  { name: 'Government', icon: 'Scale', count: '5 Projects' },
  { name: 'Startups', icon: 'Rocket', count: '32 Projects' },
  { name: 'Non-Profit Organizations', icon: 'Globe2', count: '7 Projects' }
];

export const trusteeLogos = [
  'React',
  'Next.js',
  'Laravel',
  'Flutter',
  'Node.js',
  'Python',
  'AWS',
  'Azure',
  'Docker',
  'Kubernetes'
];

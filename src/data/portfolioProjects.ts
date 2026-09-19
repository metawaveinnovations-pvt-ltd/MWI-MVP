export type CategoryFilter = 
  | 'All Works'
  | 'Enterprise Solutions'
  | 'AI Solutions'
  | 'SaaS Products'
  | 'Web Applications'
  | 'Mobile Applications'
  | 'Cloud Solutions'
  | 'Client Success Stories'
  | 'Product Engineering';

export type IndustryFilter = 
  | 'All Industries'
  | 'Healthcare'
  | 'FinTech'
  | 'Education'
  | 'Real Estate'
  | 'Logistics'
  | 'Retail'
  | 'Manufacturing'
  | 'Hospitality'
  | 'Government'
  | 'E-Commerce'
  | 'AI & Automation';

export interface PortfolioProject {
  id: string;
  title: string;
  category: CategoryFilter;
  industry: IndustryFilter;
  clientType: string;
  status: string;
  bannerImg: string;
  galleryImgs: string[];
  badgeTag: string;
  liveUrl?: string;
  
  // Executive summaries
  overview: string;
  problemStatement: string;
  solutionProvided: string;
  
  // Key Features & Value
  coreFeatures: string[];
  techStack: string[];
  businessOutcomes: string[];
  deliverables: string[];
  clientRequirements: string[];
  businessValueMetric: string;

  // Rich Case Study Details
  caseStudy?: {
    challenge: string;
    approach: string;
    keyInnovations: string[];
    results: string[];
  };
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'wood-world-crm-erp',
    title: 'Wood World ERP & CRM Enterprise Suite',
    category: 'Enterprise Solutions',
    industry: 'Manufacturing',
    clientType: 'Wood World Enterprise Furniture Brand',
    status: 'Production Live',
    liveUrl: 'https://woodworld.pk',
    badgeTag: 'ENTERPRISE ERP & CRM',
    bannerImg: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1200&auto=format&fit=crop',
    galleryImgs: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop'
    ],
    overview: 'Architected and engineered a comprehensive furniture brand management ERP and CRM ecosystem completely from scratch using Laravel, PHP, MySQL, and Tailwind CSS. Unifies multi-showroom retail operations, real-time inventory telemetry, supplier logistics, and customer relationship pipelines under a single intuitive interface.',
    problemStatement: 'The enterprise operated multi-showroom sales and manufacturing workshops across disparate spreadsheets, paper manifests, and fragmented communication channels, resulting in inventory miscounts, delayed order fulfillment, and delayed financial reconciliation.',
    solutionProvided: 'Engineered a bespoke, unified web-based ERP and CRM application featuring real-time stock depletion tracking, automated supplier procurement triggers, customer quotation-to-invoice workflows, and executive financial dashboards.',
    coreFeatures: [
      'Real-time multi-showroom inventory telemetry with dynamic stock depletion',
      'Custom quotation builder and automated tax invoice generation in seconds',
      'Supplier purchase order tracking & dynamic procurement pipeline',
      'Integrated customer CRM with order history, delivery scheduling & follow-up',
      'Automated daily ledger balance sheets and financial cash flow reporting',
      'Granular Role-Based Access Control (RBAC) for floor salesmen and executive directors'
    ],
    techStack: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'Alpine.js', 'REST APIs', 'Blade'],
    businessOutcomes: [
      'Eliminated 100% of manual paper tracking and double-entry discrepancies',
      'Reduced customer quotation generation turnaround from hours to seconds',
      'Unified manufacturing workshop supply orders with live retail showroom demand',
      'Empowered executive leadership with real-time visibility into multi-showroom revenue'
    ],
    deliverables: [
      'Complete custom web application codebase with modular MVC architecture',
      'Optimized relational database schema with performance indexing',
      'Production deployment on high-availability web hosting servers',
      'Staff and administrative operational training documentation'
    ],
    clientRequirements: [
      'Full source code and intellectual property ownership',
      'Fast, responsive interface suitable for showroom tablet usage',
      'Sub-second search speeds across extensive catalog inventory SKUs'
    ],
    businessValueMetric: 'Eliminated 100% paper logs & unified inventory telemetry',
    caseStudy: {
      challenge: 'Fragmented operations across workshops and retail outlets caused frequent stockouts, lost sales opportunities, and delayed customer deliveries.',
      approach: 'Mapped the complete manufacturing, procurement, and showroom sales lifecycle into a unified relational database with intuitive Tailwind-styled control surfaces.',
      keyInnovations: [
        'Automated stock level threshold alarms alerting procurement managers',
        'One-click PDF quotation and tax invoice generator with corporate branding',
        'Role-based permission matrix safeguarding sensitive cost and margin data'
      ],
      results: [
        '100% elimination of double-entry ledger discrepancies',
        'Over 40% reduction in order processing turnaround',
        'Zero downtime since initial production launch'
      ]
    }
  },
  {
    id: 'cloud-host-shop',
    title: 'Cloud Host Shop Infrastructure & Provisioning Engine',
    category: 'Cloud Solutions',
    industry: 'AI & Automation',
    clientType: 'Cloud Host Shop (Hosting Provider)',
    status: 'Production Live',
    liveUrl: 'https://cloudhostshop.com',
    badgeTag: 'CLOUD INFRASTRUCTURE',
    bannerImg: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    galleryImgs: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop'
    ],
    overview: 'Engineered core backend application infrastructure and multi-tenant hosting management systems for Cloud Host Shop. Built automated server and cPanel provisioning systems, domain lifecycle APIs, and secure payment transaction routing.',
    problemStatement: 'Manual activation of cloud hosting packages, domain registrations, and server configuration caused significant operational overhead, customer onboarding delays, and human error.',
    solutionProvided: 'Constructed robust API wrappers around cPanel/WHM and domain registrar backends with asynchronous worker queues, automated provisioning triggers, and payment verification gateways.',
    coreFeatures: [
      'Automated cPanel account creation, DNS setup, and quota provisioning',
      'Domain lookup, registration, renewal, and DNS management APIs',
      'Secure transaction processing and recurring subscription billing automation',
      'Real-time server telemetry, automated resource monitoring, and load tracking',
      'Customer self-service hosting control console with one-click script installers'
    ],
    techStack: ['PHP', 'MySQL', 'cPanel / WHM APIs', 'Linux SysAdmin', 'REST APIs', 'Bash', 'SSL Automation'],
    businessOutcomes: [
      'Automated customer server provisioning in under 30 seconds from payment',
      'Achieved 99.99% hosting backend uptime and script reliability',
      'Drastically minimized customer support tickets regarding initial account setup'
    ],
    deliverables: [
      'Backend application provisioning engine with asynchronous queue listeners',
      'REST API microservice connectors bridging billing and server WHM daemons',
      'Production server deployment, firewall configuration, and SSL hardening',
      'Transaction verification audit logs and telemetry dashboard'
    ],
    clientRequirements: [
      'Multi-tenant isolation and security compliance across hosted instances',
      'Fault-tolerant payment webhook handling with idempotent execution',
      'Scalable architecture ready for thousands of domain assets'
    ],
    businessValueMetric: 'Zero-touch automated server & cPanel provisioning in 30s',
    caseStudy: {
      challenge: 'Hosting setups required manual server intervention, creating high latency between payment confirmation and customer service access.',
      approach: 'Built asynchronous webhook listeners and API bridges connecting payment gateways directly to server WHM provisioning daemons.',
      keyInnovations: [
        'Instant idempotent server provisioning scripts',
        'Automated SSL certificate issuance and DNS propagation checks',
        'Encrypted customer credential delivery via transactional email'
      ],
      results: [
        'Near-instant customer activation time',
        'Handled spike traffic during hosting promotion campaigns flawlessly',
        'Substantial reduction in manual engineering interventions'
      ]
    }
  },
  {
    id: 'asancar-automotive-marketplace',
    title: 'AsanCar Automotive Marketplace Engine',
    category: 'Web Applications',
    industry: 'Retail',
    clientType: 'AsanCar Automotive Platform',
    status: 'Production Live',
    liveUrl: 'https://asancars.co',
    badgeTag: 'DIGITAL MARKETPLACE',
    bannerImg: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop',
    galleryImgs: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=1200&auto=format&fit=crop'
    ],
    overview: 'Developed a high-efficiency automotive marketplace platform engineered for rapid database query speeds, comprehensive device responsiveness, faceted vehicle searching, and maximizing visitor-to-lead conversion.',
    problemStatement: 'Automotive buyers on mobile devices in emerging markets frequently face slow listing catalogs, heavy uncompressed images, and cumbersome dealer communication forms.',
    solutionProvided: 'Engineered a lightning-fast React and Tailwind CSS frontend powered by optimized REST API endpoints, image compression pipelines, and streamlined WhatsApp/phone lead capture.',
    coreFeatures: [
      'Faceted search by make, model, year, price, mileage, and city in under 150ms',
      'Responsive vehicle photo gallery with high-speed thumbnail caching',
      'Direct WhatsApp and click-to-call buyer lead generation hooks',
      'Vehicle verification badge indicators and inspection report viewers',
      'Dealer inventory management and streamlined listing submission portal'
    ],
    techStack: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Express', 'MySQL', 'REST APIs'],
    businessOutcomes: [
      'Sub-second page loads across cellular 3G/4G networks',
      'Significant uplift in qualified buyer-to-seller inquiry conversions',
      'Maintained 95+ score on Google Lighthouse mobile performance audits'
    ],
    deliverables: [
      'Full responsive web marketplace frontend with modern component structure',
      'Optimized search and filtering backend APIs with SQL indexing',
      'SEO schemas for vehicle markup and Open Graph social sharing cards',
      'Mobile viewport optimization for small-screen smartphones'
    ],
    clientRequirements: [
      'High performance on mid-range Android smartphones and cellular data',
      'Intuitive search filters with zero UI lag',
      'Instant lead routing to certified car dealerships'
    ],
    businessValueMetric: 'Sub-150ms vehicle search query response & lead capture',
    caseStudy: {
      challenge: 'Slow mobile browsing speeds were causing over 60% bounce rates on vehicle inventory listing pages.',
      approach: 'Implemented client-side debounce search, lazy-loaded asset pipelines, and lightweight Tailwind utility styling.',
      keyInnovations: [
        'Faceted multi-filter engine executing in client memory',
        'Instant WhatsApp inquiry dispatch with pre-filled vehicle details',
        'Adaptive image CDN delivery serving optimized WebP formats'
      ],
      results: [
        'Page load speeds improved by over 2.8x',
        'Listing bounce rate plummeted by 38%',
        'Dealer inquiries increased month-over-month'
      ]
    }
  },
  {
    id: 'procare-homes-uk',
    title: 'Pro Care Homes UK Healthcare Web Portal',
    category: 'Web Applications',
    industry: 'Healthcare',
    clientType: 'Pro Care Homes UK',
    status: 'Production Live',
    liveUrl: 'https://procarehomes.co.uk',
    badgeTag: 'HEALTHCARE TECH',
    bannerImg: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop',
    galleryImgs: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop'
    ],
    overview: 'Built and launched a conversion-oriented digital healthcare portal tailored for the international UK residential care sector. Prioritizes data security, layout hierarchy, accessibility, and intuitive family inquiry pathways.',
    problemStatement: 'Families seeking elderly residential care require clear reassurance, comprehensive facility information, and confidential inquiry methods, which outdated healthcare websites failed to convey.',
    solutionProvided: 'Designed a calm, accessible web portal featuring structured care service breakdowns, facility virtual tours, staff credential showcases, and an encrypted inquiry submission pipeline.',
    coreFeatures: [
      'Accessible layout compliant with UK healthcare readability guidelines',
      'Confidential family assessment inquiry forms with instant encrypted email dispatch',
      'Interactive room and specialized nursing care service guides',
      'Staff qualification profiles and CQC compliance indicators',
      'Location maps and visiting hour scheduling requests'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Encrypted Webhook API', 'Vite'],
    businessOutcomes: [
      'Substantial increase in qualified family consultation bookings',
      'Established authoritative digital presence and trust in the UK healthcare market',
      'Full adherence to GDPR data handling and accessibility guidelines'
    ],
    deliverables: [
      'Complete modern web portal frontend & backend dispatch pipeline',
      'Mobile-first responsive layouts across phone, tablet, and desktop',
      'Security headers and SSL hardening configuration',
      'Content management structure for care updates and notices'
    ],
    clientRequirements: [
      'Accessible typography and high visual contrast for all age demographics',
      'Strict confidentiality of family contact submissions',
      'Fast load times across UK broadband and mobile networks'
    ],
    businessValueMetric: 'GDPR-aligned family inquiry intake & care home trust',
    caseStudy: {
      challenge: 'Prospective families found traditional care home websites intimidating and difficult to navigate when evaluating critical elderly care options.',
      approach: 'Architected an empathetic user journey with gentle colors, prominent contact options, and transparent care descriptions.',
      keyInnovations: [
        'Progressive inquiry form reducing perceived cognitive friction',
        'Accessibility contrast controls adhering to WCAG AA standards',
        'Instant encrypted notification relay to care home coordinators'
      ],
      results: [
        'Care inquiry conversion increased by 45%',
        'Zero privacy or GDPR compliance concerns',
        'Client secured sustained residential capacity bookings'
      ]
    }
  },
  {
    id: 'travelio-pk',
    title: 'Travelio.pk Travel & Tours Booking Platform',
    category: 'Web Applications',
    industry: 'Hospitality',
    clientType: 'Travelio Pakistan',
    status: 'Production Live',
    liveUrl: 'https://travelio.pk',
    badgeTag: 'TRAVEL & HOSPITALITY',
    bannerImg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    galleryImgs: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop'
    ],
    overview: 'Modern online travel agency and tour reservation platform in Pakistan, offering curated travel packages, northern area destination guides (Hunza, Skardu, Swat, Kashmir), and seamless booking reservation inquiries.',
    problemStatement: 'Travelers struggled with disorganized tour packages, unclear itinerary schedules, and manual coordination across messaging apps without standardized confirmation.',
    solutionProvided: 'Engineered an interactive travel portal showcasing categorized tour packages, day-by-day itineraries, dynamic group pricing calculators, and instant inquiry channels.',
    coreFeatures: [
      'Interactive day-by-day tour itinerary visualizer with map routes',
      'Custom package cost calculator based on traveler group size and season',
      'High-definition destination photography galleries with mobile optimization',
      'Direct WhatsApp & web reservation confirmation channels',
      'Customer reviews and verified traveler testimonials'
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'REST APIs', 'Cloudflare'],
    businessOutcomes: [
      'Streamlined seasonal booking influx for northern Pakistan tours',
      'Reduced booking coordination time by 60% with standardized forms',
      'Sub-second mobile responsiveness across tourist hotspots'
    ],
    deliverables: [
      'Responsive travel agency web platform with vibrant visual styling',
      'Tour package catalog management backend',
      'Social media integration & lead capture hooks',
      'Performance optimization for cellular connectivity'
    ],
    clientRequirements: [
      'Vibrant, high-engagement visual aesthetics highlighting scenic landscapes',
      'Mobile responsiveness for travelers on the go',
      'Instant tour inquiry dispatch to travel coordinators'
    ],
    businessValueMetric: 'Instant curated tour booking inquiries & group calculator',
    caseStudy: {
      challenge: 'Peak summer holiday inquiries overwhelmed operators with manual price calculations and itinerary sharing.',
      approach: 'Constructed self-contained tour package cards with dynamic day breakdown accordions and group pricing estimators.',
      keyInnovations: [
        'Dynamic tour pricing calculation widget',
        'One-touch booking inquiry generator pre-filling selected dates',
        'Edge-cached image delivery ensuring rapid load times'
      ],
      results: [
        'Inquiry-to-booking conversion doubled during peak season',
        '100% positive traveler feedback on ease of use',
        'Substantially reduced manual administrative workload'
      ]
    }
  },
  {
    id: 'daybreak-weekly-uk',
    title: 'DayBreak Weekly UK Digital News & Journalism Portal',
    category: 'Web Applications',
    industry: 'Retail',
    clientType: 'DayBreak Weekly Media UK',
    status: 'Production Live',
    liveUrl: 'https://daybreakweekly.co.uk',
    badgeTag: 'DIGITAL MEDIA & NEWS',
    bannerImg: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop',
    galleryImgs: [
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1200&auto=format&fit=crop'
    ],
    overview: 'High-traffic digital journalism and news publication platform designed for the UK market, delivering rapid article distribution, categorized editorial columns, and optimized news consumption.',
    problemStatement: 'Online news publications face harsh readership drop-offs if articles load slowly, suffer from layout shifts during ad loads, or present difficult reading typography.',
    solutionProvided: 'Architected an editorial news platform with server-side caching, fluid typography hierarchies, categorized news taxonomies, and instant social sharing integrations.',
    coreFeatures: [
      'Categorized editorial news sections (Politics, Business, UK, World, Culture)',
      'Editorial breaking news ticker and trending article radar',
      'Rich reading experience with custom font scales and dark/light modes',
      'Structured Google News schema and Open Graph metadata for social distribution',
      'Newsletter subscription pipeline and reader comment threads'
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'Edge CDN', 'Vercel'],
    businessOutcomes: [
      'Zero downtime during breaking news spikes with 100k+ concurrent readers',
      'Extended reader average session duration to over 3.8 minutes',
      'Immediate indexation on Google News via clean schema tags'
    ],
    deliverables: [
      'Complete digital publication website with high typographic craft',
      'Editorial content management workflow and article editor',
      'Edge caching and CDN routing architecture',
      'Social preview card generators for news tweets and posts'
    ],
    clientRequirements: [
      'Sub-second page delivery across UK mobile networks',
      'Zero Cumulative Layout Shift (CLS) for editorial integrity',
      'High editorial scalability for breaking news alerts'
    ],
    businessValueMetric: 'Sub-second article delivery under breaking traffic surges',
    caseStudy: {
      challenge: 'Breaking news traffic surges were causing database timeouts on the previous content management system.',
      approach: 'Transitioned to an edge-cached static-regeneration architecture where articles are distributed globally in milliseconds.',
      keyInnovations: [
        'Edge-cached article distribution with instantaneous purge on publish',
        'Clean typographic reading hierarchy utilizing high-contrast editorial fonts',
        'Instant social quote sharing with automated Twitter cards'
      ],
      results: [
        '99.99% uptime through nationwide election news spikes',
        'Over 250% increase in monthly pageviews',
        'Recognized for exceptional reading typography'
      ]
    }
  },
  {
    id: 'top-discounts-uk',
    title: 'Top Discounts UK Deals & Voucher Savings Platform',
    category: 'Web Applications',
    industry: 'E-Commerce',
    clientType: 'Top Discounts UK',
    status: 'Production Live',
    liveUrl: 'https://topdiscounts.co.uk',
    badgeTag: 'E-COMMERCE & VOUCHERS',
    bannerImg: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop',
    galleryImgs: [
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556742049-0a67e5572263?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop'
    ],
    overview: 'High-volume UK deals, retailer discount vouchers, and promotional coupon aggregator designed for frictionless voucher discovery, category filtering, and shopper savings.',
    problemStatement: 'Shoppers abandon discount websites when expired coupon codes are displayed or when intrusive popups prevent easy code copying.',
    solutionProvided: 'Engineered a lightweight, high-speed coupon discovery engine with one-click code copying, real-time store category filters, and verified badge indicators.',
    coreFeatures: [
      'Faceted store and category navigation covering top UK retailers',
      'One-click copy coupon code with automated outbound merchant redirection',
      'Deal expiration timers and community verification badges',
      'Trending deals leaderboard and staff hand-picked discounts',
      'Automated affiliate link rewriting and tracking telemetry'
    ],
    techStack: ['React', 'Node.js', 'Tailwind CSS', 'REST APIs', 'Express', 'Affiliate Tracking APIs'],
    businessOutcomes: [
      'Processed hundreds of thousands of shopper searches monthly',
      'Achieved high affiliate click-through conversion rates',
      'Maintained sub-200ms catalog search times across 5,000+ active deals'
    ],
    deliverables: [
      'High-speed consumer voucher web platform',
      'Merchant voucher indexing backend with expiration triggers',
      'Affiliate tracking redirects and revenue analytics',
      'SEO landing page generator for retailer keywords'
    ],
    clientRequirements: [
      'Instant search filtering without page reloads',
      'Reliable affiliate link redirection and tracking',
      'Clean, ad-clutter-free user experience'
    ],
    businessValueMetric: 'Instant coupon code copy & affiliate tracking telemetry',
    caseStudy: {
      challenge: 'High drop-offs caused by slow search responsiveness and broken coupon copy triggers on mobile devices.',
      approach: 'Built an in-memory client search cache with touch-optimized copy-to-clipboard interactions.',
      keyInnovations: [
        'Instant clipboard copy with seamless merchant tab opening',
        'Faceted store category chips with instant client filter',
        'Automated code expiration checks flagging expired vouchers'
      ],
      results: [
        'Affiliate revenue grew by 54% within 90 days',
        'Zero friction for mobile shoppers copying codes',
        'Expanded to cover hundreds of UK retail brands'
      ]
    }
  },
  {
    id: 'bhopali-delights-bbq-kolachi',
    title: 'Bhopali Delights & BBQ Kolachi Web Experiences',
    category: 'Web Applications',
    industry: 'Hospitality',
    clientType: 'Bhopali Delights & BBQ Kolachi Restaurants',
    status: 'Production Live',
    liveUrl: 'https://bhopalidelights.com',
    badgeTag: 'CULINARY & HOSPITALITY',
    bannerImg: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop',
    galleryImgs: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop'
    ],
    overview: 'Engineered comprehensive digital presence, visual menu presentations, and customer booking portals for renowned authentic culinary dining brands Bhopali Delights and BBQ Kolachi.',
    problemStatement: 'High-end dining establishments required high-resolution visual menus, brand prestige, and reliable direct customer communication without depending exclusively on third-party aggregators.',
    solutionProvided: 'Developed dedicated branded web experiences showcasing signature dishes with high-speed image optimization, dining ambiance showcases, interactive menus, and direct table booking channels.',
    coreFeatures: [
      'Interactive visual food menu with detailed ingredients and pricing',
      'Direct WhatsApp and phone table reservation channels',
      'Catering order inquiry calculators for corporate and private events',
      'Location maps, branch timings, and customer dining reviews',
      'Optimized mobile performance for diners searching nearby on smartphones'
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'PHP', 'Hosting Architecture'],
    businessOutcomes: [
      'Significant increase in direct dining table reservations and catering leads',
      'Zero downtime during weekend rush periods and festival seasons',
      'Enhanced brand prestige through professional photography presentation'
    ],
    deliverables: [
      'Custom restaurant web applications tailored for each culinary brand',
      'High-resolution optimized food gallery assets in modern WebP',
      'Google Maps business profile synchronization and review integration',
      'High-performance domain hosting and SSL security setup'
    ],
    clientRequirements: [
      'Mouthwatering visual appeal with sub-second page loads',
      'Effortless menu updates for seasonal specials',
      'Direct customer contact without third-party aggregator commission fees'
    ],
    businessValueMetric: 'Zero-downtime visual dining menu & direct reservations',
    caseStudy: {
      challenge: 'Third-party delivery platforms took heavy commissions, and the restaurants lacked a direct digital channel for high-value catering and reservation inquiries.',
      approach: 'Built high-converting, mobile-first brand showcases with instant reservation prompts and catering calculators.',
      keyInnovations: [
        'Compressed WebP visual menu cards loading instantly',
        'One-touch WhatsApp catering booking generator pre-filling guest count',
        'Multi-branch location selector with live Google Maps directions'
      ],
      results: [
        'Direct catering inquiries surged by 70%',
        'Over 10,000 monthly visual menu views per location',
        'Zero commission paid to third-party delivery apps on direct catering'
      ]
    }
  },
  {
    id: 'restaurant-management-pos-kds',
    title: 'Restaurant Management System, POS & Kitchen Display',
    category: 'Enterprise Solutions',
    industry: 'Hospitality',
    clientType: 'Commercial Restaurant Chains & Dining Venues',
    status: 'Production Live',
    badgeTag: 'POS & RESTAURANT ERP',
    bannerImg: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop',
    galleryImgs: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop'
    ],
    overview: 'Complete Point-of-Sale (POS), Real-Time Kitchen Display System (KDS), table reservation manager, and inventory depletion software engineered for high-volume restaurants.',
    problemStatement: 'Dining rooms suffered from lost paper tickets, miscommunicated kitchen modifications, slow billing at peak dining rush, and inventory discrepancies between ingredients purchased and dishes sold.',
    solutionProvided: 'Architected an integrated cloud-connected restaurant management system with touch POS ordering, instant WebSocket-powered kitchen display timers, dynamic floor table maps, and recipe-based ingredient stock depletion.',
    coreFeatures: [
      'Touchscreen POS terminal with custom modifiers and split-bill payments',
      'Real-time Kitchen Display System (KDS) with color-coded preparation timers',
      'Visual floor plan editor with live table occupancy indicators',
      'Recipe-level inventory tracking automatically calculating raw material usage',
      'Multi-terminal support with cashier drawer balancing and shift summaries',
      'Comprehensive sales analytics tracking top-performing dishes and profit margins'
    ],
    techStack: ['React', 'Node.js', 'Express', 'MySQL', 'WebSockets', 'Tailwind CSS', 'Electron'],
    businessOutcomes: [
      'Reduced average customer meal turnaround time by 18 minutes',
      'Eliminated lost order tickets completely via electronic kitchen screens',
      'Cut ingredient wastage by 22% through recipe-level stock reconciliation'
    ],
    deliverables: [
      'Full POS terminal and KDS software suite',
      'Real-time WebSocket server backend',
      'Manager reporting portal with exportable financial balance sheets',
      'Thermal printer ESC/POS driver integration'
    ],
    clientRequirements: [
      'Offline resilience in case of intermittent internet outages',
      'Touch-friendly interface for fast-paced waiters and kitchen staff',
      'Instant order modifications and allergy warning alerts'
    ],
    businessValueMetric: 'Sub-100ms order-to-kitchen transmission & inventory sync',
    caseStudy: {
      challenge: 'High-volume dinner rushes created chaos between waitstaff and the kitchen, resulting in delayed orders and cold food complaints.',
      approach: 'Deployed electronic Kitchen Display screens synchronized via local WebSockets with real-time countdown timers.',
      keyInnovations: [
        'Real-time WebSocket order dispatcher',
        'Recipe-based raw ingredient depletion engine',
        'Dynamic table split-bill calculator'
      ],
      results: [
        'Average table turn time improved by 25%',
        'Order accuracy climbed to 99.8%',
        'Total raw material shrinkage reduced by 22%'
      ]
    }
  },
  {
    id: 'education-management-system-lms',
    title: 'Education Management System & Comprehensive LMS',
    category: 'Enterprise Solutions',
    industry: 'Education',
    clientType: 'Schools, Colleges & University Campuses',
    status: 'Production Live',
    badgeTag: 'EDTECH CAMPUS ERP',
    bannerImg: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
    galleryImgs: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop'
    ],
    overview: 'Enterprise academic platform centralizing student admissions, high-speed biometric gate attendance, automated fee reconciliation, digital gradebooks, examination management, and connected parent portals.',
    problemStatement: 'Academic institutions lost hundreds of administrative hours to paper roll calls, physical fee vouchers, manual gradebook math, and delayed communications with parents regarding student absenteeism.',
    solutionProvided: 'Constructed a comprehensive multi-tenant campus ERP integrating biometric hardware with automated parent SMS alerts, digital fee reconciliation with online banking, and automated report card generators.',
    coreFeatures: [
      'Biometric and QR-code turnstile gate attendance with sub-50ms verification',
      'Automated parent SMS and mobile app push notifications for unexcused absences',
      'Fee voucher generation with rule engines for siblings discounts and scholarships',
      'Online fee payment integration (1LINK, cards, mobile wallets) with auto-reconciliation',
      'Examination engine calculating GPA/CGPA and generating printable PDF report cards',
      'Dedicated parent, student, and teacher role-based access portals'
    ],
    techStack: ['React', 'Node.js', 'MySQL', 'Tailwind CSS', 'Biometric APIs', '1LINK Banking Gateway', 'SMS Gateway'],
    businessOutcomes: [
      'Reduced administrative overhead by 85% by eliminating paper registers',
      'Unexcused student truancy fell by 42% following instant SMS alerts',
      'Accelerated fee collection with 95% of parents paying digitally within 5 days'
    ],
    deliverables: [
      'Complete multi-campus school management platform',
      'Hardware integration drivers for biometric turnstiles',
      'Parent and student mobile-responsive portals',
      'Financial and academic auditing dashboards'
    ],
    clientRequirements: [
      'Enterprise-grade data security for sensitive student records',
      'High-throughput handling of morning gate attendance rushes',
      'Multi-campus administrative hierarchy with central oversight'
    ],
    businessValueMetric: '85% reduction in administrative paper overhead & fee sync',
    caseStudy: {
      challenge: 'Managing thousands of students across manual paperwork resulted in fee audit errors, lost records, and delayed term reports.',
      approach: 'Unified all campus departments into a single secure relational database with role-based permissions and hardware integrations.',
      keyInnovations: [
        'High-speed biometric attendance queueing',
        'Automated online fee voucher reconciliation',
        'Dynamic watermarked report card generator'
      ],
      results: [
        'Zero paper registers required across 10+ campuses',
        'Saved over 200 hours of staff time per examination cycle',
        'Zero tuition fee leakage achieved'
      ]
    }
  },
  {
    id: 'shafaaf-water-logistics',
    title: 'Shafaaf Mineral Water Distribution Logistics ERP',
    category: 'SaaS Products',
    industry: 'Logistics',
    clientType: 'Shafaaf Pure Mineral Water Distribution',
    status: 'Production Live',
    badgeTag: 'LOGISTICS & SUPPLY CHAIN',
    bannerImg: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?q=80&w=1200&auto=format&fit=crop',
    galleryImgs: [
      'https://images.unsplash.com/photo-1559839914-17aae19cec71?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1200&auto=format&fit=crop'
    ],
    overview: 'Pure mineral water distribution, bottle asset tracking, customer delivery routing, and recurring billing subscription management software.',
    problemStatement: 'Water delivery companies suffer severe financial losses from unreturned 19-liter bottles, inefficient driver transit routes, and delayed cash collection from recurring corporate customers.',
    solutionProvided: 'Engineered a specialized logistics management platform featuring customer subscription schedules, digital bottle deposit ledgers, driver route optimization maps, and automated invoice delivery.',
    coreFeatures: [
      'Returnable bottle deposit and return reconciliation ledger',
      'Driver delivery route sequencing minimizing daily transit miles',
      'Corporate customer recurring subscription orders and digital billing',
      'Real-time delivery status updates and customer signature confirmation',
      'Inventory replenishment tracking at bottling facilities and regional hubs'
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Mapping APIs', 'REST APIs'],
    businessOutcomes: [
      'Slashed missing bottle inventory losses by over 90%',
      'Reduced delivery fleet fuel consumption by 16% through route sequencing',
      'Automated monthly invoicing for corporate enterprise accounts'
    ],
    deliverables: [
      'Logistics coordinator web dashboard',
      'Driver delivery mobile web interface',
      'Customer subscription and invoice portal',
      'Inventory tracking and bottle asset ledger'
    ],
    clientRequirements: [
      'Simple interface for delivery drivers on smartphones',
      'Accurate accounting of bottle deposits across thousands of clients',
      'Reliable offline operation for drivers in poor coverage areas'
    ],
    businessValueMetric: 'Automated bottle asset ledger & driver route optimization',
    caseStudy: {
      challenge: 'Over 15% of returnable water bottles were lost annually, and drivers followed redundant delivery paths across the city.',
      approach: 'Designed a digital ledger that binds bottle serials to customer accounts and optimized driver drop-off sequences dynamically.',
      keyInnovations: [
        'Digital bottle deposit balance tracking',
        'Dynamic route optimizer sequencing orders geographically',
        'Automated recurring billing vouchers generated on delivery'
      ],
      results: [
        'Saved thousands in bottle replacement costs within the first quarter',
        'Daily delivery capacity increased by 30% per vehicle',
        '100% accountability on corporate client invoices'
      ]
    }
  },
  {
    id: 'nutribake-platform',
    title: 'NutriBake Functional Nutrition & Artisanal Bakery Platform',
    category: 'Product Engineering',
    industry: 'Retail',
    clientType: 'NutriBake Brand & Research Lab',
    status: 'Under Process (R&D & Active Platform Engineering)',
    liveUrl: 'https://nutribake.pk',
    badgeTag: 'UNDER PROCESS (.LAB / .PK)',
    bannerImg: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop',
    galleryImgs: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1200&auto=format&fit=crop'
    ],
    overview: 'Specialized health, functional nutrition, and artisanal bakery platform under active R&D and digital development (.lab / .pk). Engineered for formulation cataloging, dietary transparency, clean ingredient certifications, and direct-to-consumer delivery.',
    problemStatement: 'Consumers seeking clean, health-focused nutrition and dietary bakery goods face a lack of transparency regarding macros, allergens, and clinical formulations in standard commercial bakeries.',
    solutionProvided: 'Architecting a dual-facet digital ecosystem: NutriBake.lab (clinical nutrition research, formulation testing, and laboratory verification) and NutriBake.pk (direct-to-consumer artisanal health bakery storefront).',
    coreFeatures: [
      'Interactive macro & micronutrient breakdown per serving',
      'Strict allergen filtering (gluten-free, keto, diabetic-friendly, dairy-free)',
      'Batch-tested quality assurance certificates linked to product packaging',
      'Subscription wellness bakery delivery box customization',
      'Direct-to-consumer e-commerce checkout with temperature-controlled shipping tracking'
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Stripe / Local Pay Gateways', 'Docker'],
    businessOutcomes: [
      'Platform currently in active development phase with comprehensive brand R&D',
      'Architected multi-domain presence linking scientific lab data with e-commerce',
      'Positioned to capture growing health and wellness dietary market demand'
    ],
    deliverables: [
      'NutriBake.lab research and formulation portal',
      'NutriBake.pk customer e-commerce storefront',
      'Custom dietary filtering and nutrition calculation engine',
      'Inventory shelf-life telemetry backend'
    ],
    clientRequirements: [
      'Scientific, clean, high-trust laboratory aesthetics',
      'Uncompromising dietary accuracy and ingredient disclosures',
      'Scalable e-commerce infrastructure with local payment support'
    ],
    businessValueMetric: 'Under Process (.lab / .pk) — Clean Dietary Formulation',
    caseStudy: {
      challenge: 'Bridging the gap between scientific nutritional research and fresh daily bakery logistics without compromising product freshness.',
      approach: 'Designing a modular architecture that connects laboratory formula certifications directly with consumer product labels and fresh baking schedules.',
      keyInnovations: [
        'Dynamic nutrition label generator calculating macros in real time',
        'Batch formulation traceability from lab to oven',
        'Freshness subscription scheduler predicting delivery cycles'
      ],
      results: [
        'Under active engineering; alpha platform tests scheduled for deployment',
        'Formula verification pipeline fully architected',
        'Branding and packaging guidelines finalized'
      ]
    }
  },
  {
    id: 'prostates-ltd',
    title: 'ProStatesLtd Enterprise Real Estate & Property Platform',
    category: 'Enterprise Solutions',
    industry: 'Real Estate',
    clientType: 'ProStatesLtd Real Estate',
    status: 'Active Development',
    liveUrl: 'https://prostatesltd.com',
    badgeTag: 'REAL ESTATE PLATFORM',
    bannerImg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
    galleryImgs: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
    ],
    overview: 'Enterprise real estate portal and property asset management platform: Schema frameworks, structural database maps, dynamic property listings, and investor diligence dashboards.',
    problemStatement: 'High-value real estate transactions require extensive documentation, title verification, yield projections, and multi-currency investor presentations that standard listing sites cannot accommodate.',
    solutionProvided: 'Building a comprehensive property investment portal featuring interactive 3D floor plan visualizers, ROI yield calculators, legal diligence vaults, and direct investor consultation scheduling.',
    coreFeatures: [
      'High-resolution commercial and residential property showcase',
      'Financial ROI and rental yield forecasting calculator',
      'Secure document vault for legal title deeds and inspection audits',
      'Multi-currency valuation display for overseas investors',
      'Agent lead routing and private viewing scheduler'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'REST APIs'],
    businessOutcomes: [
      'Engineered structural foundation for cross-border real estate transactions',
      'Streamlined investor evaluation and inquiry submission pipelines',
      'Clean, authoritative visual prestige matching luxury property portfolios'
    ],
    deliverables: [
      'Enterprise property listing web portal',
      'Investor diligence dashboard and document manager',
      'Lead routing and inquiry dispatch backend',
      'Responsive mobile layout for high-net-worth buyers'
    ],
    clientRequirements: [
      'Luxury aesthetic with generous negative space and refined typography',
      'Sub-second property search across price and location filters',
      'Encrypted document access for accredited investors'
    ],
    businessValueMetric: 'Dynamic property listings & investor diligence vault',
    caseStudy: {
      challenge: 'Overseas investors hesitated to transact without verified legal documentation and clear rental yield models.',
      approach: 'Designed an investor-centric platform highlighting verifiable yields, regulatory clearances, and virtual walkthroughs.',
      keyInnovations: [
        'Interactive rental yield simulation engine',
        'Watermarked legal diligence document viewer',
        'Direct executive consultation scheduler'
      ],
      results: [
        'Platform in final staging; initial investor feedback rated usability 9.6/10',
        'Dynamic property filtering benchmarked at sub-100ms response',
        'Diligence vault passed data security review'
      ]
    }
  },
  {
    id: 'metawave-innovations-flagship',
    title: 'MetaWave Innovations Official Enterprise Digital Presence',
    category: 'Enterprise Solutions',
    industry: 'AI & Automation',
    clientType: 'MetaWave Innovations PVT LTD',
    status: 'Production Live',
    liveUrl: 'https://metawaveinnovations.com',
    badgeTag: 'FLAGSHIP ENTERPRISE',
    bannerImg: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    galleryImgs: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop'
    ],
    overview: 'Official company flagship platform showcasing MetaWave Innovations\' global technology services, applied AI capabilities, custom ERP/CRM architectures, client case studies, and engineering leadership.',
    problemStatement: 'MetaWave needed a sophisticated, authoritative digital presence that reflects its genuine engineering depth, verified client portfolio, and transparent leadership credentials.',
    solutionProvided: 'Engineered a modern, high-performance web platform featuring interactive portfolio showcases, detailed case studies, academic typography systems, and direct executive consultation channels.',
    coreFeatures: [
      'Interactive filterable portfolio with comprehensive case study modals',
      'Academic typography and technical research blog publication engine',
      '5 Core service pillars showcasing end-to-end software capabilities',
      'Transparent company governance, leadership bios, and milestone timelines',
      'Global interactive network map showcasing international client reach'
    ],
    techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'motion/react', 'Vite', 'Node.js'],
    businessOutcomes: [
      'Established authoritative global technology brand identity',
      '100% verified showcase of real client deliverables and platforms',
      'Seamless client engagement pipelines generating enterprise inquiries'
    ],
    deliverables: [
      'Full enterprise web application with atomic component tree',
      'Interactive data architectures for portfolio, services, and team',
      'Technical research blog engine with academic styling',
      'Responsive mobile and desktop optimization'
    ],
    clientRequirements: [
      'Uncompromising design craft and typography hierarchy',
      'No generic AI templates or unverified claims',
      'Lightning-fast client-side navigation and interaction feedback'
    ],
    businessValueMetric: 'Full-cycle enterprise software engineering & verified portfolio',
    caseStudy: {
      challenge: 'Showcasing diverse enterprise platforms spanning manufacturing, healthcare, hospitality, and EdTech under a cohesive, authoritative brand.',
      approach: 'Developed a unified visual design system with refined typography, deep emerald and neutral palettes, and mathematically precise spacing.',
      keyInnovations: [
        'Academic typography rendering for research articles',
        'Multi-dimensional project showcase modal with live links',
        'Zero-latency client-side state transitions'
      ],
      results: [
        'Global recognition for web craftsmanship and engineering transparency',
        'Unified multi-sector showcase driving international inquiries',
        'High performance and accessibility metrics across all audit benchmarks'
      ]
    }
  }
];

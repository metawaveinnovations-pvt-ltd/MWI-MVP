import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  MapPin, 
  Mail, 
  Send, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Handshake, 
  Award, 
  Lock, 
  Workflow, 
  Building2, 
  ChevronRight,
  ChevronLeft,
  FileCheck,
  Cpu,
  ArrowUpRight,
  Briefcase
} from 'lucide-react';
import { NationalFlag, NationalFlagBadge, ProfileFlagStamp } from './NationalFlag';

// Signature wavy accent vector directly replicating image.png aesthetic
function WaveAccent({ stroke }: { stroke: string }) {
  return (
    <svg 
      width="36" 
      height="12" 
      viewBox="0 0 36 12" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      <path 
        d="M1.5 6C4 2.5 7 2.5 9.5 6C12 9.5 15 9.5 17.5 6C20 2.5 23 2.5 25.5 6C28 9.5 31 9.5 33.5 6C34.5 4.5 35.2 4.5 35.5 5" 
        stroke={stroke} 
        strokeWidth="2.4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}

// Colorful distinct themes for each city card matching image.png reference design
const hubThemes: Record<string, {
  gradient: string;
  shadow: string;
  category: string;
  waveStroke: string;
  cardBorder: string;
}> = {
  london: {
    // Card 1 in reference image: Apple Design Award Blue
    gradient: 'from-[#2563EB] via-[#1D4ED8] to-[#1E3A8A]',
    shadow: 'shadow-blue-600/25 hover:shadow-blue-600/40',
    category: 'text-blue-200',
    waveStroke: '#93C5FD',
    cardBorder: 'border-blue-400/30 hover:border-blue-300/60',
  },
  stockholm: {
    // Nordic Deep Teal / Cyan
    gradient: 'from-[#0D9488] via-[#0F766E] to-[#115E59]',
    shadow: 'shadow-teal-600/25 hover:shadow-teal-600/40',
    category: 'text-teal-200',
    waveStroke: '#99F6E4',
    cardBorder: 'border-teal-400/30 hover:border-teal-300/60',
  },
  riyadh: {
    // Card 2 in reference image: Google Design Award Warm Amber / Tangerine
    gradient: 'from-[#F59E0B] via-[#EA580C] to-[#C2410C]',
    shadow: 'shadow-orange-600/25 hover:shadow-orange-600/40',
    category: 'text-amber-100',
    waveStroke: '#FED7AA',
    cardBorder: 'border-amber-400/30 hover:border-amber-300/60',
  },
  karachi: {
    // Card 4 in reference image & MWI Signature: Rich Forest / Emerald Green
    gradient: 'from-[#326E45] via-[#245735] to-[#143D21]',
    shadow: 'shadow-emerald-700/30 hover:shadow-emerald-700/50',
    category: 'text-emerald-200',
    waveStroke: '#A7F3D0',
    cardBorder: 'border-emerald-400/40 hover:border-emerald-300/70',
  },
  tokyo: {
    // Card 3 in reference image: GitHub Top Developer Violet / Purple
    gradient: 'from-[#8B5CF6] via-[#7C3AED] to-[#5B21B6]',
    shadow: 'shadow-purple-600/25 hover:shadow-purple-600/40',
    category: 'text-purple-200',
    waveStroke: '#E9D5FF',
    cardBorder: 'border-purple-400/30 hover:border-purple-300/60',
  },
  sydney: {
    // Sunset Coral / Ruby Rose
    gradient: 'from-[#E11D48] via-[#BE123C] to-[#9F1239]',
    shadow: 'shadow-rose-600/25 hover:shadow-rose-600/40',
    category: 'text-rose-200',
    waveStroke: '#FECDD3',
    cardBorder: 'border-rose-400/30 hover:border-rose-300/60',
  }
};

interface RegionalLeader {
  name: string;
  title: string;
  roleType: string;
  initials?: string;
  color?: string;
  photo: string;
  experience: string;
  focus: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
}

interface NetworkHub {
  id: string;
  code: string;
  city: string;
  country: string;
  flag: string;
  isHq?: boolean;
  hubBadge: string;
  localPresence: string;
  industryAssociated: string;
  roleTitle: string;
  summary: string;
  timeZone: string;
  timeZoneLabel: string;
  defaultTime: string;
  coords: string;
  mapX: number; // percentage on map
  mapY: number; // percentage on map
  specialties: string[];
  leader: RegionalLeader;
}

interface TechPartner {
  name: string;
  category: 'Cloud Infrastructure' | 'AI & Accelerated Silicon' | 'Enterprise Systems' | 'Security & FinTech';
  tierBadge: string;
  clientBenefit: string;
  technicalCapability: string;
  metrics: string;
  badgeColor: string;
}

export function GlobalNetworkSection() {
  const [activeTab, setActiveTab] = useState<'network' | 'partnerships' | 'assurance'>('network');
  const [selectedHubId, setSelectedHubId] = useState<string>('karachi');
  const [activeModalHub, setActiveModalHub] = useState<NetworkHub | null>(null);
  const [contactMode, setContactMode] = useState<boolean>(false);
  const [contactSent, setContactSent] = useState<boolean>(false);
  const [hubFormData, setHubFormData] = useState({ name: '', email: '', message: '' });

  // Partnership modal state
  const [partnerModalOpen, setPartnerModalOpen] = useState<boolean>(false);
  const [partnerSent, setPartnerSent] = useState<boolean>(false);
  const [partnerFormData, setPartnerFormData] = useState({
    companyName: '',
    contactPerson: '',
    workEmail: '',
    partnershipTrack: 'Cloud & Infrastructure Alliance',
    brief: ''
  });

  // Current time state for local clocks
  const [currentTimes, setCurrentTimes] = useState<Record<string, string>>({});
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const updateScrollState = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const card = container.querySelector<HTMLElement>('[data-hub-card]');
    if (card) {
      const cardWidth = card.offsetWidth + 16;
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      setSlideIndex(newIndex);
    }
    setCanScrollLeft(container.scrollLeft > 8);
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 12);
  };

  const handleSlide = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const card = container.querySelector<HTMLElement>('[data-hub-card]');
    const step = card ? card.offsetWidth + 16 : 320;
    
    if (direction === 'left') {
      container.scrollBy({ left: -step, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: step, behavior: 'smooth' });
    }
    setTimeout(updateScrollState, 350);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, []);

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      // Timezone sequence line-wise from UTC+1 to UTC+10
      const hubsConfig: Record<string, string> = {
        london: 'Europe/London',
        stockholm: 'Europe/Stockholm',
        riyadh: 'Asia/Riyadh',
        karachi: 'Asia/Karachi',
        tokyo: 'Asia/Tokyo',
        sydney: 'Australia/Sydney'
      };

      const times: Record<string, string> = {};
      Object.entries(hubsConfig).forEach(([id, tz]) => {
        try {
          times[id] = now.toLocaleTimeString('en-US', {
            timeZone: tz,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
        } catch (e) {
          times[id] = '--:--';
        }
      });

      setCurrentTimes(times);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 10000);
    return () => clearInterval(interval);
  }, []);

  // 6 Strategic Global Hubs: Karachi (Global HQ) first, followed by timezone sequence (UTC+1 to UTC+10)
  const networkHubs: NetworkHub[] = [
    {
      id: 'karachi',
      code: 'PK_KHI',
      city: 'Karachi',
      country: 'Pakistan',
      flag: '🇵🇰',
      isHq: true,
      hubBadge: 'Local Presence: Hyderabad Office & Nationwide Clients',
      localPresence: 'Hyderabad Office & Nationwide Clients',
      industryAssociated: 'Tech, Health, Education & Enterprise',
      roleTitle: 'Technology, Engineering & Global Operations',
      summary: 'The central technology and operations base of MetaWave Innovations, operating our engineering office in Nakash Villas, Hyderabad, driving product engineering, nationwide client delivery, and coordinated global operations across the MWI network.',
      timeZone: 'Asia/Karachi',
      timeZoneLabel: 'PKT (UTC+5)',
      defaultTime: '08:13 PM',
      coords: '24.86°N, 67.00°E',
      mapX: 68,
      mapY: 48,
      specialties: [
        'Full-Stack & Distributed Cloud Engineering',
        'Large-Scale AI & Cognitive Pipeline Systems',
        'Coordinated 24/7 Global Delivery Framework',
        'Mission-Critical SRE & High-Throughput APIs'
      ],
      leader: {
        name: 'Muntaha Sheikh',
        title: 'CEO • Co-Founder & Chief Technical Officer',
        roleType: 'CEO & Co-Founder',
        initials: 'MS',
        color: 'from-purple-600 to-violet-700',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        experience: 'CEO & CTO • System Developer and Project Management',
        focus: 'System Developer and Project Management',
        email: 'muntaha@metawaveinnovations.com',
        phone: '+92 (21) 3587-2100',
        address: 'MetaWave HQ & Operations Center, Nakash Villas, Hyderabad, Pakistan',
        bio: 'Chief Executive Officer (CEO), Co-Founder & Chief Technical Officer overseeing system development, project management, and global engineering operations from MetaWave HQ in Hyderabad, Pakistan.'
      }
    },
    {
      id: 'london',
      code: 'GB_LDN',
      city: 'London',
      country: 'United Kingdom',
      flag: '🇬🇧',
      isHq: false,
      hubBadge: 'Local Presence: Nationwide Clients',
      localPresence: 'Nationwide Clients',
      industryAssociated: 'Tech, Health & Enterprise Business',
      roleTitle: 'UK, Europe & Global Business Development',
      summary: 'A key international market connecting MWI with clients, strategic relationships, technology opportunities, and business development across the United Kingdom and Europe.',
      timeZone: 'Europe/London',
      timeZoneLabel: 'BST (UTC+1)',
      defaultTime: '04:13 PM',
      coords: '51.51°N, 0.13°W',
      mapX: 47,
      mapY: 28,
      specialties: [
        'UK & European Strategic Enterprise Relations',
        'International Commercial Partnerships',
        'FinTech & Banking Standards Alignment',
        'Executive Client Solution Strategy'
      ],
      leader: {
        name: 'Ali Hassan Chand',
        title: 'International Business & Growth Leadership',
        roleType: 'Founder & Managing Director',
        initials: 'AHC',
        color: 'from-emerald-600 to-[#326E45]',
        photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
        experience: 'Founder • Managing Director',
        focus: 'International Business & Growth Leadership',
        email: 'leadership@metawaveinnovations.com',
        phone: '+44 (20) 7946-0912',
        address: '30 St Mary Axe, City of London, London EC3A 8EP, UK',
        bio: 'Founder and Managing Director leading International Business & Growth Leadership across UK, Europe, and global partner ecosystems.'
      }
    },
    {
      id: 'stockholm',
      code: 'SE_ARN',
      city: 'Stockholm',
      country: 'Sweden',
      flag: '🇸🇪',
      isHq: false,
      hubBadge: 'Local Presence: Nationwide Clients',
      localPresence: 'Nationwide Clients',
      industryAssociated: 'Tech, Education & Cloud Software',
      roleTitle: 'Nordic Technology & Regional Expansion',
      summary: 'A strategic Nordic market connecting MWI with clients, technology ecosystems, commercial opportunities, and continued expansion across Northern Europe.',
      timeZone: 'Europe/Stockholm',
      timeZoneLabel: 'CEST (UTC+2)',
      defaultTime: '05:13 PM',
      coords: '59.33°N, 18.07°E',
      mapX: 52,
      mapY: 18,
      specialties: [
        'Nordic Enterprise Technology Partnerships',
        'Northern European Commercial Growth',
        'Sustainable Digital Product Development',
        'Modern High-Performance Interface Engineering'
      ],
      leader: {
        name: 'Abdul Ahad Arain',
        title: 'System Designer & Lead IT Engineer',
        roleType: 'Co-Founder',
        initials: 'AAA',
        color: 'from-teal-600 to-emerald-600',
        photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
        experience: 'Co-Founder • System Designer & Lead IT Engineer',
        focus: 'System Designer & Lead IT Engineer',
        email: 'ahad@metawaveinnovations.com',
        phone: '+46 (8) 123 456 78',
        address: 'Klarabergsviadukten 70, 111 64 Stockholm, Sweden',
        bio: 'Co-Founder and System Designer & Lead IT Engineer at MetaWave Innovations, directing modern system architecture, interface engineering, and tech expansion across the Nordic region.'
      }
    },
    {
      id: 'riyadh',
      code: 'SA_RUH',
      city: 'Riyadh',
      country: 'Saudi Arabia',
      flag: '🇸🇦',
      isHq: false,
      hubBadge: 'Local Presence: Nationwide Clients',
      localPresence: 'Nationwide Clients',
      industryAssociated: 'Enterprise Business, Tech & Real Estate',
      roleTitle: 'GCC Market Expansion & MWI Products',
      summary: 'A strategic GCC market focused on serving enterprise clients, expanding MWI technology solutions, products, and long-term partnerships across Saudi Arabia and the Gulf.',
      timeZone: 'Asia/Riyadh',
      timeZoneLabel: 'AST (UTC+3)',
      defaultTime: '06:13 PM',
      coords: '24.71°N, 46.68°E',
      mapX: 59,
      mapY: 46,
      specialties: [
        'GCC Enterprise Platform Deployments',
        'MWI Proprietary Product Lines Distribution',
        'Regional Cloud & Data Residency Alignment',
        'Long-Term Strategic Gulf Commercial Ties'
      ],
      leader: {
        name: 'Suhail Siyal',
        title: 'Director of Marketing & Business Growth',
        roleType: 'Partner',
        initials: 'SS',
        color: 'from-blue-600 to-indigo-700',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
        experience: 'Partner • Director of Marketing & Business Growth',
        focus: 'Director of Marketing & Business Growth',
        email: 'suhail.md@metawaveinnovations.com',
        phone: '+966 (11) 456-7890',
        address: 'King Fahd Road, Olaya Financial District, Riyadh, Saudi Arabia',
        bio: 'Partner and Director of Marketing & Business Growth driving enterprise partnerships, client engagement, and commercial expansion across the GCC region.'
      }
    },
    {
      id: 'tokyo',
      code: 'JP_TYO',
      city: 'Tokyo',
      country: 'Japan',
      flag: '🇯🇵',
      isHq: false,
      hubBadge: 'Local Presence: Nationwide Clients',
      localPresence: 'Nationwide Clients',
      industryAssociated: 'Advanced Tech, Business & Robotics',
      roleTitle: 'MWI Products, Innovation & Market Development',
      summary: 'A strategic gateway connecting MWI with clients, developing technology relationships, and introducing software products across Japan and the wider Asia-Pacific market.',
      timeZone: 'Asia/Tokyo',
      timeZoneLabel: 'JST (UTC+9)',
      defaultTime: '10:13 PM',
      coords: '35.68°N, 139.77°E',
      mapX: 85,
      mapY: 38,
      specialties: [
        'MWI Proprietary Product Integration',
        'Advanced Applied Innovation & AI Frameworks',
        'Japan & East Asia Commercial Channels',
        'High-Reliability Architecture Standards'
      ],
      leader: {
        name: 'Startos @ MWI',
        title: 'Japan & APAC Market Leadership',
        roleType: 'Japan & APAC Leadership',
        initials: 'ST',
        color: 'from-amber-600 to-orange-700',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        experience: 'Strategic Innovation & Regional Market Development',
        focus: 'MWI Products, Innovation & Market Development',
        email: 'startos@metawaveinnovations.com',
        phone: '+81 (3) 5555-0143',
        address: 'Marunouchi Park Building, Chiyoda-ku, Tokyo 100-0005, Japan',
        bio: 'Leads market development, product entry, and technology collaboration across Japan and East Asia, linking innovative MWI software solutions with high-growth regional sectors.'
      }
    },
    {
      id: 'sydney',
      code: 'AU_SYD',
      city: 'Sydney',
      country: 'Australia',
      flag: '🇦🇺',
      isHq: false,
      hubBadge: 'Local Presence: Nationwide Clients',
      localPresence: 'Nationwide Clients',
      industryAssociated: 'Business, Real Estate, Education & Tech',
      roleTitle: 'Real Estate, Technology Partnerships & Business',
      summary: 'A strategic Australian market connecting MWI with clients, real-estate opportunities, technology partnerships, and broader commercial development across the Asia-Pacific region.',
      timeZone: 'Australia/Sydney',
      timeZoneLabel: 'AEST (UTC+10)',
      defaultTime: '01:13 AM',
      coords: '33.87°S, 151.21°E',
      mapX: 88,
      mapY: 78,
      specialties: [
        'Real Estate Technology & PropTech Alliances',
        'APAC Commercial & Enterprise Partnerships',
        'Cross-Border Digital Infrastructure',
        'Strategic Investment & Business Development'
      ],
      leader: {
        name: 'Ali Hassan Chand',
        title: 'International Business & Growth Leadership',
        roleType: 'Founder & Managing Director',
        initials: 'AHC',
        color: 'from-emerald-600 to-[#326E45]',
        photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
        experience: 'Founder • Managing Director',
        focus: 'International Business & Growth Leadership',
        email: 'leadership@metawaveinnovations.com',
        phone: '+61 (2) 9240-5500',
        address: 'Barangaroo International Towers, Sydney NSW 2000, Australia',
        bio: 'Founder and Managing Director driving International Business & Growth Leadership, proptech partnerships, and commercial alliance development across Australia and the broader Asia-Pacific corridor.'
      }
    }
  ];

  // Strategic Technology Partners Data
  const techPartners: TechPartner[] = [
    {
      name: 'Amazon Web Services',
      category: 'Cloud Infrastructure',
      tierBadge: 'AWS Advanced Consulting Partner',
      clientBenefit: 'Scalable multi-zone cloud architectures designed for zero-downtime failover and cost-optimized infrastructure.',
      technicalCapability: 'Serverless ECS, EKS Kubernetes clusters, Aurora PostgreSQL multi-region databases, and CloudFront CDN caching.',
      metrics: '99.99% Uptime Guarantee',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      name: 'Google Cloud Platform',
      category: 'Cloud Infrastructure',
      tierBadge: 'Google Cloud Premier Partner',
      clientBenefit: 'Advanced generative AI capabilities, Gemini enterprise integrations, and high-performance BigQuery analytics.',
      technicalCapability: 'Vertex AI pipeline tuning, Cloud Run serverless microservices, and multi-cloud Kubernetes orchestration.',
      metrics: 'Sub-150ms Query Latency',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      name: 'Microsoft Azure',
      category: 'Cloud Infrastructure',
      tierBadge: 'Microsoft Solutions Partner',
      clientBenefit: 'Bank-grade enterprise security, Active Directory compliance, and sovereign government cloud hosting.',
      technicalCapability: 'Azure OpenAI enterprise deployments, confidential computing enclaves, and Azure Cosmos DB global replication.',
      metrics: 'HIPAA & SOC 2 Verified',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200'
    },
    {
      name: 'NVIDIA Partner Network',
      category: 'AI & Accelerated Silicon',
      tierBadge: 'NVIDIA Inception Compute Alliance',
      clientBenefit: 'Ultra-fast local model inference speeds and optimized GPU compute efficiency for machine learning models.',
      technicalCapability: 'TensorRT-LLM optimization, Triton Inference Server deployment, and CUDA-accelerated mathematical pipelines.',
      metrics: '4.8x Speedup on Inference',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      name: 'Hugging Face Enterprise',
      category: 'AI & Accelerated Silicon',
      tierBadge: 'Enterprise Solutions Partner',
      clientBenefit: 'Private foundation model fine-tuning with 100% data retention guarantees inside client private virtual clouds.',
      technicalCapability: 'Quantized model compression, specialized LoRA fine-tuning, and open-weights model deployment.',
      metrics: 'Zero Third-Party Data Leakage',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      name: 'Oracle Database & OPN',
      category: 'Enterprise Systems',
      tierBadge: 'Oracle PartnerNetwork Core',
      clientBenefit: 'High-throughput transactional integrity for large enterprise finance, supply chain, and ERP backbones.',
      technicalCapability: 'Oracle Autonomous Database integration, real-time replication, and high-concurrency ACID transactions.',
      metrics: 'Sub-Millisecond ACID Commit',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      name: 'SAP Ecosystem Integration',
      category: 'Enterprise Systems',
      tierBadge: 'SAP BTP Integration Provider',
      clientBenefit: 'Seamless digital extension and custom modern frontend portals connected directly to legacy SAP ERP cores.',
      technicalCapability: 'SAP S/4HANA OData connectors, Business Technology Platform extensions, and automated reconciliation.',
      metrics: 'Certified Data Connectors',
      badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200'
    },
    {
      name: 'Cloudflare Enterprise',
      category: 'Security & FinTech',
      tierBadge: 'Strategic Edge Security Partner',
      clientBenefit: 'Defends web assets against multi-gigabit DDoS attacks and delivers lightning-fast global edge caching for users.',
      technicalCapability: 'Anycast global network, automated WAF threat mitigation, SSL/TLS modern ciphers, and zero-trust tunnels.',
      metrics: '320+ Tbps Mitigation Shield',
      badgeColor: 'bg-orange-50 text-orange-700 border-orange-200'
    },
    {
      name: 'Stripe Corporate Rail',
      category: 'Security & FinTech',
      tierBadge: 'Verified FinTech Partner',
      clientBenefit: 'Enables seamless international billing, automated subscription lifecycles, and frictionless checkout in 135+ currencies.',
      technicalCapability: 'PCI-DSS Level 1 payment gateways, automated multi-entity settlement, and fraud detection machine learning.',
      metrics: '135+ Global Currencies',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  ];

  const handleOpenHubModal = (hub: NetworkHub) => {
    setActiveModalHub(hub);
    setContactMode(false);
    setContactSent(false);
    setHubFormData({ name: '', email: '', message: '' });
  };

  const handleHubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hubFormData.email || !hubFormData.message) return;
    setContactSent(true);
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerFormData.workEmail || !partnerFormData.companyName) return;
    setPartnerSent(true);
  };

  return (
    <section 
      id="global-network" 
      className="py-10 sm:py-14 lg:py-16 bg-slate-50 text-slate-900 border-y border-slate-200 relative overflow-hidden"
    >
      {/* Subtle modern background grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.35]" 
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="w-full max-w-3xl mx-auto text-center mb-8 sm:mb-10 px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#326E45]/20 bg-[#326E45]/5 shadow-2xs mb-3.5">
            <Globe size={13} className="text-[#326E45]" />
            <span className="text-[11px] font-sans font-bold tracking-wider text-[#2F6547] uppercase">
              OUR GLOBAL NETWORK
            </span>
          </div>

          <h2 className="w-full text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
            <span className="block whitespace-nowrap text-[21px] min-[380px]:text-2xl sm:text-4xl lg:text-5xl">Strategic Leadership,</span>
            <span className="block bg-gradient-to-r from-[#326E45] via-[#245032] to-[#1E293B] bg-clip-text text-transparent">
              Global Delivery
            </span>
          </h2>


          {/* Agency Style Pill Switcher matching image.png */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
            <button
              onClick={() => setActiveTab('network')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs flex items-center gap-2 ${
                activeTab === 'network'
                  ? 'bg-slate-900 text-white ring-2 ring-slate-900/20'
                  : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              <Globe size={14} className={activeTab === 'network' ? 'text-emerald-400' : 'text-slate-500'} />
              <span>Global Network <span className="font-mono text-xs opacity-80">(6 Hubs)</span></span>
            </button>

            <button
              onClick={() => setActiveTab('partnerships')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs flex items-center gap-2 ${
                activeTab === 'partnerships'
                  ? 'bg-slate-900 text-white ring-2 ring-slate-900/20'
                  : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              <Handshake size={14} className={activeTab === 'partnerships' ? 'text-emerald-400' : 'text-slate-500'} />
              <span>Strategic Partnerships</span>
            </button>

            <button
              onClick={() => setActiveTab('assurance')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs flex items-center gap-2 ${
                activeTab === 'assurance'
                  ? 'bg-slate-900 text-white ring-2 ring-slate-900/20'
                  : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              <Award size={14} className={activeTab === 'assurance' ? 'text-emerald-400' : 'text-slate-500'} />
              <span>Assurance & Models</span>
            </button>
          </div>
        </div>

        {/* ======================= TAB 1: GLOBAL DELIVERY NETWORK ======================= */}
        {activeTab === 'network' && (
          <div className="space-y-6">

            {/* Sub-header row matching image.png reference design */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1 px-1">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 tracking-tight">
                  Strategic Market Hubs
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                  Global Headquarters (Karachi) • Follow-The-Sun Delivery (UTC+1 to UTC+10)
                </p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                <div className="hidden sm:flex items-center px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600 shadow-2xs">
                  <span>Slide for More</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSlide('left')}
                    disabled={!canScrollLeft}
                    className={`w-10 h-10 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-800 shadow-2xs transition-all ${
                      canScrollLeft 
                        ? 'hover:bg-slate-100 hover:border-slate-400 active:scale-95 cursor-pointer' 
                        : 'opacity-35 cursor-not-allowed'
                    }`}
                    aria-label="Previous markets"
                    title="Slide to previous markets"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSlide('right')}
                    disabled={!canScrollRight}
                    className={`w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md transition-all ${
                      canScrollRight 
                        ? 'hover:bg-slate-800 active:scale-95 cursor-pointer' 
                        : 'opacity-35 cursor-not-allowed'
                    }`}
                    aria-label="Next markets"
                    title="Slide to next markets"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Colorful City Cards Slider: Exactly 4 visible on desktop + slide for more */}
            <div className="relative">
              <div 
                ref={scrollContainerRef}
                onScroll={updateScrollState}
                className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth scrollbar-none"
              >
                {networkHubs.map((hub, idx) => {
                  const theme = hubThemes[hub.id] || hubThemes.karachi;
                  const localClock = currentTimes[hub.id] || hub.defaultTime;

                  return (
                    <motion.div
                      key={hub.id}
                      data-hub-card="true"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.05 }}
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      onClick={() => handleOpenHubModal(hub)}
                      className={`
                        w-[88vw] sm:w-[360px] 
                        md:w-[375px] md:min-w-[375px]
                        lg:w-[390px] lg:min-w-[390px]
                        xl:w-[410px] xl:min-w-[410px]
                        shrink-0 snap-start cursor-pointer rounded-3xl px-5.5 py-6 sm:px-6 sm:py-7 text-left transition-all duration-300 flex flex-col justify-between
                        bg-gradient-to-br ${theme.gradient} border ${theme.cardBorder} ${theme.shadow} shadow-lg relative overflow-hidden group
                      `}
                    >
                      {/* Top Header inside Card matching image.png */}
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          {/* Creative Designer Flag Position - Crisp Enamel National Flag Emblem */}
                          <div className="flex items-center gap-2">
                            <NationalFlagBadge 
                              country={hub.id} 
                              countryName={hub.country}
                              size="md"
                            />
                            {hub.isHq && (
                              <span className="px-2.5 py-1 rounded-full bg-white text-emerald-950 text-[10px] font-black tracking-wider uppercase shadow-xs">
                                GLOBAL HQ
                              </span>
                            )}
                          </div>

                          {/* Country Pill with crisp flag */}
                          <div className="flex items-center gap-1.5">
                            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11.5px] font-semibold tracking-wide border border-white/30 shadow-2xs flex items-center gap-1.5">
                              <span className="w-3.5 h-2.5 rounded-[2px] overflow-hidden shadow-2xs shrink-0 inline-block border border-white/40">
                                <NationalFlag country={hub.id} />
                              </span>
                              <span>{hub.country}</span>
                            </span>
                          </div>
                        </div>

                        {/* Category Subtitle & City Name */}
                        <div className="mt-5">
                          <div className={`text-[10.5px] sm:text-[11px] font-bold tracking-wider ${theme.category} flex items-center gap-1.5 flex-wrap`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                            <span className="text-white/85 font-bold uppercase">Local Presence :</span>
                            <span className="text-white font-extrabold underline decoration-white/40 underline-offset-2">
                              {hub.localPresence}
                            </span>
                          </div>
                          
                          <h3 className="text-2xl sm:text-[26px] font-display font-black text-white tracking-tight leading-tight mt-1.5 group-hover:translate-x-0.5 transition-transform">
                            {hub.city}
                          </h3>

                          {/* Timezone & Clock pill */}
                          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/25 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-medium mt-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{hub.timeZoneLabel}</span>
                            <span className="opacity-40">•</span>
                            <span className="font-bold tracking-tight">{localClock}</span>
                          </div>

                          {/* Industry Associated on Country Card */}
                          <div className="mt-3 flex items-center gap-1.5 text-[10.5px] sm:text-[11px] text-white/95 font-medium bg-black/20 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg whitespace-nowrap overflow-hidden">
                            <Briefcase size={12} className="text-emerald-300 shrink-0" />
                            <span className="font-semibold text-white/80 shrink-0">Industry Associated -</span>
                            <span className="font-bold text-white tracking-tight shrink-0">{hub.industryAssociated}</span>
                          </div>

                          {/* High-Impact Summary */}
                          <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal mt-3 line-clamp-3">
                            {hub.summary}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer: Signature Wave Accent, Leader lockup & Details Button matching image.png */}
                      <div className="pt-4 mt-6 border-t border-white/20 flex items-center justify-between gap-2">
                        {/* Left: Wave Accent + Leader details */}
                        <div className="flex items-center gap-2.5 min-w-0">
                          <WaveAccent stroke={theme.waveStroke} />
                          
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="relative shrink-0">
                              <img
                                src={hub.leader.photo}
                                alt={hub.leader.name}
                                className="w-7 h-7 rounded-full object-cover border-2 border-white/70 shadow-2xs"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400';
                                }}
                              />
                              <ProfileFlagStamp country={hub.id} title={`${hub.leader.name} • ${hub.country}`} />
                            </div>
                            <div className="min-w-0">
                              <div className="text-[11px] font-bold text-white truncate leading-tight">
                                {hub.leader.name}
                              </div>
                              <div className="text-[9.5px] text-white/80 truncate font-medium">
                                {hub.leader.roleType}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right: Details Link Button matching image.png */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenHubModal(hub);
                          }}
                          className="text-[11.5px] font-semibold text-white bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/35 transition-all flex items-center gap-1 shadow-xs shrink-0 cursor-pointer active:scale-95"
                          title="View Market Details"
                        >
                          <span>Details</span>
                          <ArrowUpRight size={13} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Slider Dots & Follow-The-Sun Indicator */}
            <div className="flex items-center justify-between px-1 pt-1">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 text-[11px] text-[#326E45] font-medium">
                  <ArrowRight size={13} />
                  <span>Swipe or use slider arrows to explore all 6 international markets</span>
                </span>
              </div>

              {/* Step indicator dots */}
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((stepIdx) => (
                  <button
                    key={stepIdx}
                    type="button"
                    onClick={() => {
                      if (scrollContainerRef.current) {
                        const card = scrollContainerRef.current.querySelector<HTMLElement>('[data-hub-card]');
                        const step = card ? card.offsetWidth + 16 : 320;
                        scrollContainerRef.current.scrollTo({ left: stepIdx * step, behavior: 'smooth' });
                        setTimeout(updateScrollState, 350);
                      }
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      Math.min(2, slideIndex) === stepIdx
                        ? 'w-7 bg-slate-900'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide page ${stepIdx + 1}`}
                  />
                ))}
              </div>
            </div>


          </div>
        )}

        {/* ======================= TAB 2: STRATEGIC TECH PARTNERSHIPS ======================= */}
        {activeTab === 'partnerships' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Partnership Category Overview Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
              <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 font-semibold text-slate-700 shadow-xs">
                ☁️ Cloud Infrastructure (AWS, Google Cloud, Microsoft Azure)
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 font-semibold text-slate-700 shadow-xs">
                ⚡ AI & Silicon (NVIDIA, Hugging Face)
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 font-semibold text-slate-700 shadow-xs">
                🏢 Enterprise ERP (Oracle, SAP)
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 font-semibold text-slate-700 shadow-xs">
                🛡️ Edge & Rails (Cloudflare, Stripe)
              </span>
            </div>

            {/* Strategic Tech Partner Cards (Clean Light Bento Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {techPartners.map((partner, pIdx) => (
                <div
                  key={pIdx}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all text-left flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    
                    {/* Header with tier badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          {partner.category}
                        </span>
                        <h3 className="text-xl font-display font-bold text-slate-900 leading-tight">
                          {partner.name}
                        </h3>
                      </div>
                    </div>

                    <div className="inline-block">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${partner.badgeColor}`}>
                        {partner.tierBadge}
                      </span>
                    </div>

                    {/* Plain executive description */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        What Clients Gain
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                        {partner.clientBenefit}
                      </p>
                    </div>

                    {/* Architecture Details */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">
                        Technical Architecture
                      </span>
                      <p className="text-xs text-slate-600 leading-normal">
                        {partner.technicalCapability}
                      </p>
                    </div>

                  </div>

                  {/* Bottom Metric Bar */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Performance Benchmark</span>
                    <span className="font-bold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      <span>{partner.metrics}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Partnership Call to Action Card */}
            <div className="bg-gradient-to-r from-emerald-800 via-[#275736] to-slate-900 rounded-3xl p-6 sm:p-8 text-white text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <Handshake size={15} />
                  <span>Strategic Alliances & Technology Ecosystem</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Join MetaWave's Technology Alliance Program
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 max-w-xl font-normal leading-relaxed">
                  Are you an enterprise ISV, cloud service provider, or regional systems integrator? We co-develop joint vertical solutions and enterprise delivery channels globally.
                </p>
              </div>

              <button
                onClick={() => {
                  setPartnerSent(false);
                  setPartnerModalOpen(true);
                }}
                className="shrink-0 px-6 py-3 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2"
              >
                <span>Initiate Partnership Inquiry</span>
                <ArrowRight size={15} />
              </button>
            </div>

          </div>
        )}

        {/* ======================= TAB 3: CLIENT ASSURANCE & ENGAGEMENT MODELS ======================= */}
        {activeTab === 'assurance' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* 3 Clear Engagement Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Model 1 */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 text-left space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                  <Building2 size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                    MODEL 01 • DEDICATED TEAMS
                  </span>
                  <h3 className="text-xl font-display font-bold text-slate-900">
                    Dedicated Engineering Pods
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    Senior full-stack developers, QA leads, and cloud architects operating as an agile extension of your in-house team with daily standups and direct code ownership.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>Onboard within 48 to 72 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>Time-zone aligned with UK, EU, and Gulf</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>100% intellectual property transfer</span>
                  </div>
                </div>
              </div>

              {/* Model 2 */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 text-left space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                  <Workflow size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block mb-1">
                    MODEL 02 • JOINT VENTURES
                  </span>
                  <h3 className="text-xl font-display font-bold text-slate-900">
                    Solution & IP Co-Creation
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    Collaborative software engineering for high-growth ventures and enterprises looking to co-author proprietary algorithms, specialized AI pipelines, or SaaS platforms.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-blue-600 shrink-0" />
                    <span>Shared R&D investment and risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-blue-600 shrink-0" />
                    <span>Co-patented proprietary engines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-blue-600 shrink-0" />
                    <span>Accelerated Go-To-Market strategy</span>
                  </div>
                </div>
              </div>

              {/* Model 3 */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 text-left space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
                  <Award size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block mb-1">
                    MODEL 03 • ENTERPRISE SLA
                  </span>
                  <h3 className="text-xl font-display font-bold text-slate-900">
                    Managed Cloud & 24/7 SRE
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    Guaranteed service-level agreements with active multi-cloud monitoring, automated threat protection, and immediate incident mitigation for high-volume apps.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-purple-600 shrink-0" />
                    <span>&lt; 15-minute emergency incident response</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-purple-600 shrink-0" />
                    <span>Automated daily encrypted offsite backups</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-purple-600 shrink-0" />
                    <span>Quarterly third-party penetration audits</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Compliance & Security Badges Strip */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-xs">
              <div>
                <span className="text-xs font-bold uppercase text-[#326E45] tracking-wider block">
                  Audited Governance & Security Credentials
                </span>
                <h4 className="text-lg font-display font-bold text-slate-900 mt-0.5">
                  Meeting International Enterprise Compliance Mandates
                </h4>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FileCheck size={14} className="text-emerald-700" />
                  <span>SOC 2 Type II Audited</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-700" />
                  <span>ISO/IEC 27001</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Lock size={14} className="text-emerald-700" />
                  <span>GDPR Compliant</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-700" />
                  <span>PCI DSS Level 1</span>
                </span>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Regional Hub Contact Modal (Clean Light Theme) */}
      <AnimatePresence>
        {activeModalHub && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalHub(null)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden z-10 text-slate-900 my-auto text-left"
            >
              {/* Modal Header */}
              <div className="bg-[#326E45] p-6 text-white relative">
                <button
                  onClick={() => setActiveModalHub(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-black/15 hover:bg-black/30 text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-2 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-1.5">
                  <Globe size={14} />
                  <span>Regional Operations Command • {activeModalHub.country}</span>
                </div>

                <div className="flex items-center gap-3">
                  <NationalFlagBadge country={activeModalHub.id} countryName={activeModalHub.country} size="md" className="!w-12 !h-9 shadow-md" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-tight">
                      {activeModalHub.city}, {activeModalHub.country}
                    </h3>
                    <p className="text-xs text-emerald-100 mt-0.5 font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse shrink-0" />
                      <span>Local Presence: <strong className="text-white font-bold">{activeModalHub.localPresence}</strong></span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                
                {/* Leader Profile Header */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={activeModalHub.leader.photo}
                      alt={activeModalHub.leader.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400';
                      }}
                    />
                    <span className="absolute -bottom-1 -right-1 w-5 h-3.5 rounded-[3px] overflow-hidden border-2 border-white shadow-xs z-10 bg-slate-100 flex items-center justify-center">
                      <NationalFlag country={activeModalHub.id} />
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {activeModalHub.leader.roleType}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                        <span className="w-3.5 h-2.5 rounded-[2px] overflow-hidden shadow-2xs inline-block border border-slate-200">
                          <NationalFlag country={activeModalHub.id} />
                        </span>
                        <span>{activeModalHub.country}</span>
                      </span>
                    </div>
                    <h4 className="text-lg font-display font-bold text-slate-900 mt-1">
                      {activeModalHub.leader.name}
                    </h4>
                    <p className="text-xs text-slate-600">
                      {activeModalHub.leader.title}
                    </p>
                    <p className="text-xs text-emerald-700 font-semibold mt-1">
                      {activeModalHub.leader.experience}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                  {activeModalHub.leader.bio}
                </div>

                {/* Office Info & Actions */}
                {!contactMode ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 rounded-xl border border-slate-200 bg-white">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Local Presence</span>
                        <span className="text-xs text-emerald-700 font-bold block mt-1 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span className="leading-snug">{activeModalHub.localPresence}</span>
                        </span>
                      </div>

                      <div className="p-3 rounded-xl border border-slate-200 bg-white sm:col-span-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Industry Associated -</span>
                        <span className="text-xs text-slate-900 font-bold block mt-1 flex items-center gap-1.5">
                          <Briefcase size={13} className="text-[#326E45] shrink-0" />
                          <span className="truncate">{activeModalHub.industryAssociated}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={() => setContactMode(true)}
                        className="flex-1 px-5 py-3 rounded-xl bg-[#326E45] hover:bg-[#245032] text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                      >
                        <Mail size={15} />
                        <span>Inquire with {activeModalHub.city} Team</span>
                      </button>

                      <a
                        href={`mailto:${activeModalHub.leader.email}`}
                        className="px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 bg-slate-50"
                      >
                        <ExternalLink size={14} />
                        <span>Direct Email</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Form */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="text-xs font-bold text-slate-900">
                        Inquire with {activeModalHub.city} Regional Team
                      </span>
                      <button
                        onClick={() => setContactMode(false)}
                        className="text-xs text-slate-500 hover:text-slate-800 underline"
                      >
                        Back
                      </button>
                    </div>

                    {contactSent ? (
                      <div className="py-6 text-center space-y-2">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                          <CheckCircle2 size={20} />
                        </div>
                        <h5 className="text-sm font-bold text-slate-900">Message Transmitted</h5>
                        <p className="text-xs text-slate-600 max-w-xs mx-auto">
                          Your request has been routed to <strong>{activeModalHub.leader.name}</strong> ({activeModalHub.city} Hub). We will respond promptly.
                        </p>
                        <button
                          onClick={() => { setContactSent(false); setContactMode(false); setActiveModalHub(null); }}
                          className="mt-3 px-4 py-1.5 rounded-lg bg-[#326E45] text-white text-xs font-bold"
                        >
                          Done
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleHubSubmit} className="space-y-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Your Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={hubFormData.name}
                            onChange={e => setHubFormData({ ...hubFormData, name: e.target.value })}
                            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#326E45]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Corporate Email</label>
                          <input
                            type="email"
                            required
                            placeholder="john@company.com"
                            value={hubFormData.email}
                            onChange={e => setHubFormData({ ...hubFormData, email: e.target.value })}
                            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#326E45]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Project or Inquiry Details</label>
                          <textarea
                            required
                            rows={3}
                            placeholder={`How can the MetaWave ${activeModalHub.city} team assist you?`}
                            value={hubFormData.message}
                            onChange={e => setHubFormData({ ...hubFormData, message: e.target.value })}
                            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#326E45]"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl bg-[#326E45] hover:bg-[#245032] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                        >
                          <Send size={13} />
                          <span>Submit Inquiry to {activeModalHub.city} Office</span>
                        </button>
                      </form>
                    )}
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Technology Partnership Inquiry Modal (Clean Light Theme) */}
      <AnimatePresence>
        {partnerModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPartnerModalOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden z-10 text-slate-900 my-auto text-left"
            >
              <div className="bg-[#326E45] p-6 text-white relative">
                <button
                  onClick={() => setPartnerModalOpen(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-black/15 hover:bg-black/30 text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-2 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-1.5">
                  <Handshake size={14} />
                  <span>Strategic Technology Alliance Desk</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  Partner with MetaWave Innovations
                </h3>
                <p className="text-xs text-emerald-100 mt-1">
                  Connect directly with our Global Technology Partnerships & Channel Alliances office.
                </p>
              </div>

              <div className="p-6">
                {partnerSent ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={24} />
                    </div>
                    <h5 className="text-base font-bold text-slate-900">Partnership Application Received</h5>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                      Thank you. Your inquiry for <strong>{partnerFormData.companyName}</strong> has been routed to our Alliance Directors. We will reach out within 24 business hours.
                    </p>
                    <button
                      onClick={() => setPartnerModalOpen(false)}
                      className="mt-4 px-5 py-2 rounded-xl bg-[#326E45] text-white text-xs font-bold"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handlePartnerSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Company / Organization Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Cloud Solutions"
                        value={partnerFormData.companyName}
                        onChange={e => setPartnerFormData({ ...partnerFormData, companyName: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#326E45]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Lead Contact Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Sarah Jenkins"
                          value={partnerFormData.contactPerson}
                          onChange={e => setPartnerFormData({ ...partnerFormData, contactPerson: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#326E45]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Work Email</label>
                        <input
                          type="email"
                          required
                          placeholder="sarah@apexcloud.com"
                          value={partnerFormData.workEmail}
                          onChange={e => setPartnerFormData({ ...partnerFormData, workEmail: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#326E45]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Partnership Track</label>
                      <select
                        value={partnerFormData.partnershipTrack}
                        onChange={e => setPartnerFormData({ ...partnerFormData, partnershipTrack: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#326E45]"
                      >
                        <option>Cloud & Infrastructure Alliance (ISV / SaaS)</option>
                        <option>Regional Delivery & System Integrator</option>
                        <option>Solution Co-Creation & Joint Venture</option>
                        <option>Academic or Applied AI Research Consortia</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Collaboration Objectives</label>
                      <textarea
                        rows={3}
                        placeholder="Briefly describe your solution or target client opportunities..."
                        value={partnerFormData.brief}
                        onChange={e => setPartnerFormData({ ...partnerFormData, brief: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#326E45]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#326E45] hover:bg-[#245032] text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 mt-2"
                    >
                      <Send size={14} />
                      <span>Submit Technology Partnership Application</span>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

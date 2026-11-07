import { SiteConfig, TemplateId } from '../types/site.ts';

import HERO_STUDIO_IMG from '../assets/images/hero_creative_studio_1793304977877.jpg';
import SHOWCASE_DIGITAL_IMG from '../assets/images/showcase_digital_platform_1793305105417.jpg';
import SHOWCASE_HARDWARE_IMG from '../assets/images/showcase_industrial_design_1793304979140.jpg';
import CASE_STUDY_FINTECH_IMG from '../assets/images/case_study_fintech_1793304978247.jpg';
import STUDIO_TEAM_IMG from '../assets/images/studio_team_architects_1793543877919.jpg';
import SHOWCASE_CLOUD_IMG from '../assets/images/showcase_cloud_datacenter_1793543876953.jpg';

import DAVID_WREKMAN_IMG from '../assets/images/david_wrekman.jpg';
import ATASH_MITCHUN_IMG from '../assets/images/atash_mitchun.jpg';
import HAZZIN_BRIAN_IMG from '../assets/images/hazzin_brian.jpg';

export {
  HERO_STUDIO_IMG,
  SHOWCASE_DIGITAL_IMG,
  SHOWCASE_HARDWARE_IMG,
  CASE_STUDY_FINTECH_IMG,
  STUDIO_TEAM_IMG,
  SHOWCASE_CLOUD_IMG,
  DAVID_WREKMAN_IMG,
  ATASH_MITCHUN_IMG,
  HAZZIN_BRIAN_IMG,
};

export const DEFAULT_AGENCY_CONFIG: SiteConfig = {
  brandName: 'Veloce Studio',
  brandTagline: 'Design Engineering & Digital Product Architecture',
  theme: 'obsidian',
  templateId: 'agency',
  seo: {
    home: {
      title: 'Veloce Studio – Bespoke Web Engineering & Platform Architecture',
      description: 'High-performance design engineering studio building bespoke web platforms, design systems, and cloud infrastructure for ambitious companies.',
      keywords: 'web engineering, design systems, react, typescript, performance',
    },
    services: {
      title: 'Engineering Services & Disciplines – Veloce Studio',
      description: 'Explore our 5 core disciplines: Bespoke Web Engineering, Tokenized Design Systems, Cloud Edge Infrastructure, Hardware Web Portals, and Core Web Vitals Optimization.',
      keywords: 'full-stack engineering, edge infrastructure, websockets, iot portals',
    },
    work: {
      title: 'Case Studies & Production Work – Veloce Studio',
      description: 'Verified commercial outcomes across institutional fintech, connected hardware, developer SaaS, and luxury direct-to-consumer platforms.',
      keywords: 'web case studies, portfolio, technical architecture, fintech web portal',
    },
    about: {
      title: 'About Studio & Engineering Leadership – Veloce Studio',
      description: 'Meet the partners behind Veloce Studio. Operating in London and Zurich with a strict manifesto against bloated web templates and generic AI slop.',
      keywords: 'design engineering team, london tech studio, zurich engineering, web manifesto',
    },
    pricing: {
      title: 'Interactive Scope Calculator & Sprint Pricing – Veloce Studio',
      description: 'Interactive website scope and investment estimator. Predictable sprint tiers with 100% Core Web Vitals guarantee and zero surprise billing.',
      keywords: 'web development pricing, sprint costs, website calculator, fixed-fee engineering',
    },
    contact: {
      title: 'Initiate Project Discovery & Scoping Brief – Veloce Studio',
      description: 'Submit your requirements to our engineering partners. We review every brief personally and provide a fixed-fee proposal within 24 hours.',
      keywords: 'contact web agency, start project, project brief, request proposal',
    },
  },
  hero: {
    eyebrow: 'Specialized Product Engineering · Operating in London & Zurich',
    title: 'We design and engineer bespoke web platforms for ambitious companies',
    description:
      'From high-conversion marketing flagships to mission-critical web applications, our multidisciplinary studio transforms complex requirements into lightning-fast, production-grade digital experiences.',
    primaryCtaLabel: 'Calculate Scope',
    secondaryCtaLabel: 'Explore Case Studies',
    image: HERO_STUDIO_IMG,
    stats: [
      { value: '$42M+', label: 'Client Pipeline Generated', detail: 'Validated across 28 global launches in 2025-2026' },
      { value: '99.98%', label: 'Infrastructure Reliability', detail: 'Zero-latency edge delivery on modern cloud CDNs' },
      { value: '14 Days', label: 'Average MVP Velocity', detail: 'From kickoff sprint to production preview deploy' },
    ],
  },
  capabilities: [
    {
      id: 'cap-1',
      num: '01',
      title: 'Architectural Web Engineering',
      category: 'Full-Stack Performance',
      desc: 'Bespoke frontends and resilient cloud systems built with React, TypeScript, edge computing, and zero-compromise page speed.',
      colSpan: 'lg:col-span-2',
      image: SHOWCASE_DIGITAL_IMG,
      features: ['Edge SSR & Static Hydration', 'Sub-second LCP optimization', 'Accessible component systems'],
    },
    {
      id: 'cap-2',
      num: '02',
      title: 'Design Systems & Brand Systems',
      category: 'Brand Foundations',
      desc: 'Scalable typography, micro-interactions, tokenized Figma libraries, and tactile motion design that command trust.',
      colSpan: 'lg:col-span-1',
      features: ['Unified Design Tokens', 'WCAG AA Compliance', 'Fluid responsive type scales'],
    },
    {
      id: 'cap-3',
      num: '03',
      title: 'Hardware & IoT Web Interfaces',
      category: 'Connected Systems',
      desc: 'Precision telemetry dashboards and high-fidelity 3D/canvas product showcases with real-time feedback loops.',
      colSpan: 'lg:col-span-1',
      image: SHOWCASE_HARDWARE_IMG,
      features: ['Low-latency WebSockets', 'Hardware control panels', 'Offline-first sync'],
    },
    {
      id: 'cap-4',
      num: '04',
      title: 'Conversion Funnels & Enterprise Platforms',
      category: 'Commercial Growth',
      desc: 'High-converting interactive estimators, frictionless self-serve onboarding, and automated checkout pipelines.',
      colSpan: 'lg:col-span-2',
      features: ['Lead qualification engines', 'Stripe & ERP integrations', 'A/B testing architecture'],
    },
  ],
  servicesDetails: [
    {
      id: 'srv-web-eng',
      num: '01',
      title: 'Bespoke Web Application Engineering',
      tagline: 'High-performance React & TypeScript platforms engineered for scale',
      summary:
        'We engineer tailor-made web applications with strict attention to Core Web Vitals, zero bloat, and enterprise security standards. Every line of code is modular, strictly typed, and completely owned by your company.',
      deliverables: [
        'Production React 19 & TypeScript SPA/SSR Architecture',
        'Tailwind CSS v4 tokenized design system',
        'State management & real-time reactive sync',
        'Comprehensive unit & integration test coverage',
        'Edge deployment automation (Cloud Run / Vercel / Cloudflare)',
      ],
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js', 'PostgreSQL'],
      idealFor: 'Startups and enterprises launching new flagship products or rebuilding slow legacy portals.',
    },
    {
      id: 'srv-design-systems',
      num: '02',
      title: 'Tokenized Design Systems & UI Craft',
      tagline: 'Cohesive visual identity translated directly into production code',
      summary:
        'Eliminate the design-development handoff disconnect. We create unified token libraries in Figma paired with 1:1 React component libraries, complete with fluid typography, dark mode compensation, and micro-interactions.',
      deliverables: [
        'Figma Design Tokens & Component Libraries',
        'Accessible WCAG AA compliant UI components',
        'Tactile micro-interactions (Motion / Framer curves)',
        'Dark & light mode optical color calibration',
        'Interactive Storybook / Component Documentation',
      ],
      stack: ['Figma Tokens', 'Motion', 'Tailwind CSS', 'Radix UI / Headless primitives'],
      idealFor: 'Product teams that need design consistency across multiple apps and web properties.',
    },
    {
      id: 'srv-cloud-edge',
      num: '03',
      title: 'Cloud Edge Infrastructure & APIs',
      tagline: 'Sub-millisecond global routing and rock-solid backend services',
      summary:
        'We architect resilient cloud backends, serverless edge workers, and database layers that scale to millions of concurrent requests while keeping hosting costs minimal.',
      deliverables: [
        'Containerized microservices & serverless routing',
        'Relational database modeling & schema migrations',
        'Secure OAuth 2.0 & Role-Based Access Control (RBAC)',
        'Distributed edge caching and asset optimization',
        '99.98% SLA monitoring and automated recovery',
      ],
      stack: ['Google Cloud Run', 'Docker', 'PostgreSQL', 'Cloudflare Workers', 'Redis'],
      idealFor: 'High-traffic SaaS applications requiring strict security, data integrity, and global speed.',
    },
    {
      id: 'srv-hardware-telemetry',
      num: '04',
      title: 'Hardware & Connected Device Web Portals',
      tagline: 'Real-time telemetry consoles for robotics, mobility, and IoT',
      summary:
        'Connect physical machines to intuitive web controls. We build browser-based dashboards that stream sensor readings, 3D diagnostics, and device controls over sub-50ms WebSocket channels.',
      deliverables: [
        'Real-time WebSocket telemetry ingestion',
        'Interactive Canvas & Three.js 3D model viewers',
        'Offline-first caching and remote command queues',
        'Granular device permission matrices',
        'Exportable compliance & sensor logs',
      ],
      stack: ['WebSockets', 'Canvas API', 'Three.js', 'Protobuf', 'TimescaleDB'],
      idealFor: 'Industrial robotics, electric mobility, medical hardware, and environmental monitoring systems.',
    },
    {
      id: 'srv-conversion-audit',
      num: '05',
      title: 'Core Web Vitals & Conversion Optimization',
      tagline: 'Transform sluggish visitor drop-off into high-converting momentum',
      summary:
        'Speed is revenue. We audit existing web systems, strip out third-party script bloat, optimize rendering paths, and implement frictionless customer onboarding flows that boost conversions.',
      deliverables: [
        'Complete Core Web Vitals audit & remediation (LCP, INP, CLS)',
        'Third-party tracker consolidation & server-side tagging',
        'Interactive self-serve pricing & onboarding calculators',
        'Structured schema.org SEO and social cards implementation',
        'Conversion analytics & heatmapping instrumentation',
      ],
      stack: ['Chrome DevTools', 'Lighthouse CI', 'Schema.org JSON-LD', 'Privacy-first Analytics'],
      idealFor: 'B2B companies seeking higher organic search rankings and higher demo-booking rates.',
    },
  ],
  caseStudies: [
    {
      id: 'case-1',
      client: 'Aethel Financial',
      year: '2026',
      category: 'Institutional Asset Tech',
      industry: 'fintech',
      title: 'Real-time multi-market trading portal & brand overhaul',
      metric: '+184%',
      metricLabel: 'Qualified Enterprise Inbound in 90 Days',
      summary: 'Engineered an ultra-low-latency web portal for European institutional liquidity providers, cutting initial client onboarding from 5 days to 8 minutes.',
      challenge: 'The legacy client portal suffered from slow rendering, fragmented design debt, and high customer abandonment during compliance verification.',
      solution: 'Re-architected the entire platform with modular React components, real-time reactive data streaming, and a high-trust editorial visual system.',
      deliverables: ['Custom Design System', 'Sub-100ms Data Feeds', 'Automated KYC Flow', '1440px Desktop Command Center'],
      image: CASE_STUDY_FINTECH_IMG,
    },
    {
      id: 'case-2',
      client: 'Kroma Mobility & Hardware',
      year: '2025',
      category: 'Industrial Hardware',
      industry: 'hardware',
      title: 'Next-generation electric telemetry console & commercial launch',
      metric: '$6.4M',
      metricLabel: 'Direct Fleet Pre-orders Secured',
      summary: 'Created the digital flagship and dynamic 3D configuration tool for autonomous light-electric utility vehicles.',
      challenge: 'B2B fleet buyers required complex custom option configuration without contacting sales representatives repeatedly.',
      solution: 'Built an interactive visual vehicle builder with live bill-of-materials pricing, generating instant formal PDF proposals.',
      deliverables: ['Interactive Configurator', 'Automated ERP Pricing Engine', 'Multi-region localized stores'],
      image: SHOWCASE_HARDWARE_IMG,
    },
    {
      id: 'case-3',
      client: 'Synthetix Edge Systems',
      year: '2026',
      category: 'Developer Infrastructure',
      industry: 'saas',
      title: 'Developer documentation & global edge orchestration console',
      metric: '0.4s',
      metricLabel: 'Average Global LCP Speed',
      summary: 'Architected a developer platform with interactive API playgrounds, live terminal previews, and instant multi-region edge deployment verification.',
      challenge: 'Developers were bouncing off outdated documentation tables and complex manual deployment configurations.',
      solution: 'Designed a dark-mode focused, tabular data console with instant code generators and zero-latency search index.',
      deliverables: ['Interactive Code Sandbox', 'Sub-millisecond Search', 'Custom Tabular Monospace Grid', 'CLI Token Integrations'],
      image: SHOWCASE_CLOUD_IMG,
    },
    {
      id: 'case-4',
      client: 'Asterna Luxury Devices',
      year: '2025',
      category: 'Consumer Electronics & Brand',
      industry: 'brand',
      title: 'Bespoke direct-to-consumer flagship & digital pre-order salon',
      metric: '4.8x',
      metricLabel: 'Checkout Completion Surge',
      summary: 'Delivered an ultra-minimalist luxury web showcase for high-precision acoustic instruments with tactile physics-based scrolling.',
      challenge: 'Standard e-commerce store templates failed to communicate the premium titanium craftsmanship and industrial pedigree of the device.',
      solution: 'Custom high-fidelity photographic transitions, micro-audio feedback, and a streamlined single-view checkout sequence.',
      deliverables: ['Editorial Brand Typography', 'Dynamic 3D Scroll Physics', 'Global Multi-Currency Checkout', 'VIP Reservation Engine'],
      image: SHOWCASE_DIGITAL_IMG,
    },
  ],
  teamMembers: [
    {
      id: 'team-davidwrekman',
      name: 'David Wrekman',
      role: 'Founder & Principal Systems Architect',
      location: 'London & Nairobi',
      prior: 'Principal Systems Architect & Technical Director',
      focus: 'Enterprise platform architecture, full-stack systems engineering, and client delivery.',
      bio: 'David directs studio technical vision, scalable cloud infrastructure, and engineering execution across flagship enterprise projects.',
      image: DAVID_WREKMAN_IMG,
    },
    {
      id: 'team-atashmitchun',
      name: 'Atash Mitchun',
      role: 'Technical Director & Lead Platform Architect',
      location: 'London & Nairobi',
      prior: 'Senior Full-Stack & Systems Performance Specialist',
      focus: 'React 19 internals, distributed edge runtimes, and sub-millisecond data pipelines.',
      bio: 'Atash leads platform reliability, reactive state synchronization, and zero-compromise Core Web Vitals across our production deployments.',
      image: ATASH_MITCHUN_IMG,
    },
    {
      id: 'team-hazzinbrian',
      name: 'Hazzin Brian',
      role: 'Design Director & Head of Product Experience',
      location: 'Zurich & Nairobi',
      prior: 'Principal Interface Architect & Brand Systems Lead',
      focus: 'Tokenized design systems, tactile motion physics, and accessible typography.',
      bio: 'Hazzin orchestrates our visual language, Figma token pipelines, and high-order interface micro-interactions that elevate brand trust.',
      image: HAZZIN_BRIAN_IMG,
    },
  ],
  pricingPlans: [
    {
      id: 'plan-sprint',
      name: 'Sprint Flagship',
      description: 'Ideal for early-stage companies and product pre-launches needing an unforgettable first impression.',
      monthlyPrice: 3800,
      annualPrice: 3200,
      popular: false,
      features: [
        'Single-page high-conversion flagship',
        'Tailored brand identity & typography system',
        'Custom interactive scope or lead calculator',
        'Sub-second Core Web Vitals optimization',
        '7-day post-launch warranty & QA support',
      ],
      ctaText: 'Select Sprint Package',
    },
    {
      id: 'plan-platform',
      name: 'Growth Platform',
      description: 'Comprehensive multi-page website and web application infrastructure for scaling market leaders.',
      monthlyPrice: 7500,
      annualPrice: 6400,
      popular: true,
      features: [
        'Up to 8 custom responsive pages & layouts',
        'Component design system in Figma & code',
        'Headless CMS or dynamic database wiring',
        'Advanced micro-interactions & motion design',
        'Custom customer portal or booking system',
        '30-day dedicated engineering sprint',
      ],
      ctaText: 'Start Growth Project',
    },
    {
      id: 'plan-enterprise',
      name: 'Custom Enterprise',
      description: 'Dedicated embedded design engineering team for mission-critical web applications and large platforms.',
      monthlyPrice: 14500,
      annualPrice: 12000,
      popular: false,
      features: [
        'Full bespoke application architecture',
        'Zero-trust authentication & RBAC setups',
        'Hardware / IoT telemetry dashboards',
        'Custom animations & WebGL spatial modules',
        'SLA guaranteed 99.99% uptime compliance',
        'Ongoing quarterly optimization retainer',
      ],
      ctaText: 'Schedule Technical Discovery',
    },
  ],
  testimonials: [
    {
      id: 't-1',
      quote:
        'Veloce rebuilt our entire customer acquisition web system from the ground up. The design sophistication and sub-second load times doubled our demo booking conversion rate within the first month.',
      author: 'Marcus Vance',
      role: 'VP of Product',
      company: 'Aethel Financial',
      impactMetric: '+184% Inbound Leads',
    },
    {
      id: 't-2',
      quote:
        'They do not build cookie-cutter templates. The craftsmanship in every micro-interaction and the precision of their technical architecture saved us 6 months of internal development.',
      author: 'Elena Rostova',
      role: 'Co-Founder & CTO',
      company: 'Nexus Precision Systems',
      impactMetric: '$6.4M Pre-Orders',
    },
    {
      id: 't-3',
      quote:
        'Working with Veloce feels like having a world-class in-house design engineering department without the 12-month hiring curve. Our developer documentation is now considered the gold standard in our industry.',
      author: 'Dr. Lucas Lindqvist',
      role: 'Chief Architect',
      company: 'Synthetix Edge Systems',
      impactMetric: '0.4s LCP Verified',
    },
  ],
  faqs: [
    {
      id: 'faq-1',
      category: 'Timeline & Process',
      question: 'What is the standard delivery timeline for a custom website?',
      answer:
        'A focused high-impact flagship or landing platform is typically completed in 2 to 3 weeks. Multi-page enterprise platforms and integrated web applications usually span 4 to 8 weeks depending on scope, database requirements, and custom integrations.',
    },
    {
      id: 'faq-2',
      category: 'Ownership & Licensing',
      question: 'Do you provide full source code ownership upon completion?',
      answer:
        'Yes, 100%. All design files (Figma tokens, vector components), frontend code (TypeScript, React, Tailwind), and configuration files are fully transferred to your repository with an open commercial license.',
    },
    {
      id: 'faq-3',
      category: 'Infrastructure & Hosting',
      question: 'How do you handle hosting, domain setup, and ongoing updates?',
      answer:
        'We configure your production deployment on leading modern infrastructure (such as Cloud Run, Vercel, or Cloudflare Edge) with automated CI/CD pipelines, SSL certificates, and zero-maintenance static caching.',
    },
    {
      id: 'faq-4',
      category: 'Content & CMS',
      question: 'Can we edit copy and images ourselves after launch?',
      answer:
        'Absolutely. We can connect your site to a streamlined headless CMS (like Sanity, Strapi, or Supabase) or configure modular JSON content files so your team can publish updates without touching code.',
    },
    {
      id: 'faq-5',
      category: 'Support & Guarantees',
      question: 'What guarantees do you offer for performance and uptime?',
      answer:
        'We back our platforms with a 100% Core Web Vitals guarantee (Green 95+ score on desktop and mobile) and provide a 30-day bug-free stabilization guarantee following launch.',
    },
  ],
};

export const TEMPLATE_PRESETS: Record<TemplateId, Partial<SiteConfig>> = {
  agency: DEFAULT_AGENCY_CONFIG,
  saas: {
    brandName: 'Synthetix Cloud',
    brandTagline: 'Autonomous Infrastructure & Edge Orchestration',
    hero: {
      eyebrow: 'Developer Platform · Next Generation Web Speed',
      title: 'Automate your web application deployments at global scale',
      description:
        'The developer-first cloud platform engineered for real-time applications, sub-millisecond edge routing, and instant zero-config continuous delivery.',
      primaryCtaLabel: 'Calculate Scope',
      secondaryCtaLabel: 'Explore Services',
      image: SHOWCASE_DIGITAL_IMG,
      stats: [
        { value: '18ms', label: 'Global Edge Latency', detail: 'Serving over 220 edge regions worldwide' },
        { value: '99.99%', label: 'Guaranteed SLA Uptime', detail: 'Multi-cloud failover redundancy' },
        { value: '4.2x', label: 'Build Pipeline Speed', detail: 'Compared to conventional container builders' },
      ],
    },
  },
  hardware: {
    brandName: 'Kroma Precision',
    brandTagline: 'Industrial Prototyping & OEM Fabrication',
    hero: {
      eyebrow: 'Precision Engineering · Munich & Zurich Facilities',
      title: 'High-tolerance mechanical prototyping and connected hardware systems',
      description:
        'We design and manufacture production-grade telemetry instruments, custom enclosures, and connected robotic modules with micron-level tolerances.',
      primaryCtaLabel: 'Request Hardware Scope',
      secondaryCtaLabel: 'Inspect Prototypes',
      image: SHOWCASE_HARDWARE_IMG,
      stats: [
        { value: '±0.005mm', label: 'Tolerance Standard', detail: 'Verified by 5-axis optical laser measurement' },
        { value: '72 Hours', label: 'Rapid Prototype Cycle', detail: 'From CAD review to physical CNC milling' },
        { value: 'ISO 9001', label: 'Certified Production', detail: 'Aerospace & medical grade cleanroom assembly' },
      ],
    },
  },
  consulting: {
    brandName: 'Stratum Advisory',
    brandTagline: 'Digital Transformation & Strategic Technology',
    hero: {
      eyebrow: 'Board-Level Technology Advisory · New York & London',
      title: 'Strategic engineering leadership for high-growth enterprise transformations',
      description:
        'We advise Fortune 500 boards and fast-growing technology scaleups on platform modernization, cloud cost architecture, and technical acquisition diligence.',
      primaryCtaLabel: 'Schedule Briefing',
      secondaryCtaLabel: 'Review Track Record',
      image: CASE_STUDY_FINTECH_IMG,
      stats: [
        { value: '$1.8B', label: 'Transaction Value Advised', detail: 'Across 42 strategic M&A technical audits' },
        { value: '38%', label: 'Average Cloud Cost Reduction', detail: 'Unlocking millions in operational runway' },
        { value: '100%', label: 'Partner-Led Engagements', detail: 'Direct access to veteran engineering executives' },
      ],
    },
  },
};

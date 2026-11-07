export type PageId = 'home' | 'services' | 'work' | 'about' | 'pricing' | 'contact';

export type ThemeMode = 'obsidian' | 'light' | 'cobalt' | 'luxury' | 'emerald';

export type TemplateId = 'agency' | 'saas' | 'hardware' | 'consulting';

export type DeviceViewport = 'desktop' | 'tablet' | 'mobile';

export interface HeroConfig {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  image: string;
  stats: Array<{
    value: string;
    label: string;
    detail: string;
  }>;
}

export interface CapabilityItem {
  id: string;
  num: string;
  title: string;
  desc: string;
  category: string;
  colSpan: string;
  image?: string;
  features: string[];
}

export interface ServiceDetail {
  id: string;
  num: string;
  title: string;
  tagline: string;
  summary: string;
  deliverables: string[];
  stack: string[];
  idealFor: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  year: string;
  category: string;
  industry: 'fintech' | 'hardware' | 'saas' | 'brand';
  title: string;
  metric: string;
  metricLabel: string;
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  focus: string;
  location: string;
  prior: string;
  image?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  impactMetric: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface PageSeoMetadata {
  title: string;
  description: string;
  keywords?: string;
}

export interface SiteConfig {
  brandName: string;
  brandTagline: string;
  theme: ThemeMode;
  templateId: TemplateId;
  seo: Record<PageId, PageSeoMetadata>;
  hero: HeroConfig;
  capabilities: CapabilityItem[];
  servicesDetails: ServiceDetail[];
  caseStudies: CaseStudy[];
  teamMembers: TeamMember[];
  pricingPlans: PricingPlan[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
}

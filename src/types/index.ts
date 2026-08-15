export interface ExpertiseArea {
  slug: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface ServiceItem {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  icon: string;
  deliverables: string[];
  hasDetailPage: boolean;
  active: boolean;
}

export interface ExperienceRole {
  id: string;
  role: string;
  organisation: string;
  location: string;
  period: string;
  focus: string;
  highlights: string[];
  image: string;
}

export interface PublicationRecord {
  id: string;
  topic: string;
  year: string;
  journalStatus: string;
  description: string;
  link?: string;
}

export interface EducationRecord {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
}

export interface InsightArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  status: 'Published' | 'In preparation';
  image: string;
}

export type ResourceStatus = 'Published' | 'Draft' | 'Review' | 'Archived';

export interface ResourceDocument {
  id: string;
  title: string;
  description: string;
  type: string;
  version: string;
  updated: string;
  status: ResourceStatus;
  fileSize: string;
  body: string;
  downloads: number;
}

export type LeadStage = 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Closed';

export interface Lead {
  id: string;
  name: string;
  organisation: string;
  topic: string;
  source: 'Ask Kennedy' | 'Contact form' | 'Booking' | 'WhatsApp';
  date: string;
  stage: LeadStage;
  email: string;
  phone?: string;
  message: string;
  transcript?: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  organisation: string;
  consultationType: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
  notes?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
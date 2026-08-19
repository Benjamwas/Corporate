export type ResourceStatus = 'Published' | 'Draft' | 'Review' | 'Archived';
export type LeadStage = 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Closed';
export type BookingStatus = 'Confirmed' | 'Pending' | 'Completed';
export type LeadSource = 'Ask Kennedy' | 'Contact form' | 'Booking' | 'WhatsApp';

export interface Document {
  id: string;
  title: string;
  description: string;
  type: string;
  version: string;
  updated: string;
  status: ResourceStatus;
  file_size: string;
  body: string;
  downloads: number;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  organisation: string;
  topic: string;
  source: LeadSource;
  date: string;
  stage: LeadStage;
  email: string;
  phone: string | null;
  message: string;
  transcript: string | null;
  created_at: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  organisation: string;
  consultation_type: string;
  date: string;
  time: string;
  status: BookingStatus;
  notes: string | null;
  created_at: string;
}

export interface Setting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface AuthPayload {
  userId: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

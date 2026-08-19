import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { initialBookings, initialLeads, initialResources } from '../data/resources';
import type { Booking, Lead, LeadStage, ResourceDocument } from '../types';

interface SiteDataValue {
  documents: ResourceDocument[];
  leads: Lead[];
  bookings: Booking[];
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
  saveDocument: (doc: ResourceDocument) => void;
  deleteDocument: (id: string) => void;
  registerDownload: (id: string) => void;
  addLead: (lead: Omit<Lead, 'id' | 'date' | 'stage'>) => void;
  moveLead: (id: string, stage: LeadStage) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'status'>) => void;
  setBookingStatus: (id: string, status: Booking['status']) => void;
}

const SiteDataContext = createContext<SiteDataValue | undefined>(undefined);

const OWNER_EMAIL = 'kennedy@kennedymutua.com';

export function SiteDataProvider({ children }: {children: React.ReactNode;}) {
  const [documents, setDocuments] = useState<ResourceDocument[]>(initialResources);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = useCallback((email: string, password: string) => {
    const ok = email.trim().toLowerCase() === OWNER_EMAIL && password.length >= 6;
    setIsAuthenticated(ok);
    return ok;
  }, []);

  const signOut = useCallback(() => setIsAuthenticated(false), []);

  const saveDocument = useCallback((doc: ResourceDocument) => {
    setDocuments((prev) => {
      const exists = prev.some((item) => item.id === doc.id);
      return exists ? prev.map((item) => item.id === doc.id ? doc : item) : [doc, ...prev];
    });
  }, []);

  const deleteDocument = useCallback((id: string) => {
    setDocuments((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const registerDownload = useCallback((id: string) => {
    setDocuments((prev) =>
    prev.map((item) => item.id === id ? { ...item, downloads: item.downloads + 1 } : item)
    );
  }, []);

  const addLead = useCallback((lead: Omit<Lead, 'id' | 'date' | 'stage'>) => {
    setLeads((prev) => [
    {
      ...lead,
      id: `lead-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      stage: 'New'
    },
    ...prev]
    );
  }, []);

  const moveLead = useCallback((id: string, stage: LeadStage) => {
    setLeads((prev) => prev.map((lead) => lead.id === id ? { ...lead, stage } : lead));
  }, []);

  const addBooking = useCallback((booking: Omit<Booking, 'id' | 'status'>) => {
    setBookings((prev) => [{ ...booking, id: `bk-${Date.now()}`, status: 'Confirmed' }, ...prev]);
  }, []);

  const setBookingStatus = useCallback((id: string, status: Booking['status']) => {
    setBookings((prev) => prev.map((item) => item.id === id ? { ...item, status } : item));
  }, []);

  const value = useMemo(
    () => ({
      documents,
      leads,
      bookings,
      isAuthenticated,
      signIn,
      signOut,
      saveDocument,
      deleteDocument,
      registerDownload,
      addLead,
      moveLead,
      addBooking,
      setBookingStatus
    }),
    [
    documents,
    leads,
    bookings,
    isAuthenticated,
    signIn,
    signOut,
    saveDocument,
    deleteDocument,
    registerDownload,
    addLead,
    moveLead,
    addBooking,
    setBookingStatus]

  );

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData(): SiteDataValue {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error('useSiteData must be used within a SiteDataProvider');
  return ctx;
}
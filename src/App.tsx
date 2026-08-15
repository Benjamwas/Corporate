import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { SiteDataProvider } from './contexts/SiteDataContext';
import { UiProvider } from './contexts/UiContext';
import { SiteLayout } from './components/layout/SiteLayout';
import { AdminLayout } from './components/admin/AdminLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Expertise } from './pages/Expertise';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { Experience } from './pages/Experience';
import { Research } from './pages/Research';
import { Publications } from './pages/Publications';
import { Insights } from './pages/Insights';
import { Resources } from './pages/Resources';
import { Contact } from './pages/Contact';
import { Booking } from './pages/Booking';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminDocuments } from './pages/admin/AdminDocuments';
import { DocumentEditor } from './pages/admin/DocumentEditor';
import { AdminLeads } from './pages/admin/AdminLeads';
import { AdminBookings } from './pages/admin/AdminBookings';
import { AdminSettings } from './pages/admin/AdminSettings';

export function App() {
  return (
    <ThemeProvider>
      <SiteDataProvider>
        <UiProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<SiteLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/expertise" element={<Expertise />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/research" element={<Research />} />
                <Route path="/publications" element={<Publications />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="*" element={<Home />} />
              </Route>

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="documents" element={<AdminDocuments />} />
                <Route path="documents/:id" element={<DocumentEditor />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="leads" element={<AdminLeads />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UiProvider>
      </SiteDataProvider>
    </ThemeProvider>);

}
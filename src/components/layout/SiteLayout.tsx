import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AtmosphereBackground } from '../AtmosphereBackground';
import { AskKennedy } from '../assistant/AskKennedy';
import { WhatsAppButton } from '../WhatsAppButton';

export function SiteLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <AtmosphereBackground />
      <Navbar />
      <main id="main" className="flex-1 pt-24 sm:pt-28">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <AskKennedy />
    </div>);

}
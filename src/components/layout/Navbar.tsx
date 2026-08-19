import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, MenuIcon, MoonIcon, SunIcon, XIcon } from 'lucide-react';
import { primaryNav, secondaryNav } from '../../data/navigation';
import { profile } from '../../data/profile';
import { useTheme } from '../../contexts/ThemeContext';
import { ActionLink } from '../ui/ActionButton';
import { cn } from '../../utils/cn';

const linkClass = ({ isActive }: {isActive: boolean;}) =>
cn(
  'rounded-full px-3 py-2 text-[13px] transition-colors duration-200 ease-premium',
  isActive ? 'text-accent' : 'text-ink-muted hover:text-ink'
);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          'mx-auto flex max-w-content items-center justify-between rounded-full transition-[padding,background-color,backdrop-filter] duration-300 ease-premium',
          scrolled ? 'glass-strong px-3 py-2' : 'glass px-4 py-3'
        )}>
        
        <Link to="/" className="flex items-center gap-3 pl-1">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-accent text-[13px] font-semibold text-accent-contrast">
            KM
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[13px] font-semibold tracking-[0.14em] text-ink">
              {profile.logo}
            </span>
            <span className="hidden text-[10.5px] tracking-[0.08em] text-ink-subtle sm:block">
              {profile.subLabel}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center lg:flex">
          {primaryNav.map((item) =>
          <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
              {item.label}
            </NavLink>
          )}
          <div className="hidden xl:flex">
            {secondaryNav.map((item) =>
            <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            )}
          </div>
          <div className="relative xl:hidden">
            <button
              type="button"
              onClick={() => setMoreOpen((prev) => !prev)}
              aria-expanded={moreOpen}
              className="flex items-center gap-1 rounded-full px-3 py-2 text-[13px] text-ink-muted transition-colors duration-200 hover:text-ink">
              
              More
              <ChevronDownIcon className={cn('h-3.5 w-3.5 transition-transform duration-200', moreOpen && 'rotate-180')} />
            </button>
            <AnimatePresence>
              {moreOpen &&
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                className="glass-strong absolute right-0 top-full mt-2 w-48 rounded-3xl p-2">
                
                  {secondaryNav.map((item) =>
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="block rounded-2xl px-3 py-2 text-[13px] text-ink-muted transition-colors duration-200 hover:bg-accent/10 hover:text-accent">
                  
                      {item.label}
                    </NavLink>
                )}
                </motion.div>
              }
            </AnimatePresence>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line/70 text-ink-muted transition-colors duration-200 hover:text-accent">
            
            {theme === 'light' ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
          </button>
          <ActionLink to="/booking" size="sm" className="hidden sm:inline-flex">
            Book Consultation
          </ActionLink>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line/70 text-ink lg:hidden">
            
            {mobileOpen ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen &&
        <motion.nav
          aria-label="Mobile"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="glass-strong mx-auto mt-2 max-w-content rounded-4xl p-3 lg:hidden">
          
            <ul className="grid grid-cols-2 gap-1">
              {[...primaryNav, ...secondaryNav].map((item) =>
            <li key={item.to}>
                  <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                cn(
                  'block rounded-2xl px-3 py-2.5 text-sm transition-colors duration-200',
                  isActive ? 'bg-accent/12 text-accent' : 'text-ink-muted hover:text-ink'
                )
                }>
                
                    {item.label}
                  </NavLink>
                </li>
            )}
            </ul>
            <ActionLink to="/booking" className="mt-3 w-full">
              Book Consultation
            </ActionLink>
          </motion.nav>
        }
      </AnimatePresence>
    </header>);

}
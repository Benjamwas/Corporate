import React from 'react';
import { Link, NavLink, Navigate, Outlet } from 'react-router-dom';
import {
  CalendarDaysIcon,
  ExternalLinkIcon,
  FilesIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  UsersIcon } from
'lucide-react';
import { useSiteData } from '../../contexts/SiteDataContext';
import { useTheme } from '../../contexts/ThemeContext';
import { profile } from '../../data/profile';
import { cn } from '../../utils/cn';

const adminNav = [
{ label: 'Dashboard', to: '/admin', icon: LayoutDashboardIcon, end: true },
{ label: 'Documents', to: '/admin/documents', icon: FilesIcon },
{ label: 'Bookings', to: '/admin/bookings', icon: CalendarDaysIcon },
{ label: 'Leads', to: '/admin/leads', icon: UsersIcon },
{ label: 'Settings', to: '/admin/settings', icon: SettingsIcon }];


export function AdminLayout() {
  const { isAuthenticated, signOut } = useSiteData();
  const { theme, toggleTheme } = useTheme();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex min-h-screen w-full bg-canvas">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-line/60 p-5 lg:flex">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-accent text-[13px] font-semibold text-accent-contrast">
            KM
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[12.5px] font-semibold tracking-[0.14em] text-ink">
              {profile.logo}
            </span>
            <span className="block text-[10.5px] text-ink-subtle">Owner portal</span>
          </span>
        </Link>

        <nav aria-label="Admin" className="mt-9 flex-1 space-y-1">
          {adminNav.map((item) =>
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-[13.5px] transition-colors duration-200',
              isActive ? 'bg-accent/12 text-accent' : 'text-ink-muted hover:text-ink'
            )
            }>
            
              <item.icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </NavLink>
          )}
        </nav>

        <div className="space-y-1 border-t border-line/60 pt-4">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-[13.5px] text-ink-muted transition-colors duration-200 hover:text-ink">
            
            <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
            View public site
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-[13.5px] text-ink-muted transition-colors duration-200 hover:text-ink">
            
            {theme === 'light' ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
          <button
            type="button"
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-[13.5px] text-ink-muted transition-colors duration-200 hover:text-ink">
            
            <LogOutIcon className="h-4 w-4" aria-hidden="true" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <nav
          aria-label="Admin sections"
          className="flex gap-1 overflow-x-auto border-b border-line/60 px-4 py-3 lg:hidden">
          
          {adminNav.map((item) =>
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
            cn(
              'whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] transition-colors duration-200',
              isActive ? 'bg-accent/12 text-accent' : 'text-ink-muted'
            )
            }>
            
              {item.label}
            </NavLink>
          )}
        </nav>
        <main className="p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>);

}
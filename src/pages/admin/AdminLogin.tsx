import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockIcon } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { ActionButton } from '../../components/ui/ActionButton';
import { AtmosphereBackground } from '../../components/AtmosphereBackground';
import { useSiteData } from '../../contexts/SiteDataContext';
import { profile } from '../../data/profile';
import { useSeo } from '../../utils/seo';

export function AdminLogin() {
  const { signIn } = useSiteData();
  const navigate = useNavigate();
  const [email, setEmail] = useState('kennedy@kennedymutua.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useSeo({
    title: 'Owner sign in — Kennedy Mutua',
    description: 'Private owner portal for documents, bookings and leads.',
    path: '/admin/login'
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (signIn(email, password)) {
      navigate('/admin');
    } else {
      setError('Those credentials do not match the owner account.');
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center px-5 py-16">
      <AtmosphereBackground />
      <GlassCard strong className="w-full max-w-md p-8 sm:p-10">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-accent-contrast">
          <LockIcon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h1 className="mt-6 font-display text-[26px] font-semibold tracking-tightest text-ink">
          Owner portal
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
          Private access for {profile.shortName} — documents, bookings, leads and site content.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-3">
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] text-ink-muted">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-line/80 bg-canvas/60 px-4 py-3 text-sm text-ink focus:border-accent/60 focus:outline-none" />
            
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] text-ink-muted">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 6 characters"
              className="w-full rounded-2xl border border-line/80 bg-canvas/60 px-4 py-3 text-sm text-ink placeholder:text-ink-subtle focus:border-accent/60 focus:outline-none" />
            
          </label>

          {error &&
          <p role="alert" className="rounded-2xl border border-clay-400/40 bg-clay-400/10 px-4 py-3 text-[13px] text-ink">
              {error}
            </p>
          }

          <ActionButton type="submit" size="lg" className="w-full">
            Sign in
          </ActionButton>
        </form>

        <Link
          to="/"
          className="mt-6 inline-block text-[13px] text-ink-subtle transition-colors duration-200 hover:text-accent">
          
          ← Back to the public site
        </Link>
      </GlassCard>
    </div>);

}
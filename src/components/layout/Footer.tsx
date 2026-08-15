import React from 'react';
import { Link } from 'react-router-dom';
import { LinkedinIcon, MailIcon, MessageCircleIcon } from 'lucide-react';
import { footerNav } from '../../data/navigation';
import { profile } from '../../data/profile';
import { ActionLink } from '../ui/ActionButton';
import { buildWhatsappLink } from '../../utils/assistant';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line/60 px-5 pb-10 pt-14">
      <div className="mx-auto grid max-w-content gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-sm font-semibold text-accent-contrast">
              KM
            </span>
            <span className="leading-tight">
              <span className="block font-display text-sm font-semibold tracking-[0.14em] text-ink">
                {profile.logo}
              </span>
              <span className="block text-[11px] tracking-[0.08em] text-ink-subtle">{profile.subLabel}</span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
            {profile.brandLine} Advisory and research at the intersection of climate action,
            sustainability and agricultural economics.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line/70 text-ink-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent">
              
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line/70 text-ink-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent">
              
              <MailIcon className="h-4 w-4" />
            </a>
            <a
              href={buildWhatsappLink(profile.whatsapp, profile.defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line/70 text-ink-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent">
              
              <MessageCircleIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-[11px] tracking-[0.16em] text-ink-subtle">EXPLORE</h2>
          <ul className="mt-4 space-y-2.5">
            {footerNav.map((item) =>
            <li key={item.to}>
                <Link
                to={item.to}
                className="text-sm text-ink-muted transition-colors duration-200 hover:text-accent">
                
                  {item.label}
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="flex flex-col">
          <h2 className="text-[11px] tracking-[0.16em] text-ink-subtle">START A CONVERSATION</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            Consultations are held remotely. Share the challenge and the evidence you already have.
          </p>
          <ActionLink to="/booking" className="mt-6 self-start">
            Book a Consultation
          </ActionLink>
          <p className="mt-4 text-sm text-ink-subtle">{profile.baseLocation}</p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-content flex-col gap-3 border-t border-line/60 pt-6 text-[12.5px] text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}. All rights reserved.
        </p>
        <Link to="/admin/login" className="transition-colors duration-200 hover:text-accent">
          Owner sign in
        </Link>
      </div>
    </footer>);

}
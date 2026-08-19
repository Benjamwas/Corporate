import React, { useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { ActionButton } from '../../components/ui/ActionButton';
import { consultationTypes } from '../../data/services';
import { services } from '../../data/services';
import { profile } from '../../data/profile';
import { cn } from '../../utils/cn';
import { useSeo } from '../../utils/seo';

export function AdminSettings() {
  const [notificationEmail, setNotificationEmail] = useState(profile.email);
  const [whatsapp, setWhatsapp] = useState(profile.whatsapp);
  const [activeTypes, setActiveTypes] = useState<string[]>(consultationTypes.map((type) => type.id));
  const [activeServices, setActiveServices] = useState<string[]>(services.map((service) => service.slug));
  const [saved, setSaved] = useState(false);

  useSeo({
    title: 'Settings — Owner portal',
    description: 'Configure lead notifications, WhatsApp number and which services are published.',
    path: '/admin/settings'
  });

  const toggle = (list: string[], setList: (value: string[]) => void, id: string) => {
    setList(list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <header>
        <h1 className="font-display text-[28px] font-semibold tracking-tightest text-ink">Settings</h1>
        <p className="mt-1.5 text-[14px] text-ink-muted">
          Control where enquiries are delivered and what the public site offers.
        </p>
      </header>

      <div className="mt-8 space-y-4">
        <GlassCard strong className="p-6">
          <h2 className="text-[11.5px] tracking-[0.14em] text-ink-subtle">LEAD DELIVERY</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-[12.5px] text-ink-muted">Notification email</span>
              <input
                value={notificationEmail}
                onChange={(event) => setNotificationEmail(event.target.value)}
                className="w-full rounded-2xl border border-line/80 bg-canvas/60 px-4 py-3 text-sm text-ink focus:border-accent/60 focus:outline-none" />
              
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[12.5px] text-ink-muted">WhatsApp number</span>
              <input
                value={whatsapp}
                onChange={(event) => setWhatsapp(event.target.value)}
                className="w-full rounded-2xl border border-line/80 bg-canvas/60 px-4 py-3 text-sm text-ink focus:border-accent/60 focus:outline-none" />
              
            </label>
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-ink-subtle">
            Every enquiry is delivered with the lead summary, topic, timestamp and — where the
            assistant was used — the conversation transcript.
          </p>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-[11.5px] tracking-[0.14em] text-ink-subtle">ACTIVE CONSULTATION TYPES</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {consultationTypes.map((type) =>
            <Toggle
              key={type.id}
              label={type.label}
              active={activeTypes.includes(type.id)}
              onClick={() => toggle(activeTypes, setActiveTypes, type.id)} />

            )}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-[11.5px] tracking-[0.14em] text-ink-subtle">PUBLISHED SERVICES</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {services.map((service) =>
            <Toggle
              key={service.slug}
              label={service.title}
              active={activeServices.includes(service.slug)}
              onClick={() => toggle(activeServices, setActiveServices, service.slug)} />

            )}
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-ink-subtle">
            Only services enabled here are shown publicly, and only approved services get a dedicated
            page.
          </p>
        </GlassCard>

        <div className="flex items-center gap-3">
          <ActionButton
            onClick={() => {
              setSaved(true);
              window.setTimeout(() => setSaved(false), 2400);
            }}>
            
            Save settings
          </ActionButton>
          {saved &&
          <span className="flex items-center gap-1.5 text-[13px] text-accent">
              <CheckIcon className="h-3.5 w-3.5" /> Settings saved
            </span>
          }
        </div>
      </div>
    </div>);

}

function Toggle({
  label,
  active,
  onClick




}: {label: string;active: boolean;onClick: () => void;}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] transition-colors duration-200',
        active ? 'border-accent/50 bg-accent/10 text-accent' : 'border-line/70 text-ink-muted hover:text-ink'
      )}>
      
      {active && <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />}
      {label}
    </button>);

}
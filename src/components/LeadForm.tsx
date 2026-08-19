import React, { useState } from 'react';
import { CheckCircle2Icon, PaperclipIcon } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';
import { profile } from '../data/profile';
import type { Lead } from '../types';
import { ActionButton } from './ui/ActionButton';
import { cn } from '../utils/cn';

interface LeadFormProps {
  source: Lead['source'];
  transcript?: string;
  defaultTopic?: string;
  compact?: boolean;
  onSubmitted?: () => void;
}

const fieldClass =
'w-full rounded-2xl border border-line/80 bg-canvas/60 px-4 py-3 text-sm text-ink placeholder:text-ink-subtle transition-colors duration-200 focus:border-accent/60 focus:outline-none';

export function LeadForm({ source, transcript, defaultTopic = '', compact = false, onSubmitted }: LeadFormProps) {
  const { addLead } = useSiteData();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    topic: defaultTopic,
    message: ''
  });

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      organisation: form.organisation || '—',
      topic: form.topic || 'General enquiry',
      message: form.message,
      source,
      transcript
    });
    setSubmitted(true);
    onSubmitted?.();
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-accent/25 bg-accent/8 p-6">
        <CheckCircle2Icon className="h-6 w-6 text-accent" aria-hidden="true" />
        <h3 className="mt-3 font-display text-lg font-semibold text-ink">Your enquiry is on its way</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          A summary has been sent to {profile.email} with your topic, timestamp
          {transcript ? ' and the conversation transcript' : ''}. Kennedy replies to enquiries personally.
        </p>
      </div>);

  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className={cn('grid gap-3', compact ? 'grid-cols-1' : 'sm:grid-cols-2')}>
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] text-ink-muted">Name</span>
          <input required value={form.name} onChange={update('name')} className={fieldClass} placeholder="Full name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] text-ink-muted">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={update('email')}
            className={fieldClass}
            placeholder="you@organisation.com" />
          
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] text-ink-muted">Phone / WhatsApp</span>
          <input value={form.phone} onChange={update('phone')} className={fieldClass} placeholder="+44 …" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] text-ink-muted">Organization</span>
          <input
            value={form.organisation}
            onChange={update('organisation')}
            className={fieldClass}
            placeholder="Organisation name" />
          
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-[12.5px] text-ink-muted">Topic</span>
        <input value={form.topic} onChange={update('topic')} className={fieldClass} placeholder="e.g. Life cycle assessment" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[12.5px] text-ink-muted">Message</span>
        <textarea
          required
          rows={compact ? 3 : 4}
          value={form.message}
          onChange={update('message')}
          className={cn(fieldClass, 'resize-none')}
          placeholder="Describe the challenge and the decision you need evidence for." />
        
      </label>

      {transcript &&
      <p className="flex items-start gap-2 text-[12.5px] leading-relaxed text-ink-subtle">
          <PaperclipIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Your conversation transcript, topic and timestamp will be attached automatically.
        </p>
      }

      <ActionButton type="submit" className="w-full">
        Send Enquiry
      </ActionButton>
    </form>);

}
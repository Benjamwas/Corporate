import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { useSiteData } from '../../contexts/SiteDataContext';
import type { LeadStage } from '../../types';
import { useSeo } from '../../utils/seo';

const stages: LeadStage[] = ['New', 'Contacted', 'Qualified', 'Converted', 'Closed'];

export function AdminLeads() {
  const { leads, moveLead } = useSiteData();

  useSeo({
    title: 'Leads — Owner portal',
    description: 'Lead pipeline from the assistant, contact form, bookings and WhatsApp.',
    path: '/admin/leads'
  });

  return (
    <div className="mx-auto max-w-7xl">
      <header>
        <h1 className="font-display text-[28px] font-semibold tracking-tightest text-ink">Leads</h1>
        <p className="mt-1.5 text-[14px] text-ink-muted">
          {leads.length} leads across the pipeline. Move a lead with the arrows on its card.
        </p>
      </header>

      <div className="mt-8 grid gap-4 lg:grid-cols-5">
        {stages.map((stage) => {
          const stageLeads = leads.filter((lead) => lead.stage === stage);
          return (
            <section key={stage} aria-label={stage} className="min-w-0">
              <div className="flex items-center justify-between px-1 pb-3">
                <h2 className="text-[12.5px] font-medium tracking-[0.08em] text-ink">{stage.toUpperCase()}</h2>
                <span className="text-[12px] tabular-nums text-ink-subtle">{stageLeads.length}</span>
              </div>
              <div className="space-y-3">
                {stageLeads.map((lead) => {
                  const stageIndex = stages.indexOf(lead.stage);
                  return (
                    <GlassCard key={lead.id} className="rounded-3xl p-4">
                      <p className="font-display text-[14.5px] font-medium leading-snug text-ink">
                        {lead.name}
                      </p>
                      <p className="mt-1 text-[12.5px] text-ink-muted">{lead.organisation}</p>
                      <p className="mt-3 text-[13px] leading-snug text-ink">{lead.topic}</p>
                      <p className="mt-2 text-[12px] leading-relaxed text-ink-subtle">{lead.message}</p>
                      <div className="mt-4 flex items-center justify-between gap-2 border-t border-line/60 pt-3">
                        <span className="text-[11.5px] text-ink-subtle">
                          {lead.source} · {lead.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={stageIndex === 0}
                            onClick={() => moveLead(lead.id, stages[stageIndex - 1])}
                            aria-label={`Move ${lead.name} back`}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-line/70 text-ink-muted transition-colors duration-200 hover:text-accent disabled:opacity-35">
                            
                            <ChevronLeftIcon className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={stageIndex === stages.length - 1}
                            onClick={() => moveLead(lead.id, stages[stageIndex + 1])}
                            aria-label={`Move ${lead.name} forward`}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-line/70 text-ink-muted transition-colors duration-200 hover:text-accent disabled:opacity-35">
                            
                            <ChevronRightIcon className="h-3.5 w-3.5" />
                          </button>
                        </span>
                      </div>
                      {lead.transcript &&
                      <details className="mt-3">
                          <summary className="cursor-pointer text-[12px] text-accent">
                            Conversation transcript
                          </summary>
                          <p className="mt-2 whitespace-pre-line text-[12px] leading-relaxed text-ink-muted">
                            {lead.transcript}
                          </p>
                        </details>
                      }
                    </GlassCard>);

                })}
                {stageLeads.length === 0 &&
                <p className="rounded-3xl border border-dashed border-line/70 px-4 py-6 text-center text-[12.5px] text-ink-subtle">
                    Empty
                  </p>
                }
              </div>
            </section>);

        })}
      </div>
    </div>);

}
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis } from
'recharts';
import { ArrowUpRightIcon } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { useSiteData } from '../../contexts/SiteDataContext';
import { useSeo } from '../../utils/seo';

const enquiryTrend = [
{ month: 'Mar', enquiries: 4, bookings: 2 },
{ month: 'Apr', enquiries: 6, bookings: 3 },
{ month: 'May', enquiries: 5, bookings: 4 },
{ month: 'Jun', enquiries: 9, bookings: 5 },
{ month: 'Jul', enquiries: 11, bookings: 6 },
{ month: 'Aug', enquiries: 14, bookings: 8 }];


export function AdminDashboard() {
  const { leads, bookings, documents } = useSiteData();

  useSeo({
    title: 'Dashboard — Owner portal',
    description: 'Consultation requests, bookings, leads and document activity.',
    path: '/admin'
  });

  const upcoming = bookings.filter((booking) => booking.status !== 'Completed');
  const aiLeads = leads.filter((lead) => lead.source === 'Ask Kennedy');
  const contactLeads = leads.filter((lead) => lead.source === 'Contact form');
  const downloads = documents.reduce((total, doc) => total + doc.downloads, 0);

  const downloadData = documents.
  filter((doc) => doc.status === 'Published').
  map((doc) => ({ name: doc.title.split(' ')[0], downloads: doc.downloads }));

  const activity = [
  ...leads.slice(0, 3).map((lead) => ({
    id: `lead-${lead.id}`,
    date: lead.date,
    text: `${lead.name} — ${lead.topic} (${lead.source})`
  })),
  ...bookings.slice(0, 2).map((booking) => ({
    id: `bk-${booking.id}`,
    date: booking.date,
    text: `${booking.name} booked ${booking.consultationType}`
  }))].
  sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mx-auto max-w-6xl">
      <header>
        <h1 className="font-display text-[28px] font-semibold tracking-tightest text-ink">Dashboard</h1>
        <p className="mt-1.5 text-[14px] text-ink-muted">
          {leads.length} leads · {upcoming.length} upcoming bookings · {downloads} document downloads
        </p>
      </header>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <GlassCard strong className="p-6">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-[11.5px] tracking-[0.14em] text-ink-subtle">CONSULTATION REQUESTS</p>
              <p className="mt-3 font-display text-[2.8rem] font-semibold leading-none tracking-tightest text-ink">
                {leads.length}
              </p>
            </div>
            <p className="flex items-center gap-1 text-[13px] text-accent">
              <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
              Trending up over six months
            </p>
          </div>
          <div className="mt-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enquiryTrend}>
                <CartesianGrid stroke="rgb(var(--line))" vertical={false} />
                <XAxis dataKey="month" stroke="rgb(var(--ink-subtle))" fontSize={12} tickLine={false} />
                <YAxis stroke="rgb(var(--ink-subtle))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'rgb(var(--canvas))',
                    border: '1px solid rgb(var(--line))',
                    borderRadius: 14,
                    fontSize: 13,
                    color: 'rgb(var(--ink))'
                  }} />
                
                <Area
                  type="monotone"
                  dataKey="enquiries"
                  stroke="rgb(var(--accent))"
                  fill="rgb(var(--accent))"
                  fillOpacity={0.16}
                  strokeWidth={2} />
                
                <Area
                  type="monotone"
                  dataKey="bookings"
                  stroke="rgb(var(--accent-ocean))"
                  fill="rgb(var(--accent-ocean))"
                  fillOpacity={0.1}
                  strokeWidth={2} />
                
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <StatTile label="Upcoming bookings" value={upcoming.length} to="/admin/bookings" />
          <StatTile label="AI assistant leads" value={aiLeads.length} to="/admin/leads" />
          <StatTile label="Contact messages" value={contactLeads.length} to="/admin/leads" />
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <GlassCard className="p-6">
          <p className="text-[11.5px] tracking-[0.14em] text-ink-subtle">DOCUMENT DOWNLOADS</p>
          <div className="mt-5 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={downloadData}>
                <CartesianGrid stroke="rgb(var(--line))" vertical={false} />
                <XAxis dataKey="name" stroke="rgb(var(--ink-subtle))" fontSize={12} tickLine={false} />
                <YAxis stroke="rgb(var(--ink-subtle))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'rgb(var(--canvas))',
                    border: '1px solid rgb(var(--line))',
                    borderRadius: 14,
                    fontSize: 13,
                    color: 'rgb(var(--ink))'
                  }} />
                
                <Bar dataKey="downloads" fill="rgb(var(--accent))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-[11.5px] tracking-[0.14em] text-ink-subtle">RECENT ACTIVITY</p>
          <ul className="mt-5 divide-y divide-line/60">
            {activity.map((item) =>
            <li key={item.id} className="flex items-start justify-between gap-4 py-3.5">
                <span className="text-[13.5px] leading-snug text-ink">{item.text}</span>
                <span className="shrink-0 text-[12px] tabular-nums text-ink-subtle">{item.date}</span>
              </li>
            )}
          </ul>
        </GlassCard>
      </div>
    </div>);

}

function StatTile({ label, value, to }: {label: string;value: number;to: string;}) {
  return (
    <Link to={to} className="block">
      <GlassCard className="flex items-center justify-between rounded-3xl p-5 transition-[border-color] duration-200 hover:border-accent/35">
        <span className="text-[13.5px] text-ink-muted">{label}</span>
        <span className="font-display text-[1.7rem] font-semibold leading-none tabular-nums text-ink">
          {value}
        </span>
      </GlassCard>
    </Link>);

}
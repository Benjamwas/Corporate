import React from 'react';
import { format, parseISO } from 'date-fns';
import { GlassCard } from '../../components/ui/GlassCard';
import { useSiteData } from '../../contexts/SiteDataContext';
import type { Booking } from '../../types';
import { cn } from '../../utils/cn';
import { useSeo } from '../../utils/seo';

const statusStyles: Record<Booking['status'], string> = {
  Confirmed: 'bg-accent/15 text-accent',
  Pending: 'bg-ocean-400/15 text-accent-ocean',
  Completed: 'bg-ink/8 text-ink-muted'
};

export function AdminBookings() {
  const { bookings, setBookingStatus } = useSiteData();

  useSeo({
    title: 'Bookings — Owner portal',
    description: 'Upcoming and past consultations.',
    path: '/admin/bookings'
  });

  const sorted = [...bookings].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="mx-auto max-w-5xl">
      <header>
        <h1 className="font-display text-[28px] font-semibold tracking-tightest text-ink">Bookings</h1>
        <p className="mt-1.5 text-[14px] text-ink-muted">
          {sorted.filter((item) => item.status !== 'Completed').length} upcoming consultations.
        </p>
      </header>

      <div className="mt-8 space-y-3">
        {sorted.map((booking) =>
        <GlassCard key={booking.id} className="rounded-3xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-[16px] font-semibold text-ink">{booking.name}</h2>
                  <span className={cn('rounded-full px-2.5 py-1 text-[11.5px]', statusStyles[booking.status])}>
                    {booking.status}
                  </span>
                </div>
                <p className="mt-1.5 text-[13.5px] text-ink-muted">
                  {booking.organisation} · {booking.email}
                </p>
                <p className="mt-3 text-[14px] text-ink">{booking.consultationType}</p>
                {booking.notes &&
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-subtle">{booking.notes}</p>
              }
              </div>

              <div className="text-right">
                <p className="font-display text-[15px] font-medium text-ink">
                  {format(parseISO(booking.date), 'EEE d MMM yyyy')}
                </p>
                <p className="mt-1 text-[13px] tabular-nums text-ink-muted">{booking.time}</p>
                <div className="mt-4 flex flex-wrap justify-end gap-1.5">
                  {(['Confirmed', 'Pending', 'Completed'] as Booking['status'][]).map((status) =>
                <button
                  key={status}
                  type="button"
                  onClick={() => setBookingStatus(booking.id, status)}
                  aria-pressed={booking.status === status}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-[12px] transition-colors duration-200',
                    booking.status === status ?
                    'border-accent/50 text-accent' :
                    'border-line/70 text-ink-muted hover:text-ink'
                  )}>
                  
                      {status}
                    </button>
                )}
                </div>
              </div>
            </div>
          </GlassCard>
        )}
      </div>
    </div>);

}
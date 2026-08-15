import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isBefore,
  isSameDay,
  isWeekend,
  startOfDay,
  startOfMonth } from
'date-fns';
import {
  CalendarPlusIcon,
  CheckCircle2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MailIcon,
  MessageCircleIcon } from
'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { ActionButton } from '../components/ui/ActionButton';
import { consultationTypes } from '../data/services';
import { profile } from '../data/profile';
import { images } from '../data/images';
import { useSiteData } from '../contexts/SiteDataContext';
import { useUi } from '../contexts/UiContext';
import { buildWhatsappLink } from '../utils/assistant';
import { cn } from '../utils/cn';
import { professionalServiceSchema, useSeo } from '../utils/seo';

const timeSlots = ['09:00', '09:45', '10:30', '11:30', '13:30', '14:15', '15:00', '16:00'];
const steps = ['Consultation', 'Date', 'Time', 'Details', 'Confirmed'];

export function Booking() {
  const { addBooking } = useSiteData();
  const { interestedService } = useUi();
  const [step, setStep] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [details, setDetails] = useState({ name: '', email: '', organisation: '', notes: '' });

  useSeo({
    title: "Book a Consultation — Let's Talk Sustainability",
    description:
    'Book a sustainability, research, LCA, climate and carbon or agricultural sustainability consultation with Dr. Kennedy Ndue Mutua.',
    path: '/booking',
    image: images.carbon,
    schema: professionalServiceSchema(
      'Sustainability consultation',
      'Remote consultations on sustainability strategy, carbon, life cycle assessment, agriculture and research.'
    )
  });

  const monthStart = useMemo(() => startOfMonth(addMonths(new Date(), monthOffset)), [monthOffset]);
  const days = useMemo(
    () => eachDayOfInterval({ start: monthStart, end: endOfMonth(monthStart) }),
    [monthStart]
  );
  const leadingBlanks = (monthStart.getDay() + 6) % 7;
  const today = startOfDay(new Date());

  const activeTypes = consultationTypes.filter((type) => type.active);

  const handleConfirm = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedType || !selectedDate || !selectedTime) return;
    addBooking({
      name: details.name,
      email: details.email,
      organisation: details.organisation || '—',
      consultationType: selectedType,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
      notes: details.notes
    });
    setStep(4);
  };

  const downloadIcs = () => {
    if (!selectedDate || !selectedTime || !selectedType) return;
    const start = `${format(selectedDate, 'yyyyMMdd')}T${selectedTime.replace(':', '')}00`;
    const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `SUMMARY:${selectedType} with ${profile.shortName}`,
    `DTSTART:${start}`,
    `DESCRIPTION:${details.notes || 'Consultation'}`,
    'END:VEVENT',
    'END:VCALENDAR'].
    join('\n');
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'consultation.ics';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHeader
        kicker="Booking"
        title={
        <>
            Let&apos;s Talk
            <span className="block font-normal text-ink-muted">Sustainability.</span>
          </>
        }
        lede="Choose the kind of conversation you need, pick a time and share a short description of the challenge. Consultations are held remotely."
        crumbs={[{ label: 'Booking' }]} />
      

      <section className="px-5 py-12">
        <div className="mx-auto max-w-content">
          <ol className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2">
            {steps.map((label, index) =>
            <li key={label} className="flex items-center gap-3">
                <span
                className={cn(
                  'flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] transition-colors duration-200',
                  index === step ?
                  'bg-accent text-accent-contrast' :
                  index < step ?
                  'text-accent' :
                  'text-ink-subtle'
                )}>
                
                  {index < step && <CheckCircle2Icon className="h-3.5 w-3.5" aria-hidden="true" />}
                  {label}
                </span>
                {index < steps.length - 1 &&
              <span aria-hidden="true" className="hidden h-px w-6 bg-line sm:block" />
              }
              </li>
            )}
          </ol>

          <GlassCard strong className="overflow-hidden p-7 sm:p-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}>
                
                {step === 0 &&
                <div>
                    <h2 className="font-display text-[20px] font-semibold text-ink">
                      Choose a consultation
                    </h2>
                    {interestedService &&
                  <p className="mt-2 text-[13.5px] text-ink-muted">
                        You were reading about <span className="text-accent">{interestedService}</span>.
                      </p>
                  }
                    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {activeTypes.map((type) =>
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        setSelectedType(type.label);
                        setStep(1);
                      }}
                      className={cn(
                        'rounded-3xl border p-5 text-left transition-[border-color,transform] duration-200 ease-premium hover:-translate-y-0.5',
                        selectedType === type.label ?
                        'border-accent/60 bg-accent/10' :
                        'border-line/70 hover:border-accent/40'
                      )}>
                      
                          <p className="font-display text-[15px] font-medium leading-snug text-ink">
                            {type.label}
                          </p>
                          <p className="mt-1.5 text-[12.5px] text-ink-subtle">{type.duration} · remote</p>
                        </button>
                    )}
                    </div>
                  </div>
                }

                {step === 1 &&
                <div>
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="font-display text-[20px] font-semibold text-ink">Select a date</h2>
                      <div className="flex items-center gap-2">
                        <button
                        type="button"
                        onClick={() => setMonthOffset((prev) => Math.max(0, prev - 1))}
                        disabled={monthOffset === 0}
                        aria-label="Previous month"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-line/70 text-ink-muted transition-colors duration-200 hover:text-accent disabled:opacity-40">
                        
                          <ChevronLeftIcon className="h-4 w-4" />
                        </button>
                        <span className="min-w-[9rem] text-center text-[13.5px] text-ink">
                          {format(monthStart, 'MMMM yyyy')}
                        </span>
                        <button
                        type="button"
                        onClick={() => setMonthOffset((prev) => Math.min(3, prev + 1))}
                        aria-label="Next month"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-line/70 text-ink-muted transition-colors duration-200 hover:text-accent">
                        
                          <ChevronRightIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-7 gap-1.5 text-center">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) =>
                    <span key={day} className="pb-2 text-[11.5px] text-ink-subtle">
                          {day.slice(0, 2)}
                        </span>
                    )}
                      {Array.from({ length: leadingBlanks }).map((_, index) =>
                    <span key={`blank-${index}`} />
                    )}
                      {days.map((day) => {
                      const unavailable = isWeekend(day) || isBefore(day, today);
                      const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
                      return (
                        <button
                          key={day.toISOString()}
                          type="button"
                          disabled={unavailable}
                          onClick={() => {
                            setSelectedDate(day);
                            setStep(2);
                          }}
                          className={cn(
                            'aspect-square rounded-2xl text-[13.5px] tabular-nums transition-colors duration-200 ease-premium',
                            unavailable ?
                            'text-ink-subtle/45' :
                            isSelected ?
                            'bg-accent text-accent-contrast' :
                            'border border-line/60 text-ink hover:border-accent/50 hover:text-accent'
                          )}>
                          
                            {format(day, 'd')}
                          </button>);

                    })}
                    </div>
                    <p className="mt-5 text-[12.5px] text-ink-subtle">
                      Weekdays only. All times shown in UK time.
                    </p>
                    <BackButton onClick={() => setStep(0)} />
                  </div>
                }

                {step === 2 && selectedDate &&
                <div>
                    <h2 className="font-display text-[20px] font-semibold text-ink">Select a time</h2>
                    <p className="mt-2 text-[13.5px] text-ink-muted">
                      {selectedType} · {format(selectedDate, 'EEEE d MMMM yyyy')}
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {timeSlots.map((slot) =>
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setSelectedTime(slot);
                        setStep(3);
                      }}
                      className={cn(
                        'rounded-2xl border py-3 text-[14px] tabular-nums transition-colors duration-200 ease-premium',
                        selectedTime === slot ?
                        'border-accent/60 bg-accent/10 text-accent' :
                        'border-line/70 text-ink hover:border-accent/40 hover:text-accent'
                      )}>
                      
                          {slot}
                        </button>
                    )}
                    </div>
                    <BackButton onClick={() => setStep(1)} />
                  </div>
                }

                {step === 3 &&
                <form onSubmit={handleConfirm}>
                    <h2 className="font-display text-[20px] font-semibold text-ink">Your details</h2>
                    <p className="mt-2 text-[13.5px] text-ink-muted">
                      {selectedType} · {selectedDate && format(selectedDate, 'EEE d MMM yyyy')} ·{' '}
                      {selectedTime}
                    </p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <Field
                      label="Name"
                      value={details.name}
                      onChange={(value) => setDetails((prev) => ({ ...prev, name: value }))}
                      required />
                    
                      <Field
                      label="Email"
                      type="email"
                      value={details.email}
                      onChange={(value) => setDetails((prev) => ({ ...prev, email: value }))}
                      required />
                    
                      <Field
                      label="Organization"
                      value={details.organisation}
                      onChange={(value) => setDetails((prev) => ({ ...prev, organisation: value }))} />
                    
                      <Field
                      label="Topic or challenge"
                      value={details.notes}
                      onChange={(value) => setDetails((prev) => ({ ...prev, notes: value }))} />
                    
                    </div>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <ActionButton type="submit" size="lg">
                        Confirm Booking
                      </ActionButton>
                      <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-[13px] text-ink-subtle transition-colors duration-200 hover:text-accent">
                      
                        ← Change time
                      </button>
                    </div>
                  </form>
                }

                {step === 4 && selectedDate &&
                <div className="py-4">
                    <CheckCircle2Icon className="h-8 w-8 text-accent" aria-hidden="true" />
                    <h2 className="mt-5 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold leading-tight tracking-tightest text-ink">
                      You&apos;re on the calendar.
                    </h2>
                    <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink-muted">
                      {selectedType} on {format(selectedDate, 'EEEE d MMMM yyyy')} at {selectedTime}.
                      A confirmation has been sent to {details.email || 'your email address'}.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <ActionButton onClick={downloadIcs} size="lg">
                        <CalendarPlusIcon className="h-4 w-4" />
                        Add to Calendar
                      </ActionButton>
                      <a
                      href={buildWhatsappLink(
                        profile.whatsapp,
                        `Hello Dr. Kennedy, I have booked a ${selectedType?.toLowerCase()} on ${format(
                          selectedDate,
                          'd MMMM'
                        )} at ${selectedTime}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass inline-flex h-13 items-center gap-2 rounded-full px-7 py-3.5 text-[15px] text-ink transition-colors duration-200 hover:text-accent">
                      
                        <MessageCircleIcon className="h-4 w-4" />
                        Confirm on WhatsApp
                      </a>
                      <a
                      href={`mailto:${profile.email}`}
                      className="inline-flex h-13 items-center gap-2 rounded-full px-4 py-3.5 text-[15px] text-ink-muted transition-colors duration-200 hover:text-accent">
                      
                        <MailIcon className="h-4 w-4" />
                        Email Kennedy
                      </a>
                    </div>
                  </div>
                }
              </motion.div>
            </AnimatePresence>
          </GlassCard>
        </div>
      </section>
    </>);

}

function BackButton({ onClick }: {onClick: () => void;}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-7 text-[13px] text-ink-subtle transition-colors duration-200 hover:text-accent">
      
      ← Back
    </button>);

}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}

function Field({ label, value, onChange, type = 'text', required }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] text-ink-muted">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-line/80 bg-canvas/60 px-4 py-3 text-sm text-ink placeholder:text-ink-subtle transition-colors duration-200 focus:border-accent/60 focus:outline-none" />
      
    </label>);

}
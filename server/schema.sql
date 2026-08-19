-- ============================================================
-- Portfolio Backend — Supabase SQL Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL)
-- ============================================================

-- 1. DOCUMENTS
create table if not exists documents (
  id          text primary key,
  title       text not null default 'Untitled document',
  description text not null default '',
  type        text not null default 'Report',
  version     text not null default 'v0.1',
  updated     text not null default (to_char(now(), 'YYYY-MM-DD')),
  status      text not null default 'Draft'
                check (status in ('Published', 'Draft', 'Review', 'Archived')),
  file_size   text not null default '—',
  body        text not null default '<h2>Untitled</h2>',
  downloads   integer not null default 0,
  created_at  timestamptz not null default now()
);

alter table documents enable row level security;

-- Public can read published documents
create policy "Public read published documents"
  on documents for select
  using (status = 'Published');

-- Anyone can increment download count
create policy "Anyone can track downloads"
  on documents for update
  using (true)
  with check (true);

-- Authenticated users can do everything
create policy "Authenticated full access on documents"
  on documents for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- 2. LEADS
create table if not exists leads (
  id           text primary key,
  name         text not null,
  email        text not null,
  phone        text,
  organisation text not null default '—',
  topic        text not null,
  source       text not null default 'Contact form'
                 check (source in ('Ask Kennedy', 'Contact form', 'Booking', 'WhatsApp')),
  date         text not null default (to_char(now(), 'YYYY-MM-DD')),
  stage        text not null default 'New'
                 check (stage in ('New', 'Contacted', 'Qualified', 'Converted', 'Closed')),
  message      text not null,
  transcript   text,
  created_at   timestamptz not null default now()
);

alter table leads enable row level security;

-- Anyone can insert leads (public form submissions)
create policy "Anyone can create leads"
  on leads for insert
  with check (true);

-- Authenticated users can do everything with leads
create policy "Authenticated full access on leads"
  on leads for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- 3. BOOKINGS
create table if not exists bookings (
  id                 text primary key,
  name               text not null,
  email              text not null,
  organisation       text not null default '—',
  consultation_type  text not null,
  date               text not null,
  time               text not null,
  status             text not null default 'Pending'
                       check (status in ('Confirmed', 'Pending', 'Completed')),
  notes              text,
  created_at         timestamptz not null default now()
);

alter table bookings enable row level security;

-- Anyone can create bookings (public form)
create policy "Anyone can create bookings"
  on bookings for insert
  with check (true);

-- Authenticated users can do everything with bookings
create policy "Authenticated full access on bookings"
  on bookings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- 4. SETTINGS
create table if not exists settings (
  id         uuid primary key default gen_random_uuid(),
  key        text unique not null,
  value      text not null default '',
  updated_at timestamptz not null default now()
);

alter table settings enable row level security;

-- Public can read settings (for consultation types, etc.)
create policy "Public read settings"
  on settings for select
  using (true);

-- Authenticated users can manage settings
create policy "Authenticated full access on settings"
  on settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

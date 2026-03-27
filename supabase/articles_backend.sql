-- CrownMind Articles Backend for Supabase
-- Run this in Supabase SQL Editor.

create extension if not exists pgcrypto;

-- Main articles table
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  excerpt text,
  author_name text default 'CrownMind Institute',
  pdf_path text not null,
  cover_path text,
  pdf_url text,
  cover_url text,
  categories text[] not null default '{}',
  tags text[] not null default '{}',
  is_published boolean not null default false,
  sort_order integer not null default 0,
  published_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_articles_published on public.articles (is_published, published_at desc);
create index if not exists idx_articles_slug on public.articles (slug);
create index if not exists idx_articles_categories on public.articles using gin (categories);
create index if not exists idx_articles_tags on public.articles using gin (tags);
create index if not exists idx_articles_metadata on public.articles using gin (metadata);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_articles_updated_at on public.articles;
create trigger trg_articles_updated_at
before update on public.articles
for each row
execute function public.set_updated_at();

-- Public read, admin write via RLS
alter table public.articles enable row level security;

-- Drop existing policies safely
 drop policy if exists "Public can read published articles" on public.articles;
 drop policy if exists "Authenticated users can read all articles" on public.articles;
 drop policy if exists "Authenticated users can insert articles" on public.articles;
 drop policy if exists "Authenticated users can update articles" on public.articles;
 drop policy if exists "Authenticated users can delete articles" on public.articles;

create policy "Public can read published articles"
on public.articles
for select
to public
using (is_published = true);

create policy "Authenticated users can read all articles"
on public.articles
for select
to authenticated
using (true);

create policy "Authenticated users can insert articles"
on public.articles
for insert
to authenticated
with check (true);

create policy "Authenticated users can update articles"
on public.articles
for update
to authenticated
using (true)
with check (true);

create policy "Authenticated users can delete articles"
on public.articles
for delete
to authenticated
using (true);

-- Create storage buckets in Dashboard first if you prefer,
-- or use the insert statements below to define them from SQL.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'article-pdfs',
    'article-pdfs',
    true,
    52428800,
    array['application/pdf']
  ),
  (
    'article-covers',
    'article-covers',
    true,
    10485760,
    array['image/png', 'image/jpeg', 'image/webp']
  )
on conflict (id) do nothing;

-- Storage policies
 drop policy if exists "Public can read article pdfs" on storage.objects;
 drop policy if exists "Authenticated can upload article pdfs" on storage.objects;
 drop policy if exists "Authenticated can update article pdfs" on storage.objects;
 drop policy if exists "Authenticated can delete article pdfs" on storage.objects;
 drop policy if exists "Public can read article covers" on storage.objects;
 drop policy if exists "Authenticated can upload article covers" on storage.objects;
 drop policy if exists "Authenticated can update article covers" on storage.objects;
 drop policy if exists "Authenticated can delete article covers" on storage.objects;

create policy "Public can read article pdfs"
on storage.objects
for select
to public
using (bucket_id = 'article-pdfs');

create policy "Authenticated can upload article pdfs"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'article-pdfs');

create policy "Authenticated can update article pdfs"
on storage.objects
for update
to authenticated
using (bucket_id = 'article-pdfs')
with check (bucket_id = 'article-pdfs');

create policy "Authenticated can delete article pdfs"
on storage.objects
for delete
to authenticated
using (bucket_id = 'article-pdfs');

create policy "Public can read article covers"
on storage.objects
for select
to public
using (bucket_id = 'article-covers');

create policy "Authenticated can upload article covers"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'article-covers');

create policy "Authenticated can update article covers"
on storage.objects
for update
to authenticated
using (bucket_id = 'article-covers')
with check (bucket_id = 'article-covers');

create policy "Authenticated can delete article covers"
on storage.objects
for delete
to authenticated
using (bucket_id = 'article-covers');

-- Helpful view for frontend consumption
create or replace view public.published_articles as
select
  id,
  slug,
  title,
  description,
  excerpt,
  author_name,
  pdf_path,
  cover_path,
  pdf_url,
  cover_url,
  categories,
  tags,
  sort_order,
  published_at,
  metadata,
  created_at,
  updated_at
from public.articles
where is_published = true
order by coalesce(published_at, created_at) desc, sort_order asc, title asc;

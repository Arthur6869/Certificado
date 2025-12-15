-- Run this in Supabase SQL editor to create the table and permissive RLS policies
-- Enable pgcrypto for gen_random_uuid()
create extension if not exists "pgcrypto";

create table if not exists public.certificados (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  titulo text not null,
  instituicao text not null,
  data_emissao date,
  file_url text,
  file_path text
);

-- Enable Row Level Security and add a permissive policy (USE AT YOUR OWN RISK).
alter table public.certificados enable row level security;

create policy "public_all" on public.certificados
  for all
  using (true)
  with check (true);

-- Note: This policy allows all operations (select/insert/update/delete) from any role.
-- For a personal project this is convenient, but for production you should restrict access
-- to authenticated users and implement ownership checks.

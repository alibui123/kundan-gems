-- Kundan products schema
-- Materials: diamond | gold | ruby
-- Categories: rings | bracelets | necklaces

create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  material text not null check (material in ('diamond', 'gold', 'ruby')),
  category text not null check (category in ('rings', 'bracelets', 'necklaces')),
  price numeric(12, 2) not null check (price >= 0),
  metal text not null default '',
  carat text not null default '',
  sizes text[] not null default '{}',
  image text not null,
  gallery text[] not null default '{}',
  badge text,
  is_new boolean not null default false,
  is_bestseller boolean not null default false,
  is_featured boolean not null default false,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_material_category_idx
  on public.products (material, category)
  where active = true;

create index if not exists products_active_idx
  on public.products (active, sort_order);

alter table public.products enable row level security;

drop policy if exists "Public can read active products" on public.products;
create policy "Public can read active products"
  on public.products
  for select
  to anon, authenticated
  using (active = true);

drop policy if exists "Service role full access" on public.products;
-- service_role bypasses RLS by default; no extra policy required

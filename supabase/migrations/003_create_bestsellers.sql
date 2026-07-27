-- Ranked best sellers (future: driven by purchase volume)
create table if not exists public.bestsellers (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  rank integer not null default 100,
  units_sold integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (product_id)
);

create index if not exists bestsellers_rank_idx
  on public.bestsellers (rank asc)
  where active = true;

alter table public.bestsellers enable row level security;

drop policy if exists "Public can read active bestsellers" on public.bestsellers;
create policy "Public can read active bestsellers"
  on public.bestsellers
  for select
  to anon, authenticated
  using (active = true);

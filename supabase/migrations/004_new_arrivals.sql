-- New arrivals: ensure flag + curated rank for the collection page
alter table public.products
  add column if not exists is_new boolean not null default false;

alter table public.products
  add column if not exists new_arrival_rank integer;

-- Backfill ranks for existing new pieces (stable order by sort_order, then name)
with ranked as (
  select
    id,
    row_number() over (
      order by sort_order asc nulls last, created_at desc, name asc
    ) as rn
  from public.products
  where active = true and is_new = true
)
update public.products p
set new_arrival_rank = ranked.rn
from ranked
where p.id = ranked.id;

create index if not exists products_is_new_idx
  on public.products (is_new, new_arrival_rank asc nulls last)
  where active = true and is_new = true;

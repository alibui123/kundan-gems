-- Add signature flag for maison-select pieces
alter table public.products
  add column if not exists is_signature boolean not null default false;

update public.products
set is_signature = true
where lower(coalesce(badge, '')) = 'signature'
   or is_featured = true;

create index if not exists products_is_signature_idx
  on public.products (is_signature)
  where active = true and is_signature = true;

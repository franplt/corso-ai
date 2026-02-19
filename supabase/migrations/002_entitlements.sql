create table if not exists public.payments (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  stripe_checkout_session_id text not null unique,
  amount_total integer not null,
  currency text not null default 'eur',
  created_at timestamptz not null default now()
);

alter table public.payments enable row level security;

create policy "Users can read own payments"
on public.payments
for select
to authenticated
using (auth.uid() = user_id);

create index if not exists payments_user_id_idx on public.payments (user_id);

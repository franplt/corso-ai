-- Revoke the overly permissive update policy that lets users set has_access = true.
drop policy if exists "Users can update own profile" on public.profiles;

-- Only allow users to update non-sensitive columns (email).
-- has_access and stripe_customer_id can only be changed by the service role
-- (used in the Stripe webhook), which bypasses RLS.
create policy "Users can update own safe fields"
on public.profiles
for update
to authenticated
using  (auth.uid() = id)
with check (
  auth.uid() = id
  -- Ensure the privileged columns haven't been changed by the user.
  -- These can only be mutated by the service-role client (webhook).
);

-- Use a trigger to enforce that only the service role can change has_access / stripe_customer_id.
create or replace function public.protect_access_columns()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- current_setting('role') is 'authenticated' for normal users,
  -- but the service-role client sets it differently.
  -- Check if the caller is using the anon or authenticated role.
  if current_setting('role') in ('anon', 'authenticated') then
    -- Revert any attempt to change protected columns
    new.has_access := old.has_access;
    new.stripe_customer_id := old.stripe_customer_id;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_access_columns_trigger on public.profiles;

create trigger protect_access_columns_trigger
  before update on public.profiles
  for each row execute function public.protect_access_columns();
